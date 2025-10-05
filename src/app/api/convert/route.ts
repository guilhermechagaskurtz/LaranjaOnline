import { NextResponse } from "next/server";

const RULES: Record<string, { hosts: string[] }> = {
  amazon: {
    hosts: [
      "www.amazon.com",
      "amazon.com",
      "www.amazon.com.br",
      "amazon.com.br",
      "amzn.to",
      "a.co",
    ],
  },
  shopee: { hosts: ["shopee.com.br", "shopee.com", "shp.ee"] },
  mercadolivre: {
    hosts: ["mercadolivre.com.br", "www.mercadolivre.com.br", "mlb.to"],
  },
};

function matchStore(u: URL) {
  const host = u.hostname.toLowerCase();
  for (const key in RULES) {
    if (RULES[key].hosts.some((h) => h === host)) return key;
  }
  return null;
}

async function resolveFinalUrl(input: string): Promise<string> {
  try {
    const res = await fetch(input, { method: "GET", redirect: "follow" });
    return res.url || input;
  } catch {
    return input;
  }
}

function extractAsin(u: URL): string | null {
  const dpMatch = u.pathname.match(/\/dp\/([A-Z0-9]{10})/i);
  if (dpMatch) return dpMatch[1];
  const gpMatch = u.pathname.match(/\/gp\/product\/([A-Z0-9]{10})/i);
  if (gpMatch) return gpMatch[1];
  const q = u.searchParams.get("ASIN") || u.searchParams.get("asin");
  return q && /^[A-Z0-9]{10}$/i.test(q) ? q : null;
}

export async function POST(req: Request) {
  try {
    const { url, campaign } = await req.json();

    if (!url || !/^https?:\/\//i.test(url))
      return NextResponse.json({ error: "URL inválida" }, { status: 400 });
    if (!campaign)
      return NextResponse.json(
        { error: "Campanha não informada" },
        { status: 400 }
      );

    let u = new URL(url);
    let store = matchStore(u);
    if (!store)
      return NextResponse.json(
        { error: "Loja não suportada" },
        { status: 400 }
      );

    // Para Amazon: resolve encurtadores
    if (store === "amazon") {
      const finalHref = await resolveFinalUrl(url);
      u = new URL(finalHref);
      store = matchStore(u) || store;
    }

    let out: URL;

    if (store === "amazon") {
      if (!campaign.amazonTag)
        return NextResponse.json(
          { error: "Campanha sem ID Amazon" },
          { status: 400 }
        );
      const asin = extractAsin(u);
      if (!asin)
        return NextResponse.json(
          { error: "Não foi possível identificar o produto Amazon." },
          { status: 400 }
        );

      // --- Normaliza para /dp/ASIN?tag=... (remove todos os outros parâmetros)
      out = new URL(`https://${u.hostname}/dp/${asin}`);
      out.searchParams.set("tag", campaign.amazonTag);
    } else {
      // Para Shopee e Mercado Livre, mantemos a URL existente e adicionamos só o parâmetro de afiliado
      out = new URL(u.toString());

      if (store === "shopee") {
        if (!campaign.shopeeId)
          return NextResponse.json(
            { error: "Campanha sem ID Shopee" },
            { status: 400 }
          );
        out.searchParams.set("af_siteid", campaign.shopeeId);
      } else if (store === "mercadolivre") {
        if (!campaign.meliId)
          return NextResponse.json(
            { error: "Campanha sem ID Mercado Livre" },
            { status: 400 }
          );
        out.searchParams.set("aff_id", campaign.meliId);
      }
    }

    out.protocol = "https:";
    out.hash = "";

    return NextResponse.json({ ok: true, url: out.toString() });
  } catch {
    return NextResponse.json("Erro interno", { status: 500 });
  }
}

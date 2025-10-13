"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Campaign {
  slug: string;
  title: string;
  image: string;
  active?: boolean; // 🔹 adicionado para garantir o campo
  ids?: { amazonTag?: string; shopeeId?: string; meliId?: string };
}

interface AffiliateLinkCardProps {
  campaigns: Campaign[];
}

export function AffiliateLinkCard({ campaigns }: AffiliateLinkCardProps) {
  const [link, setLink] = useState("");
  const activeCampaigns = campaigns.filter((c) => c.active);
  const [selectedSlug, setSelectedSlug] = useState<string>(
    activeCampaigns.length > 0 ? activeCampaigns[0].slug : ""
  );
  const [resultLink, setResultLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // 🔸 filtra apenas campanhas ativas
  //const activeCampaigns = campaigns.filter((c) => c.active);

  const handleGenerateLink = async () => {
    if (!link || !selectedSlug) {
      setError("Informe o link e selecione a causa.");
      return;
    }
    setLoading(true);
    setError(null);
    setResultLink(null);
    setCopied(false);

    const campaign = activeCampaigns.find((c) => c.slug === selectedSlug);
    if (!campaign) {
      setError("Campanha não encontrada");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: link, campaign: campaign.ids }),
      });
      const data = await res.json();
      if (res.ok && data.ok) setResultLink(data.url);
      else setError(data.error || "Erro ao gerar link.");
    } catch {
      setError("Erro ao processar a requisição.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!resultLink) return;
    navigator.clipboard.writeText(resultLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full md:w-1/2">
      <Card className="shadow-lg border-orange-100">
        <CardHeader>
          <CardTitle className="text-center text-xl text-orange-600">
            Gere seu Link Solidário 🍊
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">
                Cole o link do produto
              </h4>
              <Input
                placeholder="https://www.amazon.com.br/..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-3">
                Escolha a causa para apoiar
              </h4>
              <div className="flex flex-wrap justify-center gap-4">
                {activeCampaigns.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    Nenhuma campanha ativa no momento.
                  </p>
                ) : (
                  activeCampaigns.map((c) => (
                    <label
                      key={c.slug}
                      className={`cursor-pointer border-2 rounded-lg p-2 w-32 hover:shadow-md transition-all ${
                        selectedSlug === c.slug
                          ? "border-orange-500 ring-2 ring-orange-300"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="cause"
                        value={c.slug}
                        checked={selectedSlug === c.slug}
                        onChange={() => setSelectedSlug(c.slug)}
                        className="hidden"
                      />
                      <img
                        src={c.image}
                        alt={c.title}
                        className="w-full h-20 object-cover rounded-md mb-1"
                      />
                      <p className="text-xs font-medium text-gray-700">
                        {c.title}
                      </p>
                      <Link
                        href={`/campanhas/${c.slug}`}
                        className="text-[11px] text-blue-600 font-semibold underline hover:text-blue-800 transition block mt-1 text-center"
                      >
                        saiba mais
                      </Link>
                    </label>
                  ))
                )}
              </div>
            </div>

            <Button
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
              onClick={handleGenerateLink}
              disabled={loading}
            >
              {loading ? "Gerando..." : "Gerar Link Solidário"}
            </Button>

            {resultLink && (
              <div className="mt-2 text-center">
                <a
                  href={resultLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 break-words hover:underline"
                >
                  {resultLink}
                </a>
                <Button
                  size="sm"
                  className="mt-2 bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleCopy}
                >
                  {copied ? "Copiado!" : "Copiar link"}
                </Button>
              </div>
            )}

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}

            <p className="text-[10px] text-gray-500 text-center mt-2">
              🔒 Compra 100% segura no site oficial.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

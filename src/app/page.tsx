"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AffiliateLinkCard } from "@/components/AffiliateLinkCard";
import { Header } from "@/components/Header";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface Campaign {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  ids?: {
    amazonTag?: string;
  };
}

export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      const querySnapshot = await getDocs(collection(db, "campaigns"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Campaign[];
      setCampaigns(data);
    };
    fetchCampaigns();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-gray-800">
      <Header active="/" />

      {/* HERO */}
      <section
        id="hero"
        className="text-center py-8 md:py-20 bg-gradient-to-b from-orange-50 to-white"
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          {/* Texto Hero */}
          <div className="md:w-1/2 text-left">
            <h1 className="text-2xl md:text-5xl font-bold text-orange-600 mb-6 font-work-sans">
              Transforme suas compras em impacto real
            </h1>

            <p className="text-gray-700 text-lg mb-6">
              Com o <strong className="font-work-sans">laranja</strong>, cada
              compra se torna uma oportunidade de
              <strong> aplicar recursos em projetos reais</strong> que
              impulsionam transformações sociais, ambientais e comunitárias -{" "}
              <strong>sem custo adicional para você.</strong> É simples,
              transparente e com impacto mensurável.
            </p>

            {/* Benefícios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-2">
                <span className="text-2xl">🧩</span>
                <span>
                  80% das receitas são aplicadas em projetos de impacto
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-2xl">⚡</span>
                <span>
                  Converta seu link em segundos e gere valor para o mundo
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-2xl">🌱</span>
                <span>Aplicações em sustentabilidade e projetos sociais</span>
              </div>
            </div>
          </div>

          {/* Card de gerar link */}
          <AffiliateLinkCard campaigns={campaigns} />
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-2xl font-semibold text-orange-600 mb-8">
            É simples, rápido e poderoso.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔗",
                title: "1. Copie o link",
                desc: "Encontre o produto na Amazon e copie o link.",
              },
              {
                icon: "🧡",
                title: "2. Gere o link solidário",
                desc: "Cole aqui e escolha a causa para criar o link.",
              },
              {
                icon: "🛒",
                title: "3. Compre e ajude",
                desc: "Use o novo link. A contribuição acontece automaticamente!",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="bg-white rounded-lg shadow-md p-6 border border-orange-100"
              >
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOSSAS CAUSAS */}
      <section id="our-causes" className="py-16 bg-orange-50">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-2xl font-semibold text-orange-600 mb-10">
            Conheça Nossas Causas
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {campaigns.map((c) => (
              <Link
                key={c.id}
                href={`/campanhas/${c.slug}`} // 🔗 leva para a página do post/campanha
                className="block group transition-transform hover:-translate-y-1"
              >
                <Card className="overflow-hidden border-orange-100 shadow-sm group-hover:shadow-md transition-shadow duration-200">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="h-40 w-full object-cover"
                  />
                  <CardContent className="p-4 text-left">
                    <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {c.description}
                    </p>
                    <Badge className="bg-orange-100 text-orange-700">
                      {c.slug}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-orange-600 mb-10 text-center">
            Perguntas Frequentes
          </h2>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                🍊 Como a laranja transforma minhas compras em impacto social e ambiental?
              </AccordionTrigger>
              <AccordionContent>
                Quando você faz uma compra usando um link gerado pela laranja, parte da comissão recebida da loja parceira é automaticamente direcionada a projetos sociais e ambientais - sem custo adicional para você.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                💸 Preciso pagar algo a mais para contribuir com as causas?
              </AccordionTrigger>
              <AccordionContent>
                Não. O valor da sua compra permanece o mesmo. O valor que nós arrecadamos vem da comissão que a loja paga a laranja por indicar a venda.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                🌱 Quais tipos de projetos recebem os recursos arrecadados?
              </AccordionTrigger>
              <AccordionContent>
                Os recursos são aplicados em iniciativas que combatem a fome, promovem educação, preservam o meio ambiente e fortalecem comunidades locais. Publicamos periodicamente os resultados e valores destinados para garantir transparência.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                📊 Como posso acompanhar o impacto das minhas compras?
              </AccordionTrigger>
              <AccordionContent>
                Você pode acessar nossa página de transparência, onde divulgamos relatórios com os valores arrecadados, causas apoiadas e resultados alcançados - tudo de forma clara e verificável.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                🧡 Posso escolher para qual causa a minha compra vai contribuir?
              </AccordionTrigger>
              <AccordionContent>
                Sim. Ao gerar o link solidário, você escolhe a causa que deseja apoiar. Assim, cada compra reflete o impacto que você quer gerar no mundo.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="py-8 border-t border-orange-100 text-center text-gray-600 text-xs">
        <p>&copy; 2025 Laranja | Transformando compras em sorrisos 🍊</p>
      </footer>
    </main>
  );
}

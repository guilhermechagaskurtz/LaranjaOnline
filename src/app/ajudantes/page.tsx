"use client";

import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";

export default function AjudantesPage() {
  const helpers = [
    {
      name: "Ajudante 1",
      role: "Co-Fundador & Idealizador",
      image: "/placeholder.webp", // imagem genérica — pode substituir
      bio: "Apaixonada por impacto social, Fulana acredita que pequenas ações transformam o mundo. Lidera a parte de comunicação e parcerias do projeto.",
    },
    {
      name: "Ajudante 2",
      role: "Desenvolvedor & Co-Fundador",
      image: "/placeholder.webp",
      bio: "Fulano é o cérebro por trás da tecnologia do Laranja. Com dedicação, tornou possível transformar links em solidariedade.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-gray-800">
      <Header active="/ajudantes" />

      {/* HERO */}
      <section
        id="ajudantes-hero"
        className="text-center py-16 md:py-24 bg-gradient-to-b from-orange-50 to-white"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-orange-600 mb-6">
            Nossos Ajudantes 🍊
          </h1>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Por trás do Laranja existe uma equipe apaixonada por impacto social.
            Pessoas que acreditam que tecnologia e empatia podem caminhar juntas
            para criar um mundo melhor.
          </p>
        </div>
      </section>

      {/* LISTA DE AJUDANTES */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 grid sm:grid-cols-2 gap-10">
          {helpers.map((helper) => (
            <Card
              key={helper.name}
              className="overflow-hidden border-orange-100 shadow-lg hover:shadow-xl transition rounded-2xl"
            >
              <img
                src={helper.image}
                alt={helper.name}
                className="h-56 w-full object-cover"
              />
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-orange-600 mb-1">
                  {helper.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{helper.role}</p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {helper.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CHAMADA FINAL */}
      <section className="py-12 bg-orange-50 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-orange-600 mb-4">
            Quer se tornar um ajudante também?
          </h2>
          <p className="text-gray-700 mb-6">
            Se você acredita no poder das pequenas ações e quer fazer parte
            dessa corrente de impacto, entre em contato e venha somar forças com
            a gente!
          </p>
          <a
            href="mailto:contato@laranja.com"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-medium transition"
          >
            Fale Conosco
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-orange-100 text-center text-gray-600 text-xs">
        <p>&copy; 2025 Laranja | Unidos por um mundo mais solidário 🍊</p>
      </footer>
    </main>
  );
}

"use client";

import { Header } from "@/components/Header";
import Link from "next/link";

export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-gray-800">
      <Header active="/sobre" />

      {/* HERO SOBRE COM MISSÃO E VISÃO */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-orange-50 to-white min-h-11/12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:grid md:grid-cols-2 gap-12 items-center">
          {/* Texto principal */}
          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-5xl font-bold text-orange-600 mb-6 font-work-sans">
              Sobre Nós
            </h1>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
              Tudo começou com dois amigos que acreditavam que cada escolha pode
              gerar transformação. Da vontade de agir, nasceu o{" "}
              <strong className="font-work-sans">laranja</strong> — uma
              plataforma que aplica recursos de compras online em projetos
              sociais e ambientais que mudam realidades.
            </p>

            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
              Quando você faz uma compra usando nossos links ou conversor, parte
              da comissão recebida é destinada a iniciativas que combatem a
              fome, promovem educação, preservam a natureza e fortalecem
              comunidades — <strong>sem custo adicional para você.</strong>
            </p>

            <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
              Mantemos tudo transparente: publicamos periodicamente o valor
              arrecadado, para onde foi destinado e os resultados alcançados.
              Assim, você pode acompanhar como cada clique se transforma em
              <strong> impacto real e mensurável no mundo.</strong>
            </p>
          </div>

          {/* Cards de Missão e Visão */}
          <div className="order-1 md:order-2 grid gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100 flex flex-col items-start transition hover:shadow-xl">
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-xl font-semibold text-orange-600 mb-2">
                Nossa Missão
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Canalizar recursos de forma simples, transparente e acessível
                para projetos que combatem desigualdades, fortalecem comunidades
                e preservam o meio ambiente — transformando o consumo em
                ferramenta de impacto positivo.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100 flex flex-col items-start transition hover:shadow-xl">
              <div className="text-4xl mb-4">🌟</div>
              <h2 className="text-xl font-semibold text-orange-600 mb-2">
                Nossa Visão
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Um futuro em que cada pessoa, ao realizar uma compra, contribui
                automaticamente para o progresso coletivo. Queremos mostrar que{" "}
                <strong>consumir com propósito</strong> é o caminho para um
                planeta mais justo, consciente e sustentável.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-orange-600 mb-8">
            Nossos Valores
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🧡",
                title: "Solidariedade",
                desc: "Cada ação conta para ajudar quem precisa.",
              },
              {
                icon: "🌱",
                title: "Sustentabilidade",
                desc: "Preservar o meio ambiente é prioridade.",
              },
              {
                icon: "⚡",
                title: "Transparência",
                desc: "Mostramos de forma clara como o impacto acontece.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-lg shadow-md p-6 border border-orange-100"
              >
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAMADA PARA AÇÃO */}
      <section className="py-16 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-orange-600 mb-6">
            Junte-se a nós
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Sua participação pode transformar vidas! Apoie nossas causas e ajude
            a semear um futuro mais justo e verde.
          </p>
          <Link
            href="/"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Voltar à Página Inicial
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-orange-100 text-center text-gray-600 text-xs">
        <p>&copy; 2025 Laranja | Transformando compras em sorrisos 🍊</p>
      </footer>
    </main>
  );
}

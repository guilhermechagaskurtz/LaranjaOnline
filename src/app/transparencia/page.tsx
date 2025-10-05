"use client";

import { Header } from "@/components/Header";

export default function TransparenciaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-gray-800">
      <Header active="/transparencia" />

      {/* HERO */}
      <section
        id="transparencia-hero"
        className="text-center py-16 md:py-24 bg-gradient-to-b from-orange-50 to-white"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-orange-600 mb-6">
            Transparência 🍊
          </h1>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Acreditamos que cada gesto merece ser acompanhada com clareza. Aqui
            você pode ver como os recursos são distribuídos entre as causas
            apoiadas pelo <strong>Laranja</strong>, registrado com clareza e
            atualizado automaticamente.
          </p>
        </div>
      </section>

      {/* PLANILHA EMBED */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-orange-600 mb-6">
            Prestação de Contas
          </h2>
          <p className="text-gray-600 mb-8">
            A planilha abaixo mostra todas as movimentações de arrecadação e
            repasse para as causas. Os dados são atualizados automaticamente.
          </p>

          {/* iframe com a planilha */}
          <div className="w-full overflow-hidden rounded-2xl shadow-lg border border-orange-100">
            <iframe
              src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS2xBTDDaYTFQmhPuPYEh1dmN4WoNhWqCR92Fi0vJUf5dUveqIM2Z0DjRl1Zq6tTOi3bRv_seT0bxPx/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"
              width="100%"
              height="600"
              className="border-0"
              loading="lazy"
            ></iframe>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Caso a planilha não carregue,{" "}
            <a
              href="https://docs.google.com/spreadsheets/d/1evSoBW-iK5FZE3Vm2fWLykL9lLq_kpX-miXDqpH0KxA/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 underline hover:text-orange-700"
            >
              clique aqui para abrir diretamente no Google Sheets
            </a>
            .
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-orange-100 text-center text-gray-600 text-xs">
        <p>&copy; 2025 Laranja | Transparência que gera confiança 🍊</p>
      </footer>
    </main>
  );
}

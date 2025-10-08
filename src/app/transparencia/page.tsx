"use client";

import { Header } from "@/components/Header";

export default function TransparenciaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-gray-800">
      <Header active="/transparencia" />

      {/* PLANILHA EMBED */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-orange-600 mb-6 font-work-sans">
            Prestação de Contas
          </h2>
          <p className="text-gray-600 mb-8">
            A planilha abaixo mostra todas as movimentações de arrecadação e
            aplicação em projetos. Os dados são atualizados automaticamente.
          </p>

          {/* iframe com a planilha */}
          <div className="w-full overflow-hidden rounded-2xl shadow-lg border border-orange-100">
            <iframe
              src="https://docs.google.com/spreadsheets/d/e/2PACX-1vROJiU6U8qRimMtTFRW42LnG4CxHmePsqLVV3-GzXcol03187fvILVRVnS5eFvzWFXpdjQHLeeOB8Sh/pubhtml?widget=false&headers=false"
              width="100%"
              height="560"
              className="border-0"
              loading="lazy"
            ></iframe>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Caso a planilha não carregue,{" "}
            <a
              href="https://docs.google.com/spreadsheets/d/e/2PACX-1vROJiU6U8qRimMtTFRW42LnG4CxHmePsqLVV3-GzXcol03187fvILVRVnS5eFvzWFXpdjQHLeeOB8Sh/pubhtml?widget=false&headers=false"
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

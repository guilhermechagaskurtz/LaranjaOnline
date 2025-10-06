"use client";

import { Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-gray-800">
      <Header active="/contato" />

      {/* HERO CONTATO */}
      <section
        id="contato-hero"
        className="text-center py-16 md:py-24 bg-gradient-to-b from-orange-50 to-white"
      >
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-orange-600 mb-6">
            Fale Conosco 🍊
          </h1>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
            Estamos aqui para ouvir você! Se tiver dúvidas, sugestões ou quiser
            saber mais sobre o <strong>Laranja</strong>, entre em contato — sua
            mensagem é muito importante.
          </p>

          {/* Botão de e-mail */}
          <Button
            asChild
            className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-6 rounded-full shadow-md transition-all"
          >
            <a href="mailto:contato@laranja.online">📧 Enviar E-mail</a>
          </Button>

          <p className="text-sm text-gray-500 mt-4">
            ou envie diretamente para{" "}
            <a
              href="mailto:contato@laranja.online"
              className="text-orange-600 hover:underline"
            >
              contato@laranja.onine
            </a>
          </p>
        </div>
      </section>

      {/* OUTROS CANAIS */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl font-semibold text-orange-600 mb-8">
            Outros Canais
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-100 px-6 py-3 rounded-xl transition-all shadow-sm"
            >
              <Instagram className="w-5 h-5" /> @laranja.solidario
            </a>

            <a
              href="https://wa.me/5589999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-100 px-6 py-3 rounded-xl transition-all shadow-sm"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-orange-100 text-center text-gray-600 text-xs">
        <p>&copy; 2025 Laranja | Conectando boas ações 🍊</p>
      </footer>
    </main>
  );
}

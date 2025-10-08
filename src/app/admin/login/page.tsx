"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.push("/admin/dashboard");
    } catch {
      setErro("Credenciais inválidas ou erro ao autenticar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-50">
      <Card className="w-full max-w-sm shadow-lg border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-600 font-work-sans">
            Bem Vindo 🍊
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Faça login para continuar
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus-visible:ring-orange-500"
              />
              <Input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="focus-visible:ring-orange-500"
              />
            </div>

            {erro && (
              <p className="text-sm text-red-500 text-center bg-red-50 py-1 rounded">
                {erro}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white transition-all"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

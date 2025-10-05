"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Campaign {
  id?: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  ids: {
    amazonTag?: string;
    shopeeId?: string;
    meliId?: string;
  };
  active: boolean;
}

export default function AdminPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [form, setForm] = useState<Campaign>({
    slug: "",
    title: "",
    description: "",
    image: "",
    ids: {
      amazonTag: "",
      shopeeId: "",
      meliId: "",
    },
    active: true,
  });
  const [saving, setSaving] = useState(false);

  // 🔐 Proteção de rota
  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  // 📥 Buscar campanhas
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

  // 💾 Salvar nova campanha
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.slug || !form.title) return;

    setSaving(true);
    try {
      await addDoc(collection(db, "campaigns"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setForm({
        slug: "",
        title: "",
        description: "",
        image: "",
        ids: { amazonTag: "", shopeeId: "", meliId: "" },
        active: true,
      });
      const querySnapshot = await getDocs(collection(db, "campaigns"));
      setCampaigns(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Campaign[]
      );
    } finally {
      setSaving(false);
    }
  };

  // ❌ Excluir campanha
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "campaigns", id));
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  if (loading) return <p className="text-center mt-10">Carregando...</p>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-orange-600">
            Painel de Campanhas
          </h1>
          <Button variant="destructive" onClick={logout}>
            Sair
          </Button>
        </div>

        {/* Formulário */}
        <Card className="mb-10 border-orange-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-orange-700">
              Nova Campanha
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="space-y-3">
              <Input
                placeholder="Slug (ex: ong-vida)"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
              />
              <Input
                placeholder="Título"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <Input
                placeholder="Descrição"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <Input
                placeholder="URL da imagem"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
              <div className="grid grid-cols-3 gap-2">
                <Input
                  placeholder="Amazon Tag"
                  value={form.ids.amazonTag}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ids: { ...form.ids, amazonTag: e.target.value },
                    })
                  }
                />
                <Input
                  placeholder="Shopee ID"
                  value={form.ids.shopeeId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ids: { ...form.ids, shopeeId: e.target.value },
                    })
                  }
                />
                <Input
                  placeholder="Meli ID"
                  value={form.ids.meliId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      ids: { ...form.ids, meliId: e.target.value },
                    })
                  }
                />
              </div>

              <Button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white w-full"
                disabled={saving}
              >
                {saving ? "Salvando..." : "Cadastrar Campanha"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Lista de campanhas */}
        <div className="grid gap-4">
          {campaigns.length === 0 ? (
            <p className="text-center text-gray-500">
              Nenhuma campanha cadastrada.
            </p>
          ) : (
            campaigns.map((camp) => (
              <Card
                key={camp.id}
                className="border border-orange-100 shadow-sm"
              >
                <CardHeader className="flex items-center gap-4">
                  {camp.image && (
                    <img
                      src={`/${camp.image}`}
                      alt={camp.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <CardTitle>{camp.title}</CardTitle>
                    <CardDescription>{camp.description}</CardDescription>
                    <div className="flex gap-2 mt-2">
                      <Badge
                        className={
                          camp.active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }
                      >
                        {camp.active ? "Ativa" : "Inativa"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-orange-600 border-orange-300"
                      >
                        {camp.slug}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(camp.id!)}
                  >
                    Excluir
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

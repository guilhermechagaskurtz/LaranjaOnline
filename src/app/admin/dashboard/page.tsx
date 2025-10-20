"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
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

  // 🆕 Campos do post vinculado
  postTitle?: string;
  postContent?: string;
  progress: number;
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
    ids: { amazonTag: "", shopeeId: "", meliId: "" },
    active: true,
    postTitle: "",
    postContent: "",
    progress: 0,
  });
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  const fetchCampaigns = async () => {
    const querySnapshot = await getDocs(collection(db, "campaigns"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Campaign[];
    setCampaigns(data);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setGalleryImages(data.images || []);
      } catch (err) {
        console.error("Erro ao listar imagens:", err);
      }
    };
    loadGalleryImages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.slug || !form.title) return;
    setSaving(true);

    try {
      if (editingId) {
        await updateDoc(doc(db, "campaigns", editingId), { ...form });
      } else {
        await addDoc(collection(db, "campaigns"), {
          ...form,
          createdAt: serverTimestamp(),
        });
      }

      setForm({
        slug: "",
        title: "",
        description: "",
        image: "",
        ids: { amazonTag: "", shopeeId: "", meliId: "" },
        active: true,
        postTitle: "",
        postContent: "",
        progress: 0,
      });
      setEditingId(null);
      await fetchCampaigns();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "campaigns", id));
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleStatus = async (camp: Campaign) => {
    if (!camp.id) return;
    const newStatus = !camp.active;
    await updateDoc(doc(db, "campaigns", camp.id), { active: newStatus });
    setCampaigns((prev) =>
      prev.map((c) => (c.id === camp.id ? { ...c, active: newStatus } : c))
    );
  };

  const handleEdit = (camp: Campaign) => {
    setForm(camp);
    setEditingId(camp.id!);
  };

  if (loading) return <p className="text-center mt-10">Carregando...</p>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-orange-600 font-work-sans">
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
              {editingId ? "Editar Campanha" : "Nova Campanha"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3">
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

              {/* 🆕 Campos do post */}
              <div className="pt-2 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  Post vinculado à campanha:
                </p>
                <Input
                  placeholder="Título do post"
                  value={form.postTitle}
                  onChange={(e) =>
                    setForm({ ...form, postTitle: e.target.value })
                  }
                />
                <textarea
                  placeholder="Conteúdo do post"
                  value={form.postContent}
                  onChange={(e) =>
                    setForm({ ...form, postContent: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md text-sm mt-2"
                  rows={4}
                />
              </div>

              {/* 🖼️ Imagem */}
              <div>
                <p className="text-sm mb-2 text-gray-600">
                  Selecione uma imagem da galeria ou digite o caminho:
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {galleryImages.map((img) => (
                    <img
                      key={img}
                      src={`/${img}`}
                      onClick={() => setForm({ ...form, image: img })}
                      className={`w-16 h-16 object-cover rounded cursor-pointer border ${form.image === img
                        ? "border-orange-500 ring-2 ring-orange-300"
                        : "border-gray-200"
                        }`}
                    />
                  ))}
                </div>
                <Input
                  placeholder="Caminho da imagem (ex: galery/foto.jpg)"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </div>

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
              <label className="text-sm text-gray-600">Progresso (%):</label>
              <Input
                type="number"
                min={0}
                max={100}
                placeholder="Progresso (0 a 100)"
                value={form.progress}
                onChange={(e) =>
                  setForm({ ...form, progress: Number(e.target.value) })
                }
              />
              <Button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white w-full"
                disabled={saving}
              >
                {saving
                  ? "Salvando..."
                  : editingId
                    ? "Salvar Alterações"
                    : "Cadastrar Campanha"}
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
                    {/* ✅ Aqui entra o novo campo de progresso */}
                    <p className="text-sm text-gray-600 mt-1">
                      Progresso: <strong>{camp.progress ?? 0}%</strong>
                    </p>

                    {camp.postTitle && (
                      <p className="text-xs text-gray-600 mt-2">
                        📰 Post: <strong>{camp.postTitle}</strong>
                      </p>
                    )}

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
                <CardContent className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleStatus(camp)}
                  >
                    {camp.active ? "Desativar" : "Ativar"}
                  </Button>
                  <Button size="sm" onClick={() => handleEdit(camp)}>
                    Editar
                  </Button>
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

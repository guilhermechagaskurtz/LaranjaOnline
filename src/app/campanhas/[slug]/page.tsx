"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Campaign {
  id?: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  postTitle?: string;
  postContent?: string;
}

export default function CampaignPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchCampaign = async () => {
      try {
        const q = query(collection(db, "campaigns"), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          setCampaign({ id: doc.id, ...doc.data() } as Campaign);
        }
      } catch (err) {
        console.error("Erro ao buscar campanha:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [slug]);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Carregando...</p>;

  if (!campaign)
    return (
      <div className="text-center mt-20">
        <p className="text-gray-600 mb-4">Campanha não encontrada 😕</p>
        <Button onClick={() => router.push("/")}>Voltar</Button>
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* 🖼️ Imagem lateral */}
        {campaign.image && (
          <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
            <img
              src={`/${campaign.image}`}
              alt={campaign.title}
              className="rounded-2xl shadow-md object-cover w-80 h-80 md:w-[420px] md:h-[420px]"
            />
          </div>
        )}

        {/* 📄 Conteúdo */}
        <div className="flex-1 text-center md:text-left">
          <Badge className="bg-orange-100 text-orange-700 mb-4 font-work-sans">
            {campaign.slug}
          </Badge>

          <h1 className="text-3xl md:text-4xl font-bold text-orange-700 mb-4 font-work-sans">
            {campaign.title}
          </h1>

          <p className="text-gray-700 mb-6 leading-relaxed max-w-2xl mx-auto md:mx-0">
            {campaign.description}
          </p>

          {/* 📰 Post vinculado */}
          {campaign.postTitle && (
            <div className="mt-10 bg-white border border-orange-100 rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {campaign.postTitle}
              </h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {campaign.postContent}
              </p>
            </div>
          )}

          <div className="mt-10 flex justify-center md:justify-start">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="text-orange-600 border-orange-300 hover:bg-orange-100"
            >
              ← Voltar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

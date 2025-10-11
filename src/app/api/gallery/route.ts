// src/app/api/gallery/route.ts
import { NextResponse } from "next/server";
// Importe o JSON gerado estaticamente
import galleryData from "@/lib/gallery-data.json";

export const runtime = "edge";

export async function GET() {
  // Apenas retorne os dados do arquivo importado
  return NextResponse.json(galleryData);
}

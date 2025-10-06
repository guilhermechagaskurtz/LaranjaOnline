import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const galleryPath = path.join(process.cwd(), "public", "galery");

    // lê os arquivos da pasta
    const files = fs
      .readdirSync(galleryPath)
      .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
      .map((file) => `galery/${file}`);

    return NextResponse.json({ images: files });
  } catch (error) {
    console.error("Erro ao listar imagens:", error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}

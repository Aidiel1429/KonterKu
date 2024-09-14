import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    await prisma.barang.create({
      data: {
        kodeBarang: String(formData.get("kodeBarang")),
        nama: String(formData.get("nama")),
        stok: Number(formData.get("stok")),
        merek: String(formData.get("merek")),
        kategoriId: Number(formData.get("kategoriId")),
        hargaJual: Number(formData.get("hargaJual")),
        hargaModal: Number(formData.get("hargaModal")),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ pesan: "sukses" });
  } catch (error) {
    console.log("Terjadi Kesalahan : ", error);
    return NextResponse.json({ pesan: "gagal" });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  try {
    const data = await prisma.barang.findMany({
      where: {
        nama: {
          contains: query, // Cari berdasarkan nama barang yang mengandung input
          mode: "insensitive", // Tidak case-sensitive
        },
        stok: {
          gt: 0, // Hanya ambil barang dengan stok lebih dari 0
        },
      },
      orderBy: {
        id: "asc",
      },
      include: {
        Kategori: true,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("Terjadi Kesalahan : ", error);
    return NextResponse.json({ pesan: "gagal" }, { status: 500 });
  }
}

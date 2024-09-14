import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    await prisma.jasaServis.create({
      data: {
        kodeServis: String(formData.get("kodeServis")),
        namaBarang: String(formData.get("namaBarang")),
        nama: String(formData.get("nama")),
        deskripsi: String(formData.get("deskripsi")),
        tanggal: new Date(String(formData.get("tanggal"))),
        harga: Number(formData.get("harga")),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ pesan: "sukses" });
  } catch (error) {
    console.log("Terjadi Kesalahan : ", error);
    return NextResponse.json({ pesan: "gagal" });
  }
}

export async function GET() {
  const res = await prisma.jasaServis.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return NextResponse.json(res, { status: 200 });
}

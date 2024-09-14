import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  try {
    const { kodeBarang, nama, stok, merek, kategoriId, hargaJual, hargaModal } =
      await request.json();

    await prisma.barang.update({
      where: {
        id: Number(id),
      },
      data: {
        kodeBarang: String(kodeBarang),
        nama: String(nama),
        stok: Number(stok),
        merek: String(merek),
        kategoriId: Number(kategoriId),
        hargaJual: Number(hargaJual),
        hargaModal: Number(hargaModal),
      },
    });

    return NextResponse.json({ pesan: "sukses" });
  } catch (error) {
    console.log("Terjadi Kesalahan : ", error);
    return NextResponse.json({ pesan: "gagal" });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  try {
    await prisma.barang.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ pesan: "sukses" });
  } catch (error) {
    console.log("Terjadi Kesalahan : ", error);
    return NextResponse.json({ pesan: "gagal" });
  }
}

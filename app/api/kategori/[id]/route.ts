import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: number } }
) {
  try {
    const { nama } = await request.json();
    await prisma.kategori.update({
      where: {
        id: Number(params.id),
      },
      data: {
        nama: String(nama),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.log("Terjadi Kesalahan : ", error);
    return NextResponse.json({ pesan: "gagal" });
  }

  return NextResponse.json({ pesan: "sukses" });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  try {
    await prisma.kategori.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.log("Terjadi Kesalahan : ", error);
  }

  return NextResponse.json({ pesan: "sukses" });
}

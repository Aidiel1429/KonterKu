import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  try {
    const { status } = await request.json();

    await prisma.service.update({
      where: {
        id: Number(id),
      },
      data: {
        status: String(status),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ pesan: "sukses" });
  } catch (error) {
    console.log("Terjadi Kesalahan", error);
    return NextResponse.json({ pesan: "gagal" });
  }
}

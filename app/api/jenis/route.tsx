import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    await prisma.jenisService.create({
      data: {
        nama: String(formData.get("nama")),
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
  const data = await prisma.jenisService.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json(data, { status: 200 });
}

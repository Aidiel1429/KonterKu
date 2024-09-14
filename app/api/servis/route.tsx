import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const res = await prisma.service.create({
      data: {
        kodeServis: String(formData.get("kodeServis")),
        nama: String(formData.get("nama")),
        nope: String(formData.get("nope")),
        deskripsi: String(formData.get("deskripsi")),
        namaBarang: String(formData.get("namaBarang")),
        nomorSeri: String(formData.get("nomorSeri")),
        tanggal: String(formData.get("tanggal")),
        jenisId: Number(formData.get("jenisId")),
        status: String(formData.get("status")),
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
  try {
    const res = await prisma.service.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        JenisService: true,
      },
    });
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log("Terjadi kesalahan : ", error);
  }
}

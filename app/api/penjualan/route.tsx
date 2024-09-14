import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Menggunakan JSON.parse dari body
    const barangTerpilih = body.barangTerpilih; // Ambil array barang terpilih
    const grandTotal = body.grandTotal;

    if (!barangTerpilih || barangTerpilih.length === 0) {
      return NextResponse.json({ pesan: "Tidak ada barang yang dipilih" });
    }

    let calculatedGrandTotal = 0;

    for (const barang of barangTerpilih) {
      if (!barang.kodeBarang || !barang.qty || !barang.hargaJual) {
        return NextResponse.json({ pesan: "Data barang tidak lengkap" });
      }

      const subtotal = barang.hargaJual * barang.qty;
      calculatedGrandTotal += subtotal;

      await prisma.penjualanBarang.create({
        data: {
          kodeBarang: barang.kodeBarang,
          namaBarang: barang.nama,
          qty: barang.qty,
          subTotal: subtotal,
          grandTotal: grandTotal,
          tanggal: new Date(),
          updatedAt: new Date(),
        },
      });

      await prisma.barang.update({
        where: { kodeBarang: barang.kodeBarang },
        data: {
          stok: {
            decrement: barang.qty,
          },
        },
      });
    }

    if (grandTotal !== calculatedGrandTotal) {
      console.warn(
        "Grand total yang dihitung tidak sesuai dengan grand total yang diterima"
      );
    }

    return NextResponse.json({ pesan: "sukses" });
  } catch (error) {
    console.error("Terjadi Kesalahan: ", error);
    return NextResponse.json({ pesan: "gagal", error });
  }
}

export async function GET() {
  const data = await prisma.penjualanBarang.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return NextResponse.json(data, { status: 200 });
}

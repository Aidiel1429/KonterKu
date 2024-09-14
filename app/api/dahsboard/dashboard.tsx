import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Ambil data penjualan
    const penjualanData = await prisma.penjualanBarang.findMany();
    const totalPendapatanPenjualan = penjualanData.reduce(
      (total, item) => total + item.grandTotal,
      0
    );
    const totalTransaksiPenjualan = penjualanData.length;

    // Ambil data servis
    const servisData = await prisma.jasaServis.findMany();
    const totalPendapatanServis = servisData.reduce(
      (total, item) => total + item.harga,
      0
    );
    const totalTransaksiServis = servisData.length;

    // Hitung total pendapatan dan total transaksi
    const totalPendapatan = totalPendapatanPenjualan + totalPendapatanServis;
    const totalTransaksi = totalTransaksiPenjualan + totalTransaksiServis;

    return NextResponse.json({
      totalPendapatan,
      totalTransaksi,
    });
  } catch (error) {
    console.error("Terjadi Kesalahan: ", error);
    return NextResponse.json({ pesan: "gagal", error });
  }
}

"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartPenjualan from "./components/chart/chartPenjualan";
import ChartServis from "./components/chart/chartServis";
import Skeleton from "./components/skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PenjualanBarang {
  id: number;
  kodeBarang: string;
  namaBarang: string;
  qty: number;
  grandTotal: number;
  subTotal: number;
  tanggal: string; // or Date if you want to convert it
  createdAt: string; // or Date if you want to convert it
  updatedAt: string; // or Date if you want to convert it
}

interface Servis {
  id: number;
  namaServis: string;
  harga: number;
  tanggal: string; // or Date if you want to convert it
}

const Dashboard = () => {
  const [penjualanData, setPenjualanData] = useState<PenjualanBarang[]>([]);
  const [servisData, setServisData] = useState<Servis[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalTransaksi, setTotalTransaksi] = useState(0);
  const [totalPendapatan, setTotalPendapatan] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from APIs
        const penjualanResponse = await fetch("/api/penjualan");
        const penjualanData: PenjualanBarang[] = await penjualanResponse.json();

        const servisResponse = await fetch("/api/laporanServis");
        const servisData: Servis[] = await servisResponse.json();

        // Process data
        const totalTransaksiPenjualan = penjualanData.length;
        const totalPendapatanPenjualan = penjualanData.reduce(
          (acc, item) => acc + item.grandTotal,
          0
        );

        const totalTransaksiServis = servisData.length;
        const totalPendapatanServis = servisData.reduce(
          (acc, item) => acc + item.harga,
          0
        );

        setTotalTransaksi(totalTransaksiPenjualan + totalTransaksiServis);
        setTotalPendapatan(totalPendapatanPenjualan + totalPendapatanServis);
        setPenjualanData(penjualanData);
        setServisData(servisData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Skeleton />;

  return (
    <div className="p-3">
      <div className="mb-8 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-blue-600">
          Selamat datang kembali, Admin!
        </h2>
        <p className="text-gray-600">
          Berikut adalah ringkasan Transaksi Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-md shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-600">
            Total Transaksi
          </h3>
          <p className="text-3xl font-bold text-blue-600">{totalTransaksi}</p>
        </div>
        <div className="bg-white p-6 rounded-md shadow-md text-center">
          <h3 className="text-lg font-semibold text-gray-600">
            Total Pendapatan
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            Rp {totalPendapatan.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ChartPenjualan />
        <ChartServis />
      </div>
    </div>
  );
};

export default Dashboard;


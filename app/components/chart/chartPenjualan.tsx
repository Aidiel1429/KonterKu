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
  TooltipItem,
} from "chart.js";
import axios from "axios";

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
  tanggal: string; // atau Date jika ingin dikonversi
  createdAt: string; // atau Date jika ingin dikonversi
  updatedAt: string; // atau Date jika ingin dikonversi
}

const ChartPenjualan = () => {
  const [penjualanData, setPenjualanData] = useState<PenjualanBarang[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"harian" | "bulanan" | "tahunan">("bulanan");

  useEffect(() => {
    fetchDataPenjualan();
  }, []);

  const fetchDataPenjualan = async () => {
    try {
      const res = await axios.get("/api/penjualan");
      console.log("Data yang di-fetch:", res.data);
      setPenjualanData(res.data);
    } catch (error) {
      console.log("Terjadi Kesalahan:", error);
    } finally {
      setLoading(false);
    }
  };

  const aggregateData = (interval: "harian" | "bulanan" | "tahunan") => {
    return penjualanData.reduce((acc, item) => {
      const date = new Date(item.tanggal);
      let label: string;

      if (interval === "harian") {
        label = date.toLocaleDateString();
      } else if (interval === "bulanan") {
        label = date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
      } else {
        label = date.getFullYear().toString();
      }

      if (!acc[label]) {
        acc[label] = 0;
      }
      acc[label] += item.grandTotal;
      return acc;
    }, {} as Record<string, number>);
  };

  const chartData = (interval: "harian" | "bulanan" | "tahunan") => ({
    labels: Object.keys(aggregateData(interval)),
    datasets: [
      {
        label: "Pendapatan",
        data: Object.values(aggregateData(interval)),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        borderRadius: 5,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: `Grafik Penjualan ${
          view.charAt(0).toUpperCase() + view.slice(1)
        }`,
        font: {
          size: 18,
          weight: "bold" as "bold", // Tipe yang benar
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<"bar">) {
            return `Rp ${(tooltipItem.raw as number).toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          font: {
            size: 14,
          },
          callback: function (value: number | string) {
            if (typeof value === "number") {
              return `Rp ${value.toLocaleString()}`;
            }
            return `Rp ${parseFloat(value).toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">Penjualan</h3>
        <button
          className="text-light text-sm cursor-pointer"
          onClick={() =>
            setView(
              view === "bulanan"
                ? "harian"
                : view === "harian"
                ? "tahunan"
                : "bulanan"
            )
          }
        >
          {view === "bulanan"
            ? "Lihat Harian"
            : view === "harian"
            ? "Lihat Tahunan"
            : "Lihat Bulanan"}
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Bar data={chartData(view)} options={chartOptions} />
      )}
    </div>
  );
};

export default ChartPenjualan;

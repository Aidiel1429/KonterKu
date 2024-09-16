"use client";
import Skeleton from "@/app/components/skeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const Penjualan = () => {
  const [laporan, setLaporan] = useState<any[]>([]);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPendapatan, setTotalPendapatan] = useState<number>(0);

  const [loading, setLoading] = useState(true);

  // Fungsi untuk memuat data dan mengatur loading
  useEffect(() => {
    const fetchData = async () => {
      try {
        const laporanServis = await axios.get("/api/laporanServis");
        const hasil = laporanServis.data;
        setLaporan(hasil);
        setLoading(false); // Set loading ke false setelah data berhasil diambil
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Pastikan loading juga dihentikan jika terjadi error
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    calculateTotalPendapatan();
  }, [laporan]);

  const calculateTotalPendapatan = () => {
    const total = laporan.reduce((sum, item) => sum + (item.harga || 0), 0);
    setTotalPendapatan(total);
  };

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = laporan.filter(
    (item: any) =>
      (item.nama &&
        item.nama.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.kodeServis &&
        item.kodeServis.toLowerCase().includes(filterText.toLowerCase()))
  );

  const columns = [
    {
      name: "No",
      cell: (row: any, index: number) => (
        <div>{(currentPage - 1) * itemsPerPage + index + 1}</div>
      ),
      sortable: false,
      width: "80px",
    },
    {
      name: "Kode Servis",
      selector: (row: any) => row.kodeServis,
      sortable: true,
    },
    {
      name: "Nama Barang",
      selector: (row: any) => row.namaBarang,
      sortable: true,
    },
    {
      name: "Nama Pelanggan",
      selector: (row: any) => row.nama,
      sortable: true,
    },
    {
      name: "Harga",
      selector: (row: any) =>
        "Rp " +
        new Intl.NumberFormat("id-ID", {
          style: "decimal",
          minimumFractionDigits: 0,
        }).format(row.harga),
      sortable: true,
    },
    {
      name: "Tanggal Antar",
      selector: (row: any) => {
        const date = new Date(row.tanggal);
        return date.toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
      sortable: true,
    },
    {
      name: "Tanggal Ambil",
      selector: (row: any) => {
        const date = new Date(row.createdAt);
        return date.toLocaleDateString("id-ID", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
      sortable: true,
    },
  ];

  // Menampilkan Skeleton saat loading
  if (loading) return <Skeleton />;

  return (
    <>
      <div className="lg:flex m-5 text-base gap-10 text-slate-700 lg:text-xl">
        <div className="bg-white w-full rounded-md shadow-md p-5 lg:h-40 text-center flex flex-col items-center justify-center mb-5">
          <p className="lg:text-xl font-semibold text-slate-500">
            Total Servis
          </p>
          <br />
          <p className="text-xl lg:text-3xl font-bold">
            {filteredItems.length}
          </p>
        </div>
        <div className="bg-white w-full rounded-md shadow-md p-5 lg:h-40 text-center flex flex-col items-center justify-center">
          <p className="lg:text-xl font-semibold text-slate-500">Pendapatan</p>
          <br />
          <p className="text-xl lg:text-3xl font-bold text-green-500">
            {"Rp " +
              new Intl.NumberFormat("id-ID", {
                style: "decimal",
                minimumFractionDigits: 0,
              }).format(totalPendapatan)}
          </p>
        </div>
      </div>
      <div className="p-4 m-5 text-base bg-white shadow-md rounded-md text-slate-700 lg:text-xl">
        <div className="flex justify-end items-center">
          <div className="my-4 w-full lg:w-[400px]">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Cari berdasarkan nama pelanggan atau kode servis..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          persistTableHead
          responsive
          paginationPerPage={itemsPerPage}
          paginationTotalRows={filteredItems.length}
          onChangePage={(page) => setCurrentPage(page)}
          onChangeRowsPerPage={handleRowsPerPageChange}
          paginationRowsPerPageOptions={[5, 10]}
        />
      </div>
    </>
  );
};

export default Penjualan;

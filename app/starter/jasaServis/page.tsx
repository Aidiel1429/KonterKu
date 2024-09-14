"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { RiCloseLargeLine } from "react-icons/ri";
import Tambah from "./components/button/Tambah";
import Batal from "./components/button/batal";
import SelesaiServis from "./components/button/selesaiServis";
import SelesaiBayar from "./components/button/selesaiBayar";

const Stok = () => {
  const [servis, setServis] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showAlert, setShowAlert] = useState(false);
  const [showErorr, setShowErorr] = useState(false);

  useEffect(() => {
    loadServis();
  }, []);

  const loadServis = async () => {
    try {
      const res = await axios.get("/api/servis");
      const data = res.data;
      setServis(data);
    } catch (error) {
      console.log("Terjadi Kesalahan : ", error);
    }
  };

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const filteredItems = servis.filter(
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
      selector: (row: any) => (
        <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
          {row.kodeServis}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Nama Pelanggan",
      selector: (row: any) => (
        <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
          {row.nama}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Nomor HP",
      selector: (row: any) => (
        <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
          {row.nope}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Nama Barang",
      selector: (row: any) => (
        <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
          {row.namaBarang}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Nomor Seri",
      selector: (row: any) => (
        <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
          {row.nomorSeri}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Deskripsi",
      selector: (row: any) => (
        <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
          {row.deskripsi}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Tanggal",
      selector: (row: any) => {
        const date = new Date(row.tanggal);
        return date.toLocaleDateString("id-ID", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
      sortable: true,
    },
    {
      name: "Jenis Servis",
      selector: (row: any) => row.JenisService?.nama,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
      sortable: true,
      cell: (row: any) => {
        if (row.status == "Diproses") {
          return (
            <div className="bg-yellow-400 p-2 rounded-md text-white font-semibold">
              Diproses
            </div>
          );
        } else if (row.status == "Selesai Servis") {
          return (
            <div className="bg-green-600 p-2 rounded-md text-white font-semibold">
              Selesai Servis
            </div>
          );
        } else if (row.status == "Selesai Bayar") {
          return (
            <div className="bg-green-400 p-2 rounded-md text-white font-semibold">
              Selesai Bayar
            </div>
          );
        } else if (row.status == "Dibatalkan") {
          return (
            <div className="bg-gray-200 text-xs p-2 md:text-md rounded-md text-slate-700 font-semibold">
              Dibatalkan
            </div>
          );
        }
      },
    },
    {
      name: "Aksi",
      cell: (row: any) => (
        <div className="flex gap-2 items-center">
          <SelesaiBayar
            loadServis={loadServis}
            status={row.status}
            id={row.id}
            kodeServis={row.kodeServis}
            namaBarang={row.namaBarang}
            nama={row.nama}
            tanggal={row.tanggal}
            deskripsi={row.deskripsi}
          />
          <SelesaiServis
            loadServis={loadServis}
            status={row.status}
            id={row.id}
          />
          <Batal loadServis={loadServis} status={row.status} id={row.id} />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="p-4 m-5 text-base bg-white shadow-md rounded-md text-slate-700 lg:text-xl">
        <h1>Halaman Jasa Servis</h1>
      </div>
      <div className="p-4 m-5 text-base bg-white shadow-md rounded-md text-slate-700 lg:text-xl">
        <div className="lg:flex justify-between items-center w-full">
          <Tambah loadServis={loadServis} />
          <div className="my-4 lg:w-[400px]">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Cari berdasarkan nama atau kode servis..."
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
      {showAlert && (
        <div className="toast toast-end">
          <div className="alert alert-success flex gap-5 items-center text-white">
            <span>Data Berhasil Dihapus!</span>
            <span
              className="p-2 hover:bg-white/30 cursor-pointer rounded-md transition-all"
              onClick={handleAlertClose}
            >
              <RiCloseLargeLine />
            </span>
          </div>
        </div>
      )}
      {showErorr && (
        <div className="toast toast-end">
          <div className="alert alert-error flex gap-5 items-center text-white">
            <span>Data Gagal Dihapus!</span>
            <span
              className="p-2 hover:bg-white/30 cursor-pointer rounded-md transition-all"
              onClick={() => setShowErorr(false)}
            >
              <RiCloseLargeLine />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Stok;

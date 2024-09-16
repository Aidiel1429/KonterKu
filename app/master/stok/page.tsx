"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CiEdit } from "react-icons/ci";
import TambahStok from "./components/button/tambah";
import HapusStok from "./components/button/hapus";
import { RiCloseLargeLine } from "react-icons/ri";
import EditStok from "./components/button/edit";

const Stok = () => {
  const [stok, setStok] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showAlert, setShowAlert] = useState(false);
  const [showErorr, setShowErorr] = useState(false);
  const [almostOutOfStock, setAlmostOutOfStock] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    loadStok();
  }, []);

  const loadStok = async () => {
    try {
      const res = await axios.get("/api/stok");
      const data = res.data;
      setStok(data);

      // Filter items with stock of 1 and update the almostOutOfStock state
      const lowStockItems = data.filter((item: any) => item.stok === 1);
      setAlmostOutOfStock(lowStockItems);
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

  const filteredItems = stok.filter(
    (item: any) =>
      (item.nama &&
        item.nama.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.kodeBarang &&
        item.kodeBarang.toLowerCase().includes(filterText.toLowerCase()))
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
      name: "Kode Barang",
      selector: (row: any) => row.kodeBarang,
      sortable: true,
    },
    {
      name: "Nama Barang",
      selector: (row: any) => row.nama,
      sortable: true,
    },
    {
      name: "Stok",
      selector: (row: any) => row.stok,
      sortable: true,
    },
    {
      name: "Merek",
      selector: (row: any) => row.merek,
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row: any) => row.Kategori?.nama,
      sortable: true,
    },
    {
      name: "Harga Modal",
      selector: (row: any) =>
        "Rp " +
        new Intl.NumberFormat("id-ID", {
          style: "decimal",
          minimumFractionDigits: 0,
        }).format(row.hargaModal),
      sortable: true,
    },
    {
      name: "Harga Jual",
      selector: (row: any) =>
        "Rp " +
        new Intl.NumberFormat("id-ID", {
          style: "decimal",
          minimumFractionDigits: 0,
        }).format(row.hargaJual),
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row: any) => (
        <div className="flex gap-2 items-center">
          <EditStok
            id={row.id}
            loadStok={loadStok}
            nama={row.nama}
            merek={row.merek}
            stok={row.stok}
            kategoriId={row.kategoriId}
            hargaModal={row.hargaModal}
            hargaJual={row.hargaJual}
            kodeBarang={row.kodeBarang}
          />
          <HapusStok
            id={row.id}
            loadStok={loadStok}
            setShowAlert={setShowAlert}
            setShowErorr={setShowErorr}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="p-4 m-5 text-base bg-white shadow-md rounded-md text-slate-700 lg:text-xl">
        <h1>Halaman Stok</h1>
      </div>
      <div className="p-4 m-5 text-base bg-white shadow-md rounded-md text-slate-700 lg:text-xl">
        <div className="lg:flex justify-between items-center">
          <TambahStok loadStok={loadStok} />
          <div className="my-4 lg:w-[400px]">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Cari berdasarkan nama atau kode barang..."
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
          paginationRowsPerPageOptions={[5, 10, 20]}
        />
      </div>
      {almostOutOfStock.length > 0 && (
        <div className="toast toast-end">
          <div className="alert alert-warning flex gap-5 items-center text-white">
            <span>Beberapa barang hampir habis!</span>
            <span
              className="p-2 hover:bg-white/30 cursor-pointer rounded-md transition-all"
              onClick={() => setAlmostOutOfStock([])}
            >
              <RiCloseLargeLine />
            </span>
          </div>
        </div>
      )}
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

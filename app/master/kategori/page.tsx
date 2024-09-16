"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CiEdit } from "react-icons/ci";
import TambahKategori from "./components/button/tambah";
import HapusKategori from "./components/button/hapus";
import EditKategori from "./components/button/edit";
import { RiCloseLargeLine } from "react-icons/ri";

const Kategori = () => {
  const [kategori, setKategori] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showAlert, setShowAlert] = useState(false);

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
    loadKategori();
  }, []);

  const loadKategori = async () => {
    try {
      const res = await axios.get("/api/kategori");
      const data = res.data;
      setKategori(data);
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

  const filteredItems = kategori.filter(
    (item: any) =>
      item.nama && item.nama.toLowerCase().includes(filterText.toLowerCase())
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
      name: "Nama Kategori",
      selector: (row: any) => row.nama,
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row: any) => (
        <div className="flex gap-2 items-center">
          <EditKategori
            id={row.id}
            loadKategori={loadKategori}
            nama={row.nama}
          />
          <HapusKategori
            id={row.id}
            loadKategori={loadKategori}
            setShowAlert={setShowAlert}
          />
        </div>
      ),
    },
  ];

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div className="p-4 m-5 text-base bg-white shadow-md rounded-md text-slate-700 lg:text-xl">
        <h1>Halaman Kategori</h1>
      </div>
      <div className="p-4 m-5 text-base bg-white shadow-md rounded-md text-slate-700 lg:text-xl">
        <div>
          <TambahKategori loadKategori={loadKategori} />
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
      {showAlert && (
        <div className="toast toast-end">
          <div className="alert alert-success flex gap-5 items-center text-white">
            <span>Data Berhasil Dihapus!</span>
            <span
              className="p-2 hover:bg-white/30 cursor-pointer rounded-md transition-all"
              onClick={handleCloseAlert}
            >
              <RiCloseLargeLine />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Kategori;

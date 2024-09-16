"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import TambahJenis from "./components/button/tambah";
import HapusJenis from "./components/button/hapus";
import { RiCloseLargeLine } from "react-icons/ri";
import EditJenis from "./components/button/edit";
import Skeleton from "@/app/components/skeleton";

const JenisServis = () => {
  const [jenis, setJenis] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showAlert, setShowAlert] = useState(false);
  const [showErorr, setShowErorr] = useState(false);

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
    loadJenis();
  }, []);

  const loadJenis = async () => {
    try {
      const res = await axios.get("/api/jenis");
      const hasil = res.data;
      setJenis(hasil);
    } catch (error) {
      console.log("Terjadi Kesalahan : ", error);
    }
  };

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = jenis.filter(
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
          <EditJenis id={row.id} loadJenis={loadJenis} nama={row.nama} />
          <HapusJenis
            id={row.id}
            loadJenis={loadJenis}
            setShowAlert={setShowAlert}
          />
        </div>
      ),
    },
  ];

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleCloseErorr = () => {
    setShowErorr(false);
  };

  if (loading) return <Skeleton />;
  return (
    <>
      <div className="p-4 m-5 text-base bg-white shadow-md rounded-md text-slate-700 lg:text-xl">
        <h1>Halaman Jenis Servis</h1>
      </div>
      <div className="p-4 m-5 text-base bg-white shadow-md rounded-md text-slate-700 lg:text-xl">
        <div className="mb-5">
          <TambahJenis loadJenis={loadJenis} />
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
      {showErorr && (
        <dialog id="my_modal_2" className="modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Error!</h3>
            <p className="py-4">Gagal Hapus Data!</p>
            <div className="modal-action">
              <button onClick={handleCloseErorr} className="btn btn-ghost">
                Tutup
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={handleCloseErorr}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
};

export default JenisServis;

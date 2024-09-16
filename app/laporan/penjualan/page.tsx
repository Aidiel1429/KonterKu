"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaTrash } from "react-icons/fa6";
import { RiCloseLargeLine } from "react-icons/ri";

const Penjualan = () => {
  const [laporan, setLaporan] = useState<any[]>([]);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPendapatan, setTotalPendapatan] = useState<number>(0);
  const [selectedRows, setSelectedRows] = useState<any[]>([]); // Menyimpan data yang dipilih
  const [selectAll, setSelectAll] = useState(false); // State untuk "Select All"
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
    loadPenjualan();
  }, []);

  const loadPenjualan = async () => {
    try {
      const res = await axios.get("/api/penjualan");
      const hasil: any[] = res.data;
      setLaporan(hasil);

      const total = hasil.reduce(
        (acc: number, item: { subTotal: number }) => acc + item.subTotal,
        0
      );
      setTotalPendapatan(total);
    } catch (error) {
      console.log("Terjadi Kesalahan: ", error);
    }
  };

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = laporan.filter(
    (item: any) =>
      (item.namaBarang &&
        item.namaBarang.toLowerCase().includes(filterText.toLowerCase())) ||
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
      selector: (row: any) => row.namaBarang,
      sortable: true,
    },
    {
      name: "Qty",
      selector: (row: any) => row.qty,
      sortable: true,
    },
    {
      name: "Sub Total",
      selector: (row: any) =>
        "Rp " +
        new Intl.NumberFormat("id-ID", {
          style: "decimal",
          minimumFractionDigits: 0,
        }).format(row.subTotal),
      sortable: true,
    },
    {
      name: "Tanggal",
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

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div className="lg:flex m-5 text-base gap-10 text-slate-700 lg:text-xl">
        <div className="bg-white w-full rounded-md shadow-md p-5 lg:h-40 text-center flex flex-col items-center justify-center mb-5">
          <p className="lg:text-xl font-semibold text-slate-500">
            Total Penjualan
          </p>
          <br />
          <p className="text-xl lg:text-3xl font-bold ">
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
          <div className="my-4 lg:w-[400px]">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Cari berdasarkan kode barang..."
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

export default Penjualan;

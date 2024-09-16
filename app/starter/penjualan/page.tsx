"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import Search from "./components/Search";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./components/ComponentPrint"; // Update path if necessary
import Skeleton from "@/app/components/skeleton";

const Penjualan = () => {
  const [barangTerpilih, setBarangTerpilih] = useState<any[]>([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [printData, setPrintData] = useState<any>(null);
  const [jumlahDibayar, setJumlahDibayar] = useState(0);
  const [kembalian, setKembalian] = useState(0);
  const componentRef = useRef<HTMLDivElement>(null);
  const [showPrintButton, setShowPrintButton] = useState(false); // Menampilkan tombol print setelah simpan

  const router = useRouter();

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

  // Hitung total harga secara otomatis saat barang dipilih atau qty berubah
  useEffect(() => {
    setGrandTotal(
      barangTerpilih.reduce((total, b) => total + b.hargaJual * b.qty, 0)
    );
  }, [barangTerpilih]);

  // Hitung kembalian ketika jumlah dibayar diinput
  useEffect(() => {
    setKembalian(jumlahDibayar - grandTotal);
  }, [jumlahDibayar, grandTotal]);

  // Menambah barang ke daftar barang terpilih
  const handleSelectItem = (item: any) => {
    setBarangTerpilih([...barangTerpilih, { ...item, qty: 1 }]);
  };

  // Menghapus barang dari daftar
  const handleRemoveItem = (index: number) => {
    setBarangTerpilih(barangTerpilih.filter((_, i) => i !== index));
  };

  // Mengubah jumlah barang yang dipilih
  const handleQtyChange = (index: number, newQty: number) => {
    setBarangTerpilih(
      barangTerpilih.map((barang, i) =>
        i === index ? { ...barang, qty: newQty } : barang
      )
    );
  };

  // Simpan transaksi
  const handleSimpan = async () => {
    try {
      const { data } = await axios.post("/api/penjualan", {
        barangTerpilih: barangTerpilih.map((barang) => ({
          kodeBarang: barang.kodeBarang,
          nama: barang.nama,
          qty: barang.qty,
          hargaJual: barang.hargaJual,
        })),
        grandTotal: grandTotal,
        jumlahDibayar,
        kembalian,
      });

      if (data.pesan === "sukses") {
        // Simpan data untuk print
        setPrintData({
          barangTerpilih,
          grandTotal,
          jumlahDibayar,
          kembalian,
        });
        setShowPrintButton(true); // Tampilkan tombol Print
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fungsi untuk redirect setelah print selesai
  const handlePrintAndRedirect = () => {
    if (componentRef.current) {
      setTimeout(() => {
        router.push("/laporan/penjualan");
      }, 1000); // Delay untuk memastikan print selesai sebelum redirect
    }
  };

  // Format uang dalam Rupiah
  const formatRupiah = (angka: number) => {
    return angka.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Format tanggal sesuai lokal Indonesia
  const formatTanggal = (tanggal: string) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <Skeleton />;

  return (
    <>
      <div className="p-4 m-5 text-base bg-white shadow-md rounded-md text-slate-700 lg:text-xl">
        <h1>Halaman Penjualan</h1>
      </div>
      <div className="p-4 m-5 text-base bg-white shadow-md rounded-md text-slate-700 lg:text-xl">
        <div className="flex justify-end w-full">
          <Search onSelectItem={handleSelectItem} />
        </div>

        <div className="overflow-x-auto mt-5">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Kode Barang</th>
                <th>Nama Barang</th>
                <th>Harga</th>
                <th>Qty</th>
                <th>Sub Total</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {barangTerpilih.map((barang, index) => (
                <tr key={index} className="hover">
                  <th>{index + 1}</th>
                  <td>
                    <input
                      type="text"
                      className="cursor-default border-none focus:ring-0 outline-none bg-inherit"
                      value={barang.kodeBarang}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="cursor-default border-none focus:ring-0 outline-none bg-inherit"
                      value={barang.nama}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="cursor-default border-none focus:ring-0 outline-none bg-inherit"
                      value={barang.hargaJual.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="input input-bordered input-md text-center bg-inherit"
                      value={barang.qty}
                      onChange={(e) =>
                        handleQtyChange(index, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <h1>
                      <span>
                        {(barang.hargaJual * barang.qty).toLocaleString(
                          "id-ID",
                          {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }
                        )}
                      </span>
                    </h1>
                  </td>
                  <td>
                    <button
                      className="text-2xl"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <IoMdCloseCircleOutline className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Grand Total */}
        <div className="py-12 flex justify-between items-center font-bold lg:text-2xl">
          <div className="text-end mr-20 text-sm lg:text-lg lg:w-9/12">
            Grand Total
          </div>
          <div className="text-green-500 text-center lg:w-1/4">
            {grandTotal.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </div>
        </div>

        {/* Payment Section */}
        <div className="py-4">
          <label className="block text-base font-bold">
            Jumlah Uang Dibayar
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Rp
            <input
              type="text"
              className="grow"
              value={jumlahDibayar}
              onChange={(e) => setJumlahDibayar(parseFloat(e.target.value))}
              placeholder="Masukkan Jumlah Dibayar"
            />
          </label>
          <label className="block text-base font-bold mt-2">Kembalian</label>
          <input
            type="text"
            className="input input-bordered input-md w-full bg-inherit"
            value={kembalian.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
            readOnly
          />
        </div>

        <div className="modal-action gap-2">
          {!showPrintButton ? (
            <button
              className="btn btn-primary text-white"
              onClick={handleSimpan}
              disabled={jumlahDibayar < grandTotal}
            >
              Tambah
            </button>
          ) : (
            <ReactToPrint
              trigger={() => (
                <button className="btn btn-warning text-white mt-4">
                  Print
                </button>
              )}
              content={() => componentRef.current}
              onAfterPrint={handlePrintAndRedirect}
            />
          )}
        </div>
      </div>
      <div style={{ display: "none" }}>
        {printData && (
          <div ref={componentRef}>
            <ComponentToPrint
              barangTerpilih={printData.barangTerpilih}
              grandTotal={printData.grandTotal}
              jumlahDibayar={printData.jumlahDibayar}
              kembalian={printData.kembalian}
              formatRupiah={formatRupiah}
              formatTanggal={formatTanggal}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Penjualan;

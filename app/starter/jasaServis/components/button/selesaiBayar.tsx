import axios from "axios";
import React, { ReactHTML, useEffect, useRef, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { MdOutlinePayments } from "react-icons/md";
import { useRouter } from "next/navigation";
import PrintBayar from "../printBayar";
import ReactToPrint from "react-to-print";

interface BayarProps {
  id: number;
  loadServis: Function;
  status: string;
  kodeServis: string;
  namaBarang: string;
  nama: string;
  tanggal: string;
  deskripsi: string;
}

const SelesaiBayar = ({
  id,
  loadServis,
  status,
  kodeServis,
  namaBarang,
  nama,
  tanggal,
  deskripsi,
}: BayarProps) => {
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [jumlahDibayar, setJumlahDibayar] = useState<number>(0);
  const [kembalian, setKembalian] = useState<number>(0);

  const [ekodeServis, setKodeServis] = useState(kodeServis);
  const [enamaBarang, setNamaBarang] = useState(namaBarang);
  const [enama, setNama] = useState(nama);
  const [etanggal, setTanggal] = useState(tanggal);
  const [edeskripsi, setDeskripsi] = useState(deskripsi);
  const [harga, setHarga] = useState<number | string>(0);

  const componentRef = useRef<HTMLDivElement>(null);
  const [dataPrint, setDataPrint] = useState<any>({});
  const [showPrintButton, setShowPrintButton] = useState(false);

  const handleOpen = () => {
    if (status === "Selesai Servis") {
      setOpen(!open);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const handleHargaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHarga(value);
    setGrandTotal(Number(value));
  };

  const handleJumlahDibayarChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(e.target.value);
    setJumlahDibayar(value);

    const change = value - grandTotal;
    setKembalian(change > 0 ? change : 0); // Jika uang yang dibayar lebih dari total, hitung kembalian
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatToDateInputValue = (tanggal: string) => {
    const date = new Date(tanggal);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const router = useRouter();

  const handleTambah = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("kodeServis", ekodeServis);
      formData.append("namaBarang", enamaBarang);
      formData.append("nama", enama);
      formData.append("tanggal", etanggal);
      formData.append("deskripsi", edeskripsi);
      formData.append("harga", String(harga));

      const res = await axios.post("/api/laporanServis", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.pesan === "sukses") {
        setShowPrintButton(true);
        setDataPrint({
          kodeServis: ekodeServis,
          namaBarang: enamaBarang,
          nama: enama,
          deskripsi: edeskripsi,
          harga: String(harga),
          jumlahDibayar: String(jumlahDibayar),
          kembalian: String(kembalian),
        });
      } else if (res.data.pesan === "gagal") {
        setShowError(true);
      }
    } catch (error) {
      console.log("Terjadi Kesalahan: ", error);
    }
  };

  const handlePembayaran = async () => {
    if (jumlahDibayar < grandTotal) {
      setShowError(true);
      return;
    }

    try {
      const res = await axios.put(`/api/servis/${id}`, {
        status: "Selesai Bayar",
      });

      if (res.data.pesan === "sukses") {
        setShowAlert(true);
        setOpen(false);
        router.refresh();
        router.push("/laporan/servis");
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error("Terjadi kesalahan: ", error);
      setShowError(true);
    }
  };

  let buttonColor = "bg-gray-200";
  if (status === "Selesai Servis") {
    buttonColor = "bg-green-400 hover:bg-green-500";
  } else if (
    status === "Diproses" ||
    status === "Selesai Bayar" ||
    status === "Dibatalkan"
  ) {
    buttonColor = "bg-gray-400 cursor-pointer disabled";
  }

  const handleAfterPrint = () => {
    if (componentRef.current) {
      setTimeout(() => {
        handlePembayaran();
      }, 1000);
    }
  };

  return (
    <div>
      <div className="tooltip" data-tip="Bayar">
        <button
          className={`${buttonColor} p-2 rounded-md text-lg text-white`}
          disabled={status === "Diproses" || status === "Dibatalkan"}
          onClick={handleOpen}
        >
          <MdOutlinePayments />
        </button>
      </div>
      <dialog id="my_modal_2" className={open ? "modal modal-open" : "modal"}>
        <div className="modal-box font-semibold w-11/12 max-w-5xl">
          <h3 className="font-bold text-xl">Bayar</h3>
          <div className="mt-5">
            <div className="mb-3">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Kode Servis</th>
                      <th>Harga</th>
                      <th>Nama Barang</th>
                      <th>Nama Pelanggan</th>
                      <th>Tanggal Servis</th>
                      <th>Deskripsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="text"
                          className="border-none outline-none"
                          readOnly
                          value={kodeServis}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="border-b outline-none p-2"
                          placeholder="Masukkan Harga"
                          value={harga}
                          onChange={handleHargaChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="border-none outline-none"
                          readOnly
                          value={namaBarang}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="border-none outline-none"
                          readOnly
                          value={nama}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          className="border-none outline-none"
                          readOnly
                          value={formatToDateInputValue(tanggal)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="border-none outline-none"
                          readOnly
                          value={deskripsi}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="divider"></div>
            <div className="py-12 flex justify-between items-center font-bold lg:text-2xl">
              <div className="text-end mr-20 text-sm lg:text-lg lg:w-9/12">
                Grand Total
              </div>
              <div className="text-green-500 text-center lg:w-1/4">
                {formatCurrency(grandTotal)}
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
                  placeholder="Masukkan Jumlah Dibayar"
                  value={jumlahDibayar}
                  onChange={handleJumlahDibayarChange}
                />
              </label>
              <label className="block text-base font-bold mt-2">
                Kembalian
              </label>
              <input
                type="text"
                className="input input-bordered input-md w-full bg-inherit"
                value={formatCurrency(kembalian)}
                readOnly
              />
            </div>

            <div className="modal-action">
              {!showPrintButton ? (
                <div>
                  <button
                    className="btn btn-ghost"
                    type="button"
                    onClick={handleOpen}
                  >
                    Batal
                  </button>
                  <button
                    className="btn btn-primary text-white"
                    type="submit"
                    onClick={handleTambah}
                    disabled={jumlahDibayar < grandTotal}
                  >
                    Tambah
                  </button>
                </div>
              ) : (
                <ReactToPrint
                  trigger={() => (
                    <button
                      className="btn btn-warning text-white mt-4"
                      type="button"
                    >
                      Print
                    </button>
                  )}
                  content={() => componentRef.current}
                  onAfterPrint={handleAfterPrint}
                />
              )}
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={handleOpen}>
          <button>close</button>
        </form>
      </dialog>
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <PrintBayar data={dataPrint} />
        </div>
      </div>
      {showAlert && (
        <div className="toast toast-end">
          <div className="alert alert-success flex gap-5 items-center text-white">
            <span>Pembayaran Berhasil!</span>
            <span
              className="p-2 hover:bg-white/30 cursor-pointer rounded-md transition-all"
              onClick={handleCloseAlert}
            >
              <RiCloseLargeLine />
            </span>
          </div>
        </div>
      )}
      {showError && (
        <div className="toast toast-end">
          <div className="alert alert-error flex gap-5 items-center text-white">
            <span>Gagal Melakukan Pembayaran</span>
            <span
              className="p-2 hover:bg-white/30 cursor-pointer rounded-md transition-all"
              onClick={handleCloseError}
            >
              <RiCloseLargeLine />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelesaiBayar;

"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";

interface TambahStokProps {
  loadStok: () => void;
}

const TambahStok = ({ loadStok }: { loadStok: Function }) => {
  const [open, setOpen] = useState(false);
  const [listKategori, setListKategori] = useState([]);
  const [kodeBarang, setKodeBarang] = useState("");
  const [nama, setNama] = useState("");
  const [stok, setStok] = useState("");
  const [merek, setMerek] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [hargaModal, setHargaModal] = useState("");
  const [hargaJual, setHargaJual] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showErorr, setShowErorr] = useState(false);

  useEffect(() => {
    handleListKategori();
  }, []);

  const handleListKategori = async () => {
    try {
      const data = await axios.get("/api/kategori");
      const hasil = await data.data;
      setListKategori(hasil);
    } catch (error) {
      console.log("Terjadi Kesalahan : " + error);
    }
  };

  const handleTambah = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("kodeBarang", kodeBarang);
      formData.append("nama", nama);
      formData.append("stok", stok);
      formData.append("merek", merek);
      formData.append("kategoriId", kategoriId);
      formData.append("hargaModal", hargaModal);
      formData.append("hargaJual", hargaJual);

      const response = await axios.post("/api/stok", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.pesan == "sukses") {
        setShowAlert(true);
        setOpen(false);
        loadStok();
        setKodeBarang("");
        setNama("");
        setStok("");
        setMerek("");
        setKategoriId("");
        setHargaModal("");
        setHargaJual("");
      } else if (response.data.pesan == "gagal") {
        setShowErorr(true);
        loadStok();
      }
    } catch (error) {
      console.log("Terjadi Kesalahan : ", error);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseErorr = () => {
    setShowErorr(false);
  };

  return (
    <>
      <button className="btn btn-primary text-white" onClick={handleOpen}>
        Tambah
      </button>
      <dialog id="my_modal_2" className={open ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Tambah Data</h3>
          <form onSubmit={handleTambah}>
            <div className="mb-3">
              <label htmlFor="kodeBarang" className="label">
                Kode Barang
              </label>
              <input
                type="text"
                className="input input-bordered w-full font-semibold"
                placeholder="Masukkan Kode Barang"
                id="kodeBarang"
                value={kodeBarang}
                onChange={(e) => setKodeBarang(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nama" className="label">
                Nama Barang
              </label>
              <input
                type="text"
                className="input input-bordered w-full font-semibold"
                placeholder="Masukkan Nama Barang"
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stok" className="label">
                Stok Barang
              </label>
              <input
                type="text"
                className="input input-bordered w-full font-semibold"
                placeholder="Masukkan Stok Barang"
                datatype="number"
                id="stok"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="merek" className="label">
                Merek Barang
              </label>
              <input
                type="text"
                className="input input-bordered w-full font-semibold"
                placeholder="Masukkan Merek Barang"
                id="merek"
                value={merek}
                onChange={(e) => setMerek(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="kategori" className="label">
                Kategori
              </label>
              <select
                className="select select-bordered w-full font-semibold"
                id="kategori"
                value={kategoriId}
                onChange={(e) => setKategoriId(e.target.value)}
              >
                <option disabled selected value={""}>
                  Pilih Kategori
                </option>
                {listKategori.map((item: any) => (
                  <option value={item.id} key={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="modal" className="label">
                Modal
              </label>
              <label className="input input-bordered flex items-center gap-2 font-semibold">
                Rp
                <input
                  type="text"
                  className="grow"
                  placeholder="Masukkan Modal Barang"
                  value={hargaModal}
                  onChange={(e) => setHargaModal(e.target.value)}
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="hargaJual" className="label">
                Harga Jual
              </label>
              <label className="input input-bordered flex items-center gap-2 font-semibold">
                Rp
                <input
                  type="text"
                  className="grow"
                  placeholder="Masukkan Harga Jual"
                  value={hargaJual}
                  onChange={(e) => setHargaJual(e.target.value)}
                />
              </label>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                type="button"
                onClick={handleOpen}
              >
                Tutup
              </button>
              <button className="btn btn-primary text-white" type="submit">
                Tambah
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={handleOpen}>
          <button>close</button>
        </form>
      </dialog>
      {showAlert && (
        <div className="toast toast-end">
          <div className="alert alert-success flex gap-5 items-center text-white">
            <span>Data Berhasil Ditambahkan!</span>
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
            <p className="py-4">Gagal Menambahkan Data!</p>
            <div className="modal-action">
              <button onClick={handleCloseErorr} className="btn btn-ghost">
                Tutup
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default TambahStok;

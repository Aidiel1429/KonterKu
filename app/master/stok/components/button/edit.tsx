"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiCloseLargeLine } from "react-icons/ri";

interface EditStokProps {
  loadStok: Function;
  id: number;
  kodeBarang: string;
  nama: string;
  merek: string;
  stok: number;
  kategoriId: number;
  hargaModal: number;
  hargaJual: number;
}

const EditStok = ({
  loadStok,
  id,
  kodeBarang,
  nama,
  merek,
  stok,
  kategoriId,
  hargaModal,
  hargaJual,
}: EditStokProps) => {
  const [open, setOpen] = useState(false);
  const [listKategori, setListKategori] = useState([]);
  const [ekodeBarang, setKodeBarang] = useState(kodeBarang);
  const [enama, setNama] = useState(nama);
  const [estok, setStok] = useState(stok);
  const [emerek, setMerek] = useState(merek);
  const [ekategoriId, setKategoriId] = useState(kategoriId);
  const [ehargaModal, setHargaModal] = useState(hargaModal);
  const [ehargaJual, setHargaJual] = useState(hargaJual);
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    kodeBarang: "",
    nama: "",
    stok: "",
    merek: "",
    hargaModal: "",
    hargaJual: "",
  });

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

  const validateForm = () => {
    const errors = {
      kodeBarang: "",
      nama: "",
      stok: "",
      merek: "",
      hargaModal: "",
      hargaJual: "",
    };
    let isValid = true;

    if (!ekodeBarang) {
      errors.kodeBarang = "Kode Barang harus diisi";
      isValid = false;
    }
    if (!enama) {
      errors.nama = "Nama Barang harus diisi";
      isValid = false;
    }
    if (estok <= 0) {
      errors.stok = "Stok harus lebih besar dari 0";
      isValid = false;
    }
    if (!emerek) {
      errors.merek = "Merek Barang harus diisi";
      isValid = false;
    }
    if (ehargaModal <= 0) {
      errors.hargaModal = "Harga Modal harus lebih besar dari 0";
      isValid = false;
    }
    if (ehargaJual <= 0) {
      errors.hargaJual = "Harga Jual harus lebih besar dari 0";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if validation fails

    try {
      const res = await axios.put(`/api/stok/${id}`, {
        kodeBarang: ekodeBarang || kodeBarang,
        nama: enama || nama,
        stok: estok || stok,
        merek: emerek || merek,
        kategoriId: ekategoriId || kategoriId,
        hargaModal: ehargaModal || hargaModal,
        hargaJual: ehargaJual || hargaJual,
      });

      if (res.data.pesan === "sukses") {
        setShowAlert(true);
        setOpen(false);
        loadStok();
      } else if (res.data.pesan === "gagal") {
        setShowError(true);
        setOpen(false);
        loadStok();
      }
    } catch (error) {
      setShowError(true);
      setOpen(false);
      loadStok();
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <>
      <button
        className="p-2 bg-yellow-400 text-white font-semibold text-xl rounded-md hover:bg-yellow-500 transition-al"
        onClick={handleOpen}
      >
        <CiEdit />
      </button>
      <dialog id="my_modal_2" className={open ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Edit Data</h3>
          <form onSubmit={handleEdit}>
            <div className="mb-3">
              <label htmlFor="kodeBarang" className="label">
                Kode Barang
              </label>
              <input
                type="text"
                className="input input-bordered w-full font-semibold"
                placeholder="Masukkan Kode Barang"
                id="kodeBarang"
                value={ekodeBarang}
                onChange={(e) => setKodeBarang(e.target.value)}
              />
              {validationErrors.kodeBarang && (
                <p className="text-red-500 text-xs">
                  {validationErrors.kodeBarang}
                </p>
              )}
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
                value={enama}
                onChange={(e) => setNama(e.target.value)}
              />
              {validationErrors.nama && (
                <p className="text-red-500 text-xs">{validationErrors.nama}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="stok" className="label">
                Stok Barang
              </label>
              <input
                type="text"
                className="input input-bordered w-full font-semibold"
                placeholder="Masukkan Stok Barang"
                id="stok"
                value={estok}
                onChange={(e) => setStok(+e.target.value)}
              />
              {validationErrors.stok && (
                <p className="text-red-500 text-xs">{validationErrors.stok}</p>
              )}
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
                value={emerek}
                onChange={(e) => setMerek(e.target.value)}
              />
              {validationErrors.merek && (
                <p className="text-red-500 text-xs">{validationErrors.merek}</p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="kategori" className="label">
                Kategori
              </label>
              <select
                className="select select-bordered w-full font-semibold"
                id="kategori"
                value={ekategoriId}
                onChange={(e) => setKategoriId(+e.target.value)}
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
                  value={ehargaModal}
                  onChange={(e) => setHargaModal(+e.target.value)}
                />
              </label>
              {validationErrors.hargaModal && (
                <p className="text-red-500 text-xs">
                  {validationErrors.hargaModal}
                </p>
              )}
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
                  value={ehargaJual}
                  onChange={(e) => setHargaJual(+e.target.value)}
                />
              </label>
              {validationErrors.hargaJual && (
                <p className="text-red-500 text-xs">
                  {validationErrors.hargaJual}
                </p>
              )}
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => setOpen(false)}
              >
                Tutup
              </button>
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {showAlert && (
        <div className="alert alert-success shadow-lg">
          <div>
            <span>Data Berhasil Diedit!</span>
          </div>
          <button
            onClick={handleCloseAlert}
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>
        </div>
      )}
      {showError && (
        <div className="alert alert-error shadow-lg">
          <div>
            <span>Data Gagal Diedit!</span>
          </div>
          <button
            onClick={handleCloseError}
            className="btn btn-sm btn-circle btn-ghost"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};

export default EditStok;

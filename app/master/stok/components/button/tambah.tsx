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
  const [showError, setShowError] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    kodeBarang: "",
    nama: "",
    stok: "",
    merek: "",
    kategoriId: "",
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
    let errors = {
      kodeBarang: "",
      nama: "",
      stok: "",
      merek: "",
      kategoriId: "",
      hargaModal: "",
      hargaJual: "",
    };
    let isValid = true;

    if (!kodeBarang) {
      errors.kodeBarang = "Kode Barang harus diisi.";
      isValid = false;
    }
    if (!nama) {
      errors.nama = "Nama Barang harus diisi.";
      isValid = false;
    }
    if (!stok) {
      errors.stok = "Stok Barang harus diisi.";
      isValid = false;
    } else if (isNaN(Number(stok))) {
      errors.stok = "Stok harus berupa angka.";
      isValid = false;
    }
    if (!merek) {
      errors.merek = "Merek Barang harus diisi.";
      isValid = false;
    }
    if (!kategoriId) {
      errors.kategoriId = "Kategori harus dipilih.";
      isValid = false;
    }
    if (!hargaModal) {
      errors.hargaModal = "Harga Modal harus diisi.";
      isValid = false;
    } else if (isNaN(Number(hargaModal))) {
      errors.hargaModal = "Harga Modal harus berupa angka.";
      isValid = false;
    }
    if (!hargaJual) {
      errors.hargaJual = "Harga Jual harus diisi.";
      isValid = false;
    } else if (isNaN(Number(hargaJual))) {
      errors.hargaJual = "Harga Jual harus berupa angka.";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleTambah = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form before proceeding
    if (!validateForm()) {
      return;
    }

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

      if (response.data.pesan === "sukses") {
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
      } else if (response.data.pesan === "gagal") {
        setShowError(true);
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
    setShowError(false);
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
                value={nama}
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
                value={stok}
                onChange={(e) => setStok(e.target.value)}
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
                value={merek}
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
                value={kategoriId}
                onChange={(e) => setKategoriId(e.target.value)}
              >
                <option disabled selected value="">
                  Pilih Kategori
                </option>
                {listKategori.map((item: any) => (
                  <option value={item.id} key={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
              {validationErrors.kategoriId && (
                <p className="text-red-500 text-xs">
                  {validationErrors.kategoriId}
                </p>
              )}
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
                  value={hargaJual}
                  onChange={(e) => setHargaJual(e.target.value)}
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
              <button type="submit" className="btn btn-primary text-white">
                Tambah
              </button>
            </div>
          </form>
        </div>
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
      {showError && (
        <div className="toast toast-end">
          <div className="alert alert-erorr flex gap-5 items-center text-white">
            <span>Terjadi kesalahan saat menambahkan data!</span>
            <span
              className="p-2 hover:bg-white/30 cursor-pointer rounded-md transition-all"
              onClick={handleCloseErorr}
            >
              <RiCloseLargeLine />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default TambahStok;

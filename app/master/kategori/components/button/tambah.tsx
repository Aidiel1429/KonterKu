import axios from "axios";
import React, { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";

const TambahKategori = ({ loadKategori }: { loadKategori: Function }) => {
  const [open, setOpen] = useState(false);
  const [nama, setNama] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateInput = () => {
    if (!nama.trim()) {
      setErrorMessage("Nama kategori tidak boleh kosong.");
      setShowError(true);
      return false;
    }
    if (nama.length < 2) {
      setErrorMessage("Nama kategori harus terdiri dari minimal 2 karakter.");
      setShowError(true);
      return false;
    }
    return true;
  };

  const handleTambah = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateInput()) return;

    try {
      const formData = new FormData();
      formData.append("nama", nama);

      const response = await axios.post("/api/kategori", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.pesan === "sukses") {
        setShowAlert(true);
        setOpen(false);
        setNama("");
        loadKategori();
      } else if (response.data.pesan === "gagal") {
        setErrorMessage("Gagal menambahkan kategori.");
        setShowError(true);
        loadKategori();
      }
    } catch (error) {
      console.log("Terjadi Kesalahan : ", error);
    }
  };

  const handleModal = () => {
    setOpen(!open);
    setShowError(false); // Reset error ketika modal dibuka
    setErrorMessage(""); // Reset pesan kesalahan
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseError = () => {
    setShowError(false);
    setErrorMessage(""); // Reset pesan kesalahan saat menutup
  };

  return (
    <div>
      <button
        className="btn btn-primary text-white z-auto mb-5"
        onClick={handleModal}
      >
        Tambah
      </button>
      <dialog id="my_modal_2" className={open ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Kategori</h3>
          <form onSubmit={handleTambah} className="font-semibold">
            <div className="py-5">
              <label className="label" htmlFor="nama">
                Nama Kategori
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Masukkan Nama Kategori"
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
              {showError && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
            </div>
            <div className="modal-action">
              <button
                onClick={handleModal}
                className="btn btn-ghost"
                type="button"
              >
                Tutup
              </button>
              <button className="btn btn-primary text-white" type="submit">
                Tambah
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleModal}>close</button>
        </form>
      </dialog>
      {showAlert && (
        <div className="toast toast-end">
          <div className="alert alert-success flex gap-5 items-center text-white">
            <span>Data Berhasil Ditambah!</span>
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
        <dialog id="my_modal_2" className="modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Error!</h3>
            <p className="py-4">{errorMessage}</p>
            <div className="modal-action">
              <button onClick={handleCloseError} className="btn btn-ghost">
                Tutup
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={handleCloseError}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default TambahKategori;

import axios from "axios";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiCloseLargeLine } from "react-icons/ri";

interface EditKategoriProps {
  id: number;
  loadKategori: Function;
  nama: string;
}

const EditKategori = ({ id, loadKategori, nama }: EditKategoriProps) => {
  const [open, setOpen] = useState(false);
  const [eNama, setNama] = useState(nama);
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation check
    if (eNama.trim() === "") {
      setErrorMessage("Nama kategori tidak boleh kosong!");
      setShowError(true);
      return;
    }

    try {
      const response = await axios.put(`/api/kategori/${id}`, {
        nama: eNama || nama,
      });

      if (response.data.pesan === "sukses") {
        setShowAlert(true);
        setOpen(false);
        loadKategori();
      } else if (response.data.pesan === "gagal") {
        setShowError(true);
        loadKategori();
      }
    } catch (error) {
      console.log("Terjadi Kesalahan : ", error);
    }
  };

  const handleModal = () => {
    setOpen(!open);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  return (
    <div>
      <button
        className="p-2 bg-yellow-400 text-white font-semibold text-xl rounded-md hover:bg-yellow-500 transition-al"
        onClick={handleModal}
      >
        <CiEdit />
      </button>
      <dialog id="my_modal_2" className={open ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Kategori</h3>
          <form className="font-semibold" onSubmit={handleEdit}>
            <div className="py-5">
              <label className="label text-lg" htmlFor="nama">
                Nama Kategori
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Masukkan Nama Kategori"
                id="nama"
                value={eNama}
                onChange={(e) => setNama(e.target.value)}
              />
              {showError && <p className="text-red-500">{errorMessage}</p>}{" "}
              {/* Display error message */}
            </div>
            <div className="modal-action">
              <button
                onClick={handleModal}
                className="btn btn-ghost"
                type="button"
              >
                Tutup
              </button>
              <button className="btn btn-warning text-white" type="submit">
                Edit
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
            <span>Data Berhasil Diedit!</span>
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
            <p className="py-4">Gagal Edit Data!</p>
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

export default EditKategori;

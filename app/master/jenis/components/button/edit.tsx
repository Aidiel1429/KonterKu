import axios from "axios";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiCloseLargeLine } from "react-icons/ri";

interface EditJenisProps {
  id: number;
  loadJenis: () => void;
  nama: string;
}

const EditJenis = ({ id, loadJenis, nama }: EditJenisProps) => {
  const [open, setOpen] = useState(false);
  const [eNama, setNama] = useState(nama);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Form validation
    if (!eNama.trim()) {
      setError("Nama kategori tidak boleh kosong.");
      return;
    }

    try {
      const response = await axios.put(`/api/jenis/${id}`, { nama: eNama });
      const message =
        response.data.pesan === "sukses"
          ? "Data Berhasil Diedit!"
          : "Gagal Edit Data!";
      setAlert({ type: response.data.pesan, message });
      loadJenis();
    } catch (error) {
      console.error("Terjadi Kesalahan:", error);
      setAlert({ type: "gagal", message: "Gagal Edit Data!" });
    }
    setOpen(false);
  };

  const handleModal = () => setOpen(!open);
  const handleCloseAlert = () => setAlert(null);
  const handleCloseError = () => setError(null);

  return (
    <div>
      <button
        className="p-2 bg-yellow-400 text-white font-semibold text-xl rounded-md hover:bg-yellow-500 transition-al"
        onClick={handleModal}
      >
        <CiEdit />
      </button>
      <dialog className={open ? "modal modal-open" : "modal"}>
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
                onChange={(e) => {
                  setNama(e.target.value);
                  if (error) setError(null); // Clear error when user starts typing
                }}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
              {/* Error message */}
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
      {alert && (
        <div className="toast toast-end">
          <div
            className={`alert ${
              alert.type === "sukses" ? "alert-success" : "alert-error"
            } flex gap-5 items-center text-white`}
          >
            <span>{alert.message}</span>
            <span
              className="p-2 hover:bg-white/30 cursor-pointer rounded-md transition-all"
              onClick={handleCloseAlert}
            >
              <RiCloseLargeLine />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditJenis;

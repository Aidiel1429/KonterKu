import axios from "axios";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";

interface HapusJenisProps {
  id: number;
  loadJenis: Function;
  setShowAlert: Function;
}

const HapusJenis = ({ id, loadJenis, setShowAlert }: HapusJenisProps) => {
  const [open, setOpen] = useState(false);

  const handleHapus = async () => {
    try {
      const response = await axios.delete(`/api/jenis/${id}`);
      if (response.data.pesan === "sukses") {
        setOpen(false);
        loadJenis();
        setShowAlert(true);
      }
    } catch (error) {
      console.log("Terjadi Kesalahan: ", error);
    }
  };

  return (
    <>
      <button
        className="p-2 bg-red-500 text-white font-semibold text-xl rounded-md hover:bg-red-600 transition-all"
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>
      <dialog id="my_modal_4" className={open ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Peringatan!</h3>
          <p className="py-4 text-lg">Yakin Ingin Hapus Data Ini?</p>
          <div className="modal-action">
            <button
              className="btn btn-ghost"
              type="button"
              onClick={() => setOpen(!open)}
            >
              Tutup
            </button>
            <button
              className={`btn btn-error text-white`} // Tambahkan class loading jika dalam proses
              onClick={handleHapus}
            >
              Hapus
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default HapusJenis;

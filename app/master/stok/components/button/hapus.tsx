import axios from "axios";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa"; // Tambahkan ini
import { RiCloseLargeLine } from "react-icons/ri";

interface HapusStokProps {
  id: number;
  loadStok: Function;
  setShowAlert: Function;
  setShowErorr: Function;
}

const HapusStok = ({
  id,
  loadStok,
  setShowAlert,
  setShowErorr,
}: HapusStokProps) => {
  const [open, setOpen] = useState(false);

  const handleHapus = async () => {
    try {
      const response = await axios.delete(`/api/stok/${id}`);
      if (response.data.pesan === "sukses") {
        setOpen(false);
        loadStok();
        setShowAlert(true);
      } else if (response.data.pesan === "gagal") {
        setOpen(false);
        loadStok();
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
            <button className="btn btn-error text-white" onClick={handleHapus}>
              Hapus
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default HapusStok;

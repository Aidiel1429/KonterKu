import axios from "axios";
import React, { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { MdDoneAll } from "react-icons/md";

interface BatalProps {
  id: number;
  loadServis: Function;
  status: string;
}

const SelesaiServis = ({ id, loadServis, status }: BatalProps) => {
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showErorr, setShowErorr] = useState(false);

  const handleOpen = () => {
    if (status == "Diproses") {
      setOpen(!open);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseErorr = () => {
    setShowErorr(false);
  };

  const handleSelesaiServis = async () => {
    try {
      const res = await axios.put(`/api/servis/${id}`, {
        status: "Selesai Servis",
      });

      if (res.data.pesan == "sukses") {
        setOpen(false);
        loadServis();
        setShowAlert(true);
      } else if (res.data.pesan == "gagal") {
        setOpen(false);
        loadServis();
        setShowErorr(true);
      }
    } catch (error) {
      console.log("Terjadi Kesalahan : ", error);
    }
  };

  let buttonColor = "bg-gray-200";
  if (status === "Diproses") {
    buttonColor = "bg-green-500 hover:bg-green-600";
  } else if (status === "Selesai Servis" || status === "Selesai Bayar") {
    buttonColor = "bg-gray-400 cursor-pointer disabled";
  }
  return (
    <div>
      <div className="tooltip" data-tip="Selesai Servis">
        <button
          className={`${buttonColor} p-2 rounded-md text-lg text-white`}
          disabled={status === "Selesai Bayar" || status === "Dibatalkan"}
          onClick={handleOpen}
        >
          <MdDoneAll />
        </button>
      </div>
      <dialog id="my_modal_2" className={open ? "modal modal-open" : "modal"}>
        <div className="modal-box font-semibold">
          <h3 className="font-bold text-xl">Peringatan</h3>
          <p className="py-4 text-lg text-slate-600">
            Apakah Kamu Yakin Ingin Mengganti Status Servis Ini Menjadi{" "}
            <b>Selesai Servis</b>?
          </p>
          <div className="modal-action">
            <button className="btn btn-ghost" onClick={handleOpen}>
              Tidak
            </button>
            <button
              className="btn btn-success text-white"
              onClick={handleSelesaiServis}
            >
              Iya
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={handleOpen}>
          <button>close</button>
        </form>
      </dialog>
      {showAlert && (
        <div className="toast toast-end">
          <div className="alert alert-success flex gap-5 items-center text-white">
            <span>Berhasil Mengganti Status Servis!</span>
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
        <div className="toast toast-end">
          <div className="alert alert-error flex gap-5 items-center text-white">
            <span>Gagal Mengganti Status Servis!</span>
            <span
              className="p-2 hover:bg-white/30 cursor-pointer rounded-md transition-all"
              onClick={handleCloseErorr}
            >
              <RiCloseLargeLine />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelesaiServis;

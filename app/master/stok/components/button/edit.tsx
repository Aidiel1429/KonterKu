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

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await axios.put(`/api/stok/${id}`, {
      kodeBarang: ekodeBarang || kodeBarang,
      nama: enama || nama,
      stok: estok || stok,
      merek: emerek || merek,
      kategoriId: ekategoriId || kategoriId,
      hargaModal: ehargaModal || hargaModal,
      hargaJual: ehargaJual || hargaJual,
    });

    if (res.data.pesan == "sukses") {
      setShowAlert(true);
      setOpen(false);
      loadStok();
    } else if (res.data.pesan == "gagal") {
      setShowErorr(true);
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

  const handleCloseErorr = () => {
    setShowErorr(false);
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
                value={estok}
                onChange={(e) => setStok(+e.target.value)}
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
                value={emerek}
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
            </div>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                type="button"
                onClick={handleOpen}
              >
                Tutup
              </button>
              <button className="btn btn-warning text-white" type="submit">
                Edit
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
      {showErorr && (
        <dialog id="my_modal_2" className="modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Error!</h3>
            <p className="py-4">Gagal Mengedit Data!</p>
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

export default EditStok;

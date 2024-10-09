"use client";
import axios from "axios";
import React, { ReactHTML, useEffect, useRef, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import ComponentPrint from "../componentPrint";
import ReactToPrint from "react-to-print";

const generateRandomCode = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const length = 8; // Panjang kode acak
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Tambahkan 1 ke bulan karena dimulai dari 0
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Tambah = ({ loadServis }: { loadServis: Function }) => {
  const [open, setOpen] = useState(false);
  const [kodeServis, setKodeServis] = useState("");
  const [nama, setNama] = useState("");
  const [nomorSeri, setNomorSeri] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [nope, setNope] = useState("");
  const [jenisId, setJenisId] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [status, setStatus] = useState("Diproses");
  const [showAlert, setShowAlert] = useState(false);
  const [showErorr, setShowErorr] = useState(false);

  const [jenis, setJenis] = useState<any[]>([]);

  const componentRef = useRef<HTMLDivElement>(null);
  const [printData, setPrintData] = useState<any>({});
  const [showPrintButton, setShowPrintButton] = useState(false);
  const [checkSubmit, setCheckSubmit] = useState(false);

  const [jenisNama, setJenisNama] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    kodeServis: "",
    nama: "",
    nomorSeri: "",
    namaBarang: "",
    tanggal: "",
    nope: "",
    jenisId: "",
    deskripsi: "",
  });

  useEffect(() => {
    setKodeServis(generateRandomCode());
    loadJenis();
  }, []);

  const loadJenis = async () => {
    try {
      const jenis = await axios.get("/api/jenis");
      const hasil = jenis.data;
      setJenis(hasil);
    } catch (error) {
      console.log("Terjadi Kesalahan : ", error);
    }
  };

  const TambahServis = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submission

    // Reset errors
    setErrors({
      kodeServis: "",
      nama: "",
      nomorSeri: "",
      namaBarang: "",
      tanggal: "",
      nope: "",
      jenisId: "",
      deskripsi: "",
    });

    let hasError = false;

    // Validasi Form
    if (!kodeServis) {
      setErrors((prev) => ({
        ...prev,
        kodeServis: "Kode Servis tidak boleh kosong!",
      }));
      hasError = true;
    }
    if (!nama) {
      setErrors((prev) => ({ ...prev, nama: "Nama tidak boleh kosong!" }));
      hasError = true;
    }
    if (!nomorSeri) {
      setErrors((prev) => ({
        ...prev,
        nomorSeri: "Nomor Seri tidak boleh kosong!",
      }));
      hasError = true;
    }
    if (!namaBarang) {
      setErrors((prev) => ({
        ...prev,
        namaBarang: "Nama Barang tidak boleh kosong!",
      }));
      hasError = true;
    }
    if (!deskripsi) {
      setErrors((prev) => ({
        ...prev,
        deskripsi: "Nama Barang tidak boleh kosong!",
      }));
      hasError = true;
    }
    if (!tanggal) {
      setErrors((prev) => ({ ...prev, tanggal: "Tanggal harus dipilih!" }));
      hasError = true;
    }
    if (!nope) {
      setErrors((prev) => ({ ...prev, nope: "Nomor HP tidak boleh kosong!" }));
      hasError = true;
    } else if (nope.length < 10) {
      setErrors((prev) => ({
        ...prev,
        nope: "Nomor HP harus terdiri dari minimal 10 digit!",
      }));
      hasError = true;
    }
    if (!jenisId) {
      setErrors((prev) => ({
        ...prev,
        jenisId: "Jenis Servis harus dipilih!",
      }));
      hasError = true;
    }

    if (hasError) return; // Batalkan pengiriman jika ada field yang kosong

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("kodeServis", kodeServis);
      formData.append("nama", nama);
      formData.append("nomorSeri", nomorSeri);
      formData.append("namaBarang", namaBarang);
      formData.append("deskripsi", deskripsi);
      formData.append("nope", nope);
      formData.append("jenisId", jenisId);
      const isoDate = new Date(tanggal).toISOString();
      formData.append("tanggal", isoDate);
      formData.append("status", status);

      const res = await axios.post("/api/servis", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.pesan === "sukses") {
        setShowAlert(true);
        setShowPrintButton(true);
        setPrintData({
          kodeServis,
          nama,
          nope,
          namaBarang,
          nomorSeri,
          deskripsi,
          jenisId,
          tanggal,
          jenisNama,
        });
      } else if (res.data.pesan === "gagal") {
        setOpen(false);
        loadServis();
        setShowErorr(true);
        setKodeServis(generateRandomCode());
      }
    } catch (error) {
      console.log("Terjadi Kesalahan : ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintAndRedirect = () => {
    if (componentRef.current) {
      setTimeout(() => {
        setOpen(false);
        loadServis();
        setShowPrintButton(false);
        setKodeServis(generateRandomCode());
        setNamaBarang("");
        setDeskripsi("");
        setNomorSeri("");
        setNope("");
        setJenisId("");
        setNama("");
        setDeskripsi("");
      }, 1000);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
    setTanggal(getTodayDate());
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseErorr = () => {
    setShowErorr(false);
  };
  return (
    <div>
      <button className="btn btn-primary text-white" onClick={handleOpen}>
        Tambah
      </button>
      <dialog id="my_modal_2" className={open ? "modal modal-open" : "modal"}>
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-5">Tambah Servis</h3>
          <form className="w-full" onSubmit={TambahServis}>
            <div className="w-full flex gap-4">
              <div className="w-1/2">
                <div className="mb-3">
                  <label htmlFor="kodeServis" className="label">
                    Kode Servis
                  </label>
                  <input
                    type="text"
                    placeholder="Kode Servis"
                    className="w-full input input-bordered"
                    id="kodeServis"
                    value={kodeServis}
                    onChange={(e) => setKodeServis(e.target.value)}
                    readOnly
                  />
                  {errors.kodeServis && (
                    <p className="text-red-500 text-sm">{errors.kodeServis}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="namaBarang" className="label">
                    Nama Barang
                  </label>
                  {!checkSubmit ? (
                    <input
                      type="text"
                      placeholder="Masukkan Nama Barang"
                      className="w-full input input-bordered"
                      id="namaBarang"
                      value={namaBarang}
                      onChange={(e) => setNamaBarang(e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Masukkan Nama Barang"
                      className="w-full input input-bordered"
                      id="namaBarang"
                      value={namaBarang}
                      onChange={(e) => setNamaBarang(e.target.value)}
                      readOnly
                    />
                  )}
                  {errors.namaBarang && (
                    <p className="text-red-500 text-sm">{errors.namaBarang}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="nomorSeri" className="label">
                    Nomor Seri
                  </label>
                  {!checkSubmit ? (
                    <input
                      type="text"
                      placeholder="Masukkan Nomor Seri"
                      className="w-full input input-bordered"
                      id="nomorSeri"
                      value={nomorSeri}
                      onChange={(e) => setNomorSeri(e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Masukkan Nomor Seri"
                      className="w-full input input-bordered"
                      id="nomorSeri"
                      value={nomorSeri}
                      onChange={(e) => setNomorSeri(e.target.value)}
                      readOnly
                    />
                  )}
                  {errors.nomorSeri && (
                    <p className="text-red-500 text-sm">{errors.nomorSeri}</p>
                  )}
                </div>
              </div>
              <div className="w-1/2">
                <div className="mb-3">
                  <label htmlFor="nama" className="label">
                    Nama Pelanggan
                  </label>
                  {!checkSubmit ? (
                    <input
                      type="text"
                      placeholder="Masukkan Nama Pelanggan"
                      className="w-full input input-bordered"
                      id="namaPelanggan"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Masukkan Nama Pelanggan"
                      className="w-full input input-bordered"
                      id="namaPelanggan"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      readOnly
                    />
                  )}
                  {errors.nama && (
                    <p className="text-red-500 text-sm">{errors.nama}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="nope" className="label">
                    Nomor HP
                  </label>
                  {!checkSubmit ? (
                    <input
                      type="text"
                      placeholder="Masukkan Nomor HP Pelanggan"
                      className="w-full input input-bordered"
                      id="nope"
                      value={nope}
                      onChange={(e) => setNope(e.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Masukkan Nomor HP Pelanggan"
                      className="w-full input input-bordered"
                      id="nope"
                      value={nope}
                      onChange={(e) => setNope(e.target.value)}
                      readOnly
                    />
                  )}
                  {errors.nope && (
                    <p className="text-red-500 text-sm">{errors.nope}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="jenis" className="label">
                    Jenis Servis
                  </label>
                  {!checkSubmit ? (
                    <select
                      className="select select-bordered w-full"
                      id="jenis"
                      value={jenisId}
                      onChange={(e) => setJenisId(e.target.value)}
                    >
                      <option disabled selected value={""}>
                        Pilih Jenis Servis
                      </option>
                      {jenis.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.nama}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      className="select select-bordered w-full"
                      id="jenis"
                      value={jenisId}
                      onChange={(e) => setJenisId(e.target.value)}
                      aria-readonly
                    >
                      <option disabled selected value={""}>
                        Pilih Jenis Servis
                      </option>
                      {jenis.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.nama}
                        </option>
                      ))}
                    </select>
                  )}
                  {errors.jenisId && (
                    <p className="text-red-500 text-sm">{errors.jenisId}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="tanggal" className="label">
                Tanggal Servis
              </label>
              {!checkSubmit ? (
                <input
                  type="date"
                  id="tanggal"
                  className="input input-bordered w-full"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                />
              ) : (
                <input
                  type="date"
                  id="tanggal"
                  className="input input-bordered w-full"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  readOnly
                />
              )}
              {errors.tanggal && (
                <p className="text-red-500 text-sm">{errors.tanggal}</p>
              )}
            </div>
            <div className="mt-3">
              <label htmlFor="deskripsi" className="label">
                Deskripsi Servis
              </label>
              {!checkSubmit ? (
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Deskripsi Servis"
                  id="deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                ></textarea>
              ) : (
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Deskripsi Servis"
                  id="deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  readOnly
                ></textarea>
              )}
              {errors.deskripsi && (
                <p className="text-red-500 text-sm">{errors.deskripsi}</p>
              )}
            </div>
            <div className="modal-action">
              {!showPrintButton ? (
                <div>
                  <button
                    className="btn btn-ghost"
                    type="button"
                    onClick={handleOpen}
                  >
                    Batal
                  </button>
                  <button className="btn btn-primary text-white" type="submit">
                    Tambah
                  </button>
                </div>
              ) : (
                <ReactToPrint
                  trigger={() => (
                    <button
                      className="btn btn-warning text-white mt-4"
                      type="button"
                    >
                      Print
                    </button>
                  )}
                  content={() => componentRef.current}
                  onAfterPrint={handlePrintAndRedirect}
                />
              )}
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={handleOpen}>
          <button>close</button>
        </form>
      </dialog>
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
          <ComponentPrint data={printData} />
        </div>
      </div>
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
      {showErorr && (
        <div className="toast toast-end">
          <div className="alert alert-error flex gap-5 items-center text-white">
            <span>Data Gagal Ditambah!</span>
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

export default Tambah;

"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [openHeader, setOpenHeader] = useState(false);
  const [openBarang, setOpenBarang] = useState(false);
  const [openServis, setOpenServis] = useState(false);
  const [openLaporan, setOpenLaporan] = useState(false);

  const handleBarang = () => {
    setOpenBarang(!openBarang);
    // Jangan menutup header saat klik Barang
  };

  const handleServis = () => {
    setOpenServis(!openServis);
    // Jangan menutup header saat klik Servis
  };

  const handleLaporan = () => {
    setOpenLaporan(!openLaporan);
    // Jangan menutup header saat klik Laporan
  };

  const handleOpen = () => {
    setOpenHeader(!openHeader);
    // Tutup Barang dan Servis ketika header dibuka/tutup
    setOpenBarang(false);
    setOpenServis(false);
    setOpenLaporan(false);
  };

  const handleItemClick = () => {
    // Tutup header ketika item dalam submenu diklik
    setOpenHeader(false);
    setOpenBarang(false);
    setOpenServis(false);
    setOpenLaporan(false);
  };

  return (
    <div className="w-full">
      <div className="bg-blue-500 p-5 text-white font-semibold">
        <div className="flex justify-between items-center text-xl">
          <Link href={"/"}>
            <h1>KonterKu</h1>
          </Link>
          <button
            className="lg:hidden text-2xl transition-all"
            onClick={handleOpen}
          >
            {openHeader ? <MdClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>
      <div className="md:flex md:justify-end">
        <div
          className={
            openHeader
              ? "bg-white mx-5 shadow-md rounded-md my-3 p-3 md:w-96 lg:hidden"
              : "hidden"
          }
        >
          <Link href={"/"} onClick={handleItemClick}>
            <div className="hover:bg-slate-100 p-2 rounded-md transition-all cursor-pointer text-sm mb-2">
              <h1>Dashboard</h1>
            </div>
          </Link>
          <Link href={"/starter/penjualan"} onClick={handleItemClick}>
            <div className="hover:bg-slate-100 p-2 rounded-md transition-all cursor-pointer text-sm mb-2">
              <h1>Penjualan</h1>
            </div>
          </Link>
          <Link href={"/starter/jasaServis"} onClick={handleItemClick}>
            <div className="hover:bg-slate-100 p-2 rounded-md transition-all cursor-pointer text-sm mb-2">
              <h1>Jasa Servis</h1>
            </div>
          </Link>
          <div
            className="hover:bg-slate-100 p-2 rounded-md transition-all cursor-pointer text-sm flex justify-between items-center text-slate-700"
            onClick={handleBarang}
          >
            <h1>Barang</h1>
            <FaChevronDown
              className={
                openBarang
                  ? "rotate-180 transition-all"
                  : "rotate-0 transition-all"
              }
            />
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden text-sm p-1 ${
              openBarang ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            } bg-blue-500 rounded-md text-white mt-1`}
          >
            <Link href={"/master/stok"}>
              <div
                className="p-2 hover:bg-white/10 rounded-md cursor-pointer transition-all"
                onClick={handleItemClick}
              >
                <h1>Stok</h1>
              </div>
            </Link>
            <Link href={"/master/kategori"} onClick={handleItemClick}>
              <div className="p-2 hover:bg-white/10 rounded-md cursor-pointer transition-all">
                <h1>Kategori</h1>
              </div>
            </Link>
          </div>
          <div
            className="hover:bg-slate-100 p-2 rounded-md transition-all cursor-pointer text-sm flex justify-between items-center text-slate-700"
            onClick={handleServis}
          >
            <h1>Servis</h1>
            <FaChevronDown
              className={
                openServis
                  ? "rotate-180 transition-all"
                  : "rotate-0 transition-all"
              }
            />
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden text-sm p-1 ${
              openServis ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            } bg-blue-500 rounded-md text-white mt-1`}
          >
            <Link href={"/master/jenis"}>
              <div
                className="p-2 hover:bg-white/10 rounded-md cursor-pointer transition-all"
                onClick={handleItemClick}
              >
                <h1>Jenis Servis</h1>
              </div>
            </Link>
          </div>
          <div
            className="hover:bg-slate-100 p-2 rounded-md transition-all cursor-pointer text-sm flex justify-between items-center text-slate-700"
            onClick={handleLaporan}
          >
            <h1>Laporan</h1>
            <FaChevronDown
              className={
                openLaporan
                  ? "rotate-180 transition-all"
                  : "rotate-0 transition-all"
              }
            />
          </div>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden text-sm p-1 ${
              openLaporan ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            } bg-blue-500 rounded-md text-white mt-1`}
          >
            <Link href={"/laporan/penjualan"}>
              <div
                className="p-2 hover:bg-white/10 rounded-md cursor-pointer transition-all"
                onClick={handleItemClick}
              >
                <h1>Penjualan</h1>
              </div>
            </Link>
            <Link href={"/laporan/servis"}>
              <div
                className="p-2 hover:bg-white/10 rounded-md cursor-pointer transition-all"
                onClick={handleItemClick}
              >
                <h1>Servis</h1>
              </div>
            </Link>
          </div>
          {/* <div
            className={`transition-all duration-300 ease-in-out overflow-hidden text-sm p-1 ${
              openLaporan ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            } bg-blue-500 rounded-md text-white mt-1`}
          ></div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;

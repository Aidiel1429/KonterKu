"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Sidebar = () => {
  const [openBarang, setOpenBarang] = useState(false);
  const [openServis, setOpenServis] = useState(false);

  const handleBarang = () => {
    setOpenBarang(!openBarang);
  };

  const handleServis = () => {
    setOpenServis(!openServis);
  };

  return (
    <div className="hidden lg:block z-50 w-80 bg-white h-screen ">
      <div className="font-semibold p-5">
        <Link href={"/"}>
          <h1 className="text-blue-500 text-2xl text-center">KonterKu</h1>
        </Link>
        <div className="mt-7 font-light text-slate-500">
          <p className="text-sm">Dashboard</p>
          <Link href={"/"}>
            <div className="p-3 my-2 hover:bg-slate-100/50 rounded-md cursor-pointer font-semibold text-slate-700 transition-all">
              <h1>Dashboard</h1>
            </div>
          </Link>
        </div>
        <div className="font-light text-slate-500">
          <p className="text-sm">Starter</p>
          <Link href={"/starter/penjualan"}>
            <div className="p-3 my-2 hover:bg-slate-100/50 rounded-md cursor-pointer font-semibold text-slate-700 transition-all flex justify-between items-center">
              <h1>Penjualan</h1>
            </div>
          </Link>
          <Link href={"/starter/jasaServis"}>
            <div className="p-3 my-2 hover:bg-slate-100/50 rounded-md cursor-pointer font-semibold text-slate-700 transition-all flex justify-between items-center">
              <h1>Jasa Servis</h1>
            </div>
          </Link>
        </div>
        <div className="font-light text-slate-500">
          <p className="text-sm">Master</p>
          <div
            className="p-3 my-2 hover:bg-slate-100/50 rounded-md cursor-pointer font-semibold text-slate-700 transition-all flex justify-between items-center"
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
            className={
              openBarang
                ? "p-3 my-2 bg-blue-500 rounded-md cursor-pointer font-semibold text-white transition-all"
                : "hidden"
            }
          >
            <Link href={"/master/stok"}>
              <div className="p-2 hover:bg-white/25 rounded-md transition-all">
                <h1>Stok</h1>
              </div>
            </Link>
            <Link href={"/master/kategori"}>
              <div className="p-2 hover:bg-white/25 rounded-md transition-all">
                <h1>Kategori</h1>
              </div>
            </Link>
          </div>
          <div
            className="p-3 my-2 hover:bg-slate-100/50 rounded-md cursor-pointer font-semibold text-slate-700 transition-all flex justify-between items-center"
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
            className={
              openServis
                ? "p-3 my-2 bg-blue-500 rounded-md cursor-pointer font-semibold text-white transition-all"
                : "hidden"
            }
          >
            <Link href={"/master/jenis"}>
              <div className="p-2 hover:bg-white/25 rounded-md transition-all">
                <h1>Jenis Servis</h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="mt-7 font-light text-slate-500">
          <p className="text-sm">Laporan</p>
          <Link href={"/laporan/penjualan"}>
            <div className="p-3 my-2 hover:bg-slate-100/50 rounded-md cursor-pointer font-semibold text-slate-700 transition-all">
              <h1>Penjualan</h1>
            </div>
          </Link>
          <Link href={"/laporan/servis"}>
            <div className="p-3 my-2 hover:bg-slate-100/50 rounded-md cursor-pointer font-semibold text-slate-700 transition-all">
              <h1>Servis</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

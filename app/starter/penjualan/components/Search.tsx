"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Search = ({ onSelectItem }: { onSelectItem: (item: any) => void }) => {
  const [query, setQuery] = useState("");
  const [barang, setBarang] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false); // State untuk mengelola visibilitas dropdown
  const [stockMessage, setStockMessage] = useState<string | null>(null); // State untuk pesan stok

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/stok?q=${query}`);
        if (res.data.length === 0) {
          setStockMessage("Stok barang habis");
        } else {
          setStockMessage(null); // Hapus pesan jika ada barang yang ditemukan
        }
        setBarang(res.data);
      } catch (error) {
        console.log("Terjadi Kesalahan : ", error);
      }
    };

    if (query.length > 0) {
      fetchData();
    } else {
      setBarang([]);
      setStockMessage(null); // Hapus pesan jika query kosong
    }
  }, [query]);

  const handleInputClick = () => {
    setShowDropdown(true); // Tampilkan dropdown saat input diklik
  };

  const handleItemClick = (item: any) => {
    onSelectItem(item); // Kirim item yang dipilih
    setShowDropdown(false); // Sembunyikan dropdown setelah item dipilih
    setQuery(""); // Hapus query setelah item dipilih
  };

  return (
    <div className="flex flex-wrap relative w-full lg:w-[400px]">
      <input
        type="text"
        className="input input-bordered w-full"
        placeholder="Cari Nama Barang..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClick={handleInputClick} // Tampilkan dropdown saat input diklik
      />
      <br />
      {showDropdown && query.length > 0 && (
        <div className="mt-4">
          <ul className="bg-white p-5 shadow-lg rounded-md absolute left-0 right-0 top-16 z-10 text-base">
            {stockMessage ? (
              <li className="text-red-600">{stockMessage}</li>
            ) : barang.length > 0 ? (
              barang.map((item) => (
                <li
                  key={item.id}
                  className="py-2 border-b-2 cursor-pointer hover:bg-black/5 rounded-md px-2 transition-all"
                  onClick={() => handleItemClick(item)} // Menangani klik item
                >
                  {item.nama}
                </li>
              ))
            ) : (
              <li className="text-gray-500">Tidak ada barang ditemukan</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;

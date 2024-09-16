import React from "react";

const formatTanggal = (tanggal: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const date = new Date(tanggal);
  return date.toLocaleDateString("id-ID", options); // Gunakan 'id-ID' untuk format tanggal Indonesia
};

const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const PrintBayar = ({ data }: { data: any }) => {
  return (
    <div className="p-16 w-full max-auto">
      <div className="flex justify-center items-center mb-6">
        <div className="text-center">
          <h1 className="font-bold text-[24px] text-[#484848]">KonterKu</h1>
          <p className="text-[#494949] text-[14px] font-semibold">
            Jl. Contoh, No. 123, Bangkinang
          </p>
          <p className="text-[#484848] text-[20px] font-semibold">
            08634637524
          </p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-[16px] text-[#242424]">Detail Servis</h1>
        <table className="w-full mt-3">
          <thead>
            <tr className="border-b border-slate-300">
              <th className="text-start border-r border-slate-300 p-2 text-sm">
                Kode Servis
              </th>
              <th className="text-start border-r border-slate-300 p-2 text-sm">
                Nama Barang
              </th>
              <th className="text-center border-r border-slate-300 p-2 text-sm">
                Nama Pelanggan
              </th>
              <th className="text-center border-r border-slate-300 p-2 text-sm">
                Deskripsi
              </th>
              <th className="text-end p-2 text-sm">Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-300">
              <td className="text-start p-2 border-r border-slate-300 text-base">
                {data.kodeServis}
              </td>
              <td className="text-center p-2 border-r border-slate-300 text-base">
                {data.namaBarang}
              </td>
              <td className="text-center p-2 border-r border-slate-300 text-base">
                {data.nama}
              </td>
              <td className="text-center p-2 border-r border-slate-300 text-base">
                {data.deskripsi}
              </td>
              <td className="text-end p-2 text-base">
                {formatRupiah(data.harga)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <div className="divider"></div>
      </div>
      <div>
        <h1 className="font-bold text-[16px] text-[#242424]">
          Detail Pembayaran
        </h1>
        <div className="p-2 mt-3">
          <div className="flex justify-between items-center py-1">
            <h1 className="text-[#3A3A3A] text-[16px] font-bold">Total</h1>
            <h1 className="text-[#3A3A3A] text-[14px] font-semibold">
              {formatRupiah(data.harga)}
            </h1>
          </div>
          <div className="flex justify-between items-center py-1">
            <h1 className="text-[#3A3A3A] text-[16px] font-bold">
              Nominal dibayar
            </h1>
            <h1 className="text-[#3A3A3A] text-[14px] font-semibold">
              {formatRupiah(data.jumlahDibayar)}
            </h1>
          </div>
          <div className="flex justify-between items-center py-1">
            <h1 className="text-[#3A3A3A] text-[16px] font-bold">Kembalian</h1>
            <h1 className="text-[#3A3A3A] text-[14px] font-semibold">
              {formatRupiah(data.kembalian)}
            </h1>
          </div>
        </div>
      </div>
      <div>
        <div className="divider"></div>
      </div>
      <div className="flex justify-center items-center">
        <h1 className="text-xl font-bold text-[#242424]">Terima Kasih</h1>
      </div>
    </div>
  );
};

export default PrintBayar;

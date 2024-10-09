import React from "react";

interface ComponentToPrintProps {
  barangTerpilih: any[];
  grandTotal: number;
  jumlahDibayar: number;
  kembalian: number;
  formatRupiah: (angka: number) => string;
  formatTanggal: (tanggal: string) => string;
}

const ComponentToPrint = ({
  barangTerpilih,
  grandTotal,
  jumlahDibayar,
  kembalian,
  formatRupiah,
  formatTanggal,
}: ComponentToPrintProps) => {
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
      <div className="mt-[48px]">
        <div className="flex justify-between items-center">
          <p className="text-[#242424] font-semibold">Tanggal Transaksi</p>
          <p className="text-[#3A3A3A] font-semibold">
            {formatTanggal(new Date().toISOString())}
          </p>
        </div>
      </div>
      <div>
        <div className="divider"></div>
      </div>
      <div>
        <h1 className="font-bold text-[16px] text-[#242424]">
          Detail Penjualan Barang
        </h1>
        <table className="w-full mt-3">
          <thead>
            <tr className="border-b border-slate-300">
              <th className="text-start border-r border-slate-300 p-2">
                Nama Barang
              </th>
              <th className="text-center border-r border-slate-300 p-2">Qty</th>
              <th className="text-center border-r border-slate-300 p-2">
                Harga
              </th>
              <th className="text-end p-2">Sub Total</th>
            </tr>
          </thead>
          {barangTerpilih?.map((item, index) => (
            <tbody key={index}>
              <tr className="border-b border-slate-300">
                <td className="text-start p-2 border-r border-slate-300">
                  {item.nama}
                </td>
                <td className="text-center p-2 border-r border-slate-300">
                  {item.qty}
                </td>
                <td className="text-center p-2 border-r border-slate-300">
                  {formatRupiah(item.hargaJual)}
                </td>
                <td className="text-end p-2">
                  {formatRupiah(item.hargaJual * item.qty)}
                </td>
              </tr>
            </tbody>
          ))}
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
              {formatRupiah(grandTotal)}
            </h1>
          </div>
          <div className="flex justify-between items-center py-1">
            <h1 className="text-[#3A3A3A] text-[16px] font-bold">
              Nominal dibayar
            </h1>
            <h1 className="text-[#3A3A3A] text-[14px] font-semibold">
              {formatRupiah(jumlahDibayar)}
            </h1>
          </div>
          <div className="flex justify-between items-center py-1">
            <h1 className="text-[#3A3A3A] text-[16px] font-bold">Kembalian</h1>
            <h1 className="text-[#3A3A3A] text-[14px] font-semibold">
              {formatRupiah(kembalian)}
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

export default ComponentToPrint;

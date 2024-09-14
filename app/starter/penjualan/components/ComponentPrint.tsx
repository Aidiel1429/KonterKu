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
    // <div className="p-16 w-full">
    //   <div className="flex justify-center items-center mb-6">
    //     <div className="text-center">
    //       <h1 className="text-2xl font-bold">KonterKu</h1>
    //       <p className="text-gray-600 text-base">
    //         Jl. Contoh, No. 123, Bangkinang.
    //       </p>
    //       <p className="text-gray-600 text-base">082343533</p>
    //     </div>
    //   </div>

    //   <div className="mb-6 text-center text-sm text-gray-600">
    //     <p>Tanggal: {formatTanggal(new Date().toISOString())}</p>
    //   </div>

    //   <table className="table-auto w-full  mb-6">
    //     <thead>
    //       <tr className="text-lcenter">
    //         <th className="border-b border-gray-300 px-4 py-2">Kode Barang</th>
    //         <th className="border-b border-gray-300 px-4 py-2">Nama Barang</th>
    //         <th className="border-b border-gray-300 px-4 py-2">Qty</th>
    //         <th className="border-b border-gray-300 px-4 py-2">Harga</th>
    //         <th className="border-b border-gray-300 px-4 py-2">Sub Total</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {barangTerpilih?.map((barang, index) => (
    //         <tr key={index}>
    //           <td className="border-b border-gray-300 px-4 py-2">
    //             {barang.kodeBarang}
    //           </td>
    //           <td className="border-b border-gray-300 px-4 py-2">
    //             {barang.nama}
    //           </td>
    //           <td className="border-b border-gray-300 px-4 py-2 text-center">
    //             {barang.qty}
    //           </td>
    //           <td className="border-b border-gray-300 px-4 py-2 text-right">
    //             {formatRupiah(barang.hargaJual)}
    //           </td>
    //           <td className="border-b border-gray-300 px-4 py-2 text-right">
    //             {formatRupiah(barang.hargaJual * barang.qty)}
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>

    //   <div className="py-4 border-t border-gray-300 mt-4">
    //     <div className="flex justify-between py-1">
    //       <span className="font-bold">Grand Total:</span>
    //       <span>{formatRupiah(grandTotal)}</span>
    //     </div>
    //     <div className="flex justify-between py-1">
    //       <span className="font-bold">Jumlah Dibayar:</span>
    //       <span>{formatRupiah(jumlahDibayar)}</span>
    //     </div>
    //     <div className="flex justify-between py-1">
    //       <span className="font-bold">Kembalian:</span>
    //       <span>{formatRupiah(kembalian)}</span>
    //     </div>
    //   </div>

    //   <div className="text-center text-xl font-bold mt-6">
    //     <p>Terima Kasih</p>
    //   </div>
    // </div>
  );
};

export default ComponentToPrint;

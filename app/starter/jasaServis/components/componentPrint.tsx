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

const ComponentPrint = ({ data }: { data: any }) => {
  if (!data) {
    return <div>No data to print</div>;
  }

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
            {formatTanggal(data.tanggal)}
          </p>
        </div>
      </div>
      <div>
        <div className="divider"></div>
      </div>
      <div>
        <h1 className="font-bold text-[16px] text-[#242424] mb-6">
          Detail Servis
        </h1>
        <div>
          <div className="flex justify-between items-center text-slate-600 text-[14px] font-semibold mb-3">
            <h1>Kode Servis</h1>
            <h1>{data.kodeServis}</h1>
          </div>
          <div className="flex justify-between items-center text-slate-600 text-[14px] font-semibold mb-3">
            <h1>Nama Barang</h1>
            <h1>{data.namaBarang}</h1>
          </div>
          <div className="flex justify-between items-center text-slate-600 text-[14px] font-semibold mb-3">
            <h1>Nomor Seri</h1>
            <h1>{data.nomorSeri}</h1>
          </div>
          <div className="flex justify-between items-center text-slate-600 text-[14px] font-semibold mb-3">
            <h1>Nama Pelanggan</h1>
            <h1>{data.nama}</h1>
          </div>
          <div className="flex justify-between items-center text-slate-600 text-[14px] font-semibold mb-3">
            <h1>Nomor HP</h1>
            <h1>{data.nope}</h1>
          </div>
        </div>
      </div>
      <div>
        <div className="divider"></div>
      </div>
      <div>
        <h1 className="font-bold text-[16px] text-[#242424] mb-6">
          Detail Servis
        </h1>
        <div className="border border-slate-300 rounded-md w-full h-32 p-3">
          <p>{data.deskripsi}</p>
        </div>
      </div>
      <div className="mt-[48px]">
        <div className="flex flex-col items-end">
          <div className="text-center w-full">
            <p className="mb-2">Bangkinang, {formatTanggal(data.tanggal)}</p>
            <p className="mb-16">Nama Kasir</p>{" "}
            {/* Beri jarak sebelum tanda tangan */}
            <div className="border-t border-black w-1/4 mx-auto mt-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentPrint;

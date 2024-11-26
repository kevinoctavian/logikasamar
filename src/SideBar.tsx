import { useState } from "react";
import { dataTabel } from "./Data";

function Sidebar() {
  const [isShowTable, setIsShowTable] = useState(false);

  return (
    <div
      className={`${isShowTable ? "w-96" : "w-64"} bg-gray-800 text-white p-4 transition-all duration-500 ease-in-out`}
    >
      <h2 className="text-lg font-bold mb-4">Logika Samar</h2>
      <div>
        <button
          onClick={() => setIsShowTable(!isShowTable)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-4"
        >
          {!isShowTable ? "Hide Table" : "Show Table"}
        </button>
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            isShowTable ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {isShowTable && (
            <table className="w-full text-left text-xs bg-white shadow rounded">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-2 py-1 text-gray-950">Bulan</th>
                  <th className="px-2 py-1 text-gray-950">Permintaan</th>
                  <th className="px-2 py-1 text-gray-950">Persediaan</th>
                  <th className="px-2 py-1 text-gray-950">Produksi</th>
                </tr>
              </thead>
              <tbody>
                {dataTabel.Bulan.map((v, i) => (
                  <tr>
                    <td className="border text-black">
                      {v} ({dataTabel.Tahun})
                    </td>
                    <td className="border text-black">
                      {dataTabel.Permintaan[i]}
                    </td>
                    <td className="border text-black">
                      {dataTabel.Persediaan[i]}
                    </td>
                    <td className="border text-black">
                      {dataTabel.Produksi[i]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h3>Penentuan Variable</h3>
        <h5 className="mt-2 font-bold">Input</h5>
        <p>
          Permintaan ({Math.min(...dataTabel.Permintaan)} -{" "}
          {Math.max(...dataTabel.Permintaan)})
        </p>
        <p>
          Persediaan ({Math.min(...dataTabel.Persediaan)} -{" "}
          {Math.max(...dataTabel.Persediaan)})
        </p>
        <h5 className="mt-2 font-bold">Output</h5>
        <p>
          Permintaan ({Math.min(...dataTabel.Produksi)} -{" "}
          {Math.max(...dataTabel.Produksi)})
        </p>
      </div>
    </div>
  );
}

export default Sidebar;

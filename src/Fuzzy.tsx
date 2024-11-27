import { useState, useEffect } from "react";
import { dataTabel } from "./Data";

import Slider from "./Slider";

function Fuzzy() {
  const minProduksi = Math.min(...dataTabel.Produksi);
  const maxProduksi = Math.max(...dataTabel.Produksi);
  const minPermintaan = Math.min(...dataTabel.Permintaan);
  const maxPermintaan = Math.max(...dataTabel.Permintaan);
  const minPersediaan = Math.min(...dataTabel.Persediaan);
  const maxPersediaan = Math.max(...dataTabel.Persediaan);

  const [permintaanValue, setPerminValue] = useState(minPermintaan);
  const [persediaanValue, setPersedValue] = useState(minPersediaan);

  const [predikatValue, setPredikatValue] = useState([0, 0, 0, 0]);

  const [defuzzyValue, setDefuzzyValue] = useState("0.0");

  const fuzzyfikasi = () => {
    // Permintaan
    const turun =
      permintaanValue <= minPermintaan
        ? 1
        : permintaanValue > maxPermintaan
          ? 0
          : (maxPermintaan - permintaanValue) / (maxPermintaan - minPermintaan);
    const naik =
      permintaanValue < minPermintaan
        ? 0
        : permintaanValue > maxPermintaan
          ? 1
          : (permintaanValue - minPermintaan) / (maxPermintaan - minPermintaan);

    // persediaan
    const sedikit =
      persediaanValue <= minPersediaan
        ? 1
        : persediaanValue > maxPersediaan
          ? 0
          : (maxPersediaan - persediaanValue) / (maxPersediaan - minPersediaan);
    const banyak =
      persediaanValue < minPersediaan
        ? 0
        : persediaanValue > maxPersediaan
          ? 1
          : (persediaanValue - minPersediaan) / (maxPersediaan - minPersediaan);

    console.log(turun, naik, sedikit, banyak, permintaanValue, persediaanValue);

    setPredikatValue([
      Math.min(turun, banyak), // rules 1
      Math.min(turun, sedikit), // rules 2
      Math.min(naik, banyak), // rules 3
      Math.min(naik, sedikit), // rules 4
    ]);
  };

  const defuzzyfikasi = () => {
    const defuzzy =
      (predikatValue[0] * minProduksi +
        predikatValue[1] * minProduksi +
        predikatValue[2] * maxProduksi +
        predikatValue[3] * maxProduksi) /
      (predikatValue[0] +
        predikatValue[1] +
        predikatValue[2] +
        predikatValue[3]);

    setDefuzzyValue(Number.isNaN(defuzzy) ? "0.0" : defuzzy.toFixed(2));
  };

  useEffect(fuzzyfikasi, [persediaanValue, permintaanValue]);
  useEffect(defuzzyfikasi, [predikatValue]);

  return (
    <div className="flex-1 bg-gray-600 p-6">
      <div className="flex flex-col justify-center items-center">
        {/* Slider */}
        <div className="flex flex-col items-center space-y-4 p-6 w-4/5">
          <Slider
            name="Permintaan"
            min={minPermintaan}
            max={maxPermintaan}
            value={permintaanValue}
            onChange={(v) =>
              setPerminValue(
                Math.min(maxPermintaan, Math.max(minPermintaan, v)),
              )
            }
          />
          <Slider
            name="Persediaan"
            min={minPersediaan}
            max={maxPersediaan}
            value={persediaanValue}
            onChange={(v) =>
              setPersedValue(
                Math.min(maxPersediaan, Math.max(minPersediaan, v)),
              )
            }
          />
        </div>

        {/* defuzzyfikasi */}
        <div className="p-3 bg-green-200">
          <p>Hasil Produksi maxsimal adalah {defuzzyValue} unit batu bara</p>
          {false && predikatValue.map((v) => <p>{v.toFixed(3)}</p>)}
        </div>
      </div>
    </div>
  );
}

export default Fuzzy;

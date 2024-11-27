import { useState, FC, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

interface SliderProps {
  name: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
}

const Slider: FC<SliderProps> = ({ name, min, max, value, onChange }) => {
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [timeoutid, setTimeoutid] = useState<number | null>(null);

  const handleMouseDown = () => setIsSliding(true); // Show tooltip on interaction
  const handleMouseUp = () => setIsSliding(false); // Hide tooltip after interaction

  useEffect(() => {
    return () => {
      if (timeoutid) clearTimeout(timeoutid);
    };
  }, [timeoutid]);

  const onClickStep = (newValue: number) => {
    if (timeoutid) clearTimeout(timeoutid);
    setTimeoutid(setTimeout(handleMouseUp, 2000));

    handleMouseDown();
    onChange(value + newValue);
  };

  return (
    <div className="flex gap-x-2 justify-center items-center w-full">
      <button
        onClick={() => onClickStep(-5)}
        className="px-3 py-2 rounded-xl shadow-xl bg-blue-600 hover:bg-blue-700"
      >
        <FaMinus className="text-white text-sm" />
      </button>

      {/* Range Slider */}
      <div className="flex flex-col justify-center items-center relative w-full max-w-lg">
        <div className="">
          <label htmlFor="range_${name}" className="text-gray-200">
            {name}
          </label>
        </div>
        <div className="w-full">
          <input
            id={`range_${name}`}
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(v) => onChange(parseInt(v.target.value))}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            step={0.5}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />

          {/* Tooltip */}
          {isSliding && (
            <div
              className="absolute top-[-15px] flex justify-center transform -translate-x-1/2"
              style={{
                left: `${((value - min) / (max - min)) * 100}%`, // Calculate position as percentage
              }}
            >
              <div className="relative text-white text-sm py-1 px-2 rounded shadow">
                {value}
                {/* <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rotate-45"></div> */}
              </div>
            </div>
          )}
          {/* Display Range */}
          <div className="flex justify-between w-full max-w-lg text-sm text-gray-200">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onClickStep(5)}
        className="px-3 py-2 rounded-xl shadow-xl bg-blue-600 hover:bg-blue-700"
      >
        <FaPlus className="text-white text-sm" />
      </button>
    </div>
  );
};

export default Slider;

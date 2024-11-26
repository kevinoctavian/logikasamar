import { useState, FC } from "react";

interface SliderProps {
  name: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
}

const Slider: FC<SliderProps> = ({ name, min, max, value, onChange }) => {
  const [isSliding, setIsSliding] = useState<boolean>(false);

  const handleMouseDown = () => setIsSliding(true); // Show tooltip on interaction
  const handleMouseUp = () => setIsSliding(false); // Hide tooltip after interaction

  return (
    <>
      {/* Range Slider */}
      <div className="relative w-full max-w-lg">
        <div className="mb-5">
          <label htmlFor="range_${name}" className="text-gray-200">
            {name}
          </label>
        </div>
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
            className="absolute top-[15px] flex justify-center transform -translate-x-1/2"
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
    </>
  );
};

export default Slider;

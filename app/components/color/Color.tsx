"use client";

import React, { useState, useEffect } from "react";
import ColorPicker from "react-pick-color";
import { GrAdd } from "react-icons/gr";

interface Props {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  Color: string;
}
const Color: React.FC<Props> = ({ setFormData, Color }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState("#fff");

  const colorArray: string[] = Color.split(",");

  const [selectedColor, setSelectedColor] = useState<string[]>(colorArray);

  if (colorArray.length < 0) {
    setSelectedColor([]);
  }

  const handleColorButtonClick = () => {
    setSelectedColor((prevSelectedColors) => [...prevSelectedColors, color]);
    setOpen(false);
  };

  useEffect(() => {
    const handleSelectedColors = () => {
      setFormData((prevFormData: FormData) => ({
        ...prevFormData,
        color: selectedColor.join(","),
      }));
    };
    handleSelectedColors();
  }, [selectedColor]);

  const handleDeleteColor = (indexToDelete: number) => {
    setSelectedColor((prevSelectedColors) => {
      const updateColors = [...prevSelectedColors];
      updateColors.splice(indexToDelete, 1);
      return updateColors;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-3">
        <button
          className="block border-[1px] rounded-lg px-3 text-[14px]"
          onClick={() => setOpen(!open)}
        >
          Choose color
        </button>
        {open && (
          <ColorPicker
            color={color}
            onChange={(color) => setColor(color.hex)}
          />
        )}
        <button
          className="flex items-center space-x-1 border-[1px] rounded-lg p-1 px-3 text-[14px]"
          onClick={handleColorButtonClick}
        >
          Add
          <GrAdd className="ml-1" size={16} />
        </button>
      </div>
      <div className="mt-5">
        {selectedColor.map((selectedColor, index) => (
          <div key={index} className="flex items-center space-x-4 mb-2">
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "100%",
                backgroundColor: selectedColor,
                display: "inline-block",
              }}
              >
                </div>
                <span className="border-[1px] rounded-lg p-1 px-3 text-[14px]">
                    {selectedColor}
                </span>
              
                <button className="border-[1px] rounded-lg p-1 px-3 text-[14px]"
                onClickCapture={() => handleDeleteColor(index)}
                >Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Color;

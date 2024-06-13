import React, { useState } from "react";
import {
  Select,
  MenuItem,
  OutlinedInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/system";

const DropdownOptions = ({ options, title, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionSelect = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <CustomOptions>
      <SelectWrapper>
        <FormControl fullWidth variant="outlined">
          <InputLabel>{selectedOption === "" ? title : ""}</InputLabel>
          <Select
            value={selectedOption}
            onChange={handleOptionSelect}
            displayEmpty
            input={<OutlinedInput label={selectedOption === "" ? title : ""} />}
            MenuProps={{
              disableScrollLock: true,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left",
              },
            }}
            sx={{
              borderRadius: "10px",
              ".MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                key={index}
                value={option}
                sx={{
                  borderBottom: "none",
                  "&:last-child": {
                    borderBottom: "none",
                  },
                  fontFamily: "Arial, sans-serif",
                  fontSize: "16px",
                  color: "black",
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </SelectWrapper>
    </CustomOptions>
  );
};

export default DropdownOptions;

const CustomOptions = styled("div")`
  position: relative;
  width: 100%;
  margin: 20px 4px 20px 0;
  border-radius: 10px;
  background-color: white;

`;

const SelectWrapper = styled("div")`
  .MuiSelect-root {
    appearance: none; /* 기본 스타일 제거 */
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 12px 20px;
    margin-bottom: 20px;
    cursor: pointer;
  }
`;

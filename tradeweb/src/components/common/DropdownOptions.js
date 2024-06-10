import React, { useState } from "react";
import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  select: {
    borderRadius: "10px",
    "&:focus": {
      borderRadius: "10px",
    },
  },
  outlinedInput: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent", // 테두리 색상 제거
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent", // hover 상태에서도 테두리 제거
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent", // 포커스 상태에서도 테두리 제거
    },
  },
  paper: {
    borderRadius: "5px",
  },
  menuItem: {
    borderBottom: "none", // MenuItem 아래 구분선 제거
    "&:last-child": {
      borderBottom: "none", // 마지막 MenuItem에 대한 구분선 제거
    },
  },
});

const DropdownOptions = ({ options, title, onSelect }) => {
  const classes = useStyles();
  // 옵션 선택 상태 관리
  const [selectedOption, setSelectedOption] = useState("");

  // 옵션 선택 시
  const handleOptionSelect = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    // 상위 컴포넌트로 옵션 선택 전달
    onSelect(option);
  };

  return (
    <CustomOptions>
      <SelectWrapper>
        <Select
          value={selectedOption}
          onChange={handleOptionSelect}
          displayEmpty
          renderValue={
            selectedOption !== "" ? undefined : () => <span>{title}</span>
          }
          fullWidth
          classes={{ root: classes.select }}
          input={
            <OutlinedInput notched={false} className={classes.outlinedInput} />
          }
          MenuProps={{
            disableScrollLock: true, // 스크롤 락 비활성화
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
            classes: { paper: classes.paper },
          }}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option} className={classes.menuItem}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </SelectWrapper>
    </CustomOptions>
  );
};

export default DropdownOptions;

const CustomOptions = styled.div`
  position: relative;
  width: 100%;
  margin: 20px 4px 20px 0;
`;

const SelectWrapper = styled.div`
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

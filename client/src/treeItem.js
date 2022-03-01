import React, { useState } from "react";
import { StyledLabel, StyledTreeItem, StyledTreeChildren } from "./mui";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Box from "@material-ui/core/Box";
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import {styles} from './styles'
export const TreeItem = ({ onSelectCallback, label, isSelected, children }) => {
  const [isOpen, toggleItemOpen] = useState(null);
  const [selected, setSelected] = useState(isSelected);

  return (
    <div >
      <StyledTreeItem>
        {children[1].length > 0 && (
          <Box
            className="icon-container"
            onClick={() => toggleItemOpen(!isOpen)}
          >
            {isOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </Box>
        )}
        <StyledLabel
          className="label"
          onClick={(e) => {
            setSelected(!selected);
            onSelectCallback(e);
          }}
          style={{
            marginLeft: `${children[1].length === 0 ? "24px" : ""}`,
            background: `${selected ? "#d5d5d5" : ""}`,
          }}
        >
          {label}
        </StyledLabel>
        {children[1].length === 0 ? (
          <InsertDriveFileOutlinedIcon
            fontSize="small"
            style = {styles.icon}
          />
        ) : (
          <FolderOutlinedIcon
            fontSize="small"
            style = {styles.icon}
          />
        )}
      </StyledTreeItem>
      <StyledTreeChildren>{isOpen && children}</StyledTreeChildren>
      
    </div>
  );
};

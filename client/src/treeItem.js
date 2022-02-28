import React, { useState } from "react"
import {StyledLabel,StyledTreeItem,StyledTreeChildren} from './mui'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import Box from "@material-ui/core/Box"


export const TreeItem = ({
    onSelectCallback,
    label,
    isSelected,
    children,
  }) => {
    const [isOpen, toggleItemOpen] = useState(null)
    const [selected, setSelected] = useState(isSelected)
  
    return (
      <div>
        <StyledTreeItem>
          {children.length > 0 && (
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
              setSelected(!selected)
              onSelectCallback(e)
            }}
            style={{
              marginLeft: `${children.length === 0 ? "24px" : ""}`,
              background: `${selected ? "#d5d5d5" : ""}`,
            }}
          >
            {label}
          </StyledLabel>
        </StyledTreeItem>
        <StyledTreeChildren>{isOpen && children}</StyledTreeChildren>
      </div>
    )
  }
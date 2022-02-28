import {TreeItem} from "./treeItem"
import React, { Fragment } from "react"

import Box from "@material-ui/core/Box"




export const RecursiveTree = ({ listMeta, onSelectCallback }) => {
    const createTree = (branch) =>
      branch.children && (
        <TreeItem
          id={branch.id}
          key={branch.id}
          onSelectCallback={(e) => {
            onSelectCallback(branch)
          }}
          isSelected={branch.selected}
          label={branch.name}
        >
          {branch.children.map((branch) => {
            return <Fragment key={branch.id}>{createTree(branch)}</Fragment>
          })}
        </TreeItem>
      )
  
    return (
      <Box>
        {listMeta.map((branch, i) => (
          <Box key={i}>{createTree(branch)}</Box>
        ))}
      </Box>
    )
  }
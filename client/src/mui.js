import { styled } from "@material-ui/core/styles"
import Box from "@material-ui/core/Box"

// styles

export const StyledLabel = styled(Box)({
  height: "24px",
  "&:hover": {
    cursor: "pointer",
  },
})
export const StyledTreeItem = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
})
export const StyledTreeChildren = styled(Box)({
  paddingLeft: "10px",
})


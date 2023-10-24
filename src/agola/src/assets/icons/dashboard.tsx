import { memo } from 'react'

import { useTheme } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'

function DashboardIcon({ color, ...other }: BoxProps) {
  const theme = useTheme()

  const PRIMARY_MAIN = theme.palette.text.primary

  return (
    <Box
      component="svg"
      width="100%"
      height="100%"
      fill={PRIMARY_MAIN}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z" />
    </Box>
  )
}

export default memo(DashboardIcon)

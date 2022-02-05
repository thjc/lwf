import React from 'react'

import { useAppSelector } from '../../app/hooks'
import {
  selectBag
} from './bagSlice'
import { Box, Typography } from '@mui/material'

export function Bag () {
  const bag = useAppSelector(selectBag)

  return (
    <Box width={1 / 2}>
      <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
        {bag.tiles.length} Tiles Remaining
      </Typography>
    </Box>
  )
}

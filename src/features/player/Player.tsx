import React from 'react';

import { PlayerState } from './playersSlice';

import styles from './Player.module.css';
import { Box, Typography } from '@mui/material';


export function Player(args: { player: PlayerState, active: boolean }) {
  return (
    <Box className={args.active ? styles.activePlayer : ""}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Player {args.player.username}
      </Typography>
      Score: {args.player.score - args.player.penalty}
    </Box>
  )
};

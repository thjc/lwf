import React, { useRef, useState } from 'react';

import { Tile } from './Tile';

import {
  Box,
  Card,
  Image,
  Heading,
  Text
} from 'rebass'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  placeWorkingTile,
  selectBoard,
} from './boardSlice';

import { SquareState } from './engine';

import styles from './Board.module.css';
import { useDrag, useDrop } from 'react-dnd';

export function BoardSquare(props:any) {
  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);

  const tileValue = props.tile;

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'tile',
      drop: (item: any) => dispatch(placeWorkingTile({value: item.value, from: item.from, place: props.position})),
      collect: (monitor) => ({
        isOver: !!monitor.isOver()
      })
    }),
    [tileValue]
  )

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'tile',
    item: { value: tileValue, from: props.position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
  }),
  [tileValue]
  )

   if (tileValue.state !== SquareState.Empty) {
    return (
      <Box ref={tileValue.state !== SquareState.Placed? drag : undefined}>
        <Tile isDragging={isDragging} tileType={tileValue.state}>{tileValue.value.toUpperCase()}</Tile>
      </Box>
    );
  } else {
    return (<Box ref={drop} className={styles.boardSquare}></Box>)
  }
}

import React from 'react';

import { Tile } from './Tile';

import {
  Box,
} from 'rebass'

import { useAppDispatch } from '../../app/hooks';
import {
  placeWorkingTile,
} from './boardSlice';

import { getBoardCoordinates, getSquareType, SquareState, SquareType } from './engine';

import styles from './Board.module.css';
import { useDrag, useDrop } from 'react-dnd';

export function BoardSquare(props:any) {
  const dispatch = useAppDispatch();

  const tileValue = props.tile;
  const canPlayOnBoard = props.canPlay;

  const [, drop] = useDrop(
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
      <Box ref={tileValue.state !== SquareState.Placed ? drag : undefined}>
        <Tile isDragging={isDragging} tileType={tileValue.state} position={props.position}>{tileValue.value ? tileValue.value.toUpperCase() : ' '}</Tile>
      </Box>
    );
  } else {
    const type = getSquareType(...getBoardCoordinates(props.position));
    const style = ((v : SquareType) => {
      switch (v) {
        case(SquareType.Plain): { return styles.boardSquare }
        case(SquareType.TripleWord): { return styles.boardTripleWord }
        case(SquareType.TripleLetter): { return styles.boardTripleLetter }
        case(SquareType.DoubleWord): { return styles.boardDoubleWord }
        case(SquareType.DoubleLetter): { return styles.boardDoubleLetter }
      }
    })(type);
    return (<Box ref={canPlayOnBoard ? drop : undefined} className={style}></Box>)
  }
}

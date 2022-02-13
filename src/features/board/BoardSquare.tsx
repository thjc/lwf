import React from 'react'

import { Tile } from './Tile'

import { useAppDispatch } from '../../app/hooks'
import {
  placeWorkingTile
} from './boardSlice'

import { getBoardCoordinates, getSquareType, SquareState, SquareType } from './engine'

import styles from './Board.module.css'
import { useDrag, useDrop } from 'react-dnd'
import { Box } from '@mui/material'

export function BoardSquare(props: any) {
  const dispatch = useAppDispatch()

  const tileValue = props.tile
  const canPlayOnBoard = props.canPlay

  const [, drop] = useDrop(
    () => ({
      accept: 'tile',
      drop: (item: any) => dispatch(placeWorkingTile({ value: item.value, from: item.from, place: props.position, dropType: tileValue.state })),
      canDrop: (item, monitor) => {
        return tileValue.state === SquareState.Hand ||
          tileValue.state === SquareState.HandEnd ||
          tileValue.state === SquareState.Empty
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      })
    }),
    [tileValue]
  )

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'tile',
    item: { value: tileValue, from: props.position },
    canDrag: tileValue.state === SquareState.Hand || tileValue.state === SquareState.Working,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }),
    [tileValue]
  )

  if (tileValue.state !== SquareState.Empty && tileValue.state !== SquareState.HandEnd) {
    return (
      <Box ref={(node: React.ReactElement) => drag(drop(node))}>
        <Tile isDragging={isDragging} tileType={tileValue.state} position={props.position}>{tileValue.value ? tileValue.value.toUpperCase() : ' '}</Tile>
      </Box>
    )
  } else {
    const type = getSquareType(...getBoardCoordinates(props.position))
    let style = styles.rackEndSquare
    if (tileValue.state !== SquareState.HandEnd) {
      style = `${styles.boardSquare} ${((v: SquareType) => {
        switch (v) {
          case (SquareType.Plain): { return "" }
          case (SquareType.TripleWord): { return styles.boardTripleWord }
          case (SquareType.TripleLetter): { return styles.boardTripleLetter }
          case (SquareType.DoubleWord): { return styles.boardDoubleWord }
          case (SquareType.DoubleLetter): { return styles.boardDoubleLetter }
        }
      })(type)}`
    }
    return (<Box ref={canPlayOnBoard ? drop : undefined} className={style} />)
  }
}

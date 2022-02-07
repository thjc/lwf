import React, { useRef } from 'react'

import { Tile } from './Tile'

import { useAppDispatch } from '../../app/hooks'
import {
  placeWorkingTile
} from './boardSlice'

import { getBoardCoordinates, getSquareType, SquareState, SquareType } from './engine'

import styles from './Board.module.css'
import { useDrag, useDrop } from 'react-dnd'
import { Box } from '@mui/material'

export function BoardSquare (props: any) {
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLDivElement>(null)

  const tileValue = props.tile
  const canPlayOnBoard = props.canPlay || tileValue.state === SquareState.HandEnd

  const [, drop] = useDrop(
    () => ({
      accept: 'tile',
      drop: (item: any) => dispatch(placeWorkingTile({ value: item.value, from: item.from, place: props.position, dropType: tileValue.state })),
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
    })
  }),
  [tileValue]
  )

  if (tileValue.state !== SquareState.Empty && tileValue.state !== SquareState.HandEnd) {
    if (tileValue.state !== SquareState.Placed) {
      drag(ref)
      if (tileValue.state === SquareState.Hand) {
        drop(ref)
      }
    }
    return (
      <Box ref={ref}>
        <Tile isDragging={isDragging} tileType={tileValue.state} position={props.position}>{tileValue.value ? tileValue.value.toUpperCase() : ' '}</Tile>
      </Box>
    )
  } else {
    const type = getSquareType(...getBoardCoordinates(props.position))
    let style = styles.rackEndSquare
    if (tileValue.state !== SquareState.HandEnd) {
      style = `${styles.boardSquare} ${((v: SquareType) => {
        switch (v) {
          case (SquareType.Plain): { return ""}
          case (SquareType.TripleWord): { return styles.boardTripleWord}
          case (SquareType.TripleLetter): { return styles.boardTripleLetter}
          case (SquareType.DoubleWord): { return styles.boardDoubleWord}
          case (SquareType.DoubleLetter): { return styles.boardDoubleLetter}
        }
      })(type)}`
    }
    return (<Box ref={canPlayOnBoard ? drop : undefined} className={style} />)
  }
}

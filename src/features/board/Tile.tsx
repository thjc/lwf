import React from 'react'

import { getTileValue, SquareState } from './engine'
import styles from './Board.module.css'
import { selectBlank } from './boardSlice'
import { useAppDispatch } from '../../app/hooks'

export function Tile (props: any) {
  const dispatch = useAppDispatch()
  const tileLetter = props.children

  const tileClick = () => {
    if (tileLetter[0] === ' ' && props.tileType === SquareState.Working) {
      dispatch(selectBlank(props.position))
    }
  }

  return (
    <div
      className={[
        props.isDragging ? styles.dragTile : '',
        props.tileType === SquareState.Working ? styles.workingTile : '',
        tileLetter[0] === ' ' ? styles.blankTile : '',
        styles.tile
      ].join(' ')} onClick={() => tileClick()}
    >
      <div className={styles.tileLetter}>{tileLetter}</div>
      <div className={styles.tileValue}>{getTileValue(tileLetter)}</div>
    </div>
  )
}

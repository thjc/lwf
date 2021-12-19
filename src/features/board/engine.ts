interface tileValue {
    [key: string]: number;
}

export enum SquareState {
    Empty,
    Placed,
    Working,
    Hand
}

export enum WordDirection {
    Invalid, // letters are not only in one direction
    Horizontal,
    Vertical
}

export interface Square {
    value: string;
    state: SquareState;
}

export interface BoardState {
    squares: Square[];
}

export const boardSize = 15;

export function getTileValue(tileLetter: string) : number {
    const table : tileValue = {
        ' ': 0,
        'A': 1,
        'B': 3,
        'C': 3,
        'D': 2,
        'E': 1,
        'F': 4,
        'G': 2,
        'H': 4,
        'I': 1,
        'J': 8,
        'K': 5,
        'L': 1,
        'M': 3,
        'N': 1,
        'O': 1,
        'P': 3,
        'Q': 10,
        'R': 1,
        'S': 1,
        'T': 1,
        'U': 1,
        'V': 4,
        'W': 4,
        'X': 8,
        'Y': 4,
        'Z': 10
    };
    return table[tileLetter[0].toUpperCase()] || 1;
}

export function getBoardIndex(x: number, y: number) : number {
    return x + y*boardSize;
}

export function findStartWorkingTile(squares: Square[]) : [number, number] | undefined
{
    for (let x = 0; x < boardSize; ++x) {
        for (let y = 0; y < boardSize; ++y) {
            const square = squares[getBoardIndex(x,y)];
            if (square && square.state === SquareState.Working) {
                return [x,y];
            }
        }
    }
    return undefined
}

export function getDirection(squares: Square[]) : WordDirection {
    const summary = [new Set<number>(), new Set<number>()];

    for (let x = 0; x < boardSize; ++x) {
        for (let y = 0; y < boardSize; ++y) {
            if (squares[getBoardIndex(x,y)].state === SquareState.Working) {
                summary[0].add(x);
                summary[1].add(y);
            }
        }
    }

    if (summary[0].size === 0) {
        return WordDirection.Invalid;
    } else if (summary[0].size > 1) {
        if (summary[1].size > 1) {
            // tiles vertical and horizontal....invalid
            return WordDirection.Invalid;
        }
        return WordDirection.Horizontal;
    }
    return WordDirection.Vertical;
}

export function hasNoGaps(squares: Square[], xStart: number, yStart: number, direction: WordDirection) : boolean {
    let gaps = 0;
    let valid = true;
    function checkSquare(sq: Square) {
        switch (sq.state) {
            case SquareState.Empty: {
                gaps++;
                break;
            }
            case SquareState.Working: {
                if (gaps > 0) {
                    valid = false;
                }
            }
        }
    }
    if (direction === WordDirection.Horizontal) {
        for (let x = xStart; x < boardSize; ++x) {
            checkSquare(squares[getBoardIndex(x,yStart)]);
        }
    } else if (direction === WordDirection.Vertical) {
        for (let y = yStart; y < boardSize; ++y) {
            checkSquare(squares[getBoardIndex(xStart,y)]);
        }
    }
    return valid;
}

export function isValidPlacement(squares: Square[]): boolean {
    let result = false;
    // find the first new tile
    const firstWorking = findStartWorkingTile(squares);

    // then work out direction of tiles
    if (firstWorking !== undefined) {
        let direction = getDirection(squares);
        if (direction !== WordDirection.Invalid) {
            result = hasNoGaps(squares, firstWorking[0], firstWorking[1], direction);
        }
    }
    return result;
}

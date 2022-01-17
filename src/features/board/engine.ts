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
    blankToSelect: number;
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
    return table[tileLetter[0].toUpperCase()];
}

export function getBoardIndex(x: number, y: number) : number {
    return x + y*boardSize;
}

export function getBoardCoordinates(index: number) : [number, number] {
    return [index % boardSize, Math.floor(index/boardSize)];
}

export enum SquareType {
    Plain, // letters are not only in one direction
    DoubleLetter,
    TripleLetter,
    DoubleWord,
    TripleWord
}

export function getSquareType(x: number, y: number) : SquareType {
    const wrap = (v : number) => v > 7 ? (14 - v) : v;
    const wx = wrap(x);
    const wy = wrap(y);
    const compare = (v : number[]) => v[0] === wx && v[1] === wy;
    if ([[0,0],[0,7],[7,0]].findIndex(compare) >= 0) {
        return SquareType.TripleWord;
    } else if ([[5,1],[1,5],[5,5]].findIndex(compare) >= 0) {
        return SquareType.TripleLetter;
    } else if ([[0,3],[3,0],[6,2],[2,6],[6,6],[3,7],[7,3]].findIndex(compare) >= 0) {
        return SquareType.DoubleLetter;
    } else if (wx === wy) {
        return SquareType.DoubleWord;
    } else {
        return SquareType.Plain;
    }
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
                if (!sq.value || (sq.value.length === 1 && sq.value[0] === ' ')) {
                    valid = false;
                }
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

export function containsTile(squares: Square[], startX : number, startY: number, direction: WordDirection, testX: number, testY: number)
{
    let x = startX;
    let y = startY;
    while(x < boardSize && y < boardSize) {
        const tile = squares[getBoardIndex(x,y)];
        if (tile.state === SquareState.Empty) {
            return false;
        } else if (x === testX && y === testY) {
            return true;
        }

        if (direction === WordDirection.Horizontal) {
            x += 1;
        } else {
            y += 1;
        }
    }
    return false;
}

export function isValidPlacement(squares: Square[]): boolean {
    const firstTurn = squares.reduce((acc, v) => acc && v.state !== SquareState.Placed, true);
    let noGaps = false;
    // find the first new tile
    const firstWorking = findStartWorkingTile(squares);
    let containsCentre = false;

    let allNewLetters = true;
    const checkAllNewLetters = (v : placedLetter) => {allNewLetters = allNewLetters && v.newLetter};

    // then work out direction of tiles
    if (firstWorking !== undefined) {
        let direction = getDirection(squares);
        if (direction !== WordDirection.Invalid) {
            noGaps = hasNoGaps(squares, firstWorking[0], firstWorking[1], direction);
        }
        const words = collectWords(squares, firstWorking[0], firstWorking[1], direction);
        for (let w of words) {
            w.forEach(checkAllNewLetters);
        }
        containsCentre ||= containsTile(squares, firstWorking[0], firstWorking[1], direction, 7, 7);
    }

    return noGaps && (firstTurn || !allNewLetters) && (!firstTurn || containsCentre);
}

export function isValidWord(word: placedLetter[]): boolean {
    // TODO: Dictionart lookup here
    return true;
}

export interface placedLetter {
    letter: string;
    letterMultiplier: number;
    wordMultiplier: number;
    newLetter: boolean;
}

export function collectWords(squares: Square[], xStart: number, yStart: number, direction: WordDirection): placedLetter[][] {
    let ret = [getWord(squares, xStart, yStart, direction)];

    const next = (x: number,y: number) => {return direction === WordDirection.Horizontal ? [x+1, y] : [x, y+1]}

    for (let x = xStart, y = yStart;x < boardSize && y < boardSize && squares[getBoardIndex(x,y)].state !== SquareState.Empty; [x,y] = next(x,y)) {
        if (squares[getBoardIndex(x,y)].state === SquareState.Working) {
            const otherDirection = direction === WordDirection.Horizontal ? WordDirection.Vertical : WordDirection.Horizontal;
            const candidate = getWord(squares, x, y, otherDirection);
            if (candidate.length > 1)
            {
                ret.push(candidate);
            }
        }
    }
    return ret;
}

function getPlacedLetterInfo(s: Square, x: number, y: number) : placedLetter {

    const ret : placedLetter = {
        letter: s.value,
        letterMultiplier: 1,
        wordMultiplier: 1,
        newLetter: false,
    }

    if (s.state === SquareState.Working) {
        ret.newLetter = true;
        const type = getSquareType(x,y);
        if (type === SquareType.TripleLetter) {
            ret.letterMultiplier = 3;
        } else if (type === SquareType.DoubleLetter) {
            ret.letterMultiplier = 2;
        } else if (type === SquareType.TripleWord) {
            ret.wordMultiplier = 3;
        } else if (type === SquareType.DoubleWord) {
            ret.wordMultiplier = 2;
        }
    }

    return ret;
}

export function getWord(squares: Square[], xStart: number, yStart: number, direction: WordDirection): placedLetter[] | [] {
    let ret : placedLetter[] = []
    if (direction === WordDirection.Horizontal) {
        for (; xStart > 0 && squares[getBoardIndex(xStart-1,yStart)].state!==SquareState.Empty; --xStart) {}
        for (let x = xStart; x < boardSize && squares[getBoardIndex(x,yStart)].state!==SquareState.Empty; ++x) {
            ret.push(getPlacedLetterInfo(squares[getBoardIndex(x,yStart)], x, yStart));
        }
    } else if (direction === WordDirection.Vertical) {
        for (; yStart > 0 && squares[getBoardIndex(xStart,yStart-1)].state!==SquareState.Empty; --yStart) {}
        for (let y = yStart; y < boardSize && squares[getBoardIndex(xStart,y)].state!==SquareState.Empty; ++y) {
            ret.push(getPlacedLetterInfo(squares[getBoardIndex(xStart,y)], xStart, y));
        }
    }

    return ret;
}

export function isValidWordSet(squares: Square[], xStart: number, yStart: number, direction: WordDirection): boolean {
    let ret = true;
    const words = collectWords(squares, xStart, yStart, direction);
    for (let w of words) {
        ret = ret && isValidWord(w);
    }
    return ret;
}

export function scoreWord(word: placedLetter[]): number {
    let score = 0;
    let wordMultiplier = 1;
    [...word].forEach(l => {score += getTileValue(l.letter) * l.letterMultiplier; wordMultiplier *= l.wordMultiplier});
    return score * wordMultiplier;
}

export function scoreWords(squares: Square[], xStart: number, yStart: number, direction: WordDirection): number {
    let ret = 0;
    const words = collectWords(squares, xStart, yStart, direction);
    words.forEach(w => ret += scoreWord(w))
    return ret;
}

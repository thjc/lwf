import { boardSize, getBoardIndex, getDirection, getWord, hasNoGaps, findStartWorkingTile, WordDirection, Square, SquareState, collectWords } from './engine'

function makeTestSquares(input : string[]) : Square[] {
    Array.from({length: 6}, e => Array(12).fill(0));

    let squares = Array.from({length: boardSize * boardSize}, e => {return {value: ' ', state: SquareState.Empty};});
    input.forEach((v,y) => {
        [...v].forEach((u,x) => {
            squares[getBoardIndex(x,y)].value = u.toUpperCase();
            if (u === ' ') {
                // pass
            }
            else if (u === u.toUpperCase()) {
                squares[getBoardIndex(x,y)].state = SquareState.Placed;
            } else if (u === u.toLowerCase()) {
                squares[getBoardIndex(x,y)].state = SquareState.Working;
            }
        });
    });
    return squares;
}

describe('basic support functions', () => {
    it('getBoardIndex', () => {
        expect(getBoardIndex(0, 0)).toEqual(0);
        expect(getBoardIndex(1, 0)).toEqual(1);
        expect(getBoardIndex(0, 1)).toEqual(15);
        expect(getBoardIndex(5, 10)).toEqual(155);
    });
});

describe('tile validaton', () => {
    it('findStartWorkingTile', () => {
        let squares = new Array(boardSize * boardSize).fill({ value: ' ', state: SquareState.Empty });
        expect(findStartWorkingTile(squares)).toBeUndefined();

        squares[getBoardIndex(0, 0)] = { values: 'a', state: SquareState.Placed };
        expect(findStartWorkingTile(squares)).toBeUndefined();

        squares[getBoardIndex(0, 0)] = { values: 'a', state: SquareState.Working };
        expect(findStartWorkingTile(squares)).toEqual([0, 0]);

        squares[getBoardIndex(0, 0)] = { values: '', state: SquareState.Empty };
        squares[getBoardIndex(1, 1)] = { values: '', state: SquareState.Working };
        expect(findStartWorkingTile(squares)).toEqual([1, 1]);

        squares[getBoardIndex(0, 0)] = { values: '', state: SquareState.Placed };
        squares[getBoardIndex(10, 1)] = { values: '', state: SquareState.Working };
        expect(findStartWorkingTile(squares)).toEqual([1, 1]);
    });

    it('getDirection', () => {
        let squares = new Array(boardSize * boardSize).fill({ value: ' ', state: SquareState.Empty });
        expect(getDirection(squares)).toEqual(WordDirection.Invalid);

        squares[getBoardIndex(0, 0)] = { values: 'a', state: SquareState.Placed };
        expect(getDirection(squares)).toEqual(WordDirection.Invalid);

        squares[getBoardIndex(0, 0)] = { values: 'a', state: SquareState.Working };
        expect(getDirection(squares)).toEqual(WordDirection.Vertical);

        squares[getBoardIndex(0, 0)] = { values: 'a', state: SquareState.Empty };
        squares[getBoardIndex(1, 1)] = { values: 'a', state: SquareState.Working };
        expect(getDirection(squares)).toEqual(WordDirection.Vertical);

        squares[getBoardIndex(2, 1)] = { values: 'a', state: SquareState.Working };
        expect(getDirection(squares)).toEqual(WordDirection.Horizontal);

        squares[getBoardIndex(2, 2)] = { values: 'a', state: SquareState.Working };
        expect(getDirection(squares)).toEqual(WordDirection.Invalid);

        squares[getBoardIndex(1, 1)] = { values: 'a', state: SquareState.Empty };
        expect(getDirection(squares)).toEqual(WordDirection.Vertical);
    });

    it('hasNoGaps', () => {
        let squares = new Array(boardSize * boardSize).fill({ value: ' ', state: SquareState.Empty });

        squares[getBoardIndex(1, 1)] = { values: 'a', state: SquareState.Working };
        expect(hasNoGaps(squares, 1, 1, WordDirection.Vertical)).toEqual(true);

        squares[getBoardIndex(2, 1)] = { values: 'a', state: SquareState.Working };
        squares[getBoardIndex(3, 1)] = { values: 'a', state: SquareState.Working };
        expect(hasNoGaps(squares, 1, 1, WordDirection.Horizontal)).toEqual(true);

        squares[getBoardIndex(2, 1)] = { values: 'a', state: SquareState.Placed };
        expect(hasNoGaps(squares, 1, 1, WordDirection.Horizontal)).toEqual(true);

        squares[getBoardIndex(2, 1)] = { values: 'a', state: SquareState.Empty };
        expect(hasNoGaps(squares, 1, 1, WordDirection.Horizontal)).toEqual(false);

        squares[getBoardIndex(1, 2)] = { values: 'a', state: SquareState.Working };
        squares[getBoardIndex(3, 1)] = { values: 'a', state: SquareState.Empty };
        expect(hasNoGaps(squares, 1, 1, WordDirection.Vertical)).toEqual(true);
    });
});

describe('tile validaton', () => {
    it('getWord', () => {
        expect(getWord(makeTestSquares(["test"]), 0, 0, WordDirection.Horizontal)).toEqual("TEST");
        expect(getWord(makeTestSquares(["Test"]), 1, 0, WordDirection.Horizontal)).toEqual("TEST");
        expect(getWord(makeTestSquares(["","Test"]), 1, 1, WordDirection.Horizontal)).toEqual("TEST");
        expect(getWord(makeTestSquares([" T"," e", " s", " T"]), 1, 1, WordDirection.Vertical)).toEqual("TEST");
        expect(getWord(makeTestSquares(["  T","  E", "jeSt", "  T"]), 0, 2, WordDirection.Horizontal)).toEqual("JEST");
    });

    it('collectWords', () => {
        expect(collectWords(makeTestSquares(["test"]), 0, 0, WordDirection.Horizontal)).toEqual(["TEST"]);
        expect(collectWords(makeTestSquares(["Test"]), 1, 0, WordDirection.Horizontal)).toEqual(["TEST"]);
        expect(collectWords(makeTestSquares(["  T","  E", "  S", "  T", "jeSt"]), 0, 4, WordDirection.Horizontal)).toEqual(["JEST"]);
        expect(collectWords(makeTestSquares(["  T","  E", "  S", "  T", "jest"]), 0, 4, WordDirection.Horizontal)).toEqual(["JEST", "TESTS"]);
    });


});
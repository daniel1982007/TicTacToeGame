import React, {useState, useEffect} from 'react'
import Score from './Score'
import Row from './Row'
import Context from '../Context'

const PlayArea = ({player1, player2}) => {
    const [isFirstPlayer, setIsFirstPlayer] = useState(true)
    const [arr, setArr] = useState([Array(3), Array(3), Array(3)])
    const [horCrossId, setHorCrossId] = useState()
    const [verCrossId, setVerCrossId] = useState()
    const [b_diagonalCrossId, setB_diagonalCrossId] = useState()
    const [f_diagonalCrossId, setF_diagonalCrossId] = useState()
    const [winner, setWinner] = useState()
    const [isGameOver, setIsGameOver] = useState(false)
    const [restart, setRestart] = useState(false)
    //const [cellValue, setCellValue] = useState(false)
    
    console.log(arr)

    const restartGame = () => {
        setIsGameOver(false)
        setHorCrossId(undefined)
        setVerCrossId(undefined)
        setB_diagonalCrossId(undefined)
        setF_diagonalCrossId(undefined)
        setRestart(prev => !prev)
        //setCellValue(prev => !prev)
        setIsFirstPlayer(true)
        setArr([Array(3), Array(3), Array(3)])
    }

    useEffect(() => {
        //horizontal check
        const horizontalCheck = () => {  
            for(let i=0; i<3; i++) {
                //to check if subarray has any item undefined
                if(!arr[i].includes(undefined)) {
                    const isSame = arr[i].every(el => el === arr[i][0])
                    if(isSame) {
                        setHorCrossId(i+1)
                        arr[i][0] === 'X' ? setWinner('X') : setWinner('O')
                        setIsGameOver(prev => !prev)
                        return
                    }
                }
            }
        }

        //vertical check
        const verticalCheck = () => {
            loopA:
            for(let j=0; j<3; j++) {
                for(let i=0; i<3; i++) {
                    if(!arr[i][j]) {
                        continue loopA
                    }
                }
                if(arr[0][j] === arr[1][j] && arr[0][j] === arr[2][j]) {
                    setVerCrossId(j+1)
                    arr[0][j] === 'X' ? setWinner('X') : setWinner('O')
                    setIsGameOver(prev => !prev)
                    return
                }
            }
        }

        //diagonal check
        const diagonalCheck = () => {
            if(arr[0][2] !== undefined && arr[1][1] !== undefined && arr[2][0] !== undefined && arr[0][2] === arr[1][1] && arr[0][2] === arr[2][0]) {
                setF_diagonalCrossId('f')
                arr[1][1] === 'X' ? setWinner('X') : setWinner('O')
                setIsGameOver(prev => !prev)
                return
            } else if(arr[0][0] !== undefined && arr[1][1] !== undefined && arr[2][2] !== undefined && arr[0][0] === arr[1][1] && arr[0][0] === arr[2][2]) {
                setB_diagonalCrossId('b')
                arr[1][1] === 'X' ? setWinner('X') : setWinner('O')
                setIsGameOver(prev => !prev)
                return
            }
        }

        horizontalCheck()
        verticalCheck()
        diagonalCheck()

    }, [arr, isFirstPlayer])

    

    return (
        <div className='main-bg p-1 d-flex'>
            <div className='play-area-bg pos-rel'>
                <div className='purple-line-h pos-abs-firstline'></div>
                <div className='purple-line-h pos-abs-secondline'></div>
                <div className='purple-line-v pos-abs-thirdline'></div>
                <div className='purple-line-v pos-abs-forthline'></div>
                <Context.Provider value={{isFirstPlayer, setIsFirstPlayer, setArr, isGameOver, restart}}>
                    <Row rowId='0'/>
                    <Row rowId='1'/>
                    <Row rowId='2'/>
                </Context.Provider>
                <div className='hor-cross-line pos-abs-hor-cross-1' style={horCrossId === 1 ? {display: ''} : {display: 'none'}}/>
                <div className='hor-cross-line pos-abs-hor-cross-2' style={horCrossId === 2 ? {display: ''} : {display: 'none'}}/>
                <div className='hor-cross-line pos-abs-hor-cross-3' style={horCrossId === 3 ? {display: ''} : {display: 'none'}}/>
                <div className='ver-cross-line pos-abs-ver-cross-1' style={verCrossId === 1 ? {display: ''} : {display: 'none'}}/>
                <div className='ver-cross-line pos-abs-ver-cross-2' style={verCrossId === 2 ? {display: ''} : {display: 'none'}}/>
                <div className='ver-cross-line pos-abs-ver-cross-3' style={verCrossId === 3 ? {display: ''} : {display: 'none'}}/>
                <style dangerouslySetInnerHTML={{__html: [
                        '.b-cross-line::after {',
                            'content: "";',
                            'position: absolute;',
                            'top: 10px;',
                            'left: 10px;',
                            'border-top: 6px solid rgb(179, 47, 47);',
                            'width: 400px;',
                            'transform: rotate(45deg);',
                            'transform-origin: 0% 0%;',
                        '}'
                    ].join('\n')}}>
                </style>
                <div className='b-cross-line' style={b_diagonalCrossId==='b' ? {display: ''} : {display: 'none'}}/>
                <style dangerouslySetInnerHTML={{__html: [
                            '.f-cross-line::after {',
                            'content: "";',
                            'position: absolute;',
                            'bottom: 10px;',
                            'left: 10px;',
                            'border-top: 6px solid rgb(179, 47, 47);',
                            'width: 400px;',
                            'transform: rotate(-45deg);',
                            'transform-origin: 0% 0%;',
                        '}'
                    ].join('\n')}}>
                </style>
                <div className='f-cross-line' style={f_diagonalCrossId==='f' ? {display: ''} : {display: 'none'}}/>    
            </div>
            <div>
                <Context.Provider value={{isGameOver, winner}}>
                    <Score player1={player1} player2={player2}/>
                </Context.Provider>
                <button className='btn' onClick={restartGame}>RESTART</button>
            </div>
        </div>
    )
}

export default PlayArea
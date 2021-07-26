import React, {useContext, useEffect, useState} from 'react'
import Context from '../Context'

const Score = ({player1, player2}) => {
    const {isGameOver, winner} = useContext(Context)
    const [round_X, setRound_X] = useState(0)
    const [round_O, setRound_O] = useState(0)

    useEffect(() => { 
        if(isGameOver && winner === 'X') {
            setRound_X(round_X => round_X+1)
        } else if(isGameOver && winner === 'O') {
            setRound_O(round_O => round_O+1)
        }
    }, [winner, isGameOver])
    
    return (
        <div>
            <h1 className='mt-0 text-white'>Score</h1>
            <h2 className='text-white'>{player1}: {round_X}</h2>
            <h2 className='text-white'>{player2}: {round_O}</h2>
        </div>
    )
}

export default Score
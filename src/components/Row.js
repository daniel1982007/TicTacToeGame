import React, {useContext, useEffect} from 'react'
import context from '../Context'

const Row = ({rowId}) => {
    const {isFirstPlayer, setIsFirstPlayer, setArr, isGameOver, restart} = useContext(context)

    const handleClick = (e) => {
        if(!e.target.innerText) {
            if(isFirstPlayer) {
                e.target.innerText = `X`
            } else {
                e.target.innerText = `O`
            }

            setArr(prev => {
                //never edit current state(especially array and object)
                const newArr = prev
                newArr[rowId][e.target.id] = e.target.innerText
                return newArr
            })
            
            setIsFirstPlayer(prev => !prev)
        }
    }

    useEffect(() => {
        document.querySelectorAll('.cell-size').forEach(el => el.innerText = '')
    }, [restart])
    
    return (   
        <div className='row-size d-flex'>
            <div id='0' className='cell-size align-center text' onClick={isGameOver ? null : handleClick}></div>
            <div id='1' className='cell-size align-center text' onClick={isGameOver ? null : handleClick}></div>
            <div id='2' className='cell-size align-center text' onClick={isGameOver ? null : handleClick}></div>
        </div>
    )
}

export default Row
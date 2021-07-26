import React from 'react'

const Modal = ({setShowModal, player1, player2, setPlayer1, setPlayer2}) => {
    const handleChange = (e) => {
        e.target.name === 'player1' ? setPlayer1(e.target.value) : setPlayer2(e.target.value)
    }

    const handleClick = () => {
        (player1 && player2) && setShowModal(false)
    }

    return (
        <div className='modal_bg'>
          <div className='modal_window'>
            <h1>Please give users name :)</h1>
            <input className='username' name='player1' type="text" placeholder='Player 1 with X, without username you can not play!' onChange={handleChange}/>
            <input className='username' name='player2' type="text" placeholder='Player 2 with O, without username you can not play!' onChange={handleChange}/>     
            <button className='btn' onClick={handleClick}>Set Usernames</button>
          </div>
        </div>
    )
}

export default Modal
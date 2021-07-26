import React, {useState} from 'react'
import './App.css'
import PlayArea from './components/PlayArea'
import Modal from './components/Modal'

function App() {
  const [showModal, setShowModal] = useState(true)
  const [player1, setPlayer1] = useState()
  const [player2, setPlayer2] = useState()

  return (
    <div className='bg'>
        <PlayArea player1={player1} player2={player2}/>
        {showModal && <Modal setShowModal={setShowModal} player1={player1} player2={player2} setPlayer1={setPlayer1} setPlayer2={setPlayer2}/>}
        
    </div>
  )
}

export default App

import './App.css'
import { Board } from './components/board/board'

function App() {

  return (
    <>
    <div>
    <h1>Memory Card Game</h1>
    <h4>By Federico Deniard</h4>
    </div>
    <div className='game'>
    <Board />
    </div>
    </>
  )
}

export default App

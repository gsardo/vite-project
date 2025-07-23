import './App.css'
import { useEffect, useState } from 'react'

const Card = ({ title, starPlayers }) => {
  const [count, setCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
      console.log(`${title} has been liked: ${hasLiked}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasLiked]);

  // effect to log whenever the component is rendered
  useEffect(() => {
    console.log('CARD RENDERED')
  }, []);

  return (
    <div className='card' onClick={() => {setCount(count + 1)}}>
      <h3>{title} {count || null}</h3>
      <h4>Star players</h4>
      <h5>{starPlayers[0]}</h5>
      <h5>{starPlayers[1]}</h5>
      <h5>{starPlayers[2]}</h5>

      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? '❤️' : '🩶'}
      </button>
    </div>
  )
}

const App = () => {
  

  return (
    <>
      <h2>FootyLog</h2>
      
      <div className='card-container'>
        <Card title="Arsenal" starPlayers={['Saka', 'Rice', 'Odegaard']}/>
        <Card title="PSG" starPlayers={['Doue', 'Dembele', 'Kvara']}/>
        <Card title="Barca" starPlayers={['Lamal', 'Pedri', 'Raphina']}/>
      </div>
    </>
  )
}

export default App

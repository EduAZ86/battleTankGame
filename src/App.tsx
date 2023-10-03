
import styles from './App.module.css'
import Canvas from './components/Canvas'
import Header from './components/Header'

function App() {


  return (
    <div className={styles.container}>
      <Header/>
      <Canvas/>
    </div>
  )
}

export default App

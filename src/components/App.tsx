import { useEffect, useState } from 'react'
import styles from './modules/App.module.css'

function App() {
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)
    
    const [sum, setSum] = useState<number>(x + y)

    useEffect(() => {
        setSum(x + y)
    }, [x, y])

    return (
        <div>
            <div>
                <input className={styles.Input} type="number" value={x} onChange={(event) => {setX(Number(event.target.value))}} />
                <input className={styles.Input} type="number" value={y} onChange={(event) => {setY(Number(event.target.value))}} />
            </div>
            <div>
                <input className={styles.Input} type="number" value={sum} disabled />
            </div>
        </div>
    )
}

export default App

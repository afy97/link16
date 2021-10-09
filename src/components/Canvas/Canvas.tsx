import { Grid } from '@material-ui/core'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment } from '../../redux/features/ringReducer'
import { RootState } from '../../redux/store'
import { Ring } from '../Link16'
import styles from './Canvas.module.css'

const GridCanvas = () => {
    const index    = useSelector((state: RootState) => state.ring.index)
    const dispatch = useDispatch()

    const camRef = useRef<THREE.PerspectiveCamera>()

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(increment())
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, [index, dispatch])

    return (
        <Grid className={styles.Container} container>
            <Grid item xs={12}>
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />

                    <Ring split={32} index={index} />

                    <PerspectiveCamera ref={camRef} position={[0, 10, 20]} rotation={[-(Math.PI / 16), 0, 0]} makeDefault />
                    <OrbitControls camera={camRef.current} />
                </Canvas>
            </Grid>
        </Grid>
    )
}

export default GridCanvas

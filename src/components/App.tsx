import { Grid } from '@material-ui/core'
import { animated, AnimatedProps, useSpring } from '@react-spring/three'
import { OrthographicCamera } from '@react-three/drei'
import { Canvas, ThreeEvent, Vector3 } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { useWheel } from "react-use-gesture"
import styles from './modules/App.module.css'


function Disk(props: AnimatedProps<JSX.IntrinsicElements['mesh']>) {
    const ref = useRef<THREE.Mesh>(null!)

    const [hovered,  setHover]    = useState(false)

    const { scale } = useSpring({ scale: hovered ? 1.1 : 1 })

    const handleHover = (event: ThreeEvent<PointerEvent>, state: boolean) => {
        event.stopPropagation()
        setHover(state)
    }

    return (
        <animated.mesh
            {...props}
            ref={ref}
            scale={scale}
            onPointerOver={(event) => handleHover(event, true)}
            onPointerOut={(event) => handleHover(event, false)}>
            <cylinderGeometry args={[8, 8, 1, 64]} />
            <meshStandardMaterial color={hovered ? 'gray' : 'dimgray'} />
        </animated.mesh>
    )
}

function App() {
    let last  = 0

    const positions = Array<number>(6).fill(0).map(value => {
        value += last;
        last  -= 2.5
        return value
    })

    const [offset, setOffset] = useState<Vector3>([0, 0, 0])

    const { position } = useSpring({ position: offset, config: { bounce: 1, damping: 0.1 } })

    const bind = useWheel(({ delta }) => {
        const [x, y, z] = offset as number[]
        setOffset([x, y + (delta[1] / 100), z])
    })

    return (
        <Grid className={styles.Container} container>
            <Grid item xs={12} {...bind()}>
                <Canvas>
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />

                    <animated.group position={position as any as Vector3}>
                        {positions.map((value, index) => (
                            <Disk key={index} position={[0, value, -10]} rotation={[0, 0, 0]} />
                        ))}
                    </animated.group>

                    <OrthographicCamera rotation={[(-Math.PI / 16) , 0, 0]} zoom={64} makeDefault />
                </Canvas>
            </Grid>
        </Grid>
    )
}

export default App

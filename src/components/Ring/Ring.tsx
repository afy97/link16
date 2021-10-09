import { animated, AnimatedProps, useSpring } from "@react-spring/three"
import { Euler } from "@react-three/fiber"
import Slice from "../Slice/Slice"

interface RingProps {
    split: number,
    index: number
}

const Ring = (props: (AnimatedProps<JSX.IntrinsicElements['group']> & RingProps)) => {
    const tetha  = (Math.PI * 2) / props.split
    const radius = 1 / Math.atan(tetha / 2.01)

    let last = 0

    const rots   = (new Array<number>(props.split)).fill(0).map(() => (last += (tetha)))
    const splits = rots.map((angle) => ({ angle, color: "white", opacity: 1 }))
    
    const [{ rotation }] = useSpring(() => ({
        rotation: [0, -(props.index * tetha), 0]
    }), [props.index])

    return (
        <animated.group rotation={rotation as any as Euler}>
            {splits.map((props, index) => (
                <Slice key={index} radius={radius} color={props.color} opacity={props.opacity} rotation={[0, props.angle, 0]} />
            ))}
        </animated.group>
    )
}

export default Ring

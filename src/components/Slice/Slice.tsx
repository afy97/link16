import { animated, AnimatedProps } from "@react-spring/three"

interface SliceProps {
    color: string,
    opacity: number,
    radius: number,
}

const Slice = (props: (AnimatedProps<JSX.IntrinsicElements['mesh']> & SliceProps)) => {
    const sliceVerticies = new Float32Array([
        // Front bottom right
        -1.0, -1.0, props.radius,
         1.0, -1.0, props.radius,
         1.0,  1.0, props.radius,
        
        // Front top left
         1.0,  1.0, props.radius,
        -1.0,  1.0, props.radius,
        -1.0, -1.0, props.radius,
        
        // Top
        -1.0,  1.0, props.radius,
         1.0,  1.0, props.radius,
         0.0,  1.0, 0.0,
        
        // Bottom
         1.0, -1.0, props.radius,
        -1.0, -1.0, props.radius,
         0.0, -1.0, 0.0,
    ])

    return (
        <animated.mesh {...props}>
            <bufferGeometry attach="geometry">
                <bufferAttribute attachObject={['attributes', 'position']} count={sliceVerticies.length / 3} array={sliceVerticies} itemSize={3} />
            </bufferGeometry>
            <meshBasicMaterial color={props.color} opacity={props.opacity} />
        </animated.mesh>
    )
}

export default Slice

import React,{useRef, useEffect} from 'react'
import { Map_class } from '../../class/map.class';
import DrawBG from '../../utils/DrawBG';
import { Tank_class } from '../../class/tank.class';

const Canvas:React.FC = () => {
    const width_canvas = 600
    const height_canvas = 600
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const newMap = new Map_class( width_canvas, height_canvas)
    const tank = new Tank_class(width_canvas/2, height_canvas/2, 10, 10)

    
    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext('2d')
            if (ctx) {
                
                const intervalID = setInterval(()=>{
                    DrawBG(ctx, newMap)
                    
                    tank.draw(ctx)
                }, 10)
                return () => {
                clearInterval(intervalID)
              }
            }
        }      
    }, [])
    
    return(
        <>
            <canvas
                ref={canvasRef}
                width={width_canvas}
                height={height_canvas}
            >
            </canvas>
        </>
    )
}

export default Canvas
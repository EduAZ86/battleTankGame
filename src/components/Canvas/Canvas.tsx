import React,{useRef, useEffect} from 'react'
import { Map_class } from '../../class/map.class';
import DrawBG from '../../utils/DrawBG';
import { Tank_class } from '../../class/tank.class';
import { handleCrossKeyboard } from '../../utils/EventKeyboard';
import imageTank from '../../assets/tank.png'

const Canvas:React.FC = () => {
    const width_canvas = 600
    const height_canvas = 600
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const newMap = new Map_class( width_canvas, height_canvas, 4, 4)
    const tank = new Tank_class(width_canvas/2, height_canvas/2, 30, 30,imageTank)
    const keys = handleCrossKeyboard()
    
    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext('2d')
            if (ctx) {
                
                const intervalID = setInterval(()=>{
                    newMap.draw(ctx)
                    tank.move(keys, width_canvas, height_canvas)         
                    tank.draw(ctx)
                }, 30)
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
import React,{useRef, useEffect} from 'react'
const Canvas:React.FC = () => {
    const width_canvas = 600
    const height_canvas = 600

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext('2d')
            if (ctx) {
                
                const intervalID = setInterval(()=>{
        
                }, 1000)
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
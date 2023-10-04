import { Map_class } from "../class/map.class";

const DrawBG = (ctx:CanvasRenderingContext2D, map:Map_class) => {
    for (let i = 0; i < map.matrix.length; i++) {
      for (let j = 0; j < map.matrix[0].length; j++) {
        ctx.fillStyle = map.matrix[i][j].void? '#B2533E' : '#445D48'
        ctx.fillRect( 
          map.matrix[i][j].possition.x,
          map.matrix[i][j].possition.y,
          map.matrix[i][j].dimension.width,
          map.matrix[i][j].dimension.height,
          )
      }      
    }    
}

export default DrawBG
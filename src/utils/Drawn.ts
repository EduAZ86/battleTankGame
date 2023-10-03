import { Map_class } from "../class/map.class";

const Draw = (ctx:any, map:Map_class) => {
    for (let i = 0; i < map.matrix.length; i++) {
      for (let j = 0; j < map.matrix[0].length; j++) {
        ctx.fillStyle = (map.matrix[i][j].void? 'white' : 'black')
        ctx.fillRect(map.matrix[i][j].possition_x,map.matrix[i][j].possition_y,map.matrix[i][j].height,map.matrix[i][j].width)
      }      
    }    
}

export default Draw
import { Cell_class } from "./cell.class";

export class Map_class {
    width:number;
    height:number;
    matrix:Cell_class[][]
    cell_dimension:{
        width:number
        height:number
    }
    constructor(width:number, height:number, width_cell:number, height_cell:number){
        this.width = width;
        this.height = height;
        this.cell_dimension = {width:width_cell, height:height_cell}
        this.matrix = this.matrixGenerator()
    }
    private matrixGenerator(){
        const matrixCell = []
        for (let i = 0; i < this.width; i += this.cell_dimension.width) {
            const array_j = []
            for (let j = 0; j < this.height; j += this.cell_dimension.height) {
              const currentCell = new Cell_class(i,j,this.cell_dimension.width,this.cell_dimension.height)
              currentCell.isVoid(Math.round(Math.random())===0)
              array_j.push(currentCell)
            }
            matrixCell.push(array_j)
        }
        return matrixCell
    }
    public draw(ctx:CanvasRenderingContext2D){
            for (let i = 0; i < this.matrix.length; i++) {
              for (let j = 0; j < this.matrix[0].length; j++) {
                ctx.fillStyle = this.matrix[i][j].void? '#4e3b31' : '#8b8c7a'
                ctx.fillRect( 
                  this.matrix[i][j].possition.x,
                  this.matrix[i][j].possition.y,
                  this.matrix[i][j].dimension.width,
                  this.matrix[i][j].dimension.height,
                  )
              }      
            }    
        }
    
}
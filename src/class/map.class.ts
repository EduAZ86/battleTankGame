import { Cell_class } from "./cell.class";

export class Map_class {
    width:number;
    height:number;
    matrix:Cell_class[][]
    
    constructor(width:number, height:number){
        this.width = width;
        this.height = height;
        this.matrix = this.matrixGenerator()
    }
    private matrixGenerator(){
        const matrixCell = []
        for (let i = 0; i < this.width; i += 4) {
            const array_j = []
            for (let j = 0; j < this.height; j += 4) {
              const currentCell = new Cell_class(i,j,4,4)
              currentCell.isVoid(Math.round(Math.random())===0)
              array_j.push(currentCell)
            }
            matrixCell.push(array_j)
        }
        return matrixCell
    }
}
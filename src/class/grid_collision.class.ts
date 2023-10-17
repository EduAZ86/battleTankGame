import { cell_colission_class } from "./cell_colission.class";

export class GridColission_class {
    grid_size:{
        width:number;
        height:number;
    };
    cell_size:{
        width:number;
        height:number;
    };
    cells:cell_colission_class[][]
    constructor(grid_size:{width:number,height:number}, cell_size:{width:number,height:number}){
        this.grid_size = grid_size
        this.cell_size = cell_size
        this.cells = this.cell_inizialite()
    }
    private cell_inizialite(){     
        const matrix_cells =[]
        for (let i = 0; i < this.grid_size.width ; i += this.cell_size.width) {
            const array_j = [];
            for (let j = 0; j < this.grid_size.height; j=this.cell_size.height) {
                const cell = new cell_colission_class({x:i,y:j})
                array_j.push(cell)                
            }
            matrix_cells.push(array_j)            
        }
        return matrix_cells
    }
    public incert_object(size:{width:number,height:number}, possition:{x:number, y:number}, objectID:string) {
        for (let i = possition.x; i < size.width ; i += this.cell_size.width) {            
            for (let j = possition.y; j < size.height; j += this.cell_size.height) {
                this.cells[i][j].content.push(objectID);
            }
                       
        }
}
    public remove_object(objectID:string) {
        for (let i = 0; i < this.grid_size.width ; i += this.cell_size.width) {            
            for (let j = 0; j < this.grid_size.height; j += this.cell_size.height) {
                if (this.cells[i][j].content.includes(objectID)) {
                    const updateContent = this.cells[i][j].content.filter(item => item !== objectID)
                    this.cells[i][j].content = updateContent;
                }                
            }                       
        }
    };
    private get_object_in_cell(possition:{x:number, y:number}){
        return this.cells[possition.x][possition.y].content;
    };
    private get_object_in_neighbor_cell(possition:{x:number, y:number}){
        const arrayNeighbor:string[] = [];
        const dx = [-1, 0, 1, -1, 1, -1, 0, 1];
        const dy = [-1, -1, -1, 0, 0, 1, 1, 1];
        for (let i = 0; i < dx.length; i++) {
            const neighborX = possition.x + dx[i];
            const neighborY = possition.y + dy[i];
            if (neighborX >= 0 && neighborX < this.grid_size.width && neighborY >= 0 && neighborY < this.grid_size.height) {
                const objectsInNeighborCell = this.get_object_in_cell({x:neighborX,y:neighborY});
                arrayNeighbor.concat(objectsInNeighborCell);
            }
        }
        return arrayNeighbor
    };
    public checkCollisions(objectID:string, possition:{x:number, y:number}){
        if (this.get_object_in_cell({x:possition.x, y:possition.y}).length > 0 && !this.get_object_in_cell({x:possition.x, y:possition.y}).includes(objectID) 
        ||
        this.get_object_in_cell({x:possition.x, y:possition.y}).length > 0 && !this.get_object_in_neighbor_cell({x:possition.x, y:possition.y}).includes(objectID)) {
            return true
        } else{
            return false
        }
    };
    public clear(){
        for (let i = 0; i < this.grid_size.width ; i += this.cell_size.width) {            
            for (let j = 0; j < this.grid_size.height; j += this.cell_size.height) {
                this.cells[i][j].content = [];
                this.cells[i][j].is_occupied = false;
            }                       
        }
    }
}
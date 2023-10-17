class GridColission_class {
    grid_size:{
        width:number;
        height:number;
    };
    cell_size:{
        width:number;
        height:number;
    };
    cells:object[][]
    constructor(grid_size:{width:number,height:number}, cell_size:{width:number,height:number}){
        this.grid_size = grid_size
        this.cell_size = cell_size
        this.cells = this.cell_inizialite()
    }
    private cell_inizialite(){
        const cell_grid = {}
        const matrix_cells =[]
        for (let i = 0; i < this.grid_size.width ; i += this.cell_size.width) {
            const array_j = [];
            for (let j = 0; j < this.grid_size.height; j=this.cell_size.height) {
                array_j.push(cell_grid)                
            }
            matrix_cells.push(array_j)            
        }
        return matrix_cells
    }
}
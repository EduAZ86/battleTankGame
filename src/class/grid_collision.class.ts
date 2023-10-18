import { cell_colission_class } from "./cell_colission.class";
import { colission_class } from "./collision.class";
interface object_type{
    objectID:string;
        type:string
        position:{
            x:number;
            y:number;
        };
        size:{
            width:number;
            height:number;
        };
}

export class GridColission_class {
    grid_size:{
        width:number;
        height:number;
    };
    cell_size:{
        width:number;
        height:number;
    };
    cells:cell_colission_class[][];
    objects:object_type[] = [];

    constructor(grid_size:{width:number,height:number}, cell_size:{width:number,height:number}){
        this.grid_size = grid_size
        this.cell_size = cell_size
        this.cells = this.cell_inizialite()
    };
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
    public incert_object(size:{width:number,height:number}, position:{x:number, y:number}, objectID:string, type:string) {
        if ((position.x+size.width) < this.grid_size.width && (position.y + size.width < this.grid_size.height) ) {
            for (let i = position.x; i < size.width ; i += this.cell_size.width) {            
                for (let j = position.y; j < size.height; j += this.cell_size.height) {
                    this.cells[i][j].content.push(objectID);
                }                           
            }
            const newObject = {
                objectID:objectID,
                type:type,
                position:{
                    x:position.x,
                    y:position.y
                },
                size:{
                    width:size.width,
                    height:size.height
                }
            };
            this.objects.push(newObject);        
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
        const updateObjects = this.objects.filter((object) => object.objectID === objectID)
        this.objects = updateObjects
    };
    public collisions_in_object(objectID:string){
        const currentObject = this.objects.find((obj) => obj.objectID === objectID)
        const colisions:colission_class[] = []
        if (currentObject) {
            for (let i = currentObject.position.x; i < currentObject.size.width; i += this.cell_size.width) {
                for (let j = currentObject.position.y; j < currentObject.size.height; j += this.cell_size.height) {
                    if (this.cells[i][j].content.length > 0) {
                        const newCollision = new colission_class('object',this.cells[i][j].content,{x:i, y:j})
                        colisions.push(newCollision)
                    }
                }
            }
            return colisions            
        }
    };
    public get_object_in_neighbor_cell(objectID:string){
        const currentObject = this.objects.find((obj) => obj.objectID === objectID)
        const colisions:colission_class[] = []
        if (currentObject) {
            const topNeighbor = currentObject.position.y - 1 ;
            const bottomNeighbor = currentObject.position.y + currentObject.size.height + 1;
            const leftNeighbor = currentObject.position.x - 1;
            const rightNeihgbor = currentObject.position.x + currentObject.size.width + 1;
    
            for (let i = currentObject.position.x; i < currentObject.size.width; i += this.cell_size.width) {
                //top neighbors
                if (this.cells[i][topNeighbor].content.length > 0) {
                    const newCollision = new colission_class('object',this.cells[i][topNeighbor].content,{x:i, y:topNeighbor})
                    colisions.push(newCollision)
                }
                //bottom neighbors
                if (this.cells[i][bottomNeighbor].content.length > 0) {
                    const newCollision = new colission_class('object',this.cells[i][bottomNeighbor].content,{x:i, y:currentObject.position.y - 1})
                    colisions.push(newCollision)
                }
            }
            for (let j = currentObject.position.y; j < currentObject.size.width; j += this.cell_size.width) {
                //left neighbors
                if (this.cells[leftNeighbor][j].content.length > 0) {
                    const newCollision = new colission_class('object',this.cells[leftNeighbor][j].content,{x:leftNeighbor, y:j})
                    colisions.push(newCollision)
                }
                //right neighbors
                if (this.cells[rightNeihgbor][j].content.length > 0) {
                    const newCollision = new colission_class('object',this.cells[rightNeihgbor][j].content,{x:rightNeihgbor, y:j})
                    colisions.push(newCollision)
                }
            }            
        }
        return colisions
    };
    public checkCollisions(objectID:string){
        const currentObject = this.objects.find((obj) => obj.objectID === objectID)
        if (currentObject) {
            const colission = {
                isColission: false,
                type:'',
                colissions:[''],
                position:{
                    x:currentObject.position.x,
                    y:currentObject.position.y
                }
            }           
            // check collisions borders
            if (currentObject.position.x < 0) {
                colission.isColission = true
                colission.type = 'border'
                colission.colissions = ['left']
            }
            if (currentObject.position.x > (this.grid_size.width - currentObject.size.width) ) {
                colission.isColission = true
                colission.type = 'border'
                colission.colissions = ['right']
            }
            if (currentObject.position.y < 0) {
                colission.isColission = true
                colission.type = 'border'
                colission.colissions = ['top']
            }
            if (currentObject.position.y > (this.grid_size.height - currentObject.size.height)) {
                colission.isColission = true
                colission.type = 'border'
                colission.colissions = ['bottom']
            }
        }
    }        

    public clear(){
        for (let i = 0; i < this.grid_size.width ; i += this.cell_size.width) {            
            for (let j = 0; j < this.grid_size.height; j += this.cell_size.height) {
                this.cells[i][j].content = [];
                this.cells[i][j].is_occupied = false;
            }                       
        };
        this.objects = []
    }
}
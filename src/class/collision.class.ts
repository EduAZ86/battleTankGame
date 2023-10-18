export class colission_class {
    type:string
    collisions:string[]
    position:{
    x:number
    y:number
}
    constructor(type:string, collision:string[], possition:{x:number, y:number}){
        this.type = type;
        this.collisions = collision;
        this.position = possition
    }
    
} 

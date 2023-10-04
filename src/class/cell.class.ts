
export class Cell_class {
    possition:{
        x:number,
        y:number
    }
    dimension:{
        height:number;
        width:number;
    }
   
    void:boolean = false

    constructor(possition_x:number, possition_y:number, width:number, height:number){
        this.possition = {x: possition_x, y: possition_y}
        this.dimension = { height, width}
    }
    public isVoid(isVoid:boolean) {
        this.void = isVoid
    }
}
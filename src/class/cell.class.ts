
export class Cell_class {
    possition_x:number;
    height:number;
    width:number;
    possition_y:number;
    void:boolean = false

    constructor(possition_x:number, possition_y:number, width:number, height:number){
        this.possition_x = possition_x
        this.possition_y = possition_y
        this.height = height
        this.width = width
    }
    public isVoid(isVoid:boolean) {
        this.void = isVoid
    }
}
export class cell_colission_class{
    content:string[] = [];
    position:{
        x:number;
        y:number;
    };
    is_occupied:boolean = false;   

    constructor(possition:{x:number, y:number}){
        this.position = possition;
    }
}
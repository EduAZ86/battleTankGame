export class cell_colission_class{
    content:string[] = [];
    possition:{
        x:number;
        y:number;
    };
    is_occupied:boolean = false;   

    constructor(possition:{x:number, y:number}){
        this.possition = possition;
    }
}
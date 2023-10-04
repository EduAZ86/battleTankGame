export class Tank_class {
    possition:{
        x:number
        y:number
    }
    dimension:{
        width:number;
        height:number;       
    }
    velocity:{
        x:number
        y:number
    }
    friction:number = 0.9

    constructor (
        initial_possition_x: number,
        initial_possition_y: number,
        width:number,
        height:number
    ){
        this.possition = {x:initial_possition_x, y:initial_possition_y}
        this.dimension = { width, height}
        this.velocity = {x:0, y:0}     

    }
    public draw (ctx:CanvasRenderingContext2D){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.possition.x, this.possition.y, this.dimension.width, this.dimension.height)
    }
    public update () {

    }
}
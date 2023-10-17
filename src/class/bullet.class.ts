
export class Bullet_class {
    possition:{
        x:number
        y:number
    }
    velocity_module:number = 15
    vector_velocity:{
        x:number
        y:number
    }
    width_map:number
    height_map:number

    constructor(possition_x:number, possition_y:number, angle_rad:number, width_map:number, height_map:number){
        this.vector_velocity = {x: this.velocity_module * Math.sin(-angle_rad), y: this.velocity_module * Math.cos(angle_rad)}
        this.possition = {x:possition_x, y:possition_y}
        this.width_map = width_map
        this.height_map = height_map    
    }
    public move(){
        this.possition.x -= this.vector_velocity.x;
        this.possition.y -= this.vector_velocity.y;
        if (
            this.possition.x < 0 ||
            this.possition.x > this.width_map ||
            this.possition.y < 0 ||
            this.possition.y > this.height_map
        ){
            return
        } 
    }
    public draw(ctx: CanvasRenderingContext2D){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.possition.x, this.possition.y, 2, 2)
    }
}
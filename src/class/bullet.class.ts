import { v4 as uuidv4 } from 'uuid';
export class Bullet_class {
    ID:string = uuidv4()
    shotting_date:number;
    possition:{
        x:number;
        y:number;
    };
    size:{
        width:number;
        height:number;
    };
    velocity_module:number = 15;
    vector_velocity:{
        x:number;
        y:number;
    };

    constructor(possition_x:number, possition_y:number, angle_rad:number){
        this.vector_velocity = {x: this.velocity_module * Math.sin(-angle_rad), y: this.velocity_module * Math.cos(angle_rad)}
        this.possition = {x:possition_x, y:possition_y};
        this.shotting_date = Date.now();
        this.size = {width:2, height:2}  
    }
    public move(){
        this.possition.x -= this.vector_velocity.x;
        this.possition.y -= this.vector_velocity.y; 
    }
    public draw(ctx: CanvasRenderingContext2D){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.possition.x, this.possition.y, this.size.width, this.size.height);
    }
}
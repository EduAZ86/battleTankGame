
export class smoke_particle{
    possittion:{
        x:number
        y:number
    }
    velocity:{
        x:number
        y:number
    }
    opacity:number = 1
    color:string = '#8714fb'
    radius:number
    shape:string
    constructor(possition_x:number, possition_y:number, color:string, shape:string){
        this.possittion = {x:possition_x, y:possition_y}
        this.color = color
        this.radius = Math.random()*2
        this.velocity = {
            x:(Math.random() - 0.5)*2,
            y:(Math.random() - 0.5)*2
        }
        this.shape = shape
    }
    public draw(ctx:CanvasRenderingContext2D){
        this.possittion.x += this.velocity.x
        this.possittion.y += this.velocity.y
        this.opacity -= 0.05

        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.opacity <= 0? 'transparent' :this.color
        if (this.shape === 'circle' || this.velocity.x > 3) {
            ctx.beginPath()
            ctx.arc(this.possittion.x, this.possittion.y, this.radius, 0, Math.PI*2)
            ctx.fill()
            ctx.closePath()
        } else {
            ctx.fillRect(this.possittion.x, this.possittion.y, this.radius, this.radius)
        }
        ctx.restore()
     }
}
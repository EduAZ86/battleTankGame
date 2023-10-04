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
    image: HTMLImageElement
    constructor (
        initial_possition_x: number,
        initial_possition_y: number,
        width:number,
        height:number,
        url_image:string
    ){
        this.possition = {x:initial_possition_x, y:initial_possition_y}
        this.dimension = { width, height}
        this.velocity = {x:0, y:0}     
        this.image = new Image()
        this.image.src = url_image        
    }
    private colisionBorders (width_map:number,height_map:number) {
        if (this.possition.x < 0) {
           this.possition.x = 0
           this.velocity.x = 0     
        }
        if (this.possition.x > (width_map - this.dimension.width) ) {
           this.possition.x = (width_map - this.dimension.width)
           this.velocity.x = 0
        }
        if (this.possition.y < 0) {
           this.possition.y = 0
           this.velocity.y = 0     
        }
        if (this.possition.y > (height_map - this.dimension.height)) {
           this.possition.y = (height_map - this.dimension.height)
           this.velocity.y = 0
        }
    }
    public move (KEYS: { [key: string]: boolean }, width_map:number, height_map:number) {
        if (KEYS['ArrowLeft']) {
            this.velocity.x--
        } else if (KEYS['ArrowRight']){
            this.velocity.x++
        }
        if (KEYS['ArrowUp']){
            this.velocity.y--
        } else if (KEYS['ArrowDown']) {
            this.velocity.y++
        }
        this.possition.y += this.velocity.y
        this.velocity.y *= this.friction
        this.possition.x += this.velocity.x
        this.velocity.x *= this.friction
        this.colisionBorders(width_map,height_map)
    }
    public draw (ctx:CanvasRenderingContext2D, KEYS: { [key: string]: boolean }){
        if (this.image) {
           ctx.save()
           if (KEYS['ArrowLeft']) {
                ctx.translate(this.possition.x + this.dimension.width/2, this.possition.y + this.dimension.height/2)
                ctx.rotate(-Math.PI/2)
                ctx.translate(-this.possition.x - this.dimension.width/2, -this.possition.y - this.dimension.height/2)
           }
           if (KEYS['ArrowRight']) {
                ctx.translate(this.possition.x + this.dimension.width/2, this.possition.y + this.dimension.height/2)
                ctx.rotate(Math.PI/2)
                ctx.translate(-this.possition.x - this.dimension.width/2, -this.possition.y - this.dimension.height/2)
           }
           if (KEYS['ArrowDown']) {
                ctx.translate(this.possition.x + this.dimension.width/2, this.possition.y + this.dimension.height/2)
                ctx.rotate(Math.PI)
                ctx.translate(-this.possition.x - this.dimension.width/2, -this.possition.y - this.dimension.height/2)
           }
           ctx.drawImage(this.image, this.possition.x, this.possition.y, this.dimension.width, this.dimension.height)
           ctx.restore()
        }
        
    }
    public update () {

    }
}
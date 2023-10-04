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
    vector_direction:{
        x:number
        y:number
    }
    module_vector:number = 0.5
    acceleration:number = 0.5   
    rotation:number = 0
    speed_rotation:number = Math.PI/20
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
        this.vector_direction = {x:this.module_vector*Math.sin(this.rotation), y:this.module_vector*Math.cos(this.rotation)}     
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

    public rotate(KEYS: { [key: string]: boolean }) {
            if (KEYS['ArrowLeft']) {
                this.rotation -= this.speed_rotation
            } else if (KEYS['ArrowRight']){
                this.rotation += this.speed_rotation
            }
            this.vector_direction = {x:this.module_vector*Math.sin(this.rotation), y:this.module_vector*Math.cos(this.rotation)} 
    }
    public move (KEYS: { [key: string]: boolean }, width_map:number, height_map:number) {
        if (KEYS['ArrowUp']){
            this.velocity.y -= this.vector_direction.y 
            this.velocity.x += this.vector_direction.x      


        } else if (KEYS['ArrowDown']) {
            this.velocity.y += this.vector_direction.y
            this.velocity.x -= this.vector_direction.x          
        }

        this.possition.y += this.velocity.y
        this.velocity.y *= this.friction
        this.possition.x += this.velocity.x
        this.velocity.x *= this.friction
        this.rotate(KEYS)
        this.colisionBorders(width_map,height_map)
    }
    public draw (ctx:CanvasRenderingContext2D){
        if (this.image) {
           ctx.save()
           ctx.translate(this.possition.x + this.dimension.width/2, this.possition.y + this.dimension.height/2)
           ctx.rotate(this.rotation)
           ctx.translate(-this.possition.x - this.dimension.width/2, -this.possition.y - this.dimension.height/2)
           ctx.drawImage(this.image, this.possition.x, this.possition.y, this.dimension.width, this.dimension.height)
           ctx.restore()
        }
        
    }
    public update () {

    }
}
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
    acceleration:number = 0.5
    rotation:number = 0
    rotation_speed: number = Math.PI/4
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
    private rotate (KEYS: { [key: string]: boolean }) {
        if ((KEYS['ArrowLeft'])) {
                if (this.rotation > Math.PI) {
                        this.rotation += this.rotation_speed
                }
                if (this.rotation > -Math.PI/2) {
                        this.rotation -= this.rotation_speed
                }
                if (this.rotation < -Math.PI/2) {
                        this.rotation += this.rotation_speed
                }
        }
        if ((KEYS['ArrowRight'])) {
                if (this.rotation < Math.PI/2) {
                        this.rotation += this.rotation_speed
                }
                
                if (this.rotation > Math.PI/2) {
                        this.rotation -= this.rotation_speed
                }
        }
        if ((KEYS['ArrowDown'])) {
                if (this.rotation < Math.PI) {
                        this.rotation += this.rotation_speed
                }
                if (this.rotation > Math.PI) {
                        this.rotation -= this.rotation_speed
                }
        }
        if ((KEYS['ArrowUp'])) {
                if (this.rotation < 0) {
                        this.rotation += this.rotation_speed
                     }
                if (this.rotation > 0) {
                        this.rotation -= this.rotation_speed
                }
        }
    }
    public move (KEYS: { [key: string]: boolean }, width_map:number, height_map:number) {
        if (KEYS['ArrowLeft']) {
            this.velocity.x -= this.acceleration     
        } else if (KEYS['ArrowRight']){
            this.velocity.x += this.acceleration      
        }
        if (KEYS['ArrowUp']){
            this.velocity.y -= this.acceleration 

        } else if (KEYS['ArrowDown']) {
            this.velocity.y += this.acceleration
      
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
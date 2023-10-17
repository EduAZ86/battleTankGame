import { Bullet_class } from "./bullet.class";
import { smoke_particle } from "./smokeParticles.class";

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
    width_map:number
    height_map:number
    bullets:Bullet_class[]
    particles_smoke:smoke_particle[]
    lastShotTime:number = 0
    shootCooldown:number = 100
    constructor (
        initial_possition_x: number,
        initial_possition_y: number,
        width:number,
        height:number,
        url_image:string,
        width_map:number,
        height_map:number
        
    ){
        this.possition = {x:initial_possition_x, y:initial_possition_y}
        this.dimension = { width, height}
        this.vector_direction = {x:this.module_vector*Math.sin(this.rotation), y:this.module_vector*Math.cos(this.rotation)}     
        this.velocity = {x:0, y:0}     
        this.image = new Image()
        this.image.src = url_image
        this.width_map = width_map
        this.height_map = height_map
        this.bullets = []
        this.particles_smoke=[]
         
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

    private rotate(KEYS: { [key: string]: boolean }) {
            if (KEYS['ArrowLeft']) {
                this.rotation -= this.speed_rotation
            } else if (KEYS['ArrowRight']){
                this.rotation += this.speed_rotation
            }
            this.vector_direction = {x:this.module_vector*Math.sin(this.rotation), y:this.module_vector*Math.cos(this.rotation)} 
    }
    private move (KEYS: { [key: string]: boolean }, width_map:number, height_map:number) {
        if (KEYS['ArrowUp']){
            this.velocity.y -= this.vector_direction.y 
            this.velocity.x += this.vector_direction.x      

            const smoke_L = new smoke_particle(this.possition.x+this.dimension.width, this.possition.y+this.dimension.height/2, '#5F264A','circle')
            const smoke_R = new smoke_particle(this.possition.x, this.possition.y+this.dimension.height/2, '#5F264A','circle')
            this.particles_smoke.push(smoke_R)      
            this.particles_smoke.push(smoke_L)

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
    private shot( KEYS:{ [key: string]: boolean }){      
        const currentTime = Date.now()
        const canon_possition_x = this.possition.x + this.dimension.width/2
        const canon_possition_y = this.possition.y + this.dimension.height/2
        if(KEYS[' '] && ((currentTime + this.lastShotTime) >= this.shootCooldown)){                
                const newShot = new Bullet_class(canon_possition_x,canon_possition_y, this.rotation, this.width_map, this.height_map )
                this.bullets.push(newShot)
        }        
        this.lastShotTime = currentTime
    }
    private draw (ctx:CanvasRenderingContext2D){
        if (this.image) {
           ctx.save()
           ctx.translate(this.possition.x + this.dimension.width/2, this.possition.y + this.dimension.height/2)
           ctx.rotate(this.rotation)
           ctx.translate(-this.possition.x - this.dimension.width/2, -this.possition.y - this.dimension.height/2)
           ctx.drawImage(this.image, this.possition.x, this.possition.y, this.dimension.width, this.dimension.height)
           ctx.restore()
        }
        
    }
    public update (KEYS: { [key: string]: boolean }, width_map:number, height_map:number,ctx:CanvasRenderingContext2D) {
        this.move(KEYS, width_map, height_map)
        this.shot(KEYS)
        for (let i = 0; i < this.bullets.length; i++) {                
                const bullet = this.bullets[i];
                bullet.move();
                bullet.draw(ctx);
            }
        for (let j = 0; j < this.particles_smoke.length; j++) {
                const particle = this.particles_smoke[j]
                particle.draw(ctx)
        }
        this.draw(ctx)
    }
}
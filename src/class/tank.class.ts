interface TankParameters {
    possition_x:number;
    possition_y:number;
    whidth:number;
    height:number;
}

class Tank {
    possition_x:number;
    possition_y:number;
    whidth:number;
    height:number;
    constructor (params:TankParameters){
        this.possition_x = params.possition_x
        this.possition_y = params.possition_y
        this.whidth = params.whidth
        this.height = params.height
    }
    public move_left (){    
            this.possition_x--        
    }
    public move_right (){  
            this.possition_x++        
    }
    public move_top (){     
            this.possition_y--       
    }
    public move_bottom (){   
            this.possition_y++        
    }
}
class Planet {
    public static registry:Planet[] = [];
    radius: number;
    a: vec2;
    v: vec2;
    pos: vec2;
    m: number;
    path: vec2[];    
    selected:boolean;
    
    constructor(x:number, y:number, r:number, vx:number,vy:number){
        this.radius = r ;
        this.pos = [x,y];
        this.v = [vx,vy];
        this.a = [0,0]
        this.m = r*10**5 ;
        this.selected = false ;
        this.path = []
        
        Planet.registry.push(this)
    }

    F(){
        //if(!this.exist) return;
        let f = 0 ;
        let dir:vec2 = [0.1,0.1];
        for(let i = 0; i < Planet.registry.length; i++ ){
            let p = Planet.registry[i];
            if( p != this ){
                f += ( UGC * p.m )/(distPlanets(this,p)**2);
                dir = sum(dir,sum(this.pos,neg(p.pos)))
            }
        }

        this.a = norm(dir) == 0 ? this.a = this.a : smul(f/norm(dir),dir)
        //console.log(this.a);
        
    }

    draw(){
        //if(!this.exist) return;

        this.path.push(this.pos)

        /*if(this.pos[0]>=WIDTH){
            this.pos[0] -= WIDTH ;
        }

        if(this.pos[1]>=HEIGHT){
            this.pos[1] -= HEIGHT ;
        }

        if(this.pos[0]<=0){
            this.pos[0] += WIDTH ;
        }

        if(this.pos[1]<=0){
            this.pos[1] += HEIGHT ;
        }*/

        let [x,y] = sum(this.pos,neg(offset)) ;

        context.beginPath();
        context.fillStyle='#ffffff';
        context.arc(x, y, this.radius, 0, 2*Math.PI, false);
        context.fill();
        context.beginPath();
        context.strokeStyle='#000000';
        context.strokeText(Planet.registry.indexOf(this),x-1,y+5,5);
        

        if(showPath){
            context.beginPath();
            context.moveTo(this.path[0][0] - offset[0],this.path[0][1] - offset[1])
            for(let i = 1; i < this.path.length; i++ ){
                context.lineTo(this.path[i][0] - offset[0],this.path[i][1] - offset[1]);
            }
            context.strokeStyle='#0000ff';
            context.stroke();   
        }

        if( this.selected ){
            context.beginPath();
            context.rect(this.pos[0] - this.radius - offset[0], this.pos[1] - this.radius - offset[1], 2*this.radius, 2*this.radius);
            context.strokeStyle='#00f';
            context.stroke();
        }
    }
}


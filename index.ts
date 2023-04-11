const canvas = document.getElementById('game') as HTMLCanvasElement;
const context:any = canvas?.getContext('2d');

canvas.width = innerWidth ;
canvas.height = innerHeight ;

const WIDTH = canvas.width ;
const HEIGHT = canvas.height ;

const UGC = -6.674*(10**-5);

var pause = true ;
var showPath = true ;

var offset:vec2 = [0,0];

setup();

function setup(){
    context.fillRect(0,0,WIDTH,HEIGHT);

    let sun = new Planet(WIDTH/2,HEIGHT/2,50,0,0)
    let p1 = new Planet(WIDTH/2,HEIGHT/2-100,10,2.1,0)
    //let p2 = new Planet(WIDTH/2-150,HEIGHT/2,10,0,2)

    /*let p1 = new Planet(100,100,10,0,0);
    let p2 = new Planet(200,100,10,0,0);*/
    /*for(let i = 0; i < WIDTH/200;i++){
        for(let j = 0; j < HEIGHT/200;j++){
            let p = new Planet(i*200,j*200,1,Math.random()*5,Math.random()*5)
        }
    }*/

    canvas.addEventListener('click',(e)=>{
        let [x,y]:vec2 = [e.pageX,e.pageY]

        for(let p of Planet.registry){
            let [xl,yl] = sum([x,y] as vec2,neg(offset))
            if(dist(xl,yl,p.pos[0],p.pos[1]) < p.radius ){
                for(let q of Planet.registry ){
                    q.selected = false ;
                }
                p.selected = true ;
            }
        }
    })
    //list planets
    let ul = document.getElementsByTagName('ul')[0];

    for(let p of Planet.registry){
        let li = document.createElement('li');
        let check = document.createElement('input');
        check.type = 'checkbox'
        check.onchange = ((e)=>{
            console.log(e);
            
        })

        let btnDel = document.createElement('button');
        btnDel.addEventListener('click', ()=>{
            Planet.registry.splice( Planet.registry.indexOf(p), 1 )
            console.log(p);
            
        })
        btnDel.innerHTML = 'Delete'

        li.appendChild(check)
        li.innerHTML += 'Planet #' + Planet.registry.indexOf(p)
        li.appendChild(btnDel)

        ul.appendChild(li)
    }


    animate();
    
}

function animate(){
    if(!pause){
        requestAnimationFrame(animate);
    }
    

    canvas.width = WIDTH ;
    canvas.height = HEIGHT ;

    context.fillRect(0,0,WIDTH,HEIGHT);

    //calculate the position of planets

    for( let p of Planet.registry ){
        p.F();
        //if(colition) console.log('k',p);
        
        p.v = sum(p.v,p.a)
        p.pos = sum(p.pos,p.v) 
        
        context.translate(offset[0], offset[1]);   
        
    }
    //calculate the transision
    for(let p of Planet.registry){
        if(p.selected){
            offset = [WIDTH/2 - p.pos[0],HEIGHT/2 - p.pos[1]];
        }
        p.draw()
    }

    //colition detection
    for( let p1 of Planet.registry ){
        for( let p2 of Planet.registry ){
            if(p1 != p2 ){
                if(distPlanets(p1,p2) < p1.radius+p2.radius ){
                    Planet.registry.splice( Planet.registry.indexOf(p1),1);
                    Planet.registry.splice( Planet.registry.indexOf(p2),1);

                    let newPos:vec2 = p1.m > p2.m ? [p1.pos[0],p1.pos[1]] : [p2.pos[0],p2.pos[1]];
                    let newV = sum(p1.v,p2.v)
                    let p = new Planet(newPos[0],newPos[1],p1.radius+p2.radius,newV[0]/(p1.m+p2.m),newV[1]/(p1.m+p2.m))
                }
            }
        }
    }

}

function unigravPlanets(p1:Planet,p2:Planet ){
    return unigrav(p1.m,p2.m,distPlanets(p1,p2));
}

function unigrav(m1:number,m2:number,d:number){
    return (UGC*m1*m2)/(d**2)
}

function distPlanets(p1:Planet,p2:Planet):number{
    let [x1,y1] = p1.pos ;
    let [x2,y2] = p2.pos ;
    return dist(x1,y1,x2,y2);
}

function dist(x1:number,y1:number,x2:number,y2:number):number{
    return Math.sqrt( (x2 - x1 )**2 + (y2 - y1)**2);
}

function calculateV(planet:Planet):number[]{

    return ([
        0*Math.sqrt(UGC*(planet.m/(distPlanets(Planet.registry[0],planet))**2)*planet.pos[0] ) + planet.v[0],
        Math.sqrt(UGC*(planet.m/(distPlanets(Planet.registry[0],planet))**2)*planet.pos[1] ) + planet.v[1]
    ]);
    
}
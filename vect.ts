type vec2 = [number, number];

function sum(a:vec2,b:vec2):vec2 {
    return [a[0]+b[0],a[1]+b[1]];
}

function neg(a:vec2):vec2 {
    return [-a[0],-a[1]];
}

function mul(a:vec2,b:vec2):vec2 {
    return [a[0]*(b[0]+b[1]),a[1]*(b[0]+b[1])];
}

function smul(x:number,a:vec2):vec2 {
    return [x*a[0],x*a[1]];
}

function norm(a:vec2):number {
    return Math.sqrt(a[0]**2+a[1]**2)
}
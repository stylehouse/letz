export function realisme () {
    let A1 = C_('toplevel')
    A1.c.ip = [1]

    let A11 = A_(A,'glamphor')

    return [A1, A11]
}
// the baskets of properties that are C.y|c|sc
interface gc {
    [key: string]: any
}
interface C {
    t: string; // name of object class to apply to C
    y: gc; // properties derived from the underlying machine
    c: gc; // properties defining the base identity of C
    sc: gc; // properties representing the essential qualities of C
}
interface A extends C {
    y: {
        up?: A; // A this A was sprouted from
    }
    c: {
        ip: number[]; // IP address of variable length
        ips?: number[]; // how many children it has had
    }
}

// make new C, specifying innards
function C_(t: string|Array|C, y?:number|gh, c?:gh, sc?:gh):C {
    if (isar(t)) {
        [t,y,c,sc] = t
    }
    if (!isst(t)) {
        // t must be C, from C_(C)
        throw "TODO clone = C_(C)"
    }
    if (isnum(y)) {
        if (y <= 0)
            throw "y <= 0"
        while (y > 1)
            y /= 10
        y = {cv:y}
    }
    t ||= ''
    y ||= {}
    c ||= {}
    sc ||= {}
    return {t,y,c,sc}
}
function A_(A:A, t?:string):A {
    t ||= A.t
    let A2 = C_(t)
    // ip address (infinite position)
    A.c.ips ||= 0
    A.c.ips++
    A2.c.ip = [...A.c.ip,A.c.ips]
    // parent
    A2.y.up = A
    i_(A,A2)
    return A2
}
function i_(C1:C, C2:C) {
    C1.sc.z ||= []
    if (C1.sc.z.includes(C2)) {
        return
    }
    C1.sc.z.push(C2)
}

// type checking, ported from Fividy
function isst(s) {
    return typeof s == 'string'
}
function isnu(s) {
    return typeof s == 'number'
}
function isnum(s) {
    return (isnu(s) || s && s.length && !isspace(s)) && s*1 == s
}
function isar(s) {
    return s && s.constructor == Array
}
let spacechars = {" ":1,"\n":1,"\t":1}
function isspace(s) {
    return hak(s) && !havs(s).some(s => !spacechars[s])
}
// and further back
function hak(s,d) {
    if (!s)
        return 0
    return d == null ? Object.keys(s).length : s.hasOwnProperty(d)
}
function havs(s,d) {
    return haks(s).map(k => s [k])
}
function haks(s,d) {
    let N = [];
    if (!s) {
        return N
    }
    for (let k in s) {
        let v = s[k]
        if (d == 'kv') { N.push(k,v) }
        else
        if (d == 's') { N.push(v) }
        else {
            N.push(k);
        }
    }
    return N
}
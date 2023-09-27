# general functions
#  copied from from Planet|Ying|G/ive/Pictures
let self = {}
# < apparently you can't just do this and: import { me,ex } from "$lib/Y/Pic"
#export default self;
let me = self.me = {}

 // main
  // ex*()
    $ex = &sc{
        !s || typeof s != 'object' and throw "ex!s"
        !c || typeof c != 'object' and throw "ex!c"
        each kv c {
            s [k] = v
        }
        # ex(s,c+)
        arguments[2] && [...arguments].slice(2).map(c => ex(s,c))
        return s
    }

export {me,ex}
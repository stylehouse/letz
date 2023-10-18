import { syntaxTree } from "@codemirror/language"
import { EditorSelection } from "@codemirror/state"
import type { EditorState } from "@codemirror/state"

# codemirror integration layer

# and system for letters getting around doing science

# library of objects to support nested Components of:
#  git-like remote,
#   commits coming,
#  codemirror that can incorporate and rebase or not
  
#   this is the Inc+Pro+Run hierarchy again
#    aka ghost+travel+wormhole

#  such that one big git remote at the tree level
#   can along the editors sprouts unfurl git remotes focused to that file/chunk
# diff-match-patch

# peers:
#  https://lezer-playground.vercel.app/
#   in the classic x+y+z+3d formation
#   cursor in one cm mapped onto other cm (parsetree <-> input)
#   he recommends looking at:
#    https://codesandbox.io/s/github/danilowoz/sandpack-tsserver?file=/public/workers/tsserver.js
#   bit beyond me to pick apart
#    a phylograph would be nice!
#    studying code tool, the editor must also be...

# docs:
#  https://codemirror.net/docs/ref/
#  https://codemirror.net/docs/guide/
#  [@codemirror/state Github](https://github.com/codemirror/state/blob/main/src/state.ts)
# random cm notes:
#   Decoration.line requires setting the RangeSet to be line.from, line.from
#    rather than line.from, line.to
#   https://discuss.codemirror.net/t/merge-view-implementation/5072/8
#    kind of buggy:
#    someone https://github.com/codemirror/dev/issues/1174
#     regarding the (==  one)(++\n  phi)(==\n  two) ugly, see Diff / Ploy / %stretch
#      might also be (==  one\n  )(++phi\n  )(==two)
#      but ideally: (==  one\n)(++phi  \n)(==  two)
 
# cm howtobe:
#   show all headings all the time, without whatever between when folded

# so:
#   Code will <-> -Con/-Things to interact with
#    eg a -Colour picker, might use nearby stylesense
#     the code target presents options
#      qua to be inferred|enumerated at presentation time: unique bold cool, enervating...
#      green good red bad? fizzle? sizzle? film grain?
#    for rigging the io machinery for features
#     such as panning around reviewing a bunch of patches
#   is the plan
#    we have now instruction-following:
#     PlayDramatics gives N to Con
#     Diring gives N to Con
#     Coning gives N to Con
#      Coning is 

#    it seems:
#     Code is fast becoming -Con/-Code
    
#     routes/PlayDramatics.svelte
#      is ~~Travel: it restarts|continues a situation
#      feeds ~~This (dat) to:
#      D = Construct(C)
#       -> -Con**
    
#     lib/Diring is for filesystems
#      posits a '/'-Dir to start with
#       -> -Con** /-Dir do <img> pile
#       async unfurl can dispatch('reCon') to ^^-Con
       
#       lib/Coning is data graphing
#        noC for not iterating C/* but the .t,.y, etc substructure
#         kind of like -hat|Fez|Bow
       
#        < to be drag-scale|aroundable
      
#       we want only a few things on the screen
#        constantly pulling everything away, ~~ WebGL-Fluid-Simulation



import { pit,C_,i_,o_,o_path } from "$lib/St"
import { me } from "$lib/Y/Text"
import { ispi,fatal,pex,ex,sex, ahk,ahsk,map,grop } from "$lib/Y/Pic"

$mkrange = &cu,{
    return sex({},cu,'from,to')
}

  // savepoints
    # get resumable state across app reloads
    $save_selection_state = &st,{
        $C = C_('state','-cmglance')

        each in st.selection.ranges {
            $range = mkrange(n)
            i_(C,C_('sel','-cmsel',{range}))
        }

        return C
    }
    # view <- resumable state
    $resume_selection_state = &vi,C{
        fatal.ispi(C,'cmglance')
        $N = []
        $far_end = 0
        o_(C).map(&n{
            !ispi(n,'cmsel') and return
            $ra = nc&range
            fatal.num(ra.from)
            far_end = Math.min(far_end,ra.to)
            N.push( EditorSelection.range(ra.from, ra.to) )
        })
        # < it needs a single point in there as well?
        #   as per https://codemirror.net/examples/selection/ subtly
        #   or later error of selection.main not having .head or so
        N.push(EditorSelection.cursor(far_end))

        vi.dispatch({
            selection: EditorSelection.create(N, 1)
        })
        console.log("resume_selection_state!")
    }

  // return an object about whatever is going on
    # codemirror -> $look
    $whatsthis = &state,{
        let about = state.selection.main
        $getstr = cur => state.sliceDoc(cur.from,cur.to)
        let str = getstr(about)
        let tree = syntaxTree(state)
        let s = C_('lezing',1,{pi:'lezing'},{length:str.length,...sex({},about,'from,to')})
        $tft_C = {}
        
        $cursor = tree.cursorAt(about.from, 1)
        $nod = &m,cursor,c{
            $range = mkrange(cursor)
            $n = ahsk(tft_C, cursor.name,range.from,range.to)
            n ||= C_(cursor.name,'-nodule')
            ex(n.c,{range},c||{})
            ahk(tft_C, cursor.name,range.from,range.to, n)
            return i_(m,n)
        }

      // climb to the whole line
        $parent = i_(s,C_('parent','-cycat'))
        $left = i_(s,C_('left','-cycat'))
        $inside = i_(s,C_('inside','-cycat'))
        $right = i_(s,C_('right','-cycat'))
        
        # inside, right
        $found_nl = 0
        $where = inside
        inlezz(cursor,{
            next: cu => cu.next(),
            # break: cu => cu.from > about.to,
            each: &cu,d{
                $str = getstr(cu)
                str.includes("\n") and found_nl = 1
                else
                found_nl and return d.not = true

                cu.from > about.to and where = right

                nod(where,cu)
            }
        })

        # before
        cursor = tree.cursorAt(about.from, 1)
        inlezz(cursor,{
            next: cu => cu.prev(),
            break: cu => getstr(cu).includes("\n"),
            each: cu => {
                cu.to < about.from and nod(left,cu)
            }
        })
        lefts&z?.reverse()
        
        # parent
        cursor = tree.cursorAt(about.from, 1)
        $line = {}
        inlezz(cursor,{
            next: cu => cu.parent(),
            each: cu => {
                if (cu.name == 'Line') {
                    sex(line,cu,'from,to')
                }
                nod(parent,cu)
            }
        })

        # and their alignments
        $leinri = i_(s,C_('left-inside-right','-cycons',{type:'relativePlacementConstraint',axis:'horizontal'}))
        map(&n{ i_(leinri,n) }, [left,inside,right])
        $leinri = i_(s,C_('left-inside-right','-cycons',{type:'alignmentConstraint',axis:'horizontal'}))
        map(&n{ i_(leinri,n) }, [left,inside,right])
        $thelin = i_(s,C_('the line','-cycons',{type:'relativePlacementConstraint',axis:'horizontal'}))
        map(&n{
            map(&n{
                i_(thelin,n)
            }, o_(n))
        }, [left,inside,right])
        $thelin = i_(s,C_('the line','-cycons',{type:'alignmentConstraint',axis:'horizontal'}))
        map(&n{
            map(&n{
                i_(thelin,n)
            }, o_(n))
        }, [left,inside,right])

        $parupw = i_(s,C_('parent upwards','-cycons',{type:'alignmentConstraint',axis:'vertical'}))
        map(&n{ i_(parupw,n) }, o_(parent))
        parupws&z?.reverse()
        $parupw = i_(s,C_('parent upwards','-cycons',{type:'relativePlacementConstraint',axis:'vertical'}))
        map(&n{ i_(parupw,n) }, o_(parent))
        parupws&z?.reverse()


      // etc
        s.y.state = i_(s,save_selection_state(state))

        return s
    }
    # $look -> $graph )-> cytoscape
    $graphwhats = &look,{
        $graph = {nodes:[],edges:[],C_node:new WeakMap(),C_edges:new WeakMap}
        $concon = graph.constraints_config = {}
      // f
        $node_i = 1
        $edge_i = 1
        $mknode = &C,da{
            $node = graph.C_node.get(C)
            node and return node
            node = {id:'N'+(node_i++)}
            node.data = ex({name:C.t},da||{})

            graph.C_node.set(C,node)
            graph.nodes.push(node)
            return node
        }
        $C_to_node = &C{
            return graph.C_node.get(C)
        }
        # when s:edge is formed, link each C to it
        $wm_array_add = &wm,C,s{
            $N = wm.get(C)
            !N and N = []; wm.set(C, N)
            N.push(s)
        }
        $mkedge = &source,target,etc{
            $edge = {id:'E'+(edge_i++)}
            edge.source = C_to_node(source).id
            edge.target = C_to_node(target).id
            ex(edge,etc||{})

            wm_array_add(graph.C_edges,source,edge)
            wm_array_add(graph.C_edges,target,edge)
            graph.edges.push(edge)
            return edge
        }

      // do

        $la_dir

        o_path(look,['top','dir','qua']) .map(({dir,qua}) => {
            dir.t == 'state' and return
            if (ispi(dir,'cycons')) {
                if (dirc&type == 'alignmentConstraint') {
                    # for alignmentConstraint: {vertical: [['n1', 'n2', 'n3'], ['n4', 'n5']], horizontal: [['n2', 'n4']]},
                    # eg dir = C-cycons:parent-upwards {type:'alignmentConstraint',axis:'vertical'}
                    #    qua = C-nodule elsewhere
                    # constraint/nodegroup/node
                    $ar = ahsk(concon,dirc&type,dirc&axis)
                    !ar and ar = ahk(concon,dirc&type,dirc&axis,[])
                    # add a nodegroup per dir
                    dir != la_dir and ar.push([])
                    $N = ar.slice(-1)[0]
                    $node = C_to_node(qua)
                    node and N.push(node.id)
                    else console.log("node!! ",node)
                }
                elsif (dirc&type == 'relativePlacementConstraint') {
                    # for relativePlacementConstraint: [{"top": "r1","bottom": "r2","gap": 150}]
                    $ar = concon[dirc&type] ||= []
                    # quas become the top,bottom or left,right depending on dirc&axis
                    $two = dirc&axis == 'vertical' ? ['top','bottom'] : ['left','right']
                    # two quas per constraint
                    $co = dir.y.replco
                    !co and co = dir.y.replco = {}; ar.push(co)
                    # we may have more than two quas, each pair are constrained
                    $la_qua = co[two[1]]
                    if (la_qua) {
                        co = dir.y.replco = {}
                        ar.push(co)
                        co[two[0]] = la_qua
                    }

                    co.gap = dirc&gap || 32

                    $k = co[two[0]] ? two[1] : two[0]
                    $node = C_to_node(qua)
                    node and co[k] = node.id
                    else console.log("node!! ",node)
                }
            }
            else {
                # < we want to project resultant node %id onto C:dir
                # %dir should be groups of other nodes, aka Compound nodes
                $parent = mknode(dir,{dir:1,weight: 75}).id
                # this gives C:left|inside|right a 
                $quac = 'eni'.includes(dir.t[1]) ? {parent} : {}
                mknode(qua,quac)
                mkedge(dir,qua,{label:'in'})
            }
            la_dir = dir
        })
        $N = ahsk(concon,'relativePlacementConstraint')
        grop((n,i) => i>6 && i%2, N)

        return graph
    }

// fu
    # climbing cursor.next() etc
    $inlezz = &cu,d{
        d.next ||= cu => cu.next()
        d.energy ||= 30
        
        $first = 1
        while (d.energy-- > 6) {
            first and first = 0
            else
            !d.next(cu,d) and return
            # cursor changes to what (in the lezer grammar?) we are looking at...

            d.break && d.break(cu,d) and return
            
            d.each(cu,d)
        }
    }


    $introplant = &s{

    }
    # < state-updatable pull-apart-task object? an Inc-Pro-Run, with The-This etc
    #   with a .brack for %node,name,from,to?

    # TODO
    $Lines_test = &{
        $s = C_('lezing',1,{pi:'lezing'},{length:369,from:4,til:7})
        sc&extrava = {gratis:'vav',lob:&{ 1 },be:'eel'}
        sc&da = 3
        ss&zem = "levitat"
        $i = 0
        s.c["zeep"] = []
        while (i++ < 14) { s.c["zeep"][i] = 1 }
        $Lines = me.enL({},{},{},{},s)
        Lines += "\n  Thing\t-zip\t\"lots\""
        $z = me.deL({},{},{},{},Lines)
        console.log({s,Lines,z})
        i_(s,C_(Lines,1))
        i_(s,z)
    }

export {whatsthis,graphwhats, resume_selection_state,save_selection_state}
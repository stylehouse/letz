import { syntaxTree } from "@codemirror/language"
import { EditorSelection } from "@codemirror/state"
import {TreeCursor} from "@lezer/common"
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
import { ispi,fatal,pex,ex,sex,tax, ahk,ahsk,map,grep,grop,grap,uniq,hak } from "$lib/Y/Pic"

  // f
    $mkrange = &cu,{
        return sex({},cu,'from,to')
    }
    $textfilter = &s{
        $spacearound = s.match(/^\s|\s$/)
        $nl = s.includes("\n")
        spacearound || nl and s = '｢'+s+'｣'
        nl and s = s.replaceAll("\n","\\n")
        return s
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
        $far_end = Infinity
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
            selection: EditorSelection.create(N)
        })
        console.log("resume_selection_state!")
    }

  // state -> look
    # return an object about whatever is going on
    $whatsthis = &state,{
        let about = state.selection.main
        $getstr = cur => state.sliceDoc(cur.from,cur.to)
        let str = getstr(about)
        let tree = syntaxTree(state)
        let s = C_('lezing',1,{pi:'lezing'},{length:str.length,...sex({},about,'from,to')})
        $tft_C = {}
        
        # start with a point
        $cursor = tree.cursorAt(about.from, 1)
        # this cursor is now looking at a lezer node (of the language)
        $nod = &m,cursor,c{
            if (!(cursor instanceof TreeCursor)) {
                # cast from eg _BufferNode (the cursor.node below)
                #  even though both seem to have .name .from .to, they dont enumerate|iterate for ex()
                cursor = cursor.cursor()
                !cursor || !(cursor instanceof TreeCursor) and debugger
            }
            return _nod(m,cursor,c)
        }
        # without checking cursor, see above
        #  these text nodes are separate
        $textnod = &m,cursor,c{
            # their .name may be their string content
            return _nod(m,cursor,c,{index_name:'text'})
        }
        $_nod = &m,cursor,c,q{
            !cursor.name and throw "cursor!name"
            $index_name = q?.index_name ?? cursor.name
            $range = mkrange(cursor)
            $n = ahsk(tft_C, index_name,range.from,range.to)
            n ||= C_(cursor.name,'-nodule')
            ex(n.c,c||{},{range})
            cursor.node and nc&leznode = cursor.node
            ahk(tft_C, index_name,range.from,range.to, n)
            return i_(m,n)
        }

      // climb to the whole line
        $parent = i_(s,C_('parent','-cycat',{da:{dir:1}}))
        $left = i_(s,C_('left','-cycat',{da:{dir:1}}))
        $inside = i_(s,C_('inside','-cycat',{da:{dir:1}}))
        $right = i_(s,C_('right','-cycat',{da:{dir:1}}))
        
        # inside, right
        $found_nl = 0
        $where = inside
        inlezz(cursor,{
            next: cu => cu.next(),
            # break: cu => cu.from > about.to,
            each: &cu,d{
                $str = getstr(cu)
                where == right && str.includes("\n") and found_nl = 1
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
            each: (cu,d) => {
                cu.to < about.from and nod(left,cu)
            }
        })
        lefts&z?.reverse()
        
        # parent
        cursor = tree.cursorAt(about.from, 1)
        inlezz(cursor,{
            next: cu => cu.parent(),
            each: cu => {
                nod(parent,cu)
            }
        })
        # varying next then parent
        # cursor = tree.cursorAt(about.from, 1)
        # for (let rel = 1; rel < 8; rel++) {
        #     $nexpar = i_(s,C_(`nexpar(${rel})`,'-cycat'))
        #     $nexts = rel
        #     inlezz(cursor,{
        #         next: cu => nexts-- > 0 ? cu.next() : cu.parent(),
        #         each: cu => {
        #             # nod(nexpar,cu)
        #         }
        #     })
        # }

      // and their alignment constraints
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

        # $parupw = i_(s,C_('parent upwards','-cycons',{type:'alignmentConstraint',axis:'vertical'}))
        # map(&n{ i_(parupw,n) }, o_(parent))
        # parupws&z?.reverse()
        # $parupw = i_(s,C_('parent upwards vert','-cycons',{type:'relativePlacementConstraint',axis:'vertical'}))
        # map(&ni{ i < 2 && i_(parupw,n) }, o_(parent).reverse())

      // edge:ne extra edges about ordering
        $leinri = i_(s,C_('left-inside-right','-cyedge'))
        map(&n{ i_(leinri,n) }, [left,inside,right])
        

        $thelin = i_(s,C_('the line','-cyedge'))
        map(&n{
            map(&n{
                i_(thelin,n)
            }, o_(n))
        }, [left,inside,right])

        $parupw = i_(s,C_('parent upwards','-cyedge'))
        map(&n{ i_(parupw,n) }, o_(parent))

        map(&C{ c&da = {class:'along',label:'ne'} },[leinri,thelin])
        map(&C{ c&da = {label:'up',class:'outward'} },[parupw])

      // .node.parent: outward through the grammar
        # and cursor.node.parent-ward from every lezer node we have
        #  we seem to skip some things doing cursor.parent()
        #  eg also linkage of cu(.name=Sunpitness).node.parent(.name=Sunpit)
        # < we can leave out any of these edge:ou that duplicate with edge:up
        #   this can be done easily once cy data up til now is loaded...
        #    ie add some more by querying data up til then
        #    and we want to stream that situation...

        each t,from,to,C tft_C {
            #continue
            !ispi(C,'nodule') and debugger
            # every lezer node we have (not a cursor on a node as above)
            $node = c&leznode
            # can start a series of edges
            $extras = C_('extrapolations','-cyedge',{da:{label:'ou',class:'outward'}},{via:'node'})
            $la_node = node
            inlezz(node,{
                each: &node2,d{
                    # not node itself
                    d.d == 1 and return
                    $range = {from:node2.from,to:node2.to}
                    # stop when we arrive at lezer nodes we have?
                    # < Compression could prefer fewer -cyedge with longer /*
                    
                    !extrass&z and nod(extras,la_node,{})
                    nod(extras,node2,{})
                    ahsk(tft_C, node2.name,range.from,range.to) and return d.not = 1
                },
                next_returns: true,
                next: no => no.parent,
            })
            # ground if populated
            extrass&z and i_(s,extras)
        }}}

      // the text split by syntax nodes
        # intervals of text to be many-edged to syntax nodes
        $places = []
        each t,from,to,C tft_C {
            places.push(from*1, to*1)
        }}}
        places = uniq(places.sort())

        $text = i_(s,C_('text','-cycat',{da:{dir:1}}))
        $from = null
        each i,to places {
            # sacrifice first to to be a from, do the rest in pairs
            from == null and from = to; continue
            $cur = {name: textfilter(getstr({from,to})), from,to}
            textnod(text, cur, 
                # style
                {da: {texty:cur.name.length}}
            )
            from = to
        }

        # link them in order
        $texord = i_(s,C_('text order','-cyedge',{da:{class:'along',label:'ne'}}))
        map(&n{ i_(texord,n) }, o_(text))

        # relate to any non-text node...
        each t,from,to,C tft_C {
            t == 'text' and continue
            t == 'Line' and console.log([C.t,c&range])
            o_(text) .map(&n{
                # find range overlap: syntaxnode:C textnode:n
                # < surely part of codemirror somewhere?
                $overlap = range_overlaps(c&range,nc&range)
                #C.t == 'Title' and console.log([C.t,overlap,c&range,nc&range,C,n])
                !overlap and return

                $classes = 'texty'
                !range_contained(nc&range,c&range) and classes = 'textybroke'
                # < why can't we node.classes=Array|spoint? (we extract it from node.data in mknod)
                #   it doesn't seem to apply
                #classes = classes.split(' ')

                # quite a few of these
                # only two nodes each since they don't traverse like -cyedge/* is designed to
                # < hanging a link-to C on the -cycat/$C-nodule/-cylink
                #   supposing we can impose that on there...
                #    we might also group things elsehow
                $tetosy = i_(s,C_('text to syntax','-cyedge',{da:{class:classes,label:'te'}}))
                map(&n{ i_(tetosy,n) }, [C,n])
            })
        }}}




      // etc

        s.y.state = i_(s,save_selection_state(state))
        parentc&no_node = 1
        textc&no_node = 1
        each t,from,to,C tft_C {
            t == 'Program' && ispi(C,'nodule') and c&no_node = 1
        }}}

        return s
    }

    # ...

    # if r2 shares any positions with r1
    $range_overlaps = (r1,r2) => r1.from <= r2.to-1 && r1.to-1 >= r2.from
    # if r2 fits inside r1
    $range_contained = (r1,r2) => r1.from <= r2.from && r1.to >= r2.to
  

  // look -> graph -> cytoscape
    # $look -> $graph )-> cytoscape
    $graphwhats = &look,{
        $graph = {nodes:[],edges:[],C_node:new WeakMap(),C_edges:new WeakMap}
        $concon = graph.constraints_config = {}

      // f
        $node_i = 1
        $edge_i = 1
        $mknode = &C,da{
            c&no_node and return
            $node = graph.C_node.get(C)
            node and return node
            node = {id:'N'+(node_i++)}
            node.data = ex({name:C.t},c&da||{},da||{})
            tax(node,node.data,'classes')



            # < figure out why+how node.* and node.data.* are different things
            # < doing this stuff causes a loop somewhere that freezes devtools
            # node.data.id = delete node.id
            #  ex(node,node.data)
            #  delete node.data
            # < doing this, then commenting out again causes a loop in layout-base.js
            #tax(node,node.data,'parent')



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
            grap(n => nc&no_node, [source,target]) and return 

            $edge = {id:'E'+(edge_i++)}
            edge.source = C_to_node(source).id
            edge.target = C_to_node(target).id
            # dirc&da ends up here in edge, there is no edge.data
            # < seems to be no edge.classes, only edge.class
            #   node.classes exists, is promoted from node.data in mknode()
            ex(edge,etc||{})

            wm_array_add(graph.C_edges,source,edge)
            wm_array_add(graph.C_edges,target,edge)
            graph.edges.push(edge)
            return edge
        }

      // do

        # we mainly interpret a two-level structure (incidentally) on C:dir/C:qua
        #  usu -cycat:dir/-nodule:qua
        #   dir being a directory full of qua lezer nodes it links
        #  they uniquely map 1:1 to cytoscape node objects (ie cy node = C_to_node(dir)) or that hash that will become them
        #  this works only for the "main" bunch of dir/* to link given our graph is mostly C/C
        #   since we store dir/qua on dirs&z it can only contain that stuff when used anywhere else
        #   < perhaps C are able to occur in many places with different children? s&z -> X...
        o_path(look,['top','dir']) .map(({dir}) => {
            # ensure even dir without qua exist
            if (ispi(dir,'cycat')) {
                mknode(dir)
            }
        })
        $compoundy = {left:1,inside:1,right:1}
        o_path(look,['top','dir','qua']) .map(({dir,qua}) => {
            dir.t == 'state' and return
            if (ispi(dir,'cycat')) {
                # < we want to project resultant node %id onto C:dir
                # %dir should be groups of other nodes, aka Compound nodes
                # < why is this not showing the qua inside a dir box, like the cytoscape compound demos
                $dirid = mknode(dir)?.id
                # node.data += c
                #  (and any nc&da)
                $c = {}
                # this lets C:left|inside|right dir enclose qua+
                compoundy[dir.t] and c.parent = dirid
                mknode(qua,c)
                mkedge(dir,qua,{label:'in'})
            }
        })
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
                    $co = diry&replco
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
                else throw "-cycons non"
            }
            else if (ispi(dir,'cycat')) {
                # done in previous phase, to ensure all nodes exist before linking
            }
            else if (ispi(dir,'cyedge')) {
                # an edge goes through dir/*:qua
                $src = diry&la_node
                if (src) {
                    mkedge(src,qua,ex({label:'along'}, dirc&da||{}))
                }
                diry&la_node = qua
            }
            else throw "not -cycons|cycat|cyedge", dir
            la_dir = dir
        })
        # < why is this faulty? it removes all i>6
        # $N = ahsk(concon,'relativePlacementConstraint')
        # grop((n,i) => i>6 && i%2, N)

        return graph
    }

// fu
    # climbing cursor.next() etc
    $inlezz = &cu,d{
        d.d ||= 0
        d.next ||= cu => cu.next()
        d.energy ||= 30
        
        $first = 1
        while (d.energy-- > 6) {
            first and first = 0
            else {
                # < can this be coded: d.next_returns && !(cu = d.next(cu,d)) and return
                if (d.next_returns) {
                    cu = d.next(cu,d)
                    !cu and return
                }
                else
                !d.next(cu,d) and return
            }
            # cursor changes to what (in the lezer grammar?) we are looking at...
            d.d++

            d.break && d.break(cu,d) and return
            
            d.each(cu,d)
            d.not and return
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
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



import { pit,C_,i_,o_,o_path,inlace } from "$lib/St"
import { me,indent } from "$lib/Y/Text"
import { isar,ispi,fatal,pex,ex,sex,tax, ahk,ahsk,map,grep,grop,grap,uniq,hak,reverse,slant } from "$lib/Y/Pic"

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
        s.y.state = i_(s,save_selection_state(state))

        $tft_C = {}
        
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
            # they all can spawn .cursor() off this:
            cursor.node and nc&leznode = cursor.node
            ahk(tft_C, index_name,range.from,range.to, n)
            return i_(m,n)
        }

      // climb to a few Lines
        $Line_context = 4

        # $left = i_(s,C_('left','-cycat',{da:{dir:1}}))
        # $inside = i_(s,C_('inside','-cycat',{da:{dir:1}}))
        # $right = i_(s,C_('right','-cycat',{da:{dir:1}}))

        # start with a point
        $cursor = tree.cursorAt(about.from, 1)
        # lies: if selection is a point on the end of the Line, there we'll be,
        #  and firstChild() will move to what's on the line, before our selection
        #cursor.firstChild() and throw "cursorAt() should seek all the way in to a point"
        
        # now zoom out to the Line
        $parent = i_(s,C_('parent','-cycat',{da:{dir:1}}))
        $toLine = cursor.node.cursor()
        inlezz(toLine,{
            # for cursor.movers() that return false if no move, so we stop
            next: (cu,d) => cu.parent(),
            each: (cu,d) => {
                nod(parent,cu)
                cu.name == 'Line' and d.not = 1
            }
        })

        toLine.name != 'Line' and debugger

        # go a few Lines ahead and back
        $Lines = i_(s,C_('Lines','-cycat',{da:{dir:1}}))
        map(&direction,{
            if (direction == '') {
                Liness&z = reverse(Liness&z||[])
                # remember where the middle is
                Linesc&middle = hak(Liness&z)
                nod(Lines,toLine)
                return
            }
            inlezz(toLine.node.cursor(),{
                next: (cu,d) => cu[direction](),
                each: (cu,d) => {
                    d.d > 1 and nod(Lines,cu)
                    d.d > Line_context and d.not = 1
                    $str = getstr(cu)
                    !str.includes("\n") and console.warn("Non-\n having Line: ", [cu.from,cu.to])
                }
            })
        },['prevSibling','','nextSibling'])

        parentc&no_node = 1
        
      // fill in each Lines
        # this one is deep claiming all -nodules for its structure
        #  the rest is all s/*:dir/*:qua
        $Tree = i_(s,C_('Tree','-cytree'))
        map(&ni{
            # bulges in the middle
            $distance = i - Linesc&middle
            distance < 0 and distance *= -1
            # ie, next to selection will be dl=4
            $dl = 6 - distance
            dl < 2 and dl = 2
            distance < 1 and dl = null

            $go = nc&leznode.cursor()

            itelez(go,{C:Tree,each: &no,d{
                $z = nod(d.C,no)
                ex(d,{t:z.t,C:z})

                dl && d.d > dl and d.not = 1
            }})
        },o_(Lines))
        


      // and their alignment constraints
        $horizontality = &tNc{
            verticality(t,N,c,1)
        }
        $verticality = &tNch{
            c ||= {order:1,align:1}
            h = h ? 'horizontal' : 'vertical'
            if (c.order) {
                $leinri = i_(s,C_(t+'-order','-cycons',{type:'relativePlacementConstraint',axis:h}))
                map(&n{ i_(leinri,n) }, N)
            }
            if (c.align) {
                $leinri = i_(s,C_(t+'-align','-cycons',{type:'alignmentConstraint',axis:h}))
                map(&n{ i_(leinri,n) }, N)
            }
        }
        #verticality('Lines', o_(Lines))

        # align a bit of Tree/Line/*/* too
        $h = {}
        inlace(Tree,{grab:&nd{
            ns&depth = d.d
            !d.d || d.d > 3 and return
            ahk(h,[d.d],n)
        }})
        $classes = ['ayefour','ayethree','ayetwo']
        $classes_add = &nk{
            fatal.ispi(n,'nodule')
            $da = nc&da ||= {}
            if (!isar(da.classes)) {
                da.classes = da.classes ? da.classes.split(" ") : []
            }
            da.classes.push(k)
        }
        each iN h {
            verticality('Tree-layer-'+i, uniq(N), )

            $cla = classes.shift()
            map(n => classes_add(n,cla),N)
        }
      
      // the text split by syntax nodes
        # intervals of text to be many-edged to syntax nodes
        $places = []
        each t,from,to,C tft_C {
            places.push(from*1, to*1)
        }}}
        places = uniq(places).sort((a,b) => a-b)

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


      // relate to any non-text node overlap 
        $text_unseen = [...o_(text)]
        $dont_see = {text:1,Program:1}
        # make flat list first, of overlapping
        $syntex = []
        each t,from,to,C tft_C {
            dont_see[t] and continue
            o_(text) .map(&n{
                # find range overlap: syntaxnode:C textnode:n
                # < surely part of codemirror somewhere?
                $overlap = range_overlaps(c&range,nc&range)
                !overlap and return
                grop(n, text_unseen)

                # establish a dominant syntaxnode, for fewer edge:te
                $ow = nc&owner
                !ow || ows&depth < s&depth and nc&owner = C
                syntex.push([C,n])
            })
        }}}
        map(([C,n]) => {
            C != nc&owner and return

            # if this edge:te is the only one coming off C
            $classes = range_contained(nc&range,c&range) ? 'texty' : 'textybroke'
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
        },syntex)

      // text fin
        # ignore all \n
        grop(([C,n]) => {
            n.t == '｢\\n｣' and return nc&no_node = 1
        },syntex)

        # link them in order
        # $texord = i_(s,C_('text order','-cyedge',{da:{class:'along',label:'ne'}}))
        # map(&n{ i_(texord,n) }, o_(text))

        # align Line//textnodes
        map(&Line,i{
            $texts = []
            map(([C,n]) => {
                C == Line and texts.push(n)
            },syntex)

            texts.length < 1 and return
            # an alignment
            horizontality("Line-"+i, [Line,...texts],{order:1})
            # edges along texts
            $texord = i_(s,C_('text order'+i,'-cyedge',{da:{class:'along',label:'ne'}}))
            map(&n{ i_(texord,n) }, texts)
            console.log({Line,texts})
        },o_(Lines))

        each in text_unseen {
            if (t == '⚠') {
                debugger
                continue
            }
            nc&no_node = 1
        }




      // etc

        s.y.state = i_(s,save_selection_state(state))
        Linesc&no_node = 1
        textc&no_node = 1
        each t,from,to,C tft_C {
            t == 'Program' && ispi(C,'nodule') and c&no_node = 1
            if (t == '⚠') {
                $width = c&range.to - c&range.from
                console.warn("Le syntax ⚠: ",{C,range:c&range,width})
            }
        }}}

        console.log("End whatsthis()")

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
            # according to https://js.cytoscape.org/#notation/elements-json
            # the following are supposed to be on node rather than node.data
            #  beware that node.data() basically returns node without the Element2 wrapper, etc
            #   so node.data('data') gets you into data 
            # < use scratch (non-serialisable) to link back to C?
            tax(node,node.data,'scratch,position,selected,selectable,locked,grabbable,pannable,classes')
            if (node.classes) {
                # < multiple classes: contrary to the above, only node.class seems to work
                node.class = node.classes[0]
                node.classes[1] and throw "multiple classes"
            }



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
            if (ispi(dir,'cytree')) {
                # Tree/-nodule**
                inlace(dir,{grab:&sd{
                    # not the container C:Tree
                    d.d < 1 and return
                    # < parent doesn't work
                    d.d > 1 and ahk(s.c,'da','parent',d.up.id)
                    d.id = mknode(s).id

                    #  or links to it
                    d.d < 2 and return
                    
                    mkedge(d.up.s,s,{label:'in'})
                }})
                
                # also, make an indented name pile
                graph.nodetree = ''
                inlace(dir,{grab:&sd{
                    # not the container C:Tree
                    d.d < 1 and return
                    graph.nodetree += indent(d.d)+s.t+"\n"
                }})
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
            else if (ispi(dir,'cycat') || ispi(dir,'cytree')) {
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
    # climbing cursor.next() etc, flatly
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

    # gives you a (syntaxnode,d)** traversal, scoped to the given TreeCursor
    $itelez = &cur,d{
        $scope = cur.node.cursor()
        d.t ||= d.C?.t || 'top'
        d.d ||= 1
        d.no = cur.node
        d.path = [d.t]
        $not = 0
        $verbose = 0
        verbose && console.log("d.path scope:    \t"+scope.from+"-"+scope.to)
        $enter = &cur,{
            $was = d
            $no = cur.node
            no.from >= scope.to and not = 1
            verbose && no.from >= scope.to and console.log("d.path: "+slant([...d.path,no.name])+" from>to! "+cur.from+"-"+cur.to)
            not and return false
            !d.d and debugger

            # d cloned for the new place
            d = ex({},d,{up:d,no})
            d.d++
            # relying on you to set d.t here
            d.each && d.each(no,d)

            d.path = [...d.path,d.t]
            verbose && console.log("d.path: "+slant(d.path)+" --> \t"+cur.from+"-"+cur.to)
            if (d.not) {
                # don't want to go in
                verbose && console.log("d.path: "+slant(d.path)+" no further")
                #  and iterate() will not call leave
                d = d.up
                !d and debugger
                return false
            }
            return 1
        }
        $leave = &cur,{
            $was = d
            $no = cur.node
            not and return
            # we should be tracking this on d**
            # is also d.C.c.leznode
            d.no != no and debugger
            d = d.up
            !d and debugger
            verbose && console.log("d.path: "+slant(d.path)+" <--")
            d.d == 1 and return
            d.no != no.parent and debugger
        }
        cur.iterate(enter,leave)
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
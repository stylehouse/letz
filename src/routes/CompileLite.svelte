<script lang=ts>
import {ex} from '$lib/Y/Pic.ts'
    import { stylehouse_lite } from "$lib/lang/stholite_compiler"
    // # yes
    let compiled
    function comp () {
        let compiler = function (source:string) {
            let c = stylehouse_lite(source)
            return {source, ...c}
        }
        let more = "and...\n"+"# < notwicably\n    "+"# "+"and more\n"
        compiled = compiler(
            more
            +"$"+"art = 5\n'bla"+"tant figs'\n"
            +"    things "+"and logs "+"and stuff\n"
            +"els"+"if (1) near\n"
            +"else throw \"figaro, figaro\", art\n"
            +"    !cursor.name "+"and throw \"cursor!name\", etc, V, fact+3\n"
            +"let oh = &"+"fi,gu,res"+"{ 33+3 }\n"
            +"    each"+" etc Dc&art {\n"
            +"        A.1.2.3 + ds&z\n"
            +"    }}\n"
            +"    d.toFixed() != d and ~fractionalind: d, C, T.readinglv\n"
            +"    $is = me&Lines_types\n"
            +"    $is = me&Lines_types,that,inter(ject),a+bit\n"
            +"    $pi = delete h.c.pi\n"
            +"    \n"
            +"    &acgtscq{\n"
            +"        1s&todo + A.3 + s&dosage + cs&busy\n"
            +"    }\n"
        )
    }
    comp()
</script>

<biggroup>
<button on:click={() => comp()} > comp() </button>

<pre><table style="word-wrap:break-word; max-width:80%; display:block">
    {#each Object.entries(compiled) as [k,v]}
    <tr>
        <td><h1>{k}</h1></td>
        <td>{v}</td>
    </tr>
    <hr colspan="2"/>
    {/each}
</table></pre>
</biggroup>

<script lang=ts>
    import { ex } from "$lib/St"
    import { stylehouse_lite } from "$lib/lang/stholite_compiler"
    // # yes
    $compiled
    function comp () {
        // blatant
        let compiler = source => ex({source}, stylehouse_lite(source))
        let more = "and...\n"+"# < notwicably\n    "+"# "+"and more\n"
        compiled = compiler(
            more
            +"$"+"art = 5\n'bla"+"tant figs'\n"
            +"    things "+"and logs "+"and stuff\n"
            +"els"+"if (1) near\n"
            +"let oh = &"+"fi,gu,res"+"{ 33+3 }\n"
            +"    each"+" etc art {\n"
            +"        A.1.2.3\n"
            +"    }}\n"
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

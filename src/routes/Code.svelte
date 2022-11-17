<script lang="ts">
    import {parser} from '../lang/style.js'

    let f = (x) => ":"+x
    declare function f(x: number): string;
    let x: number | null | undefined = null
    if (x) {
    f(x); // Ok, type of x is number here
    } else {
    f(x); // Error, type of x is number? here
    }
    let a = x != null ? f(x) : ""; // Type of a is string
    let b = x && f(x); // Type of b is string | 0 | null | undefined

    let flub = "i thing/with/etc\n\no yeses/because\n"
    let tree = parser.parse(flub)
    let cursor = tree.cursor()
    let lems = []
    while (cursor.next()) {
        lems.push(`Node ${cursor.name} from ${cursor.from} to ${cursor.to}`)
    } 
</script>
<p> {b} </p>
<ul>
    {#each lems as lem}
        <li> {lem} </li>
    {/each}
</ul>
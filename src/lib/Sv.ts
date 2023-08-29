# Svelte abstractions
import { onMount, onDestroy, createEventDispatcher } from "svelte"

# component does callback every ms
export function recur(y,ms=700) {
    $every = &i{
        y(i)
        setTimeout(&{ every(i+1) }, 700)
    }
    onMount(async &{
        every(1)
    })
    onDestroy(async &{
        every = &{}
    })
}
<script lang="ts">
    import { createEventDispatcher, onMount, tick, untrack } from "svelte";
    import { G, TheG } from "$lib/G";
    import {
        cull_around,
        Recolink,
        Recolink_stillness,
        host_Recolink_stillness,
        Recollect,
        Aroundiness,
        makeso,
        Betime,
        Betimes,
    } from "$lib/treeing/Betimes.svelte";

    import BigGroup from "$lib/ui/BigGroup.svelte";
    import But from "$lib/ui/But.svelte";
    import Con from "$lib/pi/Con.svelte";
    import { Construct, reConstruct } from "$lib/Co";
    import { C_, pito, o_up, o_, i_, o_path } from "$lib/St";
    import {
        map,
        grep,
        ac,
        ahsk,
        ahk,
        havs,
        haks,
        hak,
        coint,
        joint,
        dig,
        sha256,
        sex,
        ex,
        nex,
        now,
        ispi,
        fatal,
    } from "$lib/Y/Pic.ts";
    import Coning from "$lib/Coning.svelte";
    import { nothing } from "$lib/tawhito/Dongtoe";

    // the C** -> D situator, including the call to Betimes()
    let { C, resetself } = $props();
    C ||= C_("TestBetimes", 1, { pi: "Rec" });
    // staging things into kommit/*
    let treeh = pito(C, "treeh", "-Rec", { real: 1 });
    // the kommit/* -> times/* situator
    let kommit = pito(C, "kommit", "-Rec", { real: 1, kommit: 1 });
    let times = pito(C, "times", "-Kom", { consoley: 1 });
    // the one-thing processor
    //  per thing as part of Construct() climbing C**
    let I = {
        // Con spawn their sc&pi, resolve etc is all figured out (somewhere)
        Pi: 1,
        do_Pi_early: (C, s, d) => {
            Betime({ C, s, d, times });
        },
    };
    let D = $state();

    // < ui/Time
    let conver = 1;
    let refresh = $state(1);
    // the many-thing processor
    //  and re-situator
    // < could be tacked onto the start of Construct() via I
    // < new stuff (via makeso()) should Betime() before it is Betimes()
    let bop = () => {
        // gather a limited view of Record**
        let creation = (e) => (e.c.pi = "Kom");
        makeso(times, o_path(C, "/kommit:se/*"), { creation });
        let kommit = pito(C, "kommit");
        // es&going = now() when it stops coming in
        // < generate_diff() works on a bunch of Recolink_discovery(),
        //   which we need to mock
        console.log("test Betimes")
        Betimes({ times, kommit });

        let notD = untrack(() => D);
        D = Construct({ I, s: C, D: notD });

        let jon = nothing({ yes: 1, no: 2 });
    };
    $effect(() => {
        bop();
    });

    // whathow we encode -> kommit/*
    let stuff = $state(C_("stuff"));
    // the diff will match C:stuff with itself from [a,b]
    let i_treeh = (s, Reco) => {
        let host = treeh;
        // the guest
        let guest = pito(host, s.t, "-Rec");
        if (Recolink_stillness(guest, Reco)) return;

        //  sits there with these links
        Recolink(guest, Reco, s);
    };
    let i_kommit = (s, Reco) => {
        let host = kommit;
        if (host_Recolink_stillness(host, Reco))
            return console.log("still Reco", s);

        let i = host.c.kommit++;
        // picture of treeh (which is really Record)
        let guest = pito(host, s.t + " " + i, "-Rec");
        //  sits there with these links
        Recolink(guest, Reco, s);
        //  also the time
        guest.sc.time = fenow();
    };
    let tock = async (spam) => {
        // reality changes, ie /bloube
        let s = stuff;
        spam ||= ["bit of a " + untrack(() => refresh)];
        map((t) => pito(s, t), spam);
        refresh++;

        // picture stuff
        await Recollect({ o_done: () => {}, fenow }, s);
        let Reco = s.y.Reco;
        if (!Reco) return console.error("No Reco", s);

        // link to the bloube as a treeh/*
        i_treeh(s, Reco);

        // picture treeh** with all its links, right now
        await Recollect({ o_done: () => {}, fenow }, treeh);
        Reco = treeh.y.Reco;
        if (!Reco) return console.error("No treeh Reco", treeh);

        // note this picture|moment|configuration of treeh** as a kommit
        i_kommit(treeh, Reco);

        // < we should Betime() before we Betimes(), using %%waits or so
        //   so the latest patch is known when we are squashing commits in Betimes()
        D = untrack(() => Construct({ I, s: C, D }));

        stuff = stuff;
    };

    // the story plays out...
    // timetravel
    let time = now().toPrecision(2) * 1;
    let fenow = () => {
        return time + refresh;
    };
    // animate time nicely or not - a toggle
    let asapily = false;
    let tocken = async (spam) => {
        await tock(spam);
        if (!asapily) await new Promise((resolve) => setTimeout(resolve, 122));
        await tick();
    };
    let play = async () => {
        // if (refresh > 1) reset()
        await tocken(["thissing"]);
        await tocken(["thatting", "thingy"]);
        await tocken(["thussing"]);
        await tocken(["etcerating"]);
        refresh += 10;
        await tocken(["jub malpha"]);
        await tocken(["jub mbeta"]);
        await tocken(["jub mgamma"]);
        refresh += 10;
        await tocken(["mub malpha"]);
        await tocken(["mub mbeta"]);
        await tocken(["mub mgamma"]);
        refresh += 20;
        await tocken(["tub malpha"]);
        await tocken(["tub mbeta"]);
        await tocken(["tub mgamma"]);
        refresh += 6;
        await tocken(["wub malpha"]);
        await tocken(["wub mbeta"]);
        // if you stop here, we've just merged:
        //  prior to e06b12ff24c:
        //    treeh 10 (mub,mub):N -> treeh 11 (...N,tub)
        //   I have a feeling about their y&be%time:
        //    1700000031 (delta 2) and 1700000052 (delta 23?)
        //   delta is going the wrong way!
        //  after e06b12ff24c and prior to 3cadede6a46:
        //    treeh 7|10|13 are all each full of jub|mub|tub
        //   lovely.
        //  after 3cadede6a46 it happens a couple of tocken() later...
        await tocken(["wub mgamma"]);
        refresh += 16;
        await tocken(["zub malpha"]);
        await tocken(["zub mbeta"]);
        await tocken(["zub mgamma"]);
        refresh += 16;
        await tocken(["xub malpha"]);
        // if you stop here, we've grouped all tub|wub
        //  since their delta is smallest (refresh += 6)
        await tocken(["xub mbeta"]);
        await tocken(["xub mgamma"]);
        refresh += 16;
        // if you stop here, we've grouped all xub,
        //  including the one that has only just been entered
        await tocken(["yub malpha"]);
        // if you stop here, we've grouped all jub|mub
        await tocken(["yub mbeta"]);
        await tocken(["yub mgamma"]);
        await tocken(["yub mgzolza"]);
        await tocken(["yub mgzolzaya"]);
        refresh += 16;
        // now we're always merging into the newest thing
        // < keep the earlier of merged sy&be%time
        //   so this >20s long stretch can be broken up:
        await tocken(["yub mgzolzayanja"]);
        await tocken(["yub mgbebe"]);
        return;
        await tocken(["yub mgyeyee"]);
        await tocken(["yub mgyeayee"]);
        await tocken(["yub mgyebyee"]);
        await tocken(["yub mgyecyee"]);
        await tocken(["yub mgyedyee"]);
        await tocken(["yub mgyeeyee"]);
        await tocken(["yub mgyeaxee"]);
        await tocken(["yub mgyebxee"]);
        await tocken(["yub mgyecxee"]);
        await tocken(["yub mgyedxee"]);
        await tocken(["yub mgyeexee"]);
        refresh += 16;
        await tocken(["yub mgyeaxea"]);
        await tocken(["yub mgyebxea"]);
        await tocken(["yub mgyecxea"]);
        await tocken(["yub mgyedxea"]);
        await tocken(["yub mgyeexea"]);
        await tocken(["yub mgyeaxeb"]);
        await tocken(["yub mgyebxeb"]);
        await tocken(["yub mgyecxeb"]);
        await tocken(["yub mgyedxeb"]);
        await tocken(["yub mgyeexeb"]);
        await tocken(["yub mgyeaxec"]);
        await tocken(["yub mgyebxec"]);
        await tocken(["yub mgyecxec"]);
        await tocken(["yub mgyedxec"]);
        await tocken(["yub mgyeexec"]);
        refresh += 26;
        await tocken(["yub xuxilato"]);
        for (let i of Array(15).fill("")) {
            await tock();
        }
        console.log("Done!?");
    };

    $effect(() => {
        untrack(() => {
            play();
        });
    });
    // API to change the {#key} block we are in
    let reset = () => resetself && resetself();
    let asap = () => (asapily = !asapily);

    let b = { bop, tock, play, reset, asap };
</script>

<biggroup>
    <h1>TestBetimes</h1>

    <panel class="big">
        <But {b} />
        <span class="numero dial">{conver}.{refresh}</span>
    </panel>

    <h1>Stuff</h1>
    <BigGroup>
        <!-- <Coning t="theD" C={D} /> -->
        {#if D}
            <Con C={D} />
        {/if}
        <Coning t="the stuff" C={stuff} />
    </BigGroup>
</biggroup>

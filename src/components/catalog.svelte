<script>
  import { afterUpdate, onMount } from "svelte/internal";
  import ReplyBox from "/src/components/reply_box.svelte";
  import {reply_box_toggle} from "/src/stores.js"
  import PocketBase from "pocketbase";
  import CatalogInfo from "./catalog_info.svelte";
  const pb = new PocketBase('http://127.0.0.1:8090'); //PocketBase database server IP

  export let board;
  //$: console.log("Catalog board parameter received: ", board);
  let thread_list = [];

  //lifecycle routine
  onMount(async ()=> {
    thread_list = await pb.collection('threads').getFullList({filter: `board = '${board}'`, sort: "-updated"});
  });

  //lifecycle routine
  afterUpdate(async ()=> {
    thread_list = await pb.collection('threads').getFullList({filter: `board = '${board}'`, sort: "-updated"});
  });

</script>

<div>
  <h2 class=" text-4xl font-bold font-sans webkit-font-smoothing antialiased text-center">{board}</h2>
  <div class="justify-center content-center grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] p-3">
    {#each thread_list as thread}
      <CatalogInfo post_id={thread.op} board={board} />
    {/each}
  </div>
</div>

{#if $reply_box_toggle}
  <ReplyBox thread_id="" board={board} />
{/if}
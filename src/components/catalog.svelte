<script>
  import { onMount } from "svelte/internal";
  import ReplyBox from "/src/components/reply_box.svelte";
  import {reply_box_toggle} from "/src/stores.js"
  import {reply_box_post} from "/src/stores.js"
  import PocketBase from "pocketbase";
  import CatalogInfo from "./catalog_info.svelte";
  const pb = new PocketBase('http://127.0.0.1:8090'); //PocketBase database server IP

  export let board;
  let thread_list = [];

  async function update(){
    thread_list = await pb.collection('threads').getFullList({filter: `board = '${board}'`, sort: "-updated"});
  }

  //fetching data from db on page load
  onMount(async ()=> {
    update();
  });

  //fetching data on board update
  $: board, update();

  //ressetting the flag after a post for the next shitpost
  $: if ($reply_box_post) {
    $reply_box_post = false;
    update();
  }

</script>

<div>
  <h2 class=" text-4xl font-bold font-sans webkit-font-smoothing antialiased text-center">{board}</h2>
  <div class="justify-center content-center p-5 grid grid-cols-[repeat(auto-fill,minmax(175px,1fr))]">
    {#each thread_list as thread}
      <CatalogInfo thread={thread}/>
    {/each}
  </div>
</div>

{#if $reply_box_toggle}
  <ReplyBox thread_id="" board={board} />
{/if}
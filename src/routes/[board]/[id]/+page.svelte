<script>
  import PocketBase from "pocketbase";
  import { afterUpdate, onMount } from "svelte/internal";
  import Comment from "/src/components/comment.svelte";
  import ReplyBox from "/src/components/reply_box.svelte";
  import { reply_box_toggle } from "/src/stores.js"
  import { reply_box_post } from "/src/stores.js"
  const pb = new PocketBase('http://127.0.0.1:8090'); //PocketBase database server IP
  import { page } from '$app/stores';
  
  //console.log($page.params)
  //$: console.log($page);
  //$: console.log($board);
  let op_post;
  let thread_id;
  let posts = [];
  let thread;

  //fetching posts in thread from the database
  async function update() {
    op_post = await pb.collection("posts").getFullList({filter: `post_number = '${$page.params.id}' && board = '${$page.params.board}'`});
    //console.log(op_post);
    thread_id = op_post[0].thread;
    posts = await pb.collection("posts").getFullList({filter: `thread = '${thread_id}'`, sort: '+post_number'});
    thread = await pb.collection("threads").getOne(thread_id);
    console.log(thread);
  }

  onMount(async ()=> {
    update();
  });

  $: if ($reply_box_post) {
    $reply_box_post = false;
    update();
  }
  
</script>

<div>
  <h2 class="pb-2 text-4xl font-bold font-sans webkit-font-smoothing antialiased text-center">
    {thread?.title}
  </h2>
    {#each posts as post}
      <Comment post={post} />
    {/each}
</div>

{#if $reply_box_toggle}
  <ReplyBox thread_id={thread_id} board={$page.params.board}/>
{/if}
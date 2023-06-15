<script>
  import PocketBase from "pocketbase";
  import { afterUpdate, onMount } from "svelte/internal";
  import Comment from "/src/components/comment.svelte";
  import ReplyBox from "/src/components/reply_box.svelte";
  import { reply_box_toggle } from "/src/stores.js"
  const pb = new PocketBase('http://127.0.0.1:8090'); //PocketBase database server IP
  import { page } from '$app/stores';
  
  //console.log($page.params)
  //$: console.log($page);
  //$: console.log($board);
  let op_post;
  let thread_id;
  let posts = [];

  //fetching posts in thread from the database
  onMount(async ()=> {
    op_post = await pb.collection("posts").getFullList({filter: `post_number = '${$page.params.id}' && board = '${$page.params.board}'`});
    //console.log(op_post);
    thread_id = op_post[0].thread;
    posts = await pb.collection("posts").getFullList({filter: `thread = '${thread_id}'`, sort: '+post_number'});
    //console.log(posts);
  });

  afterUpdate(async ()=> {
    op_post = await pb.collection("posts").getFullList({filter: `post_number = '${$page.params.id}' && board = '${$page.params.board}'`});
    thread_id = op_post[0].thread;
    posts = await pb.collection("posts").getFullList({filter: `thread = '${thread_id}'`, sort: '+post_number'});
  });
  
</script>

<div>
  <h2 class="pb-2 text-4xl font-bold font-sans webkit-font-smoothing antialiased text-center">
    Testing Thread
  </h2>
    {#each posts as post}
      <Comment post={post} />
    {/each}
</div>

{#if $reply_box_toggle}
  <ReplyBox thread_id={thread_id} board={$page.params.board}/>
{/if}
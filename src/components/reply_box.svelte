<script>
  import { onMount } from "svelte/internal";
  import PocketBase from "pocketbase";
	import Draggable from "./draggable.svelte";
  const pb = new PocketBase('http://127.0.0.1:8090'); //PocketBase database server IP


  export let thread_id;
  export let board;
  let thread;
  let textarea_mouseover = false;
  let textarea_comment = "";
  let file;

  onMount(async ()=> {
    if (thread_id != "")
      thread = await pb.collection('threads').getOne(thread_id);
    
  });

  function textarea_enter(){
    textarea_mouseover = true;
  }

  function textarea_leave(){
    textarea_mouseover = false;
  }

  async function create_thread(){
    const uuid = await pb.collection('id').getFullList({filter: `board = '${board}'`});
    const new_post = {
        "comment": textarea_comment,
        "post_number": uuid[0].post_number + 1,
        "thread": "",
        "board": board,
    };
    await pb.collection("posts").create(new_post);
    const updated_id = {
      "post_number": uuid[0].post_number + 1,
      "board": board,
    };
    await pb.collection("id").update(uuid[0].id, updated_id);
    await pb.collection("posts").getFirstListItem({filter: `post_number = '${uuid[0].post_number + 1}' && board = '${board}'`})

    //TODO:
    /*const new_thread = {
      "op": a faggot, //hay que hacer más fetches :(
      "board": board,
    };*/
  }

  async function post_comment(){
    const uuid = await pb.collection('id').getFullList({filter: `board = '${board}'`});
    //console.log(uuid);
    const new_post = {
        "comment": textarea_comment,
        "post_number": uuid[0].post_number + 1,
        "thread": thread_id,
        "board": board,
    };
    await pb.collection('posts').create(new_post);
    const updated_id = {
      "post_number": uuid[0].post_number + 1,
      "board": board,
    };
    await pb.collection('id').update(uuid[0].id, updated_id);
  }
</script>

<Draggable textarea_mouseover={textarea_mouseover}>
  <div class="border border-orange-400 pb-0.5 pl-1 pr-0.5 bg-orange-200 shadow ">
    {#if thread_id != ""}
      <b>Reply in thread</b>
      <div class="absolute right-1 top-0">
        <button on:click={post_comment} type="submit" class="pl-2 pr-2 border border-orange-400 center-content hover:bg-orange-300 hover:shadow"><b>Post</b></button>
      </div>
    {:else}
      <b>Create New Thread</b>
      <div class="absolute right-1 top-0">
        <button on:click={create_thread} type="submit" class="pl-2 pr-2 border border-orange-400 center-content hover:bg-orange-300 hover:shadow"><b>Post</b></button>
      </div>
    {/if}
    <textarea bind:value={textarea_comment} on:mouseenter={textarea_enter} on:mouseleave={textarea_leave} rows="4" maxRows="40" class="pt-2 resize w-full block text-sm border border-gray-300 focus:ring-blue-300 focus:border-blue-300 " placeholder="Leave a comment..."></textarea>
    <input bind:value={file} class="w-full block text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none" type="file">
  </div>
</Draggable>
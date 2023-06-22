<script>
  import PocketBase from "pocketbase";
	import Draggable from "./draggable.svelte";
  import {reply_box_post} from "/src/stores.js"
  import {reply_box_toggle} from "/src/stores.js"
  
  const pb = new PocketBase('http://127.0.0.1:8090'); //PocketBase database server IP
  export let thread_id;
  export let board;
  let textarea_mouseover = false;
  let textarea_comment = "";
  let title = "";
  let file;

  function textarea_enter(){
    textarea_mouseover = true;
  }

  function textarea_leave(){
    textarea_mouseover = false;
  }

  /*async function check_replies(comment){
    let p = 0;
    let regex = /#\d+/g; //matches any number with a # in front ex: "#324521, #1"
    let match, indexes = [];
    let spliced_comment = [];

    while (match = regex.exec(comment)){
      indexes.push([match.index, match.index+match[0].length]);
    }

    console.log(indexes[0][0]);
    console.log(indexes[0][1]);
    console.log(indexes[0]);



    console.log(indexes);
    if (indexes.length > 0) {
      for (let i = 0; i < indexes.length; ++i){
        spliced_comment.push(comment.splice(p,indexes[i][0]));
      }
    }
  }*/

  async function create_thread(){
    const uuid = await pb.collection("id").getFullList({filter: `board = '${board}'`});
    let id;
    id = uuid[0].post_number + 1;
    let formData = new FormData();
    const fileInput = document.getElementById("image");
    
    if (file !== undefined) formData.append("data", fileInput.files[0]);
    formData.append("comment", textarea_comment);
    formData.append("post_number", uuid[0].post_number + 1);
    formData.append("thread", "");
    formData.append("board", board);

    const database_post = await pb.collection("posts").create(formData);
    const updated_id = {
      "post_number": id,
      "board": board,
    };
    await pb.collection("id").update(uuid[0].id, updated_id);
    const new_thread = {
      "op": database_post.id,
      "board": board,
      "title": title,
    };
    const database_thread = await pb.collection("threads").create(new_thread);
    formData.append("thread", database_thread.id);
    await pb.collection("posts").update(database_post.id, formData);
    $reply_box_post = true;
    $reply_box_toggle = false;
  }

  async function post_comment(){
    //check_replies(textarea_comment);
    const uuid = await pb.collection("id").getFullList({filter: `board = '${board}'`});
    let formData = new FormData();
    const fileInput = document.getElementById("image");
    if (file !== undefined) formData.append("data", fileInput.files[0]);
    formData.append("comment", textarea_comment);
    formData.append("post_number", uuid[0].post_number + 1);
    formData.append("thread", thread_id);
    formData.append("board", board);
    await pb.collection("posts").create(formData);
    const updated_id = {
      "post_number": uuid[0].post_number + 1,
      "board": board,
    };
    await pb.collection("id").update(uuid[0].id, updated_id);
    $reply_box_post = true;
    $reply_box_toggle = false;
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
      <textarea bind:value={title} on:mouseenter={textarea_enter} on:mouseleave={textarea_leave} rows="1" maxRows="1" class="pt-2 resize w-full block text-sm border border-gray-300 focus:ring-blue-300 focus:border-blue-300 " placeholder="Thread title"></textarea>
    {/if}
    <textarea bind:value={textarea_comment} on:mouseenter={textarea_enter} on:mouseleave={textarea_leave} rows="4" maxRows="40" class="pt-2 resize w-full block text-sm border border-gray-300 focus:ring-blue-300 focus:border-blue-300 " placeholder="Leave a comment..."></textarea>
    <input bind:value={file} id="image" class="w-full block text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none" type="file">
  </div>
</Draggable>
<script>
  import { Lightbox } from 'svelte-lightbox';
  import PocketBase from "pocketbase";

  const pb = new PocketBase('http://127.0.0.1:8090'); 
  export let post;
  let data_url;

  //data file handling
  if (post.data != "") {
    data_url = pb.files.getUrl(post, post.data, {'thumb': '0x0'});
  }
  
</script>

<div class="pr-4 pl-5 pt-2">
  <div class="block max-w-none pl-4 pt-1 pb-2 pr-2 bg-orange-200 shadow dark:bg-gray-800 inline-block">
    <p class=""><b>Anonimous</b>, {new Date(post.created).toLocaleString()}  <b>#{post.post_number}</b></p>
    {#if post.data != ""}
      <Lightbox >
        <img class="w-40 float-left pr-2 pt-2 pb-1" src={data_url} alt="" />
      </Lightbox>
    {/if}
    <p class="font-normal whitespace-pre-line pt-1 pr-3">{post.comment}</p>
  </div>
</div>
<script>
  import { Lightbox } from "svelte-lightbox";
  import PocketBase from 'pocketbase';
	import { onMount } from "svelte/internal";
  const pb = new PocketBase('http://127.0.0.1:8090'); //PocketBase database server IP

  export let thread;
  let op = {};
  let data_url = "";

  async function update() {
    op = await pb.collection("posts").getOne(thread.op);
    if (op.data !== undefined)
      data_url = pb.files.getUrl(op, op.data, {'thumb': '100x0'});
  }

  //console.log(post_id);
  onMount(async ()=> {
    update();
  });

  $: thread, update();

</script>

<style>
    .square {
    height: 300px;
    width: 170px;
  }
</style>

<div class="square hover:shadow-xl block overflow-hidden content-center scrollbar-hide bg-orange-200">
  <Lightbox description="">
    <img src={data_url} alt="">
  </Lightbox>
  <div class="text-center p-2 text-sm">
    <a class="text-m font-bold overflow-y-auto break-words" href="/{thread.board}/{op.post_number}">{thread.title}</a>
    <p class="font-sans text-center text-sm">
      {op.comment}
    </p>
  </div>
</div>
<script>
  import PocketBase from 'pocketbase';
	import { onMount } from "svelte/internal";
  const pb = new PocketBase('http://127.0.0.1:8090'); //PocketBase database server IP

  export let thread;
  let op = {};
  let data_url = "";

  //data fetching to database 
  async function update() {
    op = await pb.collection("posts").getOne(thread.op);
    if (op.data !== undefined)
      data_url = pb.files.getUrl(op, op.data, {'thumb': '100x0'});
  }

  //fetching data on catalog load
  onMount(async ()=> {
    update();
  });

  //fetching data on thread update
  $: thread, update();

</script>

<style>
  .square {
    max-height: 300px;
    width: 170px;
  }
</style>

<a class="pt-3" href="/{thread.board}/{op.post_number}">
  <div class="square hover:shadow-xl block overflow-hidden content-center scrollbar-hide bg-orange-200">
    <img src={data_url} alt="">
    <div class="text-center p-2 text-sm">
      <p class="text-m font-bold overflow-y-auto break-words">{thread.title}</p>
      <p class="font-sans text-center text-sm">
        {op.comment}
      </p>
    </div>
  </div>
</a>
<script>
  import PocketBase from "pocketbase";

  const pb = new PocketBase('http://127.0.0.1:8090'); //PocketBase database server IP
  export let post;
  let data_url;
  let regex = /#\d+/g;
  let spliced_comment = [];

  //regex & parsing replies
  function check_replies(comment, spliced_comment){
    console.log("comment inside check_replies: ");
    console.log(comment);
    let p = 0;
     //matches any number with a # in front ex: "#324521, #1"
    let match, indexes = [];

    while (match = regex.exec(comment)){
      indexes.push([match.index, match.index+match[0].length]);
      console.log("matches inside check_replies: ");
      console.log(match);
    }
    console.log("positions of regex mathes inside check_replies: ");
    console.log(indexes);
    if (indexes.length > 0) {
      for (let i = 0; i < indexes.length; ++i){
        if (p < indexes[i][0]) spliced_comment.push(comment.slice(p, indexes[i][0] - 1));   
        spliced_comment.push(comment.slice(indexes[i][0], indexes[i][1]));
        p = indexes[i][1];
      }
      spliced_comment.push(comment.slice(p, comment.length));
    }
    console.log("spliced_comment result in check_replies: ");
    console.log(spliced_comment);
  }

  //data file handling
  if (post.data !== undefined) {
    data_url = pb.files.getUrl(post, post.data, {'thumb': '0x0'});
  }

  check_replies(post.comment, spliced_comment);
  
</script>

<div class="pr-4 pl-5 pt-2">
  <div class="block max-w-none pl-4 pt-1 pb-2 pr-2 bg-orange-200 shadow dark:bg-gray-800 inline-block">
    <p class=""><b>Anonimous</b>, {new Date(post.created).toLocaleString()}  <b>#{post.post_number}</b></p>
    {#if post.data != ""}
        <img class="w-40 float-left pr-2 pt-2 pb-1" src={data_url} alt="" />
    {/if}
    {#if (spliced_comment.length > 0) }
    <p class="font-normal">
      {#each spliced_comment as part}
        {#if part.match(regex)}
          <pre><b>{part}</b></pre>
        {:else}
          {part}
        {/if}
      {/each}
    </p>
    {:else}
      <p class="font-normal whitespace-pre-line pt-1 pr-3">{post.comment}</p>
    {/if}
  </div>
</div>
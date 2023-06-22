<script>
  import {reply_box_toggle} from "/src/stores.js"

    const boards = [
    {title: "Manga", short: "/m/", href: "/m/"},
    {title: "Sports", short: "/s/", href: "/s/"},
    {title: "IDK", short: "/idk/", href: "/idk/"},
    {title: "Technology", short: "/g/", href: "/g/"},
    {title: "Politics", short: "/p/", href: "/p/"},
    {title: "Random", short: "/r/", href: "/r/"},
    {title: "Testing", short: "/t/", href: "/t/"},
  ];

  function toggle_reply_box(){
    $reply_box_toggle = !$reply_box_toggle;
    //console.log("Toggle in header: " + $reply_box_toggle);
  }

</script>
<div class="pt-3">
  <div class=" pt-1 pb-1 pl-1 ">
    [
      {#each boards as board}
        <a href={board.href}>{board.short} </a>
      {/each}
      <div class="absolute right-0  pr-2">
        [
          <a href="#top">TOP,</a>
          <button on:click={toggle_reply_box}> Reply Box</button>
        ]
      </div>
    ]
  </div>
</div>

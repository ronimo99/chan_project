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

<div class="shadow pt-1 pb-1 pl-1 bg-orange-200" id="top">
  [
    {#each boards as board}
      <a href={board.href}>{board.short} </a>
    {/each}
    <div class="absolute right-0 top-0 pr-2">
      [
        <a href="#bottom">Bottom,</a>
        <button on:click={toggle_reply_box}> Reply Box</button>
      ]
    </div>
  ]
</div>

<h1 class="text-5xl font-bold -webkit-font-smoothing: antialiased; pl-9 pt-3">CHAN🐊</h1>
<p class="font-mono pl-10 pb-5">By DaRubitroN</p>
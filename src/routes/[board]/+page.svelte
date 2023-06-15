<script>
  import Catalog from "/src/components/catalog.svelte";
  import { page } from '$app/stores';

  let board = "";
  $: console.log($page.params);
  $: switch ($page.params.board) {
    case "s":
      board = "sports";
      break;
    case "g":
      board = "technology";
      break;
    case "p": 
      board = "politics";
      break;
    case "r":
      board = "random";
      break;
    case "m":
      board = "manga";
      break;
    case "idk":
      board = "idk";
      break;
    case "t":
      board = "testing";
      break;
    default:
      board = "testing";
      break;
  }
  //$: console.log(board);

</script>

<Catalog board={board}/>
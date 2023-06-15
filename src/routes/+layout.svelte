<script>
  import "../app.css";
  import Footer from "/src/components/footer.svelte";
  import Header from "/src/components/header.svelte";
</script>

<div>
	<body class="grow">
      <Header />
      <slot />
	</body>
  <div class="bottom-10 w-full pl-1 pb-1">
    <Footer />
  </div>
</div>
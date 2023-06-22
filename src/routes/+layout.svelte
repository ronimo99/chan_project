<script>
  import "../app.css";
  import Footer from "/src/components/footer.svelte";
  import Header from "/src/components/header.svelte";
  import HeaderBottom from "/src/components/header_bottom.svelte";
</script>

<div>
	<body class="grow">
      <Header />
      <slot />
      <HeaderBottom />
	</body>
  <div class="bottom-10 w-full pl-1 pb-1">
    <Footer />
  </div>
</div>
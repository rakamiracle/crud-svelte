<script lang="ts">
	// Pastikan file gambar ada di src/lib/images/
	import logo from '$lib/images/svelte-logo.png';
	import github from '$lib/images/github.png';
  </script>
  
  <header class="bg-gray-800 text-white p-4">
	<div class="container mx-auto flex justify-between items-center">
	  <div class="flex items-center gap-3">
		<a href="https://svelte.dev/docs/kit">
		  <img src={logo} alt="SvelteKit" class="h-10" />
		</a>
		<h1 class="text-2xl font-bold">SvelteKit App</h1>
	  </div>
	  <nav>
		<ul class="flex gap-4">
		  <li><a href="/" class="hover:underline">Home</a></li>
		  <li><a href="/about" class="hover:underline">About</a></li>
		</ul>
	  </nav>
	  <div>
		<a href="https://github.com/sveltejs/kit">
		  <img src={github} alt="GitHub" class="h-8" />
		</a>
	  </div>
	</div>
  </header>
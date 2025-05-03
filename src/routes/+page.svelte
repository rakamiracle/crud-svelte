<script>
  let tasks = []; // Array untuk menyimpan tugas
  let newTask = ""; // Input untuk tugas baru
  let editingTask = null; // State untuk tugas yang sedang diedit
  let editText = ""; // Input untuk teks yang diedit

  // Fungsi untuk menambah tugas
  function addTask() {
    if (newTask.trim() === "") return; // Jangan tambah jika input kosong
    tasks = [...tasks, { id: Date.now(), text: newTask, completed: false }];
    newTask = ""; // Reset input
  }

  // Fungsi untuk menghapus tugas
  function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
  }

  // Fungsi untuk toggle status selesai
  function toggleTask(id) {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
  }

  // Fungsi untuk mulai mengedit
  function startEdit(task) {
    editingTask = task;
    editText = task.text;
  }

  // Fungsi untuk simpan perubahan
  function saveEdit(id) {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, text: editText } : task
    );
    editingTask = null; // Reset setelah simpan
  }

  // Fungsi untuk batal edit
  function cancelEdit() {
    editingTask = null;
  }
</script>

<div class="max-w-md mx-auto mt-10">
  <h1 class="text-3xl font-bold text-center mb-6">Daftar Tugas</h1>

  <!-- Form untuk menambah tugas -->
  <div class="flex gap-2 mb-4">
    <input
      type="text"
      bind:value={newTask}
      placeholder="Masukkan tugas baru..."
      class="flex-1 p-2 border rounded"
    />
    <button on:click={addTask} class="bg-blue-500 text-white p-2 rounded">
      Tambah
    </button>
  </div>

  <!-- Daftar tugas -->
  {#if tasks.length === 0}
    <p class="text-center text-gray-500">Belum ada tugas.</p>
  {:else}
    <ul class="space-y-2">
      {#each tasks as task (task.id)}
        <li
          class="flex justify-between items-center p-2 border rounded {task.completed
            ? 'bg-green-100'
            : ''}"
        >
          <span
            on:click={() => toggleTask(task.id)}
            class="{task.completed ? 'line-through text-gray-500' : ''} cursor-pointer"
          >
            {task.text}
          </span>
          <button
            on:click={() => deleteTask(task.id)}
            class="text-red-500 hover:text-red-700"
          >
            Hapus
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
<script lang="ts">
    import { employees } from '$lib/store';
    import type { Employee } from '$lib/store';
  
    export let employee: Employee;
    export let onEdit: (id: number) => void;
    export let onDelete: (id: number) => void;
  
    function editEmployee() {
      onEdit(employee.id);
    }
  
    function confirmDelete() {
      onDelete(employee.id);
    }
  </script>
  
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h3 class="text-lg font-semibold">{employee.name}</h3>
    <p class="text-gray-600">Role: {employee.role}</p>
    <p class="text-gray-600">Department: {employee.department}</p>
    <div class="mt-2 flex gap-2">
      <button 
        on:click={editEmployee} 
        class="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors"
      >
        Edit
      </button>
      <button 
        on:click={confirmDelete} 
        class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
      >
        Delete
      </button>
    </div>
  </div>
  
  <style>
    /* Add any custom styles if needed */
  </style>
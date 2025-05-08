<script lang="ts">
  import { employees } from '$lib/store';
  import type { Employee } from '$lib/store';

  export let employee: Employee & { createdAt?: string; updatedAt?: string; isActive?: boolean };
  export let onEdit: (id: number) => void;
  export let onDelete: (id: number) => void;

  function editEmployee() {
    onEdit(employee.id);
  }

  function confirmDelete() {
    onDelete(employee.id);
  }

  // Format timestamp for display
  function formatTimestamp(timestamp?: string): string {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<div class="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative group">
  <div class="flex justify-between items-start">
    <div>
      <h3 class="text-lg font-semibold">{employee.name}</h3>
      <p class="text-gray-600">ID: {employee.id}</p>
      <p class="text-gray-600">Role: {employee.role}</p>
      <p class="text-gray-600">Department: {employee.department}</p>
    </div>
    <span 
      class="px-2 py-1 text-xs font-medium rounded-full 
      {employee.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}"
    >
      {employee.isActive !== false ? 'Active' : 'Inactive'}
    </span>
  </div>

  <!-- Additional details shown on hover -->
  <div class="absolute invisible group-hover:visible bg-gray-800 text-white text-xs p-2 rounded-md 
              top-0 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
    <p>Created: {formatTimestamp(employee.createdAt)}</p>
    <p>Updated: {formatTimestamp(employee.updatedAt)}</p>
  </div>

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
  /* Ensure hover details are properly positioned */
  .group:hover .group-hover\:visible {
    z-index: 10;
  }
</style>
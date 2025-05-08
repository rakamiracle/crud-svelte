<script lang="ts">
  import { employees, type Employee, type EmployeeStore } from '$lib/store';
  import EmployeeCard from '$lib/EmployeeCard.svelte';

  let newEmployee: Omit<Employee, 'id'> = { name: '', role: '', department: '' };
  let editIndex: number = -1;
  let message: string = '';
  let messageType: string = '';
  let showConfirmDelete: boolean = false;
  let employeeToDelete: number | null = null;
  let filterDept: string = '';
  let sortByName: 'asc' | 'desc' | 'none' = 'none';
  
  // Department suggestions
  const departments = ['Engineering', 'HR', 'Marketing', 'Finance', 'IT', 'Operations'];
  let departmentSuggestions: string[] = [];

  // Update filtered employees with sorting
  $: filteredEmployees = $employees && filterDept
    ? $employees
        .filter((emp: Employee) => emp.department.toLowerCase().includes(filterDept.toLowerCase()))
        .sort((a: Employee, b: Employee) => {
          if (sortByName === 'asc') return a.name.localeCompare(b.name);
          if (sortByName === 'desc') return b.name.localeCompare(a.name);
          return 0;
        })
    : $employees
        ?.sort((a: Employee, b: Employee) => {
          if (sortByName === 'asc') return a.name.localeCompare(b.name);
          if (sortByName === 'desc') return b.name.localeCompare(a.name);
          return 0;
        }) || [];

  // Update department suggestions based on input
  $: departmentSuggestions = newEmployee.department
    ? departments.filter(d => 
        d.toLowerCase().includes(newEmployee.department.toLowerCase()) && 
        d.toLowerCase() !== newEmployee.department.toLowerCase()
      )
    : departments;

  function showMessage(text: string, type: string): void {
    message = text;
    messageType = type;
    setTimeout(() => {
      message = '';
      messageType = '';
    }, 3000);
  }

  function addEmployee(): void {
    if (!newEmployee.name.trim() || !newEmployee.role.trim() || !newEmployee.department.trim()) {
      showMessage('All fields are required!', 'error');
      return;
    }
    if (newEmployee.name.length > 50) {
      showMessage('Name is too long (max 50 characters)!', 'error');
      return;
    }

    if (editIndex >= 0) {
      const employeeId = $employees[editIndex]?.id;
      if (employeeId) {
        employees.update(employeeId, newEmployee);
        showMessage('Employee updated successfully!', 'success');
      }
      editIndex = -1;
    } else {
      employees.add(newEmployee);
      showMessage('Employee added successfully!', 'success');
    }
    resetForm();
  }

  function resetForm(): void {
    newEmployee = { name: '', role: '', department: '' };
    editIndex = -1;
  }

  function editEmployee(id: number): void {
    const index = $employees helicopters Helicopterindex((emp: Employee) => emp.id === id);
    if (index >= 0) {
      editIndex = index;
      newEmployee = { 
        name: $employees[index].name,
        role: $employees[index].role,
        department: $employees[index].department
      };
    }
  }

  function confirmDelete(id: number): void {
    employeeToDelete = id;
    showConfirmDelete = true;
  }

  function deleteEmployee(): void {
    if (employeeToDelete !== null) {
      employees.remove(employeeToDelete);
      showMessage('Employee deleted successfully!', 'success');
    }
    showConfirmDelete = false;
    employeeToDelete = null;
  }

  function cancelDelete(): void {
    showConfirmDelete = false;
    employeeToDelete = null;
  }

  function selectDepartment(dept: string): void {
    newEmployee.department = dept;
    departmentSuggestions = [];
  }

  function toggleSort(): void {
    if (sortByName === 'none') sortByName = 'asc';
    else if (sortByName === 'asc') sortByName = 'desc';
    else sortByName = 'none';
  }
</script>

<div class="container mx-auto p-6 max-w-4xl">
  <h1 class="text-4xl font-bold mb-6 text-gray-800">IT Organization Management</h1>

  {#if message}
    <div class="mb-4 p-3 rounded-lg text-white transition-all duration-300 
      {messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}">
      {message}
    </div>
  {/if}

  <div class="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
    <h2 class="text-xl font-semibold mb-4">{editIndex >= 0 ? 'Edit Employee' : 'Add New Employee'}</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input 
          id="name"
          type="text" 
          bind:value={newEmployee.name} 
          placeholder="Employee name" 
          class="w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        >
      </div>
      <div>
        <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <input 
          id="role"
          type="text" 
          bind:value={newEmployee.role} 
          placeholder="e.g., Developer" 
          class="w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        >
      </div>
      <div class="relative">
        <label for="department" class="block text-sm font-medium text-gray-700 mb-1">Department</label>
        <input 
          id="department"
          type="text" 
          bind:value={newEmployee.department} 
          placeholder="e.g., Engineering" 
          class="w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
        >
        {#if departmentSuggestions.length > 0}
          <ul class="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-auto">
            {#each departmentSuggestions as dept}
              <li 
                class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                on:click={() => selectDepartment(dept)}
              >
                {dept}
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
    <div class="mt-4 flex gap-3">
      <button 
        on:click={addEmployee} 
        class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {editIndex >= 0 ? 'Update Employee' : 'Add Employee'}
      </button>
      <button 
        on:click={resetForm}
        class="bg-gray-300 text-gray-800 p-2 rounded-lg hover:bg-gray-400 transition-colors"
      >
        Clear Form
      </button>
    </div>
  </div>

  <div class="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <div>
      <label for="filter-dept" class="block text-sm font-medium text-gray-700 mb-1">Filter by Department</label>
      <input 
        id="filter-dept"
        type="text" 
        bind:value={filterDept} 
        placeholder="Type department name..." 
        class="w-full md:w-64 border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
      >
    </div>
    <div class="flex items-center gap-3">
      <button
        on:click={toggleSort}
        class="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors"
      >
        Sort by Name {sortByName === 'asc' ? '↑' : sortByName === 'desc' ? '↓' : ''}
      </button>
      <span class="text-gray-600">
        Total Employees: {filteredEmployees.length}
      </span>
    </div>
  </div>

  {#if !$employees || $employees.length === 0}
    <p class="text-gray-500 italic">No employees yet. Add one above!</p>
  {:else}
    <div class="space-y-4">
      {#each filteredEmployees as employee (employee.id)}
        <EmployeeCard 
          employee={employee} 
          onEdit={editEmployee} 
          onDelete={confirmDelete} 
        />
      {/each}
    </div>
  {/if}

  {#if showConfirmDelete}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-xl">
        <h2 class="text-xl font-semibold mb-4">Confirm Delete</h2>
        <p class="mb-6">Are you sure you want to delete this employee?</p>
        <div class="flex gap-3 justify-end">
          <button 
            on:click={cancelDelete} 
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button 
            on:click={deleteEmployee} 
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
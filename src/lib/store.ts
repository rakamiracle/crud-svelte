import { writable } from 'svelte/store';

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
}

const createEmployeeStore = () => {
  const { subscribe, update } = writable<Employee[]>([]);
  
  const saved = localStorage.getItem('employees');
  if (saved) {
    update(() => JSON.parse(saved) as Employee[]);
  }

  return {
    subscribe,
    add: (employee: Omit<Employee, 'id'>) => update(employees => {
      const newEmployee: Employee = { id: Date.now(), ...employee };
      const updated = [...employees, newEmployee];
      localStorage.setItem('employees', JSON.stringify(updated));
      return updated;
    }),
    update: (id: number, updatedEmployee: Partial<Employee>) => update(employees => {
      const index = employees.findIndex(emp => emp.id === id);
      if (index !== -1) {
        employees[index] = { ...employees[index], ...updatedEmployee };
        localStorage.setItem('employees', JSON.stringify(employees));
      }
      return employees;
    }),
    remove: (id: number) => update(employees => {
      const filtered = employees.filter(emp => emp.id !== id);
      localStorage.setItem('employees', JSON.stringify(filtered));
      return filtered;
    })
  };
};

export const employees = createEmployeeStore();
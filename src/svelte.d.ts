// src/svelte.d.ts
declare module '*.svelte' {
    import type { SvelteComponentTyped } from 'svelte';
  
    interface Props {
      [key: string]: any;
    }
  
    export default class extends SvelteComponentTyped<Props> {}
  }
  
  declare module '*.png' {
    const src: string;
    export default src;
  }
  
  declare module '*.jpg' {
    const src: string;
    export default src;
  }
  
  declare module '*.svg' {
    const src: string;
    export default src;
  }
  
  declare module '$lib/store' {
    import type { Writable } from 'svelte/store';
  
    export interface Employee {
      id: number;
      name: string;
      role: string;
      department: string;
    }
  
    export const employees: {
      subscribe: Writable<Employee[]>['subscribe'];
      add: (employee: Omit<Employee, 'id'>) => void;
      update: (id: number, updatedEmployee: Partial<Employee>) => void;
      remove: (id: number) => void;
    };
  }
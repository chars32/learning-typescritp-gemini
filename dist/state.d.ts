import { type Task, FilterType } from './models';
export declare const getTasks: () => Task[];
export declare const getCurrentFilter: () => FilterType;
export declare function addTask(description: string): void;
export declare function deleteTask(id: string): void;
export declare function toggleTaskCompletion(id: string): void;
export declare function updateTaskDescription(id: string, newDescription: string): void;
export declare function setFilter(filter: FilterType): void;
//# sourceMappingURL=state.d.ts.map
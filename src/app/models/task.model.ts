export interface Task {
    id: number;
    title: string;
    completed: boolean;
    //Parametro opcional
    editing?: boolean;
}
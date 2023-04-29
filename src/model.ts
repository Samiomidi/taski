export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
  parentElId: string | undefined;
}
export interface TodoStr {
  todo: string;
  parent: string | undefined;
}
export interface Board {
  id: string;
  title: string;
  cards: Todo[];
}

// We define a interface for the todo item
export default interface TodoItem {
  id: number | string;
  content: string;
  isCompleted: boolean;
}

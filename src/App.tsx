import React, { useState } from "react";
import "./index.css";
// import InputField from "./components/InputField";
import { Todo, Board } from "./model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import AddCardInput from "./components/AddCardInput";

const DUMMY_DATA: { boards: Board[]; todos: Todo[] } = {
  boards: [
    { id: "1682770511821", title: "SAMI", cards: Array(0) },

    { id: "1682770515531", title: "VAHID", cards: Array(0) },

    { id: "1682770517477", title: "Completed", cards: Array(0) },
  ],
  todos: [
    {
      id: 1682770526870,
      todo: "Add a search bar to the To-Do list",
      isDone: false,
      parentElId: "1682770511821",
    },
    {
      id: 1682770527333,
      todo: "Implement drag and drop functionality for reordering tasks",
      isDone: true,
      parentElId: "1682770511821",
    },
    {
      id: 1682770528172,
      todo: " Allow users to set due dates for tasks",
      isDone: false,
      parentElId: "1682770511821",
    },
    {
      id: 1682770530288,
      todo: "Create different categories or tags for tasks",
      isDone: false,
      parentElId: "1682770515531",
    },
    {
      id: 1682770531200,
      todo: "Add the ability to share tasks with other users",
      isDone: false,
      parentElId: "1682770515531",
    },
    {
      id: 1682770531700,
      todo: "Implement a reminder system for upcoming due dates",
      isDone: true,
      parentElId: "1682770515531",
    },
    {
      id: 1682770534927,
      todo: " Enable users to add notes or comments to tasks",
      isDone: false,
      parentElId: "1682770517477",
    },
    {
      id: 1682770536412,
      todo: "Add the ability to attach files or documents to tasks",
      isDone: false,
      parentElId: "1682770517477",
    },
    {
      id: 1682770536974,
      todo: " Implement a priority system for tasks",
      isDone: false,
      parentElId: "1682770517477",
    },
    {
      id: 1682770585738,
      todo: "Allow users to mark tasks as completed or archived",
      isDone: false,
      parentElId: "1682770517477",
    },
  ],
};
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(DUMMY_DATA.todos);

  const [boards, setBoards] = useState<Board[]>(DUMMY_DATA.boards);
  const [board, setBoard] = useState<string>("");
  const addHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (board) {
      setBoards([
        ...boards,
        { id: Date.now().toString(), title: board, cards: todos },
      ]);
      setBoard("");
    }
  };
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const active = todos;

    const add = active[source.index];
    add.parentElId = destination.droppableId;
    active.splice(source.index, 1);
    active.splice(destination.index, 0, add);
    setTodos(active);
  };
  console.log(board);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <div id="backdrop" />
        <span className="heading">Taski</span>
        <div className="board">
          <AddCardInput
            btnTitle="Add Board"
            todo={board}
            setTodo={setBoard}
            addHandler={addHandler}
            placeholder="Enter a title for this board"
          />
        </div>

        <TodoList
          todos={todos}
          setTodos={setTodos}
          boards={boards}
          setBoards={setBoards}
        />
      </div>
    </DragDropContext>
  );
};

export default App;

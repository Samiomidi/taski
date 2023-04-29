import React, { useState } from "react";
import "./index.css";
// import InputField from "./components/InputField";
import { Todo, Board } from "./model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import AddCardInput from "./components/AddCardInput";
const App: React.FC = () => {
  // const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1682770526870,
      todo: "1",
      isDone: false,
      parentElId: "1682770511821",
    },
    {
      id: 1682770527333,
      todo: "2",
      isDone: false,
      parentElId: "1682770511821",
    },
    {
      id: 1682770528172,
      todo: "3",
      isDone: false,
      parentElId: "1682770511821",
    },
    {
      id: 1682770530288,
      todo: "4",
      isDone: false,
      parentElId: "1682770515531",
    },
    {
      id: 1682770531200,
      todo: "5",
      isDone: false,
      parentElId: "1682770515531",
    },
    {
      id: 1682770531700,
      todo: "6",
      isDone: false,
      parentElId: "1682770515531",
    },
    {
      id: 1682770534927,
      todo: "7",
      isDone: false,
      parentElId: "1682770517477",
    },
    {
      id: 1682770536412,
      todo: "8",
      isDone: false,
      parentElId: "1682770517477",
    },
    {
      id: 1682770536974,
      todo: "9",
      isDone: false,
      parentElId: "1682770517477",
    },
    {
      id: 1682770585738,
      todo: "10",
      isDone: false,
      parentElId: "1682770517477",
    },
  ]);
  // const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const [boards, setBoards] = useState<Board[]>([
    { id: "1682770511821", title: "sami", cards: Array(0) },

    { id: "1682770515531", title: "vahid", cards: Array(0) },

    { id: "1682770517477", title: "ali", cards: Array(0) },
  ]);
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

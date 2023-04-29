import React, { useState } from "react";
import { Todo, Board } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import AddCardInput from "./AddCardInput";
import SingleBoardOptions from "./SingleBoardOptions";
interface Props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
  boards: Array<Board>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, boards, setBoards }) => {
  const [todo, setTodo] = useState<string>("");
  const addHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const parentElId = e.currentTarget.parentElement?.dataset?.rbdDroppableId;
    if (todo) {
      setTodos([
        ...todos,
        { id: Date.now(), todo, isDone: false, parentElId: parentElId },
      ]);
      setTodo("");
    }
  };

  return (
    <div className="container">
      {boards.map((board) => (
        <Droppable droppableId={board.id} key={board.id}>
          {(provided, snapshot) => {
            return (
              <div
                className={`todos ${
                  snapshot.isDraggingOver ? "dragcomplete" : ""
                }`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <SingleBoardOptions
                  board={board}
                  boards={boards}
                  setBoards={setBoards}
                  todos={todos}
                  setTodos={setTodos}
                />
                <AddCardInput
                  btnTitle="Add Card"
                  placeholder="Enter a title for this card"
                  todo={todo}
                  setTodo={setTodo}
                  addHandler={addHandler}
                />

                {todos.map((todo, index) =>
                  todo.parentElId === board.id ? (
                    <SingleTodo
                      index={index}
                      todos={todos}
                      todo={todo}
                      key={todo.id}
                      setTodos={setTodos}
                    />
                  ) : (
                    ""
                  )
                )}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      ))}
    </div>
  );
};

export default TodoList;

import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const doneHandler = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const editHandler = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const deleteHandler = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => editHandler(e, todo.id)}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <span className="edit__input--box">
              <input
                ref={inputRef}
                value={editTodo}
                onBlur={() => setEdit(false)}
                onChange={(e) => setEditTodo(e.target.value)}
              />
              <MdDone
                className="icon done"
                onClick={(e) => editHandler(e, todo.id)}
              />
            </span>
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text">{todo.todo}</span>
          )}

          {!edit && (
            <div>
              <span
                className="icon edit"
                onClick={() => {
                  if (!todo.isDone) {
                    setEdit(!edit);
                  }
                }}
              >
                <AiFillEdit />
              </span>
              <span
                className="icon delete"
                onClick={() => deleteHandler(todo.id)}
              >
                <AiFillDelete />
              </span>
              <span className="icon done" onClick={() => doneHandler(todo.id)}>
                <MdDone />
              </span>
            </div>
          )}
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;

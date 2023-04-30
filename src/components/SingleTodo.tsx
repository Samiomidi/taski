import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdDone, MdCancel } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
import Backdrop from "./ui/Backdrop";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const [showMenu, setShowMenu] = useState<boolean>(false);

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
          onKeyDown={(e) => (e.key === "Escape" ? setEdit(false) : null)}
        >
          {edit ? (
            <span className="edit__input--box">
              <input
                ref={inputRef}
                value={editTodo}
                onBlur={() => setEdit(false)}
                onChange={(e) => setEditTodo(e.target.value)}
              />
              <MdCancel className="cancel" onClick={() => setEdit(false)} />
            </span>
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.todo}</s>
          ) : (
            <span
              className="todos__single--text"
              onDoubleClick={() => setEdit(true)}
            >
              {todo.todo}
            </span>
          )}

          {showMenu && <Backdrop onClick={() => setShowMenu(false)} />}
          {!edit && (
            <div className="dots-menu">
              <span className="dots" onClick={() => setShowMenu(!showMenu)}>
                <BiDotsVerticalRounded />
              </span>
              {showMenu && !snapshot.isDragging && (
                <div className="dots-menu__box">
                  <span
                    className="icon edit"
                    onClick={() => {
                      if (!todo.isDone) {
                        setEdit(!edit);
                        setShowMenu(false);
                      }
                    }}
                  >
                    <AiFillEdit />
                  </span>
                  <span
                    className="icon delete"
                    onClick={() => {
                      deleteHandler(todo.id);
                    }}
                  >
                    <AiFillDelete />
                  </span>
                  <span
                    className="icon done"
                    onClick={() => {
                      doneHandler(todo.id);
                      setShowMenu(false);
                    }}
                  >
                    <MdDone />
                  </span>
                </div>
              )}
            </div>
          )}
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;

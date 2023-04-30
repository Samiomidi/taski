import React, { useState, useRef, useEffect } from "react";
import { Board, Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Backdrop from "./ui/Backdrop";

interface Props {
  board: Board;
  boards: Board[];
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}
const SingleBoardOptions = ({
  board,
  boards,
  setBoards,
  todos,
  setTodos,
}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editBoard, setEditBoard] = useState<string>(board.title);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const editHandler = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setBoards(
      boards.map((board) =>
        +board.id === id ? { ...board, title: editBoard } : board
      )
    );

    setEdit(false);
  };
  const deleteHandler = (id: number) => {
    setBoards(boards.filter((board) => +board.id !== id));
    setTodos(todos.filter((todo) => +todo.parentElId! !== id));
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form
      onSubmit={(e) => editHandler(e, +board.id)}
      onKeyDown={(e) => (e.key === "Escape" ? setEdit(false) : null)}
    >
      <div className="boards__single">
        {edit ? (
          <span className="edit__input--box">
            <input
              ref={inputRef}
              value={editBoard}
              onBlur={() => setEdit(false)}
              onChange={(e) => setEditBoard(e.currentTarget.value)}
              className="input"
            />
            <MdCancel className="cancel" onClick={() => setEdit(false)} />
          </span>
        ) : (
          <span className="todos__heading">{board.title}</span>
        )}

        {showMenu && <Backdrop onClick={() => setShowMenu(false)} />}
        {!edit && (
          <div className="dots-menu">
            <span className="dots" onClick={() => setShowMenu(!showMenu)}>
              <BiDotsVerticalRounded />
            </span>
            {showMenu && (
              <div className="dots-menu__box">
                <span
                  className="icon edit"
                  onClick={() => {
                    setEdit(!edit);
                    setShowMenu(false);
                  }}
                >
                  <AiFillEdit />
                </span>
                <span
                  className="icon delete"
                  onClick={() => {
                    deleteHandler(+board.id);
                    setShowMenu(false);
                  }}
                >
                  <AiFillDelete />
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
};

export default SingleBoardOptions;

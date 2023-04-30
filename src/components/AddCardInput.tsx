import React, { useRef, useState } from "react";
import "./styles.css";
import Backdrop from "./ui/Backdrop";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addHandler: (e: React.FormEvent) => void;
  placeholder: string;
  btnTitle: string;
}

const AddCardInput = ({
  todo,
  setTodo,
  addHandler,
  placeholder,
  btnTitle,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [addCard, setAddCard] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>();
  return (
    <div className="center">
      {addCard && <Backdrop onClick={() => setAddCard(false)} />}
      <button
        className={`add-card__btn ${addCard ? "hide" : "show"}`}
        type="button"
        onClick={() => {
          setAddCard(!addCard);
        }}
        onBlur={() => {
          setAddCard(true);
          setErrorMsg(false);
          inputRef.current?.focus();
        }}
      >
        {btnTitle}
      </button>
      <form
        ref={formRef}
        className={`add-card ${addCard ? "show" : "hide"}`}
        onKeyDown={(e) => (e.key === "Escape" ? setAddCard(false) : null)}
        onSubmit={(e) => {
          e.preventDefault();
          if (todo.trim() === "") {
            setErrorMsg(true);
          } else {
            setErrorMsg(false);
            addHandler(e);
          }

          inputRef.current?.focus();
        }}
      >
        <input
          ref={inputRef}
          type="input"
          value={todo}
          onChange={(e) => {
            if (e.target.value.trim() !== "") {
              setErrorMsg(false);
            }
            setTodo(e.target.value);
          }}
          placeholder={placeholder}
          className="add-card__input"
        />
        {errorMsg && (
          <span>
            <p className="error">Enter a title</p>
          </span>
        )}
        <div className="add-card__btn-group">
          <button className="add-card__btn add-card__submit" type="submit">
            ADD
          </button>
          <button
            className="add-card__btn add-card__cancel"
            type="reset"
            onClick={() => setAddCard(false)}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCardInput;

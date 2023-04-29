import React, { useRef, useState } from "react";
import "./styles.css";

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

  return (
    <>
      {/* {addCard ? ( */}
      <form
        ref={formRef}
        className="add-card"
        onSubmit={(e) => {
          addHandler(e);
          inputRef.current?.focus();
        }}
      >
        <input
          ref={inputRef}
          onBlur={() => setAddCard(false)}
          type="input"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder={placeholder}
          className={`add-card__input ${addCard ? "show" : "hide"}`}
        ></input>

        <div className="add-card__btn-group">
          <button
            className={`add-card__btn ${!addCard ? "" : "add-card__submit"}`}
            type="submit"
            onClick={() => setAddCard(true)}
          >
            {btnTitle}
          </button>
          <button
            className={`add-card__btn add-card__cancel ${
              addCard ? "show" : "hide"
            }`}
            type="submit"
            onClick={() => setAddCard(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default AddCardInput;

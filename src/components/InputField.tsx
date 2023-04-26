import React, { useRef } from "react";
import "./styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addHandler: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, addHandler }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        addHandler(e);
        inputRef.current?.blur();
        inputRef.current?.focus();

        console.log(e);
      }}
    >
      <input
        ref={inputRef}
        type="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter A task"
        className="input__box"
      ></input>
      <button className="input__submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;

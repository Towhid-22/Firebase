import React, { useEffect, useState } from "react";
import { use } from "react";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  remove,
} from "firebase/database";

const App = () => {
  let [inputValue, setinputValue] = useState("");
  let [emptyInput, setemptyInput] = useState("");
  let [allTask, setallTask] = useState([]);
  const db = getDatabase();
  let inputText = (e) => {
    setinputValue(e.target.value);
    setemptyInput("");
  };
  let submitBtn = (e) => {
    e.preventDefault();
    if (!inputValue) {
      setemptyInput("Value is required");
    } else {
      set(push(ref(db, "TodoList/")), {
        name: inputValue,
      }).then(() => {
        setinputValue("");
      });
    }
  };

  // read
  useEffect(() => {
    const starCountRef = ref(db, "TodoList/");
    onValue(starCountRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push({ ...item.val(), id: item.key });
      });
      setallTask(array);
    });
  }, []);

  // delete data
  let handleRemove = (id) => {
    remove(ref(db, "TodoList/" + id));
  };
  return (
    <div className="container">
      <div className="flex justify-center items-center h-screen">
        <div>
          <div className="bg-white w-[500px] text-center shadow-[0px_3px_15px_0px_rgba(0,0,0,0.40)] py-10 rounded">
            <h1 className="text-[36px] font-semibold font-oswald">
              To Do List
            </h1>
            <form action="">
              <div className="flex justify-between items-center px-8 mt-5">
                <input
                  onChange={inputText}
                  className="w-full mr-3 rounded p-2 bg-gray-100 focus:outline-none"
                  type="text"
                  placeholder="Write Text"
                  value={inputValue}
                />
                <button
                  onClick={submitBtn}
                  className="bg-blue-600 px-3 py-2 rounded text-white font-semibold"
                >
                  Add
                </button>
              </div>
              {emptyInput && (
                <p className="text-left px-8 mt-5">Value is required</p>
              )}
            </form>
            <ul className="text-left px-8">
              {allTask.map((item, index) => (
                <li className="mt-5 flex justify-between">
                  <div>
                    <span>{index + 1}. </span>
                    {item.name}
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-500 px-3 py-2 rounded text-white font-semibold"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

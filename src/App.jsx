import React, { useEffect, useState } from "react";
import { use } from "react";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  remove,
  update,
} from "firebase/database";

const App = () => {
  let [inputValue, setinputValue] = useState("");
  let [updateInputValue, setUpdateInputValue] = useState("");
  let [emptyInput, setemptyInput] = useState("");
  let [allTask, setallTask] = useState([]);
  let [editModal, setEditModal] = useState(false);
  let [id, setId] = useState(null);
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

  let handleEditModal = (id) => {
    setId(id);
    setEditModal(true);
  };

  let handleUpdate = () => {
    update(ref(db, "TodoList/" + id), {
      name: updateInputValue,
    });
    setEditModal(false);
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
                  <div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="bg-red-500 px-3 py-2 rounded text-white font-semibold"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleEditModal(item.id)}
                      className="bg-green-500 px-3 py-2 ml-3 rounded text-white font-semibold"
                    >
                      Edit
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {editModal && (
              <div className="bg-white shadow-md shadow-red-300 rounded-lg p-6 w-[500px] h-[300px]">
                <input
                  onChange={(e) => setUpdateInputValue(e.target.value)}
                  className="w-full mr-3 rounded p-2 bg-gray-100 focus:outline-none"
                  type="text"
                  placeholder="Update task"
                />
                <div className="text-left">
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-600 px-3 py-2 rounded text-white font-semibold mt-3 mr-2 "
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditModal(false)}
                    className="bg-blue-600 px-3 py-2 rounded text-white font-semibold mt-3"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

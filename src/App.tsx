import React, { useState, useCallback, useEffect } from "react";
import { Form } from "./form";
import "./App.css";
import { InputType } from "./FormType";
function App() {
  const [jsonData, setJsonData] = useState<InputType[]>();
  const [editJsonData, seteditJsonData] = useState<InputType>();
  const [type, setType] = useState<"text" | "button">("text");
  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    if (editJsonData) {
      setType(editJsonData.type);
      setName(editJsonData.name ? editJsonData.name : "");
      setId(editJsonData.id ? editJsonData.id : "");
      setLabel(editJsonData.label ? editJsonData.label : "");
    }
  }, [editJsonData]);
  const resetForm = useCallback(() => {
    setType("text");
    setName("");
    setId("");
    setLabel("");
    seteditJsonData(undefined);
  }, []);
  const AddToJson = useCallback(() => {
    const INPUT_JSON: InputType[] = [];
    if (editJsonData?.index !== undefined) {
      if (editJsonData.index > -1) {
        setJsonData((prev) => {
          let newJson: InputType[] = [];
          prev?.map((k, i) => {
            if (i == editJsonData.index) {
              newJson?.push({ type, name, id, label });
            } else {
              newJson?.push(k);
            }
          });
          return newJson;
        });
      }
    } else {
      if (jsonData) INPUT_JSON.push(...jsonData);
      INPUT_JSON.push({ type, name, id, label });
      setJsonData(INPUT_JSON);
    }
    resetForm();
  }, [setJsonData, resetForm, editJsonData, jsonData, type, name, id, label]);

  return (
    <div className="App">
      <div className="flex mb-4">
        <div className="w-1/2 flex  items-center flex-col">
          <div className="max-w-sm rounded overflow-hidden shadow-lg p-3">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                Add|Edit form element
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-type"
                >
                  input type
                </label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-type"
                  // defaultValue={"text"}
                  value={type ? type : "text"}
                  onChange={(e) =>
                    setType(e.currentTarget.value as "text" | "button")
                  }
                >
                  <option value={"text"}>Text</option>
                  <option value={"button"}>Button</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-label"
                >
                  label
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-label"
                  type="text"
                  value={label ? label : ""}
                  onChange={(e) => setLabel(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-label"
                >
                  ID
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-label"
                  type="text"
                  value={id ? id : ""}
                  onChange={(e) => setId(e.currentTarget.value)}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-name"
                >
                  name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-name"
                  type="text"
                  value={name ? name : ""}
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6 items-center flex-col">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => AddToJson()}
              >
                {editJsonData?.index === undefined ? "Add" : "Edit"}
              </button>
            </div>
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-type"
              >
                JSON CODE
              </label>

              <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                value={jsonData ? JSON.stringify(jsonData) : ""}
                onChange={(e) => {
                  try {
                    setJsonData(JSON.parse(e.currentTarget.value));
                  } catch (ex) {
                    console.log(ex);
                  }
                }}
                rows={6}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="w-1/2 ">
          <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Your Form</div>
            </div>

            {jsonData ? (
              <Form
                Prop={jsonData}
                setJsonData={setJsonData}
                seteditJsonData={seteditJsonData}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

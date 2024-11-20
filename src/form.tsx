import React, { useState, useCallback } from "react";
import { JsonProp, InputType } from "./FormType";

import { MdEditDocument, MdDeleteForever } from "react-icons/md";
export const Form: React.FunctionComponent<JsonProp> = ({
  Prop,
  setJsonData,
  seteditJsonData,
}) => {
  const removeItem = useCallback(
    (index: number) => {
      if (index > -1) {
        setJsonData((prev) => {
          let newJson: InputType[] = [];
          prev?.map((k, i) => {
            if (i != index) newJson?.push(k);
          });
          return newJson;
        });
      }
    },
    [setJsonData]
  );
  const editItem = useCallback(
    (index: number) => {
      if (index > -1) {
        Prop?.map((k, i) => {
          if (i == index) seteditJsonData({ ...k, index: i });
        });
      }
    },
    [Prop]
  );
  return (
    <>
      {Prop.map((inpt, index) => (
        <div key={index} className="flex flex-row items-center">
          {inpt.type == "text" ? (
            <div  className="w-full  px-3 mb-6 md:mb-0">
              {inpt?.label ? (
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-label"
                >
                  {inpt?.label}
                </label>
              ) : null}
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                name={inpt?.name ? inpt.name : ""}
                id={inpt?.id}
              />
            </div>
          ) : inpt.type == "button" ? (
            <div  className="w-full  px-3 mb-6 md:mb-0">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                id={inpt?.id}
                name={inpt?.name ? inpt.name : ""}
              >
                {inpt?.label ? inpt.label : null}
              </button>
            </div>
          ) : null}

          <MdEditDocument className="text-green-600 cursor-pointer w-5 h-5" onClick={() => editItem(index)} />
          <MdDeleteForever className="text-red-600 cursor-pointer w-5 h-5" onClick={() => removeItem(index)} />
        </div>
      ))}
    </>
  );
};

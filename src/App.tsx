import React, { useState, useEffect } from "react";
import { InputType } from "./FormType";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  ModuleRegistry,
  // RowSelectionOptions,
} from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

// const gridDiv = document.querySelector("#myGrid");

// const rowSelection: RowSelectionOptions = {
//   mode: "multiRow",
//   headerCheckbox: false,
// };

function App() {
  const [jsonData, setJsonData] = useState<InputType>();
  const [pagination, setPagination] = useState<boolean>(false);
  // const [type, setType] = useState<"text" | "button">("text");
  // const [name, setName] = useState<string>("");
  // const [id, setId] = useState<string>("");
  // const [label, setLabel] = useState<string>("");

  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>();

  useEffect(() => {
    if (jsonData) {
      if (jsonData?.columns) {
        jsonData.columns.forEach((col) => (col.headerName = col.title));
        jsonData?.columns ? setColumnDefs(jsonData.columns) : setColumnDefs([]);
      }

      jsonData?.pagination
        ? setPagination(jsonData.pagination)
        : setPagination(false);
    }
  }, [jsonData]);
  return (
    <div>
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
              if (JSON.parse(e.currentTarget.value)?.Entity !== undefined)
                setJsonData(
                  JSON.parse(e.currentTarget.value)?.Entity as InputType
                );
            } catch (ex) {
              console.log(ex);
            }
          }}
          rows={6}
        ></textarea>
      </div>

      <div className={"ag-theme-quartz"} style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          // rowSelection={rowSelection}
          pagination={pagination}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
        />
      </div>
    </div>
  );
}

export default App;

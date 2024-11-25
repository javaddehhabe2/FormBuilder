import React, { useMemo, useState, useEffect, useCallback } from "react";
import { InputType, column } from "./FormType";
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

function App() {
  const [jsonData, setJsonData] = useState<InputType>();
  const [pagination, setPagination] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [selectedColumn, setSelectedColumn] = useState<column>();

  const [selectedGrid, setSelectedGrid] = useState<
    { title: string } | undefined
  >();

  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>();

  useEffect(() => {
    if (jsonData) {
      if (jsonData?.columns) {
        jsonData.columns.forEach((col) => (col.headerName = col.title));
        // jsonData.columns.forEach((col) => (col.sortable = false));

        jsonData?.columns
          ? setColumnDefs(
              [...jsonData.columns].map((object) => ({
                ...object,
              }))
            )
          : setColumnDefs([]);
      }

      jsonData?.pagination
        ? setPagination(jsonData.pagination)
        : setPagination(false);
    }
  }, [jsonData]);

  const HeaderClick = useCallback(
    (e: any) => {
      setSelectedGrid(undefined);
      if (jsonData) {
        jsonData.columns.forEach((col: column, index) => {
          if (col.field == e?.column?.colId) {
            setSelectedColumn(col);
            setSelectedIndex(index);
          }
        });
      }
    },
    [jsonData]
  );

  const gridClick = useCallback(() => {
    if (jsonData) {
      setSelectedGrid({ title: jsonData.title ? jsonData.title : "" });

      setSelectedColumn(undefined);
      setSelectedIndex(undefined);
    }
  }, [jsonData]);

  useEffect(() => {
    let pp = { ...jsonData };
    if (pp?.columns && selectedIndex !== undefined && selectedColumn)
      pp.columns[selectedIndex] = selectedColumn;
    setJsonData(pp as InputType);
  }, [selectedColumn]);

  useEffect(() => {
    let pp = { ...jsonData };
    if (pp?.title) pp.title = selectedGrid?.title;
    setJsonData(pp as InputType);
  }, [selectedGrid]);

  const changeInput = (key: string, val: string) => {
    let p = { ...selectedColumn };
    switch (key) {
      case "columnID":
        if (p) p.columnID = Number(val);
        break;
      case "ColumnType":
        if (p) p.ColumnType = Number(val);
        break;
      case "headerName":
        if (p) p.headerName = val;
        break;
      case "title":
        if (p) p.title = val;
        break;
      case "field":
        if (p) p.field = val;
        break;
      case "align":
        if (p) p.align = val;
        break;
      case "sortable":
        if (p) p.sortable = val.toLowerCase() === "true" ? false : true;
        break;
      case "IsVisible":
        if (p) p.IsVisible = val.toLowerCase() === "true" ? false : true;
        break;
      case "width":
        if (p) p.width = Number(val);
        break;
      case "FalseText":
        if (p) p.FalseText = val;
        break;
      case "TrueText":
        if (p) p.TrueText = val;
        break;
      case "deltaWidth":
        if (p) p.deltaWidth = Number(val);
        break;
      case "boxWidth":
        if (p) p.boxWidth = Number(val);
        break;
      case "cellClass":
        if (p) p.cellClass = val;
        break;
      case "OrderId":
        if (p) p.OrderId = Number(val);
        break;
    }

    setSelectedColumn(p);
  };
  const changeInputGrid = (val: string) => {
    let p = selectedGrid?.title ? { title: selectedGrid.title } : undefined;
    p?.title ? (p.title = val ? val : "") : console.log(2);
    if (p) setSelectedGrid(p);
  };
  return (
    <div className="flex flex-row">
      <div>
        {selectedColumn ? (
          Object.entries(selectedColumn).map(([key, value]) => {
            return (
              <div key={key} className="w-full  px-3 mb-6 md:mb-0 flex gap-3">
                {["false", "true"].includes(value.toString()) ? (
                  <>
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-label"
                    >
                      {key.toString()}
                    </label>
                    <input
                      type="checkbox"
                      name={value.toString() ? value.toString() : ""}
                      id={key.toString()}
                      value={value.toString() ? value.toString() : ""}
                      checked={value ? value : false}
                      onChange={(e) => changeInput(key, e.currentTarget.value)}
                    />
                  </>
                ) : (
                  <>
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-label"
                    >
                      {key.toString()}
                    </label>
                    <input
                      className="border-2"
                      type="text"
                      onChange={(e) => changeInput(key, e.currentTarget.value)}
                      name={value.toString() ? value.toString() : ""}
                      id={key.toString()}
                      value={value.toString() ? value.toString() : ""}
                    />
                  </>
                )}
              </div>
            );
          })
        ) : selectedGrid ? (
          <div className="w-full  px-3 mb-6 md:mb-0 flex gap-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-label"
            >
              title
            </label>
            <input
              className="border-2"
              type="text"
              onChange={(e) => changeInputGrid(e.currentTarget.value)}
              name={
                selectedGrid.title.toString()
                  ? selectedGrid.title.toString()
                  : ""
              }
              value={
                selectedGrid.title.toString()
                  ? selectedGrid.title.toString()
                  : ""
              }
            />
          </div>
        ) : null}

        {/* <Form setJsonData={setJsonData} headerIndex={selectedIndex} Prop={selectedColumn} jsonData={jsonData} /> */}
      </div>
      <div className="flex flex-col">
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
                let jj =
                  JSON.parse(e.currentTarget.value)?.Entity !== undefined
                    ? {
                        ...JSON.parse(e.currentTarget.value)?.Entity,
                      }
                    : JSON.parse(e.currentTarget.value) !== undefined
                    ? {
                        ...JSON.parse(e.currentTarget.value),
                      }
                    : null;

                if (jj) {
                
                  setJsonData(jj);
                }
              } catch (ex) {
                console.log(ex);
              }
            }}
            rows={6}
          ></textarea>
        </div>

        <div
          className={"ag-theme-quartz"}
          style={{ height: 500 }}
          onClick={(e) => gridClick()}
        >
          <h1>{jsonData?.title ? jsonData.title : ""}</h1>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            // rowSelection={rowSelection}
            pagination={pagination}
            // defaultColDef={defaultColDef}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 25, 50]}
            onColumnHeaderClicked={(e) => HeaderClick(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

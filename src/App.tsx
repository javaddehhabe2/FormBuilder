import React, { useMemo, useState, useEffect, useCallback } from "react";
import { InputType, column, ProductType } from "./FormType";
import { Filter, Rules, FilterTypes } from "./FilterType";
// import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
// import {
//   ColDef,
//   ModuleRegistry,
//   // RowSelectionOptions,
// } from "@ag-grid-community/core";
import { HeaderColumn, Row_data } from "./data";
import { AgGridReact } from "@ag-grid-community/react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  ModuleRegistry,
  GridReadyEvent,
  FilterChangedEvent,
  FilterModifiedEvent,
  IProvidedFilter,
  FilterOpenedEvent,
} from "@ag-grid-community/core";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  SetFilterModule,
]);

// ModuleRegistry.registerModules([ClientSideRowModelModule]);

function App() {
  const [jsonData, setJsonData] = useState<InputType>(HeaderColumn);
  const [pagination, setPagination] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [selectedColumn, setSelectedColumn] = useState<column>();

  const [filterJson, setFilterJson] = useState<Filter>();

  const [selectedGrid, setSelectedGrid] = useState<
    | {
        title: string;
        pagination: string;
        singleSelect: string;
        dragableColumn: string;
        EnableInsert: string;
        showFooter: string;
      }
    | undefined
  >();

  const [rowData, setRowData] = useState<ProductType[]>([]);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>();

  const StringToBoolean = useCallback((str: string) => {
    return str
      ? str.toString().toLowerCase() === "true"
        ? true
        : false
      : false;
  }, []);

  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      setRowData(Row_data as ProductType[]);
      // fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      //   .then((resp) => resp.json())
      //   .then((data: IOlympicData[]) => setRowData(data));
    },
    [Row_data]
  );

  useEffect(() => {
    if (jsonData) {
      if (jsonData?.columns) {
        jsonData.columns.forEach((col) => (col.headerName = col.title));

        jsonData?.columns
          ? setColumnDefs(
              [...jsonData.columns].map((object) => ({
                ...object,
                filter: "agTextColumnFilter",
                floatingFilterComponentParams: {},
                suppressFloatingFilterButton: true,
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
      setSelectedGrid({
        title: jsonData.title ? jsonData.title : "",
        pagination: jsonData.pagination
          ? jsonData.pagination.toString()
          : "false",
        singleSelect: jsonData.singleSelect
          ? jsonData.singleSelect.toString()
          : "false",
        dragableColumn: jsonData.dragableColumn
          ? jsonData.dragableColumn.toString()
          : "false",
        EnableInsert: jsonData.EnableInsert
          ? jsonData.EnableInsert.toString()
          : "false",
        showFooter: jsonData.showFooter
          ? jsonData.showFooter.toString()
          : "false",
      });

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
    if (selectedGrid) {
      let pp = { ...jsonData };
      pp?.title
        ? (pp.title = selectedGrid?.title)
        : (pp["title"] = selectedGrid?.title);
      pp?.pagination
        ? (pp.pagination = StringToBoolean(selectedGrid.pagination))
        : (pp["pagination"] = StringToBoolean(selectedGrid.pagination));
      pp?.singleSelect
        ? (pp.singleSelect = StringToBoolean(selectedGrid?.singleSelect))
        : (pp["singleSelect"] = StringToBoolean(selectedGrid?.singleSelect));
      pp?.dragableColumn
        ? (pp.dragableColumn = StringToBoolean(selectedGrid?.dragableColumn))
        : (pp["dragableColumn"] = StringToBoolean(
            selectedGrid?.dragableColumn
          ));
      pp?.EnableInsert
        ? (pp.EnableInsert = StringToBoolean(selectedGrid?.EnableInsert))
        : (pp["EnableInsert"] = StringToBoolean(selectedGrid?.EnableInsert));
      pp?.showFooter
        ? (pp.showFooter = StringToBoolean(selectedGrid?.showFooter))
        : (pp["showFooter"] = StringToBoolean(selectedGrid?.showFooter));

      setJsonData(pp as InputType);
    }
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
        if (p) p.sortable = StringToBoolean(val) ? false : true;
        break;
      case "IsVisible":
        if (p) p.IsVisible = StringToBoolean(val) ? false : true;
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

  const changeInputGrid = (key: string, val: string) => {
    let p = { ...selectedGrid };
    switch (key) {
      case "title":
        if (p) p.title = val;
        break;
      case "pagination":
        if (p) p.pagination = StringToBoolean(val) ? "false" : "true";
        break;
      case "singleSelect":
        if (p) p.singleSelect = StringToBoolean(val) ? "false" : "true";
        break;
      case "dragableColumn":
        if (p) p.dragableColumn = StringToBoolean(val) ? "false" : "true";
        break;
      case "EnableInsert":
        if (p) p.EnableInsert = StringToBoolean(val) ? "false" : "true";
        break;
      case "showFooter":
        if (p) p.showFooter = StringToBoolean(val) ? "false" : "true";
        break;
    }

    setSelectedGrid({
      title: p.title ? p.title : "",
      pagination: p.pagination ? p.pagination : "false",
      singleSelect: p.singleSelect ? p.singleSelect : "false",
      dragableColumn: p.dragableColumn ? p.dragableColumn : "false",
      EnableInsert: p.EnableInsert ? p.EnableInsert : "false",
      showFooter: p.showFooter ? p.showFooter : "false",
    });
  };

  const onChangeTXT = useCallback(
    (val: string) => {
      try {
        let jj =
          JSON.parse(val)?.Entity !== undefined
            ? {
                ...JSON.parse(val)?.Entity,
              }
            : JSON.parse(val) !== undefined
            ? {
                ...JSON.parse(val),
              }
            : null;

        if (jj) {
          setJsonData(jj);
          if (selectedGrid) {
            setSelectedGrid({
              title: jj.title ? jj.title : "",
              pagination: jj.pagination ? jj.pagination : "false",
              singleSelect: jj.singleSelect ? jj.singleSelect : "false",
              dragableColumn: jj.dragableColumn ? jj.dragableColumn : "false",
              EnableInsert: jj.EnableInsert ? jj.EnableInsert : "false",
              showFooter: jj.showFooter ? jj.showFooter : "false",
            });
          } else if (selectedColumn) {
            if (jj?.columns && selectedIndex !== undefined && selectedColumn)
              setSelectedColumn(jj.columns[selectedIndex]);
          }
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    [selectedGrid, selectedColumn, selectedIndex]
  );

  const onFilterChanged = useCallback((e: FilterChangedEvent) => {
    console.log("onFilterChanged", e);
    console.log(
      "gridRef.current!.api.getFilterModel() =>",
      e.api.getFilterModel()
    );
    const temp = e.api.getFilterModel();
    let _tmp: Rules[]=[];
      Object.entries(temp).map(([key, value]) => {
      const rule = {
        field: key,
        op: value.type,
        value: value.filter,
      };
      _tmp.push(rule);
    });
    setFilterJson({
      filter: {
        groupOp: "",
        groups: [],
        rules: _tmp,
      },
      initializefilter: {
        groupOp: "",
        groups: [],
        rules: [],
      },
    });
  }, []);

  return (
    <div className="flex flex-row pt-5">
      <div>
        {selectedColumn ? (
          <table className="w-full text-left table-auto min-w-max">
            <tbody>
              {Object.entries(selectedColumn).map(([key, value]) => {
                return (
                  <tr key={key} className="h-9">
                    {["false", "true"].includes(value.toString()) ? (
                      <>
                        <td className="p-4 border border-blue-gray-50">
                          <label
                            className="text-gray-700 text-xs font-bold"
                            htmlFor="grid-label"
                          >
                            {key.toString()}
                          </label>
                        </td>
                        <td className="p-4 border border-blue-gray-50  font-bold">
                          <input
                            type="checkbox"
                            name={value.toString() ? value.toString() : ""}
                            id={key.toString()}
                            value={value.toString() ? value.toString() : ""}
                            checked={value ? value : false}
                            onChange={(e) =>
                              changeInput(key, e.currentTarget.value)
                            }
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-2 border border-blue-gray-50">
                          <label
                            className=" text-gray-700 text-xs font-bold"
                            htmlFor="grid-label"
                          >
                            {key.toString()}
                          </label>
                        </td>
                        <td className="border border-blue-gray-50">
                          <input
                            className=""
                            type="text"
                            onChange={(e) =>
                              changeInput(key, e.currentTarget.value)
                            }
                            name={value.toString() ? value.toString() : ""}
                            id={key.toString()}
                            value={value.toString() ? value.toString() : ""}
                          />
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : selectedGrid ? (
          <table className="w-full text-left table-auto min-w-max">
            <tbody>
              {Object.entries(selectedGrid).map(([key, value]) => {
                return (
                  <tr key={key} className="h-9">
                    {["false", "true"].includes(value.toString()) ? (
                      <>
                        <td className="p-4 border border-blue-gray-50">
                          <label
                            className="text-gray-700 text-xs font-bold"
                            htmlFor="grid-label"
                          >
                            {key.toString()}
                          </label>
                        </td>
                        <td className="p-4 border border-blue-gray-50  font-bold">
                          <input
                            type="checkbox"
                            name={value.toString() ? value.toString() : ""}
                            id={key.toString()}
                            value={value.toString() ? value.toString() : ""}
                            checked={StringToBoolean(value)}
                            onChange={(e) =>
                              changeInputGrid(key, e.currentTarget.value)
                            }
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-2 border border-blue-gray-50">
                          <label
                            className=" text-gray-700 text-xs font-bold"
                            htmlFor="grid-label"
                          >
                            {key.toString()}
                          </label>
                        </td>
                        <td className="border border-blue-gray-50">
                          <input
                            className=""
                            type="text"
                            onChange={(e) =>
                              changeInputGrid(key, e.currentTarget.value)
                            }
                            name={value.toString() ? value.toString() : ""}
                            id={key.toString()}
                            value={value.toString() ? value.toString() : ""}
                          />
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}

        {/* <Form setJsonData={setJsonData} headerIndex={selectedIndex} Prop={selectedColumn} jsonData={jsonData} /> */}
      </div>
      <div className="flex flex-col flex-grow">
        <div
          className={"ag-theme-quartz"}
          style={{ height: 200 }}
          onClick={(e) => gridClick()}
        >
          <h1 className="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug !mb-4 text-primary lg:!text-3xl">
            {jsonData?.title ? jsonData.title : ""}
          </h1>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            // rowSelection={rowSelection}
            pagination={pagination}
            // defaultColDef={defaultColDef}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 25, 50]}
            onColumnHeaderClicked={(e) => HeaderClick(e)}
            onGridReady={onGridReady}
            onFilterChanged={onFilterChanged}
          />
        </div>
        <div className="flex">
        <div className="w-[50%] px-3 mt-20">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2"
            htmlFor="grid-type"
          >
            JSON CODE
          </label>

          <textarea
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            value={jsonData ? JSON.stringify(jsonData) : ""}
            onChange={(e) => onChangeTXT(e.currentTarget.value)}
            rows={15}
          ></textarea>
        </div>
        <div className="w-[50%] px-3 mt-20">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2"
            htmlFor="grid-types"
          >
            Filter CODE
          </label>

          <textarea
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            value={filterJson ? JSON.stringify(filterJson) : ""}
            onChange={(e) => console.log(e)}
            rows={15}
          ></textarea>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;

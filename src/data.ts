export const HeaderColumn = {
  title: "موجودی",
  fit: true,
  pagination: true,
  rownumbers: true,
  singleSelect: true,
  dragableColumn: true,
  WindowWidth: 800,
  WindowHeight: 400,
  EnableRemote: true,
  EnableSearch: true,
  DeleteConfirmMessage: "آیا مطمئن هستید ؟",
  EnableInsert: false,
  EnableUpdate: false,
  EnableDelete: false,
  EnableExport: true,
  EnableSecurity: true,
  DefaultPagingIndex: 1,
  sortName: "CreatedOn",
  sortOrder: 2,
  remoteFilter: true,
  EnableFilterBar: true,
  EnableHeaderContextMenu: true,
  IsLoad: true,
  Schema: "wms",
  EntityName: "ProductInventory",
  url: "/api/wms/ProductInventory/GetItems",
  SaveUrl: "/Home/Form?EntityName=ProductInventory&AdditionalDataKey=DataEntry",
  DeleteUrl: "/api/wms/ProductInventory/SaveChanges",
  ScriptFile: "/Scripts/entities/wms/ProductInventory.js",
  idField: "ProductInventoryID",
  IsSerialChanges: false,
  buttons: [],
  HelpButtons: [],
  columns: [
    {
      columnID: 2,
      title: "کد محصول",
      headerName: "کد محصول",
      field: "ProductCode",
      ColumnType: 4,
      align: "center",
      sortable: true,
      IsVisible: true,
      TrueText: "فعال",
      FalseText: "غیر فعال",
      width: 120,
      Editor: {},
      deltaWidth: 9,
      boxWidth: 111,
      cellClass: "datagrid-cell-c21-ProductCode",
      OrderId: 1,
    },
    {
      columnID: 11,
      title: "بارکد",
      headerName: "بارکد",
      field: "ProductBarcodeNumber",
      ColumnType: 4,
      align: "center",
      sortable: true,
      IsVisible: true,
      TrueText: "فعال",
      FalseText: "غیر فعال",
      width: 203,
      Editor: {},
      deltaWidth: 9,
      boxWidth: 194,
      cellClass: "datagrid-cell-c21-ProductBarcodeNumber",
      OrderId: 2,
    },
    {
      columnID: 1,
      title: "کالا",
      headerName : "کالا",
      field: "ProductName",
      ColumnType: 25,
      align: "center",
      sortable: true,
      IsVisible: true,
      TrueText: "فعال",
      FalseText: "غیر فعال",
      width: 337,
      Editor: {},
      deltaWidth: 9,
      boxWidth: 328,
      cellClass: "datagrid-cell-c21-ProductName",
      OrderId: 3,
    },
  ],
  PagerLookups: [],
  Serial: {
    condition: "",
    elseSerial: "",
  },
  EnableDynamicGrouping: true,

  showFooter: true,
};

export const Row_data = [
  {
    ProductCode: 1,
    ProductBarcodeNumber: 23,
    ProductName: "product 1",
  },
  {
    ProductCode: 9,
    ProductBarcodeNumber: 12,
    ProductName: "product 2",
  },
  {
    ProductCode: 5,
    ProductBarcodeNumber: 3,
    ProductName: "product 2",
  },
  {
    ProductCode: 7,
    ProductBarcodeNumber: 2,
    ProductName: "product 3",
  },
  {
    ProductCode: 10,
    ProductBarcodeNumber: 23,
    ProductName: "product 4",
  },
];

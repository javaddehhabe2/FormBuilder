export interface InputType {
  title?: string;
  fit?: boolean;
  pagination?: boolean;
  rownumbers?: boolean;
  singleSelect?: boolean;
  dragableColumn?: boolean;
  WindowWidth?: number;
  WindowHeight?: number;
  EnableRemote?: boolean;
  EnableSearch?: boolean;
  DeleteConfirmMessage?: string;
  EnableInsert?: boolean;
  EnableUpdate?: boolean;
  EnableDelete?: boolean;
  EnableExport?: boolean;
  EnableSecurity?: boolean;
  DefaultPagingIndex?: 1;
  sortName?: string;
  sortOrder?: 2;
  remoteFilter?: boolean;
  EnableFilterBar?: boolean;
  EnableHeaderContextMenu?: boolean;
  IsLoad?: boolean;
  Schema?: string;
  EntityName?: string;
  url?: string;
  SaveUrl?: string;
  DeleteUrl?: string;
  ScriptFile?: string;
  idField?: string;
  IsSerialChanges?: boolean;
  buttons?: [];
  HelpButtons?: [];
  columns: {
    columnID?: number;
    headerName?: string;
    title?: string;
    field?: string;
    ColumnType?: number;
    align?: string;
    sortable?: boolean;
    IsVisible?: boolean;
    TrueText?: string;
    FalseText?: string;
    width?: number;
    Editor?: {};
    deltaWidth?: number;
    boxWidth?: number;
    cellClass?: string;
    OrderId?: number;
  }[];

  PagerLookups?: [];
  Serial?: {
    condition?: string;
    elseSerial?: string;
    serial?: { serialPattern?: []; serialKey?: [] };
  };
  EnableDynamicGrouping?: boolean;
  AdditionalFilter?: {
    groupOp?: string;
    groups?: [];
    rules?: {
      field?: string;
      op?: string;
      value?: boolean;
      fieldtype?: string;
      catalogValueCode?: string;
    }[];
  };
  showFooter?: boolean;
}
export interface JsonProp {
  Prop?: InputType[];
  setJsonData?: React.Dispatch<React.SetStateAction<InputType[] | undefined>>;
  seteditJsonData?: React.Dispatch<React.SetStateAction<InputType | undefined>>;
}

export interface Filter {
  filter: {
    groupOp?: string;
    groups?: string[];
    rules?: Rules[];
  };
  initializefilter?: {
    groupOp?: string;
    groups?: string[];
    rules?: string[];
  };
}


export interface Rules {
  field?: string;
  op?: string;
  value?: string;
}
export interface FilterTypes {
  filterType: string;
  type: string;
  filter: string;
}

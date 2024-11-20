export interface InputType {
    index?:number;
    type: "text" | "button";
    id?: string;
    name?: string;
    label?: string;
  }
  export interface JsonProp {
    Prop: InputType[];
    setJsonData:React.Dispatch<React.SetStateAction<InputType[] | undefined>>;
    seteditJsonData:React.Dispatch<React.SetStateAction<InputType| undefined>>;
  }
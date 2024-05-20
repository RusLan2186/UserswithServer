

export interface ITodo{
   id:number;
   title:string;
}
export interface ITodoProps{
   todos:ITodo[]
   changeTodos:(todos:ITodo[]) => void;
 }
// export interface IError{
//   message: string;
//   e: string;

// }
declare interface SocketMsg {
  topic: string;
  data: any
}

declare type SocketHandler = (msg: SocketMsg) => void;
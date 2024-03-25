export type Count = {
  count: number,
  team: {
    id: number,
    name: string,
  }
};

export type SocketMsg<T = unknown> = {
  topic: string;
  data: T
}

export type SocketHandler = (msg: SocketMsg<any>) => void;

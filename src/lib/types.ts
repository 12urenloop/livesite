export type Count = {
  count: number,
  rank: number,
  team: {
    id: number,
    name: string,
  }
};

export type Position = {
  teamId: number;
  progress: number;
  speed: number;
}

export type SocketMsg<T = unknown> = {
  topic: string;
  data: T
}

export type SocketHandler = (msg: SocketMsg<any>) => void;

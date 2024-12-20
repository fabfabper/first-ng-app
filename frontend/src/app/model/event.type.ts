import { Rescuer } from './rescuer';

export type Event = {
  id: string;
  location: string;
  latitude: number;
  longitude: number;
  status: string;
  rescuers: Rescuer[];
};

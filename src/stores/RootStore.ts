import { StationStore } from './StationStore';
import { ScheduleStore } from './ScheduleStore';

export class RootStore {
  stationStore: StationStore;
  scheduleStore: ScheduleStore;

  constructor() {
    this.stationStore = new StationStore();
    this.scheduleStore = new ScheduleStore();
  }
}
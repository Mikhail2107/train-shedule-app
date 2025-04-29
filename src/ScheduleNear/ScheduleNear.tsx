
import './ScheduleNear.css';

import { observer } from 'mobx-react-lite';
import { rootStore } from '../stores';
import { useEffect } from 'react';

const ScheduleNear = observer(() => {
  const { scheduleStore, stationStore } = rootStore;

  useEffect(() => {
    if (stationStore.data?.stations?.[0]?.code) {
      scheduleStore.fetchSchedule(stationStore.data.stations[0].code);
    }
  }, [scheduleStore, stationStore.data]);

  return (
    <>
      <h1>Расписание электричек</h1>
    </>
  );
});

export default ScheduleNear;
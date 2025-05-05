
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

  console.log(scheduleStore.scheduleData?.segments)
  return (
    <>
      <h1>Расписание электричек</h1>
      <span>От {scheduleStore.scheduleData?.search.from.title} до {scheduleStore.scheduleData?.search.to.title}</span>
      {/* <p>{scheduleStore.scheduleData?.segments}</p> */}
    </>
  );
});

export default ScheduleNear;
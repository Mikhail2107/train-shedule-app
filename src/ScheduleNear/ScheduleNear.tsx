
import './ScheduleNear.css';

import { observer } from 'mobx-react-lite';
import { rootStore } from '../stores';
import { useEffect } from 'react';
import {format} from 'date-fns';

const ScheduleNear = observer(() => {
  const { scheduleStore, stationStore } = rootStore;

  useEffect(() => {
    if (stationStore.data?.stations?.[0]?.code) {
      scheduleStore.fetchSchedule(stationStore.data.stations[25].code);
    }
  }, [scheduleStore, stationStore.data]);

  console.log(scheduleStore.scheduleData?.segments[0])
  return (
    <>
      <h1>Расписание электричек</h1>
      <span>От {scheduleStore.scheduleData?.search.from.title} до {scheduleStore.scheduleData?.search.to.title}</span>
      <ul>
        {scheduleStore.scheduleData?.segments.map(el => (
          <li>
            <span>{format(el.departure, 'hh-mm') }- {format(el.arrival, 'hh-mm')}</span>
          </li>
        ))}
      </ul>
      
    </>
  );
});

export default ScheduleNear;
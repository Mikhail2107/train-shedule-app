import './ScheduleNear.css';
import { observer } from 'mobx-react-lite';
import { rootStore } from '../stores';
import { useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

const ScheduleNear = observer(() => {
  const { scheduleStore, stationStore } = rootStore;

  useEffect(() => {
    if (stationStore.data?.stations?.[0]?.code) {
      const fromCode = stationStore.data.stations[0].code;
      const toCode = fromCode === 's9612981' ? 's9613017' : 's9612981';
      scheduleStore.fetchSchedule(fromCode, toCode);
    }
  }, [scheduleStore, stationStore.data]);

  const timeNow = Date.now();
   
  const nearestTrains = scheduleStore.scheduleData?.segments
    ?.filter(train => new Date(train.departure).getTime() >= timeNow)
    .slice(0, 3)
    .sort((a, b) => 
      new Date(a.departure).getTime() - new Date(b.departure).getTime()
    );

  return (
    <div className="schedule-near-container">
      <h1>Расписание электричек</h1>
      
      {scheduleStore.scheduleData?.search && (
        <div className="schedule-near-route-info">
          <h2>
            Маршрут: {scheduleStore.scheduleData.search.from.title} →{' '}
            {scheduleStore.scheduleData.search.to.title}
          </h2>
          <p>Дата: {format(new Date(scheduleStore.scheduleData.search.date), 'PPPP', { locale: ru })}</p>
        </div>
      )}

      {scheduleStore.loading && <div className="loading">Загрузка расписания...</div>}

      {nearestTrains?.length ? (
        <ul className="schedule-near-train-list">
          <h3>Ближайшие рейсы:</h3>
          {nearestTrains.map((train, index) => (
            <li key={index} className="schedule-near-train-item">
              <div className="schedule-near-train-time">
                <span className="schedule-near-departure">
                  {format(parseISO(train.departure), 'HH:mm', { locale: ru })}
                </span>
                {' → '}
                <span className="schedule-near-arrival">
                  {format(parseISO(train.arrival), 'HH:mm', { locale: ru })}
                </span>
              </div>
              <div className="schedule-near-train-info">
                <span className="schedule-near-train-number">{train.thread.number}</span>
                <span className="schedule-near-train-title">{train.thread.title}</span>
                <span className="schedule-near-train-duration">
                  В пути: {Math.floor(train.duration / 60)} мин
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !scheduleStore.loading && <div className="schedule-near-no-trains">Нет доступных рейсов</div>
      )}

      {scheduleStore.error && (
        <div className="error">Ошибка: {scheduleStore.error}</div>
      )}
    </div>
  );
});

export default ScheduleNear;
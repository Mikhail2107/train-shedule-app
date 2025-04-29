import { Station, ApiResponse } from '../interfaces';
import './NearStationList.css';
import { observer } from 'mobx-react-lite';
import { rootStore } from '../stores';

interface NearStationListProps {
  data: ApiResponse;
}

const NearStationList = observer(({ data }: NearStationListProps) => {
  const { stationStore } = rootStore;
  console.log(stationStore)
  
  const travelTime = (distance:number, mode: number): string => {
    let hour:number | string = 0;
    let minutes:number | string = 0;
    const timeDistance = distance / mode;

    hour = timeDistance.toFixed(0);
    minutes = ((timeDistance % 1) * 60).toFixed(0);

    return `${hour}ч. ${minutes}мин.`
  }
  
  const stations = data?.stations;
  const nearestStation = stations?.[0];
  return (
    <div className='near-station-container'>
      <h1>Ближайшая станция</h1>
      <ul className='near-station-list__list'>        
      {nearestStation && <div className='near-station-list__near-station'>Ближайшая станция: {nearestStation.title}</div>}
        {data.stations.map((station: Station) => (
          <li key={station.code} className='near-station-list__item'>
            <h3 className='near-station-list__title'>{station.title}</h3>
            <span className='near-station-list__item-info station-type'>Тип: {station.station_type_name}</span>
            <span className='near-station-list__item-info station-distance'>Расстояние: {station.distance.toFixed(2)} км</span>
            
            <span className='near-station-list__item-info travel-time'>Время в пути  до станции:</span>
            <span className='near-station-list__item-info travel-walk'>Пешком:{travelTime(station.distance,5)}</span>
            <span className='near-station-list__item-info travel-run'>Бегом:{travelTime(station.distance,10)}</span>
            {station.majority<=2 && <span className='station-majority'>{station.code}</span>}
            {station.type_choices.suburban && (
              <a 
                href={station.type_choices.suburban.desktop_url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ marginRight: '10px' }}
              >
                Расписание электричек
              </a>
            )}
            
            {station.type_choices.train && (
              <a 
                href={station.type_choices.train.desktop_url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Расписание поездов
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default NearStationList;
import { Station, ApiResponse } from '../interfaces';
import './NearStationList.css';

interface NearStationListProps {
  data: ApiResponse;
}

const NearStationList = ({ data }: NearStationListProps) => {

  const travelTime = (distance:number, mode: number): string => {
    let hour:number | string = 0;
    let minutes:number | string = 0;
    const timeDistance = distance / mode;

    hour = timeDistance.toFixed(0);
    minutes = ((timeDistance % 1) * 60).toFixed(0);

    return `${hour}ч. ${minutes}мин.`
  }
  
  return (
    <div>
      <ul>
        {data.stations.map((station: Station) => (
          <li key={station.code} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
            <h3>{station.title}</h3>
            <p>Тип: {station.station_type_name}</p>
            <p>Расстояние: {station.distance.toFixed(2)} км</p>
            <p>Транспорт: {station.transport_type === 'train' ? 'Поезд' : station.transport_type}</p>
            <p>Время в пути  до станции:</p>
            <p>Пешком:{travelTime(station.distance,5)}</p>
            <p>Бегом:{travelTime(station.distance,10)}</p>
            {station.majority<=2 && <p>{station.code}</p>}
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
};

export default NearStationList;
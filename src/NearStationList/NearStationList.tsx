// import { toJS } from 'mobx';
import { Station } from '../interfaces/interfaces';
import './NearStationList.css';
import { observer } from 'mobx-react-lite';
import { rootStore } from '../stores';
import { Link } from 'react-router-dom';

// interface NearStationListProps {
//   data: ApiResponse;
// }

const NearStationList = observer(() => {
  const { stationStore } = rootStore;
  
  const travelTime = (distance:number, mode: number): string => {
    let hour:number | string = 0;
    let minutes:number | string = 0;
    const timeDistance = distance / mode;

    hour = timeDistance.toFixed(0);
    minutes = ((timeDistance % 1) * 60).toFixed(0);

    return `${hour}ч. ${minutes}мин.`
  }
  // const filterdStation = (arr: Station[]) => {
  //   return toJS(arr).filter(item => item.transport_type === 'train' && item.title.toLowerCase() != "Ростов-берег".toLowerCase());
  // };
  
  
  // const stations = data?.stations;
  // const filtredArr = (filterdStation(stations));
  // const nearestStation = filtredArr?.[0];
  const stations = stationStore.filteredStations;
  const nearestStation = stationStore.nearestFilteredStation;

  return (
    <div className='near-station-container'>
      <h1>Ближайшая станция </h1>
      {nearestStation?.type_choices?.suburban?.desktop_url && (
      <Link 
        className='near-station-list_link' 
        to={nearestStation.type_choices.suburban.desktop_url}
      >
        Ближайшая станция: {nearestStation.title}
      </Link>
    )}
      <ul className='near-station-list__list'>        
      
        {stations.map((station: Station, i: number) => (
          <li key={station.code} className='near-station-list__item'>
            <h3 className='near-station-list__title'>{station.title}</h3>
            <span className='near-station-list__item-info station-type'>Тип: {i}</span>
            <span className='near-station-list__item-info station-distance'>Расстояние: {station.distance.toFixed(2)} км</span>
            
            <span className='near-station-list__item-info travel-time'>Время в пути  до станции:</span>
            <span className='near-station-list__item-info travel-walk'>Пешком:{travelTime(station.distance,5)}</span>
            <span className='near-station-list__item-info travel-run'>Бегом:{travelTime(station.distance,10)}</span>
            {/* {station.code && <span className='station-majority'>{station.code}</span>}
            {station.majority && <span>{station.majority}</span>}
            {station.type && <span>{station.transport_type}</span>} */}
            {station.type_choices.suburban && (
              <a 
                href={station.type_choices.suburban.desktop_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="schedule__link"
              >
                Расписание электричек
              </a>
            )}
            
            {station.type_choices.train && (
              <a 
                href={station.type_choices.train.desktop_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="schedule__link"
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
import { observer } from 'mobx-react-lite';

import { rootStore } from '../stores';
import { Station } from '../interfaces/interfaces';

import './CheckStation.css';


const CheckStation = observer(() => {
  const { stationStore } = rootStore;
  const nearestStationList: Station[] | null = stationStore.filteredStations;

  console.log(nearestStationList)
    return (
      <>
      <h1>Выберите станции</h1>
      <ul className='checked-station__list'>
        {nearestStationList.map(station => (
          <li key={station.code} className='checked-station__item'>
            <span className='checked-station__title'>{station.title}</span>
          </li>
        ))}
      </ul>
      
      </>
    );
});

export default CheckStation;
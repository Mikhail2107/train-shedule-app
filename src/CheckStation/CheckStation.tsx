import { observer } from 'mobx-react-lite';
import {useState} from 'react';

import { rootStore } from '../stores';
import { Station } from '../interfaces/interfaces';

import './CheckStation.css';


const CheckStation = observer(() => {
  const { stationStore } = rootStore;
  const nearestStationList: Station[] | null = stationStore.filteredStations;
  const [favoriteStations, setFavoriteStations] = useState<Station[]>([])

  console.log(favoriteStations)

  const checkedStation = (id:string) => {
    nearestStationList.filter(station => {
      if (station.code === id) {
        setFavoriteStations(prev => [...prev, station])
      }
    })
  }
    return (
      <>
      <h1>Выберите станции</h1>
      <div className="checked__box">
        <ul className='checked-station__list'>
        {nearestStationList.map(station => (
          <li key={station.code} 
            className='checked-station__item'
            onClick={() => checkedStation(station.code)}>
            {station.title}
          </li>
        ))}
      </ul>
      </div>
     
      
      </>
    );
});

export default CheckStation;
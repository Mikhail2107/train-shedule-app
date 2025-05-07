import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NearStationList from '../NearStationList/NearStationList';
import ScheduleNear from '../ScheduleNear/ScheduleNear';
import MainPage from '../MainPage/MainPage';
import { rootStore } from '../stores';
import ErrorPage from '../ErrorPage/ErrorPage';
import CheckSation from '../CheckSation/CheckSation';

function App() {
  const { stationStore } = rootStore;

  if (stationStore.loading) return <div>Загрузка данных...</div>;
  if (stationStore.geolocationError) return <div>Ошибка геолокации: {stationStore.geolocationError}</div>;
  if (stationStore.error) return <div>Ошибка API: {stationStore.error}</div>;
  if (!stationStore.data || !stationStore.data.stations) return <div>Нет данных для отображения</div>;

  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} element={<MainPage />} />
          <Route path={'/nearest'} element={<NearStationList 
          // data={stationStore.data} 
          />}/>
          <Route path={'/schedule'} element={<ScheduleNear />} />
          <Route path={'/check-station'} element={<CheckSation />} />

          <Route path={'/*'} element={<ErrorPage />} />

        </Routes>
      </Router>      
    </>
  );
}

export default observer(App);
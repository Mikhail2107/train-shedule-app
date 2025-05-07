// App.tsx
import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NearStationList from '../NearStationList/NearStationList';
import ScheduleNear from '../ScheduleNear/ScheduleNear';
import MainPage from '../MainPage/MainPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import CheckStation from '../CheckSation/CheckSation';
import { rootStore } from '../stores';

const AppWrapper = observer(() => {
  const { stationStore } = rootStore;

  if (stationStore.loading) return <div>Загрузка данных...</div>;
  if (stationStore.geolocationError) return <div>Ошибка геолокации: {stationStore.geolocationError}</div>;
  if (stationStore.error) return <div>Ошибка API: {stationStore.error}</div>;
  if (!stationStore.data?.stations) return <div>Нет данных для отображения</div>;

  return <App />;
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/nearest" element={<NearStationList />} />
        <Route path="/schedule" element={<ScheduleNear />} />
        <Route path="/check-station" element={<CheckStation />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
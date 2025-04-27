import { useEffect, useState } from 'react';
import { ApiResponse } from '../interfaces';
import NearStationList from '../NearStationList/NearStationList';

const API_KEY = import.meta.env.VITE_API_KEY;
const URL_DEFAULT = 'https://api.rasp.yandex.net/v3.0/nearest_stations/';

function App() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [geolocationError, setGeolocationError] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        setGeolocationError("Не удалось получить геолокацию: " + error.message);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (latitude === null || longitude === null) return;

    const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
    const URL = encodeURIComponent(
      `${URL_DEFAULT}?apikey=${API_KEY}&format=json&lat=${latitude}&lng=${longitude}&distance=5&lang=ru_RU`
    );

    fetch(CORS_PROXY + URL)
      .then(response => {
        if (!response.ok) throw new Error('Ошибка сети');
        return response.json();
      })
      .then((data: ApiResponse) => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [latitude, longitude]);

  const stations = data?.stations;
  const nearestStation = stations?.[0];


  if (loading) return <div>Загрузка данных...</div>;
  if (geolocationError) return <div>Ошибка геолокации: {geolocationError}</div>;
  if (error) return <div>Ошибка API: {error}</div>;
  if (!data || !data.stations) return <div>Нет данных для отображения</div>;

  return (
    <>
      {nearestStation && <div>Ближайшая станция: {nearestStation.title}</div>}
      <NearStationList data={data} />
    </>
  );
}

export default App;
import { useEffect, useState } from 'react';
const API_KEY = import.meta.env.VITE_API_KEY;

interface StationTypeChoices {
  suburban?: {
    desktop_url: string;
    touch_url: string;
  };
  tablo?: {
    desktop_url: string;
    touch_url: string;
  };
  train?: {
    desktop_url: string;
    touch_url: string;
  };
}

interface Station {
  type: string;
  title: string;
  short_title: string;
  popular_title: string;
  code: string;
  lat: number;
  lng: number;
  station_type: string;
  station_type_name: string;
  transport_type: string;
  distance: number;
  majority: number;
  type_choices: StationTypeChoices;
}

interface Pagination {
  total: number;
  limit: number;
  offset: number;
}

interface ApiResponse {
  pagination: Pagination;
  stations: Station[];
}

function App() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [geolocationError, setGeolocationError] = useState<string | null>(null);
  const URL_DEFAULT = 'https://api.rasp.yandex.net/v3.0/nearest_stations/';
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Исправлено: latitude - это position.coords.latitude
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
    if (latitude === null || longitude === null) return; // Ждем получения координат

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

  if (loading) return <div>Загрузка данных...</div>;
  if (geolocationError) return <div>Ошибка геолокации: {geolocationError}</div>;
  if (error) return <div>Ошибка API: {error}</div>;
  if (!data || !data.stations) return <div>Нет данных для отображения</div>;

  return (
    <div>
      <ul>
        {data.stations.map(station => (
          <li key={station.code} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
            <h3>{station.title}</h3>
            <p>Тип: {station.station_type_name}</p>
            <p>Расстояние: {station.distance.toFixed(2)} км</p>
            <p>Транспорт: {station.transport_type === 'train' ? 'Поезд' : station.transport_type}</p>
            
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
}

export default App;
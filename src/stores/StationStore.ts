import { makeAutoObservable, runInAction, computed } from 'mobx';
import { toJS } from 'mobx';
import { ApiResponse, Station } from '../interfaces/interfaces';

const API_KEY = import.meta.env.VITE_API_KEY;
const URL_DEFAULT = 'https://api.rasp.yandex.net/v3.0/';

export class StationStore {
  data: ApiResponse | null = null;
  loading = true;
  error: string | null = null;
  geolocationError: string | null = null;
  longitude: number | null = null;
  latitude: number | null = null;

  constructor() {
    makeAutoObservable(this, {
      filteredStations: computed,      // Помечаем как вычисляемое свойство
      nearestFilteredStation: computed // И это тоже
    });
    this.initGeolocation();
  }

  async initGeolocation() {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      
      runInAction(() => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
      
      await this.fetchNearestStations();
    } catch (error) {
      runInAction(() => {
        this.geolocationError = "Не удалось получить геолокацию: " + (error as Error).message;
        this.loading = false;
      });
    }
  }

  async fetchNearestStations() {
    if (this.latitude === null || this.longitude === null) return;

    try {
      const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
      const URL = encodeURIComponent(
        `${URL_DEFAULT}nearest_stations/?apikey=${API_KEY}&format=json&lat=${this.latitude}&lng=${this.longitude}&distance=10&lang=ru_RU`
      );

      const response = await fetch(CORS_PROXY + URL);
      if (!response.ok) throw new Error('Ошибка сети');
      
      const data: ApiResponse = await response.json();
      
      runInAction(() => {
        this.data = data;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
        this.loading = false;
      });
    }
  }
  get filteredStations(): Station[] {
    if (!this.data?.stations) return [];
    
    return toJS(this.data.stations).filter(station => 
      station.transport_type === 'train' && 
      station.title.toLowerCase() !== "ростов-берег"
    );
  }

  /**
   * Ближайшая станция из отфильтрованного списка
   */
  get nearestFilteredStation(): Station | null {
    return this.filteredStations[0] || null;
  }
}
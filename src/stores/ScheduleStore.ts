import { makeAutoObservable, runInAction } from 'mobx';
import { YandexRaspSearchResponse } from '../interfaces/interfacesSchedule'; 
import { format } from 'date-fns';


const API_KEY = import.meta.env.VITE_API_KEY;
const URL_DEFAULT = 'https://api.rasp.yandex.net/v3.0/';
const formattedDate = format(new Date(), 'yyyy-MM-dd');
 
export class ScheduleStore {
  scheduleData: YandexRaspSearchResponse  | null= null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  
  async fetchSchedule(from: string, to: string = 's9613017') {
    try {
      runInAction(() => {
        this.loading = true;
        this.error = null;
      });

      const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
      const URL = encodeURIComponent(
        `${URL_DEFAULT}search/?apikey=${API_KEY}&format=json&from=${from}&to=${to}&lang=ru_RU&page=1&date=${formattedDate}`
      );

      const response = await fetch(CORS_PROXY + URL);
      if (!response.ok) throw new Error('Ошибка сети');
      
      const data:YandexRaspSearchResponse = await response.json();
       
      runInAction(() => {
        this.scheduleData = data;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
        this.loading = false;
      });
    }
  }
}
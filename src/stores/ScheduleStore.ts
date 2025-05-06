import { makeAutoObservable, runInAction } from 'mobx';
import { YandexRaspSearchResponse } from '../interfaces/interfacesSchedule';
import { format } from 'date-fns';

const API_KEY = import.meta.env.VITE_API_KEY;
const URL_DEFAULT = 'https://api.rasp.yandex.net/v3.0/';
const STORAGE_KEY = 'yandex_rasp_schedule_data'; 

export class ScheduleStore {
  scheduleData: YandexRaspSearchResponse | null = null;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();  
  }
 
  private loadFromLocalStorage() {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        runInAction(() => {
          this.scheduleData = JSON.parse(savedData);
        });
      }
    } catch (error) {
      console.error('Failed to parse saved schedule data', error);
    }
  }
 
  private saveToLocalStorage(data: YandexRaspSearchResponse) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save schedule data', error);
    }
  }

  async fetchSchedule(from: string, to: string) {
    try {
      runInAction(() => {
        this.loading = true;
        this.error = null;
      });

      const formattedDate = format(new Date(), 'yyyy-MM-dd');
      const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
      const URL = encodeURIComponent(
        `${URL_DEFAULT}search/?apikey=${API_KEY}&format=json&from=${from}&to=${to}&lang=ru_RU&page=1&date=${formattedDate}`
      );

      const response = await fetch(CORS_PROXY + URL);
      if (!response.ok) throw new Error('Ошибка сети');
      
      const data: YandexRaspSearchResponse = await response.json();
      
      runInAction(() => {
        this.scheduleData = data;
        this.loading = false;
        this.saveToLocalStorage(data);  
      });
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
        this.loading = false;
      });
    }
  }
 
  clearSavedData() {
    localStorage.removeItem(STORAGE_KEY);
    runInAction(() => {
      this.scheduleData = null;
    });
  }
}
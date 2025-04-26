export interface StationTypeChoices {
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
export interface Station {
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

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
}

export interface ApiResponse {
  pagination: Pagination;
  stations: Station[];
}
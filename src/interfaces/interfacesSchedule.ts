
interface Pagination {
    total: number;
    limit: number;
    offset: number;
  }
  
  interface StationInfo {
    code: string;
    title: string;
    popular_title: string;
    short_title: string;
    transport_type: string;
    type: string;
    station_type?: string;
    station_type_name?: string;
  }
  
  interface CarrierCodes {
    icao: string | null;
    sirena: string;
    iata: string;
  }
  
  interface Carrier {
    code: number;
    contacts: string;
    url: string;
    logo_svg: string | null;
    title: string;
    phone: string;
    codes: CarrierCodes;
    address: string;
    logo: string;
    email: string;
  }
  
  interface TransportSubtype {
    color: string;
    code: string;
    title: string;
  }
  
  interface Thread {
    uid: string;
    title: string;
    interval?: {
      density: string;
      end_time: string;
      begin_time: string;
    };
    number: string;
    short_title: string;
    thread_method_link: string;
    carrier: Carrier;
    transport_type: string;
    vehicle: string;
    transport_subtype: TransportSubtype;
    express_type: string | null;
  }
  
  interface TicketPrice {
    cents: number;
    whole: number;
  }
  
  interface TicketPlace {
    currency: string;
    price: TicketPrice;
    name: string;
  }
  
  interface TicketsInfo {
    et_marker: boolean;
    places: TicketPlace[];
  }
  
  interface IntervalSegment {
    from: StationInfo;
    thread: Thread;
    departure_platform: string;
    stops: string;
    departure_terminal: string | null;
    to: StationInfo;
    has_transfers: boolean;
    tickets_info: TicketsInfo;
    duration: number;
    arrival_terminal: string;
    start_date: string;
    arrival_platform: string;
  }
  
  interface Segment {
    arrival: string;
    from: StationInfo;
    thread: Thread;
    departure_platform: string;
    departure: string;
    stops: string;
    departure_terminal: string | null;
    to: StationInfo;
    has_transfers: boolean;
    tickets_info: TicketsInfo;
    duration: number;
    arrival_terminal: string;
    start_date: string;
    arrival_platform: string;
  }
  
  interface SearchLocation {
    code: string;
    type: string;
    popular_title: string;
    short_title: string;
    title: string;
  }
  
  interface SearchInfo {
    date: string;
    to: SearchLocation;
    from: SearchLocation;
  }
  
  export interface YandexRaspSearchResponse {
    pagination: Pagination;
    interval_segments: IntervalSegment[];
    segments: Segment[];
    search: SearchInfo;
  }
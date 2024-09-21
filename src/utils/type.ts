export interface IFactoryInfo {
  id: string;
  name: string;
  fuel?: string;
  location?: string;
}

export interface IGHG {
  id: string;
  hours: string;
  day: string;
  month: string;
  CO: number;
  CO2: number;
  NO2: number;
  SO2: number;
  others: number;
}
export interface ITemperature {
  id: string;
  hours: string;
  temperature: number;
}

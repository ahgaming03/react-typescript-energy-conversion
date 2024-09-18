export interface IFactoryInfo {
  id: string;
  name: string;
  fuel?: string;
  location?: string;
}

export interface IGHG {
  id: string;
  day: string;
  month: string;
  CO2: number;
  NO2: number;
  CH4: number;
  others: number;
}
export interface ITemperature {
  id: string;
  hours: string;
  temperature: number;
}

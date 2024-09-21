import axios from "axios";
import { IGHG, ITemperature } from "@/utils/type";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IData {
  GHG: IGHG[];
  temperature: ITemperature[];
}

export const DataContext = createContext<IData | undefined>(undefined);

export function useDataContext() {
  const data = useContext(DataContext);
  if (data === undefined) {
    throw new Error("useDataContext must be used within a DataContextProvider");
  }
  return data;
}

interface DataContextProviderProps {
  children: ReactNode;
}

export const DataContextProvider = ({ children }: DataContextProviderProps) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [data, setData] = useState<IData>({
    GHG: [],
    temperature: [],
  });
  const [tempData, setTempData] = useState<ITemperature[]>([]);
  const [GHGData, setGHGData] = useState<IGHG[]>([]);

  const formatData = (data: any) => {
    const id = data.ChiSoDat_ID;

    const time = new Date(data.Datetime);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const formatHour = `${hour}:${minute}`;
    const day = time.getDate();
    const month = (time.getMonth() + 1).toString();
    const formatDay = `${month}/${day}`;

    const CO = data.ChiSoDat.CO;
    const CO2 = data.ChiSoDat.CO2;
    const NO2 = data.ChiSoDat.NO2;
    const SO2 = data.ChiSoDat.SO2;
    const others = data.ChiSoDat.Others;
    const temperature = data.ChiSoDat.Temperature;

    const temperatureData: ITemperature = {
      id: id,
      hours: formatHour,
      temperature: temperature,
    };

    const GHGData: IGHG = {
      id: id,
      hours: formatHour,
      day: formatDay,
      month: month,
      CO: CO,
      CO2: CO2,
      NO2: NO2,
      SO2: SO2,
      others: others,
    };

    return { temperatureData, GHGData };
  };
  useEffect(() => {
    const fetchDataAPI = async () => {
      await axios
        .get(`${BASE_URL}/api/getData`)
        .then((res) => {
          const data = res.data;
          if (data.length === 0) fetchDataAPI();
          setTempData([]);
          setGHGData([]);
          data.forEach((element: any) => {
            const { temperatureData, GHGData } = formatData(element);

            setTempData((prev) => [temperatureData, ...prev]);
            setGHGData((prev) => [GHGData, ...prev]);
          });
        })
        .catch((err) => {
          console.error(err);
        });
      setData({
        GHG: GHGData,
        temperature: tempData,
      });
    };
    fetchDataAPI();
  }, [data]);

  return (
    <>
      <DataContext.Provider value={data}>{children}</DataContext.Provider>
    </>
  );
};

import { useState } from "react";
import { IFactoryInfo } from "@/utils/type";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TemperatureChart } from "@/components/TemperatureChart";
import { GHGLineChart } from "@/components/GHGChart";
import { SideBar } from "@/components/SideBar";

import { FactoryInfoContext } from "@/context/FactoryInfoContext";
import { DataContextProvider } from "@/context/DataContext";

// data temp
import info from "@/data/factoryInfo.json";
import { Current } from "./components/Current";

function App() {
  const [factoryInfo] = useState<IFactoryInfo>(info.factory);

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <FactoryInfoContext.Provider value={factoryInfo}>
          <Header />
        </FactoryInfoContext.Provider>
        <div className="flex flex-grow">
          <FactoryInfoContext.Provider value={factoryInfo}>
            <SideBar />
          </FactoryInfoContext.Provider>
          <div className="w-full">
            <DataContextProvider>
              <main className="flex h-full gap-3 px-3 pb-3 max-md:flex-col">
                <FactoryInfoContext.Provider value={factoryInfo}>
                  <Current />
                </FactoryInfoContext.Provider>
                <div className="flex w-full flex-grow flex-col justify-evenly gap-3">
                  <GHGLineChart />
                  <TemperatureChart />
                </div>
              </main>
            </DataContextProvider>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;

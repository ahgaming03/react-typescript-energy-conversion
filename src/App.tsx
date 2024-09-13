import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TemperatureChart } from "./components/TemperatureChart";
import { GHGAreaChart } from "./components/GHGAreaChart";
import { GHGPieChart } from "./components/GHGPieChart";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { SideBar } from "./components/SideBar";

function App() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-grow">
          <SideBar />
          <div className="w-full">
            <main className="flex w-full gap-3 px-3 max-md:flex-col">
              <section>
                <div className="mb-3 flex items-center justify-between md:flex-col-reverse">
                  <div className="text-3xl font-bold uppercase">Current</div>
                  <div className="flex gap-2">
                    <div className="text-right font-bold">
                      <p>ID:</p>
                      <p>Name:</p>
                    </div>
                    <div className="">
                      <p>1234</p>
                      <p>Factory A</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-evenly md:flex-col md:gap-3">
                  <Card className="h-48 w-48 rounded-2xl border shadow-xl">
                    <GHGPieChart />
                  </Card>
                  <Card className="h-48 w-48 rounded-2xl border p-2 shadow-xl">
                    <CardHeader className="p-0">
                      <FontAwesomeIcon
                        icon={["fas", "temperature-three-quarters"]}
                        className="h-8 w-8 rounded-full bg-red-500 p-2 text-white"
                      />
                    </CardHeader>
                    <CardContent className="flex items-center justify-center p-0 text-8xl font-bold text-red-500">
                      54
                    </CardContent>
                  </Card>
                </div>
              </section>
              <div className="flex w-full flex-col gap-3 md:gap-20">
                <section className="">
                  <GHGAreaChart />
                </section>
                <section>
                  <TemperatureChart />
                </section>
              </div>
            </main>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;

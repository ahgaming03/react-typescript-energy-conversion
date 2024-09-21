import { Card, CardContent, CardHeader } from "./ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFactoryInfoContext } from "@/context/FactoryInfoContext";
import { useDataContext } from "@/context/DataContext";

export const Current = () => {
  const factoryInfo = useFactoryInfoContext();
  const { GHG, temperature } = useDataContext();

  return (
    <>
      <section>
        <div className="mb-3 flex items-center justify-between md:flex-col-reverse">
          <div className="text-3xl font-bold uppercase">Current</div>
          <div className="flex gap-2">
            <div className="text-right font-bold">
              <p>ID:</p>
              <p>Name:</p>
            </div>
            <div>
              <p>{factoryInfo.id}</p>
              <p>{factoryInfo.name}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-around md:flex-col md:gap-3">
          <Card className="flex h-48 w-48 flex-col rounded-2xl border shadow-xl">
            <CardHeader className="p-2 text-2xl font-bold uppercase">
              GHG
            </CardHeader>
            <CardContent className="flex flex-grow px-2 py-0">
              {/* <GHGPieChart /> */}
              <div className="flex text-xl">
                <div className="mr-2 text-right font-bold">
                  <div>CO2:</div>
                  <div>NO2:</div>
                  <div>SO2:</div>
                  <div>CO:</div>
                </div>
                {GHG.length > 0 ? (
                  <div>
                    <div>{GHG[GHG.length - 1].CO2} %</div>
                    <div>{GHG[GHG.length - 1].NO2} %</div>
                    <div>{GHG[GHG.length - 1].SO2} %</div>
                    <div>{GHG[GHG.length - 1].CO} %</div>
                  </div>
                ) : (
                  <div>
                    <div>-</div>
                    <div>-</div>
                    <div>-</div>
                    <div>-</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="flex h-48 w-48 flex-col rounded-2xl border p-2 shadow-xl">
            <CardHeader className="p-0">
              <FontAwesomeIcon
                icon={["fas", "temperature-three-quarters"]}
                className="h-8 w-8 rounded-full bg-red-500 p-2 text-white"
              />
            </CardHeader>
            <CardContent className="flex flex-grow items-center justify-center p-0 text-7xl font-bold text-red-500">
              {temperature.length > 0
                ? temperature[temperature.length - 1].temperature
                : "-"}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

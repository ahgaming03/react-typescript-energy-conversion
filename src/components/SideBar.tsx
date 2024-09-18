import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SettingForm } from "@/components/SettingForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFactoryInfoContext } from "@/context/FactoryInfoContext";

export const SideBar = () => {
  const factoryInfo = useFactoryInfoContext();
  return (
    <>
      <div className="flex flex-col gap-3 rounded border p-2 shadow max-md:hidden">
        <FontAwesomeIcon icon={["fas", "house"]} color="green" size="xl" />
        <Dialog>
          <DialogTrigger asChild>
            <FontAwesomeIcon
              icon={["fas", "gear"]}
              color="green"
              size="xl"
              className="cursor-pointer hover:opacity-70"
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[25rem]">
            <DialogHeader>
              <DialogTitle>Setting</DialogTitle>
              <DialogDescription>
                <div>
                  <strong>Fuel: </strong>
                  {factoryInfo?.fuel || "N/A"}
                </div>
                <div>
                  <strong>Location: </strong>
                  {factoryInfo?.location || "N/A"}
                </div>
              </DialogDescription>
            </DialogHeader>
            <SettingForm />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

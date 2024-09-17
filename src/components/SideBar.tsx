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

export const SideBar = () => {
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
              <DialogDescription>Config data here.</DialogDescription>
            </DialogHeader>
            <SettingForm />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

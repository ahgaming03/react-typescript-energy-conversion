import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mobile_icon from "@/assets/mobile-icon.jpg";

export const Header = () => {
  return (
    <>
      <div className="mb-2.5 inline-flex w-full items-center justify-between rounded-b-xl border-b px-6 py-2.5 shadow md:px-8">
        <img className="h-14" src={mobile_icon} alt="Energy conversion" />
        <FontAwesomeIcon
          icon={["fas", "bars"]}
          size="2xl"
          className="md:hidden"
        />
        <div className="text-center max-md:hidden">
          <FontAwesomeIcon icon={["fas", "leaf"]} size="2xl" />
          <p className="text-xs">1234</p>
        </div>
      </div>
    </>
  );
};

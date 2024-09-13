import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SideBar = () => {
  return (
    <>
      <div className="flex flex-col gap-3 rounded border p-2 shadow max-md:hidden">
        <FontAwesomeIcon icon={["fas", "house"]} color="green" size="xl" />
        <FontAwesomeIcon icon={["fas", "gear"]} color="green" size="xl" />
      </div>
    </>
  );
};

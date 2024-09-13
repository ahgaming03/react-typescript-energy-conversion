import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer = () => {
  return (
    <>
      <div className="mt-auto w-full border-t bg-white py-4 text-center shadow">
        Copyright <FontAwesomeIcon icon={["far", "copyright"]} /> 2024 Energy
        conversion
      </div>
    </>
  );
};

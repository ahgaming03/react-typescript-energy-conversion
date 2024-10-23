import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LoadingProps {
  className?: string;
  size?: "1x" | "2x" | "3x" | "4x" | "5x";
}

const Loading = ({ className, size }: LoadingProps) => {
  return (
    <>
      <FontAwesomeIcon
        icon="spinner"
        spin
        size={size ? size : "1x"}
        className={className}
      />
    </>
  );
};

export default Loading;

import MoreIcon from "@/assets/icons/icon-increment-quantity.svg";
import LessIcon from "@/assets/icons/icon-decrement-quantity.svg";
import { ReactSVG } from "react-svg";
import { cn } from "@/lib/utils";

interface Props {
  value: number;
  onChange: (value: "increment" | "decrement") => void;
  className?: string;
}

const QuantitySelector = ({ className, value, onChange }: Props) => {
  return (
    <div
      className={cn(
        "bg-primary flex items-center justify-between p-3 min-w-40 rounded-full",
        className
      )}
    >
      <button
        type="button"
        className="group bg-transparent p-1 m-0 w-fit h-fit aspect-square rounded-full fill-white border border-white hover:bg-white hover:fill-primary"
        onClick={() => onChange("decrement")}
      >
        <ReactSVG src={LessIcon} width={20} height={20} />
      </button>
      <span className="text-sm font-semibold text-white">{value}</span>
      <button
        type="button"
        className="group bg-transparent p-1 m-0 w-fit h-fit aspect-square rounded-full fill-white border border-white hover:bg-white hover:fill-primary"
        onClick={() => onChange("increment")}
      >
        <ReactSVG src={MoreIcon} width={20} height={20} />
      </button>
    </div>
  );
};

export default QuantitySelector;

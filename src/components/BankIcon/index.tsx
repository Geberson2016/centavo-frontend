import { getBankLogo } from "../../utils/bank-utils";

interface BankIconProps {
  name?: string;
  className?: string;
}

export function BankIcon({ name, className = "w-8 h-8" }: BankIconProps) {
  return (
    <div
      className={`${className} flex items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm`}
    >
      <img
        src={getBankLogo(name)}
        alt={name || "Bank"}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

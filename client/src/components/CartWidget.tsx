import { useSales } from "@/api/salesApi";
import { useSalesStore } from "@/store/salesStore";
import { useEffect } from "react";
import { GiCorn } from "react-icons/gi";

interface CartWidgetProps {
  handleClick: () => void;
}

const CartWidget = ({ handleClick }: CartWidgetProps) => {
  const { data } = useSales(1);
  const { confirmedSales, setSales } = useSalesStore((state) => state);

  useEffect(() => {
    if (data) {
      setSales(data);
    }
  }, [data]);

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      <GiCorn size={24} />
      <div className="absolute bottom-[-5px] right-[-4px] flex justify-center items-center w-4 h-4 rounded-full bg-yellow-500 text-white text-xs">
        {confirmedSales.length}
      </div>
    </div>
  );
};

export default CartWidget;

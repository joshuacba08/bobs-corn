import { useCreateSale } from "@/api/salesApi";
import CardProduct from "@/components/CardProduct";
import { ToastAction } from "@/components/ui/toast";
import { formatDate } from "@/helpers/formatDate";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Sale } from "../store/salesStore";

const Home = () => {
  const navigate = useNavigate();
  const notification = (sale: Sale | AxiosError) => {
    if ("purchase_time" in sale) {
      toast({
        title: "Sale created",
        description: `Sale with ID ${
          sale.id
        } created successfully. Date: ${formatDate(sale.purchase_time)}`,
        action: (
          <ToastAction
            onClick={() => navigate("/dashboard")}
            altText="Goto schedule to undo"
          >
            Go to dashboard
          </ToastAction>
        ),
      });
    } else {
      toast({
        title: "Error",
        description: `${sale.message}: ${sale.response?.statusText}`,
        variant: "destructive",
      });
    }
  };

  const { mutate: createSale } = useCreateSale(notification);

  const { toast } = useToast();

  const handleAddSale = () => {
    createSale(2);
  };
  return (
    <main className="flex flex-col items-center justify-center height-without-navbar w-full">
      <CardProduct
        title="Corn"
        description="Delicious corn"
        price={1.99}
        image="https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg"
        onAdd={handleAddSale}
      />
    </main>
  );
};

export default Home;

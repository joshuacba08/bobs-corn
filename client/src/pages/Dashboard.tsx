import ListSales from "@/components/ListSales";
import { useSalesStore } from "@/store/salesStore";

const Dashboard = () => {
  const { confirmedSales } = useSalesStore();
  return (
    <main>
      <ListSales sales={confirmedSales} />
    </main>
  );
};

export default Dashboard;

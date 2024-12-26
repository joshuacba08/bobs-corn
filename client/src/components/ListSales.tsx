import { formatDate } from "@/helpers/formatDate";
import { Sale } from "@/store/salesStore";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface ListSalesProps {
  sales: Sale[];
}

const ListSales = ({ sales }: ListSalesProps) => {
  return (
    <div className="w-full my-6">
      <Table className="max-w-[800px] mx-auto">
        <TableCaption>A list of your recent operations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">ID</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{sale.id}</TableCell>
              <TableCell>{1}</TableCell>
              <TableCell>{formatDate(sale.purchase_time)}</TableCell>
              <TableCell className="text-right">${sale.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListSales;

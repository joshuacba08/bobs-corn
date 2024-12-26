import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

interface CardProductProps {
  title: string;
  description: string;
  price: number;
  image: string;
  onAdd: () => void;
}

const CardProduct = ({
  title,
  image,
  description,
  price,
  onAdd,
}: CardProductProps) => {
  return (
    <Card>
      <CardHeader>
        <img className="w-72" src={image} alt="Corn Image" />
      </CardHeader>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardDescription>${price}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button onClick={onAdd} className="w-full">
          Buy now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardProduct;

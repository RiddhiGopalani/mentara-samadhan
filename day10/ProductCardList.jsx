import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Noise cancelling, 20hr battery life",
    price: "$99.99",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80",
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Fitness tracking, notifications",
    price: "$149.99",
    image:
      "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=500&q=80",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    description: "Ergonomic, RGB lighting",
    price: "$49.99",
    image:
      "https://images.unsplash.com/photo-1580894908361-967195033215?w=500&q=80",
  },
];

export default function ProductCardList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="rounded-2xl hover:shadow-xl transition duration-300"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-t-2xl"
          />
          <CardContent className="flex flex-col justify-between h-44">
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-xl font-bold mt-2">{product.price}</p>
            </div>
            <Button className="mt-3 flex items-center gap-2 w-full">
              <ShoppingCart size={18} /> Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import products from "@/assets/data.json";
import ProductCard from "@/components/ui/product-card";
import { Product } from "@/types";

const DessertsList = () => {
  return (
    <>
      <h1 className="text-foreground text-[40px] leading-[120%] font-bold mb-6 sm:mb-8">
        Desserts
      </h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6 sm:gap-y-8">
        {(products as Product[]).map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </>
  );
};

export default DessertsList;

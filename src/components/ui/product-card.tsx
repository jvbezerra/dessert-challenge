import { Product } from "@/types";
import Button from "./button";
import { cn, formatCurrency } from "@/lib/utils";
import CartIcon from "@/assets/icons/icon-add-to-cart.svg";
import { ReactSVG } from "react-svg";
import { useCart } from "@/lib/cart-provider";
import { useCallback, useMemo } from "react";
import QuantitySelector from "./quantity-selector";

const ProductCard = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const { cart, getProductByName, incrementProduct, decrementProduct } =
    useCart();

  const cartItem = useMemo(
    () => getProductByName(product.name),
    [cart, product.name, getProductByName]
  );

  const handleQuantityChange = useCallback(
    (operation: "increment" | "decrement") => {
      if (operation === "increment") incrementProduct(product);
      if (operation === "decrement") decrementProduct(product.name);
    },
    [decrementProduct, incrementProduct, product]
  );

  return (
    <article
      aria-label="Product"
      className={cn("relative flex flex-col", className)}
    >
      <div className="relative flex flex-col">
        <picture>
          <source srcSet={product?.image?.mobile} media="(max-width: 520px)" />
          <source srcSet={product?.image?.tablet} media="(min-width: 520px)" />
          <source
            srcSet={product?.image?.desktop}
            media="(min-width: 1024px)"
          />
          <img
            src={product?.image?.desktop}
            alt="Product Image"
            className="rounded-lg"
          />
        </picture>
        {cartItem ? (
          <QuantitySelector
            value={cartItem?.quantity ?? 1}
            onChange={handleQuantityChange}
            className="w-fit mx-auto -translate-y-1/2"
          />
        ) : (
          <Button
            className="-translate-y-1/2 w-fit mx-auto font-semibold"
            onClick={() => handleQuantityChange("increment")}
          >
            <ReactSVG src={CartIcon} width={20} height={20} />
            Add to Cart
          </Button>
        )}
      </div>
      <strong aria-label="Category" className="text-accent text-sm font-normal">
        {product.category}
      </strong>
      <h3
        aria-label="Title"
        className="text-foreground text-base font-semibold"
      >
        {product.name}
      </h3>
      <p aria-label="Price" className="text-primary text-base font-semibold">
        {formatCurrency(product.price)}
      </p>
    </article>
  );
};

export default ProductCard;

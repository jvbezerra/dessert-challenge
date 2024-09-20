import Button from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import CarbonNeutralIcon from "@/assets/icons/icon-carbon-neutral.svg";
import EmptyIcon from "@/assets/icons/illustration-empty-cart.svg";
import RemoveIcon from "@/assets/icons/icon-remove-item.svg";
import { ReactSVG } from "react-svg";
import { useCart } from "@/lib/cart-provider";
import { useMemo } from "react";
import { Product } from "@/types";
import OrderTrigger from "./order-dialog";

const Cart = () => {
  const { cart } = useCart();
  const cartList = useMemo(() => Object.values(cart), [cart]);

  const cartTotalQty = useMemo(() => {
    return cartList.reduce((acc, product) => {
      return acc + (product?.quantity ?? 1);
    }, 0);
  }, [cartList]);

  const cartTotalPrice = useMemo(() => {
    return cartList.reduce((acc, product) => {
      return acc + product.price * (product?.quantity ?? 1);
    }, 0);
  }, [cartList]);

  return (
    <div className="bg-white p-6 rounded-xl flex flex-col gap-6">
      <h2 className="text-primary text-2xl font-bold">
        Your Cart ({cartTotalQty})
      </h2>
      <ul className="w-full flex flex-col gap-4 m-0 p-0">
        {cartList?.length === 0 && <Empty />}
        {cartList.map((item) => (
          <CartItem product={item} />
        ))}
      </ul>
      {cartList?.length > 0 && (
        <>
          <div aria-label="Division" className="w-full h-px bg-muted" />
          <dl className="flex w-full items-center justify-between">
            <dt className="text-foreground text-sm">Order Total</dt>
            <dd className="text-foreground text-2xl font-bold">
              {formatCurrency(cartTotalPrice)}
            </dd>
          </dl>
          <p className="bg-background w-full rounded-lg p-4 flex items-center justify-center gap-2 m-0">
            <ReactSVG src={CarbonNeutralIcon} width={20} height={20} />
            <span>
              This is a <b>carbon-neutral</b> delivery
            </span>
          </p>
          <OrderTrigger>
            <Button variant="filled" className="w-full">
              Confirm Order
            </Button>
          </OrderTrigger>
        </>
      )}
    </div>
  );
};

const CartItem = ({ product }: { product: Product }) => {
  const { decrementProduct } = useCart();
  return (
    <li className="relative flex flex-col after:h-px after:w-full after:bg-muted after:mt-4 last:after:content-none">
      <strong className="text-sm font-semibold">{product.name}</strong>
      <p className="flex text-sm gap-2 m-0 p-0">
        <span className="text-primary font-semibold">
          {product?.quantity ?? 1}x
        </span>
        <span className="text-accent">@ {formatCurrency(product.price)}</span>
        <span className="text-accent font-semibold">
          {formatCurrency(product.price * (product?.quantity ?? 1))}
        </span>
      </p>
      <button
        onClick={() => decrementProduct(product.name, true)}
        className="group bg-transparent p-1 m-0 w-fit h-fit absolute top-1/3 right-0 rounded-full border-[1.25px] border-secondary hover:border-foreground"
      >
        <ReactSVG
          src={RemoveIcon}
          width={20}
          height={20}
          className="fill-secondary group-hover:fill-foreground"
        />
      </button>
    </li>
  );
};

const Empty = () => (
  <div className="w-full flex flex-col p-4 gap-4 items-center justify-center">
    <ReactSVG src={EmptyIcon} width={128} height={128} />
    <span className="text-sm text-accent">
      Your added items will appear here
    </span>
  </div>
);

export default Cart;

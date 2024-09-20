import ResponsiveDialog from "@/components/ui/responsive-dialog";
import ConfirmIcon from "@/assets/icons/icon-order-confirmed.svg";
import { ReactNode, useMemo } from "react";
import { ReactSVG } from "react-svg";
import Button from "@/components/ui/button";
import { useCart } from "@/lib/cart-provider";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/types";

const OrderTrigger = ({ children }: { children: ReactNode }) => {
  const { cart, emptyCart } = useCart();
  const orderList = useMemo(() => Object.values(cart), [cart]);

  const orderTotalPrice = useMemo(() => {
    return orderList.reduce((acc, product) => {
      return acc + product.price * (product?.quantity ?? 1);
    }, 0);
  }, [orderList]);

  return (
    <ResponsiveDialog
      trigger={children}
      className="bg-white p-10 max-xs:p-6"
      title={
        <div className="flex flex-col gap-6 text-start">
          <ReactSVG src={ConfirmIcon} width={48} height={48} />
          <div className="flex flex-col gap-2">
            <h2 className="text-foreground text-[40px] leading-[120%] font-bold">
              Order Confirmed
            </h2>
            <p className="text-accent text-base m-0 p-0 font-normal">
              We hope you enjoy your food!
            </p>
          </div>
        </div>
      }
      footer={
        <Button variant="filled" className="w-full" onClick={emptyCart}>
          Start New Order
        </Button>
      }
    >
      <div className="flex flex-col gap-6 bg-background p-6 rounded-lg">
        <ul className="w-full flex flex-col gap-4 m-0 p-0">
          {orderList.map((item) => (
            <OrderItem product={item} />
          ))}
        </ul>
        <div aria-label="Division" className="w-full h-px bg-muted" />
        <dl className="flex w-full items-center justify-between">
          <dt className="text-foreground text-sm">Order Total</dt>
          <dd className="text-foreground text-2xl font-bold">
            {formatCurrency(orderTotalPrice)}
          </dd>
        </dl>
      </div>
    </ResponsiveDialog>
  );
};

const OrderItem = ({ product }: { product: Product }) => {
  return (
    <li
      aria-label="OrderItem"
      className="relative flex flex-wrap gap-2 after:h-px after:w-full after:basis-full after:bg-muted after:mt-4 last:after:content-none"
    >
      <img
        src={product.image.thumbnail}
        width={48}
        height={48}
        className="rounded-sm"
      />
      <div aria-label="Description">
        <strong className="text-sm font-semibold">{product.name}</strong>
        <p className="flex text-sm gap-2 m-0 p-0">
          <span className="text-primary font-semibold">
            {product?.quantity ?? 1}x
          </span>
          <span className="text-accent">@ {formatCurrency(product.price)}</span>
        </p>
      </div>
      <span
        aria-label="Total"
        className="text-foreground font-semibold text-bold absolute top-1/4 right-0"
      >
        {formatCurrency(product.price * (product?.quantity ?? 1))}
      </span>
    </li>
  );
};

export default OrderTrigger;

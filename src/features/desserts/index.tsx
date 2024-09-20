import CartProvider from "@/lib/cart-provider";
import Cart from "./cart";
import DessertsList from "./list";

const Desserts = () => {
  return (
    <main className="flex flex-wrap gap-8 bg-background p-[max(24px,calc(6.5vw-0.75vh))]">
      <CartProvider>
        <section className="flex-grow flex-shrink basis-[calc(68%-16px)]">
          {/* PRODUCTS */}
          <DessertsList />
        </section>
        <section className="flex-grow flex-shrink basis-[calc(32%-16px)] min-w-[327px]">
          {/* CART */}
          <Cart />
        </section>
      </CartProvider>
    </main>
  );
};

export default Desserts;

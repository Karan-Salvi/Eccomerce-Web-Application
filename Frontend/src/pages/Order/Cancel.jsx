import { XCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import Navbar from '../../components/Home/Navbar';
import { Reveal } from '../../components/Home/Reveal';
import { OrderDetails, OrderDetailsSkeleton, OrderNotFound } from '../../components/Order/OrderDetails';
import { useGetSingleOrderQuery } from '../../store/api/orderApi';

const Cancel = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleOrderQuery(id, { skip: !id });
  const order = data?.data;

  return (
    <div className="min-h-screen bg-zinc-50">
      <Navbar />

      {isLoading && <OrderDetailsSkeleton />}
      {!isLoading && (isError || !order) && <OrderNotFound />}

      {!isLoading && order && (
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          <Reveal className="rounded-2xl bg-white p-8 text-center ring-1 ring-zinc-200 sm:p-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-zinc-500">
              <XCircle className="h-8 w-8" strokeWidth={2} />
            </div>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Payment cancelled
            </h1>
            <p className="mx-auto mt-2 max-w-md text-zinc-600">
              You cancelled the payment before it completed. Nothing was charged, and these
              items are still in your cart.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-6">
            <OrderDetails order={order} />
          </Reveal>

          <Reveal delay={0.15} className="mt-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
            <Link
              to="/cart"
              className="rounded-full bg-zinc-900 px-8 py-3 font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              Return to cart
            </Link>
            <Link
              to="/products"
              className="rounded-full border border-zinc-300 px-8 py-3 font-semibold text-zinc-700 transition-colors hover:border-zinc-400"
            >
              Continue shopping
            </Link>
          </Reveal>
        </div>
      )}
    </div>
  );
};

export default Cancel;

import { CheckCircle2, Truck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import Navbar from '../../components/Home/Navbar';
import { Reveal } from '../../components/Home/Reveal';
import { OrderDetails, OrderDetailsSkeleton, OrderNotFound } from '../../components/Order/OrderDetails';
import { useGetSingleOrderQuery } from '../../store/api/orderApi';

const Success = () => {
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
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" strokeWidth={2} />
            </div>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Order confirmed
            </h1>
            <p className="mx-auto mt-2 max-w-md text-zinc-600">
              Thanks for shopping with CartLoop. We've received your order and it's being
              processed.
            </p>

            {order.paymentMethod === 'stripe' && order.paymentInfo?.status !== 'completed' && (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
                <Truck className="h-4 w-4" />
                Confirming payment with Stripe, this updates automatically
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1} className="mt-6">
            <OrderDetails order={order} />
          </Reveal>

          <Reveal delay={0.15} className="mt-8 text-center">
            <Link
              to="/products"
              className="inline-block rounded-full bg-zinc-900 px-8 py-3 font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              Continue shopping
            </Link>
            <p className="mt-4 text-sm text-zinc-500">
              Having issues with your order?{' '}
              <Link to="/contact" className="font-medium text-amber-600 hover:text-amber-700">
                Contact support
              </Link>
            </p>
          </Reveal>
        </div>
      )}
    </div>
  );
};

export default Success;

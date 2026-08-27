import React, { useEffect, useState } from 'react';

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateCheckoutSessionMutation } from '../../store/api/purchaseApi';
import { Button } from '../ui/button';

const PlaceOrderButton = ({ order }) => {
  const [
    createCheckoutSession,
    { data, isLoading, isSuccess, isError, error },
  ] = useCreateCheckoutSessionMutation();

  // One key per mount: a retried/double-clicked submit reuses it, so the
  // backend recognizes it as the same attempt instead of a new order.
  // crypto.randomUUID is secure-context only — on a plain-HTTP LAN dev origin
  // it's undefined, so fall back to '' (falsy → no header sent) instead of
  // crashing the component on mount.
  const [idempotencyKey] = useState(() => crypto.randomUUID?.() ?? '');

  const purchaseCourseHandler = async () => {
    await createCheckoutSession({ order, idempotencyKey });
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.sessionUrl) {
        window.location.href = data.sessionUrl; // Redirect to stripe checkout url
      } else {
        toast.error('Invalid response from server.');
      }
    }
    if (isError) {
      toast.error(error?.data?.message || 'Failed to create checkout session');
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        'Purchase Course'
      )}
    </Button>
  );
};

export default PlaceOrderButton;

import { useState } from 'react';
import { Loader2, MapPin, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import AddAddressDialog from '../Product/AddAddressDialog';
import { useDeleteAddressMutation } from '../../store/api/authApi';

const AddressCard = ({ user }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation();
  const address = user?.addressInfo?.[0];

  const handleDelete = async () => {
    try {
      await deleteAddress(address._id).unwrap();
      toast.success('Address removed');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to remove address');
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-zinc-200">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-zinc-900">Shipping address</h3>
        {address && (
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              aria-label="Edit address"
              className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              aria-label="Remove address"
              className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            </button>
          </div>
        )}
      </div>

      {address ? (
        <div className="mt-4 flex gap-3 text-sm text-zinc-600">
          <MapPin className="h-4 w-4 flex-shrink-0 text-zinc-400" />
          <div>
            <p className="font-medium text-zinc-900">{address.address}</p>
            <p>
              {address.city}, {address.state} {address.pinCode}
            </p>
            <p>{address.country}</p>
            <p className="mt-1 text-zinc-500">{address.phoneNo}</p>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-sm text-zinc-500">No address on file yet.</p>
          <Button
            type="button"
            onClick={() => setDialogOpen(true)}
            className="mt-3 rounded-full bg-zinc-900 hover:bg-zinc-800"
          >
            Add address
          </Button>
        </div>
      )}

      <AddAddressDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        addressId={address?._id}
        initialValues={address}
        onSaved={() => setDialogOpen(false)}
      />
    </div>
  );
};

export default AddressCard;

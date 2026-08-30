import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useAddAddressMutation } from '../../store/api/authApi';

const EMPTY_FORM = {
  address: '',
  city: '',
  state: '',
  country: '',
  pinCode: '',
  phoneNo: '',
};

const AddAddressDialog = ({ open, onOpenChange, onSaved }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [addAddress, { isLoading }] = useAddAddressMutation();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      pinCode: Number(form.pinCode),
      phoneNo: Number(form.phoneNo),
    };

    try {
      await addAddress(payload).unwrap();
      toast.success('Address saved');
      onSaved(payload);
      setForm(EMPTY_FORM);
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to save address');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a shipping address</DialogTitle>
          <DialogDescription>
            We need this to deliver your order.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Street address</Label>
            <Input id="address" required value={form.address} onChange={handleChange('address')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" required value={form.city} onChange={handleChange('city')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" required value={form.state} onChange={handleChange('state')} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" required value={form.country} onChange={handleChange('country')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pinCode">PIN code</Label>
              <Input id="pinCode" type="number" required value={form.pinCode} onChange={handleChange('pinCode')} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNo">Phone number</Label>
            <Input id="phoneNo" type="tel" required value={form.phoneNo} onChange={handleChange('phoneNo')} />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-amber-600 hover:bg-amber-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving
                </>
              ) : (
                'Save and continue'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressDialog;

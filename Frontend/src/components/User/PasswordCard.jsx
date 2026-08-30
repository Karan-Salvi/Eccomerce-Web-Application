import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useUpdatePasswordMutation } from '../../store/api/authApi';

const EMPTY_FORM = { oldPassword: '', password: '', confirmPassword: '' };

const PasswordCard = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }

    try {
      await updatePassword({ data: form }).unwrap();
      toast.success('Password updated');
      setForm(EMPTY_FORM);
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update password');
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-zinc-200">
      <h3 className="text-base font-semibold text-zinc-900">Change password</h3>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="old-password">Current password</Label>
          <Input
            id="old-password"
            type="password"
            autoComplete="current-password"
            required
            value={form.oldPassword}
            onChange={handleChange('oldPassword')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">New password</Label>
          <Input
            id="new-password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 6 characters"
            required
            minLength={6}
            value={form.password}
            onChange={handleChange('password')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm new password</Label>
          <Input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={form.confirmPassword}
            onChange={handleChange('confirmPassword')}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="rounded-full bg-zinc-900 hover:bg-zinc-800">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating
            </>
          ) : (
            'Update password'
          )}
        </Button>
      </form>
    </div>
  );
};

export default PasswordCard;

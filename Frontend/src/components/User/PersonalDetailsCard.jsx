import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useUpdatePersonalDetailMutation } from '../../store/api/authApi';

const PersonalDetailsCard = ({ user }) => {
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [updatePersonalDetail, { isLoading }] = useUpdatePersonalDetailMutation();

  const isDirty = name !== user?.name || email !== user?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePersonalDetail({ data: { name, email } }).unwrap();
      toast.success('Personal details updated');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update details');
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-zinc-200">
      <h3 className="text-base font-semibold text-zinc-900">Personal details</h3>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="profile-name">Name</Label>
          <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} required minLength={4} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="profile-email">Email</Label>
          <Input id="profile-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !isDirty}
          className="rounded-full bg-zinc-900 hover:bg-zinc-800"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving
            </>
          ) : (
            'Save changes'
          )}
        </Button>
      </form>
    </div>
  );
};

export default PersonalDetailsCard;

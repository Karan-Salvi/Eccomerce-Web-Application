
import React, { useState } from 'react';
import { useGetAllUsersQuery, useUpdateUserRoleMutation, useDeleteUserMutation } from '../../store/api/adminApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import { USER_ROLES } from '../../constants/roles.constants';

const UsersPage = () => {
  const { data: usersData, isLoading } = useGetAllUsersQuery();
  const [updateRole, { isLoading: isUpdating }] = useUpdateUserRoleMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [roleFilter, setRoleFilter] = useState('ALL');

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading users...</div>;
  }

  const users = usersData?.data || [];
  
  const filteredUsers = users.filter((u) => {
    if (roleFilter === 'ALL') return true;
    return u.role === roleFilter;
  });

  const handleRoleChange = async (userId, newRole, userEmail, userName) => {
    try {
      await updateRole({ id: userId, role: newRole, email: userEmail, name: userName }).unwrap();
      toast.success('Role updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update role');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteUser(userId).unwrap();
      toast.success('User deleted successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Users</h2>
        <div className="flex items-center gap-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Roles</SelectItem>
              <SelectItem value={USER_ROLES.USER}>User</SelectItem>
              {/* Note: this preserves the existing VENDER typo in the codebase */}
              <SelectItem value={USER_ROLES.VENDER}>Vendor</SelectItem>
              <SelectItem value={USER_ROLES.ADMIN}>Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 font-medium">
              <div className="col-span-3">Name</div>
              <div className="col-span-4">Email</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-3 text-right">Actions</div>
            </div>
            <div className="divide-y">
              {filteredUsers.map((user) => (
                <div key={user._id} className="grid grid-cols-12 items-center gap-4 p-4">
                  <div className="col-span-3 font-medium">{user.name}</div>
                  <div className="col-span-4 text-sm text-muted-foreground">{user.email}</div>
                  <div className="col-span-2">
                    <Select
                      value={user.role}
                      disabled={isUpdating}
                      onValueChange={(val) => handleRoleChange(user._id, val, user.email, user.name)}
                    >
                      <SelectTrigger className="h-8 w-full max-w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={USER_ROLES.USER}>User</SelectItem>
                        <SelectItem value={USER_ROLES.VENDER}>Vendor</SelectItem>
                        <SelectItem value={USER_ROLES.ADMIN}>Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-3 flex justify-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user._id)}
                      disabled={isDeleting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No users found for the selected filter.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;

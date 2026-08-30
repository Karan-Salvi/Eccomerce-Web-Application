import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllUsersQuery, useUpdateUserRoleMutation, useDeleteUserMutation } from '../../store/api/adminApi';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Trash2, UsersRound, UserRound } from 'lucide-react';
import { USER_ROLES } from '../../constants/roles.constants';

const UsersPage = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const currentUserId = currentUser?.data?._id;

  const { data: usersData, isLoading } = useGetAllUsersQuery();
  const [updateRole, { isLoading: isUpdating }] = useUpdateUserRoleMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-amber-600" />
      </div>
    );
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

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteUser(deleteTargetId).unwrap();
      toast.success('User deleted successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete user');
    } finally {
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900">Users</h2>
          <p className="text-muted-foreground">Manage accounts, roles, and access</p>
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Roles</SelectItem>
            <SelectItem value={USER_ROLES.USER}>User</SelectItem>
            <SelectItem value={USER_ROLES.VENDER}>Vendor</SelectItem>
            <SelectItem value={USER_ROLES.ADMIN}>Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-zinc-300 px-6 py-16 text-center">
          <UsersRound className="h-10 w-10 text-zinc-300" strokeWidth={1.5} />
          <h3 className="mt-4 text-lg font-semibold text-zinc-900">No users found</h3>
          <p className="text-muted-foreground mt-1">Try a different role filter.</p>
        </div>
      ) : (
        <Card className="overflow-hidden py-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b bg-zinc-50 text-left text-xs font-medium text-zinc-500 uppercase">
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map((u) => {
                  const isSelf = u._id === currentUserId;
                  return (
                    <tr key={u._id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                            <UserRound className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-zinc-900">
                              {u.name}
                              {isSelf && (
                                <span className="text-muted-foreground ml-2 text-xs font-normal">
                                  (you)
                                </span>
                              )}
                            </p>
                            <p className="text-muted-foreground truncate text-xs">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {isSelf ? (
                          <Badge variant="outline" className="capitalize">
                            {u.role}
                          </Badge>
                        ) : (
                          <Select
                            value={u.role}
                            disabled={isUpdating}
                            onValueChange={(val) => handleRoleChange(u._id, val, u.email, u.name)}
                          >
                            <SelectTrigger className="h-8 w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={USER_ROLES.USER}>User</SelectItem>
                              <SelectItem value={USER_ROLES.VENDER}>Vendor</SelectItem>
                              <SelectItem value={USER_ROLES.ADMIN}>Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:bg-red-50 hover:text-red-700 disabled:opacity-40"
                          onClick={() => setDeleteTargetId(u._id)}
                          disabled={isDeleting || isSelf}
                          title={isSelf ? "You can't delete your own account" : 'Delete user'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <CardContent className="border-t px-6 py-3">
            <p className="text-muted-foreground text-sm">
              {filteredUsers.length} of {users.length} users
            </p>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={!!deleteTargetId} onOpenChange={() => setDeleteTargetId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The account and its data will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UsersPage;

const ROLE_LABELS = {
  user: 'Customer',
  vendor: 'Vendor',
  admin: 'Admin',
};

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  const initials = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0].slice(0, 2);
  return initials.toUpperCase();
}

const ProfileSummary = ({ user }) => {
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })
    : null;

  return (
    <div className="rounded-2xl bg-white p-6 text-center ring-1 ring-zinc-200">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-600 text-2xl font-bold text-white">
        {getInitials(user?.name)}
      </div>
      <h2 className="mt-4 text-xl font-bold text-zinc-900">{user?.name}</h2>
      <p className="text-sm text-zinc-500">{user?.email}</p>
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
          {ROLE_LABELS[user?.role] ?? user?.role}
        </span>
      </div>
      {memberSince && <p className="mt-3 text-xs text-zinc-400">Member since {memberSince}</p>}
    </div>
  );
};

export default ProfileSummary;

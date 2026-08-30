import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const Unauth = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          <ShieldAlert className="h-7 w-7" strokeWidth={2} />
        </div>
        <p className="mt-4 text-sm font-medium text-zinc-500">Error 403</p>
        <h1 className="mt-1 text-xl font-bold text-zinc-900">Unauthorized access</h1>
        <p className="mt-2 text-zinc-600">
          You don't have permission to view this page. Sign in with the correct account to
          continue.
        </p>

        <div className="mt-6 space-y-3">
          <Link
            to="/login"
            className="block w-full rounded-full bg-amber-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-amber-700"
          >
            Sign in
          </Link>
          <Link
            to="/"
            className="block w-full rounded-full border border-zinc-300 px-4 py-2.5 text-center text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            Return to homepage
          </Link>
        </div>

        <p className="mt-6 text-sm text-zinc-500">
          Need help?{' '}
          <Link to="/contact" className="font-medium text-amber-600 hover:text-amber-700">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Unauth;

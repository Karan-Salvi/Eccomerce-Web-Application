import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { Reveal } from '../../components/Home/Reveal';
import { useRegisterUserMutation } from '../../store/api/authApi';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast.error('Please agree to the Terms of use and Privacy policy to continue');
      return;
    }

    const response = await registerUser({ name, email, password });
    if (response?.data?.success) {
      navigate('/login');
    } else {
      toast.error(response?.error?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 font-sans lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-zinc-900 lg:block">
        <img
          src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt=""
          className="h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <Link to="/" className="brand_name text-2xl text-white">
            CartLoop
          </Link>
          <p className="mt-3 max-w-sm text-lg text-zinc-200">
            Create an account to track orders, save a wishlist, and check out faster.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-6 py-16 sm:px-10">
        <Reveal className="w-full max-w-sm">
          <Link to="/" className="brand_name text-xl text-zinc-900 lg:hidden">
            CartLoop
          </Link>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-zinc-900 lg:mt-0">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Already have one?{' '}
            <Link to="/login" className="font-semibold text-amber-600 hover:text-amber-700">
              Sign in
            </Link>
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleRegistration}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                autoComplete="name"
                placeholder="Your full name"
                required
                minLength={4}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-zinc-500">At least 6 characters.</p>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="agree-to-terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                className="mt-0.5"
              />
              <Label htmlFor="agree-to-terms" className="text-sm leading-5 font-normal text-zinc-600">
                I agree to the{' '}
                <a href="#" className="font-medium text-zinc-900 hover:text-amber-600">
                  Terms of use
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-zinc-900 hover:text-amber-600">
                  Privacy policy
                </a>
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full rounded-full bg-zinc-900 font-semibold text-white hover:bg-zinc-800"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </form>
        </Reveal>
      </div>
    </div>
  );
}

'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import * as CardPrimitive from 'react'; // Card is a simple div, so no radix
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { CheckIcon } from 'lucide-react';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../store/api/authApi';
import { useRef } from 'react';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card"
    className={cn(
      'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-content"
    className={cn('px-6', className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    data-slot="checkbox"
    className={cn(
      'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      data-slot="checkbox-indicator"
      className="flex items-center justify-center text-current transition-none"
    >
      <CheckIcon className="size-3.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    data-slot="label"
    className={cn(
      'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      className
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

const Separator = React.forwardRef(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

const Logo = (props) => (
  <svg
    fill="currentColor"
    height="48"
    viewBox="0 0 40 48"
    width="40"
    {...props}
  >
    <clipPath id="a">
      <path d="m0 0h40v48h-40z" />
    </clipPath>
    <g clipPath="url(#a)">
      <path d="m25.0887 5.05386-3.933-1.05386-3.3145 12.3696-2.9923-11.16736-3.9331 1.05386 3.233 12.0655-8.05262-8.0526-2.87919 2.8792 8.83271 8.8328-10.99975-2.9474-1.05385625 3.933 12.01860625 3.2204c-.1376-.5935-.2104-1.2119-.2104-1.8473 0-4.4976 3.646-8.1436 8.1437-8.1436 4.4976 0 8.1436 3.646 8.1436 8.1436 0 .6313-.0719 1.2459-.2078 1.8359l10.9227 2.9267 1.0538-3.933-12.0664-3.2332 11.0005-2.9476-1.0539-3.933-12.0659 3.233 8.0526-8.0526-2.8792-2.87916-8.7102 8.71026z" />
      <path d="m27.8723 26.2214c-.3372 1.4256-1.0491 2.7063-2.0259 3.7324l7.913 7.9131 2.8792-2.8792z" />
      <path d="m25.7665 30.0366c-.9886 1.0097-2.2379 1.7632-3.6389 2.1515l2.8794 10.746 3.933-1.0539z" />
      <path d="m21.9807 32.2274c-.65.1671-1.3313.2559-2.0334.2559-.7522 0-1.4806-.102-2.1721-.2929l-2.882 10.7558 3.933 1.0538z" />
      <path d="m17.6361 32.1507c-1.3796-.4076-2.6067-1.1707-3.5751-2.1833l-7.9325 7.9325 2.87919 2.8792z" />
      <path d="m13.9956 29.8973c-.9518-1.019-1.6451-2.2826-1.9751-3.6862l-10.95836 2.9363 1.05385 3.933z" />
    </g>
  </svg>
);

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const emailElement = useRef();
  const passwordElement = useRef();
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      email: emailElement.current.value,
      password: passwordElement.current.value,
    });
    if (response?.success) {
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-md">
          <Logo
            className="text-foreground dark:text-foreground mx-auto h-10 w-10"
            aria-hidden={true}
          />
          <h3 className="text-foreground dark:text-foreground mt-2 text-center text-lg font-bold">
            Welcome Back to <span className="brand_name">CartLoop</span>
          </h3>
          <p className="p-2 text-center text-sm">
            Start your shopping at <span className="brand_name">CartLoop</span>{' '}
            and get 5% off on your first order!
          </p>
        </div>

        <Card className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
          <CardContent>
            <form className="space-y-4" onSubmit={handleLogin}>
              {/* <div>
                <Label
                  htmlFor="name-login-05"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Name
                </Label>
                <Input
                  type="text"
                  id="name-login-05"
                  name="name-login-05"
                  autoComplete="name-login-05"
                  placeholder="Name"
                  className="mt-2"
                />
              </div> */}

              <div className="my-5">
                <Label
                  htmlFor="email-login-05"
                  className="text-foreground dark:text-foreground text-sm font-medium"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email-login-05"
                  name="email-login-05"
                  autoComplete="email-login-05"
                  placeholder="karan@CartLoop.com"
                  className="mt-2"
                  ref={emailElement}
                />
              </div>

              <div className="my-5">
                <Label
                  htmlFor="password-login-05"
                  className="text-foreground dark:text-foreground text-sm font-medium"
                >
                  Password
                </Label>

                <div style={{ position: 'relative' }}>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password-login-05   "
                    name="password-login-05"
                    autoComplete="password-login-05"
                    placeholder="password@123"
                    required="true"
                    ref={passwordElement}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#666',
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* <div>
                <Label
                  htmlFor="confirm-password-login-05"
                  className="text-sm font-medium text-foreground dark:text-foreground"
                >
                  Confirm password
                </Label>
                <Input
                  type="password"
                  id="confirm-password-login-05"
                  name="confirm-password-login-05"
                  autoComplete="confirm-password-login-05"
                  placeholder="Password"
                  className="mt-2"
                />
              </div> */}

              <div className="mt-2 flex items-start">
                <div className="flex h-6 items-center">
                  <Checkbox
                    id="newsletter-login-05"
                    name="newsletter-login-05"
                    className="size-4"
                  />
                </div>
                <Label
                  htmlFor="newsletter-login-05"
                  className="text-muted-foreground dark:text-muted-foreground ml-3 text-sm leading-6"
                >
                  Remember me
                </Label>
              </div>

              <Button
                type="submit"
                className="mt-4 w-full cursor-pointer py-2 font-medium"
              >
                Login
              </Button>

              <p className="text-muted-foreground dark:text-muted-foreground text-center text-xs">
                By signing in, you agree to our{' '}
                <a
                  href="#"
                  className="text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 capitalize"
                >
                  Terms of use
                </a>{' '}
                and{' '}
                <a
                  href="#"
                  className="text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 capitalize"
                >
                  Privacy policy
                </a>
              </p>
            </form>
          </CardContent>
        </Card>

        <p className="text-muted-foreground dark:text-muted-foreground mt-6 text-center text-sm">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90 font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

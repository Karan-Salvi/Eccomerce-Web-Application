import { Check } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

const MotionDiv = motion.div;
const MotionSpan = motion.span;

// Score is a UX suggestion, not an enforced rule — the only real backend
// requirement is length >= 6, tracked separately below as an honest checklist.
function getStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 10) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password) && /[^a-zA-Z0-9]/.test(password)) score += 1;
  return score;
}

const LEVELS = [
  { label: '', color: 'bg-zinc-200' },
  { label: 'Weak', color: 'bg-red-400' },
  { label: 'Fair', color: 'bg-amber-500' },
  { label: 'Good', color: 'bg-amber-500' },
  { label: 'Strong', color: 'bg-emerald-500' },
];

const PasswordStrength = ({ password }) => {
  const reduce = useReducedMotion();
  const score = getStrength(password);
  const meetsMinLength = password.length >= 6;
  const level = LEVELS[score];

  return (
    <div className="space-y-2">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((segment) => (
          <div key={segment} className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-200">
            <MotionDiv
              className={`h-full rounded-full ${segment < score ? level.color : 'bg-zinc-200'}`}
              initial={false}
              animate={{ scaleX: segment < score ? 1 : 0 }}
              style={{ originX: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-zinc-500">
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors ${
              meetsMinLength ? 'bg-emerald-500 text-white' : 'bg-zinc-200 text-transparent'
            }`}
          >
            <AnimatePresence>
              {meetsMinLength && (
                <MotionSpan
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={reduce ? {} : { scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </MotionSpan>
              )}
            </AnimatePresence>
          </span>
          <span className={meetsMinLength ? 'text-zinc-700' : ''}>At least 6 characters</span>
        </div>

        <AnimatePresence mode="wait">
          {password && (
            <MotionSpan
              key={level.label}
              initial={reduce ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? {} : { opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="font-medium text-zinc-500"
            >
              {level.label}
            </MotionSpan>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PasswordStrength;

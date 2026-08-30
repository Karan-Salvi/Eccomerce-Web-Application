import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const StatCard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  className,
}) => {
  return (
    <Card
      className={cn(
        'transition-shadow duration-200 hover:shadow-lg',
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tabular-nums">{value}</div>
        {change && (
          <p
            className={cn(
              'mt-1 text-xs',
              changeType === 'positive' && 'text-green-600',
              changeType === 'negative' && 'text-red-600',
              changeType === 'neutral' && 'text-muted-foreground'
            )}
          >
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

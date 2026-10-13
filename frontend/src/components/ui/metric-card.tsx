import type { ReactNode } from "react";

export function MetricCard({
  className = "",
  icon,
  label,
  value,
  detail,
}: {
  className?: string;
  icon: ReactNode;
  label: string;
  value: string;
  detail: ReactNode;
}) {
  return (
    <article
      className={`border-border/80 bg-card text-card-foreground rounded-xl border p-4 shadow-[0_12px_35px_rgba(0,0,0,0.07)] ${className}`}
    >
      <div className="bg-muted mb-3 flex size-7 items-center justify-center rounded-md">
        {icon}
      </div>
      <p className="text-muted-foreground text-xs font-medium">{label}</p>
      <p className="mt-1 text-xl font-semibold tracking-tight">{value}</p>
      <div className="text-muted-foreground mt-2 text-[11px]">{detail}</div>
    </article>
  );
}

/*
Usage examples (inside a relatively positioned container):

import { CircleDollarSign, PackageCheck, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";

<MetricCard
  className="absolute top-8 left-5 w-[170px] sm:left-8 lg:-left-4 lg:top-12"
  icon={<PackageCheck className="size-4" />}
  label="Shipped Orders"
  value="42"
  detail={
    <>
      <strong className="text-foreground">+18.2%</strong> &nbsp;than
      last week
    </>
  }
/>
<MetricCard
  className="absolute top-24 right-4 w-[178px] sm:right-8 lg:top-28 lg:-right-2"
  icon={<CircleDollarSign className="size-4" />}
  label="Total Revenue"
  value="$12,400"
  detail={
    <span className="inline-flex items-center gap-1">
      <TrendingUp className="size-3" /> 15% this month
    </span>
  }
/>
<MetricCard
  className="absolute right-5 bottom-7 w-[158px] sm:right-10 lg:-right-1 lg:bottom-28"
  icon={<TrendingUp className="size-4" />}
  label="Total Income"
  value="$4,673"
  detail={<strong className="text-foreground">+25.2%</strong>}
/>
*/

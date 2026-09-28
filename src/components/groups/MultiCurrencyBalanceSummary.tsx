"use client";

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Money } from "../amount";
import { aggregateBalancesByAsset, getSortedAggregatedBalances } from "@/lib/balanceAggregation";
import type { MemberBalance } from "@/lib/types";

export interface MultiCurrencyBalanceSummaryProps {
  balances: MemberBalance[];
  userId?: string;
  className?: string;
}

/**
 * Multi-currency balance summary widget displaying net positions per asset.
 * Shows aggregated balances across different Stellar assets (XLM, USDC, etc.)
 * with proper formatting and neobrutalist styling.
 */
export function MultiCurrencyBalanceSummary({
  balances,
  userId,
  className = "",
}: MultiCurrencyBalanceSummaryProps) {
  const aggregation = aggregateBalancesByAsset(balances, userId);
  const sortedBalances = getSortedAggregatedBalances(aggregation);

  if (sortedBalances.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xs uppercase tracking-widest text-ink/60">
            Net Balances by Asset
          </h3>
          <Badge tone="ink" className="text-xs">
            {sortedBalances.length} {sortedBalances.length === 1 ? "asset" : "assets"}
          </Badge>
        </div>
        <div className="space-y-2">
          {sortedBalances.map((balance) => (
            <div
              key={balance.assetCode}
              className="flex items-center justify-between py-2 px-3 rounded-lg border-2 border-ink/20 bg-cream/50"
            >
              <span className="font-mono text-sm font-bold text-ink/80">
                {balance.assetCode}
              </span>
              <Money value={balance.net} assetCode={balance.assetCode} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

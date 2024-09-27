import { TrendingDown } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useFetchTransaction } from "@/hooks/useTransaction";

export const description = "A pie chart with a label list";

const chartConfig = {
  Hutang: {
    label: "Hutang",
    color: "hsl(var(--chart-1))",
  },
  Baju: {
    label: "Baju",
    color: "hsl(var(--chart-2))",
  },
  Listrik: {
    label: "Listrik",
    color: "hsl(var(--chart-3))",
  },
  Kesehatan: {
    label: "Kesehatan",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const colors = ["red", "blue", "green", "yellow"];

export function DiagramOutcome() {
  const { data: transactions = [] } = useFetchTransaction();
  console.log("transactions:", transactions);

  const chartData = transactions
    .filter((transaction) => transaction.type === "Pengeluaran")
    .reduce((acc, transaction, index) => {
      const existing = acc.find(
        (item) => item.category === transaction.category
      );
      if (existing) {
        existing.amount += transaction.amount;
      } else {
        acc.push({
          category: transaction.category,
          amount: Number(transaction.amount),
          fill: colors[index % colors.length],
        });
      }
      return acc;
    }, [] as { category: string; amount: number; fill: string }[]);

  console.log("chartDataKeluar:", chartData);

  return (
    <div className="my-4">
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Chart Pengeluaran</CardTitle>
          <CardDescription>September 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="category" hideLabel />}
              />
              <Pie data={chartData} dataKey="amount" nameKey={"category"}>
                <LabelList
                  dataKey="category"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) =>
                    chartConfig[value]?.label
                  }
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Pengeluaran Bulan ini <TrendingDown className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

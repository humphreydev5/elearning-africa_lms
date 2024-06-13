"use client";

// Import necessary components from recharts for building the bar chart
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// Import the Card component for styling the chart container
import { Card } from "@/components/ui/card";

// Define the props interface for the Chart component
interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
}

// Define the Chart component
export const Chart = ({
  data
}: ChartProps) => {
  return (
    // Wrap the chart in a Card component
    <Card>
      {/* ResponsiveContainer ensures the chart adjusts to the container's size */}
      <ResponsiveContainer width="100%" height={350}>
        {/* BarChart component from recharts */}
        <BarChart data={data}>
          {/* XAxis configuration */}
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          {/* YAxis configuration */}
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: any) => `$${value}`}
          />
          {/* Bar component for rendering the bars in the chart */}
          <Bar
            dataKey="total"
            fill="#0369a1"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

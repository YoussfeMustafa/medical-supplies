"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface OrderDistributionProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export function OrderDistributionChart({ data }: OrderDistributionProps) {
  return (
    <div className="h-72 w-full flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-lg text-xs">
                    <p className="font-bold text-slate-800">
                      {payload[0].name}: {payload[0].value} طلب
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-slate-600 dark:text-slate-400">
              {item.name} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

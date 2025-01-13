import React, { useState, useEffect } from 'react';

type DataPoint = {
  label: string;
  value: number;
};

interface BarChartProps {
  data: DataPoint[];
  width?: number;
  height?: number;
  barColor?: string;
  title?: string;
}
 
 export const CustomBarChart: React.FC<BarChartProps> = ({
  data,
  width = 600,
  height = 400,
  barColor = '#3b82f6',
  title = 'Bar Chart'
}) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Calcular dimensiones y márgenes
  const margin = { top: 40, right: 20, bottom: 60, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Encontrar el valor máximo para la escala
  const maxValue = Math.max(...data.map(d => d.value));
  const scale = chartHeight / maxValue;

  // Calcular el ancho de las barras
  const barWidth = Math.floor(chartWidth / data.length * 0.8);
  const barSpacing = Math.floor(chartWidth / data.length * 0.2);

  // Función para renderizar el eje Y
  const renderYAxis = () => {
    const ticks = 5;
    return Array.from({ length: ticks + 1 }, (_, i) => {
      const value = Math.round((maxValue / ticks) * (ticks - i));
      const y = margin.top + (i * chartHeight) / ticks;
      return (
        <g key={`y-tick-${i}`}>
          <line
            x1={margin.left - 5}
            y1={y}
            x2={margin.left}
            y2={y}
            className="stroke-gray-400"
          />
          <text
            x={margin.left - 10}
            y={y}
            className="text-xs fill-gray-500 text-right"
            textAnchor="end"
            dominantBaseline="middle"
          >
            {value}
          </text>
          <line
            x1={margin.left}
            y1={y}
            x2={width - margin.right}
            y2={y}
            className="stroke-gray-200 stroke-dasharray-2"
          />
        </g>
      );
    });
  };

  // Función para renderizar las barras
  const renderBars = () => {
    return data.map((d, i) => {
      const barHeight = d.value * scale;
      const x = margin.left + (i * (barWidth + barSpacing));
      const y = height - margin.bottom - barHeight;

      return (
        <g key={`bar-${i}`}>
          <rect
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            className={`${hoveredBar === i ? 'fill-blue-400' : 'fill-blue-600'} transition-colors duration-200`}
            onMouseEnter={() => setHoveredBar(i)}
            onMouseLeave={() => setHoveredBar(null)}
          />
          <text
            x={x + barWidth / 2}
            y={height - margin.bottom + 20}
            className="text-xs fill-gray-500"
            textAnchor="middle"
            transform={`rotate(-45, ${x + barWidth / 2}, ${height - margin.bottom + 20})`}
          >
            {d.label}
          </text>
          {hoveredBar === i && (
            <g>
              <rect
                x={x + barWidth / 2 - 30}
                y={y - 30}
                width="60"
                height="20"
                rx="4"
                className="fill-gray-800"
              />
              <text
                x={x + barWidth / 2}
                y={y - 18}
                className="text-xs fill-white"
                textAnchor="middle"
              >
                {d.value}
              </text>
            </g>
          )}
        </g>
      );
    });
  };

  return (
    <div className="w-full flex flex-col items-center bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <svg
        width={width}
        height={height}
        className="overflow-visible"
      >
        {/* Eje Y */}
        <line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={height - margin.bottom}
          className="stroke-gray-400"
        />
        {/* Eje X */}
        <line
          x1={margin.left}
          y1={height - margin.bottom}
          x2={width - margin.right}
          y2={height - margin.bottom}
          className="stroke-gray-400"
        />
        {renderYAxis()}
        {renderBars()}
      </svg>
    </div>
  );
};
import React, { useState } from 'react';

type PieChartData = {
  label: string;
  value: number;
  color: string;
};

interface PieChartProps {
  data: PieChartData[];
  size?: number;
  donut?: boolean;
  donutThickness?: number;
  className?: string;
  showLabels?: boolean;
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  size = 300,
  donut = false,
  donutThickness = 50,
  className = '',
  showLabels = true,
}) => {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = Math.min(centerX, centerY) * 0.9;

  // Calcular el total para los porcentajes
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const getCoordinatesForAngle = (angle: number, radiusOffset = 0): [number, number] => {
    return [
      centerX + (radius + radiusOffset) * Math.cos(angle - Math.PI / 2),
      centerY + (radius + radiusOffset) * Math.sin(angle - Math.PI / 2)
    ];
  };

  // Calcular posición para las etiquetas
  const getLabelPosition = (startAngle: number, endAngle: number): [number, number, boolean] => {
    const midAngle = startAngle + (endAngle - startAngle) / 2;
    // Ajustar el radio para las etiquetas según si es donut o no
    const labelRadius = radius * (donut ? 0.7 : 0.6);
    
    return [
      centerX + labelRadius * Math.cos(midAngle - Math.PI / 2),
      centerY + labelRadius * Math.sin(midAngle - Math.PI / 2),
      // Para determinar la alineación del texto
      midAngle > Math.PI
    ];
  };

  // Generar los segmentos
  const segments = data.map((item, index) => {
    const startAngle = data
      .slice(0, index)
      .reduce((sum, d) => sum + (d.value / total) * (Math.PI * 2), 0);
    const endAngle = startAngle + (item.value / total) * (Math.PI * 2);

    const startPoint = getCoordinatesForAngle(startAngle);
    const endPoint = getCoordinatesForAngle(endAngle);
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    const innerRadius = donut ? radius - donutThickness : 0;
    const innerStartPoint = donut ? getCoordinatesForAngle(startAngle, -donutThickness) : [centerX, centerY];
    const innerEndPoint = donut ? getCoordinatesForAngle(endAngle, -donutThickness) : [centerX, centerY];

    let path = `
      M ${startPoint[0]},${startPoint[1]}
      A ${radius},${radius} 0 ${largeArcFlag} 1 ${endPoint[0]},${endPoint[1]}
    `;

    if (donut) {
      path += `
        L ${innerEndPoint[0]},${innerEndPoint[1]}
        A ${innerRadius},${innerRadius} 0 ${largeArcFlag} 0 ${innerStartPoint[0]},${innerStartPoint[1]}
        Z
      `;
    } else {
      path += `L ${centerX},${centerY} Z`;
    }

    const percentage = ((item.value / total) * 100).toFixed(1);
    const [labelX, labelY, isRightSide] = getLabelPosition(startAngle, endAngle);

    // Calcular líneas conectoras para las etiquetas
    const lineStartAngle = startAngle + (endAngle - startAngle) / 2;
    const lineStart = getCoordinatesForAngle(lineStartAngle, donut ? -donutThickness/2 : 0);
    const lineMiddle = getCoordinatesForAngle(lineStartAngle, radius * 0.85);
    const lineEnd = [
      labelX + (isRightSide ? -20 : 20),
      labelY
    ];

    return {
      path,
      color: item.color,
      label: item.label,
      value: item.value,
      percentage,
      labelPos: { x: labelX, y: labelY, isRightSide },
      labelLine: {
        start: lineStart,
        middle: lineMiddle,
        end: lineEnd
      },
      index
    };
  });

  return (
    <div className={`relative ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Segmentos del pie */}
        {segments.map((segment, i) => (
          <path
            key={i}
            d={segment.path}
            fill={segment.color}
            className={`transition-all duration-200 ${
              activeSegment === i
                ? 'opacity-100 scale-105 transform-origin-center'
                : 'opacity-85 hover:opacity-95 hover:scale-102'
            }`}
            onMouseEnter={() => setActiveSegment(i)}
            onMouseLeave={() => setActiveSegment(null)}
          />
        ))}
      </svg>

      {/* Labels y líneas conectoras */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute top-0 left-0 pointer-events-none"
      >
        {showLabels && segments.map((segment, i) => (
          <g
            key={`label-${i}`}
            className={`transition-opacity duration-200 ${
              activeSegment === null || activeSegment === i
                ? 'opacity-100'
                : 'opacity-40'
            }`}
          >
            {/* Línea conectora */}
            <path
              d={`M ${segment.labelLine.start[0]},${segment.labelLine.start[1]} 
                  L ${segment.labelLine.middle[0]},${segment.labelLine.middle[1]}
                  L ${segment.labelLine.end[0]},${segment.labelLine.end[1]}`}
              fill="none"
              stroke="#666"
              strokeWidth="1"
              className="opacity-70"
            />
            
            {/* Texto de la etiqueta */}
            <text
              x={segment.labelLine.end[0]}
              y={segment.labelLine.end[1]}
              textAnchor={segment.labelPos.isRightSide ? "end" : "start"}
              className="text-xs fill-gray-600"
              transform="rotate(90, ${segment.labelLine.end[0]}, ${segment.labelLine.end[1]})"
            >
              {`${segment.label} (${segment.percentage}%)`}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default PieChart;
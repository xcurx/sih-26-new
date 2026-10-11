'use client';

import React from 'react';

interface RadarProps {
  studentScores?: { [key: string]: number };
  benchmarkScores?: { [key: string]: number };
}

export default function SkillRadarChart({ studentScores, benchmarkScores }: RadarProps) {
  // 6 Primary Dimensions evaluated
  const dimensions = [
    { label: 'Data Structures', key: 'dsa', student: 95, benchmark: 85 },
    { label: 'Cloud Architecture', key: 'cloud', student: 88, benchmark: 90 },
    { label: 'Backend (Go/Py)', key: 'backend', student: 92, benchmark: 80 },
    { label: 'Linux Systems', key: 'linux', student: 86, benchmark: 75 },
    { label: 'DevOps / IaC', key: 'devops', student: 84, benchmark: 78 },
    { label: 'Observability', key: 'obs', student: 58, benchmark: 80 },
  ];

  // SVG Center & Radius
  const cx = 100;
  const cy = 100;
  const r = 75;

  const getCoordinates = (value: number, index: number, total: number) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const distance = (value / 100) * r;
    const x = cx + distance * Math.cos(angle);
    const y = cy + distance * Math.sin(angle);
    return { x, y };
  };

  const total = dimensions.length;

  const benchmarkPoints = dimensions.map((d, i) => {
    const coord = getCoordinates(d.benchmark, i, total);
    return `${coord.x.toFixed(1)},${coord.y.toFixed(1)}`;
  }).join(' ');

  const studentPoints = dimensions.map((d, i) => {
    const score = studentScores && studentScores[d.key] !== undefined ? studentScores[d.key] : d.student;
    const coord = getCoordinates(score, i, total);
    return `${coord.x.toFixed(1)},${coord.y.toFixed(1)}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-64 h-64 sm:w-72 sm:h-72">
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          {/* Concentric Hexagonal Grids */}
          {[0.25, 0.5, 0.75, 1].map((scale, sIdx) => {
            const gridPoints = dimensions.map((_, i) => {
              const coord = getCoordinates(scale * 100, i, total);
              return `${coord.x.toFixed(1)},${coord.y.toFixed(1)}`;
            }).join(' ');
            return (
              <polygon
                key={sIdx}
                points={gridPoints}
                fill="none"
                stroke="#c3c6d7"
                strokeWidth="0.8"
                strokeDasharray={scale < 1 ? "2,2" : undefined}
                opacity={0.4 + sIdx * 0.15}
              />
            );
          })}

          {/* Radial Spokes */}
          {dimensions.map((_, i) => {
            const edge = getCoordinates(100, i, total);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={edge.x}
                y2={edge.y}
                stroke="#c3c6d7"
                strokeWidth="0.8"
                opacity="0.6"
              />
            );
          })}

          {/* Industry Benchmark Area */}
          <polygon
            points={benchmarkPoints}
            fill="#565e74"
            fillOpacity="0.12"
            stroke="#737686"
            strokeWidth="1.5"
          />

          {/* Student Profile Area */}
          <polygon
            points={studentPoints}
            fill="#004ac6"
            fillOpacity="0.25"
            stroke="#004ac6"
            strokeWidth="2.5"
            className="transition-all duration-500"
          />

          {/* Data Point Circles */}
          {dimensions.map((d, i) => {
            const score = studentScores && studentScores[d.key] !== undefined ? studentScores[d.key] : d.student;
            const pt = getCoordinates(score, i, total);
            return (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r="3.5"
                fill="#004ac6"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Text Labels at Spoke Ends */}
          {dimensions.map((d, i) => {
            const labelCoord = getCoordinates(115, i, total);
            return (
              <text
                key={i}
                x={labelCoord.x}
                y={labelCoord.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="7.5"
                fontWeight="600"
                fill="#0b1c30"
                className="select-none"
              >
                {d.label}
              </text>
            );
          })}
        </svg>
      </div>
      <span className="font-label-sm text-xs text-on-surface-variant mt-2 text-center">
        Multi-dimensional Radar Variance vs Tier-1 Benchmark
      </span>
    </div>
  );
}

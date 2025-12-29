"use client";

import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div 
      className={`animate-pulse bg-white/5 rounded-2xl ${className}`}
    />
  );
};

export default Skeleton;

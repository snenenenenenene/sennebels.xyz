import type { ReactNode } from 'react';
import { metadata } from './metadata';

export { metadata };

export default function AboutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
} 
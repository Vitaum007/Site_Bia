'use client';

import { useEffect } from 'react';
import { StatusPage } from '@/components/layout/StatusPage';
import { logError } from '@/lib/logger';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logError(error);
  }, [error]);

  return <StatusPage variant="error" onReset={reset} />;
}

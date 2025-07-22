import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';

export const useContentRefresh = (refreshInterval = 30000) => {
  const router = useRouter();
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshContent = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    try {
      // Trigger a soft refresh (revalidate current page)
      await router.replace(router.asPath);
      setLastRefresh(Date.now());
    } catch (error) {
      console.error('Error refreshing content:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing, router]);

  useEffect(() => {
    // Only enable auto-refresh in development
    if (process.env.NODE_ENV !== 'development') return;

    const interval = setInterval(() => {
      refreshContent();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval, refreshContent]);

  return {
    refreshContent,
    lastRefresh,
    isRefreshing
  };
};

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';

export const useDraftMode = () => {
  const router = useRouter();
  const [isDraftMode, setIsDraftMode] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshTimeoutRef = useRef(null);

  useEffect(() => {
    // Check if draft mode is enabled via URL parameter
    const draftParam = router.query.draft;
    const isDraft = draftParam === 'true' || draftParam === '1';

    setIsDraftMode(isDraft);
  }, [router.query.draft]);



  // Removed automatic refresh interval - no more auto-refresh after 15 seconds

  const enterDraftMode = (slug) => {
    const currentPath = router.asPath.split('?')[0]; // Remove existing query params
    const newPath = slug ? `/${slug}?draft=true` : `${currentPath}?draft=true`;
    router.push(newPath);
  };

  const exitDraftMode = () => {
    const currentPath = router.asPath.split('?')[0]; // Remove query params
    router.push(currentPath);
  };

  const forceRefresh = async () => {
    if (isRefreshing) return;

    try {
      setIsRefreshing(true);
      const secret = process.env.NEXT_PUBLIC_DRAFT_REVALIDATION_SECRET || 'dev-secret';
      const path = router.asPath.split('?')[0];

      // Call draft revalidation API
      const response = await fetch(`/api/draft/revalidate?secret=${secret}&path=${path}&draft=true`);

      if (response.ok) {
        setLastRefresh(Date.now());
        console.log('Draft revalidation successful');
        // Use window.location.reload() for more reliable refresh
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error('Draft revalidation failed:', errorData);
        setIsRefreshing(false);
      }
    } catch (error) {
      console.error('Error forcing refresh:', error);
      setIsRefreshing(false);
    }
  };

  return {
    isDraftMode,
    enterDraftMode,
    exitDraftMode,
    forceRefresh,
    lastRefresh,
    isRefreshing
  };
};

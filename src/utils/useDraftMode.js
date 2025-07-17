import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useDraftMode = () => {
  const router = useRouter();
  const [isDraftMode, setIsDraftMode] = useState(false);

  useEffect(() => {
    // Check if draft mode is enabled via URL parameter
    const draftParam = router.query.draft;
    const isDraft = draftParam === 'true' || draftParam === '1';

    setIsDraftMode(isDraft);
  }, [router.query.draft]);

  const enterDraftMode = (slug) => {
    const currentPath = router.asPath.split('?')[0]; // Remove existing query params
    const newPath = slug ? `/${slug}?draft=true` : `${currentPath}?draft=true`;
    router.push(newPath);
  };

  const exitDraftMode = () => {
    const currentPath = router.asPath.split('?')[0]; // Remove query params
    router.push(currentPath);
  };

  return {
    isDraftMode,
    enterDraftMode,
    exitDraftMode
  };
};

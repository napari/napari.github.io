import { useRouter } from 'next/router';

import { createUrl } from '@/utils/url';

/**
 * Hook for getting the current pathname from the Next.js router.
 */
export function useCurrentPathname(): string {
  const router = useRouter();
  return createUrl(router.asPath).pathname;
}

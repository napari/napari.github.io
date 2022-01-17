import dayjs from 'dayjs';
import localeList from 'dayjs/locale.json';
import { useEffect, useState } from 'react';

import { useIsFeatureFlagEnabled } from '@/utils/featureFlags';

async function loadDayjsLanguage(language: string) {
  const locale = localeList.find(({ key }) =>
    [language, language.split('-')[0]].includes(key),
  );

  if (!locale) {
    // eslint-disable-next-line no-console
    console.error('Unable to find locale for', language);
    return;
  }

  await new Promise((resolve) => {
    const localeScript = document.createElement('script');
    localeScript.src = `https://unpkg.com/dayjs@1.10.7/locale/${locale.key}.js`;
    localeScript.onload = resolve;
    document.body.appendChild(localeScript);
  });

  dayjs.locale(locale.key);
}

async function loadDayjsLocale() {
  const languages =
    navigator.languages || (navigator.language ? [navigator.language] : []);

  if (languages.length === 0) {
    return;
  }

  await Promise.all(
    languages.map((language) => loadDayjsLanguage(language.toLowerCase())),
  );
}

export function useDayjsLocaleReady(): boolean {
  const [localeReady, setLocaleReady] = useState(false);
  const isCalendari18nEnabled = useIsFeatureFlagEnabled('calendari18n');

  useEffect(() => {
    async function loadLocale() {
      if (isCalendari18nEnabled) {
        Object.assign(window, { dayjs });
        await loadDayjsLocale();
      }

      setLocaleReady(true);
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadLocale();
  }, [isCalendari18nEnabled]);

  return localeReady;
}

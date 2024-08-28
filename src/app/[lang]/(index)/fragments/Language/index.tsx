'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from '@/constants/i18n';
import type { Locale } from '@/types/i18n';

export default function Language() {
  const pathName = usePathname();

  function _localizeHref(locale: Locale) {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  }

  return (
    <div className="uppercase space-x-2">
      {i18n.locales.map((locale) => (
        <Link key={locale} href={_localizeHref(locale)} scroll={false}>
          {locale}
        </Link>
      ))}
    </div>
  );
}

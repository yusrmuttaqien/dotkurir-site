import id from './id';
import en from './en';
import { i18n } from '@/constants/i18n';
import type { Locale } from '@/types/i18n';

export default function getContents(locale?: Locale) {
  const contents = { en, id };

  return contents[locale || i18n.defaultLocale];
}

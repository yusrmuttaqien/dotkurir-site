import 'server-only';

import globalUntranslated from '@/contents/untranslated';
import type { Locale } from '@/types/i18n';
import 'server-only';

const contents = {
  en: () => import('./en.json').then((module) => module.default),
  id: () => import('./id.json').then((module) => module.default),
};

export default async function getContents(locale: Locale) {
  const { couriers } = globalUntranslated;
  const { search, history, head } = await (contents[locale]?.() ?? contents.en());

  return {
    head: { search: { couriers, ...search }, ...head },
    history: { card: { couriers }, ...history },
  };
}

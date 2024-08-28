import 'server-only';

import globalUntranslated from '@/contents/untranslated';

export default async function getContents() {
  const { couriers } = globalUntranslated;

  return { hero: { search: { couriers } }, history: { card: { couriers } } };
}

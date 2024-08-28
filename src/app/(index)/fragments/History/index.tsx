'use client';

import { useAtomValue } from 'jotai';
import { searchHistory } from '@/app/(index)/store';

export default function History() {
  const history = useAtomValue(searchHistory);

  return (
    <section>
      {history.map((item) => (
        <p key={item.key}>{item.courier}</p>
      ))}
    </section>
  );
}

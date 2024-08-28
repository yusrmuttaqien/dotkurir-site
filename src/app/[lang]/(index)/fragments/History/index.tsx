'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { searchHistory } from '@/app/[lang]/(index)/store';
import HistoryCard from '../HistoryCard';
import classMerge from '@/utils/classMerge';
import { VARIANTS } from './constant';
import type { HistoryProps } from './type';
import type { HistoryCardProps } from '../HistoryCard/type';

export default function History(props: HistoryProps) {
  const { className, contents } = props;
  const { card, title, noHistory } = contents;
  const history = useAtomValue(searchHistory);

  return (
    <motion.section layoutRoot className={classMerge('wrapper space-y-4', className)}>
      <motion.h2 layout="position" className="mb-6 wrapper">
        {title}
      </motion.h2>
      <AnimatePresence mode="popLayout">
        {history.length > 0 ? (
          history.map((item) => {
            const content = item as HistoryCardProps['contents'];

            return <HistoryCard key={item.key} contents={{ ...content, ...card }} />;
          })
        ) : (
          <motion.div
            {...VARIANTS}
            layout="position"
            className="grid place-content-center h-[9.375rem]"
          >
            <p className="opacity-30">{noHistory}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

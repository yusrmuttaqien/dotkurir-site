import { motion } from 'framer-motion';
import Image from '@/components/Image';
import Draggable from '@/components/Draggable';
import classMerge from '@/utils/classMerge';
import { VARIANTS } from './constant';
import type { HistoryCardProps, CostProps } from './type';

export default function HistoryCard(props: HistoryCardProps) {
  const { className, content } = props;
  const { couriers, courier, date, costs, route, key, weight } = content;
  const currentCourier = couriers.find((item) => item.id === courier?.code);

  if (!currentCourier) return null;
  const expandedCosts =
    costs.length > 0
      ? costs.reduce((a, b) => {
          const prices = b.prices.map((price) => ({
            service: b.service,
            desc: b.desc,
            price: price.price,
            etd: price.etd,
            note: price.note,
          }));

          return [...a, ...prices];
        }, [] as CostProps['content'][])
      : null;

  return (
    <motion.figure
      {...VARIANTS}
      layout="position"
      className={classMerge(
        'bg-white/10 py-4 px-4 text-white rounded-md backdrop-blur-3xl flex items-stretch',
        'justify-between gap-4 border border-white/15 wrapper flex-col 740:flex-row 740:px-6',
        '740:max-h-[12.5rem]',
        className
      )}
    >
      <div className="space-y-4 max-w-max w-full">
        <Image
          src={currentCourier.logo}
          alt={courier.name}
          className={{ div: 'size-[5rem] brightness-200' }}
        />
        <figcaption>
          <h3 className="font-extrabold text-xl line-clamp-1" title={courier.name}>
            {courier.name}
          </h3>
          <p className="line-clamp-1" title={`${route.from} - ${route.to}`}>
            {route.from} - {route.to}
          </p>
          <p
            className="opacity-50 line-clamp-1"
            title={`Cek tgl : ${new Date(date).toLocaleDateString()} - ${weight} gram`}
          >
            Cek tgl : {new Date(date).toLocaleDateString()} - {weight} gram
          </p>
        </figcaption>
      </div>
      {expandedCosts ? (
        <Draggable
          name={key}
          className={{
            container: 'w-max max-w-full',
            wrapper: 'h-full',
            dragger: classMerge('flex gap-4 h-full justify-end'),
          }}
        >
          {expandedCosts.map((cost, idx) => (
            <Cost key={`${cost.price}-${idx}`} content={cost} />
          ))}
        </Draggable>
      ) : (
        <div className="h-full w-full grid place-content-center my-auto py-4">
          <p className="opacity-30">Layanan tidak tersedia</p>
        </div>
      )}
    </motion.figure>
  );
}

function Cost(props: CostProps) {
  const { content } = props;
  const { service, desc, price, etd, note } = content;

  return (
    <figure
      className={classMerge(
        'bg-white/10 rounded-md p-4 border border-white/15 w-[13.5rem]',
        'flex flex-col justify-between gap-4'
      )}
    >
      <div>
        <h4>{service}</h4>
        <p className="font-light opacity-55">{desc}</p>
      </div>
      <figcaption className="text-sm">
        <p className="text-yellow">{price}</p>
        <p>{etd} hari</p>
        {note && <p>{note}</p>}
      </figcaption>
    </figure>
  );
}

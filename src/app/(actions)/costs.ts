'use server';

import type { CostStructure } from '@/hooks/costs/type';
import type { FormSubmit } from '@/app/(index)/fragments/Search/type';

export async function getCosts(values: FormSubmit) {
  const body = new FormData();

  body.append('origin', values?.oriCit || values?.oriProv || '');
  body.append('destination', values?.destCit || values?.destProv || '');
  body.append('weight', parseInt(values?.weight || '', 10).toString());
  body.append('courier', values?.courier || '');

  function _formatDay(day: string) {
    if (day.includes('-')) {
      return day.replace('-', ' - ');
    } else if (day.includes(' HARI')) {
      return day.replace('HARI', '').replace(/ /g, '');
    } else {
      return day;
    }
  }
  function _formatCurrency(value: any) {
    const isString = typeof value === 'string' && value !== '0';
    const isNumber = typeof value === 'number' && !isNaN(value);
    const IDR = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });

    return IDR.format(isString ? +value : isNumber ? value : 0).toString();
  }

  return fetch(process.env.RAJA_ONGKIR_BASE_URL + '/cost', {
    body,
    method: 'POST',
    headers: {
      key: process.env.RAJA_ONGKIR_API_KEY,
    },
  })
    .then((res) => res.json())
    .then((data: any) => {
      const { rajaongkir: source } = data;
      const { results = [], ...sources } = source || {};
      const courier = results[0].name;
      const date = Date.now();
      let costs = [] as CostStructure[];

      results.forEach((item: any) =>
        item.costs.forEach((cost: any) =>
          costs.push({
            service: cost.service,
            desc: cost.description,
            prices: cost.cost.map((price: any) => ({
              price: _formatCurrency(price.value),
              etd: _formatDay(price.etd),
              note: price.note,
            })),
          })
        )
      );

      return {
        ...sources,
        costs,
        courier,
        date,
        key: `${JSON.stringify(costs)}-${courier}`,
      };
    });
}

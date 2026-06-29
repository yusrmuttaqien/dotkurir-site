'use server';

import type { CostStructure } from '@/hooks/costs/type';
import type { FormSubmit } from '@/app/[lang]/(index)/fragments/Search/type';

function _formatDay(day: string) {
  return day.replace('HARI', '').replace(/ /g, '').replace('-', ' - ');
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

export async function getCosts(values: FormSubmit) {
  try {
    const body = new FormData();

    body.append('origin', values?.oriCit || values?.oriProv || '');
    body.append('destination', values?.destCit || values?.destProv || '');
    body.append('weight', parseInt(values?.weight || '', 10).toString());
    body.append('courier', values?.courier || '');

    const response = await fetch(process.env.RAJA_ONGKIR_BASE_URL + '/cost', {
      body,
      method: 'POST',
      headers: {
        key: process.env.RAJA_ONGKIR_API_KEY,
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return {
        success: false,
        error: `RajaOngkir API error (status: ${response.status}): ${response.statusText}`,
        data: null,
      };
    }

    const data = await response.json();
    const { rajaongkir: source } = data;
    const { results = [], origin_details, destination_details, ...sources } = source || {};
    const courier = { name: results[0]?.name || '', code: results[0]?.code || '' };
    const oriDetails = origin_details || {};
    const destDetails = destination_details || {};
    const { city_name: oriCit, type: oriType } = oriDetails;
    const { city_name: destCit, type: destType } = destDetails;
    const date = Date.now();
    const route = {
      from: `${oriType} ${oriCit}`,
      to: `${destType} ${destCit}`,
    };
    let costs = [] as CostStructure[];

    results.forEach((item: any) =>
      item.costs?.forEach((cost: any) =>
        costs.push({
          service: cost.service,
          desc: cost.description,
          prices: cost.cost?.map((price: any) => ({
            price: _formatCurrency(price.value),
            etd: _formatDay(price.etd),
            note: price.note,
          })) || [],
        })
      )
    );

    return {
      success: true,
      ...sources,
      costs,
      courier,
      date,
      route,
      weight: sources.query.weight,
      key: `${JSON.stringify(costs)}-${courier.code}-${JSON.stringify(route)}-${
        sources.query.weight
      }`,
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to connect to RajaOngkir API: ${error instanceof Error ? error.message : 'Unknown error'}`,
      data: null,
    };
  }
}

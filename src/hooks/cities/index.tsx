import { useQuery } from '@tanstack/react-query';
import { getCities } from '@/app/(actions)/cities';
import type { CityStructure, DataStructure, CitiesParams, CitiesFetcherParams } from './type';

export function citiesFetcher(params?: CitiesFetcherParams) {
  const { key = 'cities', params: ps = '', ...rest } = params || {};
  const isKeyArray = Array.isArray(key) ? [...key] : [key];

  function _transform(data: any) {
    const { rajaongkir: source } = data;
    const { results = [], ...sources } = source || {};
    let cities = [] as CityStructure[];

    // TODO: Try transform on server?
    results.forEach((item: any) =>
      cities.push({
        id: item.city_id,
        province: item.province,
        province_id: item.province_id,
        type: item.type,
        city: item.city_name,
        postal_code: item.postal_code,
      })
    );

    return { ...sources, cities };
  }

  return {
    ...rest,
    queryKey: [...isKeyArray],
    queryFn: async () => _transform(await getCities(ps)),
  };
}
export default function useCities(props?: CitiesParams) {
  const { data, ...queries } = useQuery<DataStructure>(citiesFetcher(props));
  const { cities = [] } = data || {};

  return { ...queries, cities };
}

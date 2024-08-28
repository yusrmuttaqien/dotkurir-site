import { useQuery } from '@tanstack/react-query';
import { getProvinces } from '@/app/[lang]/(actions)/provinces';
import type {
  ProvinceStructure,
  DataStructure,
  ProvinciesParams,
  ProvincesFetcherParams,
} from './type';

export function provincesFetcher(params?: ProvincesFetcherParams) {
  const { key = 'provincies', params: ps = '', ...rest } = params || {};

  // TODO: Try transform on server?
  function _transform(data: any) {
    const { rajaongkir: source } = data;
    const { results = [], ...sources } = source || {};
    let provinces = [] as ProvinceStructure[];

    results.forEach((item: any) =>
      provinces.push({ id: item.province_id, province: item.province })
    );

    return { ...sources, provinces };
  }

  return {
    ...rest,
    queryKey: [key],
    queryFn: async () => _transform(await getProvinces(ps)),
  };
}
export default function useProvincies(props?: ProvinciesParams) {
  const { data, ...queries } = useQuery<DataStructure>(provincesFetcher(props));
  const { provinces = [] } = data || {};

  return { ...queries, provinces };
}

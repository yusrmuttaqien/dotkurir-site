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
  async function _transform(data: any) {
    if (data?.success === false && data?.error) {
      throw new Error(data.error);
    }

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
    staleTime: 60 * 60 * 1000,
    retry: false,
  };
}
export default function useProvincies(props?: ProvinciesParams) {
  const { data, ...queries } = useQuery<DataStructure>(provincesFetcher(props));
  const provinces = (data as DataStructure | undefined)?.provinces ?? [];

  return { ...queries, provinces };
}

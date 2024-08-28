import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { searchHistory } from '@/app/(index)/store';
import { getCosts } from '@/app/(actions)/costs';
import type { DataStructure, CostsParams, CostsFetcherParams } from './type';

export function costsFetcher(params: CostsFetcherParams) {
  const { key = 'costs', values, ...rest } = params || {};
  const isKeyArray = Array.isArray(key) ? [...key] : [key];

  async function _verify(values: CostsFetcherParams['values']) {
    const { isError, errors } = _valueChecks(values) || {};

    if (isError) return Promise.reject(errors);
    return await getCosts(values);
  }
  function _valueChecks(values: CostsFetcherParams['values']) {
    if (!values) return;
    const allowedEmpty = ['destCit', 'oriCit'];
    let isError = false;
    let errors = { ...values };

    Object.entries(values).forEach(([key, value]) => {
      const typedKey = key as keyof typeof errors;

      if (!value && values && !allowedEmpty.includes(key)) {
        isError = true;
        errors[typedKey] = `${key} wajib diisi`;
      } else if (value && values && !allowedEmpty.includes(key)) {
        const checks = _specialCases(key, value);
        errors[typedKey] = '';

        if (checks) {
          isError = true;
          errors[typedKey] = checks;
        }
      } else {
        errors[typedKey] = '';
      }
    });

    return { isError, errors };
  }
  function _specialCases(key: string, value: string) {
    switch (key) {
      case 'weight':
        const isNumber = Number.isNaN(parseInt(value, 10));

        return isNumber ? `${key} harus berupa angka` : null;
      default:
        return null;
    }
  }

  return {
    ...rest,
    queryKey: [...isKeyArray],
    queryFn: async () => await _verify(values),
  };
}
export default function useCosts(props: CostsParams) {
  const setSearchHistory = useSetAtom(searchHistory);
  const { data, ...queries } = useQuery<DataStructure>(costsFetcher(props));

  useEffect(() => {
    const { costs, courier, date, key } = data || {};

    setSearchHistory((prev) => {
      if (!data) return prev;
      const filterDuplicate = prev.filter((item) => item.key !== key);

      return [{ costs, courier: courier, date, key }, ...filterDuplicate];
    });
  }, [data]);

  return { ...queries, ...data };
}

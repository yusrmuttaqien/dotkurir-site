import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { searchHistory } from '@/app/[lang]/(index)/store';
import { getCosts } from '@/app/[lang]/(actions)/costs';
import type { DataStructure, CostsParams, CostsFetcherParams } from './type';

export function costsFetcher(params: CostsFetcherParams) {
  const { key = 'costs', values, contents, ...rest } = params || {};
  const { validation, labels } = contents;
  const isKeyArray = Array.isArray(key) ? [...key] : [key];

  async function _verify(values: CostsFetcherParams['values']) {
    const { isError, errors } = _valueChecks(values) || {};

    if (isError) return Promise.reject(errors);
    return await getCosts(values);
  }
  function _valueChecks(values: CostsFetcherParams['values']) {
    if (!values) return;
    let isError = false;
    let errors = { ...values };

    Object.entries(values).forEach(([key, value]) => {
      const typedKey = key as keyof typeof errors;
      const lTypedKey = key as keyof typeof labels;

      if (!value && values) {
        isError = true;
        errors[typedKey] = `${labels[lTypedKey]} ${validation.required}`;
      } else if (value && values) {
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
        const lTypedKey = key as keyof typeof labels;

        return isNumber ? `${labels[lTypedKey]} ${validation.mustNumber}` : null;
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
    const { key, ...rest } = data || {};

    if (!data) return;

    setSearchHistory((prev) => {
      const filterDuplicate = prev.filter((item) => item.key !== key);

      return [{ key, ...rest }, ...filterDuplicate];
    });
  }, [data]);

  return { ...queries, ...data };
}

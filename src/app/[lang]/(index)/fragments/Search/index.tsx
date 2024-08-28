'use client';

import { useState, useEffect, useCallback } from 'react';
import useProvincies from '@/hooks/provinces';
import useCosts from '@/hooks/costs';
import useCities from '@/hooks/cities';
import Input from '@/components/Input';
import Image from '@/components/Image';
import Button from '@/components/Button';
import ComboBox from '@/components/ComboBox';
import Calculate from '@/svg/Calculate';
import Loading from '@/svg/Loading';
import classMerge from '@/utils/classMerge';
import debounce from '@/utils/debounce';
import type { FormEvent } from 'react';
import type { SearchProps, FormSubmit } from './type';

const GROUP_STYLE = 'space-y-7 w-[min(230px,100%)] flex-shrink-0';

export default function Search(props: SearchProps) {
  const { className, contents } = props;
  const { couriers, count, labels, required, validation } = contents;
  const [originProvince, setOriginProvince] = useState<string | undefined>(undefined);
  const [destProvince, setDestProvince] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState<FormSubmit>(undefined);
  const [formState, setFormState] = useState<
    ({ queryGo: boolean } & Partial<FormSubmit>) | undefined
  >(undefined);
  const { provinces, isLoading: loadingProv } = useProvincies();
  const {
    cities: citOri,
    isLoading: loadingCitOri,
    isError: errorCitOri,
  } = useCities({
    enabled: !!originProvince,
    params: `?province=${originProvince}`,
    key: ['cities', `cities-of-${originProvince}`],
  });
  const {
    cities: citDest,
    isLoading: loadingCitDest,
    isError: errorCitDest,
  } = useCities({
    enabled: !!destProvince,
    params: `?province=${destProvince}`,
    key: ['cities', `cities-of-${destProvince}`],
  });
  const { isLoading: loadingCosts, error } = useCosts({
    enabled: !!formState?.queryGo,
    values: formData,
    key: ['costs', JSON.stringify(formData)],
    retry: false,
    contents: contents,
  });

  function _onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const courier = (document.getElementsByName('courier[id]')[0] as HTMLInputElement)?.value;
    const weight = (document.getElementsByName('weight')[0] as HTMLInputElement)?.value;
    const oriProv = (document.getElementsByName('origin-province[id]')[0] as HTMLInputElement)
      ?.value;
    const destProv = (document.getElementsByName('destination-province[id]')[0] as HTMLInputElement)
      ?.value;
    const oriCit = (document.getElementsByName('origin-city[id]')[0] as HTMLInputElement)?.value;
    const destCit = (document.getElementsByName('destination-city[id]')[0] as HTMLInputElement)
      ?.value;

    setFormData({
      courier,
      weight: weight || undefined,
      oriProv,
      destProv,
      oriCit,
      destCit,
    });
    setFormState((prev) => ({ ...prev, queryGo: true }));
  }
  function _clearError(name: string) {
    const field = name as keyof FormSubmit;

    setFormState((prev) => ({ ...prev, queryGo: false, [field]: undefined }));
  }

  const debouncedClearError = useCallback(debounce(_clearError, 500), []);

  useEffect(() => {
    const formState = error as unknown as FormSubmit;

    setFormState((prev) => ({ queryGo: prev?.queryGo || false, ...formState }));
  }, [error]);

  return (
    <form
      className={classMerge('flex items-center justify-center gap-7 flex-wrap', className)}
      onSubmit={_onSubmit}
    >
      <div className={GROUP_STYLE}>
        <ComboBox<(typeof provinces)[number]>
          isDisabled={loadingCosts}
          isLoading={loadingProv}
          label={labels.oriProv}
          placeholder={required}
          name="origin-province"
          options={provinces}
          optionKey={({ current }) => current.id}
          onChange={({ value }) => {
            debouncedClearError('oriProv');
            setOriginProvince(value?.id);
          }}
          error={formState?.oriProv}
        >
          {({ selected }) => selected?.province}
          {({ current }) => ({ value: current, children: current.province })}
        </ComboBox>
        <ComboBox<(typeof citOri)[number]>
          isDisabled={!originProvince || errorCitOri || loadingCosts}
          isLoading={loadingCitOri}
          label={labels.oriCit}
          placeholder={required}
          options={citOri}
          optionKey={({ current }) => current.id}
          name="origin-city"
          error={errorCitOri ? validation.failFetch : formState?.oriCit}
          onChange={() => debouncedClearError('oriCit')}
        >
          {({ selected }) => selected && `${selected?.city} (${selected?.type})`}
          {({ current }) => ({
            value: current,
            children: `${current?.city} (${current?.type})`,
          })}
        </ComboBox>
      </div>
      <div className={GROUP_STYLE}>
        <ComboBox<(typeof provinces)[number]>
          isDisabled={loadingCosts}
          isLoading={loadingProv}
          label={labels.destProv}
          placeholder={required}
          options={provinces}
          optionKey={({ current }) => current.id}
          name="destination-province"
          onChange={({ value }) => {
            debouncedClearError('destProv');
            setDestProvince(value?.id);
          }}
          error={formState?.destProv}
        >
          {({ selected }) => selected?.province}
          {({ current }) => ({ value: current, children: current.province })}
        </ComboBox>
        <ComboBox<(typeof citDest)[number]>
          isDisabled={!destProvince || errorCitDest || loadingCosts}
          isLoading={loadingCitDest}
          label={labels.destCit}
          placeholder={required}
          options={citDest}
          optionKey={({ current }) => current.id}
          name="destination-city"
          error={errorCitDest ? validation.failFetch : formState?.destCit}
          onChange={() => debouncedClearError('destCit')}
        >
          {({ selected }) => selected && `${selected?.city} (${selected?.type})`}
          {({ current }) => ({
            value: current,
            children: `${current?.city} (${current?.type})`,
          })}
        </ComboBox>
      </div>
      <div className={GROUP_STYLE}>
        <ComboBox<(typeof couriers)[number]>
          isDisabled={loadingCosts}
          label={labels.courier}
          placeholder={required}
          options={couriers}
          optionKey={({ current }) => current.name}
          name="courier"
          onChange={({ name }) => debouncedClearError(name)}
          error={formState?.courier}
        >
          {({ selected }) => selected?.name}
          {({ current }) => ({
            value: current,
            children: (
              <div className="flex gap-4 items-center">
                <Image
                  src={current.logo}
                  alt={current.name}
                  className={{ div: 'size-[2em]' }}
                  loaderContent={({ state: { isError } }) => (isError ? 'E' : 'L')}
                />
                {current.name}
              </div>
            ),
          })}
        </ComboBox>
        <Input
          label={labels.weight}
          suffix="gram"
          placeholder={required}
          name="weight"
          isDisabled={loadingCosts}
          onChange={({ name }) => debouncedClearError(name)}
          error={formState?.weight}
        />
      </div>
      <Button className="justify-center self-stretch" type="submit" isDisabled={loadingCosts}>
        {count}{' '}
        {loadingCosts ? <Loading className="size-[1em]" /> : <Calculate className="size-[1em]" />}
      </Button>
    </form>
  );
}

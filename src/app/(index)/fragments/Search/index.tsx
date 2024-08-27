'use client';

import { Fragment, type FormEvent } from 'react';
import Input from '@/components/Input';
import Image from '@/components/Image';
import Button from '@/components/Button';
import ComboBox from '@/components/ComboBox';
import Calculate from '@/svg/Calculate';
import classMerge from '@/utils/classMerge';
import type { SearchProps } from './type';

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Devon Webb' },
  { id: 6, name: 'Devon Webba' },
  { id: 7, name: 'Devon Webbb' },
  { id: 8, name: 'Devon Webbcass nameseses' },
  { id: 9, name: 'Devon Webbd' },
  { id: 10, name: 'Devon Webbe' },
];
const GROUP_STYLE = 'space-y-7 w-[min(230px,100%)]';

export default function Search(props: SearchProps) {
  const { className, contents } = props;
  const { couriers } = contents;

  function _onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const courier = (document.getElementsByName('courier[id]')[0] as HTMLInputElement)?.value;
    const weight = (document.getElementsByName('weight')[0] as HTMLInputElement)?.value;

    // console.log(courier, weight);
  }

  return (
    <form
      className={classMerge('flex items-center justify-center gap-7', className)}
      onSubmit={_onSubmit}
    >
      <div className={GROUP_STYLE}>
        <ComboBox<(typeof people)[0]>
          label="Provinsi asal"
          placeholder="Wajib diisi"
          options={people}
          optionKey={({ current }) => current.name}
          // onChange={({ value }) => console.log(value)}
          name="origin-province"
        >
          {({ selected }) => selected?.name}
          {({ current }) => ({ value: current, children: current.name })}
        </ComboBox>
        <ComboBox<(typeof people)[0]>
          label="Pilih kota asal"
          placeholder="Opsional"
          options={people}
          optionKey={({ current }) => current.name}
          // onChange={({ value }) => console.log(value)}
          name="origin-city"
        >
          {({ selected }) => selected?.name}
          {({ current }) => ({ value: current, children: current.name })}
        </ComboBox>
      </div>
      <div className={GROUP_STYLE}>
        <ComboBox<(typeof people)[0]>
          label="Provinsi tujuan"
          placeholder="Wajib diisi"
          options={people}
          optionKey={({ current }) => current.name}
          // onChange={({ value }) => console.log(value)}
          name="destination-province"
        >
          {({ selected }) => selected?.name}
          {({ current }) => ({ value: current, children: current.name })}
        </ComboBox>
        <ComboBox<(typeof people)[0]>
          label="Kota tujuan"
          placeholder="Opsional"
          options={people}
          optionKey={({ current }) => current.name}
          // onChange={({ value }) => console.log(value)}
          name="destination-city"
        >
          {({ selected }) => selected?.name}
          {({ current }) => ({ value: current, children: current.name })}
        </ComboBox>
      </div>
      <div className={GROUP_STYLE}>
        <ComboBox<(typeof couriers)[0]>
          label="Pilih kurir"
          placeholder="Wajib diisi"
          options={couriers}
          optionKey={({ current }) => current.name}
          // onChange={({ value }) => console.log(value)}
          name="courier"
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
        <Input label="Berat paket" suffix="gram" placeholder="Wajib diisi" name="weight" />
      </div>
      <Button className="justify-center self-stretch" type="submit">
        Hitung <Calculate className="size-[1em]" />
      </Button>
    </form>
  );
}

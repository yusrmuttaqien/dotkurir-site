'use server';

export async function getCities(params: string = '', passFn?: (e: any) => any) {
  return fetch(process.env.NEXT_PUBLIC_RAJA_ONGKIR_BASE_URL + '/city' + params, {
    headers: {
      key: process.env.NEXT_PUBLIC_RAJA_ONGKIR_API_KEY,
    },
  })
    .then((res) => res.json())
    .then((e) => (passFn ? passFn(e) : e));
}

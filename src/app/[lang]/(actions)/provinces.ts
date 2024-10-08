'use server';

export async function getProvinces(params: string = '', passFn?: (e: any) => any) {
  return fetch(process.env.RAJA_ONGKIR_BASE_URL + '/province' + params, {
    headers: {
      key: process.env.RAJA_ONGKIR_API_KEY,
    },
  })
    .then((res) => res.json())
    .then((e) => (passFn ? passFn(e) : e));
}

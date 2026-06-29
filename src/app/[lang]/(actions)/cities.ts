'use server';

export async function getCities(params: string = '', passFn?: (e: any) => any) {
  try {
    const response = await fetch(process.env.RAJA_ONGKIR_BASE_URL + '/city' + params, {
      headers: {
        key: process.env.RAJA_ONGKIR_API_KEY,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return {
        success: false,
        error: `RajaOngkir API error (status: ${response.status}): ${response.statusText}`,
        data: null,
      };
    }

    const data = await response.json();
    return passFn ? passFn(data) : data;
  } catch (error) {
    return {
      success: false,
      error: `Failed to connect to RajaOngkir API: ${error instanceof Error ? error.message : 'Unknown error'}`,
      data: null,
    };
  }
}

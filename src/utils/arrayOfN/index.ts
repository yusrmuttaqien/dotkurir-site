import type { ArrayOfNParams } from './type';

export default function arrayOfN<T>(params: ArrayOfNParams<T>) {
  const { length, array } = params;
  let arr = [...array];

  if (array.length > length) {
    arr = arr.slice(0, length);
  }

  // NOTE: Fill the array with the last item if it has fewer than N items
  while (arr.length <= length) {
    arr.push(arr[arr.length - 1]);
  }

  return arr;
}

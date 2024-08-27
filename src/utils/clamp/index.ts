import type { ClampParams } from './type';

/**
 * Calculate the clamped value based on the min and max values and the min and max viewports.
 * Returns string of CSS clamp function.
 * Params unit is in pixels.
 * Function by yusrmuttaqien
 */
export default function clamp(params: ClampParams): string {
  const { minValue, maxValue, minViewport, maxViewport, baseFontSize = 16 } = params;
  const isReverse = minValue > maxValue;

  // TODO: Learn how to properly calculate clamp function for reversed values
  if (isReverse) {
    const initClamp = clamp({ minValue: 0, maxValue: maxValue, minViewport, maxViewport });
    const minValueRem = (minValue * 1.2) / baseFontSize;

    return `calc(${minValueRem}rem - ${initClamp})`;
  }

  const preferredViewport = 100 * ((maxValue - minValue) / (maxViewport - minViewport));
  const preferredRelative =
    (minViewport * maxValue - maxViewport * minValue) / (minViewport - maxViewport);
  const relativeRem = preferredRelative / baseFontSize;
  const minValueRem = minValue / baseFontSize;
  const maxValueRem = maxValue / baseFontSize;

  return `clamp(${minValueRem}rem, ${relativeRem}rem + ${preferredViewport}vw, ${maxValueRem}rem)`;
}

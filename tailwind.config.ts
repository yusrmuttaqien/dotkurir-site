import plugin from 'tailwindcss/plugin';
import clamp from './src/utils/clamp';
import { COLOR_YELLOW } from './src/constants/tailwind.config';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/constants/**/*.{js,ts,jsx,tsx,mdx}',
    './src/svg/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nohemi: ['var(--font-nohemi)', 'sans-serif'],
      },
      screens: {
        hoverable: { raw: '(hover: hover)' },
        unhoverable: { raw: '(hover: none)' },
      },
      colors: {
        yellow: COLOR_YELLOW,
      },
    },
  },
  plugins: [
    plugin(({ addComponents, matchUtilities, addUtilities, theme }) => {
      // Type
      addComponents({
        '.body': {
          fontFamily: theme('fontFamily.nohemi'),
          fontSize: clamp({ minValue: 14, maxValue: 16, minViewport: 320, maxViewport: 1280 }),
        },
        '.wrapper': {
          paddingInline: '1rem',
          width: '100%',
          maxWidth: '68.5rem',
          marginInline: 'auto',
          '@media (min-width:1280px)': {
            paddingInline: '0rem',
            marginInline: 'auto',
          },
        },
      });
      // Trim
      matchUtilities(
        {
          trim: (family) => {
            let preset: Record<string, { before: string; after: string; lineHeight?: string }> = {
              nohemi: { before: '-0.04em', after: '-0.2em' },
              helveticaNeue: { before: '-0.1em', after: '-0.4em' },
            };
            preset = {
              ...preset,
              nohemiHeight: { ...preset.nohemi, lineHeight: '0.9em' },
              helveticaNeueHeight: { ...preset.helveticaNeue, lineHeight: '1.2em' },
            };
            const selected = preset[family];

            return {
              textTransform: 'uppercase',
              lineHeight: selected.lineHeight || 'unset',
              '&::before': {
                content: '""',
                display: 'table',
                marginBottom: selected.before,
              },
              '&::after': {
                content: '""',
                display: 'table',
                marginTop: selected.after,
              },
            };
          },
        },
        {
          values: {
            nohemi: 'nohemi',
            'nohemi-height': 'nohemiHeight',
          },
        }
      );
      // Clamp
      matchUtilities(
        {
          'gap-clamp': (size) => {
            const [minValue, maxValue, minViewport, maxViewport] = size.split(' ').map(Number);

            return { gap: clamp({ minValue, maxValue, minViewport, maxViewport }) };
          },
          'text-clamp': (size) => {
            const [minValue, maxValue, minViewport, maxViewport] = size.split(' ').map(Number);

            return { fontSize: clamp({ minValue, maxValue, minViewport, maxViewport }) };
          },
          'py-clamp': (size) => {
            const [minValue, maxValue, minViewport, maxViewport] = size.split(' ').map(Number);

            return { paddingBlock: clamp({ minValue, maxValue, minViewport, maxViewport }) };
          },
          'pb-clamp': (size) => {
            const [minValue, maxValue, minViewport, maxViewport] = size.split(' ').map(Number);

            return { paddingBottom: clamp({ minValue, maxValue, minViewport, maxViewport }) };
          },
          'right-clamp': (size) => {
            const [minValue, maxValue, minViewport, maxViewport] = size.split(' ').map(Number);

            return { right: clamp({ minValue, maxValue, minViewport, maxViewport }) };
          },
        },
        { values: { none: '0 0 0 0' } }
      );
      // Translate
      matchUtilities(
        {
          'translate-z': (value) => ({
            '--tw-translate-z': value,
            transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
          }),
        },
        { values: theme('translate'), supportsNegativeValues: true }
      );
      // Perspective
      addUtilities({
        '.transform-preserve3d': { transformStyle: 'preserve-3d' },
      });
      matchUtilities(
        {
          perspective: (value) => {
            return { perspective: value };
          },
        },
        { values: { '5000': '5000px' } }
      );
      matchUtilities(
        {
          'perspective-origin': (value) => {
            return { perspectiveOrigin: value };
          },
        },
        { values: { left: 'left', right: 'right', center: 'center' } }
      );
    }),
  ],
};
export default config;

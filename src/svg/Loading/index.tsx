import type { LoadingProps } from './type';

export default function Loading(props: LoadingProps) {
  const { ...rest } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...rest}>
      <g fill="currentColor">
        <circle cx="12" cy="3.5" r="1.5">
          <animateTransform
            attributeName="transform"
            calcMode="discrete"
            dur="1.8s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;90 12 12;180 12 12;270 12 12"
          />
          <animate attributeName="opacity" dur="0.45s" repeatCount="indefinite" values="1;1;0" />
        </circle>
        <circle cx="12" cy="3.5" r="1.5" transform="rotate(30 12 12)">
          <animateTransform
            attributeName="transform"
            begin="0.15s"
            calcMode="discrete"
            dur="1.8s"
            repeatCount="indefinite"
            type="rotate"
            values="30 12 12;120 12 12;210 12 12;300 12 12"
          />
          <animate
            attributeName="opacity"
            begin="0.15s"
            dur="0.45s"
            repeatCount="indefinite"
            values="1;1;0"
          />
        </circle>
        <circle cx="12" cy="3.5" r="1.5" transform="rotate(60 12 12)">
          <animateTransform
            attributeName="transform"
            begin="0.3s"
            calcMode="discrete"
            dur="1.8s"
            repeatCount="indefinite"
            type="rotate"
            values="60 12 12;150 12 12;240 12 12;330 12 12"
          />
          <animate
            attributeName="opacity"
            begin="0.3s"
            dur="0.45s"
            repeatCount="indefinite"
            values="1;1;0"
          />
        </circle>
      </g>
    </svg>
  );
}

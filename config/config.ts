import { join } from 'path';

export default {
  title: 'Select-Tree',
  exportStatic: {},
  hash: true,
  theme: {
    '@hd': '0.04rem',
  },
  targets: {
    ios: 8,
  },
  // 用于替换 __VERSION__ pkg.version
  extraBabelPlugins: ['version'],
  styles: [
    `.__dumi-default-mobile-demo-layout {
      min-height: 100vh;
      background: #f5f5f5;
      padding: 0 !important;
      overflow: hidden;
      font-size: 0.26rem;
    }
    .__dumi-default-device-status {
      border-bottom: 1px solid #e3e3e3;
    }
    .__dumi-default-mobile-previewer {
      font-size: initial;
    }
    .am-icon {
      fill: currentColor;
      background-size: cover;
      width: 22px;
      height: 22px;
    }
    `,
  ],
};

import type { StorybookConfig } from '@storybook/react-vite';
// keycloakifyResolver 已移除，因其未被使用

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  async viteFinal(config) {
    // 简化配置，避免复杂的插件解析问题
    config.plugins = config.plugins || [];
    
    // 只添加基本的 keycloakify 解析支持
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    
    // 简单的 keycloakify 支持
    (config.resolve.alias as any)['keycloakify/login'] = 'keycloakify/login';
    (config.resolve.alias as any)['keycloakify/account'] = 'keycloakify/account';
    (config.resolve.alias as any)['keycloakify/admin'] = 'keycloakify/admin';
    
    return config;
  }
};

export default config;

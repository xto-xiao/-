// main.ts
import type { StorybookConfig } from "@storybook/react-vite";
// 若vite版本兼容，直接导入defineConfig
import { defineConfig } from "vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: ["@storybook/addon-essentials"],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
};

export default config;
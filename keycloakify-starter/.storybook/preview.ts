// 1. 导入必要的类型和模块
import type { Preview, Story } from "@storybook/react";
// 若keycloakify@11+，storybook模块路径为"keycloakify"（非"keycloakify/storybook"）
import { KcContextProvider } from "keycloakify";

// 2. 装饰器配置（明确Story类型）
export const decorators = [
    (Story: Story) => (
        <KcContextProvider>
        <Story />
        < /KcContextProvider>
    ),
];

// 3. 简化预览配置（避免正则表达式错误）
export default {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    }
} satisfies Preview;
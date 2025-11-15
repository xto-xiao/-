import type { Preview } from "@storybook/react";
import React, { type ReactElement } from "react";

// 简化的装饰器，移除对KcContextProvider的依赖
export const decorators = [
    (Story: React.ComponentType): ReactElement => (
        <div style={{ padding: '20px' }}>
            <Story />
        </div>
    ),
];

export default {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },
        a11y: {
            test: "todo"
        }
    }
} satisfies Preview;


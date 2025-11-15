import type { Meta, StoryObj } from "@storybook/react";
import { KcPage } from "./KcPage";

// 定义语言标签类型
type LanguageTag = "ar" | "ca" | "cs" | "da" | "de" | "el" | "en" | "es" | "fa" | "fi" | "fr" | "hu" | "it" | "ja" | "ka" | "lt" | "lv" | "nl" | "no" | "pl" | "pt" | "pt-BR" | "ru" | "sk" | "sv" | "th" | "tr" | "uk" | "zh-CN" | "zh-TW";

// 创建完整的mock i18n对象
const createMockI18n = () => ({
    msg: (key: string, ...args: any[]) => {
        const messages: Record<string, string> = {
            "loginTitleHtml": "登录 - {0}",
            "loginAccountTitle": "登录到您的账户",
            "username": "用户名",
            "usernameOrEmail": "用户名或邮箱",
            "email": "邮箱",
            "password": "密码",
            "rememberMe": "记住我",
            "doForgotPassword": "忘记密码？",
            "doLogIn": "登录",
            "noAccount": "没有账户？",
            "doRegister": "注册"
        };
        let message = messages[key] || key;
        args.forEach((arg, index) => {
            const argStr = String(arg || '');
            message = message.replace(`{${index}}`, argStr);
        });
        return message;
    },
    msgStr: (key: string, ...args: any[]) => {
        return createMockI18n().msg(key, ...args);
    },
    advancedMsg: (key: string) => createMockI18n().msg(key),
    advancedMsgStr: (key: string) => createMockI18n().msgStr(key),
    currentLanguage: { languageTag: "zh-CN" as LanguageTag, label: "简体中文" },
    enabledLanguages: [
        { languageTag: "zh-CN" as LanguageTag, label: "简体中文", href: "?kc_locale=zh-CN" },
        { languageTag: "en" as LanguageTag, label: "English", href: "?kc_locale=en" }
    ],
    isFetchingTranslations: false
});

// 创建mock context的函数
const createMockContext = (overrides: any = {}) => ({
    themeName: "keycloakify-starter",
    properties: {},
    pageId: "login.ftl",
    themeVersion: "11.11.2",
    url: {
        loginAction: "#",
        resourcesPath: "/resources/",
        resourcesCommonPath: "/resources-common/",
        loginRestartFlowUrl: "#",
        loginUrl: "#",
        registrationUrl: "#",
        loginResetCredentialsUrl: "#",
    },
    realm: {
        displayName: "六个核桃team-text",
        displayNameHtml: "六个核桃team-text",
        internationalizationEnabled: true,
        registrationEmailAsUsername: false,
        loginWithEmailAllowed: true,
        rememberMe: true,
        resetPasswordAllowed: true,
        registrationAllowed: true,
        password: true,
    },
    auth: {
        showUsername: true,
        showPassword: true,
        showRememberMe: true,
        showResetCredentials: true,
        selectedCredential: "",
    },
    messagesPerField: {
        existsError: () => false,
        get: () => "",
        getFirstError: () => "",
    },
    message: undefined,
    isAppInitiatedAction: false,
    ...overrides
});

const meta = {
    title: "Login/login.ftl",
    component: KcPage
} satisfies Meta<typeof KcPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        kcContext: createMockContext(),
        i18n: createMockI18n() as any
    }
};

export const WithoutRegistration: Story = {
    args: {
        kcContext: createMockContext({ realm: { registrationAllowed: false } }),
        i18n: createMockI18n() as any
    }
};

export const WithoutRememberMe: Story = {
    args: {
        kcContext: createMockContext({ realm: { rememberMe: false } }),
        i18n: createMockI18n() as any
    }
};

export const WithoutPasswordReset: Story = {
    args: {
        kcContext: createMockContext({ realm: { resetPasswordAllowed: false } }),
        i18n: createMockI18n() as any
    }
};

export const WithEmailAsUsername: Story = {
    args: {
        kcContext: createMockContext({ realm: { loginWithEmailAllowed: false } }),
        i18n: createMockI18n() as any
    }
};

export const WithPresetUsername: Story = {
    args: {
        kcContext: createMockContext({ login: { username: "max.mustermann@mail.com" } }),
        i18n: createMockI18n() as any
    }
};
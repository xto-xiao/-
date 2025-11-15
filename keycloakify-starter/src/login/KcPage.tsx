import { useState } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { KcContext } from "./KcContext";
import { I18n, useI18n } from "./i18n";
import "./styles/login.css";

export const KcPage = ({ 
    kcContext,
    i18n,
    doUseDefaultCss = false, // 使用自定义CSS
    classes
}: {
    kcContext: KcContext;
    i18n?: I18n;
    doUseDefaultCss?: boolean;
    classes?: Record<string, string>;
}) => {
    const actualI18n = i18n || useI18n({ kcContext });
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { msg, msgStr } = actualI18n as I18n;
    const { realm, url, auth, messagesPerField } = kcContext;
    const login = (kcContext as any).login ?? {};
    const usernameHidden = (kcContext as any).usernameHidden ?? false;
    
    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <div className="login-page">
            <div className="login-card">
                {/* 标题区域 */}
                <div className="login-header">
                    <h1 className="login-title">{msg("loginAccountTitle")}</h1>
                    <div className="login-subtitle">
                        {msg("loginTitleHtml", String(realm.displayNameHtml || ""))}
                    </div>
                </div>

                {/* 错误消息显示 */}
                {!messagesPerField.existsError("username", "password") && kcContext.message && (kcContext.message.type !== "warning" || !kcContext.isAppInitiatedAction) && (
                    <div className={clsx(`alert-${kcContext.message.type}`, "login-alert")}>
                        <span 
                            dangerouslySetInnerHTML={{ __html: kcSanitize(kcContext.message.summary) }}
                        />
                    </div>
                )}
                
                {/* 登录表单 */}
                {(realm as any).password && (
                    <form
                        className="login-form"
                        onSubmit={() => {
                            setIsLoginButtonDisabled(true);
                            return true;
                        }}
                        action={url.loginAction}
                        method="post"
                    >
                        {!usernameHidden && (
                            <div className="form-group">
                                <label htmlFor="username" className="form-label">
                                    {!realm.registrationEmailAsUsername
                                        ? msg("username")
                                        : !realm.registrationEmailAsUsername
                                        ? msg("usernameOrEmail")
                                        : msg("email")}
                                </label>
                                <input
                                    id="username"
                                    className="login-input"
                                    name="username"
                                    defaultValue={login.username ?? ""}
                                    type="text"
                                    autoFocus
                                    autoComplete="username"
                                    placeholder={!realm.registrationEmailAsUsername ? "请输入用户名" : "请输入邮箱"}
                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                />
                                {messagesPerField.existsError("username", "password") && (
                                    <span
                                        className="error-message"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                )}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                {msg("password")}
                            </label>
                            <input
                                id="password"
                                className="login-input"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="请输入密码"
                                aria-invalid={messagesPerField.existsError("username", "password")}
                            />
                            {usernameHidden && messagesPerField.existsError("username", "password") && (
                                <span
                                    className="error-message"
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                    }}
                                />
                            )}
                        </div>

                        <div className="form-options">
                            {(realm as any).rememberMe && !usernameHidden && (
                                <label className="remember-me">
                                    <input
                                        id="rememberMe"
                                        name="rememberMe"
                                        type="checkbox"
                                        defaultChecked={!!login.rememberMe}
                                    />
                                    <span className="remember-text">{msg("rememberMe")}</span>
                                </label>
                            )}
                            {(realm as any).resetPasswordAllowed && (
                                <a className="link forgot-password" href={(url as any).loginResetCredentialsUrl}>
                                    {msg("doForgotPassword")}
                                </a>
                            )}
                        </div>

                        <input type="hidden" name="credentialId" value={(auth as any)?.selectedCredential ?? ""} />
                        <button
                            type="submit"
                            className="login-btn"
                            disabled={isLoginButtonDisabled}
                        >
                            {msgStr("doLogIn")}
                        </button>
                    </form>
                )}
                
                {/* 注册链接 */}
                {(realm as any).password && (realm as any).registrationAllowed && !(kcContext as any).registrationDisabled && (
                    <div className="register-link">
                        <span>{msg("noAccount")}</span>
                        <a className="link" href={(url as any).registrationUrl}>
                            {msg("doRegister")}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KcPage;

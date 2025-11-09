import { useKcLogin } from "keycloakify";
import "./styles/login.css"; // 导入样式

export const KcPage = () => {
    // Keycloak 登录相关的工具函数和属性
    const {
        submitLogin,
        usernameProps,
        passwordProps,
        links: { forgotPassword, register },
    } = useKcLogin();

    return (
        <div className="login-page">
            {/* 登录卡片 */}
            <div className="login-card">
                <form onSubmit={submitLogin} className="login-form">
                    {/* 用户名/邮箱输入框 */}
                    <input
                        type="text"
                        placeholder="用户名/邮箱"
                        {...usernameProps}
                        className="login-input"
                    />

                    {/* 密码输入框 */}
                    <input
                        type="password"
                        placeholder="密码"
                        {...passwordProps}
                        className="login-input"
                    />

                    {/* 登录按钮 */}
                    <button type="submit" className="login-btn">
                        登录
                    </button>
                </form>

                {/* 忘记密码链接 */}
                <a href={forgotPassword} className="link forgot-password">
                    忘记密码？
                </a>

                {/* 其他方式登录 */}
                <div className="other-login">其他方式登录</div>
            </div>

            {/* 注册账号链接 */}
            <a href={register} className="link register-link">
                注册账号
            </a>
        </div>
    );
};

export default KcPage;
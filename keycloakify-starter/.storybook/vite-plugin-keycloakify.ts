import type { Plugin } from 'vite';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

/**
 * Vite 插件：修复 keycloakify 包的解析问题
 * keycloakify 包没有标准的 exports 字段，需要手动解析
 */
export function keycloakifyResolver(): Plugin {
  return {
    name: 'keycloakify-resolver',
    enforce: 'pre',
    resolveId(id) {
      // 处理 keycloakify 主入口
      if (id === 'keycloakify') {
        // 使用 process.cwd() 获取项目根目录
        const projectRoot = process.cwd();
        const loginPath = resolve(projectRoot, 'node_modules/keycloakify/login/index.js');
        if (existsSync(loginPath)) {
          return loginPath;
        }
        // 如果 login/index.js 不存在，尝试其他路径
        const accountPath = resolve(projectRoot, 'node_modules/keycloakify/account/index.js');
        if (existsSync(accountPath)) {
          return accountPath;
        }
      }
      
      // 处理 keycloakify 的子路径导入（如 keycloakify/login, keycloakify/storybook）
      if (id.startsWith('keycloakify/')) {
        const projectRoot = process.cwd();
        const subPath = id.replace('keycloakify/', '');
        const fullPath = resolve(projectRoot, `node_modules/keycloakify/${subPath}/index.js`);
        if (existsSync(fullPath)) {
          return fullPath;
        }
        // 尝试直接文件路径
        const directPath = resolve(projectRoot, `node_modules/keycloakify/${subPath}.js`);
        if (existsSync(directPath)) {
          return directPath;
        }
      }
      
      return null;
    }
  };
}


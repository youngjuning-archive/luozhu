import fs from 'fs-extra';
import path from 'path';
import execa from 'execa';

const { Select } = require('enquirer');

const init = async () => {
  const templateDir = path.resolve(__dirname, '../template');
  const projectDir = `${process.cwd()}`;
  fs.copySync(templateDir, projectDir);
  console.log();
  // 拼接 package.json 文件
  const origin = JSON.parse(fs.readFileSync(`${projectDir}/package.json`, 'utf8'));
  const packageJson = {
    ...origin,
    gitHooks: origin.gitHooks
      ? {
          ...origin.gitHooks,
          'pre-commit': 'lint-staged',
        }
      : {
          'pre-commit': 'lint-staged',
        },
    'lint-staged': origin['lint-staged']
      ? {
          ...origin.gitHooks,
          '**/*.{js,jsx,ts,tsx}': ['eslint --fix'],
          '**/*.{md,json}': ['prettier --write'],
        }
      : {
          '**/*.{js,jsx,ts,tsx}': ['eslint --fix'],
          '**/*.{md,json}': ['prettier --write'],
        },
  };
  fs.writeFileSync(`${projectDir}/package.json`, JSON.stringify(packageJson));
  // 拼接 .vscode/settings.json 文件
  const originVscodeSettings = JSON.parse(
    fs.readFileSync(`${projectDir}/.vscode/settings.json`, 'utf8')
  );
  const vscodeSettings = {
    ...originVscodeSettings,
    'editor.formatOnSave': false,
    'editor.codeActionsOnSave': {
      'source.fixAll.eslint': true,
    },
  };
  fs.writeFileSync(`${projectDir}/.vscode/settings.json`, JSON.stringify(vscodeSettings));
  // 拼接 .eslintrc.js 文件
  const prompt = new Select({
    name: 'eslintType',
    message: 'Pick a eslint type',
    choices: [
      'base',
      'typescript',
      'react',
      'react-typescript',
      'react-native',
      'react-native-typescript',
    ],
  });
  const eslintType = await prompt.run();
  const eslintConfig = `module.exports = {
  root: true,
  extends: ['@luozhu/eslint-config-${eslintType}'],
};`;

  fs.writeFileSync(`${projectDir}/.eslintrc.js`, eslintConfig);
  // 安装依赖
  execa.commandSync(
    `yarn add commitizen -D -W eslint prettier @luozhu/eslint-config-${eslintType} @luozhu/prettier-config lint-staged yorkie`,
    {
      shell: true,
      stdout: 'inherit',
      stderr: 'inherit',
    }
  );
  if (eslintType.indexOf('typescript') !== -1) {
    execa.commandSync(`yarn add commitizen -D -W typescript`, {
      shell: true,
      stdout: 'inherit',
      stderr: 'inherit',
    });
  }
};

export { init };

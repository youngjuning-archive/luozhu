import fs from 'fs-extra';
import path from 'path';
import execa from 'execa';
import chalk from 'chalk';

const { Select } = require('enquirer');

const init = async () => {
  const templateDir = path.resolve(__dirname, '../template');
  const projectDir = `${process.cwd()}`;
  if (
    fs.existsSync(`${projectDir}/.eslintrc.js`) ||
    fs.existsSync(`${projectDir}/.eslintrc.json`)
  ) {
    console.log(
      chalk.yellow('The project already has eslint configuration, please reset it first.')
    );
    process.exit(1);
  }
  fs.copySync(templateDir, projectDir);
  console.log();
  if (!fs.existsSync(`${projectDir}/package.json`)) {
    execa.commandSync('npm init -y', {
      shell: true,
      stdout: 'inherit',
      stderr: 'inherit',
    });
  }
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
  // 拼接 .eslintrc.js 文件
  const prompt = new Select({
    name: 'eslintType',
    message: 'Pick a eslint type',
    choices: ['base', 'typescript', 'react', 'react-typescript', 'react-native'],
  });
  const eslintType = await prompt.run();
  const eslintConfig = `module.exports = {
  root: true,
  extends: ['@luozhu/eslint-config-${eslintType}'],
};\n`;

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

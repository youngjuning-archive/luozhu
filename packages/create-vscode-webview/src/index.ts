import { program } from 'commander';
import chalk from 'chalk';
import execa from 'execa';
import inquirer from 'inquirer';
import tmp from 'tmp-promise';
import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import generator from '@luozhu/template-generator';
import { isDirEmpty } from '@luozhu/node';

interface IMeta {
  name: string;
  displayName: string;
  description: string;
  publisher: string;
  repository: string;
}

const getQuestions = (name: string) => {
  return [
    {
      type: 'input',
      message: 'extension name',
      name: 'name',
      default: name,
    },
    {
      type: 'input',
      message: 'extension displayName',
      name: 'displayName',
    },
    {
      type: 'input',
      message: 'extension description',
      name: 'description',
    },
    {
      type: 'input',
      message: 'extension publisher',
      name: 'publisher',
    },
    {
      type: 'input',
      message: 'github repository（author/repo）',
      name: 'repository',
    },
  ];
};

const init = (): void => {
  const packageJson = require('../package.json');
  program
    .version(packageJson.version)
    .description(packageJson.description)
    .argument('<name>', 'extension name')
    .action(async name => {
      const answer: IMeta = await inquirer.prompt(getQuestions(name));
      const spinner = ora(chalk.blackBright(`Creating ${name}`));
      try {
        spinner.start();

        const rootDir = `${process.cwd()}/${name}`;
        if (fs.existsSync(rootDir) && !(await isDirEmpty(rootDir))) {
          spinner.fail(
            chalk.red(`Cannot initialize new project because directory  ${rootDir} is not empty.`)
          );
          process.exit(0);
        }

        const tmpdir = await tmp.dir({ unsafeCleanup: true });
        fs.copySync(path.join(__dirname, '../template'), tmpdir.path);

        await generator<IMeta>(answer, tmpdir.path);

        fs.copySync(tmpdir.path, rootDir);
        const { stdout } = execa.commandSync('git init', {
          cwd: rootDir,
        });
        spinner.info(`${stdout}`);
        await tmpdir.cleanup();
        spinner.succeed(chalk.greenBright(`The ${name} has been generated at ${rootDir}`));
      } catch (error) {
        spinner.fail(chalk.red(error.message));
        process.exit(0);
      }
    })
    .parse(process.argv);
};

export = { init };

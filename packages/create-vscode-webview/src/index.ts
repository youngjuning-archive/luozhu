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
  version: string;
  description: string;
  author: string;
  email: string;
  url: string;
  directory: string;
}

const getQuestions = (name: string) => {
  const { stdout: author } = execa.commandSync('git config user.name');
  const { stdout: email } = execa.commandSync('git config user.email');

  return [
    {
      type: 'input',
      message: 'package name',
      name: 'name',
      default: name,
    },
    {
      type: 'input',
      message: 'version',
      name: 'version',
      default: '0.0.0',
    },
    {
      type: 'input',
      message: 'description',
      name: 'description',
    },
    {
      type: 'input',
      message: 'author',
      name: 'author',
      validate: input => {
        if (/[/\\]/im.test(input)) {
          console.log(` ${chalk.red('Name cannot contain special characters')}`);
          return false;
        }
        return true;
      },
      default: author,
    },
    {
      type: 'input',
      message: 'email',
      name: 'email',
      default: email,
    },
    {
      type: 'input',
      message: 'url',
      name: 'url',
      default: 'https://youngjuning.js.org',
    },
  ];
};

const init = (): void => {
  const packageJson = require('../package.json');
  program
    .version(packageJson.version)
    .description(packageJson.description)
    .argument('<name>', 'package name')
    .argument('[loc]', 'package location')
    .action(async (name, loc) => {
      const answer: IMeta = await inquirer.prompt(getQuestions(name));
      const spinner = ora(chalk.blackBright(`Creating ${name}`));
      try {
        spinner.start();

        let locPath = '';
        if (loc) {
          locPath = loc;
        } else if (answer.name.startsWith('@')) {
          locPath = answer.name.split('/')[1];
        } else {
          locPath = answer.name;
        }
        answer.directory = locPath;

        const rootDir = `${process.cwd()}/packages/${locPath}`;
        if (fs.existsSync(rootDir) && !(await isDirEmpty(rootDir))) {
          spinner.fail(
            chalk.red(
              `Cannot initialize new project because directory packages/${locPath} is not empty.`
            )
          );
          process.exit(0);
        }

        const tmpdir = await tmp.dir({ unsafeCleanup: true });
        fs.copySync(path.join(__dirname, '../template'), tmpdir.path);

        await generator<IMeta>(answer, tmpdir.path);

        fs.copySync(tmpdir.path, rootDir);
        execa.commandSync('yarn install', {
          cwd: rootDir,
          stdout: 'inherit',
        });

        await tmpdir.cleanup();
        spinner.succeed(chalk.greenBright(`The ${name} has been generated at packages/${locPath}`));
      } catch (error) {
        spinner.fail(chalk.red(error.message));
        process.exit(0);
      }
    })
    .parse(process.argv);
};

export = { init };

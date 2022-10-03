import chalk from 'chalk';
import { networkInterfaces } from 'os';
import { port } from './load-env';

export const onStartHandler = (err: Error | null) => {
  const networks = networkInterfaces();
  if (err || networks === undefined) {
    fatalErrorHandler(err);
  }
  console.log('');
  console.log(chalk.bold('Access URLs:'));
  console.log(chalk.gray('-------------------------------------'));
  for (const interfaceName of Object.keys(networks)) {
    const networkInfo = networks[interfaceName];
    if (!networkInfo) {
      continue;
    }
    for (const info of networkInfo) {
      const { address, family } = info;
      if (!address || family !== 'IPv4') {
        continue;
      }
      const url = chalk
        .magentaBright(`http://${address}:${port}`)
        .replace('127.0.0.1', 'localhost');
      const name = url.includes('localhost') ? 'Local' : interfaceName;
      console.log(`${name}: ${url}`);
    }
  }
  console.log(chalk.gray('-------------------------------------'));
  console.log(chalk.blue(`Press ${chalk.italic.bold('CTRL+C')} to stop`));
  console.log('');
};

export const fatalErrorHandler = (err: any) => {
  console.log('');
  console.log(chalk.bold(chalk.red('Fatal error:')));
  console.log(chalk.gray('-------------------------------------'));
  console.log(err.message || err);
  console.log(chalk.gray('-------------------------------------'));
  console.log('');
  process.exit(1);
};

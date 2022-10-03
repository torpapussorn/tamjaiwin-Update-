import Head from 'next/head';
import pkg from 'package.json';
import { FunctionComponent } from 'react';

export const Title: FunctionComponent = props => {
  return (
    <Head>
      <title>
        {props.children ? props.children + ' - ' : ''}
        {pkg.niceName}
      </title>
    </Head>
  );
};

export default Title;

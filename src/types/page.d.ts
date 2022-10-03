import { NextPage } from 'next';
import React from 'react';

export type Page<Props = {}, InitialProps = Props> = NextPage<
  Props,
  InitialProps
> & { Layout?: React.FC };

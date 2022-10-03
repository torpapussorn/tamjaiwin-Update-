import { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import Router from 'next/router';
import nprogress from 'nprogress';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import Title from 'src/components/Layout/Title';
import 'src/styles/global.scss';

Router.events.on('routeChangeStart', () => {
  nprogress.start();
});

Router.events.on('routeChangeError', () => {
  nprogress.done();
});

Router.events.on('routeChangeComplete', () => {
  nprogress.done();
});

const NoLayout: React.FC = props => <>{props.children}</>;

const _App: NextComponentType<
  AppContext,
  AppInitialProps,
  AppProps & { Component: { Layout: React.FC } }
> = props => {
  const { Component, pageProps } = props;

  const Layout = Component.Layout || NoLayout;

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js');
      });
    }
  }, []);

  return (
    <RecoilRoot>
      <Layout>
        <Title></Title>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
};

export default _App;

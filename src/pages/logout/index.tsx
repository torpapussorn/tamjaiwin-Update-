import { GetServerSideProps } from 'next';
import { destroyCookie } from 'nookies';
import { LIVE_TOKEN, TJW_TOKEN } from '../constant/cookie';
import { Page } from 'src/types/page';

const Logout: Page = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  destroyCookie(ctx, LIVE_TOKEN);
  destroyCookie(ctx, TJW_TOKEN);
  ctx.res.statusCode = 307;
  ctx.res.setHeader('Location', `/login`);
  return {
    props: {},
  };
};

export default Logout;

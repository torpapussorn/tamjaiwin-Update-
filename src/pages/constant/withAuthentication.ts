import { GetServerSidePropsContext } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import Axios from 'axios';
import { LIVE_TOKEN, TJW_TOKEN } from './cookie';

interface WithAuthenticationOptions {
  allowGuest?: boolean;
  guestOnly?: boolean;
}

const defaultOptions: WithAuthenticationOptions = {
  allowGuest: false,
  guestOnly: false,
};

export default async function withAuthentication(ctx: GetServerSidePropsContext, options = defaultOptions) {
  const { req } = ctx;
  const { allowGuest, guestOnly } = options;
  try {
    const cookies = parseCookies(ctx);
    if (guestOnly && cookies[TJW_TOKEN] && cookies[LIVE_TOKEN]) {
      throw new Error('GuestOnly');
    }

    if (allowGuest) {
      return null;
    }

    if (!cookies[TJW_TOKEN] && !cookies[LIVE_TOKEN]) {
      throw new Error('Unauthorized');
    }

    const { data: user, status } = await Axios.get('https://tamjaibet.com/api/users/me', {
      headers: {
        Authorization: 'Bearer ' + cookies[LIVE_TOKEN],
      },
    });
    if (status === 200) {
      return user;
    }
    throw new Error('Unauthorized');
  } catch (error: any) {
    if (!error.message?.match(/GuestOnly|Unauthorized/) && error.response?.statusText !== 'Unauthorized') {
      console.log('[ERROR]', error.message);
    }

    if (error.message === 'GuestOnly') {
      ctx.res.statusCode = 307;
      ctx.res.setHeader('Location', ctx.query.forward  || '/');
      return null;
    }

    destroyCookie(ctx, TJW_TOKEN);
    destroyCookie(ctx, LIVE_TOKEN);

    if (error.message === 'NOT_AGENT') {
      ctx.res.statusCode = 307;
      ctx.res.setHeader('Location', '/error');
      return null;
    }
    if (req.url?.match(/^(\/){0,1}login/)) {
      return null;
    }

    const forward = req.url || '/';
    ctx.res.statusCode = 307;
    ctx.res.setHeader('Location', `/login?forward=${forward}`);
    return null;
  }
}

import { atom, useRecoilValue } from 'recoil';
import tailwindConfig from 'tailwind.config';

const config = tailwindConfig.theme.screens;
const entries = Object.entries<string>(config) as [Breakpoint, string][];
const mapped = entries.map<[Breakpoint, number]>(([b, s]) => [
  b,
  +s.replace(/px/g, ''),
]);
const sorted = mapped.sort(([, a], [, b]) => a - b);
const screen = sorted.reduce((p, [b, w]) => {
  p[b] = w;
  return p;
}, {} as { [property in Breakpoint]: number });

const defaultState: BreakpointState = {
  width: 0,
  height: 0,
  currentBreakpoint: 'xs',
  breakpoints: {
    xxs: false,
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
    sxl: false,
  },
  config,
};

const breakpointState = atom<BreakpointState>({
  key: 'breakpointState',
  default: defaultState,
  effects_UNSTABLE: [
    ({ setSelf }) => {
      if (!process.browser) return;
      const handleResize = () => {
        const state: BreakpointState = JSON.parse(JSON.stringify(defaultState));
        const { innerWidth, innerHeight } = window;

        state.width = innerWidth;
        state.height = innerHeight;

        if (innerWidth >= screen.xxs) {
          state.breakpoints.xxs = true;
          state.currentBreakpoint = 'xxs';
        }
        if (innerWidth >= screen.xs) {
          state.breakpoints.xs = true;
          state.currentBreakpoint = 'xs';
        }
        if (innerWidth >= screen.sm) {
          state.breakpoints.sm = true;
          state.currentBreakpoint = 'sm';
        }
        if (innerWidth >= screen.md) {
          state.breakpoints.md = true;
          state.currentBreakpoint = 'md';
        }
        if (innerWidth >= screen.lg) {
          state.breakpoints.lg = true;
          state.currentBreakpoint = 'lg';
        }
        if (innerWidth >= screen.xl) {
          state.breakpoints.xl = true;
          state.currentBreakpoint = 'xl';
        }
        if (innerWidth >= screen.xxl) {
          state.breakpoints.xxl = true;
          state.currentBreakpoint = 'xxl';
        }
        if (innerWidth >= screen.sxl) {
          state.breakpoints.sxl = true;
          state.currentBreakpoint = 'sxl';
        }

        setSelf(state);
      };
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    },
  ],
});

export const useScreen = () => {
  const breakpoint = useRecoilValue(breakpointState);
  return breakpoint;
};

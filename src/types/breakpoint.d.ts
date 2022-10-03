declare type Breakpoint =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  | 'sxl';

declare interface BreakpointState {
  width: number;
  height: number;
  currentBreakpoint: Breakpoint;
  breakpoints: {
    [key in Breakpoint]: boolean;
  };
  config: {
    [key in Breakpoint]: string;
  };
}

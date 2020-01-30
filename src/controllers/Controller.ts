export type OnChange = ((newProps: any) => void) | undefined;
export type OnInit = (() => void) | (() => Promise<void>) | undefined;
export type OnDestroy = (() => void) | undefined;

export interface Services {
  [key: string]: any;
}

export type NonViewAccessibleFields = 'onInit' | 'onDestroy' | 'onChange' | 'props' | 'services';

export type ControllerWithoutPrivateFields<T> = Omit<T, NonViewAccessibleFields>;

export abstract class Controller<S extends Services = {}, P extends Object = {}> {
  readonly services: S;
  readonly props: P;

  onChange: OnChange;
  onDestroy: OnDestroy;
  onInit: OnInit;
}

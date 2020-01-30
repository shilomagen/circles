import {Context, useContext, useEffect, useRef} from 'react';
import {ControllerWithoutPrivateFields} from './Controller';
import { useServices } from '../providers/services';

export const useRunOnce = (callback: Function) => {
  const wasCalledRef = useRef<boolean>(false);
  if (!wasCalledRef.current) {
    callback();
    wasCalledRef.current = true;
  }
};

function useController<T extends new (...args: any[]) => any>(
  ControllerClass: T,
  props: InstanceType<T>['props'] & {
    controller?: InstanceType<T>;
  } = {} as any,
) {
  const services = useServices();
  const controllerRef = useRef<InstanceType<T>>(null);
  const isControllerInjected = props.controller !== undefined;
  const initReturnRef = useRef<Function>(null);

  if (!controllerRef.current) {
    if (isControllerInjected) {
      controllerRef.current = props.controller;
    } else {
      controllerRef.current = new ControllerClass(services, props);
      controllerRef.current.props = props;
      controllerRef.current.services = services;
    }
  }

  useRunOnce(() => {
    if (controllerRef.current.onInit) {
      initReturnRef.current = controllerRef.current.onInit();
    }
  });

  useEffect(
    () => {
      return () => {
        if (typeof initReturnRef.current === 'function') {
          initReturnRef.current();
        }
        if (controllerRef.current.onDestroy) {
          controllerRef.current.onDestroy();
        }
      };
    },
    [],
  );

  useEffect(
    /* update controller with new component props */ () => {
      controllerRef.current.props = props;
    },
  );

  return controllerRef.current as ControllerWithoutPrivateFields<InstanceType<T>>;
};



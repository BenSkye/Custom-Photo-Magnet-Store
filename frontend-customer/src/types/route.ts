import { RouteObject } from 'react-router-dom';

export interface AppRoute extends RouteObject {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: AppRoute[];
  path: string; 
  element: React.ReactNode;
}
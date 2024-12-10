
export interface AppRoute {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: AppRoute[];
  path: string; 
  element: React.ReactNode;
}
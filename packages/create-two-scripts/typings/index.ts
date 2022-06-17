export interface OptsProps {
  esbuild: false;
  hot: true;
  ts: true;
  port?: 3001;
}

export interface PackageProps {
  [key: string]: any;
}

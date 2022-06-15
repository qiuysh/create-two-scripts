export interface OptsProps {
  esbuild: boolean;
  hot: boolean;
  ts: boolean;
  port?: number;
}

export interface PackageProps {
  [key: string]: any;
}

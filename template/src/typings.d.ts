declare module "*.less" {
  const styles: any;
  export default styles;
}

declare module "classnames";
declare module "enzyme";
declare module "enzyme-adapter-react-16";
declare module "lodash-es";
declare module "immutability-helper-x";

// 全局
declare namespace GLOBAL {
  interface menuItemProps {
    id: number;
    pid: number;
    name: string;
    icon: string;
    url: string;
    code: string;
    desc: string | null;
    create_time: string;
    modified_time: string | null;
  }
  interface storeProps {
    menuList: Array<menuItemProps>;
  }
}

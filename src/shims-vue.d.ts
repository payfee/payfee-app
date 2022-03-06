declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "v-money" {
  let Money: Record<string, any>;

  export { Money };
  export default Object;
}

type vMoneyOptions = {
  decimal: string;
  thousands: string;
  prefix: string;
  precision: number;
  masked: boolean;
};

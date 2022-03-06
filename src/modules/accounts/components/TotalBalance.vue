<template>
  <div class="card sticky-top" style="top: 100px">
    <div class="card-header p-3 pb-0">
      <h6 class="mb-0">Saldo total</h6>
    </div>
    <div class="card-body border-radius-lg p-3">
      <div class="d-flex">
        <div>
          <div
            class="icon icon-shape bg-info-soft shadow text-center border-radius-md shadow-none"
          >
            <i
              class="fa fa-brazilian-real-sign text-lg text-info text-gradient opacity-10"
              aria-hidden="true"
            ></i>
          </div>
        </div>
        <div class="ms-3">
          <div class="numbers">
            <h6 class="mb-1 text-dark text-sm">BRL</h6>
            <span class="text-lg">{{ totalAmount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Account } from "../domain/account";

@Component
export default class TotalBalance extends Vue {
  @Prop({ required: true, type: Array })
  private accounts!: Account[];
  private formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  get totalAmount(): string {
    const value = this.accounts
      .map(it => it.balance)
      .reduce((total, current) => total + current, 0);

    return this.formatter.format(value);
  }
}
</script>

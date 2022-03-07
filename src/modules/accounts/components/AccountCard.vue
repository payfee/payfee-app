<template>
  <div class="card" :class="{ 'recently-created': isRecentlyCreated }">
    <div class="card-header mx-4 p-3 text-center">
      <div
        class="position-relative icon icon-shape icon-lg bg-gradient-warning shadow text-center border-radius-lg"
      >
        <i class="fas fa-landmark opacity-10"></i>
      </div>
    </div>
    <div class="card-body pt-0 p-3 text-center">
      <h6 class="text-center mb-0">{{ account.name }}</h6>
      <hr class="horizontal dark my-3" />
      <h5
        class="mb-0"
        :class="{
          'text-success': account.balance > 0,
          'text-danger': account.balance < 0
        }"
      >
        {{ formatedBalance }}
      </h5>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes bounce {
  0% {
    transform: scale(0);
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.recently-created {
  animation-name: bounce;
  animation-duration: 1s;
  animation-timing-function: ease-out;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { Account } from "../domain/account";

const accountsNamespace = namespace("accounts");

@Component
export default class AccountCard extends Vue {
  private formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  @accountsNamespace.State("lastCreatedAccount")
  private last_created_account?: Account;

  get formatedBalance(): string {
    return this.formatter.format(this.account.balance);
  }

  get isRecentlyCreated(): boolean {
    return this.account == this.last_created_account;
  }

  @Prop({ required: true, type: Object })
  private account!: Account;
}
</script>

<template>
  <div>
    <new-account-modal ref="newAccountModal"></new-account-modal>
    <div class="mb-3" v-if="!!accounts.length">
      <payfee-buton @click="openNewAccountModal">Nova conta</payfee-buton>
    </div>

    <app-error v-if="isError" />
    <template v-else>
      <no-account
        v-if="!isLoadingAccounts && !accounts.length"
        @onCreateNewAccount="openNewAccountModal"
      />

      <loading-spin v-if="isLoadingAccounts" />

      <div class="row" v-if="!isLoadingAccounts && !!accounts.length">
        <div class="col-sm-12 col-md-8 order-md-first order-last">
          <div class="row">
            <template v-for="(account, key) of accounts">
              <div
                :key="key + account.account_id"
                class="col-md-5 col-lg-4 col-xl-4 col-xxl-3 col-sm-6 mb-4"
              >
                <account-card :account="account"></account-card>
              </div>
            </template>
          </div>
        </div>
        <div class="col-sm-12 col-md-4 col-lg-3 offset-lg-1 mb-sm-4">
          <total-balance :accounts="accounts"></total-balance>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import PayfeeButon from "@/components/PayfeeButton.vue";
import { Component, Vue } from "vue-property-decorator";
import AccountCard from "../components/AccountCard.vue";
import NewAccountModal from "../components/NewAccountModal.vue";
import TotalBalance from "../components/TotalBalance.vue";
import { Account } from "../domain/account";
import { AccountsStore } from "@/store/modules";
import LoadingSpin from "@/components/Loading.vue";
import NoAccount from "../components/NoAccount.vue";
import AppError from "@/components/AppError.vue";

@Component({
  components: {
    AccountCard,
    TotalBalance,
    PayfeeButon,
    NewAccountModal,
    LoadingSpin,
    NoAccount,
    AppError
  }
})
export default class Accounts extends Vue {
  get isLoadingAccounts() {
    return AccountsStore.isFetching;
  }

  get isError() {
    return AccountsStore.isError;
  }

  get accounts(): Account[] {
    return AccountsStore.accounts;
  }

  private mounted() {
    AccountsStore.fetchAccounts();
  }

  public openNewAccountModal(): void {
    (this.$refs.newAccountModal as NewAccountModal).open();
  }
}
</script>

<template>
  <div>
    <new-transaction-modal ref="newTransactionModal"></new-transaction-modal>
    <div class="mb-3">
      <payfee-button @click="openNewTransactionModal"
        >Nova transação</payfee-button
      >
    </div>

    <app-error v-if="isError" />
    <template v-else>
      <loading-spin v-if="isLoadingTransactions" />
      <div class="row" v-if="!isLoadingTransactions && !!transactions.length">
        <div class="col-sm-12 col-md-8 order-md-first order-last">
          <div class="card">
            <div class="card-body">
              <transactions-statement></transactions-statement>
            </div>
          </div>
        </div>
        <!-- <div class="col-sm-12 col-md-4 col-lg-3 offset-lg-1 mb-sm-4">
        
      </div> -->
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PayfeeButton from "@/components/PayfeeButton.vue";
import NewTransactionModal from "./components/NewTransactionModal.vue";
import TransactionsStatement from "./components/TransactionsStatement.vue";
import { TransactionsStore } from "@/store/modules";
import AppError from "@/components/AppError.vue";
import LoadingSpin from "@/components/Loading.vue";
import { namespace } from "vuex-class";
import { Transaction } from "../domain/transaction";

const transactionsNamespace = namespace("transactions");

@Component({
  components: {
    PayfeeButton,
    NewTransactionModal,
    TransactionsStatement,
    AppError,
    LoadingSpin
  }
})
export default class Transactions extends Vue {
  @transactionsNamespace.State("transactions")
  private transactions?: Transaction[];

  get isLoadingTransactions() {
    return TransactionsStore.isFetching;
  }

  get isError() {
    return TransactionsStore.isError;
  }

  public openNewTransactionModal(): void {
    (this.$refs.newTransactionModal as NewTransactionModal).open();
  }

  public mounted() {
    TransactionsStore.fetchTransactions();
  }
}
</script>

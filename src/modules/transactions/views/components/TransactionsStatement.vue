<template>
  <div>
    <ul class="list-group">
      <template v-for="(transaction, key) of transactions">
        <li
          :key="key"
          class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg"
        >
          <div class="d-flex align-items-center">
            <button
              class="btn btn-icon-only btn-rounded mb-0 me-3 btn-sm d-flex align-items-center justify-content-center"
              :class="
                transaction.type == 'DEBIT'
                  ? 'btn-outline-danger'
                  : 'btn-outline-success'
              "
            >
              <payfee-icon
                :icon="
                  'fad fa-arrow-' +
                    (transaction.type == 'DEBIT' ? 'down' : 'up')
                "
              />
            </button>
            <div class="d-flex flex-column">
              <h6 class="mb-1 text-dark text-sm">
                {{ transaction.description }}
              </h6>
              <span class="text-xs">
                {{ dateFormatter.format(new Date(transaction.date)) }}
              </span>
            </div>
          </div>
          <div
            class="d-flex align-items-center text-gradient text-sm font-weight-bold"
            :class="
              transaction.type == 'DEBIT' ? 'text-danger' : 'text-success'
            "
          >
            {{ currencyFormatter.format(transaction.amount) }}
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Transaction } from "../../domain/transaction";
import {
  currencyFormatter,
  dateFormatter
} from "@/services/formatter-provider";

const transactionsNamespace = namespace("transactions");

@Component
export default class TransactionsStatement extends Vue {
  public currencyFormatter = currencyFormatter("pt-BR", "BRL");
  public dateFormatter = dateFormatter("pt-BR");

  @transactionsNamespace.State("transactions")
  private transactions?: Transaction[];
}
</script>

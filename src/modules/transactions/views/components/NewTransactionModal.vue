<template>
  <payfee-modal :show="show">
    <div class="modal-body p-0">
      <div class="card card-plain">
        <div class="card-header pb-0 text-left">
          <h4 class="font-weight-bolder text-primary text-gradient">
            Nova transação
          </h4>
        </div>
        <div class="card-body">
          <ValidationObserver
            ref="form"
            tag="form"
            role="form"
            v-slot="{ valid }"
          >
            <div class="form-group">
              <label>Tipo</label>
              <select v-model="type" class="form-control">
                <option value="">Selecione um tipo</option>
                <option value="DEBIT">Despesa</option>
                <option value="CREDIT">Receita</option>
              </select>
            </div>

            <validation-provider
              name="Valor"
              rules="required|min_value:0|max_value:10000000000000"
              tag="div"
              v-slot="{ errors }"
              class="mb-3"
            >
              <label>Valor</label>
              <money
                v-model="amount"
                v-bind="balanceFormat"
                class="form-control"
                :disabled="isLoading"
              ></money>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>

            <validation-provider
              name="Descrição"
              rules="required|max:250"
              tag="div"
              v-slot="{ errors }"
              class="mb-3"
            >
              <label>Descrição</label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': !!errors.length }"
                v-model="description"
                placeholder="Ex.: Pagamento conta de luz"
                :disabled="isLoading"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>

            <validation-provider
              name="Conta"
              rules="required"
              tag="div"
              v-slot="{ errors }"
              class="mb-3"
            >
              <label>Conta</label>
              <select
                v-model="accountId"
                class="form-control"
                :class="{ 'is-invalid': !!errors.length }"
              >
                <option value="">Selecione uma conta</option>
                <template v-for="(account, key) of accounts">
                  <option :value="account.account_id" :key="key">{{
                    account.name
                  }}</option>
                </template>
              </select>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>

            <soft-alert v-if="errorMessage" kind="subtle-danger">
              {{ errorMessage }}
            </soft-alert>

            <div class="modal-footer mb-0 pb-0 border-top-0">
              <button
                @click="close"
                type="button"
                class="btn btn-link text-secondary"
                :disabled="isLoading"
              >
                {{ $t("common.cancel") }}
              </button>
              <payfee-button
                @click="createTransaction"
                type="button"
                class="btn btn-round bg-gradient-primary ml-auto"
                loading-text="Processando..."
                :is-loading="isLoading"
                :disabled="!valid"
              >
                Criar transação
              </payfee-button>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </payfee-modal>
</template>

<script lang="ts">
import PayfeeModal from "@/components/PayfeeModal.vue";
import PayfeeButton from "@/components/PayfeeButton.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { Component, Ref, Vue } from "vue-property-decorator";
import { Money } from "v-money";
import { namespace } from "vuex-class";
import { TransactionsStore } from "@/store/modules";
import { Account } from "@/modules/accounts/domain/account";
import SoftAlert from "@/components/SoftAlert.vue";
const notificationsModule = namespace("notifications");
const accountsNamespace = namespace("accounts");

@Component({
  components: {
    PayfeeModal,
    PayfeeButton,
    ValidationProvider,
    ValidationObserver,
    Money,
    SoftAlert
  }
})
export default class NewTransactionModal extends Vue {
  @Ref("form")
  private readonly form!: InstanceType<typeof ValidationObserver>;

  public show = false;
  public type = "";
  public amount = 0;
  public description = "";
  public accountId = "";
  public errorMessage = "";

  private balanceFormat = {
    decimal: ",",
    thousands: ".",
    prefix: "R$ ",
    precision: 2,
    masked: false
  };

  @accountsNamespace.State("accounts")
  private accounts?: Account[];

  @notificationsModule.Mutation
  private dispatchSuccess!: (title: string) => void;
  private isLoading = false;

  private cleanData() {
    this.type = "";
    this.amount = 0;
    this.description = "";
    this.accountId = "";
    this.isLoading = false;
    this.errorMessage = "";
  }

  public close(): void {
    this.show = false;
    this.cleanData();
  }

  public async createTransaction() {
    const isValid = await this.form.validate();

    if (!isValid) return;

    this.isLoading = true;
    const result = await TransactionsStore.createnewTransaction({
      accountId: this.accountId,
      transaction: {
        description: this.description,
        type: this.type,
        amount: this.amount
      }
    });

    if (result.left) {
      // TODO: usar tradução
      this.dispatchSuccess("Transação criada com sucesso!");
      this.close();
    } else {
      this.isLoading = false;
      this.errorMessage = result.right.message;
    }
  }

  public open() {
    if (!this.accounts?.length) {
      alert(
        "Você precisa ter ao menos 1 conta para poder cadastrar uma nova transação"
      );
      return;
    }
    this.show = true;
  }
}
</script>

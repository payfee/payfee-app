<template>
  <payfee-modal :show="show">
    <div class="modal-body p-0">
      <div class="card card-plain">
        <div class="card-header pb-0 text-left">
          <h4 class="font-weight-bolder text-primary text-gradient">
            {{ $t("accounts.create_account_title") }}
          </h4>
          <p class="mb-0">{{ $t("accounts.create_account_subtitle") }}</p>
        </div>
        <div class="card-body">
          <form role="form text-left">
            <label>{{ $t("accounts.account_name") }}</label>
            <validation-provider
              :name="$t('accounts.account_name')"
              rules="required|min:3|max:50"
              tag="div"
              v-slot="{ errors }"
              class="mb-3"
            >
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': !!errors.length }"
                  v-model="accountName"
                  :placeholder="$t('accounts.account_name_example')"
                />
              </div>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>

            <label>{{ $t("accounts.initial_balance") }}</label>
            <validation-provider
              :name="$t('accounts.initial_balance')"
              rules="required|min_value:0|max_value:10000000000000"
              tag="div"
              v-slot="{ errors }"
              class="mb-3"
            >
              <div class="input-group">
                <money
                  v-model.lazy="initialBalance"
                  v-bind="balanceFormat"
                  class="form-control"
                ></money>
              </div>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>

            <div class="modal-footer mb-0 pb-0 border-top-0">
              <button
                @click="close"
                type="button"
                class="btn btn-link text-secondary"
              >
                {{ $t("common.cancel") }}
              </button>
              <payfee-button
                type="button"
                class="btn btn-round bg-gradient-primary ml-auto"
                :is-loading="false"
              >
                {{ $t("accounts.create_account") }}
              </payfee-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </payfee-modal>
</template>

<script lang="ts">
import PayfeeModal from "@/components/PayfeeModal.vue";
import PayfeeButton from "@/components/PayfeeButton.vue";
import { ValidationProvider } from "vee-validate";
import { Component, Vue } from "vue-property-decorator";
import { Money } from "v-money";
import { namespace } from "vuex-class";
const notificationsModule = namespace("notifications");

@Component({
  components: {
    PayfeeModal,
    PayfeeButton,
    ValidationProvider,
    Money
  }
})
export default class NewAccountModal extends Vue {
  private show = false;
  private accountName = "";
  private initialBalance = 0;

  private balanceFormat = {
    decimal: ",",
    thousands: ".",
    prefix: "R$ ",
    precision: 2,
    masked: false
  };

  @notificationsModule.Mutation
  private dispatchSuccess!: (title: string) => void;

  private cleanData() {
    this.accountName = "";
    this.initialBalance = 0;
  }

  public close(): void {
    this.show = false;
    this.cleanData();
  }

  public open() {
    this.dispatchSuccess("Conta criada com sucesso!");
    this.show = true;
  }
}
</script>

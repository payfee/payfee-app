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
					<ValidationObserver
						ref="form"
						tag="form"
						role="form"
						v-slot="{ valid }"
					>
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
									:disabled="isLoading"
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
									v-model="initialBalance"
									v-bind="balanceFormat"
									class="form-control"
									:disabled="isLoading"
								></money>
							</div>
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
								@click="createAccount"
								type="button"
								class="btn btn-round bg-gradient-primary ml-auto"
								loading-text="Processando..."
								:is-loading="isLoading"
								:disabled="!valid"
							>
								{{ $t("accounts.create_account") }}
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
import { Action, namespace } from "vuex-class";
import { AccountsStore } from "@/store/modules";
import SoftAlert from "./SoftAlert.vue";
const notificationsModule = namespace("notifications");

@Component({
	components: {
		PayfeeModal,
		PayfeeButton,
		ValidationProvider,
		ValidationObserver,
		SoftAlert,
		Money,
	},
})
export default class NewAccountModal extends Vue {
	@Ref("form")
	private readonly form!: InstanceType<typeof ValidationObserver>;

	public show = false;
	public accountName = "";
	public initialBalance = 0;
	public errorMessage = "";

	private balanceFormat = {
		decimal: ",",
		thousands: ".",
		prefix: "R$ ",
		precision: 2,
		masked: false,
	};

	@notificationsModule.Mutation
	private dispatchSuccess!: (title: string) => void;
	private isLoading = false;

	private cleanData() {
		this.accountName = "";
		this.initialBalance = 0;
		this.isLoading = false;
		this.errorMessage = "";
	}

	public close(): void {
		this.show = false;
		this.cleanData();
	}

	public async createAccount() {
		const isValid = await this.form.validate();

		if (!isValid) return;

		this.isLoading = true;
		const result = await AccountsStore.createNewAccount({
			name: this.accountName,
			balance: this.initialBalance,
		});

		if (result.left) {
			// TODO: usar tradução
			this.dispatchSuccess("Conta criada com sucesso!");
			this.close();
		} else {
			this.isLoading = false;
			this.errorMessage = result.right.message;
		}
	}

	public open() {
		this.show = true;
	}
}
</script>

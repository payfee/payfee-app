<template>
	<div>
		<new-account-modal ref="newAccountModal"></new-account-modal>
		<div class="mb-3">
			<payfee-buton @click="openNewAccountModal">Nova conta</payfee-buton>
		</div>

		<div class="row">
			<div class="col-sm-12 col-md-8 order-md-first order-last">
				<div class="row">
					<template v-for="(account, key) of accounts">
						<div
							:key="key"
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
	</div>
</template>

<script lang="ts">
import PayfeeButon from "@/components/PayfeeButton.vue";
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import AccountCard from "../components/AccountCard.vue";
import NewAccountModal from "../components/NewAccountModal.vue";
import TotalBalance from "../components/TotalBalance.vue";
import { Account } from "../domain/account";
const accounts = namespace("accounts");

@Component({
	components: {
		AccountCard,
		TotalBalance,
		PayfeeButon,
		NewAccountModal,
	},
})
export default class Accounts extends Vue {
	@accounts.State
	public accounts!: Account[];

	public openNewAccountModal(): void {
		(this.$refs.newAccountModal as NewAccountModal).open();
	}
}
</script>

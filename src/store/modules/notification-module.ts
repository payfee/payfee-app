import { VuexModule, Module, Mutation } from "vuex-module-decorators";

export type Notification = {
	type: "success";
	title: string;
	message?: string;
};

@Module({ namespaced: true })
class NotificationModule extends VuexModule {
	private notifications: Notification[] = [];

	@Mutation
	public dispatchSuccess(title: string): void {
		const item = this.notifications.push({
			type: "success",
			title,
		});

		setTimeout(() => {
			this.notifications = this.notifications.splice(item, 1);
		}, 5000);
	}
}

export default NotificationModule;

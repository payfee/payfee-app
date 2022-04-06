import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import createAuth0Client from "@auth0/auth0-spa-js";

@Module({ namespaced: true, name: "auth" })
export default class AuthModule extends VuexModule {
  @Action({ rawError: true })
  public async requestLogin() {
    const auth0Client = await createAuth0Client({
      domain: "payfee.us.auth0.com",
      client_id: "8PvQ9LXd87SSByaJCrA3rwX6XdEjG3OK",
      redirect_uri: window.location.origin
    });

    await auth0Client.loginWithPopup({
      scope: "profile"
    });
  }
}

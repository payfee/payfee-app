import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import apiClient, { ErrorHandling } from "@/services/api-client";
import { AxiosError } from "axios";
import router from "@/router";

const AUTHORIZED = "AUTHORIZED";
const UNAUTHORIZED = "UNAUTHORIZED";

@Module({ namespaced: true, name: "auth" })
export default class AuthModule extends VuexModule {
  public isAuthenticated = false;

  @Mutation
  [AUTHORIZED]() {
    this.isAuthenticated = true;
  }

  @Mutation
  [UNAUTHORIZED]() {
    this.isAuthenticated = false;
  }

  @Action
  public async login(payload: {
    email: string;
    password: string;
  }): Promise<ErrorHandling> {
    try {
      await apiClient.post("/login", payload);

      this.context.commit(AUTHORIZED);

      return {
        success: true
      };
    } catch (error) {
      this.context.commit(UNAUTHORIZED);
      const axiosError = error as AxiosError;

      if (axiosError.response?.status == 400) {
        return {
          success: false,
          error: {
            message: "Usuário ou senha inválidos"
          }
        };
      }

      return {
        success: false,
        error: {
          message: "Erro ao realizar autenticação."
        }
      };
    }
  }

  @Action
  public async logout() {
    this.context.commit(UNAUTHORIZED);
    router.push("/auth/login");
  }
}

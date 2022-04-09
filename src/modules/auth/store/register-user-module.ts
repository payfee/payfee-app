import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";

import apiClient from "@/services/api-client";
import Logger from "@/services/logger";
import { AxiosError } from "axios";

const REQUEST_STARTED = "REQUEST_STARTED";
const FINISHED_WITH_ERROR = "FINISHED_WITH_ERROR";
const FINISHED_WITH_SUCCESS = "FINISHED_WITH_SUCCESS";
const RESET_STATE = "RESET_STATE";

type CreateUserResponse = {
  user_id: string;
};

type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

@Module({ namespaced: true, name: "registerUser" })
export default class RegisterUserModule extends VuexModule {
  public isLoading = false;
  public isSuccess: boolean | null = null;
  public errorMessage = "";

  @Mutation
  [REQUEST_STARTED]() {
    this.isLoading = true;
  }

  @Mutation
  [FINISHED_WITH_ERROR](errorMessage: string) {
    this.isSuccess = false;
    this.isLoading = false;
    this.errorMessage = errorMessage;
  }

  @Mutation
  [FINISHED_WITH_SUCCESS]() {
    this.isSuccess = true;
    this.isLoading = false;
  }

  @Mutation
  [RESET_STATE]() {
    this.isSuccess = null;
    this.isLoading = false;
    this.errorMessage = "";
  }

  @Action
  public async registerUser(request: CreateUserRequest): Promise<void> {
    try {
      this.context.commit(RESET_STATE);
      this.context.commit(REQUEST_STARTED);

      Logger.debug("Sending user creation request");

      await apiClient.post<CreateUserResponse>("/v1/users", request);

      Logger.debug("Received user creation response");

      this.context.commit(FINISHED_WITH_SUCCESS);
    } catch (error) {
      Logger.debug("User creation failed", {
        error
      });

      const errorMessage =
        (error as AxiosError).response?.data?.code == "ERR0005"
          ? "E-mail já cadastrado"
          : "Erro ao criar usuário";

      return this.context.commit(FINISHED_WITH_ERROR, errorMessage);
    }
  }
}

<template>
  <div>
    <div v-if="isSuccess && !isLoading" class="card">
      <div class="card-body text-center">
        <payfee-icon icon="fad fa-circle-check" class="text-success fs-1" />
        <h4 class="mt-2">Sucesso!</h4>
        <p>
          Sua conta foi criada com sucesso, realize agora um login e comece sua
          jornada rumo à organização financeira!
        </p>

        <router-link
          to="/auth/login"
          class="btn bg-gradient-primary btn-rounded mt-3"
        >
          Ir para login
        </router-link>
      </div>
    </div>
    <div v-else class="card card-plain mt-4">
      <div class="card-header pb-0 text-start bg-transparent">
        <h1 class="login-logo text-primary text-gradient">Payfee</h1>

        <h4 class="font-weight-bolder text-dark">
          Cadastrar
        </h4>
        <p class="mb-0">Digite seus dados para criar uma nova conta</p>
      </div>
      <div class="card-body">
        <ValidationObserver
          ref="form"
          tag="form"
          role="form"
          class="text-start"
          v-slot="{ valid }"
        >
          <validation-provider
            name="Nome"
            rules="required|max:250"
            tag="div"
            v-slot="{ errors }"
            class="mb-3"
          >
            <label>Nome</label>
            <div class="mb-3">
              <input
                name="name"
                autocomplete="name"
                v-model="name"
                type="text"
                class="form-control"
                placeholder="Seu nome"
                :disabled="isLoading"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </div>
          </validation-provider>

          <validation-provider
            name="E-mail"
            rules="required|email|max:250"
            tag="div"
            v-slot="{ errors }"
            class="mb-3"
          >
            <label>E-mail</label>
            <div class="mb-3">
              <input
                name="email"
                autocomplete="email"
                v-model="email"
                type="email"
                class="form-control"
                placeholder="E-mail"
                :disabled="isLoading"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </div>
          </validation-provider>

          <validation-provider
            name="Senha"
            rules="required|min:6|max:100"
            tag="div"
            v-slot="{ errors }"
            class="mb-3"
          >
            <label>Senha</label>
            <div class="mb-3">
              <input
                name="password"
                autocomplete="new-password"
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Senha"
                :disabled="isLoading"
              />
            </div>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>

          <soft-alert v-if="errorMessage" kind="subtle-danger">
            {{ errorMessage }}
          </soft-alert>

          <div class="text-center">
            <payfee-button
              @click="postRegistration"
              type="button"
              class="btn btn-round bg-gradient-primary ml-auto"
              loading-text="Processando..."
              :is-loading="isLoading"
              :disabled="!valid || isLoading"
            >
              Cadastrar
            </payfee-button>
          </div>
        </ValidationObserver>
      </div>
      <div class="card-footer text-center pt-0 px-lg-2 px-1">
        <p class="mb-4 text-sm mx-auto">
          Já possui uma conta?
          <router-link
            to="/auth/login"
            class="text-info text-gradient font-weight-bold"
          >
            Entrar
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";

import SoftAlert from "@/components/SoftAlert.vue";
import PayfeeButton from "@/components/PayfeeButton.vue";
import { RegisterUserStore } from "@/store/modules";
import { namespace } from "vuex-class";

const registerUserModule = namespace("registerUser");

@Component({
  components: {
    PayfeeButton,
    SoftAlert,
    ValidationObserver,
    ValidationProvider
  }
})
export default class Register extends Vue {
  @Ref("form")
  private readonly form!: InstanceType<typeof ValidationObserver>;

  public name = "";
  public email = "";
  public password = "";

  @registerUserModule.State
  public isLoading!: boolean;

  @registerUserModule.State
  public isSuccess!: boolean;

  @registerUserModule.State
  public errorMessage!: string;

  mounted() {
    RegisterUserStore.RESET_STATE();
  }

  public async postRegistration() {
    const isValid = await this.form.validate();

    if (!isValid) return;

    await RegisterUserStore.registerUser({
      name: this.name,
      email: this.email,
      password: this.password
    });
  }
}
</script>

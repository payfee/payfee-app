<template>
  <div class="card card-plain mt-8">
    <div class="card-header pb-0 text-start bg-transparent">
      <h1 class="login-logo text-primary text-gradient">Payfee</h1>

      <h4 class="font-weight-bolder text-dark">
        Entrar
      </h4>
      <p class="mb-0">Digite seu email e senha para entrar</p>
    </div>
    <div class="card-body">
      <validation-observer
        ref="form"
        tag="form"
        role="form"
        class="text-start"
        @submit="postLogin"
      >
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
              type="email"
              v-model="email"
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
              autocomplete="current-password"
              type="password"
              v-model="password"
              class="form-control"
              placeholder="Senha"
              :disabled="isLoading"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </div>
        </validation-provider>

        <soft-alert v-if="errorMessage" kind="subtle-danger">
          {{ errorMessage }}
        </soft-alert>

        <div class="text-center">
          <payfee-button
            type="submit"
            class="btn btn-round bg-gradient-primary w-100"
            loading-text="Processando..."
            :is-loading="isLoading"
            :disabled="isLoading"
          >
            Entrar
          </payfee-button>
        </div>
      </validation-observer>
    </div>
    <div class="card-footer text-center pt-0 px-lg-2 px-1">
      <p class="mb-4 text-sm mx-auto">
        Não tem uma conta?
        <router-link
          to="/auth/register"
          class="text-info text-gradient font-weight-bold"
        >
          Criar uma conta
        </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import PayfeeButton from "@/components/PayfeeButton.vue";
import { AuthStore } from "@/store/modules";

import SoftAlert from "@/components/SoftAlert.vue";

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
    PayfeeButton,
    SoftAlert
  }
})
export default class Login extends Vue {
  @Ref("form")
  private readonly form!: InstanceType<typeof ValidationObserver>;

  public isLoading = false;
  public email = "";
  public password = "";
  public errorMessage = "";

  public async postLogin(ev: any) {
    ev.preventDefault();

    const isValid = await this.form.validate();

    if (!isValid) return;

    this.isLoading = true;

    const result = await AuthStore.login({
      email: this.email,
      password: this.password
    });

    this.isLoading = false;

    if (result.success) {
      this.$router.push("/");
      this.resetState();
    } else {
      this.errorMessage = result.error?.message || "Erro inesperado";
    }
  }

  public resetState() {
    this.isLoading = false;
    this.email = "";
    this.password = "";
    this.errorMessage = "";
  }
}
</script>

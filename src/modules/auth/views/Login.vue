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
      <form role="form" class="text-start">
        <label>E-mail</label>
        <div class="mb-3">
          <input type="email" class="form-control" placeholder="E-mail" />
        </div>
        <label>Senha</label>
        <div class="mb-3">
          <input type="password" class="form-control" placeholder="Senha" />
        </div>
        <div class="text-center">
          <button type="button" class="btn bg-gradient-info w-100 mt-4 mb-0">
            Entrar
          </button>
        </div>
      </form>
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
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {}
</script>

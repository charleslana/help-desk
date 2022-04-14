<template>
  <section class="hero is-fullheight is-primary">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column card">
            <form class="card-content form" @submit="checkForm">
              <h1 class="has-text-primary title is-size-3-mobile is-size-2 is-size-1-widescreen has-text-left">Bem-vindo
                ao Help4 Business</h1>
              <b-field class="my-5" label="E-mail" label-position="on-border">
                <b-input id="email" v-model="email" icon="email" placeholder="Informe seu e-mail" required
                         size="is-medium"
                         type="email"></b-input>
              </b-field>
              <b-field class="my-5" label="Senha" label-position="on-border">
                <b-input id="password" v-model="password" icon="lock" password-reveal placeholder="Informe sua senha"
                         required
                         size="is-medium" type="password"></b-input>
              </b-field>
              <b-button id="loginButton" :disabled="isLoading" :loading="isLoading" class="is-primary is-fullwidth mb-5"
                        icon-left="login" native-type="submit" size="is-medium">
                Entrar
              </b-button>
              <router-link :hidden="isLoading" to="/register">Cadastre-se</router-link>
            </form>
          </div>
          <div class="column card login-bg is-hidden-mobile">
          </div>
        </div>
      </div>
    </div>
    <footer-component/>
  </section>
</template>

<script>
import FooterComponent from "@/components/FooterComponent";
import router from "@/router";
import api from "@/config/api";
import LocalStorageUtils from "@/utils/LocalStorageUtils";

export default {
  components: {FooterComponent},
  data() {
    return {
      email: null,
      password: null,
      isLoading: false
    }
  },
  methods: {
    checkForm(e) {
      this.requestLogin();
      e.preventDefault();
    },
    requestLogin() {
      this.isLoading = true;
      const form = new FormData();
      form.append('email', this.email);
      form.append('password', this.password);
      api.post('/login', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(response => {
            if (response.status === 204) {
              this.$buefy.toast.open({
                message: 'Acesso inválido',
                type: 'is-danger'
              });
              this.isLoading = false;
              return;
            }
            LocalStorageUtils.setToken(response.data.accessToken);
            LocalStorageUtils.setAccountType(response.data.accountType);
            LocalStorageUtils.setName(response.data.name);
            LocalStorageUtils.setEmail(response.data.email);
            router.push('/dashboard');
          })
          .catch(error => {
            this.isLoading = false;
            if (error.response !== undefined) {
              this.$buefy.toast.open({
                message: error.response.data.message,
                type: 'is-danger'
              });
              return;
            }
            this.$buefy.toast.open({
              message: error.toString(),
              type: 'is-danger'
            });
          });
    }
  },
  mounted() {
    LocalStorageUtils.logout();
  }
}
</script>

<style>
.login-bg {
  background-image: url("https://via.placeholder.com/800x1000");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>

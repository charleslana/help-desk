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
                <b-input id="email" icon="email" placeholder="Informe seu e-mail" required size="is-medium"
                         type="email"></b-input>
              </b-field>
              <b-field class="my-5" label="Senha" label-position="on-border">
                <b-input id="password" icon="lock" password-reveal placeholder="Informe sua senha" required
                         size="is-medium" type="password"></b-input>
              </b-field>
              <b-button id="loginButton" class="is-primary is-fullwidth mb-5" icon-left="login" native-type="submit" size="is-medium">
                Entrar
              </b-button>
              <router-link to="/register">Cadastre-se</router-link>
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
export default {
  components: {FooterComponent},
  data() {
    return {}
  },
  methods: {
    checkForm(e) {
      alert('Login success');
      e.preventDefault();
    }
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

<template>
  <b-navbar class="is-fixed-top">
    <template #brand>
      <b-navbar-item :to="{ path: '/dashboard' }" tag="router-link">
        <h1 class="has-text-primary title">Help4 Business</h1>
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <p>Bem-vindo(a) Charles!</p>
          <b-button id="logout" class="ml-5" icon-left="logout" outlined @click="logout">
            Desconectar
          </b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {}
  },
  methods: {
    logout() {
      router.replace({path: '/'});
    }
  },
  mounted() {
    document.body.classList.add('has-navbar-fixed-top')
  },
  destroyed() {
    document.body.classList.remove('has-navbar-fixed-top')
  }
}
</script>

<style>
.navbar-item button {
  border-color: #006a8d;
  color: #006a8d;
}

.navbar-item button:focus, .navbar-item button.is-focused {
  border-color: #006a8d;
  color: #006a8d;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}

.navbar-item button:hover, .navbar-item button.is-hovered {
  border-color: #006a8d;
  color: white;
  background-color: #006a8d;
}

.navbar {
  box-shadow: 0 5px 37px -13px rgb(0 0 0 / 75%);
}
</style>
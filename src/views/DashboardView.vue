<template>
  <main class="main">
    <navbar-component/>
    <menu-component/>
    <section class="section">
      <h2 class="title is-4 has-text-primary">Dashboard</h2>
      <nav v-if="isAdmin" aria-label="admin" class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Solicitações em aberto</p>
            <p class="title">3.456</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Solicitações em processamento</p>
            <p class="title">123</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Solicitações finalizadas</p>
            <p class="title">1.200</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Solicitações totais</p>
            <p class="title">5.300</p>
          </div>
        </div>
      </nav>
      <nav v-if="!isAdmin" aria-label="user" class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Minhas solicitações</p>
            <p class="title">5</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Em processamento</p>
            <p class="title">2</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Finalizadas</p>
            <p class="title">0</p>
          </div>
        </div>
      </nav>
    </section>
    <footer-component/>
  </main>
</template>
<script>
import FooterComponent from "@/components/FooterComponent";
import NavbarComponent from "@/components/NavbarComponent";
import MenuComponent from "@/components/MenuComponent";

export default {
  data() {
    return {
      isAdmin: false
    }
  },
  components: {MenuComponent, NavbarComponent, FooterComponent}
}
</script>
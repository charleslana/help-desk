<template>
  <main class="main">
    <navbar-component/>
    <menu-component/>
    <section class="section">
      <h2 class="title is-4 has-text-primary">Solicitações</h2>
      <div class="has-text-right">
        <b-button id="newRequestButton" class="is-primary mb-5" icon-left="plus" native-type="submit" tag="router-link"
                  to="/requests/create">
          Nova Solicitação
        </b-button>
      </div>
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
    return {}
  },
  components: {MenuComponent, NavbarComponent, FooterComponent}
}
</script>
<template>
  <main class="main">
    <navbar-component/>
    <menu-component/>
    <section class="section">
      <h2 class="title is-4 has-text-primary">Dashboard</h2>
      <ul>
        <li>Ae</li>
        <li>Ae</li>
        <li>Ae</li>
        <li>Ae</li>
        <li>Ae</li>
        <li>Ae</li>
        <li>Ae</li>
        <li>Ae</li>
        <li>Ae</li>
        <li>Ae</li>
        <li>Ae</li>
      </ul>
    </section>
    <footer-component/>
  </main>
</template>
<script>
import FooterComponent from "@/components/FooterComponent";
import NavbarComponent from "@/components/NavbarComponent";
import MenuComponent from "@/components/MenuComponent";

export default {
  components: {MenuComponent, NavbarComponent, FooterComponent}
}
</script>
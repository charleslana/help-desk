<template>
  <b-menu class="is-fullheight is-hidden-mobile is-active">
    <b-menu-list>
      <b-menu-item icon="home" label="Home" size="is-large" tag="router-link" to="/dashboard"></b-menu-item>
    </b-menu-list>
    <b-menu-list>
      <b-menu-item icon="clipboard-edit-outline" label="Solicitações" size="is-large" tag="router-link"
                   to="/requests"></b-menu-item>
    </b-menu-list>
    <b-menu-list>
      <b-menu-item icon="account-cog" label="Configurações" size="is-large" tag="router-link"
                   to="/settings"></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {
  data() {
    return {
      isActive: true
    }
  }
}
</script>

<style>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 4.5rem;
  padding-top: 3.5rem;
  background-color: #2a363f;
  overflow-y: auto;
}

@media screen and (max-width: 1023px) {
  .menu {
    width: 100%;
    padding-top: 3.2rem;
  }

  .section {
    padding-top: 7rem !important;
  }

  .menu.is-fullheight {
    height: auto !important;
    overflow-x: auto;
    display: flex !important;
  }

  .menu ul li a {
    display: flex;
    font-size: 1.25rem !important;
    flex-direction: column !important;
    justify-content: center !important;
  }

  main {
    padding-bottom: 9.5em !important;
  }
}

.menu-list a {
  color: #00b4b8 !important;
  align-items: center;
}

.menu-list a:hover {
  background-color: #00b4b8 !important;
  color: #2a363f !important;
  border-radius: 0;
}

.menu .router-link-active {
  background-color: #00b4b8 !important;
  color: #2a363f !important;
  border-radius: 0;
}

.menu ul li a:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 1px;
  opacity: .4;
  transition: opacity .1s ease;
  will-change: opacity;
  background-color: #b0b0b0;
}

.menu-list {
  position: relative;
}
</style>
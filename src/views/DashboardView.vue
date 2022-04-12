<template>
  <main class="main">
    <navbar-component/>
    <menu-component/>
    <section class="section">
      <h2 class="title is-4 has-text-primary">Dashboard</h2>
      <nav v-if="isAdmin" aria-label="admin" class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Solicitações totais</p>
            <p v-if="!isLoading" class="title">{{ total }}</p>
            <b-skeleton :active="isLoading"></b-skeleton>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Solicitações em aberto</p>
            <p v-if="!isLoading" class="title">{{ opened }}</p>
            <b-skeleton :active="isLoading"></b-skeleton>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Solicitações em processamento</p>
            <p v-if="!isLoading" class="title">{{ processing }}</p>
            <b-skeleton :active="isLoading"></b-skeleton>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Solicitações finalizadas</p>
            <p v-if="!isLoading" class="title">{{ finished }}</p>
            <b-skeleton :active="isLoading"></b-skeleton>
          </div>
        </div>
      </nav>
      <nav v-if="!isAdmin" aria-label="user" class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Minhas solicitações</p>
            <p v-if="!isLoading" class="title">{{ total }}</p>
            <b-skeleton :active="isLoading"></b-skeleton>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Em aberto</p>
            <p v-if="!isLoading" class="title">{{ opened }}</p>
            <b-skeleton :active="isLoading"></b-skeleton>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Em processamento</p>
            <p v-if="!isLoading" class="title">{{ processing }}</p>
            <b-skeleton :active="isLoading"></b-skeleton>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Finalizadas</p>
            <p v-if="!isLoading" class="title">{{ finished }}</p>
            <b-skeleton :active="isLoading"></b-skeleton>
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
import api from "@/config/api";

export default {
  data() {
    return {
      isLoading: true,
      isAdmin: false,
      total: 0,
      opened: 0,
      processing: 0,
      finished: 0,
    }
  },
  mounted() {
    this.requestTotalizer();
  },
  methods: {
    requestTotalizer() {
      this.isLoading = true;
      api.get('/api/v1/request/totalizer')
          .then(response => {
            this.total = response.data.total;
            this.opened = response.data.opened;
            this.processing = response.data.processing;
            this.finished = response.data.finished;
          })
          .catch(error => {
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
          }).finally(() => {
        this.isLoading = false;
      })
    }
  },
  components: {MenuComponent, NavbarComponent, FooterComponent}
}
</script>
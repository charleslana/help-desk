<template>
  <main class="main">
    <navbar-component/>
    <menu-component/>
    <section class="section">
      <h2 class="title is-4 has-text-primary">Criar Solicitação</h2>
      <form class="form" @submit="checkForm">
        <b-field class="my-5" label="Prioridade" label-position="on-border">
          <b-select id="selectCategory" v-model="selectCategory" expanded placeholder="Selecione uma categoria"
                    required>
            <option
                v-for="option in priority"
                :key="option.id"
                :value="option.type">
              {{ option.title }}
            </option>
          </b-select>
        </b-field>
        <b-field class="my-5" label="Descrição" label-position="on-border">
          <b-input id="description" maxlength="1000" minlength="10"
                   placeholder="Descreva o problema detalhadamente aqui" required
                   rows="7" type="textarea"></b-input>
        </b-field>
        <div class="buttons is-justify-content-space-between">
          <b-button id="createButton" :disabled="isLoading" class="is-primary mb-5" icon-left="plus"
                    native-type="submit">
            Cadastrar
          </b-button>
          <b-button id="cancelButton" class="mb-5" icon-left="arrow-left" native-type="submit" tag="router-link"
                    to="/requests">
            Voltar
          </b-button>
        </div>
      </form>
      <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
    </section>
    <footer-component/>
  </main>
</template>
<script type="ts">
import FooterComponent from '@/components/FooterComponent';
import NavbarComponent from '@/components/NavbarComponent';
import MenuComponent from '@/components/MenuComponent';
import router from '@/router';
import PriorityEnum, {handlePriorityType} from '@/enum/PriorityEnum';

export default {
  data() {
    return {
      isLoading: false,
      priority: [
        {
          id: 1,
          type: this.handlePriorityType(PriorityEnum.LOW),
          title: PriorityEnum.LOW
        },
        {
          id: 2,
          type: this.handlePriorityType(PriorityEnum.MEDIUM),
          title: PriorityEnum.MEDIUM
        },
        {
          id: 3,
          type: this.handlePriorityType(PriorityEnum.HIGH),
          title: PriorityEnum.HIGH
        },
        {
          id: 4,
          type: this.handlePriorityType(PriorityEnum.CRITICAL),
          title: PriorityEnum.CRITICAL
        }
      ],
      selectCategory: null,
    }
  },
  methods: {
    checkForm(e) {
      this.isLoading = true;
      setTimeout(() => {
        this.$buefy.toast.open({
          message: 'Solicitação efetuada com sucesso!',
          type: 'is-success'
        });
        router.push('/requests');
      }, 3000);
      e.preventDefault();
    },
    handlePriorityType(priority) {
      return handlePriorityType(priority);
    }
  },
  components: {MenuComponent, NavbarComponent, FooterComponent}
}
</script>
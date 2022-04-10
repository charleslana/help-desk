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
      <form class="form" @submit="checkFormFilter">
        <b-field class="mb-5" grouped label="Prioridade" label-position="on-border">
          <b-select id="selectCategory" v-model="selectCategory" expanded placeholder="Selecione uma categoria">
            <option
                v-for="option in priority"
                :key="option.id"
                :value="option.type">
              {{ option.title }}
            </option>
          </b-select>
          <b-field expanded label="Datas" label-position="on-border">
            <b-datepicker
                id="selectDate"
                v-model="dates"
                placeholder="Clque para selecionar as datas"
                range>
            </b-datepicker>
          </b-field>
        </b-field>
        <div class="buttons is-justify-content-space-between">
          <b-button id="filterButton" class="is-primary mb-5" icon-left="filter" native-type="submit">
            Filtrar
          </b-button>
          <b-button id="clearButton" class="is-primary mb-5" icon-left="filter-remove" @click="clear">
            Limpar
          </b-button>
        </div>
      </form>
      <p v-if="filterRequests.length === 0" class="has-text-centered">Nenhum resultado encontrado.</p>
      <div class="is-flex-wrap-wrap columns">
        <div v-for="request in filterRequests" :key="request.id" class="column is-3">
          <div class="card equal-height">
            <div class="card-content">
              <div class="content">
                <p>{{ request.priority }}</p>
                <strong>Solicitação realizada em: </strong>
                <time class="is-italic">{{ getDate(request.date) }}</time>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item" @click.prevent="openModal">Visualizar</a>
              <div class="card-footer-item">
                <span :class="handleStatusTag(request.status)">{{ request.status }}</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
      <b-modal v-model="isModalActive" :can-cancel="false">
        <div class="card">
          <div class="card-content">
            <b-tabs v-model="activeTab">
              <b-tab-item label="Dados da solicitação">
                <div class="level">
                  <div class="level-left">
                    <div class="level-item">
                      <span :class="handleStatusTag(editStatus)">{{ editStatus }}</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <p>Data da solicitação: <strong>{{ getDate(createdAt) }}</strong></p>
                    </div>
                  </div>
                </div>
                <form class="form" @submit="checkFormEditRequest">
                  <b-field class="my-5" label="Prioridade" label-position="on-border">
                    <b-select id="editSelectCategory" v-model="editSelectCategory" :disabled="isEdit()"
                              expanded
                              placeholder="Selecione uma categoria" required>
                      <option
                          v-for="option in priority"
                          :key="option.id"
                          :value="option.type">
                        {{ option.title }}
                      </option>
                    </b-select>
                  </b-field>
                  <b-field class="my-5" label="Descrição" label-position="on-border">
                    <b-input id="editDescription" :disabled="isEdit()" :value="editDescription"
                             maxlength="1000" minlength="10"
                             placeholder="Descreva o problema detalhadamente aqui" required rows="7"
                             type="textarea"></b-input>
                  </b-field>
                  <b-button id="editButton" :disabled="isEdit()" class="is-primary mb-5" icon-left="content-save"
                            native-type="submit">
                    Salvar
                  </b-button>
                </form>
              </b-tab-item>
              <b-tab-item label="Notificações">
                <p>Data da última atualização: <strong>{{ getDate(updatedAt) }}</strong></p>
                <b-field class="my-5" label="Justificativa" label-position="on-border">
                  <b-input :value="justify" disabled
                           maxlength="1000" minlength="10"
                           placeholder="Nenhuma justificativa no momento" required rows="7"
                           type="textarea"></b-input>
                </b-field>
              </b-tab-item>
              <b-tab-item label="Cancelar">
                <p>Deseja cancelar a solicitação?</p>
                <b-button id="deleteButton" class="is-danger my-5" icon-left="close" @click="cancelRequest">
                  Cancelar
                </b-button>
              </b-tab-item>
              <b-tab-item v-if="isAdmin === true" label="Detalhes">
                <p>Dados do usuário</p>
                <p>E-mail: <strong>{{ email }}</strong></p>
                <p>Número de telefone: <strong>{{ phoneNumber }}</strong></p>
              </b-tab-item>
            </b-tabs>
            <div class="has-text-right">
              <b-button id="editCancelButton" class="is-default" icon-left="close"
                        @click="isModalActive = false">
                Fechar
              </b-button>
            </div>
          </div>
        </div>
      </b-modal>
      <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
    </section>
    <footer-component/>
  </main>
</template>
<script>
import FooterComponent from "@/components/FooterComponent";
import NavbarComponent from "@/components/NavbarComponent";
import MenuComponent from "@/components/MenuComponent";
import RequestStatusEnum, {handleStatusTag} from "@/enum/RequestStatusEnum";
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
      requests: [
        {
          id: 1,
          priority: PriorityEnum.MEDIUM,
          status: RequestStatusEnum.OPENED,
          date: new Date(),
        },
        {
          id: 2,
          priority: PriorityEnum.LOW,
          status: RequestStatusEnum.PROCESSING,
          date: new Date('2022/04/08'),
        },
        {
          id: 3,
          priority: PriorityEnum.HIGH,
          status: RequestStatusEnum.OPENED,
          date: new Date(),
        },
        {
          id: 4,
          priority: PriorityEnum.CRITICAL,
          status: RequestStatusEnum.FINISHED,
          date: new Date(),
        },
        {
          id: 5,
          priority: PriorityEnum.MEDIUM,
          status: RequestStatusEnum.OPENED,
          date: new Date(),
        },
      ],
      filterRequests: [],
      dates: [],
      isModalActive: false,
      activeTab: 0,
      editSelectCategory: null,
      editDescription: null,
      editStatus: RequestStatusEnum.OPENED,
      justify: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: true,
      email: null,
      phoneNumber: null,
    }
  },
  methods: {
    checkFormFilter(e) {
      this.isLoading = true;
      this.filter(this.selectCategory, this.dates);
      this.isLoading = false;
      e.preventDefault();
    },
    checkFormEditRequest(e) {
      e.preventDefault();
    },
    handlePriorityType(priority) {
      return handlePriorityType(priority);
    },
    getDate(date = new Date) {
      return date.toLocaleDateString("pt-BR");
    },
    handleStatusTag(tag) {
      return 'tag '.concat(handleStatusTag(tag));
    },
    filter(priority, dates) {
      this.filterRequests = this.requests.filter((request) => {
        if (!priority && dates.length === 0) {
          return this.requests;
        }
        if (priority && dates.length > 0) {
          return request.priority === PriorityEnum[priority] &&
              request.date.getTime() >= dates[0].getTime() && request.date.getTime() <= dates[1].getTime();
        }
        if (priority) {
          return request.priority === PriorityEnum[priority];
        }
        return request.date.getTime() >= dates[0].getTime() && request.date.getTime() <= dates[1].getTime();
      });
    },
    clear() {
      this.filterRequests = this.requests;
      this.selectCategory = null;
      this.dates = [];
    },
    openModal() {
      this.activeTab = 0;
      this.isModalActive = true;
      this.editSelectCategory = handlePriorityType(PriorityEnum.CRITICAL);
      this.editDescription = 'Descrição da solicitação';
      this.editStatus = RequestStatusEnum.PROCESSING;
      this.justify = 'Informamos que foi feito o contato com o cliente e será realizado a manutenção.';
      this.createdAt = new Date();
      const dt = new Date();
      dt.setDate(dt.getDate() + 3);
      this.updatedAt = dt;
      this.email = 'charles@charles.com';
      this.phoneNumber = 'Usuário não possui número de telefone';
    },
    isEdit() {
      return this.editStatus !== RequestStatusEnum.OPENED;
    },
    cancelRequest() {
      this.isModalActive = false;
      this.$buefy.toast.open({
        message: 'Solicitação cancelada com sucesso!',
        type: 'is-success'
      });
    }
  },
  mounted() {
    this.isLoading = true;
    this.filterRequests = this.requests;
    this.isLoading = false;
  },
  components: {MenuComponent, NavbarComponent, FooterComponent}
}
</script>
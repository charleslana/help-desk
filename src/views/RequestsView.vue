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
                <b-skeleton :active="isLoading" size="is-large"></b-skeleton>
                <p v-if="!isLoading">{{ handlePriority(request.priority) }}</p>
                <strong>Solicitação realizada em: </strong>
                <b-skeleton :active="isLoading" size="is-large"></b-skeleton>
                <time v-if="!isLoading" class="is-italic">{{ getDate(request.date) }}</time>
              </div>
            </div>
            <footer class="card-footer">
              <div class="card-footer-item">
                <b-skeleton :active="isLoading" size="is-large"></b-skeleton>
                <a v-if="!isLoading" @click.prevent="openModal(request.id)">Visualizar</a>
              </div>
              <div class="card-footer-item">
                <b-skeleton :active="isLoading" size="is-large"></b-skeleton>
                <span v-if="!isLoading" :class="handleStatusTag(request.status)">{{
                    handleStatus(request.status)
                  }}</span>
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
                      <b-skeleton :active="isLoading" size="is-large" width="64px"></b-skeleton>
                      <span v-if="!isLoading" :class="handleStatusTag(editStatus)">{{ handleStatus(editStatus) }}</span>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <b-skeleton :active="isLoading" size="is-large" width="100px"></b-skeleton>
                      <p v-if="!isLoading">Data da solicitação: <strong>{{ getDate(createdAt) }}</strong></p>
                    </div>
                  </div>
                </div>
                <form class="form" @submit="checkFormEditRequest">
                  <b-field class="my-5" label="Prioridade" label-position="on-border">
                    <b-skeleton :active="isLoading" size="is-large"></b-skeleton>
                    <b-select v-if="!isLoading" id="editSelectCategory" v-model="editSelectCategory"
                              :disabled="isEdit()"
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
                    <b-skeleton :active="isLoading" size="is-large"></b-skeleton>
                    <b-input v-if="!isLoading" id="editDescription" :disabled="isEdit()" :value="editDescription"
                             maxlength="1000" minlength="10"
                             placeholder="Descreva o problema detalhadamente aqui" required rows="7"
                             type="textarea"></b-input>
                  </b-field>
                  <b-button id="editButton" :disabled="isEdit() || isLoading" class="is-primary mb-5"
                            icon-left="content-save"
                            native-type="submit">
                    Salvar
                  </b-button>
                </form>
              </b-tab-item>
              <b-tab-item label="Notificações">
                <b-skeleton :active="isLoading" size="is-large"></b-skeleton>
                <p v-if="!isLoading">Data da última atualização: <strong>{{ getDate(updatedAt) }}</strong></p>
                <b-field class="my-5" label="Justificativa" label-position="on-border">
                  <b-skeleton :active="isLoading" size="is-large"></b-skeleton>
                  <b-input v-if="!isLoading" :value="justify" disabled
                           maxlength="1000" minlength="10"
                           placeholder="Nenhuma justificativa no momento" required rows="7"
                           type="textarea"></b-input>
                </b-field>
              </b-tab-item>
              <b-tab-item label="Cancelar">
                <p>Deseja cancelar a solicitação?</p>
                <b-button id="deleteButton" :disabled="isLoading || isEdit()" class="is-danger my-5" icon-left="close"
                          @click="cancelRequest">
                  Cancelar
                </b-button>
              </b-tab-item>
              <b-tab-item v-if="isAdmin === true" label="Detalhes">
                <p>Dados do usuário</p>
                <b-skeleton :active="isLoading" size="is-large"></b-skeleton>
                <p v-if="!isLoading">E-mail: <strong>{{ email }}</strong></p>
                <b-skeleton :active="isLoading" size="is-large"></b-skeleton>
                <p v-if="!isLoading">Número de telefone: <strong>{{ phoneNumber }}</strong></p>
              </b-tab-item>
            </b-tabs>
            <div class="has-text-right">
              <b-button id="editCancelButton" :disabled="isLoading" class="is-default" icon-left="close"
                        @click="isModalActive = false">
                Fechar
              </b-button>
            </div>
          </div>
        </div>
      </b-modal>
    </section>
    <footer-component/>
  </main>
</template>
<script>
import FooterComponent from "@/components/FooterComponent";
import NavbarComponent from "@/components/NavbarComponent";
import MenuComponent from "@/components/MenuComponent";
import RequestStatusEnum, {handleStatus, handleStatusTag} from "@/enum/RequestStatusEnum";
import PriorityEnum, {handlePriority, handlePriorityType} from '@/enum/PriorityEnum';
import api from "@/config/api";
import LocalStorageUtils from "@/utils/LocalStorageUtils";
import AccountType from "@/enum/AccountType";

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
      isAdmin: false,
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
    handlePriority(priority) {
      return handlePriority(priority);
    },
    getDate(date = new Date) {
      return date.toLocaleDateString("pt-BR");
    },
    handleStatusTag(tag) {
      return 'tag '.concat(handleStatusTag(tag));
    },
    handleStatus(status) {
      return handleStatus(status);
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
    openModal(id) {
      this.activeTab = 0;
      this.isModalActive = true;
      this.isLoading = true;
      this.getRequest(id);
    },
    isEdit() {
      return handleStatus(this.editStatus) !== RequestStatusEnum.OPENED;
    },
    cancelRequest() {
      this.isModalActive = false;
      this.$buefy.toast.open({
        message: 'Solicitação cancelada com sucesso!',
        type: 'is-success'
      });
    },
    getRequests() {
      this.isLoading = true;
      api.get('/api/v1/request')
          .then(response => {
            this.requests = response.data;
            this.filterRequests = this.requests;
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
      });
    },
    getRequest(id) {
      this.isLoading = true;
      api.get(`/api/v1/request/${id}/detail`)
          .then(response => {
            this.editStatus = response.data.status;
            this.editSelectCategory = response.data.priority;
            this.editDescription = response.data.description;
            this.justify = response.data.justify;
            this.createdAt = new Date(response.data.createdAt);
            this.updatedAt = new Date(response.data.updatedAt);
            if (LocalStorageUtils.getAccountType() === AccountType.ADMIN) {
              this.isAdmin = true;
              this.email = response.data.user.email;
              this.phoneNumber = response.data.user.phoneNumber;
            }
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
      });
    }
  },
  mounted() {
    this.filterRequests = this.requests;
    this.getRequests();
  },
  components: {MenuComponent, NavbarComponent, FooterComponent}
}
</script>
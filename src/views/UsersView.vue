<template>
  <main class="main">
    <navbar-component/>
    <menu-component/>
    <section class="section">
      <h2 class="title is-4 has-text-primary">Usuários</h2>
      <b-table
          :data="data"
          default-sort="id"
          default-sort-direction="asc"
          paginated
          pagination-order=""
          per-page="10"
          sort-icon="arrow-up"
          sort-icon-size="is-small">
        <b-table-column v-slot="props" centered field="id" label="ID" numeric searchable sortable width="100">
          {{ props.row.id }}
        </b-table-column>
        <b-table-column v-slot="props" field="name" label="Nome" searchable sortable>
          {{ props.row.name }}
        </b-table-column>
        <b-table-column v-slot="props" field="email" label="E-mail" searchable sortable>
          {{ props.row.email }}
        </b-table-column>
        <b-table-column v-slot="props" field="accountType" label="Tipo de conta" searchable sortable>
          {{ handleAccount(props.row.accountType) }}
        </b-table-column>
        <b-table-column v-slot="props" field="status" label="Status" searchable sortable>
          {{ handleUser(props.row.status) }}
        </b-table-column>
        <b-table-column v-slot="props" centered field="date" label="Registrado em" sortable>
          {{ getDate(props.row.date) }}
        </b-table-column>
        <b-table-column v-slot="props">
          <button class="button is-small is-info" @click="openModal(props.row.id)">
            <b-icon icon="pencil" size="is-small"></b-icon>
          </button>
        </b-table-column>
      </b-table>
      <b-modal v-model="isModalActive" :can-cancel="false">
        <div class="card">
          <div class="card-content">
            <p>E-mail: <strong>{{ email }}</strong></p>
            <form class="form" @submit="checkForm">
              <b-field class="my-5" label="Status" label-position="on-border">
                <b-select id="selectStatus" v-model="selectStatus" expanded placeholder="Selecione um status"
                          required>
                  <option
                      v-for="option in status"
                      :key="option.id"
                      :value="option.type">
                    {{ option.title }}
                  </option>
                </b-select>
              </b-field>
              <b-field class="my-5" label="Tipo de conta" label-position="on-border">
                <b-select id="selectAccountType" v-model="selectAccountType" expanded
                          placeholder="Selecione o tipo de conta"
                          required>
                  <option
                      v-for="option in accountType"
                      :key="option.id"
                      :value="option.type">
                    {{ option.title }}
                  </option>
                </b-select>
              </b-field>
              <div class="buttons is-justify-content-space-between">
                <b-button id="saveButton" :disabled="isLoading" class="is-primary mb-5" icon-left="content-save"
                          native-type="submit">
                  Salvar
                </b-button>
                <b-button id="closeButton" class="mb-5" icon-left="close" @click="isModalActive = false">
                  Fechar
                </b-button>
              </div>
            </form>
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
import UserStatusEnum, {handleUser, handleUserStatus} from "@/enum/UserStatusEnum";
import AccountType, {handleAccount, handleAccountType} from "@/enum/AccountType";
import api from "@/config/api";

export default {
  data() {
    return {
      isLoading: false,
      isModalActive: false,
      email: null,
      selectAccountType: null,
      selectStatus: null,
      status: [
        {
          id: 1,
          type: this.handleUserStatus(UserStatusEnum.ACTIVE),
          title: UserStatusEnum.ACTIVE
        },
        {
          id: 2,
          type: this.handleUserStatus(UserStatusEnum.INACTIVE),
          title: UserStatusEnum.INACTIVE
        }
      ],
      accountType: [
        {
          id: 1,
          type: this.handleAccountType(AccountType.USER),
          title: AccountType.USER
        },
        {
          id: 2,
          type: this.handleAccountType(AccountType.ADMIN),
          title: AccountType.ADMIN
        }
      ],
      data: [
        {
          'id': 1,
          'name': 'Test',
          'email': 'test2@test.com',
          'accountType': AccountType.USER,
          'status': UserStatusEnum.ACTIVE,
          'date': new Date()
        },
        {
          'id': 2,
          'name': 'Charles',
          'email': 'charles@charles.com',
          'accountType': AccountType.ADMIN,
          'status': UserStatusEnum.INACTIVE,
          'date': new Date()
        },
      ],
      userId: null,
    }
  },
  methods: {
    checkForm(e) {
      this.changeUser();
      e.preventDefault();
    },
    getDate(date = new Date) {
      return date.toLocaleDateString("pt-BR");
    },
    handleUserStatus(status) {
      return handleUserStatus(status);
    },
    handleUser(status) {
      return handleUser(status);
    },
    handleAccountType(accountType) {
      return handleAccountType(accountType);
    },
    handleAccount(accountType) {
      return handleAccount(accountType);
    },
    openModal(id) {
      this.isModalActive = true;
      this.getUser(id);
    },
    getUsers() {
      this.isLoading = true;
      api.get('/api/v1/user')
          .then(response => {
            this.data = response.data;
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
    getUser(id) {
      this.isLoading = true;
      api.get(`/api/v1/user/${id}`)
          .then(response => {
            this.selectAccountType = response.data.accountType;
            this.email = response.data.email;
            this.selectStatus = response.data.status;
            this.userId = response.data.id;
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
    changeUser() {
      this.isLoading = true;
      api.put('/api/v1/user/change-user', {
        id: this.userId,
        status: this.selectStatus,
        accountType: this.selectAccountType,
      })
          .then(() => {
            this.$buefy.toast.open({
              message: 'Usuário atualizado com sucesso.',
              type: 'is-success'
            });
            this.isModalActive = false;
            this.getUsers();
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
  },
  mounted() {
    this.getUsers();
  },
  components: {MenuComponent, NavbarComponent, FooterComponent}
}
</script>
<template>
  <section class="hero is-fullheight is-primary">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column card">
            <div class="card-content form has-text-left">
              <h1 class="has-text-primary title is-size-3-mobile is-size-2 is-size-1-widescreen has-text-left">Faça seu
                cadastro agora!</h1>
              <b-steps
                  v-model="activeStep"
                  :animated="isAnimated"
                  :has-navigation="hasNavigation"
                  :icon-next="nextIcon"
                  :icon-prev="prevIcon"
                  :label-position="labelPosition"
                  :mobile-mode="mobileMode"
                  :rounded="isRounded">
                <b-step-item :clickable="isStepsClickable" icon="lock-open" label="Informação de login" step="1">
                  <div v-if="errors.length" class="help is-danger">
                    <strong>Por favor corrija os seguintes erro(s):</strong>
                    <ul>
                      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                    </ul>
                  </div>
                  <b-field class="my-5" label="E-mail" label-position="on-border">
                    <b-input id="email" v-model="email" icon="email" placeholder="Informe seu e-mail" required
                             size="is-medium" type="email" @keyup.native="checkStepForm1()"></b-input>
                  </b-field>
                  <b-field class="my-5" label="Senha" label-position="on-border">
                    <b-input id="password" v-model="password" icon="lock" password-reveal
                             placeholder="Informe sua senha"
                             required size="is-medium" type="password" @keyup.native="checkStepForm1()"></b-input>
                  </b-field>
                  <b-field class="my-5" label="Confirmar senha" label-position="on-border">
                    <b-input id="passwordConfirmation" v-model="passwordConfirmation" icon="lock" password-reveal
                             placeholder="Confirme sua senha"
                             required size="is-medium" type="password" @keyup.native="checkStepForm1()"></b-input>
                  </b-field>
                  <b-button id="nextButton1" :disabled="isDisabled" class="is-primary is-fullwidth mb-5"
                            icon-left="arrow-right-bold" size="is-medium"
                            @click="handleStep1">
                    Próximo
                  </b-button>
                </b-step-item>

                <b-step-item :clickable="isStepsClickable" :type="{'is-success': isProfileSuccess}"
                             icon="account"
                             label="Informação pessoal" step="2">
                  <div v-if="errors.length" class="help is-danger">
                    <strong>Por favor corrija os seguintes erro(s):</strong>
                    <ul>
                      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                    </ul>
                  </div>
                  <b-field class="my-5" label="Nome" label-position="on-border">
                    <b-input id="name" v-model="name" icon="account" placeholder="Informe seu nome" required
                             size="is-medium" type="text" @keyup.native="checkStepForm2()"></b-input>
                  </b-field>
                  <b-field class="my-5" label="Informe seu país" label-position="on-border">
                    <b-autocomplete
                        id="nameCountry"
                        v-model="nameCountry"
                        :data="filteredDataCountryArray"
                        clearable
                        icon="map-marker"
                        placeholder="Exemplo: Brasil"
                        required
                        size="is-medium" @select="option => nameCountrySelected = option"
                        @keyup.native="checkStepForm2()">
                      <template #empty>Nenhum resultado encontrado.</template>
                    </b-autocomplete>
                  </b-field>
                  <b-field class="my-5" label="Número de telefone" label-position="on-border">
                    <b-input id="phoneNumber" v-model="phoneNumber" icon="phone" maxlength="15"
                             placeholder="Exemplo: 11911110000 (opcional)" size="is-medium" type="text"
                             @keyup.native="checkStepForm2()"></b-input>
                  </b-field>
                  <b-button id="nextButton2" :disabled="isDisabled" class="is-primary is-fullwidth mb-5"
                            icon-left="arrow-right-bold" size="is-medium"
                            @click="handleStep2">
                    Próximo
                  </b-button>
                  <a @click.prevent="handlePreviousStep">
                    <b-icon
                        icon="arrow-left-thick"
                        size="is-small">
                    </b-icon>
                    Passo anterior</a>
                </b-step-item>

                <b-step-item :clickable="isStepsClickable" :step="3" icon="account-plus"
                             label="Tipo de conta">
                  <p class="has-text-centered mb-5">Selecione o tipo de conta
                    <b-tooltip
                        label="Caso você solicite a conta de Administrador, ela vai ficar em análise e depois será reativada."
                        multilined
                        position="is-top" type="is-dark">
                      <b-icon icon="information-outline"></b-icon>
                    </b-tooltip>
                  </p>
                  <b-field>
                    <b-radio v-model="accountType"
                             name="accountType"
                             native-value="USER" required size="is-medium" @click.native="checkStepForm3">
                      Usuário da plataforma
                    </b-radio>
                  </b-field>
                  <b-field>
                    <b-radio v-model="accountType"
                             name="accountType"
                             native-value="ADMIN" size="is-medium" @click.native="checkStepForm3">
                      Administrador da plataforma
                    </b-radio>
                  </b-field>
                  <b-button id="nextButton3" :disabled="isDisabled" :loading="isLoading"
                            class="is-primary is-fullwidth mb-5" icon-left="check"
                            size="is-medium" @click="handleStep3">
                    Finalizar
                  </b-button>
                  <a :hidden="isLoading" @click.prevent="handlePreviousStep">
                    <b-icon
                        icon="arrow-left-thick"
                        size="is-small">
                    </b-icon>
                    Passo anterior</a>
                </b-step-item>

                <b-step-item :clickable="isStepsClickable" :step="4" icon="check" label="Concluído">
                  <h1 class="title has-text-centered">O cadastro foi concluído com sucesso!</h1>
                </b-step-item>

                <template
                    v-if="customNavigation"
                    #navigation="{previous, next}">
                  <b-button
                      :disabled="previous.disabled"
                      icon-left="backward"
                      icon-pack="fas"
                      outlined
                      type="is-danger"
                      @click.prevent="previous.action">
                    Previous
                  </b-button>
                  <b-button
                      :disabled="next.disabled"
                      icon-pack="fas"
                      icon-right="forward"
                      outlined
                      type="is-success"
                      @click.prevent="next.action">
                    Next
                  </b-button>
                </template>
              </b-steps>
              <router-link v-if="activeStep === 0 || activeStep === 3" to="/login">Efetuar Login</router-link>
            </div>
          </div>
          <div class="column card register-bg is-hidden-mobile">
          </div>
        </div>
      </div>
    </div>
    <footer-component/>
  </section>
</template>

<script>
import FooterComponent from "@/components/FooterComponent";
import api from "@/config/api";

export default {
  components: {FooterComponent},
  data() {
    return {
      activeStep: 0,

      isAnimated: true,
      isRounded: true,
      isStepsClickable: false,

      hasNavigation: false,
      customNavigation: false,
      isProfileSuccess: false,

      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
      labelPosition: 'bottom',
      mobileMode: 'minimalist',

      isDisabled: true,
      errors: [],
      email: null,
      password: null,
      passwordConfirmation: null,
      name: null,
      dataCountry: [
        'Afeganistão',
        'África do Sul',
        'Albânia',
        'Alemanha',
        'Andorra',
        'Angola',
        'Anguilla',
        'Antártida',
        'Antígua e Barbuda',
        'Antilhas Holandesas',
        'Arábia Saudita',
        'Argélia',
        'Argentina',
        'Armênia',
        'Aruba',
        'Austrália',
        'Áustria',
        'Azerbaijão',
        'Bahamas',
        'Bahrein',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Bélgica',
        'Belize',
        'Benin',
        'Bermudas',
        'Bolívia',
        'Bósnia-Herzegóvina',
        'Botsuana',
        'Brasil',
        'Brunei',
        'Bulgária',
        'Burkina Fasso',
        'Burundi',
        'Butão',
        'Cabo Verde',
        'Camarões',
        'Camboja',
        'Canadá',
        'Cazaquistão',
        'Chade',
        'Chile',
        'China',
        'Chipre',
        'Cingapura',
        'Colômbia',
        'Congo',
        'Coréia do Norte',
        'Coréia do Sul',
        'Costa do Marfim',
        'Costa Rica',
        'Croácia (Hrvatska)',
        'Cuba',
        'Dinamarca',
        'Djibuti',
        'Dominica',
        'Egito',
        'El Salvador',
        'Emirados Árabes Unidos',
        'Equador',
        'Eritréia',
        'Eslováquia',
        'Eslovênia',
        'Espanha',
        'Estados Unidos',
        'Estônia',
        'Etiópia',
        'Fiji',
        'Filipinas',
        'Finlândia',
        'França',
        'Gabão',
        'Gâmbia',
        'Gana',
        'Geórgia',
        'Gibraltar',
        'Grã-Bretanha (Reino Unido, UK)',
        'Granada',
        'Grécia',
        'Groelândia',
        'Guadalupe',
        'Guam (Território dos Estados Unidos)',
        'Guatemala',
        'Guernsey',
        'Guiana',
        'Guiana Francesa',
        'Guiné',
        'Guiné Equatorial',
        'Guiné-Bissau',
        'Haiti',
        'Holanda',
        'Honduras',
        'Hong Kong',
        'Hungria',
        'Iêmen',
        'Ilha Bouvet (Território da Noruega)',
        'Ilha do Homem',
        'Ilha Natal',
        'Ilha Pitcairn',
        'Ilha Reunião',
        'Ilhas Aland',
        'Ilhas Cayman',
        'Ilhas Cocos',
        'Ilhas Comores',
        'Ilhas Cook',
        'Ilhas Faroes',
        'Ilhas Falkland (Malvinas)',
        'Ilhas Geórgia do Sul e Sandwich do Sul',
        'Ilhas Heard e McDonald (Território da Austrália)',
        'Ilhas Marianas do Norte',
        'Ilhas Marshall',
        'Ilhas Menores dos Estados Unidos',
        'Ilhas Norfolk',
        'Ilhas Seychelles',
        'Ilhas Solomão',
        'Ilhas Svalbard e Jan Mayen',
        'Ilhas Tokelau',
        'Ilhas Turks e Caicos',
        'Ilhas Virgens (Estados Unidos)',
        'Ilhas Virgens (Inglaterra)',
        'Ilhas Wallis e Futuna',
        'índia',
        'Indonésia',
        'Irã',
        'Iraque',
        'Irlanda',
        'Islândia',
        'Israel',
        'Itália',
        'Jamaica',
        'Japão',
        'Jersey',
        'Jordânia',
        'Kênia',
        'Kiribati',
        'Kuait',
        'Laos',
        'Látvia',
        'Lesoto',
        'Líbano',
        'Libéria',
        'Líbia',
        'Liechtenstein',
        'Lituânia',
        'Luxemburgo',
        'Macau',
        'Macedônia (República Yugoslava)',
        'Madagascar',
        'Malásia',
        'Malaui',
        'Maldivas',
        'Mali',
        'Malta',
        'Marrocos',
        'Martinica',
        'Maurício',
        'Mauritânia',
        'Mayotte',
        'México',
        'Micronésia',
        'Moçambique',
        'Moldova',
        'Mônaco',
        'Mongólia',
        'Montenegro',
        'Montserrat',
        'Myanma',
        'Namíbia',
        'Nauru',
        'Nepal',
        'Nicarágua',
        'Níger',
        'Nigéria',
        'Niue',
        'Noruega',
        'Nova Caledônia',
        'Nova Zelândia',
        'Omã',
        'Palau',
        'Panamá',
        'Papua-Nova Guiné',
        'Paquistão',
        'Paraguai',
        'Peru',
        'Polinésia Francesa',
        'Polônia',
        'Porto Rico',
        'Portugal',
        'Qatar',
        'Quirguistão',
        'República Centro-Africana',
        'República Democrática do Congo',
        'República Dominicana',
        'República Tcheca',
        'Romênia',
        'Ruanda',
        'Rússia (antiga URSS) - Federação Russa',
        'Saara Ocidental',
        'Saint Vincente e Granadinas',
        'Samoa Americana',
        'Samoa Ocidental',
        'San Marino',
        'Santa Helena',
        'Santa Lúcia',
        'São Bartolomeu',
        'São Cristóvão e Névis',
        'São Martim',
        'São Tomé e Príncipe',
        'Senegal',
        'Serra Leoa',
        'Sérvia',
        'Síria',
        'Somália',
        'Sri Lanka',
        'St. Pierre and Miquelon',
        'Suazilândia',
        'Sudão',
        'Suécia',
        'Suíça',
        'Suriname',
        'Tadjiquistão',
        'Tailândia',
        'Taiwan',
        'Tanzânia',
        'Território Britânico do Oceano índico',
        'Territórios do Sul da França',
        'Territórios Palestinos Ocupados',
        'Timor Leste',
        'Togo',
        'Tonga',
        'Trinidad and Tobago',
        'Tunísia',
        'Turcomenistão',
        'Turquia',
        'Tuvalu',
        'Ucrânia',
        'Uganda',
        'Uruguai',
        'Uzbequistão',
        'Vanuatu',
        'Vaticano',
        'Venezuela',
        'Vietnã',
        'Zâmbia',
        'Zimbábue',
      ],
      nameCountry: '',
      nameCountrySelected: null,
      phoneNumber: null,
      accountType: null,
      isLoading: false,
    }
  },
  methods: {
    checkStepForm1() {
      this.errors = [];
      if (this.email && this.password && this.passwordConfirmation) {
        this.isDisabled = false;
        return;
      }
      this.isDisabled = true;
    },
    checkStepForm2() {
      this.errors = [];
      if (this.name && this.nameCountry) {
        this.isDisabled = false;
        return;
      }
      this.isDisabled = true;
    },
    checkStepForm3() {
      this.isDisabled = false;
    },
    handleStep1() {
      this.errors = [];
      if (!this.email) {
        this.errors.push("E-mail é requerido.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push('O e-mail deve ser válido.');
      }
      if (this.password !== this.passwordConfirmation) {
        this.errors.push('A confirmação das senhas está incorreta.');
      }
      if (this.password.length < 6) {
        this.errors.push('A senha deve conter no mínimo 6 caracteres');
      }
      if (!this.errors.length) {
        this.activeStep++;
        this.isDisabled = true;
        this.checkStepForm2();
      }
    },
    handleStep2() {
      this.errors = [];
      if (this.phoneNumber && this.validNumber(this.phoneNumber)) {
        this.errors.push('O número de telefone deve ser válido.');
      }
      if (!this.errors.length) {
        this.activeStep++;
        this.isDisabled = !this.accountType;
      }
    },
    handleStep3() {
      this.requestCreateUser();
    },
    validEmail: function (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validNumber: function (number) {
      return isNaN(Number(number));
    },
    handlePreviousStep() {
      if (this.activeStep > 0) {
        this.errors = [];
        this.activeStep--;
        this.isDisabled = false;
      }
    },
    requestCreateUser() {
      this.isDisabled = true;
      this.isLoading = true;
      api.post('/api/v1/user', {
        email: this.email,
        password: this.password,
        name: this.name,
        country: this.nameCountry,
        phoneNumber: this.phoneNumber,
        accountType: this.accountType,
      })
          .then(() => {
            this.activeStep++;
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
        this.isDisabled = false;
      });
    }
  },
  computed: {
    filteredDataCountryArray() {
      return this.dataCountry.filter((option) => {
        return option
            .toString()
            .toLowerCase()
            .indexOf(this.nameCountry.toLowerCase()) >= 0
      })
    }
  }
}
</script>

<style>
.register-bg {
  background-image: url('../assets/images/register.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>

<template>
  <main class="main">
    <navbar-component/>
    <menu-component/>
    <section class="section">
      <h2 class="title is-4 has-text-primary">Configurações do Usuário</h2>
      <b-tabs v-model="activeTab">
        <b-tab-item label="Meus dados">
          <form class="form" @submit="checkFormMyData">
            <b-field class="my-5" label="E-mail" label-position="on-border">
              <b-input :value="email" disabled icon="email"
                       placeholder="Informe seu e-mail" required type="email"></b-input>
            </b-field>
            <b-field class="my-5" label="Nome" label-position="on-border">
              <b-input id="name" v-model="name" :value="name" icon="account" placeholder="Informe seu nome"
                       required type="text"></b-input>
            </b-field>
            <b-field class="my-5" label="Informe seu país" label-position="on-border">
              <b-autocomplete
                  id="nameCountry"
                  v-model="nameCountry"
                  :data="filteredDataCountryArray"
                  :value="nameCountry"
                  clearable
                  icon="map-marker"
                  placeholder="Exemplo: Brasil"
                  required
                  @select="option => nameCountrySelected = option">
                <template #empty>Nenhum resultado encontrado.</template>
              </b-autocomplete>
            </b-field>
            <b-field class="my-5" label="Número de telefone" label-position="on-border">
              <b-input id="phoneNumber" v-model="phoneNumber" :value="phoneNumber" icon="phone" maxlength="15"
                       placeholder="Exemplo: 11911110000 (opcional)" type="text"></b-input>
            </b-field>
            <b-button id="editButton" class="is-primary mb-5" icon-left="pencil" native-type="submit">
              Editar
            </b-button>
          </form>
        </b-tab-item>
        <b-tab-item label="Alterar senha">
          <form class="form" @submit="checkFormChangePassword">
            <b-field class="my-5" label="Senha" label-position="on-border">
              <b-input id="password" icon="lock" password-reveal placeholder="Informe sua nova senha" required
                       type="password"></b-input>
            </b-field>
            <b-button id="changePasswordButton" class="is-primary mb-5" icon-left="lock-check" native-type="submit">
              Salvar
            </b-button>
          </form>
        </b-tab-item>
      </b-tabs>
      <b-loading v-model="isLoading" :is-full-page="true"></b-loading>
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
      activeTab: 0,
      isLoading: false,
      email: null,
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
    }
  },
  methods: {
    checkFormMyData(e) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
      e.preventDefault();
    },
    checkFormChangePassword(e) {
      e.preventDefault();
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
  },
  mounted() {
    this.email = 'test@test.com';
    this.name = 'Charles';
    this.nameCountry = 'Brasil';
    this.phoneNumber = null;
  },
  components: {MenuComponent, NavbarComponent, FooterComponent}
}
</script>
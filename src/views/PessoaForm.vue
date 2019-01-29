<template>
  <div>

    <md-card>
      <md-card-header>
        <div class="md-title">Cadastro de Pessoas</div>
      </md-card-header>
      <md-card-content>
        <form novalidate class="md-layout md-alignment-center-space-between" >

          <md-field class="md-layout-item" :class="$vClass('nome')">
            <label for="nome">Nome</label>
            <md-input name="nome" id="nome" v-model="obj.nome"></md-input>
            <span class="md-error" v-if="!$v.obj.nome.required">O nome é obrigatório!</span>
            <span class="md-error" v-else-if="!$v.obj.nome.minLength">O nome deve conter pelo menos 3 letras!</span>
          </md-field>

          <div class="md-layout-item">
            <md-radio name="sexo" v-model="obj.sexo" :value="false">Feminino</md-radio>
            <md-radio name="sexo" v-model="obj.sexo" :value="true">Masculino</md-radio>
            <md-field class="no-height" :class="$vClass('sexo')">
              <span class="md-error span100" v-if="!$v.obj.sexo.required">O sexo é obrigatório!</span>
            </md-field>
          </div>

          <div class="md-layout-item">
            <md-datepicker v-model="obj.nascimento" :md-immediately="true" :class="$vClass('nascimento')">
              <label>Nascimento</label>
              <span class="md-error" v-if="!$v.obj.nascimento.required">O nascimento é obrigatório!</span>
            </md-datepicker>
          </div>

          <md-field class="md-layout-item" :class="$vClass('foto', true)">
            <label>Foto</label>
            <md-file @md-change="setFotos" placeholder="Fotografia"/>
            <span class="md-error" v-if="!$v.foto.required">Selecione uma foto sua!</span>
          </md-field>

        </form>
      </md-card-content>
      <md-card-actions>
        <md-progress-spinner md-mode="indeterminate" class="md-accent" :md-diameter="30" v-show="enviando" />
        <md-button @click="limpar()">Limpar</md-button>
        <md-button @click="salvar()" class="md-raised md-accent">Salvar</md-button>
      </md-card-actions>
    </md-card>

    <!-- ================================================================== -->

    <md-table v-model="pessoas" md-sort="id" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Pessoas</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Nome" md-sort-by="nome">{{ item.nome }}</md-table-cell>
        <md-table-cell md-label="Sexo" md-sort-by="sexo">{{ item.sexo? 'Masc.' : 'Fem.' }}</md-table-cell>
        <md-table-cell md-label="Nascimento" md-sort-by="nascimento">{{ item.nascimento }}</md-table-cell>
      </md-table-row>
    </md-table>

  </div>
</template>

<script>
import * as axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'PessoaForm',
  mixins: [validationMixin],
  data() {
    return {
      pessoas: [],
      obj: {},
      enviando: false,
      formErros: false,
      foto: null
    }
  },
  mounted() {
    axios.get('/pessoas').then((res) => {
      this.pessoas = res.data
    })
  },
  methods: {
    $vClass(campoName, root = false) {
      let campo = root ? this.$v[campoName] : this.$v.obj[campoName]
      if ( campo ) return { 'md-invalid': campo.$invalid && campo.$dirty }
    },
    setFotos(foto) {
      this.foto = foto
    },
    limpar() {
      this.$v.$reset()
      this.obj = {}
    },
    salvar() {
      this.$v.$touch()
      if ( this.$v.$invalid ) return (this.formErros = true)
      this.formErros = false
      this.enviando = true

      // enviar requisição multipart
      let data = new FormData()
      if ( this.foto && this.foto.length ) data.append('foto', this.foto[0])
      data.append('dados', new Blob( [JSON.stringify(this.obj)], { type: 'application/json' } ))

      axios.post('/pessoas', data, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res) => {
        if ( res.status === 200 ) {
          this.pessoas.push(res.data)
          this.limpar()
        }
        this.enviando = false
      })
    }
  },
  validations: {
    obj: {
      nome: {
        required, minLength: minLength(3)
      },
      sexo: {
        required
      },
      nascimento: {
        required
      }
    },
    foto: {
      required
    }
  }
}
</script>

<style lang="scss" scoped="">
.md-card {
  margin: 20px;
}
.md-table-cell:not(.md-numeric) {
  text-align: left;
}
.span100 {
  width: 100%;
}
</style>

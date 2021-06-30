<template>
  <Layout>
    <div class="form-group">
      <label for="">Seleccionar un Indicador</label>

      <select name="indicador" id="indicador" class="form-select" v-model="indicador">
        <option v-for="(ind, i) in indicadoresEconomicos" :key="i" >{{ind.codigo}}</option>
      </select>

      <!-- indicadores info -->
      <Spinner v-if="loading"/>
      <div v-if="indicadorInfo.serie">
        <h4>Indicador: {{indicadorInfo.nombre}}</h4>
        <h5>Unidad de Medida:{{indicadorInfo.unidad_medida}}</h5>
        <h3>{{indicador}}</h3>
        <table class="table mt-5">
          <thead class="thead-light">
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ind in indicadorInfo.serie" :key="ind.fecha">
              <!-- <td>{{ind.fecha | fecha}}</td> -->
              <td>{{ fecha(ind.fecha) }}</td>
              <td>{{ind.valor}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- fin indicadores info -->
    </div>
  </Layout>
</template>

<script>
// @ is an alias to /src
import Layout from "../layout/Layout.vue";
import Spinner from "../components/Spinner.vue";
import {indicadoresEconomicos} from '../api/indicadores';
export default {
  name: "Home",
  components: {
    Layout,
    Spinner
  },
  data(){
    return{
      indicadorInfo:[],
      indicadoresEconomicos:[
        {codigo:'uf'},
        {codigo:'ivp'},
        {codigo:'dolar_intercambio'},
        {codigo:'dolar'},
        {codigo:'euro'},
        {codigo:'ipc'},
        {codigo:'utm'},
        {codigo:'imacec'},
        {codigo:'tpm'},
        {codigo:'libra_cobre'},
        {codigo:'tasa_desempleo'},
        {codigo:'bitcoin'}],
      indicador:'',
      loading:false

    }
  },
  methods:{
    async getIndicadores(){
      
      console.log("opcion:",this.indicador);
      try {
        this.indicadorInfo=await indicadoresEconomicos(this.indicador);
        console.log(this.indicadorInfo);
        console.log("apagar spinner");
      this.loading=false;
      } catch (error) {
        console.log(error);
      }
    },
    fecha(value){
      let f = new Date(value);
      let fecha = `${f.getDate()}/${f.getMonth()+1}/${f.getFullYear()}`;
      return fecha;
    }
  },
  created(){
    this.getIndicadores();
  },
  watch:{
    /* recibe por parametro el nuevo valor, el valor anterior */
    indicador(){
      console.log("Cargar spinner");
      this.loading=true;
      console.log('ene l watch');
      this.getIndicadores();
    
      
      
    }
  }/* ,
  filters:{
    fecha : function(value){
      let f = new Date(value);
      let fecha = `${f.getDate()}/${f.getMonth()+1}/${f.getFullYear()}`;
      return fecha;
    }
  } */
  /* ,
  computed:{
    fecha(){
      let f = new Date(value);
      let fecha = `${f.getDate()}/${f.getMonth()+1}/${f.getFullYear()}`;
      return fecha;
    }
  } */
};
</script>

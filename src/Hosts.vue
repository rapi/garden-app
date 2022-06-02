<template>
    <div>
      <v-text-field v-model="ip">
        <v-progress-circular
            slot="append"
            :size="20"
            indeterminate
            color="primary"
            v-if="loading"
        ></v-progress-circular>
        <v-icon
            slot="append"
            color="red"
            v-else-if="checked"
        >
          mdi-check
        </v-icon>
        <v-icon
            slot="append"
            color="red"
            v-else
        >
          mdi-close
        </v-icon>


      </v-text-field>
      <v-btn
          class="ma-2"
          color="primary"
          @click="check"
      >
        Verify
      </v-btn>
      <v-btn
          class="ma-2"
          color="primary"
          :disabled="!checked||loading"
          @click="save"
      >
        Save
      </v-btn>
    </div>
</template>

<script>
import { Http } from '@capacitor-community/http';

export default {
  name: "Hosts",
  data:function(){
    return {
      checked:false,
      loading:false,
      ip:this.$store.getters['ip']
    }
  },

  methods:{
    save(){
      this.$store.commit('updateIp',this.ip)
    },
    async check(){
      this.loading=true;
      console.log(`http://${this.ip}/api/info`)
      const options = {
        url: `http://${this.ip}/api/info`,
      };
      try{
        const response=await Http.get(options);
        console.log(response)
        const {zones}=JSON.parse(response.data)
        if(zones.length>0){
          this.checked=true
        }else
          throw "Error"
      }catch (e) {
        console.log(e)
        this.checked=false
      }
      this.loading=false
    }
  }
}
</script>

<style scoped>

</style>

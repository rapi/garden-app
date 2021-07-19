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
  watch:{
    ip:{
      immediate:true,
      handler:async function (url){
        this.loading=true;
        const options = {
          url: `http://${url}/api/info`,
        };
        try{
          const response=await Http.get(options);
          const {time}=JSON.parse(response.data)
          if(time){
            this.checked=true
          }else
            throw "Error"
        }catch (e) {
          this.checked=false
        }
        this.loading=false
      }
    }
  },
  methods:{
    save(){
      this.$store.commit('updateIp',this.ip)
    }
  }
}
</script>

<style scoped>

</style>

<template>
<div>
  <v-time-picker
      v-model="newTime"
      class="mt-4"
      format="24hr"
      scrollable
  ></v-time-picker>
  <v-btn block color="primary" class="mt-5" v-if="time!==newTime" :loading="loading" @click="save(newTime)">
    Поменять на {{time&&`c ${time} на `}}{{newTime}}
  </v-btn>
  <v-btn block color="pink" class="mt-5" dark :loading="loading" v-if="time!==''" @click="save('99:99')">
    Выключить
  </v-btn>
</div>
</template>

<script>
import {Http} from "@capacitor-community/http";

export default {
  name: "Time",
  data:function(){
    return {
      loading:false,
      time:"",
      newTime:""
    }
  },
  mounted() {
    this.fetch()
  },
  methods:{
    async fetch(){
      const {data}=await Http.get({url:`http://${this.$store.getters['ip']}/api/info`});
      this.time=JSON.parse(data).time
      if(this.time==='99:99'){
        this.time=''
      }
      this.newTime=this.time
    },
    async save(time){
      this.loading=true;
      await Http.get({url:`http://${this.$store.getters['ip']}/api/set_timer?timer=${time}`});
      await this.fetch()
      this.loading=false
      // this.time=JSON.parse(data).time
    }
  }
}
</script>

<style scoped>

</style>

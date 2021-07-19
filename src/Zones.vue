<template>
  <v-list subheader>
    <v-subheader>Зоны</v-subheader>

    <v-list-item
        v-for="(zone,i) in data.zones"
        :key="zone.pin"
    >

      <v-list-item-action>
        <v-text-field style="width:60px" :value="zone.interval" type="number" @input="changeInterval(zone.pin,$event)"></v-text-field>

      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="'Зона '+  (i+1)">


        </v-list-item-title>

      </v-list-item-content>

      <v-list-item-icon>

        <v-btn
            class="mx-2"
            fab
            dark
            small
            color="primary"
            v-if="loading===zone.pin"
        >
          <v-progress-circular
              indeterminate
          ></v-progress-circular>
        </v-btn>
        <v-btn
            class="mx-2"
            fab
            dark
            small
            @click="enableDisable(zone.pin)"
            color="primary"
            v-else-if="!zone.isEnabled"
        >
          <v-icon dark>
            mdi-play
          </v-icon>
        </v-btn>
        <v-btn
            class="mx-2"
            fab
            dark
            small
            color="pink"
            @click="enableDisable(zone.pin)"
            v-else
        >
          <v-icon dark>
            mdi-stop
          </v-icon>
        </v-btn>

      </v-list-item-icon>
    </v-list-item>
  </v-list>
</template>

<script>
import {Http} from "@capacitor-community/http";

export default {
  name: "Zones",
  data(){
    return {
      loading:false,
      data:{
        zones:[],
      }
    }
  },
  mounted() {
    this.fetch()
  },
  methods:{
    async changeInterval(pin,interval){
      this.loading=pin;
      await Http.get({url:`http://${this.$store.getters['ip']}/api/set_interval?pin=${pin}&interval=${interval}`});
      await this.fetch();
      this.loading=false;
    },
    async enableDisable(pin){
      this.loading=pin;
      await Http.get({url:`http://${this.$store.getters['ip']}/api/start_one?pin=`+pin});
      await this.fetch();
      this.loading=false;
    },
    async fetch(){
      const {data}=await Http.get({url:`http://${this.$store.getters['ip']}/api/info`});
      this.data=JSON.parse(data)
    }
  }
}
</script>

<style scoped>

</style>

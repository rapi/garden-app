<template>
  <v-form >
    <v-container>
      <v-row>
        <v-col
            cols="12"
        >

          <v-col
              cols="12"
          >
            <v-text-field
                v-model="ssid"
                label="SSID"
                required
            ></v-text-field>
          </v-col>
          <v-text-field
              v-model="password"
              label="Password"
              required
          ></v-text-field>
        </v-col>

        <v-btn block color="primary" @click="save">
          Save
        </v-btn>

      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import {Http} from "@capacitor-community/http";

export default {
  name: "Time",
  data:function(){
    return {
      password:"",
      ssid:"",
    }
  },
  methods:{
    async save(){
      this.loading=true;
      await Http.get({url:`http://${this.$store.getters['ip']}/api/set_password?ssid=${this.ssid}&password=${this.password}`});
      this.loading=false
    }
  }
}
</script>

<style scoped>

</style>

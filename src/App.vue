<template>
  <v-app id="inspire">
    <v-system-bar app>

      <v-icon x-large @click="drawer=!drawer">mdi-menu</v-icon>

      <v-spacer/>
      <div v-if="$store.getters['ip']">
        <v-btn
            class="mx-2"
            fab
            dark
            small
            color="primary"
            v-if="loading"
        >
          <v-progress-circular
              indeterminate
          ></v-progress-circular>
        </v-btn>
        <v-btn
            v-else-if="!enabled"
            class="mx-2"
            fab
            dark
            small
            color="primary"
            @click="enable"
        >
          <v-icon dark color="white">
            mdi-play
          </v-icon>
        </v-btn>
        <v-btn
            v-else
            class="mx-2"
            fab
            dark
            small
            @click="stop"
            color="pink"
        >
          <v-icon dark color="white">
            mdi-stop
          </v-icon>
        </v-btn>
      </div>
    </v-system-bar>

    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <Menu/>
    </v-navigation-drawer>

    <v-main>
      <v-container
          class="py-8 px-6"
          fluid
      >
        <v-row>
          <v-col
              cols="12"
          >
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Menu from "./Menu";
import {Http} from "@capacitor-community/http";

export default {
  components: {
    Menu
  },
  data: () => ({
    drawer: false,
    loading: false,
    enabled: false
  }),
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.loading = true
      try {
        const {data} = await Http.get({url: `http://${this.$store.getters['ip']}/api/info`});
        this.enabled = JSON.parse(data).isWatering
      }
      this.loading = false

    },
    async enable() {
      this.loading = true
      await Http.get({url: `http://${this.$store.getters['ip']}/api/start_all`});
      await this.fetch()
      this.loading = false

    },
    async stop() {
      this.loading = true
      await Http.get({url: `http://${this.$store.getters['ip']}/api/stop`});
      await this.fetch()
      this.loading = false

    },
  }
}
</script>
<style>
div.v-system-bar {
  padding: 25px;
}
</style>

<template>
  <div class="container" data-app v-if="isLoaded">
    <v-dialog
        v-model="dialog"
    >
      <template v-slot:activator="{ on, attrs }">
        <div style="width: 100%;display: flex">
          <div style="width: 100px;margin-left: auto">
            <v-btn
                style="margin-left: auto;"
                icon
                color="red lighten-2"
                @click="reboot"
            >
              <v-icon>sync</v-icon>

            </v-btn>
            <v-btn
                style="margin-left: auto;"
                icon
                color="red lighten-2"
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>settings</v-icon>

            </v-btn>

          </div>
        </div>
      </template>

      <v-card>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th>#</th>
                <th>Interval</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="zone in data.zones" :key="zone.pin">
                <td>{{ zone.pin }}</td>
                <td><v-text-field
                    type="number"
                    label="Interval"
                    :value="zone.interval"
                    @input="changeInterval(zone.pin,$event)"
                ></v-text-field></td>
                <td><v-btn
                    color="primary"
                    dark @click="enableDisableOne(zone.pin)"
                >{{zone.isEnabled?"Disable":"Enable"}}</v-btn></td>
              </tr>

              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <p>Welcome to your <strong>watering plan!</strong></p>
    <h2><strong>Step 1:</strong> Choose start time</h2>
    <v-time-picker
        format="24hr"
        v-model="time"
        @click:minute="changeTimer"
    />
    <div class="start">
      <button
          v-if="!data.zones.find(({isEnabled})=>isEnabled)"
          class="my-btn start-btn"
          value="stop"
          @click="startWatering">Start Now</button>
      <button
          v-else
          class="my-btn stop-btn"
          @click="stopWatering"
          value="stop">Stop</button>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showTime: false,
      isLoaded: false,
      time: '',
      data: {},
      dialog: false,
      intervalOptions: [1, 5, 10, 12, 15, 20],
    };
  },
  async mounted() {
    await this.fetchData();
    this.time = this.data.time;
    setInterval(() => this.fetchData(), 5000);
    this.isLoaded = true;
  },
  methods: {
    async fetchData() {
      this.data = this.$set(this, 'data', await (await fetch('/api/info')).json());
    },
    async changeTimer() {
      await fetch(`/api/set_timer?timer=${this.time}`);
      setTimeout(this.fetchData, 300);
    },
    async changeInterval(i, e) {
      console.log(i, e);
      await fetch(`/api/set_interval?interval=${e}&pin=${i}`);
      // setTimeout(this.fetchData, 300);
    },
    async startWatering() {
      await fetch('/api/start_all');
      setTimeout(this.fetchData, 300);
    },
    async stopWatering() {
      await fetch('/api/stop');
      setTimeout(this.fetchData, 300);
    },
    async enableDisableOne(i) {
      await fetch(`/api/start_one?pin=${i}`);
      setTimeout(this.fetchData, 300);
    },
    async reboot() {
      await fetch('/api/reboot');
      setTimeout(this.fetchData, 3000);
    },
  },
};
</script>
<style>
.theme--light.v-card {
  background-color: transparent!important;
}
.theme--light.v-picker__body {
  background-color: transparent!important;
}
body {
  background-color: #6587fa;
  color: white;
  font-family: 'Roboto', sans-serif;
  margin: 0;
}
.container {
  display: flex;
  flex-flow: column wrap;
  height: 100%;
  align-items: center;
  justify-content: center;
  align-content: space-around;
  /*padding: 7rem 5rem;*/
}
.period-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
p {
  font-size: 1.2rem;
  text-align: center;
}
h2 {
  font-size: 1.3rem;
}
.start {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
  height: 9%;
  align-items: center;
  justify-content: space-evenly;
}
.my-btn {
  color: white;
  border: none;
  border-color: white;
  border-radius: 15rem;
  padding: 0.5rem 2rem;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 0.25rem;
  font-family: 'Roboto', sans-serif;
  outline: none;
  box-shadow: 0px 0px 0px transparent;
}
.body-btn {
  background-color: #6f91ff;
}
.body-btn:hover {
  background-color: #829ffd;
}
.body-btn:active {
  background-color: #829ffd;
}
.menu-btn {
  box-shadow: 0.15rem 0.15rem #fb8db3;
}
.menu-btn:hover {
  background-color: #ff6c9d;
}
.menu-btn:active {
  background-color: #ff6c9d;
}
/*input[type=text], select {*/
/*  padding: 0.5rem;*/
/*  margin: 0 1.5rem;*/
/*  display: inline-block;*/
/*  border: 1px solid #ccc;*/
/*  border-radius: 1rem;*/
/*  box-sizing: border-box;*/
/*  font-family: 'Roboto', sans-serif;*/
/*  font-size: 1.5rem;*/
/*  color: white;*/
/*  background-color: #6587fa;*/
/*  text-align: center;*/
/*}*/
/*.weekDays-selector input {*/
/*  display: none!important;*/
/*}*/
/*.weekDays-selector input[type=checkbox] + label {*/
/*  display: inline-block;*/
/*  border-radius: 2.3rem;*/
/*  background-color: #7d9bff;*/
/*  color: white;*/
/*  padding: 2.5rem 0rem;*/
/*  width: 6rem;*/
/*  font-size: 4rem;*/
/*  margin-right: 0.5rem;*/
/*  line-height: 40px;*/
/*  text-align: center;*/
/*  cursor: pointer;*/
/*}*/
/*.weekDays-selector input[type=checkbox]:checked + label {*/
/*  background: #ff5890;*/
/*  color: #ffffff;*/
/*}*/
.time-picker {
  margin: 0.5rem 0;
  font-size: 1.5rem;
  font-family: 'Roboto', sans-serif;
  padding: 1.5rem;
  background-color: #7d9bff;
  border-color: #7d9bff;
  border-style: none;
  color: white;
  border-radius: 2.3rem;
}
input[type="time"]::-webkit-calendar-picker-indicator {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="4rem" height="4rem"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>');
}

.start-btn{
  width: 80%;
  margin: auto;
  margin-top: -1rem;
  background-color: #ff5890;
}
.stop-btn{
  width: 80%;
  margin: auto;
  margin-top: -1rem;
  background: #6681db;

}
</style>

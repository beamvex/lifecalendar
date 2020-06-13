<template>
  <v-app id="inspire">
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Life Calendar</span>
      </v-toolbar-title>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
        class="hidden-sm-and-down"
        @input="changed"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-calendar"
            label="Choose Birthday"
            class="hidden-sm-and-down"
            v-bind="attrs"
            v-on="on"
            v-model="date"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable year-icon="mdi-calendar-blank">
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col>
            <LifeGrid @mouseAction="mouseAction" v-model="gridDate"/>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null,
    items: [{ icon: "mdi-contacts", text: "Calendar" }],
    x: 0,
    y: 0,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    gridDate: new Date().toISOString().substr(0, 10)
  }),
  methods: {
    mouseAction(x, y) {
      this.x = x;
      this.y = y;
    },
    changed(evt) {
      console.log('input', evt);
      if (!evt) {
        this.gridDate = this.date;
      }
    }
  }
};
</script>
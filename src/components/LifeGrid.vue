<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>90 Years in weeks</h1>

        <table ref="mytable">
          <tr v-for="item in items" :key="item.key">
            <td v-for="col in item.cols" :key="col.key" @mouseover="over($event, col)">
              <!--
          <v-hover v-slot:default="{ hover }">
          <v-btn x-small :color="hover ? 'primary': 'secondary'" dark>&nbsp;</v-btn>
          </v-hover>
              -->
              <p :class="col.clazz">x</p>
              <!--
              
              
                
                  
                
              
              -->
            </td>
          </tr>
        </table>

        <v-card :style="stly" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">WEEK {{ week }}</div>
              <v-list-item-title class="headline mb-1">{{ weekDate }}</v-list-item-title>
              <v-list-item-subtitle>to {{ weekEndDate }}</v-list-item-subtitle>
              <v-list-item-subtitle>age: {{ age }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ selected }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn text>Button</v-btn>
            <v-btn text>Button</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.hover-item {
  border: 1px black solid;
  margin-bottom: 2px;
  background-color: #fff;
  color: white;
}

.hover-item.used {
  border: 1px black solid;
  margin-bottom: 2px;
  background-color: darkgray;
  color: darkgray;
}

.hover-item.thisWeek {
  border: 1px lightsalmon solid;
  margin-bottom: 2px;
  background-color: salmon;
  color: salmon;
}

.hover-item.birthdayWeek {
  border: 1px green solid;
  margin-bottom: 2px;
  background-color: darkgreen;
  color: darkgreen;
}

.hover-item:hover {
  background-color: #000;
  color: #000;
}
</style>

<script>
import moment from "moment";

export default {
  name: "LifeGrid",

  methods: {
    over(e, col) {
      this.selected = col;
      this.x =
        this.$refs["mytable"].scrollWidth +
        this.$refs["mytable"].getBoundingClientRect().left +
        document.documentElement.scrollLeft +
        15;
      this.y = 50 + document.documentElement.scrollTop;
      this.stly =
        "position:absolute; left: " + this.x + "px; top: " + this.y + "px;";
      //console.log(this.$refs['mytable']);
      this.week = col.key;
      this.weekDate = col.begindate.format("Do MMM YYYY");
      this.weekEndDate = col.enddate.format("Do MMM YYYY");
      this.clazz = col.clazz;
      this.age = col.duration.get('years') ;
      this.$emit("mouseAction", this.x, this.y);
    },
    buildItems: () => {
      var items = [];

      var today = moment();
      var dob = moment(new Date("1976-07-22"));
      var begin = dob.clone();
      var birthday = dob.clone();
      var w = 0;

      for (var i = 0; i < 52; i++) {
        var cols = [];

        for (var j = 0; j < 90; j++) {
          var begindate = begin.clone();
          var enddate = begin.clone().add(6, "days");

          birthday = birthday.year(begindate.year());

          var duration = moment.duration(enddate.diff(dob))          

          var clazz = "hover-item";
          if (begindate.isSameOrBefore(birthday) && enddate.isSameOrAfter(birthday)) {
            clazz += " birthdayWeek";
          } else {
            if (begindate.isBefore(today)) {
              if (enddate.isAfter(today)) {
                clazz += " thisWeek";
              } else {
                clazz += " used";
              }
            }
          }

          cols.push({
            key: w,
            begindate,
            enddate,
            clazz,
            duration
          });

          w++;
          begin = begin.add(7, "days");
        }

        var item = {
          key: i,
          cols
        };

        items.push(item);
      }

      return items;
    }
  },
  data: () => ({
    items: [],
    selected: null,
    x: 0,
    y: 0,
    stly: "left: 0px; top: 0px;",
    weekDate: null,
    weekEndDate: null,
    clazz: null,
    age: null
  }),
  mounted() {
    this.items = this.buildItems();
    console.log("did this, did thaT");
  }
};
</script>

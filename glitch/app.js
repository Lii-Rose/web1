/* global Vue, dayjs */
var app = new Vue({
  el: "#app",
  data: () => {
    return {
      format: "YYYY-MM-DD",
      projectUrl: "https://eversince.glitch.me",
      counters: [],
      units: ["days", "weeks", "months", "years"],
      directions: ["since", "until"],
      colors: [
        "green",
        "dark-green",
        "blue",
        "dark-blue",
        "red",
        "dark-red",
        "yellow",
        "gold",
        "pink",
        "dark-pink",
        "purple",
        "light-purple",
        "light-silver",
        "gray"
      ],
      selectedCounter: null,
      showShare: false,
      copied: false
    };
  },
  computed: {
    shareUrl() {
      const n = encodeURIComponent(this.selectedCounter.name);
      const u = this.units.indexOf(this.selectedCounter.units);
      const d = this.directions.indexOf(this.selectedCounter.direction);
      const t = this.selectedCounter.target.format(this.format);
      return `${this.projectUrl}?n=${n}&u=${u}&d=${d}&t=${t}`;
    }
  },
  mounted() {
    // Load localStorage
    const json = window.localStorage.getItem("counters");
    if (json) {
      const savedCounters = JSON.parse(json);
      if (savedCounters && Array.isArray(savedCounters)) {
        //console.log("Loading savedCounters", savedCounters);
        savedCounters.forEach(sc => (sc.target = dayjs(sc.target)));
        this.counters = savedCounters;
      }
    }

    // Load URL
    //?n=Dan&u=1&d=1&t=2022-01-01
    const params = new URLSearchParams(location.search);
    const name = params.get("n");
    const units = params.get("u");
    const dir = params.get("d");
    const target = params.get("t");
    const targetDayJs = dayjs(target);
    const existsWithNameAndDate = this.counters.find(
      c => c.name == name 
      && c.target.format(this.format) == targetDayJs.format(this.format)
    );
    
    if (
      name &&
      units &&
      dir &&
      targetDayJs.valueOf() !== NaN &&
      !existsWithNameAndDate
    ) {
      const counter = this.newCounter(name, units, dir, targetDayJs);
      //console.log("counter", counter);
      this.addCounter(counter);
    }
  },
  methods: {
    addCounter(aCounter) {
      this.counters.push(aCounter || this.newCounter());
      this.saveLocal();
    },
    newCounter(n, u, d, t) {
      return {
        name: n || "New Year",
        units: this.units[u || 0],
        direction: this.directions[d || 1],
        target: t || dayjs().endOf("year"),
        color: "green"
      };
    },
    getN(counter) {
      const today = dayjs();
      const unitStr = counter.units;
      return counter.direction === "since"
        ? today.diff(counter.target, unitStr)
        : counter.target.diff(today, unitStr);
    },
    getFormattedName(counter) { 
      const n = this.getN(counter);
      
    },
    setDate(counter, event) {
      console.log("setDate", counter, event.target.value);
      counter.target = dayjs(event.target.value);
    },
    share() {
      var vm = this;
      this.copied = false;
      this.showShare = !this.showShare;
      if (this.showShare) {
        try {
          navigator.clipboard.writeText(this.shareUrl).then(
            function() {
              vm.copied = true;
            },
            function() {
              vm.copied = false;
            }
          );
        } catch (e) {
          console.log("nocopy", e);
          vm.copied = false;
        }
      }
    },
    deleteCounter(counter) {
      const indexOf = this.counters.indexOf(counter);
      console.log("delete", indexOf);
      this.counters.splice(indexOf, 1);
      this.closeAndSave();
    },
    closeAndSave() {
      this.selectedCounter = null;
      this.showShare = false;
      this.saveLocal();
    },
    saveLocal() {
      const json = JSON.stringify(this.counters);
      window.localStorage.setItem("counters", json);
    }
  }
});

export default {
  data() {
    return {
      pageLoader_dataLoaded: false,
    };
  },
  methods: {
    pageLoader_resolveData() {
      this.pageLoader_dataLoaded = true;
    },
  },
};

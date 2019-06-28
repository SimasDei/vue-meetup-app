const customPlugin = {
  install(Vue) {
    Vue.myGlobalMethod = function() {
      alert('Plugin Altetarino');
    };
    Vue.myCustomProperty = 'Custrom properterino';

    Vue.directive('blue-color', {
      bind(el) {
        el.style.color = 'blue';
      },
    });

    Vue.mixin({
      data() {
        return {
          custom_message: 'Ahoy mr. Beaver o/',
        };
      },
      created() {},
      methods: {
        scream() {
          alert(this.custom_message);
        },
      },
    });

    Vue.prototype.$customMethod = function() {
      alert('Custom Instance Method via Vue.prototype');
    };
  },
};

export default customPlugin;

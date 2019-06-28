const customPlugin = {
  install(Vue, options) {
    Vue.myGlobalMethod = function() {
      alert('Plugin Altetarino');
    };
    Vue.myCusomProperty = 'Custrom properterino';

    Vue.directive('blue-color', {
      bind(el, binding) {
        el.style.color = 'blue';
      },
    });

    Vue.mixin({
      data() {
        return {
          custom_message: 'Ahoy mr. Beaver o/',
        };
      },
      created() {
        console.log('Custom Mixin inside Custom Plugin!');
      },
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

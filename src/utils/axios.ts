const VueAxios = {
  vm: {},
  installed: false,
  install(Vue: { axios: any; prototype: any; }, instance: any) {
    if (this.installed) {
      return;
    }
    this.installed = true;

    if (!instance) {
      // eslint-disable-next-line no-console
      console.error('You have to install axios');
      return;
    }

    // eslint-disable-next-line no-param-reassign
    Vue.axios = instance;

    Object.defineProperties(Vue.prototype, {
      axios: {
        get: function get() {
          return instance;
        }
      },
      $http: {
        get: function get() {
          return instance;
        }
      }
    });
  }
};

export { VueAxios };

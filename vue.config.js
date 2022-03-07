module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/assets/scss/soft-ui-dashboard/bootstrap/functions";
        @import "@/assets/scss/soft-ui-dashboard/variables";
        `
      }
    }
  }
};

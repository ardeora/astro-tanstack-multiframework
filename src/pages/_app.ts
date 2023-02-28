import type { App } from "vue";
import { VueQueryPlugin, VueQueryPluginOptions } from "@tanstack/vue-query";
import { client } from "../utils";

const cache = client.getQueryCache();

const options: VueQueryPluginOptions = {
  queryClientConfig: {
    queryCache: cache,
  },
};

export default (app: App) => {
  app.use(VueQueryPlugin, options);
};

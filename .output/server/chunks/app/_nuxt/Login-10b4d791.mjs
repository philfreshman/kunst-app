import { e as useSupabaseClient, f as useSupabaseUser, g as useRouter } from '../server.mjs';
import { defineComponent, watchEffect, useSSRContext } from 'vue';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@supabase/supabase-js';
import 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Login",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const user = useSupabaseUser();
    const router = useRouter();
    watchEffect(() => {
      console.log(user.value);
      if (user.value) {
        router.push("/tasks");
      }
      if (user.value == null) {
        router.push("/login");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><button><h1>Login</h1></button><button><h1>Logout</h1></button><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/old/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Login-10b4d791.mjs.map

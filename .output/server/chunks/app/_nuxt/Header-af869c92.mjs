import { E as ElMenu, a as ElSubMenu, b as ElMenuItem } from './el-menu-item-c243b345.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import ToggleButton from './ToggleButton-8d3c411c.mjs';
import _sfc_main$1 from './Logo-b989c5d5.mjs';
import '@vueuse/core';
import 'lodash-unified';
import './base-45cc502a.mjs';
import '../server.mjs';
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
import '@vue/shared';
import '@popperjs/core';
import '@ctrl/tinycolor';
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  props: {
    blank: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_menu = ElMenu;
      const _component_el_sub_menu = ElSubMenu;
      const _component_el_menu_item = ElMenuItem;
      _push(ssrRenderComponent(_component_el_menu, mergeProps({
        mode: "horizontal",
        ellipsis: false
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!props.blank) {
              _push2(`<div style="${ssrRenderStyle({ "width": "100px" })}"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            if (!props.blank) {
              _push2(ssrRenderComponent(_component_el_sub_menu, { index: "1" }, {
                title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Menu`);
                  } else {
                    return [
                      createTextVNode("Menu")
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_el_menu_item, { index: "1-1" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Logout`);
                        } else {
                          return [
                            createTextVNode("Logout")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_menu_item, { index: "1-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Register`);
                        } else {
                          return [
                            createTextVNode("Register")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_el_menu_item, { index: "1-3" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(ToggleButton, null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(ToggleButton)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_el_menu_item, { index: "1-1" }, {
                        default: withCtx(() => [
                          createTextVNode("Logout")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_menu_item, { index: "1-2" }, {
                        default: withCtx(() => [
                          createTextVNode("Register")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_menu_item, { index: "1-3" }, {
                        default: withCtx(() => [
                          createVNode(ToggleButton)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !props.blank ? (openBlock(), createBlock("div", {
                key: 0,
                style: { "width": "100px" }
              })) : createCommentVNode("", true),
              createVNode(_sfc_main$1),
              !props.blank ? (openBlock(), createBlock(_component_el_sub_menu, {
                key: 1,
                index: "1"
              }, {
                title: withCtx(() => [
                  createTextVNode("Menu")
                ]),
                default: withCtx(() => [
                  createVNode(_component_el_menu_item, { index: "1-1" }, {
                    default: withCtx(() => [
                      createTextVNode("Logout")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_menu_item, { index: "1-2" }, {
                    default: withCtx(() => [
                      createTextVNode("Register")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_menu_item, { index: "1-3" }, {
                    default: withCtx(() => [
                      createVNode(ToggleButton)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/Header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Header-af869c92.mjs.map

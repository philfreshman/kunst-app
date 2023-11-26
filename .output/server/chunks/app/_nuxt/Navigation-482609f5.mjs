import { defineComponent, computed, provide, openBlock, createBlock, resolveDynamicComponent, normalizeClass, unref, normalizeStyle, withCtx, renderSlot, inject, useSSRContext, ref, watch, withAsyncContext, mergeProps, createVNode } from 'vue';
import { a as buildProps, w as withInstall, d as definePropType, o as mutable, k as isNumber, _ as _export_sfc$1 } from './base-45cc502a.mjs';
import { u as useNamespace, _ as _export_sfc } from '../server.mjs';
import { isObject } from '@vue/shared';
import { E as ElMenu, b as ElMenuItem } from './el-menu-item-c243b345.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-fb4ffa5b.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import 'lodash-unified';
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
import '@vueuse/core';
import '@popperjs/core';
import '@ctrl/tinycolor';

const rowContextKey = Symbol("rowContextKey");
const RowJustify = [
  "start",
  "center",
  "end",
  "space-around",
  "space-between",
  "space-evenly"
];
const RowAlign = ["top", "middle", "bottom"];
const rowProps = buildProps({
  tag: {
    type: String,
    default: "div"
  },
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String,
    values: RowJustify,
    default: "start"
  },
  align: {
    type: String,
    values: RowAlign
  }
});
const __default__$1 = defineComponent({
  name: "ElRow"
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: rowProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("row");
    const gutter = computed(() => props.gutter);
    provide(rowContextKey, {
      gutter
    });
    const style = computed(() => {
      const styles = {};
      if (!props.gutter) {
        return styles;
      }
      styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
      return styles;
    });
    const rowKls = computed(() => [
      ns.b(),
      ns.is(`justify-${props.justify}`, props.justify !== "start"),
      ns.is(`align-${props.align}`, !!props.align)
    ]);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
        class: normalizeClass(unref(rowKls)),
        style: normalizeStyle(unref(style))
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class", "style"]);
    };
  }
});
var Row = /* @__PURE__ */ _export_sfc$1(_sfc_main$3, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/row/src/row.vue"]]);
const ElRow = withInstall(Row);
const colProps = buildProps({
  tag: {
    type: String,
    default: "div"
  },
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  },
  pull: {
    type: Number,
    default: 0
  },
  push: {
    type: Number,
    default: 0
  },
  xs: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  sm: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  md: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  lg: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  },
  xl: {
    type: definePropType([Number, Object]),
    default: () => mutable({})
  }
});
const __default__ = defineComponent({
  name: "ElCol"
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: colProps,
  setup(__props) {
    const props = __props;
    const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) });
    const ns = useNamespace("col");
    const style = computed(() => {
      const styles = {};
      if (gutter.value) {
        styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`;
      }
      return styles;
    });
    const colKls = computed(() => {
      const classes = [];
      const pos = ["span", "offset", "pull", "push"];
      pos.forEach((prop) => {
        const size = props[prop];
        if (isNumber(size)) {
          if (prop === "span")
            classes.push(ns.b(`${props[prop]}`));
          else if (size > 0)
            classes.push(ns.b(`${prop}-${props[prop]}`));
        }
      });
      const sizes = ["xs", "sm", "md", "lg", "xl"];
      sizes.forEach((size) => {
        if (isNumber(props[size])) {
          classes.push(ns.b(`${size}-${props[size]}`));
        } else if (isObject(props[size])) {
          Object.entries(props[size]).forEach(([prop, sizeProp]) => {
            classes.push(prop !== "span" ? ns.b(`${size}-${prop}-${sizeProp}`) : ns.b(`${size}-${sizeProp}`));
          });
        }
      });
      if (gutter.value) {
        classes.push(ns.is("guttered"));
      }
      return [ns.b(), classes];
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
        class: normalizeClass(unref(colKls)),
        style: normalizeStyle(unref(style))
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class", "style"]);
    };
  }
});
var Col = /* @__PURE__ */ _export_sfc$1(_sfc_main$2, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/col/src/col.vue"]]);
const ElCol = withInstall(Col);
const cache = /* @__PURE__ */ new Map();
async function importIcon(value) {
  if (!value) {
    return "";
  }
  if (cache.has(value)) {
    return cache.get(value);
  }
  const { [value]: icon } = await import('@mdi/js');
  cache.set(value, icon);
  return icon;
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MdiIcon",
  __ssrInlineRender: true,
  props: {
    size: { default: "24" },
    viewBox: { default: "0 0 24 24" },
    flipX: { type: Boolean, default: false },
    flipY: { type: Boolean, default: false },
    icon: {}
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const path = ref("");
    const styles = computed(() => ({
      "--flip-x": props.flipX ? "-1" : "1",
      "--flip-y": props.flipY ? "-1" : "1"
    }));
    async function updateIcon() {
      path.value = await importIcon(props.icon);
    }
    watch(async () => props.icon, ([__temp, __restore] = withAsyncContext(() => updateIcon), __temp = await __temp, __restore(), __temp));
    [__temp, __restore] = withAsyncContext(() => updateIcon()), await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        width: _ctx.size,
        height: _ctx.size,
        viewbox: _ctx.viewBox,
        style: styles.value
      }, _attrs))} data-v-3b252a76><path${ssrRenderAttr("d", path.value)} data-v-3b252a76></path></svg>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt-mdi/dist/runtime/components/MdiIcon.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3b252a76"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_el_row = ElRow;
  const _component_el_col = ElCol;
  const _component_el_menu = ElMenu;
  const _component_NuxtLink = __nuxt_component_0;
  const _component_el_menu_item = ElMenuItem;
  const _component_MdiIcon = __nuxt_component_5;
  _push(ssrRenderComponent(_component_el_row, mergeProps({ class: "tac h-full" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_el_col, { class: "h-full" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_el_menu, { class: "h-full" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="h-4" data-v-80c8cde1${_scopeId3}></div>`);
                    _push4(ssrRenderComponent(_component_NuxtLink, { to: "/artists" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_el_menu_item, { index: "3" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_MdiIcon, {
                                  class: "iconSize",
                                  icon: "mdiAlienOutline"
                                }, null, _parent6, _scopeId5));
                                _push6(`<span data-v-80c8cde1${_scopeId5}>K\xFCnstler</span>`);
                              } else {
                                return [
                                  createVNode(_component_MdiIcon, {
                                    class: "iconSize",
                                    icon: "mdiAlienOutline"
                                  }),
                                  createVNode("span", null, "K\xFCnstler")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_el_menu_item, { index: "3" }, {
                              default: withCtx(() => [
                                createVNode(_component_MdiIcon, {
                                  class: "iconSize",
                                  icon: "mdiAlienOutline"
                                }),
                                createVNode("span", null, "K\xFCnstler")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_NuxtLink, { to: "/orders" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_el_menu_item, { index: "2" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_MdiIcon, {
                                  class: "iconSize",
                                  icon: "mdiCartOutline"
                                }, null, _parent6, _scopeId5));
                                _push6(`<span data-v-80c8cde1${_scopeId5}>Bestellungen</span>`);
                              } else {
                                return [
                                  createVNode(_component_MdiIcon, {
                                    class: "iconSize",
                                    icon: "mdiCartOutline"
                                  }),
                                  createVNode("span", null, "Bestellungen")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_el_menu_item, { index: "2" }, {
                              default: withCtx(() => [
                                createVNode(_component_MdiIcon, {
                                  class: "iconSize",
                                  icon: "mdiCartOutline"
                                }),
                                createVNode("span", null, "Bestellungen")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_NuxtLink, { to: "/offers" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_el_menu_item, { index: "1" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_MdiIcon, {
                                  class: "iconSize",
                                  icon: "mdiBomb"
                                }, null, _parent6, _scopeId5));
                                _push6(`<span data-v-80c8cde1${_scopeId5}>Angebote</span>`);
                              } else {
                                return [
                                  createVNode(_component_MdiIcon, {
                                    class: "iconSize",
                                    icon: "mdiBomb"
                                  }),
                                  createVNode("span", null, "Angebote")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_el_menu_item, { index: "1" }, {
                              default: withCtx(() => [
                                createVNode(_component_MdiIcon, {
                                  class: "iconSize",
                                  icon: "mdiBomb"
                                }),
                                createVNode("span", null, "Angebote")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_NuxtLink, { to: "/invoices" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_el_menu_item, { index: "4" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_MdiIcon, {
                                  class: "iconSize",
                                  icon: "mdiReceiptTextOutline"
                                }, null, _parent6, _scopeId5));
                                _push6(`<span data-v-80c8cde1${_scopeId5}>Rechnungen</span>`);
                              } else {
                                return [
                                  createVNode(_component_MdiIcon, {
                                    class: "iconSize",
                                    icon: "mdiReceiptTextOutline"
                                  }),
                                  createVNode("span", null, "Rechnungen")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_el_menu_item, { index: "4" }, {
                              default: withCtx(() => [
                                createVNode(_component_MdiIcon, {
                                  class: "iconSize",
                                  icon: "mdiReceiptTextOutline"
                                }),
                                createVNode("span", null, "Rechnungen")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_NuxtLink, { to: "/Settings" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_el_menu_item, { index: "5" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_MdiIcon, {
                                  class: "iconSize",
                                  icon: "mdiCogOutline"
                                }, null, _parent6, _scopeId5));
                                _push6(`<span data-v-80c8cde1${_scopeId5}>Einstellungen</span>`);
                              } else {
                                return [
                                  createVNode(_component_MdiIcon, {
                                    class: "iconSize",
                                    icon: "mdiCogOutline"
                                  }),
                                  createVNode("span", null, "Einstellungen")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_el_menu_item, { index: "5" }, {
                              default: withCtx(() => [
                                createVNode(_component_MdiIcon, {
                                  class: "iconSize",
                                  icon: "mdiCogOutline"
                                }),
                                createVNode("span", null, "Einstellungen")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode("div", { class: "h-4" }),
                      createVNode(_component_NuxtLink, { to: "/artists" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_menu_item, { index: "3" }, {
                            default: withCtx(() => [
                              createVNode(_component_MdiIcon, {
                                class: "iconSize",
                                icon: "mdiAlienOutline"
                              }),
                              createVNode("span", null, "K\xFCnstler")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtLink, { to: "/orders" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_menu_item, { index: "2" }, {
                            default: withCtx(() => [
                              createVNode(_component_MdiIcon, {
                                class: "iconSize",
                                icon: "mdiCartOutline"
                              }),
                              createVNode("span", null, "Bestellungen")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtLink, { to: "/offers" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_menu_item, { index: "1" }, {
                            default: withCtx(() => [
                              createVNode(_component_MdiIcon, {
                                class: "iconSize",
                                icon: "mdiBomb"
                              }),
                              createVNode("span", null, "Angebote")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtLink, { to: "/invoices" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_menu_item, { index: "4" }, {
                            default: withCtx(() => [
                              createVNode(_component_MdiIcon, {
                                class: "iconSize",
                                icon: "mdiReceiptTextOutline"
                              }),
                              createVNode("span", null, "Rechnungen")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtLink, { to: "/Settings" }, {
                        default: withCtx(() => [
                          createVNode(_component_el_menu_item, { index: "5" }, {
                            default: withCtx(() => [
                              createVNode(_component_MdiIcon, {
                                class: "iconSize",
                                icon: "mdiCogOutline"
                              }),
                              createVNode("span", null, "Einstellungen")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_el_menu, { class: "h-full" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "h-4" }),
                    createVNode(_component_NuxtLink, { to: "/artists" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_menu_item, { index: "3" }, {
                          default: withCtx(() => [
                            createVNode(_component_MdiIcon, {
                              class: "iconSize",
                              icon: "mdiAlienOutline"
                            }),
                            createVNode("span", null, "K\xFCnstler")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtLink, { to: "/orders" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_menu_item, { index: "2" }, {
                          default: withCtx(() => [
                            createVNode(_component_MdiIcon, {
                              class: "iconSize",
                              icon: "mdiCartOutline"
                            }),
                            createVNode("span", null, "Bestellungen")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtLink, { to: "/offers" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_menu_item, { index: "1" }, {
                          default: withCtx(() => [
                            createVNode(_component_MdiIcon, {
                              class: "iconSize",
                              icon: "mdiBomb"
                            }),
                            createVNode("span", null, "Angebote")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtLink, { to: "/invoices" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_menu_item, { index: "4" }, {
                          default: withCtx(() => [
                            createVNode(_component_MdiIcon, {
                              class: "iconSize",
                              icon: "mdiReceiptTextOutline"
                            }),
                            createVNode("span", null, "Rechnungen")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtLink, { to: "/Settings" }, {
                      default: withCtx(() => [
                        createVNode(_component_el_menu_item, { index: "5" }, {
                          default: withCtx(() => [
                            createVNode(_component_MdiIcon, {
                              class: "iconSize",
                              icon: "mdiCogOutline"
                            }),
                            createVNode("span", null, "Einstellungen")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_el_col, { class: "h-full" }, {
            default: withCtx(() => [
              createVNode(_component_el_menu, { class: "h-full" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "h-4" }),
                  createVNode(_component_NuxtLink, { to: "/artists" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_menu_item, { index: "3" }, {
                        default: withCtx(() => [
                          createVNode(_component_MdiIcon, {
                            class: "iconSize",
                            icon: "mdiAlienOutline"
                          }),
                          createVNode("span", null, "K\xFCnstler")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtLink, { to: "/orders" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_menu_item, { index: "2" }, {
                        default: withCtx(() => [
                          createVNode(_component_MdiIcon, {
                            class: "iconSize",
                            icon: "mdiCartOutline"
                          }),
                          createVNode("span", null, "Bestellungen")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtLink, { to: "/offers" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_menu_item, { index: "1" }, {
                        default: withCtx(() => [
                          createVNode(_component_MdiIcon, {
                            class: "iconSize",
                            icon: "mdiBomb"
                          }),
                          createVNode("span", null, "Angebote")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtLink, { to: "/invoices" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_menu_item, { index: "4" }, {
                        default: withCtx(() => [
                          createVNode(_component_MdiIcon, {
                            class: "iconSize",
                            icon: "mdiReceiptTextOutline"
                          }),
                          createVNode("span", null, "Rechnungen")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtLink, { to: "/Settings" }, {
                    default: withCtx(() => [
                      createVNode(_component_el_menu_item, { index: "5" }, {
                        default: withCtx(() => [
                          createVNode(_component_MdiIcon, {
                            class: "iconSize",
                            icon: "mdiCogOutline"
                          }),
                          createVNode("span", null, "Einstellungen")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/Navigation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Navigation = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-80c8cde1"]]);

export { Navigation as default };
//# sourceMappingURL=Navigation-482609f5.mjs.map

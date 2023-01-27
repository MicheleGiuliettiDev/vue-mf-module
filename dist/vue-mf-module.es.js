var G = Object.defineProperty;
var U = (n, e, t) => e in n ? G(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var l = (n, e, t) => (U(n, typeof e != "symbol" ? e + "" : e, t), t);
import { defineComponent as T, computed as C, getCurrentInstance as L, ref as V, onMounted as X } from "vue";
var k = { exports: {} };
function S() {
}
S.prototype = {
  on: function(n, e, t) {
    var r = this.e || (this.e = {});
    return (r[n] || (r[n] = [])).push({
      fn: e,
      ctx: t
    }), this;
  },
  once: function(n, e, t) {
    var r = this;
    function i() {
      r.off(n, i), e.apply(t, arguments);
    }
    return i._ = e, this.on(n, i, t);
  },
  emit: function(n) {
    var e = [].slice.call(arguments, 1), t = ((this.e || (this.e = {}))[n] || []).slice(), r = 0, i = t.length;
    for (r; r < i; r++)
      t[r].fn.apply(t[r].ctx, e);
    return this;
  },
  off: function(n, e) {
    var t = this.e || (this.e = {}), r = t[n], i = [];
    if (r && e)
      for (var s = 0, u = r.length; s < u; s++)
        r[s].fn !== e && r[s].fn._ !== e && i.push(r[s]);
    return i.length ? t[n] = i : delete t[n], this;
  }
};
k.exports = S;
var A = k.exports.TinyEmitter = S, D = /* @__PURE__ */ ((n) => (n[n.drawer = 0] = "drawer", n[n.bottom = 1] = "bottom", n[n.header = 2] = "header", n))(D || {});
const E = {
  menuDefinitionAdded: "newmenuitem"
}, y = class {
  constructor() {
    l(this, "menuDefinitions", []);
    l(this, "menuStructure", {});
    l(this, "notifications", new A());
  }
  get Notifications() {
    return this.notifications;
  }
  static get Instance() {
    return y.instance;
  }
  addMenuDefinition(e, ...t) {
    let r = this.menuDefinitions.find((i) => i.name == e.name);
    r ? e = r : this.menuDefinitions.push(e);
    for (const i of t)
      this.menuStructure[i.section] = this.menuStructure[i.section] || {}, this.menuStructure[i.section][i.parent || e.name] = this.menuStructure[i.section][i.parent || e.name] || [], i.parent && this.menuStructure[i.section][i.parent].push(e.name);
    this.notifications.emit(E.menuDefinitionAdded, e);
  }
  getMenuItem(e) {
    return this.menuDefinitions.find((t) => t.name == e);
  }
  getMenu(e) {
    let t = [], r = /* @__PURE__ */ new Set();
    for (const i in this.menuStructure[e]) {
      const s = this.menuStructure[e][i];
      let u = {
        item: this.menuDefinitions.find((o) => o.name == i && (!o.hidden || !o.hidden())),
        children: s.map((o) => this.menuDefinitions.find((a) => a.name == o && (!a.hidden || !a.hidden()))).filter((o) => !!o).sort((o, a) => o && a && o.orderIndex && a.orderIndex && o.orderIndex > a.orderIndex ? 1 : o && a && o.orderIndex && a.orderIndex && o.orderIndex < a.orderIndex ? -1 : 0)
      };
      u.item && (r.add(i), s.forEach((o) => r.add(o)), t.push(u));
    }
    return t.filter((i) => !!i.item).sort((i, s) => i && s && i.item && s.item && i.item.orderIndex && s.item.orderIndex && i.item.orderIndex > s.item.orderIndex ? 1 : i && s && i.item && s.item && i.item.orderIndex && s.item.orderIndex && i.item.orderIndex < s.item.orderIndex ? -1 : 0);
  }
};
let g = y;
l(g, "instance", new y());
const M = class {
  constructor() {
    l(this, "registry", /* @__PURE__ */ new Map());
    l(this, "groupedregistry", /* @__PURE__ */ new Map());
    l(this, "serviceregistry", /* @__PURE__ */ new Map());
    l(this, "groupedserviceregistry", /* @__PURE__ */ new Map());
  }
  static get Instance() {
    return this.instance;
  }
  static set Instance(e) {
    this.instance = e;
  }
  provideComponent(e, t, r) {
    if (this.registry.set(r ? `${r}-${t}` : t, e), r) {
      this.groupedregistry.has(r) || this.groupedregistry.set(r, /* @__PURE__ */ new Map());
      let i = this.groupedregistry.get(r);
      i && i.set(t, e);
    }
  }
  getComponent(e, t) {
    return this.registry.get(t ? `${t}-${e}` : e) || null;
  }
  getComponents(...e) {
    return Array.from(this.registry.entries()).filter((t) => e.indexOf(t[0]) >= 0).map((t) => t[1]);
  }
  getGroupComponents(e, ...t) {
    let r = this.groupedregistry.get(e);
    return r ? Array.from(r.entries() || []).filter((i) => !t || t.length == 0 || t.indexOf(i[0]) >= 0).map((i) => i[1]) : [];
  }
  getGroupComponentsKeys(e) {
    let t = this.groupedregistry.get(e);
    return t ? Array.from(t.keys()) : [];
  }
  provideService(e, t, r) {
    if (this.serviceregistry.set(e, t), r) {
      this.groupedserviceregistry.has(r) || this.groupedserviceregistry.set(r, /* @__PURE__ */ new Map());
      let i = this.groupedserviceregistry.get(r);
      i && i.set(e, t);
    }
  }
  getService(e) {
    return this.serviceregistry.get(e) || null;
  }
  getGroupServices(e, ...t) {
    let r = this.groupedserviceregistry.get(e);
    return r ? Array.from(r.entries() || []).filter((i) => !t || t.length == 0 || t.indexOf(i[0]) >= 0).map((i) => i[1]) : [];
  }
};
let f = M;
l(f, "instance", new M());
const I = class {
  constructor() {
    l(this, "notifier", new A());
  }
  static get Instance() {
    return I.instance;
  }
  static set Instance(e) {
    this.instance = e;
  }
  send(e, ...t) {
    this.notifier.emit(e, ...t);
  }
  subscribe(e, t, r) {
    this.notifier.on(e, t, r);
  }
  once(e, t, r) {
    this.notifier.once(e, t, r);
  }
  unsubscribe(e, t) {
    this.notifier.off(e, t);
  }
  ask(e, ...t) {
    return new Promise((r, i) => {
      this.notifier.emit(`$ask-${e}`, {
        resolve: r,
        reject: i,
        args: t
      });
    });
  }
  reply(e, t) {
    this.notifier.on(`$ask-${e}`, (r) => {
      try {
        let i = t(...r.args);
        r.resolve(i);
      } catch {
        r.reject();
      }
    });
  }
};
let m = I;
l(m, "instance", new I());
const z = T({
  name: "inject",
  props: {
    id: { default: null },
    type: { default: null, type: String },
    value: { default: null },
    name: { type: String, default: null },
    names: { type: Array, default: null },
    group: { type: String, default: null },
    metadata: { type: Object, default: null },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 }
  },
  setup(n, { emit: e }) {
    const t = C({
      get: () => n.value,
      set: (u) => {
        e("input", u);
      }
    }), r = C(() => n.name ? [f.Instance.getComponent(n.name, n.group)] : n.group ? f.Instance.getGroupComponents(n.group, ...n.names || []) : f.Instance.getComponents(...n.names || [])), i = (...u) => {
      e("click", ...u);
    }, s = (...u) => {
      e("save", ...u);
    };
    return {
      id: n.id,
      type: n.type,
      value: n.value,
      name: n.name,
      names: n.names,
      group: n.group,
      metadata: n.metadata,
      disabled: n.disabled,
      readonly: n.readonly,
      click: i,
      save: s,
      Components: r,
      Value: t
    };
  }
});
function R(n, e, t, r, i, s, u, o) {
  var a = typeof n == "function" ? n.options : n;
  e && (a.render = e, a.staticRenderFns = t, a._compiled = !0), r && (a.functional = !0), s && (a._scopeId = "data-v-" + s);
  var c;
  if (u ? (c = function(d) {
    d = d || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !d && typeof __VUE_SSR_CONTEXT__ < "u" && (d = __VUE_SSR_CONTEXT__), i && i.call(this, d), d && d._registeredComponents && d._registeredComponents.add(u);
  }, a._ssrRegister = c) : i && (c = o ? function() {
    i.call(
      this,
      (a.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), c)
    if (a.functional) {
      a._injectStyles = c;
      var j = a.render;
      a.render = function(F, $) {
        return c.call($), j(F, $);
      };
    } else {
      var x = a.beforeCreate;
      a.beforeCreate = x ? [].concat(x, c) : [c];
    }
  return {
    exports: n,
    options: a
  };
}
var B = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("div", e._l(e.Components, function(r, i) {
    return t(r, { key: i, tag: "component", attrs: { disabled: e.disabled, readonly: e.readonly, id: e.id, type: e.type, metadata: e.metadata }, on: { click: e.click, save: e.save }, model: { value: e.Value, callback: function(s) {
      e.Value = s;
    }, expression: "Value" } });
  }), 1);
}, K = [], W = /* @__PURE__ */ R(
  z,
  B,
  K,
  !1,
  null,
  null,
  null,
  null
);
const N = W.exports, _ = class {
  constructor() {
    l(this, "screens", /* @__PURE__ */ new Map());
    l(this, "projecting", /* @__PURE__ */ new Map());
  }
  static get Instance() {
    return _.instance;
  }
  static set Instance(e) {
    this.instance = e;
  }
  setScreen(e, t = "defaultscreen") {
    this.screens.set(t, e);
  }
  projectTo(e, t = null, r = "defaultscreen", i = !0, s = !1) {
    var u = { data: t };
    let o = s ? new Promise((c, j) => {
      u.reject = j, u.resolve = c;
    }) : null;
    i ? (this.projecting.has(r) || this.projecting.set(r, []), (this.projecting.get(r) || []).push({ component: e, model: u, promise: o, queue: i })) : this.projecting.set(r, [{ component: e, model: u, promise: o, queue: i }]);
    let a = this.screens.get(r);
    return a ? (a.model.value = u, a.currentView.value = e, o && o.then(() => this.stopProjecting(r)).catch(() => this.stopProjecting(r)), o) : null;
  }
  projectAsyncTo(e, t, r = "defaultscreen", i = !0) {
    return this.projectTo(e, t, r, i, !0);
  }
  stopProjecting(e = "defaultscreen") {
    this.projecting.has(e) && (this.projecting.get(e) || []).pop();
    let t = this.screens.get(e);
    if (t && t.currentView) {
      if (t.model.value = null, t.screenModel.value = null, this.projecting.has(e)) {
        let r = this.projecting.get(e);
        if (r && r.length) {
          let i = r.pop();
          i && this.projectTo(i.component, i.model, e, i.queue, !!i.promise);
        }
      }
      return !0;
    }
    return !1;
  }
};
let v = _;
l(v, "instance", new _());
const J = T({
  name: "screen",
  props: {
    name: { type: String, default: "defaultscreen" }
  },
  setup(n, { expose: e }) {
    const t = L(), r = V(null), i = V(null);
    e({ currentView: r, model: i });
    const s = C(() => r.value != null);
    return X(() => {
      v.Instance.setScreen(t, n.name);
    }), {
      currentView: r,
      model: i,
      isVisible: s
    };
  }
});
var Q = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("div", { directives: [{ name: "show", rawName: "v-show", value: e.isVisible, expression: "isVisible" }] }, [e.currentView ? t(e.currentView, { key: e.model, tag: "component", attrs: { value: e.model } }) : e._e()], 1);
}, Y = [], Z = /* @__PURE__ */ R(
  J,
  Q,
  Y,
  !1,
  null,
  null,
  null,
  null
);
const O = Z.exports, q = {
  inserted: (n, e) => {
    h.Instance.injectTo(n, e.arg);
  },
  unbind: (n, e) => {
    h.Instance.removeFrom(n, e.arg);
  }
}, H = {
  bind: (n, e) => {
    !n || h.Instance.setScreen(n, e.arg);
  }
}, b = {
  projectToDirective: q,
  screenDirective: H
}, w = class {
  constructor() {
    l(this, "screens", /* @__PURE__ */ new Map());
  }
  static get Instance() {
    return w.instance;
  }
  static set Instance(e) {
    this.instance = e;
  }
  injectTo(e, t) {
    if (!(!e || !t)) {
      var r = this.screens.has(t) ? this.screens.get(t) : null;
      try {
        e.parentElement && e.removeChild(e);
      } catch {
      }
      r && r.append(e);
    }
  }
  removeFrom(e, t) {
    if (!(!e || !t)) {
      var r = this.screens.has(t) ? this.screens.get(t) : null;
      try {
        r && r.removeChild(e);
      } catch {
      }
    }
  }
  setScreen(e, t = "defaultscreen") {
    this.screens.set(t, e);
  }
};
let h = w;
l(h, "instance", new w());
function p(n, e) {
  if (n.target.validity) {
    let t = n.target;
    if (t.validity) {
      let r = [
        t.validity.badInput ? "bad input" : null,
        t.validity.customError ? "custom error" : null,
        t.validity.patternMismatch ? "pattern mismatch" : null,
        t.validity.rangeOverflow ? "range overflow" : null,
        t.validity.rangeUnderflow ? "range underflow" : null,
        t.validity.stepMismatch ? "step mismatch" : null,
        t.validity.tooLong ? "too long" : null,
        t.validity.tooShort ? "too short" : null,
        t.validity.typeMismatch ? "type mismatch" : null,
        t.validity.valueMissing ? "value missing" : null
      ].filter((i) => !!i);
      e(r, t.validity.valid != null ? t.validity.valid : !0);
    }
  }
}
const P = {
  inserted: (n, e) => {
    if (!(!n || !n.willValidate)) {
      switch (n.nodeName) {
        case "INPUT":
        case "TEXTAREA":
          n.onblur = (t) => p(t, e.value);
          break;
        case "SELECT":
          n.onchange = (t) => p(t, e.value);
          break;
      }
      n.oninvalid = (t) => p(t, e.value), n.form && n.form.addEventListener("invalid", () => p({ target: n }, e.value)), e.arg == "immediate" ? n.reportValidity() : p({ target: n }, e.value);
    }
  },
  unbind: (n) => {
  }
};
function ee(n) {
  console.debug("installing vue mf module"), n.component("screen", O), n.component("inject", N), n.directive("screen", b.screenDirective), n.directive("projectTo", b.projectToDirective), n.directive("validate", P);
}
function ie(n) {
  let e = {};
  return {
    init(t, r, i, s) {
      return s.registry && (f.Instance = s.registry), s.messageService && (m.Instance = s.messageService), s.projector && (v.Instance = s.projector), s.screens && (h.Instance = s.screens), e = i, n.init(te, t, r, i);
    },
    config(t, r) {
      return n.config ? n.config(t, r, e) : null;
    },
    run(t, r) {
      return n.run ? n.run(t, r, e) : null;
    },
    routes: n.routes
  };
}
function se(n, e, t) {
  const r = n.default.default || n.default;
  return r.init(
    g.Instance,
    e,
    t || {},
    {
      registry: f.Instance,
      messageService: m.Instance,
      projector: v.Instance,
      screens: h.Instance
    }
  ).then(() => r);
}
function ae(n, e) {
  return (n.default.default || n.default).config(g.Instance, e);
}
function oe(n, e) {
  return (n.default.default || n.default).run(g.Instance, e);
}
function ue(n) {
  return (n.default.default || n.default).routes;
}
const te = {
  install: ee,
  MenuHelper: new g(),
  menuType: D,
  CommonRegistry: new f(),
  MessageService: new m(),
  Inject: N,
  Screen: O,
  ValidateDirective: P,
  MenuNotifications: E,
  Projector: v
};
export {
  f as CommonRegistry,
  ae as ConfigModule,
  se as InitModule,
  N as Inject,
  g as MenuHelper,
  E as MenuNotifications,
  m as MessageService,
  ie as ModuleInitializer,
  ue as ModuleRoutes,
  v as Projector,
  oe as RunModule,
  O as Screen,
  P as ValidateDirective,
  te as default,
  D as menuType
};

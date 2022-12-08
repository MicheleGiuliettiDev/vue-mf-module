var G = Object.defineProperty;
var N = (n, e, t) => e in n ? G(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var o = (n, e, t) => (N(n, typeof e != "symbol" ? e + "" : e, t), t);
import { defineComponent as C, defineEmits as P, computed as w, getCurrentInstance as L, ref as S, onMounted as B } from "vue";
var k = { exports: {} };
function j() {
}
j.prototype = {
  on: function(n, e, t) {
    var i = this.e || (this.e = {});
    return (i[n] || (i[n] = [])).push({
      fn: e,
      ctx: t
    }), this;
  },
  once: function(n, e, t) {
    var i = this;
    function r() {
      i.off(n, r), e.apply(t, arguments);
    }
    return r._ = e, this.on(n, r, t);
  },
  emit: function(n) {
    var e = [].slice.call(arguments, 1), t = ((this.e || (this.e = {}))[n] || []).slice(), i = 0, r = t.length;
    for (i; i < r; i++)
      t[i].fn.apply(t[i].ctx, e);
    return this;
  },
  off: function(n, e) {
    var t = this.e || (this.e = {}), i = t[n], r = [];
    if (i && e)
      for (var s = 0, c = i.length; s < c; s++)
        i[s].fn !== e && i[s].fn._ !== e && r.push(i[s]);
    return r.length ? t[n] = r : delete t[n], this;
  }
};
k.exports = j;
var A = k.exports.TinyEmitter = j, b = /* @__PURE__ */ ((n) => (n[n.drawer = 0] = "drawer", n[n.bottom = 1] = "bottom", n[n.header = 2] = "header", n))(b || {});
const T = {
  menuDefinitionAdded: "newmenuitem"
}, m = class {
  constructor() {
    o(this, "menuDefinitions", []);
    o(this, "menuStructure", {});
    o(this, "notifications", new A());
  }
  get Notifications() {
    return this.notifications;
  }
  static get Instance() {
    return m.instance;
  }
  addMenuDefinition(e, ...t) {
    let i = this.menuDefinitions.find((r) => r.name == e.name);
    i ? e = i : this.menuDefinitions.push(e);
    for (const r of t)
      this.menuStructure[r.section] = this.menuStructure[r.section] || {}, this.menuStructure[r.section][r.parent || e.name] = this.menuStructure[r.section][r.parent || e.name] || [], r.parent && this.menuStructure[r.section][r.parent].push(e.name);
    this.notifications.emit(T.menuDefinitionAdded, e);
  }
  getMenuItem(e) {
    return this.menuDefinitions.find((t) => t.name == e);
  }
  getMenu(e) {
    let t = [], i = /* @__PURE__ */ new Set();
    for (const r in this.menuStructure[e]) {
      const s = this.menuStructure[e][r];
      let c = {
        item: this.menuDefinitions.find((a) => a.name == r && (!a.hidden || !a.hidden())),
        children: s.map((a) => this.menuDefinitions.find((u) => u.name == a && (!u.hidden || !u.hidden()))).filter((a) => !!a).sort((a, u) => a && u && a.orderIndex && u.orderIndex && a.orderIndex > u.orderIndex ? 1 : a && u && a.orderIndex && u.orderIndex && a.orderIndex < u.orderIndex ? -1 : 0)
      };
      c.item && (i.add(r), s.forEach((a) => i.add(a)), t.push(c));
    }
    return t.filter((r) => !!r.item).sort((r, s) => r && s && r.item && s.item && r.item.orderIndex && s.item.orderIndex && r.item.orderIndex > s.item.orderIndex ? 1 : r && s && r.item && s.item && r.item.orderIndex && s.item.orderIndex && r.item.orderIndex < s.item.orderIndex ? -1 : 0);
  }
};
let f = m;
o(f, "instance", new m());
const x = class {
  constructor() {
    o(this, "registry", /* @__PURE__ */ new Map());
    o(this, "groupedregistry", /* @__PURE__ */ new Map());
    o(this, "serviceregistry", /* @__PURE__ */ new Map());
    o(this, "groupedserviceregistry", /* @__PURE__ */ new Map());
  }
  static get Instance() {
    return this.instance;
  }
  static set Instance(e) {
    this.instance = e;
  }
  provideComponent(e, t, i) {
    if (this.registry.set(i ? `${i}-${t}` : t, e), i) {
      this.groupedregistry.has(i) || this.groupedregistry.set(i, /* @__PURE__ */ new Map());
      let r = this.groupedregistry.get(i);
      r && r.set(t, e);
    }
  }
  getComponent(e, t) {
    return this.registry.get(t ? `${t}-${e}` : e) || null;
  }
  getComponents(...e) {
    return Array.from(this.registry.entries()).filter((t) => e.indexOf(t[0]) >= 0).map((t) => t[1]);
  }
  getGroupComponents(e, ...t) {
    let i = this.groupedregistry.get(e);
    return i ? Array.from(i.entries() || []).filter((r) => !t || t.length == 0 || t.indexOf(r[0]) >= 0).map((r) => r[1]) : [];
  }
  getGroupComponentsKeys(e) {
    let t = this.groupedregistry.get(e);
    return t ? Array.from(t.keys()) : [];
  }
  provideService(e, t, i) {
    if (this.serviceregistry.set(e, t), i) {
      this.groupedserviceregistry.has(i) || this.groupedserviceregistry.set(i, /* @__PURE__ */ new Map());
      let r = this.groupedserviceregistry.get(i);
      r && r.set(e, t);
    }
  }
  getService(e) {
    return this.serviceregistry.get(e) || null;
  }
  getGroupServices(e, ...t) {
    let i = this.groupedserviceregistry.get(e);
    return i ? Array.from(i.entries() || []).filter((r) => !t || t.length == 0 || t.indexOf(r[0]) >= 0).map((r) => r[1]) : [];
  }
};
let l = x;
o(l, "instance", new x());
const p = class {
  constructor() {
    o(this, "notifier", new A());
  }
  static get Instance() {
    return p.instance;
  }
  static set Instance(e) {
    this.instance = e;
  }
  send(e, ...t) {
    this.notifier.emit(e, ...t);
  }
  subscribe(e, t, i) {
    this.notifier.on(e, t, i);
  }
  once(e, t, i) {
    this.notifier.once(e, t, i);
  }
  unsubscribe(e, t) {
    this.notifier.off(e, t);
  }
  ask(e, ...t) {
    return new Promise((i, r) => {
      this.notifier.emit(`$ask-${e}`, {
        resolve: i,
        reject: r,
        args: t
      });
    });
  }
  reply(e, t) {
    this.notifier.on(`$ask-${e}`, (i) => {
      try {
        let r = t(...i.args);
        i.resolve(r);
      } catch {
        i.reject();
      }
    });
  }
};
let h = p;
o(h, "instance", new p());
const V = C({
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
  template: '<div><component :is="c"  v-for="(c, idx) in Components" :disabled="disabled" :readonly="readonly" :key="idx" :id="id" :type="type" :metadata="metadata" v-model="Value" @click="click" @save="save" /></div>',
  setup(n) {
    const e = P(["input", "click", "save"]), t = w({
      get: () => n.value,
      set: (c) => {
        e("input", c);
      }
    }), i = w(() => n.name ? [l.Instance.getComponent(n.name, n.group)] : n.group ? l.Instance.getGroupComponents(n.group, ...n.names || []) : l.Instance.getComponents(...n.names || [])), r = (...c) => {
      e("click", ...c);
    }, s = (...c) => {
      e("save", ...c);
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
      click: r,
      save: s,
      Components: i,
      Value: t
    };
  }
}), y = class {
  constructor() {
    o(this, "screens", /* @__PURE__ */ new Map());
    o(this, "projecting", /* @__PURE__ */ new Map());
  }
  static get Instance() {
    return y.instance;
  }
  static set Instance(e) {
    this.instance = e;
  }
  setScreen(e, t = "defaultscreen") {
    this.screens.set(t, e);
  }
  projectTo(e, t = null, i = "defaultscreen", r = !0, s = !1) {
    var c = { data: t };
    let a = s ? new Promise(($, O) => {
      c.reject = O, c.resolve = $;
    }) : null;
    r ? (this.projecting.has(i) || this.projecting.set(i, []), (this.projecting.get(i) || []).push({ component: e, model: c, promise: a, queue: r })) : this.projecting.set(i, [{ component: e, model: c, promise: a, queue: r }]);
    let u = this.screens.get(i);
    return u ? (u.model.value = c, u.currentView.value = e, a && a.then(() => this.stopProjecting(i)).catch(() => this.stopProjecting(i)), a) : null;
  }
  projectAsyncTo(e, t, i = "defaultscreen", r = !0) {
    return this.projectTo(e, t, i, r, !0);
  }
  stopProjecting(e = "defaultscreen") {
    this.projecting.has(e) && (this.projecting.get(e) || []).pop();
    let t = this.screens.get(e);
    if (t && t.currentView) {
      if (t.model.value = null, t.screenModel.value = null, this.projecting.has(e)) {
        let i = this.projecting.get(e);
        if (i && i.length) {
          let r = i.pop();
          r && this.projectTo(r.component, r.model, e, r.queue, !!r.promise);
        }
      }
      return !0;
    }
    return !1;
  }
};
let g = y;
o(g, "instance", new y());
const E = C({
  name: "screen",
  props: {
    name: { type: String, default: "defaultscreen" }
  },
  template: '<div v-show="isVisible"><component v-if="currentView" v-bind:is="currentView" :value="model" :key="model"></component></div>',
  setup(n, { expose: e }) {
    const t = L(), i = S(null), r = S(null);
    e({ currentView: i, model: r });
    const s = w(() => i.value != null);
    return B(() => {
      g.Instance.setScreen(t, n.name);
    }), {
      currentView: i,
      model: r,
      isVisible: s
    };
  }
}), F = {
  inserted: (n, e) => {
    d.Instance.injectTo(n, e.arg);
  },
  unbind: (n, e) => {
    d.Instance.removeFrom(n, e.arg);
  }
}, R = {
  bind: (n, e) => {
    !n || d.Instance.setScreen(n, e.arg);
  }
}, M = {
  projectToDirective: F,
  screenDirective: R
}, I = class {
  constructor() {
    o(this, "screens", /* @__PURE__ */ new Map());
  }
  static get Instance() {
    return I.instance;
  }
  static set Instance(e) {
    this.instance = e;
  }
  injectTo(e, t) {
    if (!(!e || !t)) {
      var i = this.screens.has(t) ? this.screens.get(t) : null;
      try {
        e.parentElement && e.removeChild(e);
      } catch {
      }
      i && i.append(e);
    }
  }
  removeFrom(e, t) {
    if (!(!e || !t)) {
      var i = this.screens.has(t) ? this.screens.get(t) : null;
      try {
        i && i.removeChild(e);
      } catch {
      }
    }
  }
  setScreen(e, t = "defaultscreen") {
    this.screens.set(t, e);
  }
};
let d = I;
o(d, "instance", new I());
function v(n, e) {
  if (n.target.validity) {
    let t = n.target;
    if (t.validity) {
      let i = [
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
      ].filter((r) => !!r);
      e(i, t.validity.valid != null ? t.validity.valid : !0);
    }
  }
}
const D = {
  inserted: (n, e) => {
    if (!(!n || !n.willValidate)) {
      switch (n.nodeName) {
        case "INPUT":
        case "TEXTAREA":
          n.onblur = (t) => v(t, e.value);
          break;
        case "SELECT":
          n.onchange = (t) => v(t, e.value);
          break;
      }
      n.oninvalid = (t) => v(t, e.value), n.form && n.form.addEventListener("invalid", () => v({ target: n }, e.value)), e.arg == "immediate" ? n.reportValidity() : v({ target: n }, e.value);
    }
  },
  unbind: (n) => {
  }
};
function U(n) {
  n.component("screen", E), n.component("inject", V), n.directive("screen", M.screenDirective), n.directive("projectTo", M.projectToDirective), n.directive("validate", D);
}
function J(n) {
  let e = {};
  return {
    init(t, i, r, s) {
      return s.registry && (l.Instance = s.registry), s.messageService && (h.Instance = s.messageService), s.projector && (g.Instance = s.projector), s.screens && (d.Instance = s.screens), e = r, n.init(z, t, i, r);
    },
    config(t, i) {
      return n.config ? n.config(t, i, e) : null;
    },
    run(t, i) {
      return n.run ? n.run(t, i, e) : null;
    },
    routes: n.routes
  };
}
function Q(n, e, t) {
  const i = n.default.default || n.default;
  return i.init(
    f.Instance,
    e,
    t || {},
    {
      registry: l.Instance,
      messageService: h.Instance,
      projector: g.Instance,
      screens: d.Instance
    }
  ).then(() => i);
}
function W(n, e) {
  return (n.default.default || n.default).config(f.Instance, e);
}
function Y(n, e) {
  return (n.default.default || n.default).run(f.Instance, e);
}
function Z(n) {
  return (n.default.default || n.default).routes;
}
const z = {
  install: U,
  MenuHelper: new f(),
  menuType: b,
  CommonRegistry: new l(),
  MessageService: new h(),
  Inject: V,
  Screen: E,
  ValidateDirective: D,
  MenuNotifications: T
};
export {
  W as ConfigModule,
  Q as InitModule,
  J as ModuleInitializer,
  Z as ModuleRoutes,
  Y as RunModule,
  z as default
};

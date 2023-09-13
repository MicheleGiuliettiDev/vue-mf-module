var G = Object.defineProperty;
var X = (n, e, t) => e in n ? G(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var c = (n, e, t) => (X(n, typeof e != "symbol" ? e + "" : e, t), t);
import { defineComponent as E, computed as y, getCurrentInstance as z, ref as $, onMounted as B } from "vue";
var A = { exports: {} };
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
      for (var s = 0, l = r.length; s < l; s++)
        r[s].fn !== e && r[s].fn._ !== e && i.push(r[s]);
    return i.length ? t[n] = i : delete t[n], this;
  }
};
A.exports = S;
var K = A.exports.TinyEmitter = S, D = /* @__PURE__ */ ((n) => (n[n.drawer = 0] = "drawer", n[n.bottom = 1] = "bottom", n[n.header = 2] = "header", n))(D || {});
const R = {
  menuDefinitionAdded: "newmenuitem"
}, _ = class {
  constructor() {
    c(this, "menuDefinitions", []);
    c(this, "menuStructure", {});
    c(this, "notifications", new K());
  }
  get Notifications() {
    return this.notifications;
  }
  static get Instance() {
    return _.instance;
  }
  addMenuDefinition(e, ...t) {
    let r = this.menuDefinitions.find((i) => i.name == e.name);
    r ? e = r : this.menuDefinitions.push(e);
    for (const i of t)
      this.menuStructure[i.section] = this.menuStructure[i.section] || {}, this.menuStructure[i.section][i.parent || e.name] = this.menuStructure[i.section][i.parent || e.name] || [], i.parent && this.menuStructure[i.section][i.parent].push(e.name);
    this.notifications.emit(R.menuDefinitionAdded, e);
  }
  getMenuItem(e) {
    return this.menuDefinitions.find((t) => t.name == e);
  }
  getMenu(e) {
    let t = [], r = /* @__PURE__ */ new Set();
    for (const i in this.menuStructure[e]) {
      const s = this.menuStructure[e][i];
      let l = {
        item: this.menuDefinitions.find((a) => a.name == i && (!a.hidden || !a.hidden())),
        children: s.map((a) => this.menuDefinitions.find((o) => o.name == a && (!o.hidden || !o.hidden()))).filter((a) => !!a).sort((a, o) => a && o && a.orderIndex && o.orderIndex && a.orderIndex > o.orderIndex ? 1 : a && o && a.orderIndex && o.orderIndex && a.orderIndex < o.orderIndex ? -1 : 0)
      };
      l.item && (r.add(i), s.forEach((a) => r.add(a)), t.push(l));
    }
    return t.filter((i) => !!i.item).sort((i, s) => i && s && i.item && s.item && i.item.orderIndex && s.item.orderIndex && i.item.orderIndex > s.item.orderIndex ? 1 : i && s && i.item && s.item && i.item.orderIndex && s.item.orderIndex && i.item.orderIndex < s.item.orderIndex ? -1 : 0);
  }
};
let h = _;
c(h, "instance", new _());
const b = class {
  constructor() {
    c(this, "registry", /* @__PURE__ */ new Map());
    c(this, "groupedregistry", /* @__PURE__ */ new Map());
    c(this, "serviceregistry", /* @__PURE__ */ new Map());
    c(this, "groupedserviceregistry", /* @__PURE__ */ new Map());
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
let f = b;
c(f, "instance", new b());
const I = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map(), W = (n, ...e) => new Promise((t) => {
  var l;
  let r = (l = I.get(n)) == null ? void 0 : l.port1;
  if (!r) {
    const a = new MessageChannel();
    I.set(n, a), r = a.port1;
  }
  let i = new MessageChannel();
  const s = (a) => {
    t(a.data), i = null;
  };
  i.port1.onmessage = s, r.postMessage(e, [i.port2]);
}), J = (n, e, t = { force: !1 }) => {
  var s;
  let r = (s = I.get(n)) == null ? void 0 : s.port2;
  if (!r) {
    const l = new MessageChannel();
    I.set(n, l), r = l.port2;
  }
  if (!t.force && r.onmessage)
    throw "reply already set for message " + n;
  const i = async (l) => {
    const a = l.ports[0], o = await e(...l.data);
    a.postMessage(o), a.close();
  };
  return r.onmessage = i, () => {
    r.onmessage = null;
  };
}, Q = (n, ...e) => {
  var r;
  let t = (r = m.get(n)) == null ? void 0 : r.port1;
  if (!t) {
    const i = new MessageChannel();
    m.set(n, i), t = i.port1;
  }
  t.postMessage(e);
}, N = (n, e) => {
  var i;
  let t = (i = m.get(n)) == null ? void 0 : i.port2;
  if (!t) {
    const s = new MessageChannel();
    m.set(n, s), t = s.port2;
  }
  const r = (s) => {
    e(...s.data);
  };
  return w.set(e, r), t.addEventListener("message", r), t.start(), () => {
    t == null || t.removeEventListener("message", r), w.delete(e);
  };
}, Y = (n, e) => {
  const t = N(n, (...r) => {
    e(...r), t();
  });
}, Z = (n, e) => {
  var i;
  let t = (i = m.get(n)) == null ? void 0 : i.port2;
  if (!t)
    return;
  const r = w.get(e);
  r && (t.removeEventListener("message", r), w.delete(e));
}, x = {
  Instance: {
    ask: W,
    reply: J,
    send: Q,
    subscribe: N,
    once: Y,
    unsubscibe: Z
  }
}, q = E({
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
    const t = y({
      get: () => n.value,
      set: (l) => {
        e("input", l);
      }
    }), r = y(() => n.name ? [f.Instance.getComponent(n.name, n.group)] : n.group ? f.Instance.getGroupComponents(n.group, ...n.names || []) : f.Instance.getComponents(...n.names || [])), i = (...l) => {
      e("click", ...l);
    }, s = (...l) => {
      e("save", ...l);
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
function O(n, e, t, r, i, s, l, a) {
  var o = typeof n == "function" ? n.options : n;
  e && (o.render = e, o.staticRenderFns = t, o._compiled = !0), r && (o.functional = !0), s && (o._scopeId = "data-v-" + s);
  var u;
  if (l ? (u = function(d) {
    d = d || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !d && typeof __VUE_SSR_CONTEXT__ < "u" && (d = __VUE_SSR_CONTEXT__), i && i.call(this, d), d && d._registeredComponents && d._registeredComponents.add(l);
  }, o._ssrRegister = u) : i && (u = a ? function() {
    i.call(
      this,
      (o.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), u)
    if (o.functional) {
      o._injectStyles = u;
      var j = o.render;
      o.render = function(F, T) {
        return u.call(T), j(F, T);
      };
    } else {
      var V = o.beforeCreate;
      o.beforeCreate = V ? [].concat(V, u) : [u];
    }
  return {
    exports: n,
    options: o
  };
}
var H = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("div", e._l(e.Components, function(r, i) {
    return t(r, { key: i, tag: "component", attrs: { disabled: e.disabled, readonly: e.readonly, id: e.id, type: e.type, metadata: e.metadata }, on: { click: e.click, save: e.save }, model: { value: e.Value, callback: function(s) {
      e.Value = s;
    }, expression: "Value" } });
  }), 1);
}, ee = [], te = /* @__PURE__ */ O(
  q,
  H,
  ee,
  !1,
  null,
  null,
  null,
  null
);
const L = te.exports, M = class {
  constructor() {
    c(this, "screens", /* @__PURE__ */ new Map());
    c(this, "projecting", /* @__PURE__ */ new Map());
  }
  static get Instance() {
    return M.instance;
  }
  static set Instance(e) {
    this.instance = e;
  }
  setScreen(e, t = "defaultscreen") {
    this.screens.set(t, e);
  }
  projectTo(e, t = null, r = "defaultscreen", i = !0, s = !1) {
    const l = { data: t }, a = s ? new Promise((u, j) => {
      l.reject = j, l.resolve = u;
    }) : null;
    i ? (this.projecting.has(r) || this.projecting.set(r, []), (this.projecting.get(r) || []).push({ component: e, model: l, promise: a, queue: i })) : this.projecting.set(r, [{ component: e, model: l, promise: a, queue: i }]);
    const o = this.screens.get(r);
    return o ? (o.model = l, o.currentView = e, a && a.then(() => this.stopProjecting(r)).catch(() => this.stopProjecting(r)), a) : null;
  }
  projectAsyncTo(e, t, r = "defaultscreen", i = !0) {
    return this.projectTo(e, t, r, i, !0);
  }
  stopProjecting(e = "defaultscreen") {
    this.projecting.has(e) && (this.projecting.get(e) || []).pop();
    let t = this.screens.get(e);
    if (t && t.currentView) {
      if (t.model = null, t.screenModel = null, t.currentView = null, this.projecting.has(e)) {
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
let v = M;
c(v, "instance", new M());
const ne = E({
  name: "screen",
  props: {
    name: { type: String, default: "defaultscreen" }
  },
  setup(n, { expose: e }) {
    const t = z(), r = $(null), i = $(null);
    e({ currentView: r, model: i });
    const s = y(() => r.value != null), l = y(() => {
      var a;
      return (a = r.value) == null ? void 0 : a.__file;
    });
    return B(() => {
      v.Instance.setScreen(t.proxy, n.name);
    }), {
      currentViewUID: l,
      currentView: r,
      model: i,
      isVisible: s
    };
  }
});
var re = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("div", { directives: [{ name: "show", rawName: "v-show", value: e.isVisible, expression: "isVisible" }] }, [e.currentView ? t(e.currentView, { key: e.currentViewUID, tag: "component", attrs: { value: e.model } }) : e._e()], 1);
}, ie = [], se = /* @__PURE__ */ O(
  ne,
  re,
  ie,
  !1,
  null,
  null,
  null,
  null
);
const P = se.exports, ae = {
  inserted: (n, e) => {
    g.Instance.injectTo(n, e.arg);
  },
  unbind: (n, e) => {
    g.Instance.removeFrom(n, e.arg);
  }
}, oe = {
  bind: (n, e) => {
    !n || g.Instance.setScreen(n, e.arg);
  }
}, k = {
  projectToDirective: ae,
  screenDirective: oe
}, C = class {
  constructor() {
    c(this, "screens", /* @__PURE__ */ new Map());
  }
  static get Instance() {
    return C.instance;
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
let g = C;
c(g, "instance", new C());
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
const U = {
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
function le(n) {
  n.component("screen", P), n.component("inject", L), n.directive("screen", k.screenDirective), n.directive("projectTo", k.projectToDirective), n.directive("validate", U);
}
function fe(n) {
  let e = {};
  return {
    init(t, r, i, s) {
      return s.registry && (f.Instance = s.registry), s.messageService && (x.Instance = s.messageService), s.projector && (v.Instance = s.projector), s.screens && (g.Instance = s.screens), e = i, n.init(ce, t, r, i);
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
function ge(n, e, t) {
  const r = n.default.default || n.default;
  return r.init(
    h.Instance,
    e,
    t || {},
    {
      registry: f.Instance,
      messageService: x.Instance,
      projector: v.Instance,
      screens: g.Instance
    }
  ).then(() => r);
}
function he(n, e) {
  return (n.default.default || n.default).config(h.Instance, e);
}
function ve(n, e) {
  return (n.default.default || n.default).run(h.Instance, e);
}
function pe(n) {
  return (n.default.default || n.default).routes;
}
const ce = {
  install: le,
  MenuHelper: new h(),
  menuType: D,
  CommonRegistry: new f(),
  MessageService: x,
  Inject: L,
  Screen: P,
  ValidateDirective: U,
  MenuNotifications: R,
  Projector: v
};
export {
  f as CommonRegistry,
  he as ConfigModule,
  ge as InitModule,
  L as Inject,
  h as MenuHelper,
  R as MenuNotifications,
  x as MessageService,
  fe as ModuleInitializer,
  pe as ModuleRoutes,
  v as Projector,
  ve as RunModule,
  P as Screen,
  U as ValidateDirective,
  ce as default,
  D as menuType
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlLW1mLW1vZHVsZS5lcy5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RpbnktZW1pdHRlci9pbmRleC5qcyIsIi4uL3NyYy9oZWxwZXJzL01lbnVIZWxwZXIudHMiLCIuLi9zcmMvaGVscGVycy9Db21tb25SZWdpc3RyeS50cyIsIi4uL3NyYy9oZWxwZXJzL01lc3NhZ2VTZXJ2aWNlLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvaW5qZWN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZy50cyIsIi4uL3NyYy9oZWxwZXJzL1Byb2plY3Rvci50cyIsIi4uL3NyYy9jb21wb25lbnRzL3NjcmVlbi52dWU/dnVlJnR5cGU9c2NyaXB0JmxhbmcudHMiLCIuLi9zcmMvZGlyZWN0aXZlcy9zY3JlZW4udHMiLCIuLi9zcmMvZGlyZWN0aXZlcy92YWxpZGF0ZS50cyIsIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBFICgpIHtcbiAgLy8gS2VlcCB0aGlzIGVtcHR5IHNvIGl0J3MgZWFzaWVyIHRvIGluaGVyaXQgZnJvbVxuICAvLyAodmlhIGh0dHBzOi8vZ2l0aHViLmNvbS9saXBzbWFjayBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvaXNzdWVzLzMpXG59XG5cbkUucHJvdG90eXBlID0ge1xuICBvbjogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICB2YXIgZSA9IHRoaXMuZSB8fCAodGhpcy5lID0ge30pO1xuXG4gICAgKGVbbmFtZV0gfHwgKGVbbmFtZV0gPSBbXSkpLnB1c2goe1xuICAgICAgZm46IGNhbGxiYWNrLFxuICAgICAgY3R4OiBjdHhcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG9uY2U6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGxpc3RlbmVyICgpIHtcbiAgICAgIHNlbGYub2ZmKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIuXyA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHRoaXMub24obmFtZSwgbGlzdGVuZXIsIGN0eCk7XG4gIH0sXG5cbiAgZW1pdDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZGF0YSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICB2YXIgZXZ0QXJyID0gKCh0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KSlbbmFtZV0gfHwgW10pLnNsaWNlKCk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsZW4gPSBldnRBcnIubGVuZ3RoO1xuXG4gICAgZm9yIChpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGV2dEFycltpXS5mbi5hcHBseShldnRBcnJbaV0uY3R4LCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvZmY6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG4gICAgdmFyIGV2dHMgPSBlW25hbWVdO1xuICAgIHZhciBsaXZlRXZlbnRzID0gW107XG5cbiAgICBpZiAoZXZ0cyAmJiBjYWxsYmFjaykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV2dHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGV2dHNbaV0uZm4gIT09IGNhbGxiYWNrICYmIGV2dHNbaV0uZm4uXyAhPT0gY2FsbGJhY2spXG4gICAgICAgICAgbGl2ZUV2ZW50cy5wdXNoKGV2dHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBldmVudCBmcm9tIHF1ZXVlIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtcbiAgICAvLyBTdWdnZXN0ZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2xhemRcbiAgICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvY29tbWl0L2M2ZWJmYWE5YmM5NzNiMzNkMTEwYTg0YTMwNzc0MmI3Y2Y5NGM5NTMjY29tbWl0Y29tbWVudC01MDI0OTEwXG5cbiAgICAobGl2ZUV2ZW50cy5sZW5ndGgpXG4gICAgICA/IGVbbmFtZV0gPSBsaXZlRXZlbnRzXG4gICAgICA6IGRlbGV0ZSBlW25hbWVdO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRTtcbm1vZHVsZS5leHBvcnRzLlRpbnlFbWl0dGVyID0gRTtcbiIsImltcG9ydCB7IFRpbnlFbWl0dGVyIH0gZnJvbSAndGlueS1lbWl0dGVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1lbnVEZWZpbml0aW9uIHtcclxuICBuYW1lOiBzdHJpbmcsXHJcbiAgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICBpY29uPzogc3RyaW5nLFxyXG4gIHJvdXRlTmFtZT86IHN0cmluZyxcclxuICByb3V0ZVBhcmFtcz86IG9iamVjdCxcclxuICBmZWF0dXJlZmxhZ3M/OiBzdHJpbmdbXSxcclxuICBvcmRlckluZGV4PzogbnVtYmVyLFxyXG4gIGNsYXNzPzogc3RyaW5nLFxyXG4gIGhpZGRlbjogKCkgPT4gYm9vbGVhblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGVudW0gbWVudVR5cGUge1xyXG4gIGRyYXdlciwgICAgICAgLy8gRHJhd2VyIE1lbnVcclxuICBib3R0b20sICAgICAgIC8vIEJvdHRvbSBNZW51XHJcbiAgaGVhZGVyXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBNZW51Tm90aWZpY2F0aW9ucyA9IHtcclxuICBtZW51RGVmaW5pdGlvbkFkZGVkOiAnbmV3bWVudWl0ZW0nXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZW51SGVscGVyIHtcclxuXHJcbiAgcHJpdmF0ZSBtZW51RGVmaW5pdGlvbnM6IElNZW51RGVmaW5pdGlvbltdID0gW107XHJcbiAgcHJpdmF0ZSBtZW51U3RydWN0dXJlOiB7IFtrZXk6IHN0cmluZ106IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSB9ID0ge31cclxuICBwcml2YXRlIG5vdGlmaWNhdGlvbnM6IFRpbnlFbWl0dGVyID0gbmV3IFRpbnlFbWl0dGVyKCk7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgTWVudUhlbHBlcigpO1xyXG4gIHB1YmxpYyBnZXQgTm90aWZpY2F0aW9ucygpIHsgcmV0dXJuIHRoaXMubm90aWZpY2F0aW9uczsgfVxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCkgeyByZXR1cm4gTWVudUhlbHBlci5pbnN0YW5jZSB9XHJcblxyXG4gIHB1YmxpYyBhZGRNZW51RGVmaW5pdGlvbihtZW51RGVmaW5pdGlvbjogSU1lbnVEZWZpbml0aW9uLCAuLi5wb3NpdGlvbnM6IHsgc2VjdGlvbjogbWVudVR5cGUsIHBhcmVudD86IHN0cmluZyB9W10pIHtcclxuXHJcbiAgICAvLyBBZ2dpdW5nbyBsYSBkaWNoaWFyYXppb25lIGRlbCBtZW51w7kgYWxsJ2VsZW5jbyBkZWkgbWVuw7kgZGlzcG9uaWJpbGkuXHJcbiAgICBsZXQgZm91bmQgPSB0aGlzLm1lbnVEZWZpbml0aW9ucy5maW5kKG0gPT4gbS5uYW1lID09IG1lbnVEZWZpbml0aW9uLm5hbWUpO1xyXG4gICAgaWYgKCFmb3VuZClcclxuICAgICAgdGhpcy5tZW51RGVmaW5pdGlvbnMucHVzaChtZW51RGVmaW5pdGlvbik7XHJcbiAgICBlbHNlXHJcbiAgICAgIG1lbnVEZWZpbml0aW9uID0gZm91bmQ7XHJcblxyXG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHBvc2l0aW9ucykge1xyXG5cclxuICAgICAgdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl0gPSB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXSB8fCB7fTtcclxuICAgICAgdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl1bZWxlbWVudC5wYXJlbnQgfHwgbWVudURlZmluaXRpb24ubmFtZV0gPSB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXVtlbGVtZW50LnBhcmVudCB8fCBtZW51RGVmaW5pdGlvbi5uYW1lXSB8fCBbXTtcclxuXHJcbiAgICAgIGlmIChlbGVtZW50LnBhcmVudClcclxuICAgICAgICB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXVtlbGVtZW50LnBhcmVudF0ucHVzaChtZW51RGVmaW5pdGlvbi5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm5vdGlmaWNhdGlvbnMuZW1pdChNZW51Tm90aWZpY2F0aW9ucy5tZW51RGVmaW5pdGlvbkFkZGVkLCBtZW51RGVmaW5pdGlvbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TWVudUl0ZW0obmFtZTogc3RyaW5nKTogSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLm1lbnVEZWZpbml0aW9ucy5maW5kKGkgPT4gaS5uYW1lID09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE1lbnUobWVudTogbWVudVR5cGUpOiB7IGl0ZW06IElNZW51RGVmaW5pdGlvbiB8IHVuZGVmaW5lZCwgY2hpbGRyZW46IChJTWVudURlZmluaXRpb24gfCB1bmRlZmluZWQpW10gfVtdIHtcclxuICAgIGxldCByZXN1bHQ6IHsgaXRlbTogSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkLCBjaGlsZHJlbjogKElNZW51RGVmaW5pdGlvbiB8IHVuZGVmaW5lZClbXSB9W10gPSBbXTtcclxuICAgIGxldCB1c2VkID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5tZW51U3RydWN0dXJlW21lbnVdKSB7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm1lbnVTdHJ1Y3R1cmVbbWVudV1ba2V5XTtcclxuXHJcblxyXG4gICAgICBsZXQgcnIgPSB7XHJcbiAgICAgICAgaXRlbTogdGhpcy5tZW51RGVmaW5pdGlvbnMuZmluZChtID0+IHtcclxuICAgICAgICAgIHJldHVybiBtLm5hbWUgPT0ga2V5ICYmXHJcbiAgICAgICAgICAgICghbS5oaWRkZW4gfHwgIW0uaGlkZGVuKCkpXHJcbiAgICAgICAgfSksXHJcblxyXG4gICAgICAgIGNoaWxkcmVuOiBlbGVtZW50Lm1hcChpID0+IHRoaXMubWVudURlZmluaXRpb25zLmZpbmQobSA9PiBtLm5hbWUgPT0gaSAmJiAoIW0uaGlkZGVuIHx8ICFtLmhpZGRlbigpKSkpXHJcbiAgICAgICAgICAuZmlsdGVyKGkgPT4gISFpKVxyXG4gICAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGEgJiYgYiAmJiBhLm9yZGVySW5kZXggJiYgYi5vcmRlckluZGV4ICYmIGEub3JkZXJJbmRleCA+IGIub3JkZXJJbmRleCkgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIGlmIChhICYmIGIgJiYgYS5vcmRlckluZGV4ICYmIGIub3JkZXJJbmRleCAmJiBhLm9yZGVySW5kZXggPCBiLm9yZGVySW5kZXgpIHJldHVybiAtMTtcclxuICAgICAgICAgICAgcmV0dXJuIDBcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoISFyci5pdGVtKSB7XHJcbiAgICAgICAgdXNlZC5hZGQoa2V5KTtcclxuICAgICAgICBlbGVtZW50LmZvckVhY2goaSA9PiB1c2VkLmFkZChpKSk7XHJcbiAgICAgICAgcmVzdWx0LnB1c2gocnIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0LmZpbHRlcihpID0+ICEhaS5pdGVtKVxyXG4gICAgICAuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgIGlmIChhICYmIGIgJiYgYS5pdGVtICYmIGIuaXRlbSAmJiBhLml0ZW0ub3JkZXJJbmRleCAmJiBiLml0ZW0ub3JkZXJJbmRleCAmJiBhLml0ZW0ub3JkZXJJbmRleCA+IGIuaXRlbS5vcmRlckluZGV4KSByZXR1cm4gMTtcclxuICAgICAgICBpZiAoYSAmJiBiICYmIGEuaXRlbSAmJiBiLml0ZW0gJiYgYS5pdGVtLm9yZGVySW5kZXggJiYgYi5pdGVtLm9yZGVySW5kZXggJiYgYS5pdGVtLm9yZGVySW5kZXggPCBiLml0ZW0ub3JkZXJJbmRleCkgcmV0dXJuIC0xO1xyXG4gICAgICAgIHJldHVybiAwXHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuIiwiXHJcbmV4cG9ydCBjbGFzcyBDb21tb25SZWdpc3RyeSB7XHJcblxyXG4gIHByaXZhdGUgcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xyXG4gIHByaXZhdGUgZ3JvdXBlZHJlZ2lzdHJ5ID0gbmV3IE1hcDxzdHJpbmcsIE1hcDxzdHJpbmcsIGFueT4+KCk7XHJcbiAgcHJpdmF0ZSBzZXJ2aWNlcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xyXG4gIHByaXZhdGUgZ3JvdXBlZHNlcnZpY2VyZWdpc3RyeSA9IG5ldyBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBhbnk+PigpO1xyXG5cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbW1vblJlZ2lzdHJ5ID0gbmV3IENvbW1vblJlZ2lzdHJ5KCk7XHJcbiAgc3RhdGljIGdldCBJbnN0YW5jZSgpIHsgcmV0dXJuIHRoaXMuaW5zdGFuY2U7IH1cclxuICBzdGF0aWMgc2V0IEluc3RhbmNlKHY6IENvbW1vblJlZ2lzdHJ5KSB7IHRoaXMuaW5zdGFuY2UgPSB2IH07XHJcblxyXG4gIHByb3ZpZGVDb21wb25lbnQoY29tcG9uZW50OiBhbnksIG5hbWU6IHN0cmluZywgZ3JvdXA/OiBzdHJpbmcpIHtcclxuICAgIHRoaXMucmVnaXN0cnkuc2V0KGdyb3VwID8gYCR7Z3JvdXB9LSR7bmFtZX1gIDogbmFtZSwgY29tcG9uZW50KTtcclxuICAgIGlmIChncm91cCkge1xyXG4gICAgICBpZiAoIXRoaXMuZ3JvdXBlZHJlZ2lzdHJ5Lmhhcyhncm91cCkpIHRoaXMuZ3JvdXBlZHJlZ2lzdHJ5LnNldChncm91cCwgbmV3IE1hcDxzdHJpbmcsIGFueT4oKSk7XHJcblxyXG4gICAgICBsZXQgZ2cgPSB0aGlzLmdyb3VwZWRyZWdpc3RyeS5nZXQoZ3JvdXApO1xyXG4gICAgICBpZiAoZ2cpIGdnLnNldChuYW1lLCBjb21wb25lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0Q29tcG9uZW50KG5hbWU6IHN0cmluZywgZ3JvdXA/OiBzdHJpbmcpOiBhbnkgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5LmdldChncm91cCA/IGAke2dyb3VwfS0ke25hbWV9YCA6IG5hbWUpIHx8IG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXRDb21wb25lbnRzKC4uLm5hbWU6IHN0cmluZ1tdKTogKGFueSlbXSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnJlZ2lzdHJ5LmVudHJpZXMoKSkuZmlsdGVyKGkgPT4gbmFtZS5pbmRleE9mKGlbMF0pID49IDApLm1hcChpID0+IGlbMV0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0R3JvdXBDb21wb25lbnRzKGdyb3VwOiBzdHJpbmcsIC4uLm5hbWU6IHN0cmluZ1tdKTogKGFueSlbXSB7XHJcbiAgICBsZXQgZyA9IHRoaXMuZ3JvdXBlZHJlZ2lzdHJ5LmdldChncm91cCk7XHJcbiAgICBpZiAoZylcclxuICAgICAgcmV0dXJuIEFycmF5LmZyb20oZy5lbnRyaWVzKCkgfHwgW10pLmZpbHRlcihpID0+ICghbmFtZSB8fCBuYW1lLmxlbmd0aCA9PSAwKSB8fCBuYW1lLmluZGV4T2YoaVswXSkgPj0gMCkubWFwKGkgPT4gaVsxXSk7XHJcbiAgICByZXR1cm4gW11cclxuICB9XHJcblxyXG4gIGdldEdyb3VwQ29tcG9uZW50c0tleXMoZ3JvdXA6IHN0cmluZyk6IChzdHJpbmcpW10ge1xyXG4gICAgbGV0IGcgPSB0aGlzLmdyb3VwZWRyZWdpc3RyeS5nZXQoZ3JvdXApO1xyXG4gICAgaWYgKGcpIHJldHVybiBBcnJheS5mcm9tKGcua2V5cygpKTtcclxuICAgIHJldHVybiBbXVxyXG4gIH1cclxuXHJcbiAgcHJvdmlkZVNlcnZpY2UobmFtZTogc3RyaW5nLCBzZXJ2aWNlOiBhbnksIGdyb3VwPzogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNlcnZpY2VyZWdpc3RyeS5zZXQobmFtZSwgc2VydmljZSk7XHJcbiAgICBpZiAoZ3JvdXApIHtcclxuICAgICAgaWYgKCF0aGlzLmdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkuaGFzKGdyb3VwKSkgdGhpcy5ncm91cGVkc2VydmljZXJlZ2lzdHJ5LnNldChncm91cCwgbmV3IE1hcDxzdHJpbmcsIGFueT4oKSk7XHJcbiAgICAgIGxldCBnZyA9IHRoaXMuZ3JvdXBlZHNlcnZpY2VyZWdpc3RyeS5nZXQoZ3JvdXApO1xyXG4gICAgICBpZiAoZ2cpIGdnLnNldChuYW1lLCBzZXJ2aWNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFNlcnZpY2U8VD4obmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuc2VydmljZXJlZ2lzdHJ5LmdldChuYW1lKSB8fCBudWxsKSBhcyBUO1xyXG4gIH1cclxuXHJcbiAgZ2V0R3JvdXBTZXJ2aWNlcyhncm91cDogc3RyaW5nLCAuLi5uYW1lOiBzdHJpbmdbXSk6IChhbnkpW10ge1xyXG4gICAgbGV0IGcgPSB0aGlzLmdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkuZ2V0KGdyb3VwKTtcclxuICAgIGlmIChnKVxyXG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShnLmVudHJpZXMoKSB8fCBbXSkuZmlsdGVyKGkgPT4gKCFuYW1lIHx8IG5hbWUubGVuZ3RoID09IDApIHx8IG5hbWUuaW5kZXhPZihpWzBdKSA+PSAwKS5tYXAoaSA9PiBpWzFdKTtcclxuICAgIHJldHVybiBbXVxyXG4gIH1cclxufSIsImNvbnN0IGFza1JlcGx5Q2hhbm5lbHMgPSBuZXcgTWFwPHN0cmluZywgTWVzc2FnZUNoYW5uZWw+KCk7XHJcbmNvbnN0IHNlbmRTdWJzY3JpYmVDaGFubmVscyA9IG5ldyBNYXA8c3RyaW5nLCBNZXNzYWdlQ2hhbm5lbD4oKTtcclxuY29uc3Qgc2VuZFN1YnNjcmliZUNhbGxiYWNrcyA9IG5ldyBNYXA8RnVuY3Rpb24sICguLi5hcmdzOiBhbnlbXSkgPT4gYW55PigpO1xyXG5cclxuY29uc3QgYXNrID0gPFQ+KG5hbWU6IHN0cmluZywgLi4uYXJnczogYW55W10pOiBQcm9taXNlPFQ+ID0+IHtcclxuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICBsZXQgcG9ydCA9IGFza1JlcGx5Q2hhbm5lbHMuZ2V0KG5hbWUpPy5wb3J0MVxyXG4gICAgaWYgKCFwb3J0KSB7XHJcbiAgICAgIGNvbnN0IGMgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcclxuICAgICAgYXNrUmVwbHlDaGFubmVscy5zZXQobmFtZSwgYyk7XHJcbiAgICAgIHBvcnQgPSBjLnBvcnQxXHJcbiAgICB9XHJcbiAgICBsZXQgaW5uZXJjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XHJcbiAgICBjb25zdCBsID0gKGV2dDogTWVzc2FnZUV2ZW50KSA9PiB7XHJcbiAgICAgIHJlc29sdmUoZXZ0LmRhdGEpO1xyXG4gICAgICBpbm5lcmNoYW5uZWwgPSBudWxsITtcclxuICAgIH1cclxuICAgIGlubmVyY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsO1xyXG4gICAgcG9ydC5wb3N0TWVzc2FnZShhcmdzLCBbaW5uZXJjaGFubmVsLnBvcnQyXSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IHJlcGx5ID0gKG5hbWU6IHN0cmluZywgY2I6ICguLi5hcmdzOiBhbnlbXSkgPT4gUHJvbWlzZTxhbnk+IHwgYW55LCBvcHRzOiB7IGZvcmNlOiBib29sZWFuIH0gPSB7IGZvcmNlOiBmYWxzZSB9KSA9PiB7XHJcbiAgbGV0IHBvcnQgPSBhc2tSZXBseUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDJcclxuICBpZiAoIXBvcnQpIHtcclxuICAgIGNvbnN0IGMgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcclxuICAgIGFza1JlcGx5Q2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xyXG4gICAgcG9ydCA9IGMucG9ydDJcclxuICB9XHJcbiAgaWYgKCFvcHRzLmZvcmNlICYmIHBvcnQub25tZXNzYWdlKSB0aHJvdyBcInJlcGx5IGFscmVhZHkgc2V0IGZvciBtZXNzYWdlIFwiICsgbmFtZVxyXG4gIGNvbnN0IGwgPSBhc3luYyAoZXZ0OiBNZXNzYWdlRXZlbnQpID0+IHtcclxuICAgIGNvbnN0IGlubmVycG9ydCA9IGV2dC5wb3J0c1swXVxyXG4gICAgY29uc3QgciA9IGF3YWl0IGNiKC4uLmV2dC5kYXRhKTtcclxuICAgIGlubmVycG9ydC5wb3N0TWVzc2FnZShyKTtcclxuICAgIGlubmVycG9ydC5jbG9zZSgpO1xyXG4gIH1cclxuICBwb3J0Lm9ubWVzc2FnZSA9IGw7XHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIHBvcnQhLm9ubWVzc2FnZSA9IG51bGwhO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgc2VuZCA9IChuYW1lOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSA9PiB7XHJcbiAgbGV0IHBvcnQgPSBzZW5kU3Vic2NyaWJlQ2hhbm5lbHMuZ2V0KG5hbWUpPy5wb3J0MVxyXG4gIGlmICghcG9ydCkge1xyXG4gICAgY29uc3QgYyA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xyXG4gICAgc2VuZFN1YnNjcmliZUNoYW5uZWxzLnNldChuYW1lLCBjKTtcclxuICAgIHBvcnQgPSBjLnBvcnQxXHJcbiAgfVxyXG4gIHBvcnQucG9zdE1lc3NhZ2UoYXJncyk7XHJcbn1cclxuXHJcbmNvbnN0IHN1YnNjcmliZSA9IChuYW1lOiBzdHJpbmcsIGNiOiAoLi4uYXJnczogYW55W10pID0+IGFueSkgPT4ge1xyXG4gIGxldCBwb3J0ID0gc2VuZFN1YnNjcmliZUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDJcclxuICBpZiAoIXBvcnQpIHtcclxuICAgIGNvbnN0IGMgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcclxuICAgIHNlbmRTdWJzY3JpYmVDaGFubmVscy5zZXQobmFtZSwgYyk7XHJcbiAgICBwb3J0ID0gYy5wb3J0MlxyXG4gIH1cclxuICBjb25zdCBsID0gKGV2dDogTWVzc2FnZUV2ZW50KSA9PiB7XHJcbiAgICBjYiguLi5ldnQuZGF0YSk7XHJcbiAgfVxyXG4gIHNlbmRTdWJzY3JpYmVDYWxsYmFja3Muc2V0KGNiLCBsKTtcclxuICBwb3J0LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGwpO1xyXG4gIHBvcnQuc3RhcnQoKTtcclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgcG9ydD8ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgbCk7XHJcbiAgICBzZW5kU3Vic2NyaWJlQ2FsbGJhY2tzLmRlbGV0ZShjYik7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBvbmNlID0gKG5hbWU6IHN0cmluZywgY2I6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiB7XHJcbiAgY29uc3QgdW5zdWJzY2liZSA9IHN1YnNjcmliZShuYW1lLCAoLi4uYXJnczogYW55W10pID0+IHtcclxuICAgIGNiKC4uLmFyZ3MpO1xyXG4gICAgdW5zdWJzY2liZSgpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5jb25zdCB1bnN1YnNjcmliZSA9IChuYW1lOiBzdHJpbmcsIGNiOiAoLi4uYXJnczogYW55W10pID0+IGFueSkgPT4ge1xyXG4gIGxldCBwb3J0ID0gc2VuZFN1YnNjcmliZUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDJcclxuICBpZiAoIXBvcnQpIHJldHVybjtcclxuICBjb25zdCBsID0gc2VuZFN1YnNjcmliZUNhbGxiYWNrcy5nZXQoY2IpO1xyXG4gIGlmIChsKSB7XHJcbiAgICBwb3J0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGwpO1xyXG4gICAgc2VuZFN1YnNjcmliZUNhbGxiYWNrcy5kZWxldGUoY2IpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBhc2ssXHJcbiAgcmVwbHksXHJcbiAgc2VuZCxcclxuICBzdWJzY3JpYmUsXHJcbiAgb25jZSxcclxuICB1bnN1YnNjcmliZVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTWVzc2FnZVNlcnZpY2UgPSB7XHJcbiAgSW5zdGFuY2U6IHtcclxuICAgIGFzayxcclxuICAgIHJlcGx5LFxyXG4gICAgc2VuZCxcclxuICAgIHN1YnNjcmliZSxcclxuICAgIG9uY2UsXHJcbiAgICB1bnN1YnNjaWJlOiB1bnN1YnNjcmliZVxyXG4gIH1cclxufSIsIlxyXG5pbXBvcnQgeyBjb21wdXRlZCwgZGVmaW5lQ29tcG9uZW50IH0gZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgeyBDb21tb25SZWdpc3RyeSB9IGZyb20gXCIuLi9oZWxwZXJzL0NvbW1vblJlZ2lzdHJ5XCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbXBvbmVudCh7XHJcbiAgbmFtZTogXCJpbmplY3RcIixcclxuICBwcm9wczoge1xyXG4gICAgaWQ6IHsgZGVmYXVsdDogbnVsbCB9LFxyXG4gICAgdHlwZTogeyBkZWZhdWx0OiBudWxsLCB0eXBlOiBTdHJpbmcgfSxcclxuICAgIHZhbHVlOiB7IGRlZmF1bHQ6IG51bGwgfSxcclxuICAgIG5hbWU6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiBudWxsIH0sXHJcbiAgICBuYW1lczogeyB0eXBlOiBBcnJheTxzdHJpbmc+LCBkZWZhdWx0OiBudWxsIH0sXHJcbiAgICBncm91cDogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6IG51bGwgfSxcclxuICAgIG1ldGFkYXRhOiB7IHR5cGU6IE9iamVjdCwgZGVmYXVsdDogbnVsbCB9LFxyXG4gICAgZGlzYWJsZWQ6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2UgfSxcclxuICAgIHJlYWRvbmx5OiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IGZhbHNlIH1cclxuICB9LFxyXG4gIHNldHVwKHByb3BzLCB7IGVtaXQgfSkge1xyXG5cclxuXHJcbiAgICBjb25zdCBWYWx1ZSA9IGNvbXB1dGVkKHtcclxuICAgICAgZ2V0OiAoKSA9PiB7IHJldHVybiBwcm9wcy52YWx1ZSB9LFxyXG4gICAgICBzZXQ6ICh2KSA9PiB7IGVtaXQoXCJpbnB1dFwiLCB2KTsgfVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBDb21wb25lbnRzID0gY29tcHV0ZWQoKCkgPT4ge1xyXG4gICAgICBpZiAocHJvcHMubmFtZSlcclxuICAgICAgICByZXR1cm4gW0NvbW1vblJlZ2lzdHJ5Lkluc3RhbmNlLmdldENvbXBvbmVudChwcm9wcy5uYW1lLCBwcm9wcy5ncm91cCldO1xyXG4gICAgICBpZiAocHJvcHMuZ3JvdXApXHJcbiAgICAgICAgcmV0dXJuIENvbW1vblJlZ2lzdHJ5Lkluc3RhbmNlLmdldEdyb3VwQ29tcG9uZW50cyhwcm9wcy5ncm91cCwgLi4uKHByb3BzLm5hbWVzIHx8IFtdKSk7XHJcbiAgICAgIHJldHVybiBDb21tb25SZWdpc3RyeS5JbnN0YW5jZS5nZXRDb21wb25lbnRzKC4uLihwcm9wcy5uYW1lcyB8fCBbXSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgY2xpY2sgPSAoLi4uYXJnczogYW55W10pID0+IHsgZW1pdCgnY2xpY2snLCAuLi5hcmdzKSB9XHJcbiAgICBjb25zdCBzYXZlID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7IGVtaXQoJ3NhdmUnLCAuLi5hcmdzKSB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaWQ6IHByb3BzLmlkLFxyXG4gICAgICB0eXBlOiBwcm9wcy50eXBlLFxyXG4gICAgICB2YWx1ZTogcHJvcHMudmFsdWUsXHJcbiAgICAgIG5hbWU6IHByb3BzLm5hbWUsXHJcbiAgICAgIG5hbWVzOiBwcm9wcy5uYW1lcyxcclxuICAgICAgZ3JvdXA6IHByb3BzLmdyb3VwLFxyXG4gICAgICBtZXRhZGF0YTogcHJvcHMubWV0YWRhdGEsXHJcbiAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlZCxcclxuICAgICAgcmVhZG9ubHk6IHByb3BzLnJlYWRvbmx5LFxyXG4gICAgICBjbGljayxcclxuICAgICAgc2F2ZSxcclxuICAgICAgQ29tcG9uZW50cyxcclxuICAgICAgVmFsdWUsXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG4iLCJcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSB9IGZyb20gXCJ2dWVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb2plY3RhYmxlTW9kZWw8VD4ge1xyXG4gIGRhdGE6IFQ7IHJlc29sdmU6IChpdGVtOiBUKSA9PiB2b2lkOyByZWplY3Q6ICgpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0b3Ige1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlID0gbmV3IFByb2plY3RvcigpO1xyXG4gIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogUHJvamVjdG9yIHsgcmV0dXJuIFByb2plY3Rvci5pbnN0YW5jZSB9XHJcbiAgc3RhdGljIHNldCBJbnN0YW5jZSh2OiBQcm9qZWN0b3IpIHsgdGhpcy5pbnN0YW5jZSA9IHY7IH1cclxuXHJcbiAgcHJpdmF0ZSBzY3JlZW5zID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcclxuICBwcml2YXRlIHByb2plY3RpbmcgPSBuZXcgTWFwPHN0cmluZywgeyBjb21wb25lbnQ6IENvbXBvbmVudCwgbW9kZWw6IElQcm9qZWN0YWJsZU1vZGVsPGFueT4sIHByb21pc2U6IFByb21pc2U8YW55PiB8IG51bGwsIHF1ZXVlOiBib29sZWFuIH1bXT4oKTtcclxuXHJcbiAgc2V0U2NyZWVuKHNjcmVlbjogQ29tcG9uZW50UHVibGljSW5zdGFuY2UsIG5hbWU6IHN0cmluZyA9IFwiZGVmYXVsdHNjcmVlblwiKSB7XHJcbiAgICB0aGlzLnNjcmVlbnMuc2V0KG5hbWUsIHNjcmVlbik7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIHByb2plY3RUbzxUPihjb21wb25lbnQ6IENvbXBvbmVudCwgZGF0YTogVCB8IG51bGwgPSBudWxsLCBzY3JlZW46IHN0cmluZyA9IFwiZGVmYXVsdHNjcmVlblwiLCBxdWV1ZTogYm9vbGVhbiA9IHRydWUsIGFzeW5jOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPFQ+IHwgbnVsbCB7XHJcbiAgICBjb25zdCBtb2RlbCA9IHsgZGF0YSB9IGFzIElQcm9qZWN0YWJsZU1vZGVsPFQ+O1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IGFzeW5jID8gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4geyBtb2RlbC5yZWplY3QgPSByZWplY3Q7IG1vZGVsLnJlc29sdmUgPSByZXNvbHZlIH0pIDogbnVsbDtcclxuXHJcbiAgICBpZiAoIXF1ZXVlKSB7XHJcblxyXG4gICAgICB0aGlzLnByb2plY3Rpbmcuc2V0KHNjcmVlbiwgW3sgY29tcG9uZW50LCBtb2RlbCwgcHJvbWlzZSwgcXVldWUgfV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCF0aGlzLnByb2plY3RpbmcuaGFzKHNjcmVlbikpIHtcclxuICAgICAgICB0aGlzLnByb2plY3Rpbmcuc2V0KHNjcmVlbiwgW10pO1xyXG4gICAgICB9XHJcbiAgICAgICh0aGlzLnByb2plY3RpbmcuZ2V0KHNjcmVlbikgfHwgW10pLnB1c2goeyBjb21wb25lbnQsIG1vZGVsLCBwcm9taXNlLCBxdWV1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzcyA9IHRoaXMuc2NyZWVucy5nZXQoc2NyZWVuKTtcclxuICAgIGlmICghc3MpIHJldHVybiBudWxsO1xyXG4gICAgc3MubW9kZWwgPSBtb2RlbDtcclxuICAgIHNzLmN1cnJlbnRWaWV3ID0gY29tcG9uZW50O1xyXG5cclxuICAgIGlmIChwcm9taXNlKSBwcm9taXNlLnRoZW4oKCkgPT4gdGhpcy5zdG9wUHJvamVjdGluZyhzY3JlZW4pKS5jYXRjaCgoKSA9PiB0aGlzLnN0b3BQcm9qZWN0aW5nKHNjcmVlbikpO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuICBwcm9qZWN0QXN5bmNUbzxUPihjb21wb25lbnQ6IENvbXBvbmVudCwgZGF0YTogVCwgc2NyZWVuOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIiwgcXVldWU6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0VG8oY29tcG9uZW50LCBkYXRhLCBzY3JlZW4sIHF1ZXVlLCB0cnVlKVxyXG4gIH1cclxuXHJcbiAgc3RvcFByb2plY3Rpbmcoc2NyZWVuOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIikge1xyXG4gICAgaWYgKHRoaXMucHJvamVjdGluZy5oYXMoc2NyZWVuKSkge1xyXG4gICAgICAodGhpcy5wcm9qZWN0aW5nLmdldChzY3JlZW4pIHx8IFtdKS5wb3AoKVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBfc2NyZWVuID0gdGhpcy5zY3JlZW5zLmdldChzY3JlZW4pXHJcbiAgICBpZiAoX3NjcmVlbiAmJiBfc2NyZWVuLmN1cnJlbnRWaWV3KSB7XHJcbiAgICAgIF9zY3JlZW4ubW9kZWwgPSBudWxsO1xyXG4gICAgICBfc2NyZWVuLnNjcmVlbk1vZGVsID0gbnVsbDtcclxuICAgICAgX3NjcmVlbi5jdXJyZW50VmlldyA9IG51bGw7XHJcblxyXG4gICAgICBpZiAodGhpcy5wcm9qZWN0aW5nLmhhcyhzY3JlZW4pKSB7XHJcbiAgICAgICAgbGV0IHMgPSB0aGlzLnByb2plY3RpbmcuZ2V0KHNjcmVlbik7XHJcbiAgICAgICAgaWYgKHMgJiYgcy5sZW5ndGgpIHtcclxuICAgICAgICAgIGxldCBtID0gcy5wb3AoKTtcclxuICAgICAgICAgIGlmIChtKSB0aGlzLnByb2plY3RUbyhtLmNvbXBvbmVudCwgbS5tb2RlbCwgc2NyZWVuLCBtLnF1ZXVlLCAhIW0ucHJvbWlzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdGFibGU8VD4ge1xyXG4gIHZhbHVlOiB7XHJcbiAgICBkYXRhOiBULFxyXG4gICAgcmVzb2x2ZTogKGl0ZW06IFQpID0+IHZvaWQ7XHJcbiAgICByZWplY3Q6ICgpID0+IHZvaWQ7XHJcbiAgfTtcclxufSIsIlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudFB1YmxpY0luc3RhbmNlLCBjb21wdXRlZCwgZGVmaW5lQ29tcG9uZW50LCBnZXRDdXJyZW50SW5zdGFuY2UsIG9uTW91bnRlZCwgUmVmLCByZWYsIHdhdGNoIH0gZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgeyBJUHJvamVjdGFibGVNb2RlbCwgUHJvamVjdG9yIH0gZnJvbSBcIi4uL2hlbHBlcnMvUHJvamVjdG9yXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xyXG4gIG5hbWU6IFwic2NyZWVuXCIsXHJcbiAgcHJvcHM6IHtcclxuICAgIG5hbWU6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiBcImRlZmF1bHRzY3JlZW5cIiB9LFxyXG4gIH0sXHJcbiAgc2V0dXAocHJvcHMsIHsgZXhwb3NlIH0pIHtcclxuXHJcbiAgICBjb25zdCBtZSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRWaWV3OiBSZWY8Q29tcG9uZW50PiA9IHJlZihudWxsISk7XHJcbiAgICBjb25zdCBtb2RlbDogUmVmPElQcm9qZWN0YWJsZU1vZGVsPGFueT4gfCBudWxsPiA9IHJlZihudWxsISk7XHJcblxyXG4gICAgZXhwb3NlKHsgY3VycmVudFZpZXcsIG1vZGVsIH0pXHJcblxyXG4gICAgY29uc3QgaXNWaXNpYmxlID0gY29tcHV0ZWQoKCkgPT4ge1xyXG4gICAgICByZXR1cm4gY3VycmVudFZpZXcudmFsdWUgIT0gbnVsbDtcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgY3VycmVudFZpZXdVSUQgPSBjb21wdXRlZCgoKSA9PiB7XHJcbiAgICAgIHJldHVybiAoY3VycmVudFZpZXcudmFsdWUgYXMgYW55KT8uX19maWxlXHJcbiAgICB9KVxyXG5cclxuICAgIG9uTW91bnRlZCgoKSA9PiB7XHJcbiAgICAgIFByb2plY3Rvci5JbnN0YW5jZS5zZXRTY3JlZW4oKG1lIGFzIGFueSkucHJveHksIHByb3BzLm5hbWUpO1xyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjdXJyZW50Vmlld1VJRCxcclxuICAgICAgY3VycmVudFZpZXcsXHJcbiAgICAgIG1vZGVsLFxyXG4gICAgICBpc1Zpc2libGVcclxuICAgIH1cclxuICB9LFxyXG5cclxufSlcclxuIiwiY29uc3QgcHJvamVjdFRvRGlyZWN0aXZlID0ge1xyXG5cclxuICBpbnNlcnRlZDogKGVsOiBFbGVtZW50LCBiaW5kOiBhbnkpID0+IHtcclxuICAgIFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlLmluamVjdFRvKGVsLCBiaW5kLmFyZyk7XHJcbiAgfSxcclxuICB1bmJpbmQ6IChlbDogRWxlbWVudCwgYmluZDogYW55KSA9PiB7XHJcbiAgICBTY3JlZW5zTWFuYWdlci5JbnN0YW5jZS5yZW1vdmVGcm9tKGVsLCBiaW5kLmFyZylcclxuICB9XHJcbn1cclxuXHJcblxyXG5jb25zdCBzY3JlZW5EaXJlY3RpdmUgPSB7XHJcbiAgYmluZDogKGVsOiBhbnksIGJpbmRpbmc6IGFueSkgPT4ge1xyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgU2NyZWVuc01hbmFnZXIuSW5zdGFuY2Uuc2V0U2NyZWVuKGVsLCBiaW5kaW5nLmFyZyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcHJvamVjdFRvRGlyZWN0aXZlLCBzY3JlZW5EaXJlY3RpdmVcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNjcmVlbnNNYW5hZ2VyIHtcclxuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBTY3JlZW5zTWFuYWdlcigpO1xyXG4gIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogU2NyZWVuc01hbmFnZXIgeyByZXR1cm4gU2NyZWVuc01hbmFnZXIuaW5zdGFuY2UgfVxyXG4gIHN0YXRpYyBzZXQgSW5zdGFuY2UodjogU2NyZWVuc01hbmFnZXIpIHsgdGhpcy5pbnN0YW5jZSA9IHY7IH1cclxuICBwcml2YXRlIHNjcmVlbnMgPSBuZXcgTWFwPHN0cmluZywgRWxlbWVudD4oKTtcclxuICBcclxuXHJcbiAgaW5qZWN0VG8oZG9tRWxlbWVudDogRWxlbWVudCwgc2NyZWVuOiBzdHJpbmcpIHtcclxuICAgIGlmICghZG9tRWxlbWVudCB8fCAhc2NyZWVuKSByZXR1cm47XHJcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuc2NyZWVucy5oYXMoc2NyZWVuKSA/IHRoaXMuc2NyZWVucy5nZXQoc2NyZWVuKSA6IG51bGw7XHJcbiAgICB0cnkgeyBkb21FbGVtZW50LnBhcmVudEVsZW1lbnQgJiYgZG9tRWxlbWVudC5yZW1vdmVDaGlsZChkb21FbGVtZW50KTsgfSBjYXRjaCB7IH1cclxuICAgIGlmIChlbGVtZW50KSBlbGVtZW50LmFwcGVuZChkb21FbGVtZW50KTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb20oZG9tRWxlbWVudDogRWxlbWVudCwgc2NyZWVuOiBzdHJpbmcpIHtcclxuICAgIGlmICghZG9tRWxlbWVudCB8fCAhc2NyZWVuKSByZXR1cm47XHJcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuc2NyZWVucy5oYXMoc2NyZWVuKSA/IHRoaXMuc2NyZWVucy5nZXQoc2NyZWVuKSA6IG51bGw7XHJcbiAgICB0cnkgeyBpZiAoZWxlbWVudCkgZWxlbWVudC5yZW1vdmVDaGlsZChkb21FbGVtZW50KSB9IGNhdGNoIHsgfVxyXG4gIH1cclxuXHJcbiAgc2V0U2NyZWVuKHNjcmVlbjogRWxlbWVudCwgbmFtZTogc3RyaW5nID0gXCJkZWZhdWx0c2NyZWVuXCIpIHtcclxuICAgIHRoaXMuc2NyZWVucy5zZXQobmFtZSwgc2NyZWVuKTtcclxuICB9XHJcbn0iLCJmdW5jdGlvbiBjaGVja0lucHV0VmFsaWRhdGlvbihhOiBFdmVudCwgY2FsbG91dDogKGVycm9yczogc3RyaW5nW10sIHZhbGlkOiBib29sZWFuKSA9PiB2b2lkKSB7XHJcbiAgaWYgKChhLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWxpZGl0eSkge1xyXG4gICAgbGV0IGVsID0gKGEudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpO1xyXG5cclxuICAgIGlmIChlbC52YWxpZGl0eSkge1xyXG4gICAgICBsZXQgZXJyb3JzID0gW1xyXG4gICAgICAgIGVsLnZhbGlkaXR5LmJhZElucHV0ID8gXCJiYWQgaW5wdXRcIiA6IG51bGwsXHJcbiAgICAgICAgZWwudmFsaWRpdHkuY3VzdG9tRXJyb3IgPyBcImN1c3RvbSBlcnJvclwiIDogbnVsbCxcclxuICAgICAgICBlbC52YWxpZGl0eS5wYXR0ZXJuTWlzbWF0Y2ggPyBcInBhdHRlcm4gbWlzbWF0Y2hcIiA6IG51bGwsXHJcbiAgICAgICAgZWwudmFsaWRpdHkucmFuZ2VPdmVyZmxvdyA/IFwicmFuZ2Ugb3ZlcmZsb3dcIiA6IG51bGwsXHJcbiAgICAgICAgZWwudmFsaWRpdHkucmFuZ2VVbmRlcmZsb3cgPyBcInJhbmdlIHVuZGVyZmxvd1wiIDogbnVsbCxcclxuICAgICAgICBlbC52YWxpZGl0eS5zdGVwTWlzbWF0Y2ggPyBcInN0ZXAgbWlzbWF0Y2hcIiA6IG51bGwsXHJcbiAgICAgICAgZWwudmFsaWRpdHkudG9vTG9uZyA/IFwidG9vIGxvbmdcIiA6IG51bGwsXHJcbiAgICAgICAgZWwudmFsaWRpdHkudG9vU2hvcnQgPyBcInRvbyBzaG9ydFwiIDogbnVsbCxcclxuICAgICAgICBlbC52YWxpZGl0eS50eXBlTWlzbWF0Y2ggPyBcInR5cGUgbWlzbWF0Y2hcIiA6IG51bGwsXHJcbiAgICAgICAgZWwudmFsaWRpdHkudmFsdWVNaXNzaW5nID8gXCJ2YWx1ZSBtaXNzaW5nXCIgOiBudWxsXS5maWx0ZXIoaSA9PiAhIWkpXHJcblxyXG4gICAgICBjYWxsb3V0KGVycm9ycyBhcyBzdHJpbmdbXSwgZWwudmFsaWRpdHkudmFsaWQgIT0gdW5kZWZpbmVkID8gZWwudmFsaWRpdHkudmFsaWQgOiB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZSA9IHtcclxuICBpbnNlcnRlZDogKGVsOiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudCB8IEhUTUxTZWxlY3RFbGVtZW50LCBiaW5kOiB7XHJcbiAgICB2YWx1ZTogKGVycm9yczogc3RyaW5nW10sIHZhbGlkOiBib29sZWFuKSA9PiB2b2lkLFxyXG4gICAgYXJnOiBcImltbWVkaWF0ZVwiXHJcbiAgfSkgPT4ge1xyXG4gICAgaWYgKCFlbCB8fCAhZWwud2lsbFZhbGlkYXRlKSByZXR1cm47XHJcbiAgICBzd2l0Y2ggKGVsLm5vZGVOYW1lKSB7XHJcbiAgICAgIGNhc2UgXCJJTlBVVFwiOlxyXG4gICAgICBjYXNlIFwiVEVYVEFSRUFcIjogZWwub25ibHVyID0gKGFyZykgPT4gY2hlY2tJbnB1dFZhbGlkYXRpb24oYXJnLCBiaW5kLnZhbHVlKTsgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJTRUxFQ1RcIjogZWwub25jaGFuZ2UgPSAoYXJnKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbihhcmcsIGJpbmQudmFsdWUpOyBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBlbC5vbmludmFsaWQgPSAoYXJnKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbihhcmcsIGJpbmQudmFsdWUpO1xyXG4gICAgaWYgKGVsLmZvcm0pIGVsLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignaW52YWxpZCcsICgpID0+IGNoZWNrSW5wdXRWYWxpZGF0aW9uKHsgdGFyZ2V0OiBlbCB9IGFzIGFueSwgYmluZC52YWx1ZSkpXHJcblxyXG4gICAgaWYgKGJpbmQuYXJnID09IFwiaW1tZWRpYXRlXCIpIGVsLnJlcG9ydFZhbGlkaXR5KCk7XHJcbiAgICBlbHNlIGNoZWNrSW5wdXRWYWxpZGF0aW9uKHsgdGFyZ2V0OiBlbCB9IGFzIGFueSwgYmluZC52YWx1ZSlcclxuICB9LFxyXG4gIHVuYmluZDogKGVsOiBFbGVtZW50KSA9PiB7XHJcbiAgICBpZiAoIWVsKSByZXR1cm47XHJcblxyXG4gIH0sXHJcbn1cclxuIiwiaW1wb3J0IHsgTWVudUhlbHBlciwgbWVudVR5cGUsIE1lbnVOb3RpZmljYXRpb25zLCBJTWVudURlZmluaXRpb24gfSBmcm9tIFwiLi9oZWxwZXJzL01lbnVIZWxwZXJcIjtcclxuaW1wb3J0IHsgQ29tbW9uUmVnaXN0cnkgfSBmcm9tIFwiLi9oZWxwZXJzL0NvbW1vblJlZ2lzdHJ5XCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSBcIi4vaGVscGVycy9NZXNzYWdlU2VydmljZVwiO1xyXG5pbXBvcnQgeyBJUm91dGVDb25maWcgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL1JvdXRlckludGVyZmFjZXNcIjtcclxuaW1wb3J0IHsgSVN0b3JlIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9TdG9yZUludGVyZmFjZXNcIjtcclxuaW1wb3J0IEluamVjdCBmcm9tIFwiLi9jb21wb25lbnRzL2luamVjdC52dWVcIjtcclxuaW1wb3J0IFNjcmVlbiBmcm9tIFwiLi9jb21wb25lbnRzL3NjcmVlbi52dWVcIjtcclxuaW1wb3J0IHsgVnVlQ29uc3RydWN0b3IgfSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCB7IElQcm9qZWN0YWJsZU1vZGVsLCBQcm9qZWN0YWJsZSwgUHJvamVjdG9yIH0gZnJvbSBcIi4vaGVscGVycy9Qcm9qZWN0b3JcIjtcclxuaW1wb3J0IGRpcmVjdGl2ZXMsIHsgU2NyZWVuc01hbmFnZXIgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL3NjcmVlblwiO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZSBhcyBWYWxpZGF0ZURpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvdmFsaWRhdGVcIjtcclxuXHJcblxyXG5mdW5jdGlvbiBpbnN0YWxsKFZ1ZTogVnVlQ29uc3RydWN0b3IpIHtcclxuICBWdWUuY29tcG9uZW50KFwic2NyZWVuXCIsIFNjcmVlbik7XHJcbiAgVnVlLmNvbXBvbmVudChcImluamVjdFwiLCBJbmplY3QpO1xyXG4gIFZ1ZS5kaXJlY3RpdmUoXCJzY3JlZW5cIiwgZGlyZWN0aXZlcy5zY3JlZW5EaXJlY3RpdmUpO1xyXG4gIFZ1ZS5kaXJlY3RpdmUoXCJwcm9qZWN0VG9cIiwgZGlyZWN0aXZlcy5wcm9qZWN0VG9EaXJlY3RpdmUpO1xyXG4gIFZ1ZS5kaXJlY3RpdmUoXCJ2YWxpZGF0ZVwiLCBWYWxpZGF0ZURpcmVjdGl2ZSBhcyBhbnkpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTW9kdWxlSW5pdGlhbGl6ZXIge1xyXG4gIGluaXQodnVlbWY6IHR5cGVvZiBWdWVNZk1vZHVsZSwgbWVudTogTWVudUhlbHBlciwgc3RvcmU6IElTdG9yZSwgY29uZmlndXJhdGlvbjogYW55KTogUHJvbWlzZTx2b2lkPixcclxuXHJcbiAgY29uZmlnPyhtZW51OiBNZW51SGVscGVyLCBzdG9yZTogSVN0b3JlLCBjb25maWd1cmF0aW9uOiBhbnkpOiBQcm9taXNlPHZvaWQ+LFxyXG5cclxuICBydW4/KG1lbnU6IE1lbnVIZWxwZXIsIHN0b3JlOiBJU3RvcmUsIGNvbmZpZ3VyYXRpb246IGFueSk6IFByb21pc2U8dm9pZD4sXHJcblxyXG4gIHJvdXRlczogSVJvdXRlQ29uZmlnW11cclxufVxyXG5cclxuaW50ZXJmYWNlIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXIge1xyXG4gIGluaXQobWVudTogTWVudUhlbHBlcixcclxuICAgIHN0b3JlOiBJU3RvcmUsXHJcbiAgICBjb25maWd1cmF0aW9uOiBhbnlcclxuICAgICwgb3B0aW9uczoge1xyXG4gICAgICByZWdpc3RyeTogQ29tbW9uUmVnaXN0cnksXHJcbiAgICAgIG1lc3NhZ2VTZXJ2aWNlOiB0eXBlb2YgTWVzc2FnZVNlcnZpY2UuSW5zdGFuY2UsXHJcbiAgICAgIHByb2plY3RvcjogUHJvamVjdG9yLFxyXG4gICAgICBzY3JlZW5zOiBTY3JlZW5zTWFuYWdlclxyXG4gICAgfSk6IFByb21pc2U8dm9pZD4sXHJcbiAgY29uZmlnKG1lbnU6IE1lbnVIZWxwZXIsXHJcbiAgICBzdG9yZTogSVN0b3JlKTogUHJvbWlzZTx2b2lkPixcclxuICBydW4obWVudTogTWVudUhlbHBlcixcclxuICAgIHN0b3JlOiBJU3RvcmUpOiBQcm9taXNlPHZvaWQ+LFxyXG4gIHJvdXRlczogSVJvdXRlQ29uZmlnW11cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1vZHVsZUluaXRpYWxpemVyKG9wdHM6IElNb2R1bGVJbml0aWFsaXplcikge1xyXG4gIGxldCBtb2R1bGVDb25maWcgPSB7fTtcclxuICByZXR1cm4ge1xyXG4gICAgaW5pdChtZW51OiBNZW51SGVscGVyLCBzdG9yZTogSVN0b3JlLCBjb25maWd1cmF0aW9uOiBhbnksXHJcbiAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICByZWdpc3RyeTogQ29tbW9uUmVnaXN0cnksXHJcbiAgICAgICAgbWVzc2FnZVNlcnZpY2U6IHR5cGVvZiBNZXNzYWdlU2VydmljZS5JbnN0YW5jZSxcclxuICAgICAgICBwcm9qZWN0b3I6IFByb2plY3RvcixcclxuICAgICAgICBzY3JlZW5zOiBTY3JlZW5zTWFuYWdlclxyXG4gICAgICB9KSB7XHJcblxyXG4gICAgICBpZiAob3B0aW9ucy5yZWdpc3RyeSkgQ29tbW9uUmVnaXN0cnkuSW5zdGFuY2UgPSBvcHRpb25zLnJlZ2lzdHJ5O1xyXG4gICAgICBpZiAob3B0aW9ucy5tZXNzYWdlU2VydmljZSkgTWVzc2FnZVNlcnZpY2UuSW5zdGFuY2UgPSBvcHRpb25zLm1lc3NhZ2VTZXJ2aWNlXHJcbiAgICAgIGlmIChvcHRpb25zLnByb2plY3RvcikgUHJvamVjdG9yLkluc3RhbmNlID0gb3B0aW9ucy5wcm9qZWN0b3I7XHJcbiAgICAgIGlmIChvcHRpb25zLnNjcmVlbnMpIFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlID0gb3B0aW9ucy5zY3JlZW5zO1xyXG4gICAgICBtb2R1bGVDb25maWcgPSBjb25maWd1cmF0aW9uO1xyXG4gICAgICByZXR1cm4gb3B0cy5pbml0KFZ1ZU1mTW9kdWxlLCBtZW51LCBzdG9yZSwgY29uZmlndXJhdGlvbik7XHJcbiAgICB9LFxyXG4gICAgY29uZmlnKG1lbnU6IE1lbnVIZWxwZXIsIHN0b3JlOiBJU3RvcmUpIHtcclxuICAgICAgcmV0dXJuIG9wdHMuY29uZmlnID8gb3B0cy5jb25maWcobWVudSwgc3RvcmUsIG1vZHVsZUNvbmZpZykgOiBudWxsO1xyXG4gICAgfSxcclxuICAgIHJ1bihtZW51OiBNZW51SGVscGVyLCBzdG9yZTogSVN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBvcHRzLnJ1biA/IG9wdHMucnVuKG1lbnUsIHN0b3JlLCBtb2R1bGVDb25maWcpIDogbnVsbDtcclxuICAgIH0sXHJcbiAgICByb3V0ZXM6IG9wdHMucm91dGVzXHJcbiAgfSBhcyBJTW9kdWxlSW5pdGlhbGl6ZXJXcmFwcGVyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJbml0TW9kdWxlKG1vZHVsZTogYW55LCBzdG9yZTogSVN0b3JlLCBjb25maWd1cmF0aW9uOiBhbnkgfCB1bmRlZmluZWQpOiBQcm9taXNlPElNb2R1bGVJbml0aWFsaXplcj4ge1xyXG4gIGNvbnN0IGluaXRvYmogPSAobW9kdWxlLmRlZmF1bHQuZGVmYXVsdCB8fCBtb2R1bGUuZGVmYXVsdCkgYXMgSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlcjtcclxuICByZXR1cm4gaW5pdG9iai5pbml0KE1lbnVIZWxwZXIuSW5zdGFuY2UsIHN0b3JlLCBjb25maWd1cmF0aW9uIHx8IHt9LFxyXG4gICAge1xyXG4gICAgICByZWdpc3RyeTogQ29tbW9uUmVnaXN0cnkuSW5zdGFuY2UsXHJcbiAgICAgIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZS5JbnN0YW5jZSxcclxuICAgICAgcHJvamVjdG9yOiBQcm9qZWN0b3IuSW5zdGFuY2UsXHJcbiAgICAgIHNjcmVlbnM6IFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlXHJcbiAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgcmV0dXJuIGluaXRvYmogYXMgdW5rbm93biBhcyBJTW9kdWxlSW5pdGlhbGl6ZXI7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIENvbmZpZ01vZHVsZShtb2R1bGU6IGFueSwgc3RvcmU6IElTdG9yZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gIGNvbnN0IGluaXRvYmogPSAobW9kdWxlLmRlZmF1bHQuZGVmYXVsdCB8fCBtb2R1bGUuZGVmYXVsdCkgYXMgSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlcjtcclxuICByZXR1cm4gaW5pdG9iai5jb25maWcoTWVudUhlbHBlci5JbnN0YW5jZSwgc3RvcmUpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJ1bk1vZHVsZShtb2R1bGU6IGFueSwgc3RvcmU6IElTdG9yZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gIGNvbnN0IGluaXRvYmogPSAobW9kdWxlLmRlZmF1bHQuZGVmYXVsdCB8fCBtb2R1bGUuZGVmYXVsdCkgYXMgSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlcjtcclxuICByZXR1cm4gaW5pdG9iai5ydW4oTWVudUhlbHBlci5JbnN0YW5jZSwgc3RvcmUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTW9kdWxlUm91dGVzKG1vZHVsZTogYW55KTogSVJvdXRlQ29uZmlnW10ge1xyXG4gIGNvbnN0IGluaXRvYmogPSAobW9kdWxlLmRlZmF1bHQuZGVmYXVsdCB8fCBtb2R1bGUuZGVmYXVsdCkgYXMgSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlcjtcclxuICByZXR1cm4gaW5pdG9iai5yb3V0ZXM7XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgTWVudUhlbHBlcixcclxuICB0eXBlIElNZW51RGVmaW5pdGlvbixcclxuICBtZW51VHlwZSxcclxuICBDb21tb25SZWdpc3RyeSxcclxuICBNZXNzYWdlU2VydmljZSxcclxuICBJbmplY3QsXHJcbiAgU2NyZWVuLFxyXG4gIFZhbGlkYXRlRGlyZWN0aXZlLFxyXG4gIHR5cGUgUHJvamVjdGFibGUsXHJcbiAgdHlwZSBJUHJvamVjdGFibGVNb2RlbCxcclxuICBNZW51Tm90aWZpY2F0aW9ucyxcclxuICBQcm9qZWN0b3IsXHJcbn1cclxuXHJcbmNvbnN0IFZ1ZU1mTW9kdWxlID0ge1xyXG4gIGluc3RhbGwsXHJcbiAgTWVudUhlbHBlcjogbmV3IE1lbnVIZWxwZXIoKSxcclxuICBtZW51VHlwZSxcclxuICBDb21tb25SZWdpc3RyeTogbmV3IENvbW1vblJlZ2lzdHJ5KCksXHJcbiAgTWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxyXG4gIEluamVjdCxcclxuICBTY3JlZW4sXHJcbiAgVmFsaWRhdGVEaXJlY3RpdmUsXHJcbiAgTWVudU5vdGlmaWNhdGlvbnMsXHJcbiAgUHJvamVjdG9yXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZ1ZU1mTW9kdWxlO1xyXG4iXSwibmFtZXMiOlsiRSIsIm5hbWUiLCJjYWxsYmFjayIsImN0eCIsImUiLCJzZWxmIiwibGlzdGVuZXIiLCJkYXRhIiwiZXZ0QXJyIiwiaSIsImxlbiIsImV2dHMiLCJsaXZlRXZlbnRzIiwidGlueUVtaXR0ZXJNb2R1bGUiLCJUaW55RW1pdHRlciIsInRpbnlFbWl0dGVyIiwibWVudVR5cGUiLCJtZW51VHlwZTIiLCJNZW51Tm90aWZpY2F0aW9ucyIsIl9NZW51SGVscGVyIiwiX19wdWJsaWNGaWVsZCIsIm1lbnVEZWZpbml0aW9uIiwicG9zaXRpb25zIiwiZm91bmQiLCJtIiwiZWxlbWVudCIsIm1lbnUiLCJyZXN1bHQiLCJ1c2VkIiwia2V5IiwicnIiLCJiIiwiYSIsIk1lbnVIZWxwZXIiLCJfQ29tbW9uUmVnaXN0cnkiLCJ2IiwiY29tcG9uZW50IiwiZ3JvdXAiLCJnZyIsImciLCJzZXJ2aWNlIiwiQ29tbW9uUmVnaXN0cnkiLCJhc2tSZXBseUNoYW5uZWxzIiwic2VuZFN1YnNjcmliZUNoYW5uZWxzIiwic2VuZFN1YnNjcmliZUNhbGxiYWNrcyIsImFzayIsImFyZ3MiLCJyZXNvbHZlIiwicG9ydCIsIl9hIiwiYyIsImlubmVyY2hhbm5lbCIsImwiLCJldnQiLCJyZXBseSIsImNiIiwib3B0cyIsImlubmVycG9ydCIsInIiLCJzZW5kIiwic3Vic2NyaWJlIiwib25jZSIsInVuc3Vic2NpYmUiLCJ1bnN1YnNjcmliZSIsIk1lc3NhZ2VTZXJ2aWNlIiwiX3NmY19tYWluJDEiLCJkZWZpbmVDb21wb25lbnQiLCJwcm9wcyIsImVtaXQiLCJWYWx1ZSIsImNvbXB1dGVkIiwiQ29tcG9uZW50cyIsImNsaWNrIiwic2F2ZSIsIl9Qcm9qZWN0b3IiLCJzY3JlZW4iLCJxdWV1ZSIsImFzeW5jIiwibW9kZWwiLCJwcm9taXNlIiwicmVqZWN0Iiwic3MiLCJfc2NyZWVuIiwicyIsIlByb2plY3RvciIsIl9zZmNfbWFpbiIsImV4cG9zZSIsIm1lIiwiZ2V0Q3VycmVudEluc3RhbmNlIiwiY3VycmVudFZpZXciLCJyZWYiLCJpc1Zpc2libGUiLCJjdXJyZW50Vmlld1VJRCIsIm9uTW91bnRlZCIsInByb2plY3RUb0RpcmVjdGl2ZSIsImVsIiwiYmluZCIsIlNjcmVlbnNNYW5hZ2VyIiwic2NyZWVuRGlyZWN0aXZlIiwiYmluZGluZyIsImRpcmVjdGl2ZXMiLCJfU2NyZWVuc01hbmFnZXIiLCJkb21FbGVtZW50IiwiY2hlY2tJbnB1dFZhbGlkYXRpb24iLCJjYWxsb3V0IiwiZXJyb3JzIiwidmFsaWRhdGUiLCJhcmciLCJpbnN0YWxsIiwiVnVlIiwiU2NyZWVuIiwiSW5qZWN0IiwiVmFsaWRhdGVEaXJlY3RpdmUiLCJNb2R1bGVJbml0aWFsaXplciIsIm1vZHVsZUNvbmZpZyIsInN0b3JlIiwiY29uZmlndXJhdGlvbiIsIm9wdGlvbnMiLCJWdWVNZk1vZHVsZSIsIkluaXRNb2R1bGUiLCJtb2R1bGUiLCJpbml0b2JqIiwiQ29uZmlnTW9kdWxlIiwiUnVuTW9kdWxlIiwiTW9kdWxlUm91dGVzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBLFNBQVNBLElBQUs7QUFHZDtBQUVBQSxFQUFFLFlBQVk7QUFBQSxFQUNaLElBQUksU0FBVUMsR0FBTUMsR0FBVUMsR0FBSztBQUNqQyxRQUFJQyxJQUFJLEtBQUssTUFBTSxLQUFLLElBQUksQ0FBQTtBQUU1QixZQUFDQSxFQUFFSCxPQUFVRyxFQUFFSCxLQUFRLENBQUEsSUFBSyxLQUFLO0FBQUEsTUFDL0IsSUFBSUM7QUFBQSxNQUNKLEtBQUtDO0FBQUEsSUFDWCxDQUFLLEdBRU07QUFBQSxFQUNSO0FBQUEsRUFFRCxNQUFNLFNBQVVGLEdBQU1DLEdBQVVDLEdBQUs7QUFDbkMsUUFBSUUsSUFBTztBQUNYLGFBQVNDLElBQVk7QUFDbkIsTUFBQUQsRUFBSyxJQUFJSixHQUFNSyxDQUFRLEdBQ3ZCSixFQUFTLE1BQU1DLEdBQUssU0FBUztBQUFBLElBRW5DO0FBQ0ksV0FBQUcsRUFBUyxJQUFJSixHQUNOLEtBQUssR0FBR0QsR0FBTUssR0FBVUgsQ0FBRztBQUFBLEVBQ25DO0FBQUEsRUFFRCxNQUFNLFNBQVVGLEdBQU07QUFDcEIsUUFBSU0sSUFBTyxDQUFBLEVBQUcsTUFBTSxLQUFLLFdBQVcsQ0FBQyxHQUNqQ0MsTUFBVyxLQUFLLE1BQU0sS0FBSyxJQUFJLENBQUEsSUFBS1AsTUFBUyxDQUFFLEdBQUUsTUFBSyxHQUN0RFEsSUFBSSxHQUNKQyxJQUFNRixFQUFPO0FBRWpCLFNBQUtDLEdBQUdBLElBQUlDLEdBQUtEO0FBQ2YsTUFBQUQsRUFBT0MsR0FBRyxHQUFHLE1BQU1ELEVBQU9DLEdBQUcsS0FBS0YsQ0FBSTtBQUd4QyxXQUFPO0FBQUEsRUFDUjtBQUFBLEVBRUQsS0FBSyxTQUFVTixHQUFNQyxHQUFVO0FBQzdCLFFBQUlFLElBQUksS0FBSyxNQUFNLEtBQUssSUFBSSxDQUFBLElBQ3hCTyxJQUFPUCxFQUFFSCxJQUNUVyxJQUFhLENBQUE7QUFFakIsUUFBSUQsS0FBUVQ7QUFDVixlQUFTTyxJQUFJLEdBQUdDLElBQU1DLEVBQUssUUFBUUYsSUFBSUMsR0FBS0Q7QUFDMUMsUUFBSUUsRUFBS0YsR0FBRyxPQUFPUCxLQUFZUyxFQUFLRixHQUFHLEdBQUcsTUFBTVAsS0FDOUNVLEVBQVcsS0FBS0QsRUFBS0YsRUFBRTtBQVE3QixXQUFDRyxFQUFXLFNBQ1JSLEVBQUVILEtBQVFXLElBQ1YsT0FBT1IsRUFBRUgsSUFFTjtBQUFBLEVBQ1I7QUFDSDtBQUVBWSxFQUFjLFVBQUdiO0FBQ2pCLElBQUFjLElBQUFDLEVBQUFBLFFBQUEsY0FBNkJmLEdDbkRqQmdCLHNCQUFBQSxPQUNWQSxFQUFBQyxFQUFBLFNBQUEsS0FBQSxVQUNBRCxFQUFBQyxFQUFBLFNBQUEsS0FBQSxVQUNBRCxFQUFBQyxFQUFBLFNBQUEsS0FBQSxVQUhVRCxJQUFBQSxLQUFBLENBQUEsQ0FBQTtBQU1MLE1BQU1FLElBQW9CO0FBQUEsRUFDL0IscUJBQXFCO0FBQ3ZCLEdBRWFDLElBQU4sTUFBaUI7QUFBQSxFQUFqQjtBQUVHLElBQUFDLEVBQUEseUJBQXFDLENBQUE7QUFDckMsSUFBQUEsRUFBQSx1QkFBZ0UsQ0FBQTtBQUNoRSxJQUFBQSxFQUFBLHVCQUE2QixJQUFJTjs7RUFFekMsSUFBVyxnQkFBZ0I7QUFBRSxXQUFPLEtBQUs7QUFBQSxFQUFlO0FBQUEsRUFDeEQsV0FBa0IsV0FBVztBQUFFLFdBQU9LLEVBQVc7QUFBQSxFQUFTO0FBQUEsRUFFbkQsa0JBQWtCRSxNQUFvQ0MsR0FBcUQ7QUFHNUcsUUFBQUMsSUFBUSxLQUFLLGdCQUFnQixLQUFLLE9BQUtDLEVBQUUsUUFBUUgsRUFBZSxJQUFJO0FBQ3hFLElBQUtFLElBR2NGLElBQUFFLElBRlosS0FBQSxnQkFBZ0IsS0FBS0YsQ0FBYztBQUkxQyxlQUFXSSxLQUFXSDtBQUVwQixXQUFLLGNBQWNHLEVBQVEsV0FBVyxLQUFLLGNBQWNBLEVBQVEsWUFBWSxJQUM3RSxLQUFLLGNBQWNBLEVBQVEsU0FBU0EsRUFBUSxVQUFVSixFQUFlLFFBQVEsS0FBSyxjQUFjSSxFQUFRLFNBQVNBLEVBQVEsVUFBVUosRUFBZSxTQUFTLElBRXZKSSxFQUFRLFVBQ1YsS0FBSyxjQUFjQSxFQUFRLFNBQVNBLEVBQVEsUUFBUSxLQUFLSixFQUFlLElBQUk7QUFHaEYsU0FBSyxjQUFjLEtBQUtILEVBQWtCLHFCQUFxQkcsQ0FBYztBQUFBLEVBQy9FO0FBQUEsRUFFTyxZQUFZcEIsR0FBMkM7QUFDNUQsV0FBTyxLQUFLLGdCQUFnQixLQUFLLENBQUtRLE1BQUFBLEVBQUUsUUFBUVIsQ0FBSTtBQUFBLEVBQ3REO0FBQUEsRUFFTyxRQUFReUIsR0FBb0c7QUFDakgsUUFBSUMsSUFBNkYsQ0FBQSxHQUM3RkMsd0JBQVc7QUFFSixlQUFBQyxLQUFPLEtBQUssY0FBY0gsSUFBTztBQUNwQyxZQUFBRCxJQUFVLEtBQUssY0FBY0MsR0FBTUc7QUFHekMsVUFBSUMsSUFBSztBQUFBLFFBQ1AsTUFBTSxLQUFLLGdCQUFnQixLQUFLLENBQUtOLE1BQzVCQSxFQUFFLFFBQVFLLE1BQ2QsQ0FBQ0wsRUFBRSxVQUFVLENBQUNBLEVBQUUsT0FBTyxFQUMzQjtBQUFBLFFBRUQsVUFBVUMsRUFBUSxJQUFJLENBQUFoQixNQUFLLEtBQUssZ0JBQWdCLEtBQUssQ0FBQWUsTUFBS0EsRUFBRSxRQUFRZixNQUFNLENBQUNlLEVBQUUsVUFBVSxDQUFDQSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQ2pHLE9BQU8sQ0FBQWYsTUFBSyxDQUFDLENBQUNBLENBQUMsRUFDZixLQUFLLENBQUMsR0FBR3NCLE1BQ0osS0FBS0EsS0FBSyxFQUFFLGNBQWNBLEVBQUUsY0FBYyxFQUFFLGFBQWFBLEVBQUUsYUFBbUIsSUFDOUUsS0FBS0EsS0FBSyxFQUFFLGNBQWNBLEVBQUUsY0FBYyxFQUFFLGFBQWFBLEVBQUUsYUFBbUIsS0FDM0UsQ0FDUjtBQUFBLE1BQUE7QUFHRCxNQUFFRCxFQUFHLFNBQ1BGLEVBQUssSUFBSUMsQ0FBRyxHQUNaSixFQUFRLFFBQVEsQ0FBQWhCLE1BQUttQixFQUFLLElBQUluQixDQUFDLENBQUMsR0FDaENrQixFQUFPLEtBQUtHLENBQUU7QUFBQSxJQUVsQjtBQUNPLFdBQUFILEVBQU8sT0FBTyxDQUFBLE1BQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUMvQixLQUFLLENBQUNLLEdBQUdELE1BQ0pDLEtBQUtELEtBQUtDLEVBQUUsUUFBUUQsRUFBRSxRQUFRQyxFQUFFLEtBQUssY0FBY0QsRUFBRSxLQUFLLGNBQWNDLEVBQUUsS0FBSyxhQUFhRCxFQUFFLEtBQUssYUFBbUIsSUFDdEhDLEtBQUtELEtBQUtDLEVBQUUsUUFBUUQsRUFBRSxRQUFRQyxFQUFFLEtBQUssY0FBY0QsRUFBRSxLQUFLLGNBQWNDLEVBQUUsS0FBSyxhQUFhRCxFQUFFLEtBQUssYUFBbUIsS0FDbkgsQ0FDUjtBQUFBLEVBQ0w7QUFDRjtBQXRFTyxJQUFNRSxJQUFOZDtBQUtMQyxFQUxXYSxHQUtJLFlBQVcsSUFBSWQ7QUM3QnpCLE1BQU1lLElBQU4sTUFBcUI7QUFBQSxFQUFyQjtBQUVHLElBQUFkLEVBQUEsc0NBQWU7QUFDZixJQUFBQSxFQUFBLDZDQUFzQjtBQUN0QixJQUFBQSxFQUFBLDZDQUFzQjtBQUN0QixJQUFBQSxFQUFBLG9EQUE2Qjs7RUFJckMsV0FBVyxXQUFXO0FBQUUsV0FBTyxLQUFLO0FBQUEsRUFBVTtBQUFBLEVBQzlDLFdBQVcsU0FBU2UsR0FBbUI7QUFBRSxTQUFLLFdBQVdBO0FBQUEsRUFBRTtBQUFBLEVBRTNELGlCQUFpQkMsR0FBZ0JuQyxHQUFjb0MsR0FBZ0I7QUFFN0QsUUFEQSxLQUFLLFNBQVMsSUFBSUEsSUFBUSxHQUFHQSxLQUFTcEMsTUFBU0EsR0FBTW1DLENBQVMsR0FDMURDLEdBQU87QUFDVCxNQUFLLEtBQUssZ0JBQWdCLElBQUlBLENBQUssS0FBRyxLQUFLLGdCQUFnQixJQUFJQSxHQUFPLG9CQUFJLElBQWtCLENBQUE7QUFFNUYsVUFBSUMsSUFBSyxLQUFLLGdCQUFnQixJQUFJRCxDQUFLO0FBQ25DLE1BQUFDLEtBQU9BLEVBQUEsSUFBSXJDLEdBQU1tQyxDQUFTO0FBQUEsSUFDaEM7QUFBQSxFQUNGO0FBQUEsRUFFQSxhQUFhbkMsR0FBY29DLEdBQTRCO0FBQzlDLFdBQUEsS0FBSyxTQUFTLElBQUlBLElBQVEsR0FBR0EsS0FBU3BDLE1BQVNBLENBQUksS0FBSztBQUFBLEVBQ2pFO0FBQUEsRUFFQSxpQkFBaUJBLEdBQXlCO0FBQ3hDLFdBQU8sTUFBTSxLQUFLLEtBQUssU0FBUyxRQUFRLENBQUMsRUFBRSxPQUFPLENBQUFRLE1BQUtSLEVBQUssUUFBUVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQUEsTUFBS0EsRUFBRSxFQUFFO0FBQUEsRUFDL0Y7QUFBQSxFQUVBLG1CQUFtQjRCLE1BQWtCcEMsR0FBeUI7QUFDNUQsUUFBSXNDLElBQUksS0FBSyxnQkFBZ0IsSUFBSUYsQ0FBSztBQUNsQyxXQUFBRSxJQUNLLE1BQU0sS0FBS0EsRUFBRSxRQUFRLEtBQUssQ0FBQSxDQUFFLEVBQUUsT0FBTyxDQUFBLE1BQU0sQ0FBQ3RDLEtBQVFBLEVBQUssVUFBVSxLQUFNQSxFQUFLLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBSyxNQUFBLEVBQUUsRUFBRSxJQUNqSDtFQUNUO0FBQUEsRUFFQSx1QkFBdUJvQyxHQUEyQjtBQUNoRCxRQUFJRSxJQUFJLEtBQUssZ0JBQWdCLElBQUlGLENBQUs7QUFDbEMsV0FBQUUsSUFBVSxNQUFNLEtBQUtBLEVBQUUsS0FBTSxDQUFBLElBQzFCO0VBQ1Q7QUFBQSxFQUVBLGVBQWV0QyxHQUFjdUMsR0FBY0gsR0FBZ0I7QUFFekQsUUFESyxLQUFBLGdCQUFnQixJQUFJcEMsR0FBTXVDLENBQU8sR0FDbENILEdBQU87QUFDVCxNQUFLLEtBQUssdUJBQXVCLElBQUlBLENBQUssS0FBRyxLQUFLLHVCQUF1QixJQUFJQSxHQUFPLG9CQUFJLElBQWtCLENBQUE7QUFDMUcsVUFBSUMsSUFBSyxLQUFLLHVCQUF1QixJQUFJRCxDQUFLO0FBQzFDLE1BQUFDLEtBQU9BLEVBQUEsSUFBSXJDLEdBQU11QyxDQUFPO0FBQUEsSUFDOUI7QUFBQSxFQUNGO0FBQUEsRUFFQSxXQUFjdkMsR0FBYztBQUMxQixXQUFRLEtBQUssZ0JBQWdCLElBQUlBLENBQUksS0FBSztBQUFBLEVBQzVDO0FBQUEsRUFFQSxpQkFBaUJvQyxNQUFrQnBDLEdBQXlCO0FBQzFELFFBQUlzQyxJQUFJLEtBQUssdUJBQXVCLElBQUlGLENBQUs7QUFDekMsV0FBQUUsSUFDSyxNQUFNLEtBQUtBLEVBQUUsUUFBUSxLQUFLLENBQUEsQ0FBRSxFQUFFLE9BQU8sQ0FBQSxNQUFNLENBQUN0QyxLQUFRQSxFQUFLLFVBQVUsS0FBTUEsRUFBSyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUssTUFBQSxFQUFFLEVBQUUsSUFDakg7RUFDVDtBQUNGO0FBOURPLElBQU13QyxJQUFOUDtBQVFMZCxFQVJXcUIsR0FRSSxZQUEyQixJQUFJUDtBQ1RoRCxNQUFNUSx3QkFBdUIsT0FDdkJDLHdCQUE0QixPQUM1QkMsd0JBQTZCLE9BRTdCQyxJQUFNLENBQUk1QyxNQUFpQjZDLE1BQ3hCLElBQUksUUFBUSxDQUFXQyxNQUFBOztBQUM1QixNQUFJQyxLQUFPQyxJQUFBUCxFQUFpQixJQUFJekMsQ0FBSSxNQUF6QixnQkFBQWdELEVBQTRCO0FBQ3ZDLE1BQUksQ0FBQ0QsR0FBTTtBQUNILFVBQUFFLElBQUksSUFBSTtBQUNHLElBQUFSLEVBQUEsSUFBSXpDLEdBQU1pRCxDQUFDLEdBQzVCRixJQUFPRSxFQUFFO0FBQUEsRUFDWDtBQUNJLE1BQUFDLElBQWUsSUFBSTtBQUNqQixRQUFBQyxJQUFJLENBQUNDLE1BQXNCO0FBQy9CLElBQUFOLEVBQVFNLEVBQUksSUFBSSxHQUNERixJQUFBO0FBQUEsRUFBQTtBQUVqQixFQUFBQSxFQUFhLE1BQU0sWUFBWUMsR0FDL0JKLEVBQUssWUFBWUYsR0FBTSxDQUFDSyxFQUFhLEtBQUssQ0FBQztBQUFBLENBQzVDLEdBR0dHLElBQVEsQ0FBQ3JELEdBQWNzRCxHQUE0Q0MsSUFBMkIsRUFBRSxPQUFPLFNBQVk7O0FBQ3ZILE1BQUlSLEtBQU9DLElBQUFQLEVBQWlCLElBQUl6QyxDQUFJLE1BQXpCLGdCQUFBZ0QsRUFBNEI7QUFDdkMsTUFBSSxDQUFDRCxHQUFNO0FBQ0gsVUFBQUUsSUFBSSxJQUFJO0FBQ0csSUFBQVIsRUFBQSxJQUFJekMsR0FBTWlELENBQUMsR0FDNUJGLElBQU9FLEVBQUU7QUFBQSxFQUNYO0FBQ0ksTUFBQSxDQUFDTSxFQUFLLFNBQVNSLEVBQUs7QUFBVyxVQUFNLG1DQUFtQy9DO0FBQ3RFLFFBQUFtRCxJQUFJLE9BQU9DLE1BQXNCO0FBQy9CLFVBQUFJLElBQVlKLEVBQUksTUFBTSxJQUN0QkssSUFBSSxNQUFNSCxFQUFHLEdBQUdGLEVBQUksSUFBSTtBQUM5QixJQUFBSSxFQUFVLFlBQVlDLENBQUMsR0FDdkJELEVBQVUsTUFBTTtBQUFBLEVBQUE7QUFFbEIsU0FBQVQsRUFBSyxZQUFZSSxHQUNWLE1BQU07QUFDWCxJQUFBSixFQUFNLFlBQVk7QUFBQSxFQUFBO0FBRXRCLEdBRU1XLElBQU8sQ0FBQzFELE1BQWlCNkMsTUFBZ0I7O0FBQzdDLE1BQUlFLEtBQU9DLElBQUFOLEVBQXNCLElBQUkxQyxDQUFJLE1BQTlCLGdCQUFBZ0QsRUFBaUM7QUFDNUMsTUFBSSxDQUFDRCxHQUFNO0FBQ0gsVUFBQUUsSUFBSSxJQUFJO0FBQ1EsSUFBQVAsRUFBQSxJQUFJMUMsR0FBTWlELENBQUMsR0FDakNGLElBQU9FLEVBQUU7QUFBQSxFQUNYO0FBQ0EsRUFBQUYsRUFBSyxZQUFZRixDQUFJO0FBQ3ZCLEdBRU1jLElBQVksQ0FBQzNELEdBQWNzRCxNQUFnQzs7QUFDL0QsTUFBSVAsS0FBT0MsSUFBQU4sRUFBc0IsSUFBSTFDLENBQUksTUFBOUIsZ0JBQUFnRCxFQUFpQztBQUM1QyxNQUFJLENBQUNELEdBQU07QUFDSCxVQUFBRSxJQUFJLElBQUk7QUFDUSxJQUFBUCxFQUFBLElBQUkxQyxHQUFNaUQsQ0FBQyxHQUNqQ0YsSUFBT0UsRUFBRTtBQUFBLEVBQ1g7QUFDTSxRQUFBRSxJQUFJLENBQUNDLE1BQXNCO0FBQzVCLElBQUFFLEVBQUEsR0FBR0YsRUFBSSxJQUFJO0FBQUEsRUFBQTtBQUVPLFNBQUFULEVBQUEsSUFBSVcsR0FBSUgsQ0FBQyxHQUMzQkosRUFBQSxpQkFBaUIsV0FBV0ksQ0FBQyxHQUNsQ0osRUFBSyxNQUFNLEdBQ0osTUFBTTtBQUNMLElBQUFBLEtBQUEsUUFBQUEsRUFBQSxvQkFBb0IsV0FBV0ksSUFDckNSLEVBQXVCLE9BQU9XLENBQUU7QUFBQSxFQUFBO0FBRXBDLEdBRU1NLElBQU8sQ0FBQzVELEdBQWNzRCxNQUFnQztBQUMxRCxRQUFNTyxJQUFhRixFQUFVM0QsR0FBTSxJQUFJNkMsTUFBZ0I7QUFDckQsSUFBQVMsRUFBRyxHQUFHVCxDQUFJLEdBQ0NnQjtFQUFBLENBQ1o7QUFDSCxHQUVNQyxJQUFjLENBQUM5RCxHQUFjc0QsTUFBZ0M7O0FBQ2pFLE1BQUlQLEtBQU9DLElBQUFOLEVBQXNCLElBQUkxQyxDQUFJLE1BQTlCLGdCQUFBZ0QsRUFBaUM7QUFDNUMsTUFBSSxDQUFDRDtBQUFNO0FBQ0wsUUFBQUksSUFBSVIsRUFBdUIsSUFBSVcsQ0FBRTtBQUN2QyxFQUFJSCxNQUNHSixFQUFBLG9CQUFvQixXQUFXSSxDQUFDLEdBQ3JDUixFQUF1QixPQUFPVyxDQUFFO0FBRXBDLEdBV2FTLElBQWlCO0FBQUEsRUFDNUIsVUFBVTtBQUFBLElBQ1IsS0FBQW5CO0FBQUEsSUFDQSxPQUFBUztBQUFBLElBQ0EsTUFBQUs7QUFBQSxJQUNBLFdBQUFDO0FBQUEsSUFDQSxNQUFBQztBQUFBLElBQ0EsWUFBWUU7QUFBQSxFQUNkO0FBQ0YsR0NwR0FFLElBQWVDLEVBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLElBQ0wsSUFBSSxFQUFFLFNBQVMsS0FBSztBQUFBLElBQ3BCLE1BQU0sRUFBRSxTQUFTLE1BQU0sTUFBTSxPQUFPO0FBQUEsSUFDcEMsT0FBTyxFQUFFLFNBQVMsS0FBSztBQUFBLElBQ3ZCLE1BQU0sRUFBRSxNQUFNLFFBQVEsU0FBUyxLQUFLO0FBQUEsSUFDcEMsT0FBTyxFQUFFLE1BQU0sT0FBZSxTQUFTLEtBQUs7QUFBQSxJQUM1QyxPQUFPLEVBQUUsTUFBTSxRQUFRLFNBQVMsS0FBSztBQUFBLElBQ3JDLFVBQVUsRUFBRSxNQUFNLFFBQVEsU0FBUyxLQUFLO0FBQUEsSUFDeEMsVUFBVSxFQUFFLE1BQU0sU0FBUyxTQUFTLEdBQU07QUFBQSxJQUMxQyxVQUFVLEVBQUUsTUFBTSxTQUFTLFNBQVMsR0FBTTtBQUFBLEVBQzVDO0FBQUEsRUFDQSxNQUFNQyxHQUFPLEVBQUUsTUFBQUMsS0FBUTtBQUdyQixVQUFNQyxJQUFRQyxFQUFTO0FBQUEsTUFDckIsS0FBSyxNQUFlSCxFQUFNO0FBQUEsTUFDMUIsS0FBSyxDQUFDaEMsTUFBTTtBQUFFLFFBQUFpQyxFQUFLLFNBQVNqQyxDQUFDO0FBQUEsTUFBRztBQUFBLElBQUEsQ0FDakMsR0FFS29DLElBQWFELEVBQVMsTUFDdEJILEVBQU0sT0FDRCxDQUFDMUIsRUFBZSxTQUFTLGFBQWEwQixFQUFNLE1BQU1BLEVBQU0sS0FBSyxDQUFDLElBQ25FQSxFQUFNLFFBQ0QxQixFQUFlLFNBQVMsbUJBQW1CMEIsRUFBTSxPQUFPLEdBQUlBLEVBQU0sU0FBUyxDQUFBLENBQUcsSUFDaEYxQixFQUFlLFNBQVMsY0FBYyxHQUFJMEIsRUFBTSxTQUFTLENBQUEsQ0FBRyxDQUNwRSxHQUVLSyxJQUFRLElBQUkxQixNQUFnQjtBQUFPLE1BQUFzQixFQUFBLFNBQVMsR0FBR3RCLENBQUk7QUFBQSxJQUFBLEdBQ25EMkIsSUFBTyxJQUFJM0IsTUFBZ0I7QUFBTyxNQUFBc0IsRUFBQSxRQUFRLEdBQUd0QixDQUFJO0FBQUEsSUFBQTtBQUVoRCxXQUFBO0FBQUEsTUFDTCxJQUFJcUIsRUFBTTtBQUFBLE1BQ1YsTUFBTUEsRUFBTTtBQUFBLE1BQ1osT0FBT0EsRUFBTTtBQUFBLE1BQ2IsTUFBTUEsRUFBTTtBQUFBLE1BQ1osT0FBT0EsRUFBTTtBQUFBLE1BQ2IsT0FBT0EsRUFBTTtBQUFBLE1BQ2IsVUFBVUEsRUFBTTtBQUFBLE1BQ2hCLFVBQVVBLEVBQU07QUFBQSxNQUNoQixVQUFVQSxFQUFNO0FBQUEsTUFDaEIsT0FBQUs7QUFBQSxNQUNBLE1BQUFDO0FBQUEsTUFDQSxZQUFBRjtBQUFBLE1BQ0EsT0FBQUY7QUFBQSxJQUFBO0FBQUEsRUFFSjtBQUVGLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkNoRFlLLElBQU4sTUFBZ0I7QUFBQSxFQUFoQjtBQUtHLElBQUF0RCxFQUFBLHFDQUFjO0FBQ2QsSUFBQUEsRUFBQSx3Q0FBaUI7O0VBSnpCLFdBQVcsV0FBc0I7QUFBRSxXQUFPc0QsRUFBVTtBQUFBLEVBQVM7QUFBQSxFQUM3RCxXQUFXLFNBQVN2QyxHQUFjO0FBQUUsU0FBSyxXQUFXQTtBQUFBLEVBQUc7QUFBQSxFQUt2RCxVQUFVd0MsR0FBaUMxRSxJQUFlLGlCQUFpQjtBQUNwRSxTQUFBLFFBQVEsSUFBSUEsR0FBTTBFLENBQU07QUFBQSxFQUMvQjtBQUFBLEVBSUEsVUFBYXZDLEdBQXNCN0IsSUFBaUIsTUFBTW9FLElBQWlCLGlCQUFpQkMsSUFBaUIsSUFBTUMsSUFBaUIsSUFBMEI7QUFDdEosVUFBQUMsSUFBUSxFQUFFLE1BQUF2RSxLQUNWd0UsSUFBVUYsSUFBUSxJQUFJLFFBQVcsQ0FBQzlCLEdBQVNpQyxNQUFXO0FBQUUsTUFBQUYsRUFBTSxTQUFTRSxHQUFRRixFQUFNLFVBQVUvQjtBQUFBLElBQVMsQ0FBQSxJQUFJO0FBRWxILElBQUs2QixLQUlFLEtBQUssV0FBVyxJQUFJRCxDQUFNLEtBQzdCLEtBQUssV0FBVyxJQUFJQSxHQUFRLENBQUUsQ0FBQSxJQUUvQixLQUFLLFdBQVcsSUFBSUEsQ0FBTSxLQUFLLENBQUksR0FBQSxLQUFLLEVBQUUsV0FBQXZDLEdBQVcsT0FBQTBDLEdBQU8sU0FBQUMsR0FBUyxPQUFBSCxFQUFPLENBQUEsS0FMeEUsS0FBQSxXQUFXLElBQUlELEdBQVEsQ0FBQyxFQUFFLFdBQUF2QyxHQUFXLE9BQUEwQyxHQUFPLFNBQUFDLEdBQVMsT0FBQUgsRUFBTyxDQUFBLENBQUM7QUFRcEUsVUFBTUssSUFBSyxLQUFLLFFBQVEsSUFBSU4sQ0FBTTtBQUNsQyxXQUFLTSxLQUNMQSxFQUFHLFFBQVFILEdBQ1hHLEVBQUcsY0FBYzdDLEdBRWIyQyxLQUFTQSxFQUFRLEtBQUssTUFBTSxLQUFLLGVBQWVKLENBQU0sQ0FBQyxFQUFFLE1BQU0sTUFBTSxLQUFLLGVBQWVBLENBQU0sQ0FBQyxHQUM3RkksS0FMUztBQUFBLEVBTWxCO0FBQUEsRUFFQSxlQUFrQjNDLEdBQXNCN0IsR0FBU29FLElBQWlCLGlCQUFpQkMsSUFBaUIsSUFBTTtBQUN4RyxXQUFPLEtBQUssVUFBVXhDLEdBQVc3QixHQUFNb0UsR0FBUUMsR0FBTyxFQUFJO0FBQUEsRUFDNUQ7QUFBQSxFQUVBLGVBQWVELElBQWlCLGlCQUFpQjtBQUMvQyxJQUFJLEtBQUssV0FBVyxJQUFJQSxDQUFNLE1BQzNCLEtBQUssV0FBVyxJQUFJQSxDQUFNLEtBQUssQ0FBQSxHQUFJO0FBR3RDLFFBQUlPLElBQVUsS0FBSyxRQUFRLElBQUlQLENBQU07QUFDakMsUUFBQU8sS0FBV0EsRUFBUSxhQUFhO0FBS2xDLFVBSkFBLEVBQVEsUUFBUSxNQUNoQkEsRUFBUSxjQUFjLE1BQ3RCQSxFQUFRLGNBQWMsTUFFbEIsS0FBSyxXQUFXLElBQUlQLENBQU0sR0FBRztBQUMvQixZQUFJUSxJQUFJLEtBQUssV0FBVyxJQUFJUixDQUFNO0FBQzlCLFlBQUFRLEtBQUtBLEVBQUUsUUFBUTtBQUNiLGNBQUEzRCxJQUFJMkQsRUFBRTtBQUNOLFVBQUEzRCxLQUFRLEtBQUEsVUFBVUEsRUFBRSxXQUFXQSxFQUFFLE9BQU9tRCxHQUFRbkQsRUFBRSxPQUFPLENBQUMsQ0FBQ0EsRUFBRSxPQUFPO0FBQUEsUUFDMUU7QUFBQSxNQUNGO0FBRU8sYUFBQTtBQUFBLElBQ1Q7QUFDTyxXQUFBO0FBQUEsRUFDVDtBQUNGO0FBaEVPLElBQU00RCxJQUFOVjtBQUNMdEQsRUFEV2dFLEdBQ0ksWUFBVyxJQUFJVjtBQ0poQyxNQUFBVyxLQUFlbkIsRUFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxNQUFNLEVBQUUsTUFBTSxRQUFRLFNBQVMsZ0JBQWdCO0FBQUEsRUFDakQ7QUFBQSxFQUNBLE1BQU1DLEdBQU8sRUFBRSxRQUFBbUIsS0FBVTtBQUV2QixVQUFNQyxJQUFLQyxLQUVMQyxJQUE4QkMsRUFBSSxJQUFLLEdBQ3ZDWixJQUE0Q1ksRUFBSSxJQUFLO0FBRXBELElBQUFKLEVBQUEsRUFBRSxhQUFBRyxHQUFhLE9BQUFYLEVBQUEsQ0FBTztBQUV2QixVQUFBYSxJQUFZckIsRUFBUyxNQUNsQm1CLEVBQVksU0FBUyxJQUM3QixHQUVLRyxJQUFpQnRCLEVBQVMsTUFBTTs7QUFDcEMsY0FBUXJCLElBQUF3QyxFQUFZLFVBQVosZ0JBQUF4QyxFQUEyQjtBQUFBLElBQUEsQ0FDcEM7QUFFRCxXQUFBNEMsRUFBVSxNQUFNO0FBQ2QsTUFBQVQsRUFBVSxTQUFTLFVBQVdHLEVBQVcsT0FBT3BCLEVBQU0sSUFBSTtBQUFBLElBQUEsQ0FDM0QsR0FFTTtBQUFBLE1BQ0wsZ0JBQUF5QjtBQUFBLE1BQ0EsYUFBQUg7QUFBQSxNQUNBLE9BQUFYO0FBQUEsTUFDQSxXQUFBYTtBQUFBLElBQUE7QUFBQSxFQUVKO0FBRUYsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7c0JDdENLRyxLQUFxQjtBQUFBLEVBRXpCLFVBQVUsQ0FBQ0MsR0FBYUMsTUFBYztBQUNwQyxJQUFBQyxFQUFlLFNBQVMsU0FBU0YsR0FBSUMsRUFBSyxHQUFHO0FBQUEsRUFDL0M7QUFBQSxFQUNBLFFBQVEsQ0FBQ0QsR0FBYUMsTUFBYztBQUNsQyxJQUFBQyxFQUFlLFNBQVMsV0FBV0YsR0FBSUMsRUFBSyxHQUFHO0FBQUEsRUFDakQ7QUFDRixHQUdNRSxLQUFrQjtBQUFBLEVBQ3RCLE1BQU0sQ0FBQ0gsR0FBU0ksTUFBaUI7QUFDL0IsSUFBSSxDQUFDSixLQUNMRSxFQUFlLFNBQVMsVUFBVUYsR0FBSUksRUFBUSxHQUFHO0FBQUEsRUFDbkQ7QUFDRixHQUVlQyxJQUFBO0FBQUEsRUFDYixvQkFBQU47QUFBQSxFQUFvQixpQkFBQUk7QUFDdEIsR0FFYUcsSUFBTixNQUFxQjtBQUFBLEVBQXJCO0FBSUcsSUFBQWpGLEVBQUEscUNBQWM7O0VBRnRCLFdBQVcsV0FBMkI7QUFBRSxXQUFPaUYsRUFBZTtBQUFBLEVBQVM7QUFBQSxFQUN2RSxXQUFXLFNBQVNsRSxHQUFtQjtBQUFFLFNBQUssV0FBV0E7QUFBQSxFQUFHO0FBQUEsRUFJNUQsU0FBU21FLEdBQXFCM0IsR0FBZ0I7QUFDeEMsUUFBQSxHQUFDMkIsS0FBYyxDQUFDM0IsSUFDaEI7QUFBQSxVQUFBbEQsSUFBVSxLQUFLLFFBQVEsSUFBSWtELENBQU0sSUFBSSxLQUFLLFFBQVEsSUFBSUEsQ0FBTSxJQUFJO0FBQ2hFLFVBQUE7QUFBYSxRQUFBMkIsRUFBQSxpQkFBaUJBLEVBQVcsWUFBWUEsQ0FBVTtBQUFBLE1BQUEsUUFBSztBQUFBLE1BQVE7QUFDNUUsTUFBQTdFLEtBQVNBLEVBQVEsT0FBTzZFLENBQVU7QUFBQTtBQUFBLEVBQ3hDO0FBQUEsRUFFQSxXQUFXQSxHQUFxQjNCLEdBQWdCO0FBQzFDLFFBQUEsR0FBQzJCLEtBQWMsQ0FBQzNCLElBQ2hCO0FBQUEsVUFBQWxELElBQVUsS0FBSyxRQUFRLElBQUlrRCxDQUFNLElBQUksS0FBSyxRQUFRLElBQUlBLENBQU0sSUFBSTtBQUNoRSxVQUFBO0FBQU0sUUFBQWxELEtBQVNBLEVBQVEsWUFBWTZFLENBQVU7QUFBQSxNQUFBLFFBQUk7QUFBQSxNQUFRO0FBQUE7QUFBQSxFQUMvRDtBQUFBLEVBRUEsVUFBVTNCLEdBQWlCMUUsSUFBZSxpQkFBaUI7QUFDcEQsU0FBQSxRQUFRLElBQUlBLEdBQU0wRSxDQUFNO0FBQUEsRUFDL0I7QUFDRjtBQXZCTyxJQUFNc0IsSUFBTkk7QUFDTGpGLEVBRFc2RSxHQUNJLFlBQVcsSUFBSUk7QUN2QmhDLFNBQVNFLEVBQXFCdkUsR0FBVXdFLEdBQXFEO0FBQ3RGLE1BQUF4RSxFQUFFLE9BQTRCLFVBQVU7QUFDM0MsUUFBSStELElBQU0vRCxFQUFFO0FBRVosUUFBSStELEVBQUcsVUFBVTtBQUNmLFVBQUlVLElBQVM7QUFBQSxRQUNYVixFQUFHLFNBQVMsV0FBVyxjQUFjO0FBQUEsUUFDckNBLEVBQUcsU0FBUyxjQUFjLGlCQUFpQjtBQUFBLFFBQzNDQSxFQUFHLFNBQVMsa0JBQWtCLHFCQUFxQjtBQUFBLFFBQ25EQSxFQUFHLFNBQVMsZ0JBQWdCLG1CQUFtQjtBQUFBLFFBQy9DQSxFQUFHLFNBQVMsaUJBQWlCLG9CQUFvQjtBQUFBLFFBQ2pEQSxFQUFHLFNBQVMsZUFBZSxrQkFBa0I7QUFBQSxRQUM3Q0EsRUFBRyxTQUFTLFVBQVUsYUFBYTtBQUFBLFFBQ25DQSxFQUFHLFNBQVMsV0FBVyxjQUFjO0FBQUEsUUFDckNBLEVBQUcsU0FBUyxlQUFlLGtCQUFrQjtBQUFBLFFBQzdDQSxFQUFHLFNBQVMsZUFBZSxrQkFBa0I7QUFBQSxNQUFNLEVBQUEsT0FBTyxDQUFLLE1BQUEsQ0FBQyxDQUFDLENBQUM7QUFFNUQsTUFBQVMsRUFBQUMsR0FBb0JWLEVBQUcsU0FBUyxTQUFTLE9BQVlBLEVBQUcsU0FBUyxRQUFRLEVBQUk7QUFBQSxJQUN2RjtBQUFBLEVBQ0Y7QUFDRjtBQUVPLE1BQU1XLElBQVc7QUFBQSxFQUN0QixVQUFVLENBQUNYLEdBQWdFQyxNQUdyRTtBQUNBLFFBQUEsR0FBQ0QsS0FBTSxDQUFDQSxFQUFHLGVBQ2Y7QUFBQSxjQUFRQSxFQUFHLFVBQVU7QUFBQSxRQUNuQixLQUFLO0FBQUEsUUFDTCxLQUFLO0FBQVksVUFBQUEsRUFBRyxTQUFTLENBQUNZLE1BQVFKLEVBQXFCSSxHQUFLWCxFQUFLLEtBQUs7QUFBRztBQUFBLFFBQzdFLEtBQUs7QUFBVSxVQUFBRCxFQUFHLFdBQVcsQ0FBQ1ksTUFBUUosRUFBcUJJLEdBQUtYLEVBQUssS0FBSztBQUFHO0FBQUEsTUFDL0U7QUFFQSxNQUFBRCxFQUFHLFlBQVksQ0FBQ1ksTUFBUUosRUFBcUJJLEdBQUtYLEVBQUssS0FBSyxHQUN4REQsRUFBRyxRQUFTQSxFQUFBLEtBQUssaUJBQWlCLFdBQVcsTUFBTVEsRUFBcUIsRUFBRSxRQUFRUixFQUFHLEdBQVVDLEVBQUssS0FBSyxDQUFDLEdBRTFHQSxFQUFLLE9BQU8sY0FBYUQsRUFBRyxlQUFlLElBQzFDUSxFQUFxQixFQUFFLFFBQVFSLEVBQUcsR0FBVUMsRUFBSyxLQUFLO0FBQUE7QUFBQSxFQUM3RDtBQUFBLEVBQ0EsUUFBUSxDQUFDRCxNQUFnQjtBQUFBLEVBR3pCO0FBQ0Y7QUMvQkEsU0FBU2EsR0FBUUMsR0FBcUI7QUFDaEMsRUFBQUEsRUFBQSxVQUFVLFVBQVVDLENBQU0sR0FDMUJELEVBQUEsVUFBVSxVQUFVRSxDQUFNLEdBQzFCRixFQUFBLFVBQVUsVUFBVVQsRUFBVyxlQUFlLEdBQzlDUyxFQUFBLFVBQVUsYUFBYVQsRUFBVyxrQkFBa0IsR0FDcERTLEVBQUEsVUFBVSxZQUFZRyxDQUF3QjtBQUNwRDtBQThCTyxTQUFTQyxHQUFrQnpELEdBQTBCO0FBQzFELE1BQUkwRCxJQUFlLENBQUE7QUFDWixTQUFBO0FBQUEsSUFDTCxLQUFLeEYsR0FBa0J5RixHQUFlQyxHQUNwQ0MsR0FLRztBQUVILGFBQUlBLEVBQVEsYUFBVTVFLEVBQWUsV0FBVzRFLEVBQVEsV0FDcERBLEVBQVEsbUJBQWdCckQsRUFBZSxXQUFXcUQsRUFBUSxpQkFDMURBLEVBQVEsY0FBV2pDLEVBQVUsV0FBV2lDLEVBQVEsWUFDaERBLEVBQVEsWUFBU3BCLEVBQWUsV0FBV29CLEVBQVEsVUFDeENILElBQUFFLEdBQ1I1RCxFQUFLLEtBQUs4RCxJQUFhNUYsR0FBTXlGLEdBQU9DLENBQWE7QUFBQSxJQUMxRDtBQUFBLElBQ0EsT0FBTzFGLEdBQWtCeUYsR0FBZTtBQUN0QyxhQUFPM0QsRUFBSyxTQUFTQSxFQUFLLE9BQU85QixHQUFNeUYsR0FBT0QsQ0FBWSxJQUFJO0FBQUEsSUFDaEU7QUFBQSxJQUNBLElBQUl4RixHQUFrQnlGLEdBQWU7QUFDbkMsYUFBTzNELEVBQUssTUFBTUEsRUFBSyxJQUFJOUIsR0FBTXlGLEdBQU9ELENBQVksSUFBSTtBQUFBLElBQzFEO0FBQUEsSUFDQSxRQUFRMUQsRUFBSztBQUFBLEVBQUE7QUFFakI7QUFFZ0IsU0FBQStELEdBQVdDLEdBQWFMLEdBQWVDLEdBQTZEO0FBQ2xILFFBQU1LLElBQVdELEVBQU8sUUFBUSxXQUFXQSxFQUFPO0FBQ2xELFNBQU9DLEVBQVE7QUFBQSxJQUFLeEYsRUFBVztBQUFBLElBQVVrRjtBQUFBLElBQU9DLEtBQWlCLENBQUM7QUFBQSxJQUNoRTtBQUFBLE1BQ0UsVUFBVTNFLEVBQWU7QUFBQSxNQUN6QixnQkFBZ0J1QixFQUFlO0FBQUEsTUFDL0IsV0FBV29CLEVBQVU7QUFBQSxNQUNyQixTQUFTYSxFQUFlO0FBQUEsSUFDMUI7QUFBQSxFQUFDLEVBQUUsS0FBSyxNQUNDd0IsQ0FDUjtBQUNMO0FBRWdCLFNBQUFDLEdBQWFGLEdBQWFMLEdBQThCO0FBRXRFLFVBRGlCSyxFQUFPLFFBQVEsV0FBV0EsRUFBTyxTQUNuQyxPQUFPdkYsRUFBVyxVQUFVa0YsQ0FBSztBQUNsRDtBQUdnQixTQUFBUSxHQUFVSCxHQUFhTCxHQUE4QjtBQUVuRSxVQURpQkssRUFBTyxRQUFRLFdBQVdBLEVBQU8sU0FDbkMsSUFBSXZGLEVBQVcsVUFBVWtGLENBQUs7QUFDL0M7QUFFTyxTQUFTUyxHQUFhSixHQUE2QjtBQUV4RCxVQURpQkEsRUFBTyxRQUFRLFdBQVdBLEVBQU8sU0FDbkM7QUFDakI7QUFpQkEsTUFBTUYsS0FBYztBQUFBLEVBQ2xCLFNBQUFWO0FBQUEsRUFDQSxZQUFZLElBQUkzRSxFQUFXO0FBQUEsRUFDM0IsVUFBQWpCO0FBQUEsRUFDQSxnQkFBZ0IsSUFBSXlCLEVBQWU7QUFBQSxFQUNuQyxnQkFBQXVCO0FBQUEsRUFDQSxRQUFBK0M7QUFBQSxFQUNBLFFBQUFEO0FBQUEsRUFBQSxtQkFDQUU7QUFBQUEsRUFDQSxtQkFBQTlGO0FBQUEsRUFDQSxXQUFBa0U7QUFDRjsifQ==

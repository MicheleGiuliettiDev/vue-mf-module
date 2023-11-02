var R = Object.defineProperty;
var z = (t, e, n) => e in t ? R(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var c = (t, e, n) => (z(t, typeof e != "symbol" ? e + "" : e, n), n);
import { defineComponent as x, computed as w, openBlock as p, createElementBlock as C, Fragment as K, renderList as X, createBlock as D, resolveDynamicComponent as E, getCurrentInstance as J, ref as b, onMounted as Q, withDirectives as W, createCommentVNode as Y, vShow as Z } from "vue";
var A = { exports: {} };
function V() {
}
V.prototype = {
  on: function(t, e, n) {
    var r = this.e || (this.e = {});
    return (r[t] || (r[t] = [])).push({
      fn: e,
      ctx: n
    }), this;
  },
  once: function(t, e, n) {
    var r = this;
    function i() {
      r.off(t, i), e.apply(n, arguments);
    }
    return i._ = e, this.on(t, i, n);
  },
  emit: function(t) {
    var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), r = 0, i = n.length;
    for (r; r < i; r++)
      n[r].fn.apply(n[r].ctx, e);
    return this;
  },
  off: function(t, e) {
    var n = this.e || (this.e = {}), r = n[t], i = [];
    if (r && e)
      for (var s = 0, o = r.length; s < o; s++)
        r[s].fn !== e && r[s].fn._ !== e && i.push(r[s]);
    return i.length ? n[t] = i : delete n[t], this;
  }
};
A.exports = V;
var q = A.exports.TinyEmitter = V, T = /* @__PURE__ */ ((t) => (t[t.drawer = 0] = "drawer", t[t.bottom = 1] = "bottom", t[t.header = 2] = "header", t))(T || {});
const L = {
  menuDefinitionAdded: "newmenuitem"
}, m = class m {
  constructor() {
    c(this, "menuDefinitions", []);
    c(this, "menuStructure", {});
    c(this, "notifications", new q());
  }
  get Notifications() {
    return this.notifications;
  }
  static get Instance() {
    return m.instance;
  }
  addMenuDefinition(e, ...n) {
    let r = this.menuDefinitions.find((i) => i.name == e.name);
    r ? e = r : this.menuDefinitions.push(e);
    for (const i of n)
      this.menuStructure[i.section] = this.menuStructure[i.section] || {}, this.menuStructure[i.section][i.parent || e.name] = this.menuStructure[i.section][i.parent || e.name] || [], i.parent && this.menuStructure[i.section][i.parent].push(e.name);
    this.notifications.emit(L.menuDefinitionAdded, e);
  }
  getMenuItem(e) {
    return this.menuDefinitions.find((n) => n.name == e);
  }
  getMenu(e) {
    let n = [], r = /* @__PURE__ */ new Set();
    for (const i in this.menuStructure[e]) {
      const s = this.menuStructure[e][i];
      let o = {
        item: this.menuDefinitions.find((a) => a.name == i && (!a.hidden || !a.hidden())),
        children: s.map((a) => this.menuDefinitions.find((l) => l.name == a && (!l.hidden || !l.hidden()))).filter((a) => !!a).sort((a, l) => a && l && a.orderIndex && l.orderIndex && a.orderIndex > l.orderIndex ? 1 : a && l && a.orderIndex && l.orderIndex && a.orderIndex < l.orderIndex ? -1 : 0)
      };
      o.item && (r.add(i), s.forEach((a) => r.add(a)), n.push(o));
    }
    return n.filter((i) => !!i.item).sort((i, s) => i && s && i.item && s.item && i.item.orderIndex && s.item.orderIndex && i.item.orderIndex > s.item.orderIndex ? 1 : i && s && i.item && s.item && i.item.orderIndex && s.item.orderIndex && i.item.orderIndex < s.item.orderIndex ? -1 : 0);
  }
};
c(m, "instance", new m());
let f = m;
const S = class S {
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
  provideComponent(e, n, r) {
    if (this.registry.set(r ? `${r}-${n}` : n, e), r) {
      this.groupedregistry.has(r) || this.groupedregistry.set(r, /* @__PURE__ */ new Map());
      let i = this.groupedregistry.get(r);
      i && i.set(n, e);
    }
  }
  getComponent(e, n) {
    return this.registry.get(n ? `${n}-${e}` : e) || null;
  }
  getComponents(...e) {
    return Array.from(this.registry.entries()).filter((n) => e.indexOf(n[0]) >= 0).map((n) => n[1]);
  }
  getGroupComponents(e, ...n) {
    let r = this.groupedregistry.get(e);
    return r ? Array.from(r.entries() || []).filter((i) => !n || n.length == 0 || n.indexOf(i[0]) >= 0).map((i) => i[1]) : [];
  }
  getGroupComponentsKeys(e) {
    let n = this.groupedregistry.get(e);
    return n ? Array.from(n.keys()) : [];
  }
  provideService(e, n, r) {
    if (this.serviceregistry.set(e, n), r) {
      this.groupedserviceregistry.has(r) || this.groupedserviceregistry.set(r, /* @__PURE__ */ new Map());
      let i = this.groupedserviceregistry.get(r);
      i && i.set(e, n);
    }
  }
  getService(e) {
    return this.serviceregistry.get(e) || null;
  }
  getGroupServices(e, ...n) {
    let r = this.groupedserviceregistry.get(e);
    return r ? Array.from(r.entries() || []).filter((i) => !n || n.length == 0 || n.indexOf(i[0]) >= 0).map((i) => i[1]) : [];
  }
};
c(S, "instance", new S());
let u = S;
const M = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Map(), j = /* @__PURE__ */ new Map(), H = (t, ...e) => new Promise((n) => {
  var o;
  let r = (o = M.get(t)) == null ? void 0 : o.port1;
  if (!r) {
    const a = new MessageChannel();
    M.set(t, a), r = a.port1;
  }
  let i = new MessageChannel();
  const s = (a) => {
    n(a.data), i = null;
  };
  i.port1.onmessage = s, r.postMessage(e, [i.port2]);
}), _ = (t, e, n = { force: !1 }) => {
  var s;
  let r = (s = M.get(t)) == null ? void 0 : s.port2;
  if (!r) {
    const o = new MessageChannel();
    M.set(t, o), r = o.port2;
  }
  if (!n.force && r.onmessage)
    throw "reply already set for message " + t;
  const i = async (o) => {
    const a = o.ports[0], l = await e(...o.data);
    a.postMessage(l), a.close();
  };
  return r.onmessage = i, () => {
    r.onmessage = null;
  };
}, ee = (t, ...e) => {
  var r;
  let n = (r = I.get(t)) == null ? void 0 : r.port1;
  if (!n) {
    const i = new MessageChannel();
    I.set(t, i), n = i.port1;
  }
  n.postMessage(e);
}, O = (t, e) => {
  var i;
  let n = (i = I.get(t)) == null ? void 0 : i.port2;
  if (!n) {
    const s = new MessageChannel();
    I.set(t, s), n = s.port2;
  }
  const r = (s) => {
    e(...s.data);
  };
  return j.set(e, r), n.addEventListener("message", r), n.start(), () => {
    n == null || n.removeEventListener("message", r), j.delete(e);
  };
}, te = (t, e) => {
  const n = O(t, (...r) => {
    e(...r), n();
  });
}, ne = (t, e) => {
  var i;
  let n = (i = I.get(t)) == null ? void 0 : i.port2;
  if (!n)
    return;
  const r = j.get(e);
  r && (n.removeEventListener("message", r), j.delete(e));
}, k = {
  Instance: {
    ask: H,
    reply: _,
    send: ee,
    subscribe: O,
    once: te,
    unsubscribe: ne
  }
}, re = x({
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
  setup(t, { emit: e }) {
    const n = w({
      get: () => t.value,
      set: (o) => {
        e("input", o);
      }
    }), r = w(() => t.name ? [u.Instance.getComponent(t.name, t.group)] : t.group ? u.Instance.getGroupComponents(t.group, ...t.names || []) : u.Instance.getComponents(...t.names || [])), i = (...o) => {
      e("click", ...o);
    }, s = (...o) => {
      e("save", ...o);
    };
    return {
      id: t.id,
      type: t.type,
      value: t.value,
      name: t.name,
      names: t.names,
      group: t.group,
      metadata: t.metadata,
      disabled: t.disabled,
      readonly: t.readonly,
      click: i,
      save: s,
      Components: r,
      Value: n
    };
  }
}), B = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, i] of e)
    n[r] = i;
  return n;
};
function ie(t, e, n, r, i, s) {
  return p(), C("div", null, [
    (p(!0), C(K, null, X(t.Components, (o, a) => (p(), D(E(o), {
      disabled: t.disabled,
      readonly: t.readonly,
      key: a,
      id: t.id,
      type: t.type,
      metadata: t.metadata,
      modelValue: t.Value,
      "onUpdate:modelValue": e[0] || (e[0] = (l) => t.Value = l),
      onClick: t.click,
      onSave: t.save
    }, null, 40, ["disabled", "readonly", "id", "type", "metadata", "modelValue", "onClick", "onSave"]))), 128))
  ]);
}
const N = /* @__PURE__ */ B(re, [["render", ie]]), v = class v {
  constructor() {
    c(this, "screens", /* @__PURE__ */ new Map());
    c(this, "projecting", /* @__PURE__ */ new Map());
  }
  static get Instance() {
    return v.instance;
  }
  static set Instance(e) {
    this.instance = e;
  }
  setScreen(e, n = "defaultscreen") {
    this.screens.set(n, e);
  }
  projectTo(e, n = null, r = "defaultscreen", i = !0, s = !1) {
    const o = { data: n }, a = s ? new Promise((P, F) => {
      o.reject = F, o.resolve = P;
    }) : null;
    i ? (this.projecting.has(r) || this.projecting.set(r, []), (this.projecting.get(r) || []).push({ component: e, model: o, promise: a, queue: i })) : this.projecting.set(r, [{ component: e, model: o, promise: a, queue: i }]);
    const l = this.screens.get(r);
    return l ? (l.model = o, l.currentView = e, a && a.then(() => this.stopProjecting(r)).catch(() => this.stopProjecting(r)), a) : null;
  }
  projectAsyncTo(e, n, r = "defaultscreen", i = !0) {
    return this.projectTo(e, n, r, i, !0);
  }
  stopProjecting(e = "defaultscreen") {
    this.projecting.has(e) && (this.projecting.get(e) || []).pop();
    let n = this.screens.get(e);
    if (n && n.currentView) {
      if (n.model = null, n.screenModel = null, n.currentView = null, this.projecting.has(e)) {
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
c(v, "instance", new v());
let g = v;
const se = x({
  name: "screen",
  props: {
    name: { type: String, default: "defaultscreen" }
  },
  setup(t, { expose: e }) {
    const n = J(), r = b(null), i = b(null);
    e({ currentView: r, model: i });
    const s = w(() => r.value != null), o = w(() => {
      var a;
      return (a = r.value) == null ? void 0 : a.__file;
    });
    return Q(() => {
      g.Instance.setScreen(n.proxy, t.name);
    }), {
      currentViewUID: o,
      currentView: r,
      model: i,
      isVisible: s
    };
  }
});
function ae(t, e, n, r, i, s) {
  return W((p(), C("div", null, [
    t.currentView ? (p(), D(E(t.currentView), {
      value: t.model,
      key: t.currentViewUID
    }, null, 8, ["value"])) : Y("", !0)
  ], 512)), [
    [Z, t.isVisible]
  ]);
}
const U = /* @__PURE__ */ B(se, [["render", ae]]), oe = {
  inserted: (t, e) => {
    d.Instance.injectTo(t, e.arg);
  },
  unbind: (t, e) => {
    d.Instance.removeFrom(t, e.arg);
  }
}, le = {
  bind: (t, e) => {
    t && d.Instance.setScreen(t, e.arg);
  }
}, $ = {
  projectToDirective: oe,
  screenDirective: le
}, y = class y {
  constructor() {
    c(this, "screens", /* @__PURE__ */ new Map());
  }
  static get Instance() {
    return y.instance;
  }
  static set Instance(e) {
    this.instance = e;
  }
  injectTo(e, n) {
    if (!(!e || !n)) {
      var r = this.screens.has(n) ? this.screens.get(n) : null;
      try {
        e.parentElement && e.removeChild(e);
      } catch {
      }
      r && r.append(e);
    }
  }
  removeFrom(e, n) {
    if (!(!e || !n)) {
      var r = this.screens.has(n) ? this.screens.get(n) : null;
      try {
        r && r.removeChild(e);
      } catch {
      }
    }
  }
  setScreen(e, n = "defaultscreen") {
    this.screens.set(n, e);
  }
};
c(y, "instance", new y());
let d = y;
function h(t, e) {
  if (t.target.validity) {
    let n = t.target;
    if (n.validity) {
      let r = [
        n.validity.badInput ? "bad input" : null,
        n.validity.customError ? "custom error" : null,
        n.validity.patternMismatch ? "pattern mismatch" : null,
        n.validity.rangeOverflow ? "range overflow" : null,
        n.validity.rangeUnderflow ? "range underflow" : null,
        n.validity.stepMismatch ? "step mismatch" : null,
        n.validity.tooLong ? "too long" : null,
        n.validity.tooShort ? "too short" : null,
        n.validity.typeMismatch ? "type mismatch" : null,
        n.validity.valueMissing ? "value missing" : null
      ].filter((i) => !!i);
      e(r, n.validity.valid != null ? n.validity.valid : !0);
    }
  }
}
const G = {
  inserted: (t, e) => {
    if (!(!t || !t.willValidate)) {
      switch (t.nodeName) {
        case "INPUT":
        case "TEXTAREA":
          t.onblur = (n) => h(n, e.value);
          break;
        case "SELECT":
          t.onchange = (n) => h(n, e.value);
          break;
      }
      t.oninvalid = (n) => h(n, e.value), t.form && t.form.addEventListener("invalid", () => h({ target: t }, e.value)), e.arg == "immediate" ? t.reportValidity() : h({ target: t }, e.value);
    }
  },
  unbind: (t) => {
  }
};
function ce(t) {
  t.component("screen", U), t.component("inject", N), t.directive("screen", $.screenDirective), t.directive("projectTo", $.projectToDirective), t.directive("validate", G);
}
function ge(t) {
  let e = {};
  return {
    init(n, r, i) {
      return i.registry && (u.Instance = i.registry), i.messageService && (k.Instance = i.messageService), i.projector && (g.Instance = i.projector), i.screens && (d.Instance = i.screens), e = r, t.init(ue, n, r);
    },
    config(n) {
      return t.config ? t.config(n, e) : null;
    },
    run(n) {
      return t.run ? t.run(n, e) : null;
    },
    routes: t.routes
  };
}
async function he(t, e) {
  const n = t.default.default || t.default;
  return n.init(
    f.Instance,
    e || {},
    {
      registry: u.Instance,
      messageService: k.Instance,
      projector: g.Instance,
      screens: d.Instance
    }
  ).then(() => n);
}
function pe(t) {
  return (t.default.default || t.default).config(f.Instance);
}
function me(t) {
  return (t.default.default || t.default).run(f.Instance);
}
function ve(t) {
  return (t.default.default || t.default).routes;
}
const ue = {
  install: ce,
  MenuHelper: new f(),
  menuType: T,
  CommonRegistry: new u(),
  MessageService: k,
  inject: N,
  screen: U,
  ValidateDirective: G,
  MenuNotifications: L,
  Projector: g
};
export {
  u as CommonRegistry,
  pe as ConfigModule,
  he as InitModule,
  f as MenuHelper,
  L as MenuNotifications,
  k as MessageService,
  ge as ModuleInitializer,
  ve as ModuleRoutes,
  g as Projector,
  me as RunModule,
  G as ValidateDirective,
  ue as default,
  N as inject,
  T as menuType,
  U as screen
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlLW1mLW1vZHVsZS5lcy5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RpbnktZW1pdHRlci9pbmRleC5qcyIsIi4uL3NyYy9oZWxwZXJzL01lbnVIZWxwZXIudHMiLCIuLi9zcmMvaGVscGVycy9Db21tb25SZWdpc3RyeS50cyIsIi4uL3NyYy9oZWxwZXJzL01lc3NhZ2VTZXJ2aWNlLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvaW5qZWN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZy50cyIsIi4uL3NyYy9oZWxwZXJzL1Byb2plY3Rvci50cyIsIi4uL3NyYy9jb21wb25lbnRzL3NjcmVlbi52dWU/dnVlJnR5cGU9c2NyaXB0JmxhbmcudHMiLCIuLi9zcmMvZGlyZWN0aXZlcy9zY3JlZW4udHMiLCIuLi9zcmMvZGlyZWN0aXZlcy92YWxpZGF0ZS50cyIsIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBFICgpIHtcbiAgLy8gS2VlcCB0aGlzIGVtcHR5IHNvIGl0J3MgZWFzaWVyIHRvIGluaGVyaXQgZnJvbVxuICAvLyAodmlhIGh0dHBzOi8vZ2l0aHViLmNvbS9saXBzbWFjayBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvaXNzdWVzLzMpXG59XG5cbkUucHJvdG90eXBlID0ge1xuICBvbjogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICB2YXIgZSA9IHRoaXMuZSB8fCAodGhpcy5lID0ge30pO1xuXG4gICAgKGVbbmFtZV0gfHwgKGVbbmFtZV0gPSBbXSkpLnB1c2goe1xuICAgICAgZm46IGNhbGxiYWNrLFxuICAgICAgY3R4OiBjdHhcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG9uY2U6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGxpc3RlbmVyICgpIHtcbiAgICAgIHNlbGYub2ZmKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIuXyA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHRoaXMub24obmFtZSwgbGlzdGVuZXIsIGN0eCk7XG4gIH0sXG5cbiAgZW1pdDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZGF0YSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICB2YXIgZXZ0QXJyID0gKCh0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KSlbbmFtZV0gfHwgW10pLnNsaWNlKCk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsZW4gPSBldnRBcnIubGVuZ3RoO1xuXG4gICAgZm9yIChpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGV2dEFycltpXS5mbi5hcHBseShldnRBcnJbaV0uY3R4LCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvZmY6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG4gICAgdmFyIGV2dHMgPSBlW25hbWVdO1xuICAgIHZhciBsaXZlRXZlbnRzID0gW107XG5cbiAgICBpZiAoZXZ0cyAmJiBjYWxsYmFjaykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV2dHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGV2dHNbaV0uZm4gIT09IGNhbGxiYWNrICYmIGV2dHNbaV0uZm4uXyAhPT0gY2FsbGJhY2spXG4gICAgICAgICAgbGl2ZUV2ZW50cy5wdXNoKGV2dHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBldmVudCBmcm9tIHF1ZXVlIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtcbiAgICAvLyBTdWdnZXN0ZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2xhemRcbiAgICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvY29tbWl0L2M2ZWJmYWE5YmM5NzNiMzNkMTEwYTg0YTMwNzc0MmI3Y2Y5NGM5NTMjY29tbWl0Y29tbWVudC01MDI0OTEwXG5cbiAgICAobGl2ZUV2ZW50cy5sZW5ndGgpXG4gICAgICA/IGVbbmFtZV0gPSBsaXZlRXZlbnRzXG4gICAgICA6IGRlbGV0ZSBlW25hbWVdO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRTtcbm1vZHVsZS5leHBvcnRzLlRpbnlFbWl0dGVyID0gRTtcbiIsImltcG9ydCB7IFRpbnlFbWl0dGVyIH0gZnJvbSAndGlueS1lbWl0dGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWVudURlZmluaXRpb24ge1xuICBuYW1lOiBzdHJpbmcsXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gIGljb24/OiBzdHJpbmcsXG4gIHJvdXRlTmFtZT86IHN0cmluZyxcbiAgcm91dGVQYXJhbXM/OiBvYmplY3QsXG4gIGZlYXR1cmVmbGFncz86IHN0cmluZ1tdLFxuICBvcmRlckluZGV4PzogbnVtYmVyLFxuICBjbGFzcz86IHN0cmluZyxcbiAgaGlkZGVuOiAoKSA9PiBib29sZWFuXG59XG5cblxuZXhwb3J0IGVudW0gbWVudVR5cGUge1xuICBkcmF3ZXIsICAgICAgIC8vIERyYXdlciBNZW51XG4gIGJvdHRvbSwgICAgICAgLy8gQm90dG9tIE1lbnVcbiAgaGVhZGVyXG59XG5cbmV4cG9ydCBjb25zdCBNZW51Tm90aWZpY2F0aW9ucyA9IHtcbiAgbWVudURlZmluaXRpb25BZGRlZDogJ25ld21lbnVpdGVtJ1xufVxuXG5leHBvcnQgY2xhc3MgTWVudUhlbHBlciB7XG5cbiAgcHJpdmF0ZSBtZW51RGVmaW5pdGlvbnM6IElNZW51RGVmaW5pdGlvbltdID0gW107XG4gIHByaXZhdGUgbWVudVN0cnVjdHVyZTogeyBba2V5OiBzdHJpbmddOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ1tdIH0gfSA9IHt9XG4gIHByaXZhdGUgbm90aWZpY2F0aW9uczogVGlueUVtaXR0ZXIgPSBuZXcgVGlueUVtaXR0ZXIoKTtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgTWVudUhlbHBlcigpO1xuICBwdWJsaWMgZ2V0IE5vdGlmaWNhdGlvbnMoKSB7IHJldHVybiB0aGlzLm5vdGlmaWNhdGlvbnM7IH1cbiAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7IHJldHVybiBNZW51SGVscGVyLmluc3RhbmNlIH1cblxuICBwdWJsaWMgYWRkTWVudURlZmluaXRpb24obWVudURlZmluaXRpb246IElNZW51RGVmaW5pdGlvbiwgLi4ucG9zaXRpb25zOiB7IHNlY3Rpb246IG1lbnVUeXBlLCBwYXJlbnQ/OiBzdHJpbmcgfVtdKSB7XG5cbiAgICAvLyBBZ2dpdW5nbyBsYSBkaWNoaWFyYXppb25lIGRlbCBtZW51w7kgYWxsJ2VsZW5jbyBkZWkgbWVuw7kgZGlzcG9uaWJpbGkuXG4gICAgbGV0IGZvdW5kID0gdGhpcy5tZW51RGVmaW5pdGlvbnMuZmluZChtID0+IG0ubmFtZSA9PSBtZW51RGVmaW5pdGlvbi5uYW1lKTtcbiAgICBpZiAoIWZvdW5kKVxuICAgICAgdGhpcy5tZW51RGVmaW5pdGlvbnMucHVzaChtZW51RGVmaW5pdGlvbik7XG4gICAgZWxzZVxuICAgICAgbWVudURlZmluaXRpb24gPSBmb3VuZDtcblxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBwb3NpdGlvbnMpIHtcblxuICAgICAgdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl0gPSB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXSB8fCB7fTtcbiAgICAgIHRoaXMubWVudVN0cnVjdHVyZVtlbGVtZW50LnNlY3Rpb25dW2VsZW1lbnQucGFyZW50IHx8IG1lbnVEZWZpbml0aW9uLm5hbWVdID0gdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl1bZWxlbWVudC5wYXJlbnQgfHwgbWVudURlZmluaXRpb24ubmFtZV0gfHwgW107XG5cbiAgICAgIGlmIChlbGVtZW50LnBhcmVudClcbiAgICAgICAgdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl1bZWxlbWVudC5wYXJlbnRdLnB1c2gobWVudURlZmluaXRpb24ubmFtZSk7XG4gICAgfVxuXG4gICAgdGhpcy5ub3RpZmljYXRpb25zLmVtaXQoTWVudU5vdGlmaWNhdGlvbnMubWVudURlZmluaXRpb25BZGRlZCwgbWVudURlZmluaXRpb24pO1xuICB9XG5cbiAgcHVibGljIGdldE1lbnVJdGVtKG5hbWU6IHN0cmluZyk6IElNZW51RGVmaW5pdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMubWVudURlZmluaXRpb25zLmZpbmQoaSA9PiBpLm5hbWUgPT0gbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWVudShtZW51OiBtZW51VHlwZSk6IHsgaXRlbTogSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkLCBjaGlsZHJlbjogKElNZW51RGVmaW5pdGlvbiB8IHVuZGVmaW5lZClbXSB9W10ge1xuICAgIGxldCByZXN1bHQ6IHsgaXRlbTogSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkLCBjaGlsZHJlbjogKElNZW51RGVmaW5pdGlvbiB8IHVuZGVmaW5lZClbXSB9W10gPSBbXTtcbiAgICBsZXQgdXNlZCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5tZW51U3RydWN0dXJlW21lbnVdKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5tZW51U3RydWN0dXJlW21lbnVdW2tleV07XG5cblxuICAgICAgbGV0IHJyID0ge1xuICAgICAgICBpdGVtOiB0aGlzLm1lbnVEZWZpbml0aW9ucy5maW5kKG0gPT4ge1xuICAgICAgICAgIHJldHVybiBtLm5hbWUgPT0ga2V5ICYmXG4gICAgICAgICAgICAoIW0uaGlkZGVuIHx8ICFtLmhpZGRlbigpKVxuICAgICAgICB9KSxcblxuICAgICAgICBjaGlsZHJlbjogZWxlbWVudC5tYXAoaSA9PiB0aGlzLm1lbnVEZWZpbml0aW9ucy5maW5kKG0gPT4gbS5uYW1lID09IGkgJiYgKCFtLmhpZGRlbiB8fCAhbS5oaWRkZW4oKSkpKVxuICAgICAgICAgIC5maWx0ZXIoaSA9PiAhIWkpXG4gICAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGlmIChhICYmIGIgJiYgYS5vcmRlckluZGV4ICYmIGIub3JkZXJJbmRleCAmJiBhLm9yZGVySW5kZXggPiBiLm9yZGVySW5kZXgpIHJldHVybiAxO1xuICAgICAgICAgICAgaWYgKGEgJiYgYiAmJiBhLm9yZGVySW5kZXggJiYgYi5vcmRlckluZGV4ICYmIGEub3JkZXJJbmRleCA8IGIub3JkZXJJbmRleCkgcmV0dXJuIC0xO1xuICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgICB9KVxuICAgICAgfTtcblxuICAgICAgaWYgKCEhcnIuaXRlbSkge1xuICAgICAgICB1c2VkLmFkZChrZXkpO1xuICAgICAgICBlbGVtZW50LmZvckVhY2goaSA9PiB1c2VkLmFkZChpKSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKHJyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5maWx0ZXIoaSA9PiAhIWkuaXRlbSlcbiAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChhICYmIGIgJiYgYS5pdGVtICYmIGIuaXRlbSAmJiBhLml0ZW0ub3JkZXJJbmRleCAmJiBiLml0ZW0ub3JkZXJJbmRleCAmJiBhLml0ZW0ub3JkZXJJbmRleCA+IGIuaXRlbS5vcmRlckluZGV4KSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEgJiYgYiAmJiBhLml0ZW0gJiYgYi5pdGVtICYmIGEuaXRlbS5vcmRlckluZGV4ICYmIGIuaXRlbS5vcmRlckluZGV4ICYmIGEuaXRlbS5vcmRlckluZGV4IDwgYi5pdGVtLm9yZGVySW5kZXgpIHJldHVybiAtMTtcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH0pO1xuICB9XG59XG5cbiIsIlxuZXhwb3J0IGNsYXNzIENvbW1vblJlZ2lzdHJ5IHtcblxuICBwcml2YXRlIHJlZ2lzdHJ5ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgcHJpdmF0ZSBncm91cGVkcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgTWFwPHN0cmluZywgYW55Pj4oKTtcbiAgcHJpdmF0ZSBzZXJ2aWNlcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICBwcml2YXRlIGdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgTWFwPHN0cmluZywgYW55Pj4oKTtcblxuXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb21tb25SZWdpc3RyeSA9IG5ldyBDb21tb25SZWdpc3RyeSgpO1xuICBzdGF0aWMgZ2V0IEluc3RhbmNlKCkgeyByZXR1cm4gdGhpcy5pbnN0YW5jZTsgfVxuICBzdGF0aWMgc2V0IEluc3RhbmNlKHY6IENvbW1vblJlZ2lzdHJ5KSB7IHRoaXMuaW5zdGFuY2UgPSB2IH07XG5cbiAgcHJvdmlkZUNvbXBvbmVudChjb21wb25lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCBncm91cD86IHN0cmluZykge1xuICAgIHRoaXMucmVnaXN0cnkuc2V0KGdyb3VwID8gYCR7Z3JvdXB9LSR7bmFtZX1gIDogbmFtZSwgY29tcG9uZW50KTtcbiAgICBpZiAoZ3JvdXApIHtcbiAgICAgIGlmICghdGhpcy5ncm91cGVkcmVnaXN0cnkuaGFzKGdyb3VwKSkgdGhpcy5ncm91cGVkcmVnaXN0cnkuc2V0KGdyb3VwLCBuZXcgTWFwPHN0cmluZywgYW55PigpKTtcblxuICAgICAgbGV0IGdnID0gdGhpcy5ncm91cGVkcmVnaXN0cnkuZ2V0KGdyb3VwKTtcbiAgICAgIGlmIChnZykgZ2cuc2V0KG5hbWUsIGNvbXBvbmVudCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29tcG9uZW50KG5hbWU6IHN0cmluZywgZ3JvdXA/OiBzdHJpbmcpOiBhbnkgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeS5nZXQoZ3JvdXAgPyBgJHtncm91cH0tJHtuYW1lfWAgOiBuYW1lKSB8fCBudWxsO1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50cyguLi5uYW1lOiBzdHJpbmdbXSk6IChhbnkpW10ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucmVnaXN0cnkuZW50cmllcygpKS5maWx0ZXIoaSA9PiBuYW1lLmluZGV4T2YoaVswXSkgPj0gMCkubWFwKGkgPT4gaVsxXSk7XG4gIH1cblxuICBnZXRHcm91cENvbXBvbmVudHMoZ3JvdXA6IHN0cmluZywgLi4ubmFtZTogc3RyaW5nW10pOiAoYW55KVtdIHtcbiAgICBsZXQgZyA9IHRoaXMuZ3JvdXBlZHJlZ2lzdHJ5LmdldChncm91cCk7XG4gICAgaWYgKGcpXG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShnLmVudHJpZXMoKSB8fCBbXSkuZmlsdGVyKGkgPT4gKCFuYW1lIHx8IG5hbWUubGVuZ3RoID09IDApIHx8IG5hbWUuaW5kZXhPZihpWzBdKSA+PSAwKS5tYXAoaSA9PiBpWzFdKTtcbiAgICByZXR1cm4gW11cbiAgfVxuXG4gIGdldEdyb3VwQ29tcG9uZW50c0tleXMoZ3JvdXA6IHN0cmluZyk6IChzdHJpbmcpW10ge1xuICAgIGxldCBnID0gdGhpcy5ncm91cGVkcmVnaXN0cnkuZ2V0KGdyb3VwKTtcbiAgICBpZiAoZykgcmV0dXJuIEFycmF5LmZyb20oZy5rZXlzKCkpO1xuICAgIHJldHVybiBbXVxuICB9XG5cbiAgcHJvdmlkZVNlcnZpY2UobmFtZTogc3RyaW5nLCBzZXJ2aWNlOiBhbnksIGdyb3VwPzogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXJ2aWNlcmVnaXN0cnkuc2V0KG5hbWUsIHNlcnZpY2UpO1xuICAgIGlmIChncm91cCkge1xuICAgICAgaWYgKCF0aGlzLmdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkuaGFzKGdyb3VwKSkgdGhpcy5ncm91cGVkc2VydmljZXJlZ2lzdHJ5LnNldChncm91cCwgbmV3IE1hcDxzdHJpbmcsIGFueT4oKSk7XG4gICAgICBsZXQgZ2cgPSB0aGlzLmdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkuZ2V0KGdyb3VwKTtcbiAgICAgIGlmIChnZykgZ2cuc2V0KG5hbWUsIHNlcnZpY2UpO1xuICAgIH1cbiAgfVxuXG4gIGdldFNlcnZpY2U8VD4obmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuICh0aGlzLnNlcnZpY2VyZWdpc3RyeS5nZXQobmFtZSkgfHwgbnVsbCkgYXMgVDtcbiAgfVxuXG4gIGdldEdyb3VwU2VydmljZXMoZ3JvdXA6IHN0cmluZywgLi4ubmFtZTogc3RyaW5nW10pOiAoYW55KVtdIHtcbiAgICBsZXQgZyA9IHRoaXMuZ3JvdXBlZHNlcnZpY2VyZWdpc3RyeS5nZXQoZ3JvdXApO1xuICAgIGlmIChnKVxuICAgICAgcmV0dXJuIEFycmF5LmZyb20oZy5lbnRyaWVzKCkgfHwgW10pLmZpbHRlcihpID0+ICghbmFtZSB8fCBuYW1lLmxlbmd0aCA9PSAwKSB8fCBuYW1lLmluZGV4T2YoaVswXSkgPj0gMCkubWFwKGkgPT4gaVsxXSk7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn0iLCJjb25zdCBhc2tSZXBseUNoYW5uZWxzID0gbmV3IE1hcDxzdHJpbmcsIE1lc3NhZ2VDaGFubmVsPigpO1xuY29uc3Qgc2VuZFN1YnNjcmliZUNoYW5uZWxzID0gbmV3IE1hcDxzdHJpbmcsIE1lc3NhZ2VDaGFubmVsPigpO1xuY29uc3Qgc2VuZFN1YnNjcmliZUNhbGxiYWNrcyA9IG5ldyBNYXA8RnVuY3Rpb24sICguLi5hcmdzOiBhbnlbXSkgPT4gYW55PigpO1xuXG5jb25zdCBhc2sgPSA8VD4obmFtZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IFByb21pc2U8VD4gPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgbGV0IHBvcnQgPSBhc2tSZXBseUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDFcbiAgICBpZiAoIXBvcnQpIHtcbiAgICAgIGNvbnN0IGMgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgIGFza1JlcGx5Q2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xuICAgICAgcG9ydCA9IGMucG9ydDFcbiAgICB9XG4gICAgbGV0IGlubmVyY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIGNvbnN0IGwgPSAoZXZ0OiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgICAgIHJlc29sdmUoZXZ0LmRhdGEpO1xuICAgICAgaW5uZXJjaGFubmVsID0gbnVsbCE7XG4gICAgfVxuICAgIGlubmVyY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsO1xuICAgIHBvcnQucG9zdE1lc3NhZ2UoYXJncywgW2lubmVyY2hhbm5lbC5wb3J0Ml0pO1xuICB9KTtcbn1cblxuY29uc3QgcmVwbHkgPSAobmFtZTogc3RyaW5nLCBjYjogKC4uLmFyZ3M6IGFueVtdKSA9PiBQcm9taXNlPGFueT4gfCBhbnksIG9wdHM6IHsgZm9yY2U6IGJvb2xlYW4gfSA9IHsgZm9yY2U6IGZhbHNlIH0pID0+IHtcbiAgbGV0IHBvcnQgPSBhc2tSZXBseUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDJcbiAgaWYgKCFwb3J0KSB7XG4gICAgY29uc3QgYyA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIGFza1JlcGx5Q2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xuICAgIHBvcnQgPSBjLnBvcnQyXG4gIH1cbiAgaWYgKCFvcHRzLmZvcmNlICYmIHBvcnQub25tZXNzYWdlKSB0aHJvdyBcInJlcGx5IGFscmVhZHkgc2V0IGZvciBtZXNzYWdlIFwiICsgbmFtZVxuICBjb25zdCBsID0gYXN5bmMgKGV2dDogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgY29uc3QgaW5uZXJwb3J0ID0gZXZ0LnBvcnRzWzBdXG4gICAgY29uc3QgciA9IGF3YWl0IGNiKC4uLmV2dC5kYXRhKTtcbiAgICBpbm5lcnBvcnQucG9zdE1lc3NhZ2Uocik7XG4gICAgaW5uZXJwb3J0LmNsb3NlKCk7XG4gIH1cbiAgcG9ydC5vbm1lc3NhZ2UgPSBsO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHBvcnQhLm9ubWVzc2FnZSA9IG51bGwhO1xuICB9XG59XG5cbmNvbnN0IHNlbmQgPSAobmFtZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkgPT4ge1xuICBsZXQgcG9ydCA9IHNlbmRTdWJzY3JpYmVDaGFubmVscy5nZXQobmFtZSk/LnBvcnQxXG4gIGlmICghcG9ydCkge1xuICAgIGNvbnN0IGMgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBzZW5kU3Vic2NyaWJlQ2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xuICAgIHBvcnQgPSBjLnBvcnQxXG4gIH1cbiAgcG9ydC5wb3N0TWVzc2FnZShhcmdzKTtcbn1cblxuY29uc3Qgc3Vic2NyaWJlID0gKG5hbWU6IHN0cmluZywgY2I6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiB7XG4gIGxldCBwb3J0ID0gc2VuZFN1YnNjcmliZUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDJcbiAgaWYgKCFwb3J0KSB7XG4gICAgY29uc3QgYyA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHNlbmRTdWJzY3JpYmVDaGFubmVscy5zZXQobmFtZSwgYyk7XG4gICAgcG9ydCA9IGMucG9ydDJcbiAgfVxuICBjb25zdCBsID0gKGV2dDogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgY2IoLi4uZXZ0LmRhdGEpO1xuICB9XG4gIHNlbmRTdWJzY3JpYmVDYWxsYmFja3Muc2V0KGNiLCBsKTtcbiAgcG9ydC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBsKTtcbiAgcG9ydC5zdGFydCgpO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHBvcnQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGwpO1xuICAgIHNlbmRTdWJzY3JpYmVDYWxsYmFja3MuZGVsZXRlKGNiKTtcbiAgfVxufVxuXG5jb25zdCBvbmNlID0gKG5hbWU6IHN0cmluZywgY2I6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiB7XG4gIGNvbnN0IHVuc3Vic2NyaWJlID0gc3Vic2NyaWJlKG5hbWUsICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgIGNiKC4uLmFyZ3MpO1xuICAgIHVuc3Vic2NyaWJlKCk7XG4gIH0pO1xufVxuXG5jb25zdCB1bnN1YnNjcmliZSA9IChuYW1lOiBzdHJpbmcsIGNiOiAoLi4uYXJnczogYW55W10pID0+IGFueSkgPT4ge1xuICBsZXQgcG9ydCA9IHNlbmRTdWJzY3JpYmVDaGFubmVscy5nZXQobmFtZSk/LnBvcnQyXG4gIGlmICghcG9ydCkgcmV0dXJuO1xuICBjb25zdCBsID0gc2VuZFN1YnNjcmliZUNhbGxiYWNrcy5nZXQoY2IpO1xuICBpZiAobCkge1xuICAgIHBvcnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgbCk7XG4gICAgc2VuZFN1YnNjcmliZUNhbGxiYWNrcy5kZWxldGUoY2IpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIGFzayxcbiAgcmVwbHksXG4gIHNlbmQsXG4gIHN1YnNjcmliZSxcbiAgb25jZSxcbiAgdW5zdWJzY3JpYmVcbn1cblxuZXhwb3J0IGNvbnN0IE1lc3NhZ2VTZXJ2aWNlID0ge1xuICBJbnN0YW5jZToge1xuICAgIGFzayxcbiAgICByZXBseSxcbiAgICBzZW5kLFxuICAgIHN1YnNjcmliZSxcbiAgICBvbmNlLFxuICAgIHVuc3Vic2NyaWJlXG4gIH1cbn0iLCJcbmltcG9ydCB7IGNvbXB1dGVkLCBkZWZpbmVDb21wb25lbnQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBDb21tb25SZWdpc3RyeSB9IGZyb20gXCIuLi9oZWxwZXJzL0NvbW1vblJlZ2lzdHJ5XCI7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiBcImluamVjdFwiLFxuICBwcm9wczoge1xuICAgIGlkOiB7IGRlZmF1bHQ6IG51bGwgfSxcbiAgICB0eXBlOiB7IGRlZmF1bHQ6IG51bGwsIHR5cGU6IFN0cmluZyB9LFxuICAgIHZhbHVlOiB7IGRlZmF1bHQ6IG51bGwgfSxcbiAgICBuYW1lOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogbnVsbCB9LFxuICAgIG5hbWVzOiB7IHR5cGU6IEFycmF5PHN0cmluZz4sIGRlZmF1bHQ6IG51bGwgfSxcbiAgICBncm91cDogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6IG51bGwgfSxcbiAgICBtZXRhZGF0YTogeyB0eXBlOiBPYmplY3QsIGRlZmF1bHQ6IG51bGwgfSxcbiAgICBkaXNhYmxlZDogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiBmYWxzZSB9LFxuICAgIHJlYWRvbmx5OiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IGZhbHNlIH1cbiAgfSxcbiAgc2V0dXAocHJvcHMsIHsgZW1pdCB9KSB7XG5cblxuICAgIGNvbnN0IFZhbHVlID0gY29tcHV0ZWQoe1xuICAgICAgZ2V0OiAoKSA9PiB7IHJldHVybiBwcm9wcy52YWx1ZSB9LFxuICAgICAgc2V0OiAodikgPT4geyBlbWl0KFwiaW5wdXRcIiwgdik7IH1cbiAgICB9KVxuXG4gICAgY29uc3QgQ29tcG9uZW50cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5uYW1lKVxuICAgICAgICByZXR1cm4gW0NvbW1vblJlZ2lzdHJ5Lkluc3RhbmNlLmdldENvbXBvbmVudChwcm9wcy5uYW1lLCBwcm9wcy5ncm91cCldO1xuICAgICAgaWYgKHByb3BzLmdyb3VwKVxuICAgICAgICByZXR1cm4gQ29tbW9uUmVnaXN0cnkuSW5zdGFuY2UuZ2V0R3JvdXBDb21wb25lbnRzKHByb3BzLmdyb3VwLCAuLi4ocHJvcHMubmFtZXMgfHwgW10pKTtcbiAgICAgIHJldHVybiBDb21tb25SZWdpc3RyeS5JbnN0YW5jZS5nZXRDb21wb25lbnRzKC4uLihwcm9wcy5uYW1lcyB8fCBbXSkpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY2xpY2sgPSAoLi4uYXJnczogYW55W10pID0+IHsgZW1pdCgnY2xpY2snLCAuLi5hcmdzKSB9XG4gICAgY29uc3Qgc2F2ZSA9ICguLi5hcmdzOiBhbnlbXSkgPT4geyBlbWl0KCdzYXZlJywgLi4uYXJncykgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBwcm9wcy5pZCxcbiAgICAgIHR5cGU6IHByb3BzLnR5cGUsXG4gICAgICB2YWx1ZTogcHJvcHMudmFsdWUsXG4gICAgICBuYW1lOiBwcm9wcy5uYW1lLFxuICAgICAgbmFtZXM6IHByb3BzLm5hbWVzLFxuICAgICAgZ3JvdXA6IHByb3BzLmdyb3VwLFxuICAgICAgbWV0YWRhdGE6IHByb3BzLm1ldGFkYXRhLFxuICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGVkLFxuICAgICAgcmVhZG9ubHk6IHByb3BzLnJlYWRvbmx5LFxuICAgICAgY2xpY2ssXG4gICAgICBzYXZlLFxuICAgICAgQ29tcG9uZW50cyxcbiAgICAgIFZhbHVlLFxuICAgIH1cbiAgfVxuXG59KTtcblxuIiwiXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudFB1YmxpY0luc3RhbmNlIH0gZnJvbSBcInZ1ZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9qZWN0YWJsZU1vZGVsPFQ+IHtcbiAgZGF0YTogVDsgcmVzb2x2ZTogKGl0ZW06IFQpID0+IHZvaWQ7IHJlamVjdDogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFByb2plY3RvciB7XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlID0gbmV3IFByb2plY3RvcigpO1xuICBzdGF0aWMgZ2V0IEluc3RhbmNlKCk6IFByb2plY3RvciB7IHJldHVybiBQcm9qZWN0b3IuaW5zdGFuY2UgfVxuICBzdGF0aWMgc2V0IEluc3RhbmNlKHY6IFByb2plY3RvcikgeyB0aGlzLmluc3RhbmNlID0gdjsgfVxuXG4gIHByaXZhdGUgc2NyZWVucyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gIHByaXZhdGUgcHJvamVjdGluZyA9IG5ldyBNYXA8c3RyaW5nLCB7IGNvbXBvbmVudDogQ29tcG9uZW50LCBtb2RlbDogSVByb2plY3RhYmxlTW9kZWw8YW55PiwgcHJvbWlzZTogUHJvbWlzZTxhbnk+IHwgbnVsbCwgcXVldWU6IGJvb2xlYW4gfVtdPigpO1xuXG4gIHNldFNjcmVlbihzY3JlZW46IENvbXBvbmVudFB1YmxpY0luc3RhbmNlLCBuYW1lOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIikge1xuICAgIHRoaXMuc2NyZWVucy5zZXQobmFtZSwgc2NyZWVuKTtcbiAgfVxuXG5cblxuICBwcm9qZWN0VG88VD4oY29tcG9uZW50OiBDb21wb25lbnQsIGRhdGE6IFQgfCBudWxsID0gbnVsbCwgc2NyZWVuOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIiwgcXVldWU6IGJvb2xlYW4gPSB0cnVlLCBhc3luYzogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxUPiB8IG51bGwge1xuICAgIGNvbnN0IG1vZGVsID0geyBkYXRhIH0gYXMgSVByb2plY3RhYmxlTW9kZWw8VD47XG4gICAgY29uc3QgcHJvbWlzZSA9IGFzeW5jID8gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4geyBtb2RlbC5yZWplY3QgPSByZWplY3Q7IG1vZGVsLnJlc29sdmUgPSByZXNvbHZlIH0pIDogbnVsbDtcblxuICAgIGlmICghcXVldWUpIHtcblxuICAgICAgdGhpcy5wcm9qZWN0aW5nLnNldChzY3JlZW4sIFt7IGNvbXBvbmVudCwgbW9kZWwsIHByb21pc2UsIHF1ZXVlIH1dKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLnByb2plY3RpbmcuaGFzKHNjcmVlbikpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0aW5nLnNldChzY3JlZW4sIFtdKTtcbiAgICAgIH1cbiAgICAgICh0aGlzLnByb2plY3RpbmcuZ2V0KHNjcmVlbikgfHwgW10pLnB1c2goeyBjb21wb25lbnQsIG1vZGVsLCBwcm9taXNlLCBxdWV1ZSB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBzcyA9IHRoaXMuc2NyZWVucy5nZXQoc2NyZWVuKTtcbiAgICBpZiAoIXNzKSByZXR1cm4gbnVsbDtcbiAgICBzcy5tb2RlbCA9IG1vZGVsO1xuICAgIHNzLmN1cnJlbnRWaWV3ID0gY29tcG9uZW50O1xuXG4gICAgaWYgKHByb21pc2UpIHByb21pc2UudGhlbigoKSA9PiB0aGlzLnN0b3BQcm9qZWN0aW5nKHNjcmVlbikpLmNhdGNoKCgpID0+IHRoaXMuc3RvcFByb2plY3Rpbmcoc2NyZWVuKSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBwcm9qZWN0QXN5bmNUbzxUPihjb21wb25lbnQ6IENvbXBvbmVudCwgZGF0YTogVCwgc2NyZWVuOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIiwgcXVldWU6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdFRvKGNvbXBvbmVudCwgZGF0YSwgc2NyZWVuLCBxdWV1ZSwgdHJ1ZSlcbiAgfVxuXG4gIHN0b3BQcm9qZWN0aW5nKHNjcmVlbjogc3RyaW5nID0gXCJkZWZhdWx0c2NyZWVuXCIpIHtcbiAgICBpZiAodGhpcy5wcm9qZWN0aW5nLmhhcyhzY3JlZW4pKSB7XG4gICAgICAodGhpcy5wcm9qZWN0aW5nLmdldChzY3JlZW4pIHx8IFtdKS5wb3AoKVxuICAgIH1cblxuICAgIGxldCBfc2NyZWVuID0gdGhpcy5zY3JlZW5zLmdldChzY3JlZW4pXG4gICAgaWYgKF9zY3JlZW4gJiYgX3NjcmVlbi5jdXJyZW50Vmlldykge1xuICAgICAgX3NjcmVlbi5tb2RlbCA9IG51bGw7XG4gICAgICBfc2NyZWVuLnNjcmVlbk1vZGVsID0gbnVsbDtcbiAgICAgIF9zY3JlZW4uY3VycmVudFZpZXcgPSBudWxsO1xuXG4gICAgICBpZiAodGhpcy5wcm9qZWN0aW5nLmhhcyhzY3JlZW4pKSB7XG4gICAgICAgIGxldCBzID0gdGhpcy5wcm9qZWN0aW5nLmdldChzY3JlZW4pO1xuICAgICAgICBpZiAocyAmJiBzLmxlbmd0aCkge1xuICAgICAgICAgIGxldCBtID0gcy5wb3AoKTtcbiAgICAgICAgICBpZiAobSkgdGhpcy5wcm9qZWN0VG8obS5jb21wb25lbnQsIG0ubW9kZWwsIHNjcmVlbiwgbS5xdWV1ZSwgISFtLnByb21pc2UpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0YWJsZTxUPiB7XG4gIHZhbHVlOiB7XG4gICAgZGF0YTogVCxcbiAgICByZXNvbHZlOiAoaXRlbTogVCkgPT4gdm9pZDtcbiAgICByZWplY3Q6ICgpID0+IHZvaWQ7XG4gIH07XG59IiwiXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudFB1YmxpY0luc3RhbmNlLCBjb21wdXRlZCwgZGVmaW5lQ29tcG9uZW50LCBnZXRDdXJyZW50SW5zdGFuY2UsIG9uTW91bnRlZCwgUmVmLCByZWYsIHdhdGNoIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgSVByb2plY3RhYmxlTW9kZWwsIFByb2plY3RvciB9IGZyb20gXCIuLi9oZWxwZXJzL1Byb2plY3RvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiBcInNjcmVlblwiLFxuICBwcm9wczoge1xuICAgIG5hbWU6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiBcImRlZmF1bHRzY3JlZW5cIiB9LFxuICB9LFxuICBzZXR1cChwcm9wcywgeyBleHBvc2UgfSkge1xuXG4gICAgY29uc3QgbWUgPSBnZXRDdXJyZW50SW5zdGFuY2UoKTtcblxuICAgIGNvbnN0IGN1cnJlbnRWaWV3OiBSZWY8Q29tcG9uZW50PiA9IHJlZihudWxsISk7XG4gICAgY29uc3QgbW9kZWw6IFJlZjxJUHJvamVjdGFibGVNb2RlbDxhbnk+IHwgbnVsbD4gPSByZWYobnVsbCEpO1xuXG4gICAgZXhwb3NlKHsgY3VycmVudFZpZXcsIG1vZGVsIH0pXG5cbiAgICBjb25zdCBpc1Zpc2libGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gY3VycmVudFZpZXcudmFsdWUgIT0gbnVsbDtcbiAgICB9KVxuXG4gICAgY29uc3QgY3VycmVudFZpZXdVSUQgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gKGN1cnJlbnRWaWV3LnZhbHVlIGFzIGFueSk/Ll9fZmlsZVxuICAgIH0pXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgUHJvamVjdG9yLkluc3RhbmNlLnNldFNjcmVlbigobWUgYXMgYW55KS5wcm94eSwgcHJvcHMubmFtZSk7XG4gICAgfSlcblxuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50Vmlld1VJRCxcbiAgICAgIGN1cnJlbnRWaWV3LFxuICAgICAgbW9kZWwsXG4gICAgICBpc1Zpc2libGVcbiAgICB9XG4gIH0sXG5cbn0pXG4iLCJjb25zdCBwcm9qZWN0VG9EaXJlY3RpdmUgPSB7XG5cbiAgaW5zZXJ0ZWQ6IChlbDogRWxlbWVudCwgYmluZDogYW55KSA9PiB7XG4gICAgU2NyZWVuc01hbmFnZXIuSW5zdGFuY2UuaW5qZWN0VG8oZWwsIGJpbmQuYXJnKTtcbiAgfSxcbiAgdW5iaW5kOiAoZWw6IEVsZW1lbnQsIGJpbmQ6IGFueSkgPT4ge1xuICAgIFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlLnJlbW92ZUZyb20oZWwsIGJpbmQuYXJnKVxuICB9XG59XG5cbmNvbnN0IHNjcmVlbkRpcmVjdGl2ZSA9IHtcbiAgYmluZDogKGVsOiBhbnksIGJpbmRpbmc6IGFueSkgPT4ge1xuICAgIGlmICghZWwpIHJldHVybjtcbiAgICBTY3JlZW5zTWFuYWdlci5JbnN0YW5jZS5zZXRTY3JlZW4oZWwsIGJpbmRpbmcuYXJnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHByb2plY3RUb0RpcmVjdGl2ZSwgc2NyZWVuRGlyZWN0aXZlXG59XG5cbmV4cG9ydCBjbGFzcyBTY3JlZW5zTWFuYWdlciB7XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlID0gbmV3IFNjcmVlbnNNYW5hZ2VyKCk7XG4gIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogU2NyZWVuc01hbmFnZXIgeyByZXR1cm4gU2NyZWVuc01hbmFnZXIuaW5zdGFuY2UgfVxuICBzdGF0aWMgc2V0IEluc3RhbmNlKHY6IFNjcmVlbnNNYW5hZ2VyKSB7IHRoaXMuaW5zdGFuY2UgPSB2OyB9XG4gIHByaXZhdGUgc2NyZWVucyA9IG5ldyBNYXA8c3RyaW5nLCBFbGVtZW50PigpO1xuICBcblxuICBpbmplY3RUbyhkb21FbGVtZW50OiBFbGVtZW50LCBzY3JlZW46IHN0cmluZykge1xuICAgIGlmICghZG9tRWxlbWVudCB8fCAhc2NyZWVuKSByZXR1cm47XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLnNjcmVlbnMuaGFzKHNjcmVlbikgPyB0aGlzLnNjcmVlbnMuZ2V0KHNjcmVlbikgOiBudWxsO1xuICAgIHRyeSB7IGRvbUVsZW1lbnQucGFyZW50RWxlbWVudCAmJiBkb21FbGVtZW50LnJlbW92ZUNoaWxkKGRvbUVsZW1lbnQpOyB9IGNhdGNoIHsgfVxuICAgIGlmIChlbGVtZW50KSBlbGVtZW50LmFwcGVuZChkb21FbGVtZW50KTtcbiAgfVxuXG4gIHJlbW92ZUZyb20oZG9tRWxlbWVudDogRWxlbWVudCwgc2NyZWVuOiBzdHJpbmcpIHtcbiAgICBpZiAoIWRvbUVsZW1lbnQgfHwgIXNjcmVlbikgcmV0dXJuO1xuICAgIHZhciBlbGVtZW50ID0gdGhpcy5zY3JlZW5zLmhhcyhzY3JlZW4pID8gdGhpcy5zY3JlZW5zLmdldChzY3JlZW4pIDogbnVsbDtcbiAgICB0cnkgeyBpZiAoZWxlbWVudCkgZWxlbWVudC5yZW1vdmVDaGlsZChkb21FbGVtZW50KSB9IGNhdGNoIHsgfVxuICB9XG5cbiAgc2V0U2NyZWVuKHNjcmVlbjogRWxlbWVudCwgbmFtZTogc3RyaW5nID0gXCJkZWZhdWx0c2NyZWVuXCIpIHtcbiAgICB0aGlzLnNjcmVlbnMuc2V0KG5hbWUsIHNjcmVlbik7XG4gIH1cbn1cbiIsImZ1bmN0aW9uIGNoZWNrSW5wdXRWYWxpZGF0aW9uKGE6IEV2ZW50LCBjYWxsb3V0OiAoZXJyb3JzOiBzdHJpbmdbXSwgdmFsaWQ6IGJvb2xlYW4pID0+IHZvaWQpIHtcbiAgaWYgKChhLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWxpZGl0eSkge1xuICAgIGxldCBlbCA9IChhLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KTtcblxuICAgIGlmIChlbC52YWxpZGl0eSkge1xuICAgICAgbGV0IGVycm9ycyA9IFtcbiAgICAgICAgZWwudmFsaWRpdHkuYmFkSW5wdXQgPyBcImJhZCBpbnB1dFwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkuY3VzdG9tRXJyb3IgPyBcImN1c3RvbSBlcnJvclwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkucGF0dGVybk1pc21hdGNoID8gXCJwYXR0ZXJuIG1pc21hdGNoXCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS5yYW5nZU92ZXJmbG93ID8gXCJyYW5nZSBvdmVyZmxvd1wiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkucmFuZ2VVbmRlcmZsb3cgPyBcInJhbmdlIHVuZGVyZmxvd1wiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkuc3RlcE1pc21hdGNoID8gXCJzdGVwIG1pc21hdGNoXCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS50b29Mb25nID8gXCJ0b28gbG9uZ1wiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkudG9vU2hvcnQgPyBcInRvbyBzaG9ydFwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkudHlwZU1pc21hdGNoID8gXCJ0eXBlIG1pc21hdGNoXCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS52YWx1ZU1pc3NpbmcgPyBcInZhbHVlIG1pc3NpbmdcIiA6IG51bGxdLmZpbHRlcihpID0+ICEhaSlcblxuICAgICAgY2FsbG91dChlcnJvcnMgYXMgc3RyaW5nW10sIGVsLnZhbGlkaXR5LnZhbGlkICE9IHVuZGVmaW5lZCA/IGVsLnZhbGlkaXR5LnZhbGlkIDogdHJ1ZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZSA9IHtcbiAgaW5zZXJ0ZWQ6IChlbDogSFRNTElucHV0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudCwgYmluZDoge1xuICAgIHZhbHVlOiAoZXJyb3JzOiBzdHJpbmdbXSwgdmFsaWQ6IGJvb2xlYW4pID0+IHZvaWQsXG4gICAgYXJnOiBcImltbWVkaWF0ZVwiXG4gIH0pID0+IHtcbiAgICBpZiAoIWVsIHx8ICFlbC53aWxsVmFsaWRhdGUpIHJldHVybjtcbiAgICBzd2l0Y2ggKGVsLm5vZGVOYW1lKSB7XG4gICAgICBjYXNlIFwiSU5QVVRcIjpcbiAgICAgIGNhc2UgXCJURVhUQVJFQVwiOiBlbC5vbmJsdXIgPSAoYXJnKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbihhcmcsIGJpbmQudmFsdWUpOyBicmVhaztcbiAgICAgIGNhc2UgXCJTRUxFQ1RcIjogZWwub25jaGFuZ2UgPSAoYXJnKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbihhcmcsIGJpbmQudmFsdWUpOyBicmVhaztcbiAgICB9XG5cbiAgICBlbC5vbmludmFsaWQgPSAoYXJnKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbihhcmcsIGJpbmQudmFsdWUpO1xuICAgIGlmIChlbC5mb3JtKSBlbC5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2ludmFsaWQnLCAoKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbih7IHRhcmdldDogZWwgfSBhcyBhbnksIGJpbmQudmFsdWUpKVxuXG4gICAgaWYgKGJpbmQuYXJnID09IFwiaW1tZWRpYXRlXCIpIGVsLnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgZWxzZSBjaGVja0lucHV0VmFsaWRhdGlvbih7IHRhcmdldDogZWwgfSBhcyBhbnksIGJpbmQudmFsdWUpXG4gIH0sXG4gIHVuYmluZDogKGVsOiBFbGVtZW50KSA9PiB7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuXG4gIH0sXG59XG4iLCJpbXBvcnQgeyBNZW51SGVscGVyLCBtZW51VHlwZSwgTWVudU5vdGlmaWNhdGlvbnMsIElNZW51RGVmaW5pdGlvbiB9IGZyb20gXCIuL2hlbHBlcnMvTWVudUhlbHBlclwiO1xuaW1wb3J0IHsgQ29tbW9uUmVnaXN0cnkgfSBmcm9tIFwiLi9oZWxwZXJzL0NvbW1vblJlZ2lzdHJ5XCI7XG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSB9IGZyb20gXCIuL2hlbHBlcnMvTWVzc2FnZVNlcnZpY2VcIjtcbmltcG9ydCB7IElSb3V0ZUNvbmZpZyB9IGZyb20gXCIuL2ludGVyZmFjZXMvUm91dGVySW50ZXJmYWNlc1wiO1xuaW1wb3J0IGluamVjdCBmcm9tICcuL2NvbXBvbmVudHMvaW5qZWN0LnZ1ZSc7XG5pbXBvcnQgc2NyZWVuIGZyb20gXCIuL2NvbXBvbmVudHMvc2NyZWVuLnZ1ZVwiO1xuaW1wb3J0IHsgSVByb2plY3RhYmxlTW9kZWwsIFByb2plY3RhYmxlLCBQcm9qZWN0b3IgfSBmcm9tIFwiLi9oZWxwZXJzL1Byb2plY3RvclwiO1xuaW1wb3J0IGRpcmVjdGl2ZXMsIHsgU2NyZWVuc01hbmFnZXIgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL3NjcmVlblwiO1xuaW1wb3J0IHsgdmFsaWRhdGUgYXMgVmFsaWRhdGVEaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL3ZhbGlkYXRlXCI7XG5cblxuZnVuY3Rpb24gaW5zdGFsbChWdWU6IHsgY29tcG9uZW50OiBhbnksIGRpcmVjdGl2ZTogYW55IH0pIHtcbiAgVnVlLmNvbXBvbmVudChcInNjcmVlblwiLCBzY3JlZW4pO1xuICBWdWUuY29tcG9uZW50KFwiaW5qZWN0XCIsIGluamVjdCk7XG4gIFZ1ZS5kaXJlY3RpdmUoXCJzY3JlZW5cIiwgZGlyZWN0aXZlcy5zY3JlZW5EaXJlY3RpdmUpO1xuICBWdWUuZGlyZWN0aXZlKFwicHJvamVjdFRvXCIsIGRpcmVjdGl2ZXMucHJvamVjdFRvRGlyZWN0aXZlKTtcbiAgVnVlLmRpcmVjdGl2ZShcInZhbGlkYXRlXCIsIFZhbGlkYXRlRGlyZWN0aXZlIGFzIGFueSk7XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBJTW9kdWxlSW5pdGlhbGl6ZXIge1xuICBpbml0KHZ1ZW1mOiB0eXBlb2YgVnVlTWZNb2R1bGUsIG1lbnU6IE1lbnVIZWxwZXIsIGNvbmZpZ3VyYXRpb246IGFueSk6IFByb21pc2U8dm9pZD4sXG5cbiAgY29uZmlnPyhtZW51OiBNZW51SGVscGVyLCBjb25maWd1cmF0aW9uOiBhbnkpOiBQcm9taXNlPHZvaWQ+LFxuXG4gIHJ1bj8obWVudTogTWVudUhlbHBlciwgY29uZmlndXJhdGlvbjogYW55KTogUHJvbWlzZTx2b2lkPixcblxuICByb3V0ZXM6IElSb3V0ZUNvbmZpZ1tdXG59XG5cbmludGVyZmFjZSBJTW9kdWxlSW5pdGlhbGl6ZXJXcmFwcGVyIHtcbiAgaW5pdChtZW51OiBNZW51SGVscGVyLFxuICAgIGNvbmZpZ3VyYXRpb246IGFueVxuICAgICwgb3B0aW9uczoge1xuICAgICAgcmVnaXN0cnk6IENvbW1vblJlZ2lzdHJ5LFxuICAgICAgbWVzc2FnZVNlcnZpY2U6IHR5cGVvZiBNZXNzYWdlU2VydmljZS5JbnN0YW5jZSxcbiAgICAgIHByb2plY3RvcjogUHJvamVjdG9yLFxuICAgICAgc2NyZWVuczogU2NyZWVuc01hbmFnZXJcbiAgICB9KTogUHJvbWlzZTx2b2lkPixcbiAgY29uZmlnKG1lbnU6IE1lbnVIZWxwZXIpOiBQcm9taXNlPHZvaWQ+LFxuICBydW4obWVudTogTWVudUhlbHBlcik6IFByb21pc2U8dm9pZD4sXG4gIHJvdXRlczogSVJvdXRlQ29uZmlnW11cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1vZHVsZUluaXRpYWxpemVyKG9wdHM6IElNb2R1bGVJbml0aWFsaXplcikge1xuICBsZXQgbW9kdWxlQ29uZmlnID0ge307XG4gIHJldHVybiB7XG4gICAgaW5pdChtZW51OiBNZW51SGVscGVyLCBjb25maWd1cmF0aW9uOiBhbnksXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIHJlZ2lzdHJ5OiBDb21tb25SZWdpc3RyeSxcbiAgICAgICAgbWVzc2FnZVNlcnZpY2U6IHR5cGVvZiBNZXNzYWdlU2VydmljZS5JbnN0YW5jZSxcbiAgICAgICAgcHJvamVjdG9yOiBQcm9qZWN0b3IsXG4gICAgICAgIHNjcmVlbnM6IFNjcmVlbnNNYW5hZ2VyXG4gICAgICB9KSB7XG5cbiAgICAgIGlmIChvcHRpb25zLnJlZ2lzdHJ5KSBDb21tb25SZWdpc3RyeS5JbnN0YW5jZSA9IG9wdGlvbnMucmVnaXN0cnk7XG4gICAgICBpZiAob3B0aW9ucy5tZXNzYWdlU2VydmljZSkgTWVzc2FnZVNlcnZpY2UuSW5zdGFuY2UgPSBvcHRpb25zLm1lc3NhZ2VTZXJ2aWNlXG4gICAgICBpZiAob3B0aW9ucy5wcm9qZWN0b3IpIFByb2plY3Rvci5JbnN0YW5jZSA9IG9wdGlvbnMucHJvamVjdG9yO1xuICAgICAgaWYgKG9wdGlvbnMuc2NyZWVucykgU2NyZWVuc01hbmFnZXIuSW5zdGFuY2UgPSBvcHRpb25zLnNjcmVlbnM7XG4gICAgICBtb2R1bGVDb25maWcgPSBjb25maWd1cmF0aW9uO1xuICAgICAgcmV0dXJuIG9wdHMuaW5pdChWdWVNZk1vZHVsZSwgbWVudSwgY29uZmlndXJhdGlvbik7XG4gICAgfSxcbiAgICBjb25maWcobWVudTogTWVudUhlbHBlcikge1xuICAgICAgcmV0dXJuIG9wdHMuY29uZmlnID8gb3B0cy5jb25maWcobWVudSwgbW9kdWxlQ29uZmlnKSA6IG51bGw7XG4gICAgfSxcbiAgICBydW4obWVudTogTWVudUhlbHBlcikge1xuICAgICAgcmV0dXJuIG9wdHMucnVuID8gb3B0cy5ydW4obWVudSwgbW9kdWxlQ29uZmlnKSA6IG51bGw7XG4gICAgfSxcbiAgICByb3V0ZXM6IG9wdHMucm91dGVzXG4gIH0gYXMgSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlclxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gSW5pdE1vZHVsZShtb2R1bGU6IHsgZGVmYXVsdDogSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlciB9LCBjb25maWd1cmF0aW9uOiBhbnkgfCB1bmRlZmluZWQpOiBQcm9taXNlPElNb2R1bGVJbml0aWFsaXplcj4ge1xuICBjb25zdCBpbml0b2JqID0gKChtb2R1bGUuZGVmYXVsdCBhcyBhbnkpLmRlZmF1bHQgfHwgbW9kdWxlLmRlZmF1bHQpIGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXI7XG4gIHJldHVybiBpbml0b2JqLmluaXQoTWVudUhlbHBlci5JbnN0YW5jZSwgY29uZmlndXJhdGlvbiB8fCB7fSxcbiAgICB7XG4gICAgICByZWdpc3RyeTogQ29tbW9uUmVnaXN0cnkuSW5zdGFuY2UsXG4gICAgICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UuSW5zdGFuY2UsXG4gICAgICBwcm9qZWN0b3I6IFByb2plY3Rvci5JbnN0YW5jZSxcbiAgICAgIHNjcmVlbnM6IFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gaW5pdG9iaiBhcyB1bmtub3duIGFzIElNb2R1bGVJbml0aWFsaXplcjtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbmZpZ01vZHVsZShtb2R1bGU6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBpbml0b2JqID0gKG1vZHVsZS5kZWZhdWx0LmRlZmF1bHQgfHwgbW9kdWxlLmRlZmF1bHQpIGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXI7XG4gIHJldHVybiBpbml0b2JqLmNvbmZpZyhNZW51SGVscGVyLkluc3RhbmNlKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gUnVuTW9kdWxlKG1vZHVsZTogYW55KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGluaXRvYmogPSAobW9kdWxlLmRlZmF1bHQuZGVmYXVsdCB8fCBtb2R1bGUuZGVmYXVsdCkgYXMgSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlcjtcbiAgcmV0dXJuIGluaXRvYmoucnVuKE1lbnVIZWxwZXIuSW5zdGFuY2UpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTW9kdWxlUm91dGVzKG1vZHVsZTogYW55KTogSVJvdXRlQ29uZmlnW10ge1xuICBjb25zdCBpbml0b2JqID0gKG1vZHVsZS5kZWZhdWx0LmRlZmF1bHQgfHwgbW9kdWxlLmRlZmF1bHQpIGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXI7XG4gIHJldHVybiBpbml0b2JqLnJvdXRlcztcbn1cblxuZXhwb3J0IHtcbiAgTWVudUhlbHBlcixcbiAgdHlwZSBJTWVudURlZmluaXRpb24sXG4gIG1lbnVUeXBlLFxuICBDb21tb25SZWdpc3RyeSxcbiAgTWVzc2FnZVNlcnZpY2UsXG4gIGluamVjdCxcbiAgc2NyZWVuLFxuICBWYWxpZGF0ZURpcmVjdGl2ZSxcbiAgdHlwZSBQcm9qZWN0YWJsZSxcbiAgdHlwZSBJUHJvamVjdGFibGVNb2RlbCxcbiAgTWVudU5vdGlmaWNhdGlvbnMsXG4gIFByb2plY3Rvcixcbn1cblxuY29uc3QgVnVlTWZNb2R1bGUgPSB7XG4gIGluc3RhbGwsXG4gIE1lbnVIZWxwZXI6IG5ldyBNZW51SGVscGVyKCksXG4gIG1lbnVUeXBlLFxuICBDb21tb25SZWdpc3RyeTogbmV3IENvbW1vblJlZ2lzdHJ5KCksXG4gIE1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcbiAgaW5qZWN0LFxuICBzY3JlZW4sXG4gIFZhbGlkYXRlRGlyZWN0aXZlLFxuICBNZW51Tm90aWZpY2F0aW9ucyxcbiAgUHJvamVjdG9yXG59XG5cbmV4cG9ydCBkZWZhdWx0IFZ1ZU1mTW9kdWxlO1xuIl0sIm5hbWVzIjpbIkUiLCJuYW1lIiwiY2FsbGJhY2siLCJjdHgiLCJlIiwic2VsZiIsImxpc3RlbmVyIiwiZGF0YSIsImV2dEFyciIsImkiLCJsZW4iLCJldnRzIiwibGl2ZUV2ZW50cyIsInRpbnlFbWl0dGVyTW9kdWxlIiwiVGlueUVtaXR0ZXIiLCJtZW51VHlwZSIsIm1lbnVUeXBlMiIsIk1lbnVOb3RpZmljYXRpb25zIiwiX01lbnVIZWxwZXIiLCJfX3B1YmxpY0ZpZWxkIiwibWVudURlZmluaXRpb24iLCJwb3NpdGlvbnMiLCJmb3VuZCIsIm0iLCJlbGVtZW50IiwibWVudSIsInJlc3VsdCIsInVzZWQiLCJrZXkiLCJyciIsImIiLCJhIiwiTWVudUhlbHBlciIsIl9Db21tb25SZWdpc3RyeSIsInYiLCJjb21wb25lbnQiLCJncm91cCIsImdnIiwiZyIsInNlcnZpY2UiLCJDb21tb25SZWdpc3RyeSIsImFza1JlcGx5Q2hhbm5lbHMiLCJzZW5kU3Vic2NyaWJlQ2hhbm5lbHMiLCJzZW5kU3Vic2NyaWJlQ2FsbGJhY2tzIiwiYXNrIiwiYXJncyIsInJlc29sdmUiLCJwb3J0IiwiX2EiLCJjIiwiaW5uZXJjaGFubmVsIiwibCIsImV2dCIsInJlcGx5IiwiY2IiLCJvcHRzIiwiaW5uZXJwb3J0IiwiciIsInNlbmQiLCJzdWJzY3JpYmUiLCJvbmNlIiwidW5zdWJzY3JpYmUiLCJNZXNzYWdlU2VydmljZSIsIl9zZmNfbWFpbiQxIiwiZGVmaW5lQ29tcG9uZW50IiwicHJvcHMiLCJlbWl0IiwiVmFsdWUiLCJjb21wdXRlZCIsIkNvbXBvbmVudHMiLCJjbGljayIsInNhdmUiLCJfUHJvamVjdG9yIiwic2NyZWVuIiwicXVldWUiLCJhc3luYyIsIm1vZGVsIiwicHJvbWlzZSIsInJlamVjdCIsInNzIiwiX3NjcmVlbiIsInMiLCJQcm9qZWN0b3IiLCJfc2ZjX21haW4iLCJleHBvc2UiLCJtZSIsImdldEN1cnJlbnRJbnN0YW5jZSIsImN1cnJlbnRWaWV3IiwicmVmIiwiaXNWaXNpYmxlIiwiY3VycmVudFZpZXdVSUQiLCJvbk1vdW50ZWQiLCJwcm9qZWN0VG9EaXJlY3RpdmUiLCJlbCIsImJpbmQiLCJTY3JlZW5zTWFuYWdlciIsInNjcmVlbkRpcmVjdGl2ZSIsImJpbmRpbmciLCJkaXJlY3RpdmVzIiwiX1NjcmVlbnNNYW5hZ2VyIiwiZG9tRWxlbWVudCIsImNoZWNrSW5wdXRWYWxpZGF0aW9uIiwiY2FsbG91dCIsImVycm9ycyIsInZhbGlkYXRlIiwiYXJnIiwiaW5zdGFsbCIsIlZ1ZSIsImluamVjdCIsIlZhbGlkYXRlRGlyZWN0aXZlIiwiTW9kdWxlSW5pdGlhbGl6ZXIiLCJtb2R1bGVDb25maWciLCJjb25maWd1cmF0aW9uIiwib3B0aW9ucyIsIlZ1ZU1mTW9kdWxlIiwiSW5pdE1vZHVsZSIsIm1vZHVsZSIsImluaXRvYmoiLCJDb25maWdNb2R1bGUiLCJSdW5Nb2R1bGUiLCJNb2R1bGVSb3V0ZXMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsU0FBU0EsSUFBSztBQUdkO0FBRUFBLEVBQUUsWUFBWTtBQUFBLEVBQ1osSUFBSSxTQUFVQyxHQUFNQyxHQUFVQyxHQUFLO0FBQ2pDLFFBQUlDLElBQUksS0FBSyxNQUFNLEtBQUssSUFBSSxDQUFBO0FBRTVCLFlBQUNBLEVBQUVILENBQUksTUFBTUcsRUFBRUgsQ0FBSSxJQUFJLENBQUEsSUFBSyxLQUFLO0FBQUEsTUFDL0IsSUFBSUM7QUFBQSxNQUNKLEtBQUtDO0FBQUEsSUFDWCxDQUFLLEdBRU07QUFBQSxFQUNSO0FBQUEsRUFFRCxNQUFNLFNBQVVGLEdBQU1DLEdBQVVDLEdBQUs7QUFDbkMsUUFBSUUsSUFBTztBQUNYLGFBQVNDLElBQVk7QUFDbkIsTUFBQUQsRUFBSyxJQUFJSixHQUFNSyxDQUFRLEdBQ3ZCSixFQUFTLE1BQU1DLEdBQUssU0FBUztBQUFBLElBRW5DO0FBQ0ksV0FBQUcsRUFBUyxJQUFJSixHQUNOLEtBQUssR0FBR0QsR0FBTUssR0FBVUgsQ0FBRztBQUFBLEVBQ25DO0FBQUEsRUFFRCxNQUFNLFNBQVVGLEdBQU07QUFDcEIsUUFBSU0sSUFBTyxDQUFBLEVBQUcsTUFBTSxLQUFLLFdBQVcsQ0FBQyxHQUNqQ0MsTUFBVyxLQUFLLE1BQU0sS0FBSyxJQUFJLENBQUEsSUFBS1AsQ0FBSSxLQUFLLENBQUUsR0FBRSxNQUFLLEdBQ3REUSxJQUFJLEdBQ0pDLElBQU1GLEVBQU87QUFF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ZSxXQUFXbUQsRUFBUSxpQkFDMURBLEVBQVEsY0FBVy9CLEVBQVUsV0FBVytCLEVBQVEsWUFDaERBLEVBQVEsWUFBU2xCLEVBQWUsV0FBV2tCLEVBQVEsVUFDeENGLElBQUFDLEdBQ1J6RCxFQUFLLEtBQUsyRCxJQUFhekYsR0FBTXVGLENBQWE7QUFBQSxJQUNuRDtBQUFBLElBQ0EsT0FBT3ZGLEdBQWtCO0FBQ3ZCLGFBQU84QixFQUFLLFNBQVNBLEVBQUssT0FBTzlCLEdBQU1zRixDQUFZLElBQUk7QUFBQSxJQUN6RDtBQUFBLElBQ0EsSUFBSXRGLEdBQWtCO0FBQ3BCLGFBQU84QixFQUFLLE1BQU1BLEVBQUssSUFBSTlCLEdBQU1zRixDQUFZLElBQUk7QUFBQSxJQUNuRDtBQUFBLElBQ0EsUUFBUXhELEVBQUs7QUFBQSxFQUFBO0FBRWpCO0FBRXNCLGVBQUE0RCxHQUFXQyxHQUFnREosR0FBNkQ7QUFDNUksUUFBTUssSUFBWUQsRUFBTyxRQUFnQixXQUFXQSxFQUFPO0FBQzNELFNBQU9DLEVBQVE7QUFBQSxJQUFLckYsRUFBVztBQUFBLElBQVVnRixLQUFpQixDQUFDO0FBQUEsSUFDekQ7QUFBQSxNQUNFLFVBQVV4RSxFQUFlO0FBQUEsTUFDekIsZ0JBQWdCc0IsRUFBZTtBQUFBLE1BQy9CLFdBQVdvQixFQUFVO0FBQUEsTUFDckIsU0FBU2EsRUFBZTtBQUFBLElBQzFCO0FBQUEsRUFBQyxFQUFFLEtBQUssTUFDQ3NCLENBQ1I7QUFDTDtBQUVPLFNBQVNDLEdBQWFGLEdBQTRCO0FBRWhELFVBRFVBLEVBQU8sUUFBUSxXQUFXQSxFQUFPLFNBQ25DLE9BQU9wRixFQUFXLFFBQVE7QUFDM0M7QUFHTyxTQUFTdUYsR0FBVUgsR0FBNEI7QUFFN0MsVUFEVUEsRUFBTyxRQUFRLFdBQVdBLEVBQU8sU0FDbkMsSUFBSXBGLEVBQVcsUUFBUTtBQUN4QztBQUVPLFNBQVN3RixHQUFhSixHQUE2QjtBQUV4RCxVQURpQkEsRUFBTyxRQUFRLFdBQVdBLEVBQU8sU0FDbkM7QUFDakI7QUFpQkEsTUFBTUYsS0FBYztBQUFBLEVBQ2xCLFNBQUFSO0FBQUEsRUFDQSxZQUFZLElBQUkxRSxFQUFXO0FBQUEsRUFDM0IsVUFBQWpCO0FBQUEsRUFDQSxnQkFBZ0IsSUFBSXlCLEVBQWU7QUFBQSxFQUNuQyxnQkFBQXNCO0FBQUEsRUFDQSxRQUFBOEM7QUFBQSxFQUNBLFFBQUFuQztBQUFBLEVBQUEsbUJBQ0FvQztBQUFBQSxFQUNBLG1CQUFBNUY7QUFBQSxFQUNBLFdBQUFpRTtBQUNGOyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswXX0=

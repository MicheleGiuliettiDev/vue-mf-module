var R = Object.defineProperty;
var z = (n, e, t) => e in n ? R(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var c = (n, e, t) => (z(n, typeof e != "symbol" ? e + "" : e, t), t);
import { defineComponent as x, computed as w, openBlock as p, createElementBlock as C, Fragment as K, renderList as X, createBlock as D, resolveDynamicComponent as E, getCurrentInstance as J, ref as b, onMounted as Q, withDirectives as W, createCommentVNode as Y, vShow as Z } from "vue";
var A = { exports: {} };
function V() {
}
V.prototype = {
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
      for (var s = 0, o = r.length; s < o; s++)
        r[s].fn !== e && r[s].fn._ !== e && i.push(r[s]);
    return i.length ? t[n] = i : delete t[n], this;
  }
};
A.exports = V;
var q = A.exports.TinyEmitter = V, T = /* @__PURE__ */ ((n) => (n[n.drawer = 0] = "drawer", n[n.bottom = 1] = "bottom", n[n.header = 2] = "header", n))(T || {});
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
  addMenuDefinition(e, ...t) {
    let r = this.menuDefinitions.find((i) => i.name == e.name);
    r ? e = r : this.menuDefinitions.push(e);
    for (const i of t)
      this.menuStructure[i.section] = this.menuStructure[i.section] || {}, this.menuStructure[i.section][i.parent || e.name] = this.menuStructure[i.section][i.parent || e.name] || [], i.parent && this.menuStructure[i.section][i.parent].push(e.name);
    this.notifications.emit(L.menuDefinitionAdded, e);
  }
  getMenuItem(e) {
    return this.menuDefinitions.find((t) => t.name == e);
  }
  getMenu(e) {
    let t = [], r = /* @__PURE__ */ new Set();
    for (const i in this.menuStructure[e]) {
      const s = this.menuStructure[e][i];
      let o = {
        item: this.menuDefinitions.find((a) => a.name == i && (!a.hidden || !a.hidden())),
        children: s.map((a) => this.menuDefinitions.find((l) => l.name == a && (!l.hidden || !l.hidden()))).filter((a) => !!a).sort((a, l) => a && l && a.orderIndex && l.orderIndex && a.orderIndex > l.orderIndex ? 1 : a && l && a.orderIndex && l.orderIndex && a.orderIndex < l.orderIndex ? -1 : 0)
      };
      o.item && (r.add(i), s.forEach((a) => r.add(a)), t.push(o));
    }
    return t.filter((i) => !!i.item).sort((i, s) => i && s && i.item && s.item && i.item.orderIndex && s.item.orderIndex && i.item.orderIndex > s.item.orderIndex ? 1 : i && s && i.item && s.item && i.item.orderIndex && s.item.orderIndex && i.item.orderIndex < s.item.orderIndex ? -1 : 0);
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
c(S, "instance", new S());
let u = S;
const M = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Map(), j = /* @__PURE__ */ new Map(), H = (n, ...e) => new Promise((t) => {
  var o;
  let r = (o = M.get(n)) == null ? void 0 : o.port1;
  if (!r) {
    const a = new MessageChannel();
    M.set(n, a), r = a.port1;
  }
  let i = new MessageChannel();
  const s = (a) => {
    t(a.data), i = null;
  };
  i.port1.onmessage = s, r.postMessage(e, [i.port2]);
}), _ = (n, e, t = { force: !1 }) => {
  var s;
  let r = (s = M.get(n)) == null ? void 0 : s.port2;
  if (!r) {
    const o = new MessageChannel();
    M.set(n, o), r = o.port2;
  }
  if (!t.force && r.onmessage)
    throw "reply already set for message " + n;
  const i = async (o) => {
    const a = o.ports[0], l = await e(...o.data);
    a.postMessage(l), a.close();
  };
  return r.onmessage = i, () => {
    r.onmessage = null;
  };
}, ee = (n, ...e) => {
  var r;
  let t = (r = I.get(n)) == null ? void 0 : r.port1;
  if (!t) {
    const i = new MessageChannel();
    I.set(n, i), t = i.port1;
  }
  t.postMessage(e);
}, O = (n, e) => {
  var i;
  let t = (i = I.get(n)) == null ? void 0 : i.port2;
  if (!t) {
    const s = new MessageChannel();
    I.set(n, s), t = s.port2;
  }
  const r = (s) => {
    e(...s.data);
  };
  return j.set(e, r), t.addEventListener("message", r), t.start(), () => {
    t == null || t.removeEventListener("message", r), j.delete(e);
  };
}, te = (n, e) => {
  const t = O(n, (...r) => {
    e(...r), t();
  });
}, ne = (n, e) => {
  var i;
  let t = (i = I.get(n)) == null ? void 0 : i.port2;
  if (!t)
    return;
  const r = j.get(e);
  r && (t.removeEventListener("message", r), j.delete(e));
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
  setup(n, { emit: e }) {
    const t = w({
      get: () => n.value,
      set: (o) => {
        e("input", o);
      }
    }), r = w(() => n.name ? [u.Instance.getComponent(n.name, n.group)] : n.group ? u.Instance.getGroupComponents(n.group, ...n.names || []) : u.Instance.getComponents(...n.names || [])), i = (...o) => {
      e("click", ...o);
    }, s = (...o) => {
      e("save", ...o);
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
}), B = (n, e) => {
  const t = n.__vccOpts || n;
  for (const [r, i] of e)
    t[r] = i;
  return t;
};
function ie(n, e, t, r, i, s) {
  return p(), C("div", null, [
    (p(!0), C(K, null, X(n.Components, (o, a) => (p(), D(E(o), {
      disabled: n.disabled,
      readonly: n.readonly,
      key: a,
      id: n.id,
      type: n.type,
      metadata: n.metadata,
      modelValue: n.Value,
      "onUpdate:modelValue": e[0] || (e[0] = (l) => n.Value = l),
      onClick: n.click,
      onSave: n.save
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
  setScreen(e, t = "defaultscreen") {
    this.screens.set(t, e);
  }
  projectTo(e, t = null, r = "defaultscreen", i = !0, s = !1) {
    const o = { data: t }, a = s ? new Promise((P, F) => {
      o.reject = F, o.resolve = P;
    }) : null;
    i ? (this.projecting.has(r) || this.projecting.set(r, []), (this.projecting.get(r) || []).push({ component: e, model: o, promise: a, queue: i })) : this.projecting.set(r, [{ component: e, model: o, promise: a, queue: i }]);
    const l = this.screens.get(r);
    return l ? (l.model = o, l.currentView = e, a && a.then(() => this.stopProjecting(r)).catch(() => this.stopProjecting(r)), a) : null;
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
c(v, "instance", new v());
let g = v;
const se = x({
  name: "screen",
  props: {
    name: { type: String, default: "defaultscreen" }
  },
  setup(n, { expose: e }) {
    const t = J(), r = b(null), i = b(null);
    e({ currentView: r, model: i });
    const s = w(() => r.value != null), o = w(() => {
      var a;
      return (a = r.value) == null ? void 0 : a.__file;
    });
    return Q(() => {
      g.Instance.setScreen(t.proxy, n.name);
    }), {
      currentViewUID: o,
      currentView: r,
      model: i,
      isVisible: s
    };
  }
});
function ae(n, e, t, r, i, s) {
  return W((p(), C("div", null, [
    n.currentView ? (p(), D(E(n.currentView), {
      value: n.model,
      key: n.currentViewUID
    }, null, 8, ["value"])) : Y("", !0)
  ], 512)), [
    [Z, n.isVisible]
  ]);
}
const U = /* @__PURE__ */ B(se, [["render", ae]]), oe = {
  inserted: (n, e) => {
    d.Instance.injectTo(n, e.arg);
  },
  unbind: (n, e) => {
    d.Instance.removeFrom(n, e.arg);
  }
}, le = {
  bind: (n, e) => {
    n && d.Instance.setScreen(n, e.arg);
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
c(y, "instance", new y());
let d = y;
function h(n, e) {
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
const G = {
  inserted: (n, e) => {
    if (!(!n || !n.willValidate)) {
      switch (n.nodeName) {
        case "INPUT":
        case "TEXTAREA":
          n.onblur = (t) => h(t, e.value);
          break;
        case "SELECT":
          n.onchange = (t) => h(t, e.value);
          break;
      }
      n.oninvalid = (t) => h(t, e.value), n.form && n.form.addEventListener("invalid", () => h({ target: n }, e.value)), e.arg == "immediate" ? n.reportValidity() : h({ target: n }, e.value);
    }
  },
  unbind: (n) => {
  }
};
function ce(n) {
  n.component("screen", U), n.component("inject", N), n.directive("screen", $.screenDirective), n.directive("projectTo", $.projectToDirective), n.directive("validate", G);
}
function ge(n) {
  let e = {};
  return {
    init(t, r, i, s) {
      return s.registry && (u.Instance = s.registry), s.messageService && (k.Instance = s.messageService), s.projector && (g.Instance = s.projector), s.screens && (d.Instance = s.screens), e = i, n.init(ue, t, r, i);
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
async function he(n, e, t) {
  const r = n.default.default || n.default;
  return r.init(
    f.Instance,
    e,
    t || {},
    {
      registry: u.Instance,
      messageService: k.Instance,
      projector: g.Instance,
      screens: d.Instance
    }
  ).then(() => r);
}
function pe(n, e) {
  return (n.default.default || n.default).config(f.Instance, e);
}
function me(n, e) {
  return (n.default.default || n.default).run(f.Instance, e);
}
function ve(n) {
  return (n.default.default || n.default).routes;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlLW1mLW1vZHVsZS5lcy5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RpbnktZW1pdHRlci9pbmRleC5qcyIsIi4uL3NyYy9oZWxwZXJzL01lbnVIZWxwZXIudHMiLCIuLi9zcmMvaGVscGVycy9Db21tb25SZWdpc3RyeS50cyIsIi4uL3NyYy9oZWxwZXJzL01lc3NhZ2VTZXJ2aWNlLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvaW5qZWN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZy50cyIsIi4uL3NyYy9oZWxwZXJzL1Byb2plY3Rvci50cyIsIi4uL3NyYy9jb21wb25lbnRzL3NjcmVlbi52dWU/dnVlJnR5cGU9c2NyaXB0JmxhbmcudHMiLCIuLi9zcmMvZGlyZWN0aXZlcy9zY3JlZW4udHMiLCIuLi9zcmMvZGlyZWN0aXZlcy92YWxpZGF0ZS50cyIsIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBFICgpIHtcbiAgLy8gS2VlcCB0aGlzIGVtcHR5IHNvIGl0J3MgZWFzaWVyIHRvIGluaGVyaXQgZnJvbVxuICAvLyAodmlhIGh0dHBzOi8vZ2l0aHViLmNvbS9saXBzbWFjayBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvaXNzdWVzLzMpXG59XG5cbkUucHJvdG90eXBlID0ge1xuICBvbjogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICB2YXIgZSA9IHRoaXMuZSB8fCAodGhpcy5lID0ge30pO1xuXG4gICAgKGVbbmFtZV0gfHwgKGVbbmFtZV0gPSBbXSkpLnB1c2goe1xuICAgICAgZm46IGNhbGxiYWNrLFxuICAgICAgY3R4OiBjdHhcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG9uY2U6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGxpc3RlbmVyICgpIHtcbiAgICAgIHNlbGYub2ZmKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIuXyA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHRoaXMub24obmFtZSwgbGlzdGVuZXIsIGN0eCk7XG4gIH0sXG5cbiAgZW1pdDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZGF0YSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICB2YXIgZXZ0QXJyID0gKCh0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KSlbbmFtZV0gfHwgW10pLnNsaWNlKCk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsZW4gPSBldnRBcnIubGVuZ3RoO1xuXG4gICAgZm9yIChpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGV2dEFycltpXS5mbi5hcHBseShldnRBcnJbaV0uY3R4LCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvZmY6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG4gICAgdmFyIGV2dHMgPSBlW25hbWVdO1xuICAgIHZhciBsaXZlRXZlbnRzID0gW107XG5cbiAgICBpZiAoZXZ0cyAmJiBjYWxsYmFjaykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV2dHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGV2dHNbaV0uZm4gIT09IGNhbGxiYWNrICYmIGV2dHNbaV0uZm4uXyAhPT0gY2FsbGJhY2spXG4gICAgICAgICAgbGl2ZUV2ZW50cy5wdXNoKGV2dHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBldmVudCBmcm9tIHF1ZXVlIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtcbiAgICAvLyBTdWdnZXN0ZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2xhemRcbiAgICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvY29tbWl0L2M2ZWJmYWE5YmM5NzNiMzNkMTEwYTg0YTMwNzc0MmI3Y2Y5NGM5NTMjY29tbWl0Y29tbWVudC01MDI0OTEwXG5cbiAgICAobGl2ZUV2ZW50cy5sZW5ndGgpXG4gICAgICA/IGVbbmFtZV0gPSBsaXZlRXZlbnRzXG4gICAgICA6IGRlbGV0ZSBlW25hbWVdO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRTtcbm1vZHVsZS5leHBvcnRzLlRpbnlFbWl0dGVyID0gRTtcbiIsImltcG9ydCB7IFRpbnlFbWl0dGVyIH0gZnJvbSAndGlueS1lbWl0dGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBJTWVudURlZmluaXRpb24ge1xuICBuYW1lOiBzdHJpbmcsXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gIGljb24/OiBzdHJpbmcsXG4gIHJvdXRlTmFtZT86IHN0cmluZyxcbiAgcm91dGVQYXJhbXM/OiBvYmplY3QsXG4gIGZlYXR1cmVmbGFncz86IHN0cmluZ1tdLFxuICBvcmRlckluZGV4PzogbnVtYmVyLFxuICBjbGFzcz86IHN0cmluZyxcbiAgaGlkZGVuOiAoKSA9PiBib29sZWFuXG59XG5cblxuZXhwb3J0IGVudW0gbWVudVR5cGUge1xuICBkcmF3ZXIsICAgICAgIC8vIERyYXdlciBNZW51XG4gIGJvdHRvbSwgICAgICAgLy8gQm90dG9tIE1lbnVcbiAgaGVhZGVyXG59XG5cbmV4cG9ydCBjb25zdCBNZW51Tm90aWZpY2F0aW9ucyA9IHtcbiAgbWVudURlZmluaXRpb25BZGRlZDogJ25ld21lbnVpdGVtJ1xufVxuXG5leHBvcnQgY2xhc3MgTWVudUhlbHBlciB7XG5cbiAgcHJpdmF0ZSBtZW51RGVmaW5pdGlvbnM6IElNZW51RGVmaW5pdGlvbltdID0gW107XG4gIHByaXZhdGUgbWVudVN0cnVjdHVyZTogeyBba2V5OiBzdHJpbmddOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZ1tdIH0gfSA9IHt9XG4gIHByaXZhdGUgbm90aWZpY2F0aW9uczogVGlueUVtaXR0ZXIgPSBuZXcgVGlueUVtaXR0ZXIoKTtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgTWVudUhlbHBlcigpO1xuICBwdWJsaWMgZ2V0IE5vdGlmaWNhdGlvbnMoKSB7IHJldHVybiB0aGlzLm5vdGlmaWNhdGlvbnM7IH1cbiAgcHVibGljIHN0YXRpYyBnZXQgSW5zdGFuY2UoKSB7IHJldHVybiBNZW51SGVscGVyLmluc3RhbmNlIH1cblxuICBwdWJsaWMgYWRkTWVudURlZmluaXRpb24obWVudURlZmluaXRpb246IElNZW51RGVmaW5pdGlvbiwgLi4ucG9zaXRpb25zOiB7IHNlY3Rpb246IG1lbnVUeXBlLCBwYXJlbnQ/OiBzdHJpbmcgfVtdKSB7XG5cbiAgICAvLyBBZ2dpdW5nbyBsYSBkaWNoaWFyYXppb25lIGRlbCBtZW51w7kgYWxsJ2VsZW5jbyBkZWkgbWVuw7kgZGlzcG9uaWJpbGkuXG4gICAgbGV0IGZvdW5kID0gdGhpcy5tZW51RGVmaW5pdGlvbnMuZmluZChtID0+IG0ubmFtZSA9PSBtZW51RGVmaW5pdGlvbi5uYW1lKTtcbiAgICBpZiAoIWZvdW5kKVxuICAgICAgdGhpcy5tZW51RGVmaW5pdGlvbnMucHVzaChtZW51RGVmaW5pdGlvbik7XG4gICAgZWxzZVxuICAgICAgbWVudURlZmluaXRpb24gPSBmb3VuZDtcblxuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBwb3NpdGlvbnMpIHtcblxuICAgICAgdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl0gPSB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXSB8fCB7fTtcbiAgICAgIHRoaXMubWVudVN0cnVjdHVyZVtlbGVtZW50LnNlY3Rpb25dW2VsZW1lbnQucGFyZW50IHx8IG1lbnVEZWZpbml0aW9uLm5hbWVdID0gdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl1bZWxlbWVudC5wYXJlbnQgfHwgbWVudURlZmluaXRpb24ubmFtZV0gfHwgW107XG5cbiAgICAgIGlmIChlbGVtZW50LnBhcmVudClcbiAgICAgICAgdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl1bZWxlbWVudC5wYXJlbnRdLnB1c2gobWVudURlZmluaXRpb24ubmFtZSk7XG4gICAgfVxuXG4gICAgdGhpcy5ub3RpZmljYXRpb25zLmVtaXQoTWVudU5vdGlmaWNhdGlvbnMubWVudURlZmluaXRpb25BZGRlZCwgbWVudURlZmluaXRpb24pO1xuICB9XG5cbiAgcHVibGljIGdldE1lbnVJdGVtKG5hbWU6IHN0cmluZyk6IElNZW51RGVmaW5pdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMubWVudURlZmluaXRpb25zLmZpbmQoaSA9PiBpLm5hbWUgPT0gbmFtZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWVudShtZW51OiBtZW51VHlwZSk6IHsgaXRlbTogSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkLCBjaGlsZHJlbjogKElNZW51RGVmaW5pdGlvbiB8IHVuZGVmaW5lZClbXSB9W10ge1xuICAgIGxldCByZXN1bHQ6IHsgaXRlbTogSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkLCBjaGlsZHJlbjogKElNZW51RGVmaW5pdGlvbiB8IHVuZGVmaW5lZClbXSB9W10gPSBbXTtcbiAgICBsZXQgdXNlZCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5tZW51U3RydWN0dXJlW21lbnVdKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5tZW51U3RydWN0dXJlW21lbnVdW2tleV07XG5cblxuICAgICAgbGV0IHJyID0ge1xuICAgICAgICBpdGVtOiB0aGlzLm1lbnVEZWZpbml0aW9ucy5maW5kKG0gPT4ge1xuICAgICAgICAgIHJldHVybiBtLm5hbWUgPT0ga2V5ICYmXG4gICAgICAgICAgICAoIW0uaGlkZGVuIHx8ICFtLmhpZGRlbigpKVxuICAgICAgICB9KSxcblxuICAgICAgICBjaGlsZHJlbjogZWxlbWVudC5tYXAoaSA9PiB0aGlzLm1lbnVEZWZpbml0aW9ucy5maW5kKG0gPT4gbS5uYW1lID09IGkgJiYgKCFtLmhpZGRlbiB8fCAhbS5oaWRkZW4oKSkpKVxuICAgICAgICAgIC5maWx0ZXIoaSA9PiAhIWkpXG4gICAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGlmIChhICYmIGIgJiYgYS5vcmRlckluZGV4ICYmIGIub3JkZXJJbmRleCAmJiBhLm9yZGVySW5kZXggPiBiLm9yZGVySW5kZXgpIHJldHVybiAxO1xuICAgICAgICAgICAgaWYgKGEgJiYgYiAmJiBhLm9yZGVySW5kZXggJiYgYi5vcmRlckluZGV4ICYmIGEub3JkZXJJbmRleCA8IGIub3JkZXJJbmRleCkgcmV0dXJuIC0xO1xuICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgICB9KVxuICAgICAgfTtcblxuICAgICAgaWYgKCEhcnIuaXRlbSkge1xuICAgICAgICB1c2VkLmFkZChrZXkpO1xuICAgICAgICBlbGVtZW50LmZvckVhY2goaSA9PiB1c2VkLmFkZChpKSk7XG4gICAgICAgIHJlc3VsdC5wdXNoKHJyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdC5maWx0ZXIoaSA9PiAhIWkuaXRlbSlcbiAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGlmIChhICYmIGIgJiYgYS5pdGVtICYmIGIuaXRlbSAmJiBhLml0ZW0ub3JkZXJJbmRleCAmJiBiLml0ZW0ub3JkZXJJbmRleCAmJiBhLml0ZW0ub3JkZXJJbmRleCA+IGIuaXRlbS5vcmRlckluZGV4KSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEgJiYgYiAmJiBhLml0ZW0gJiYgYi5pdGVtICYmIGEuaXRlbS5vcmRlckluZGV4ICYmIGIuaXRlbS5vcmRlckluZGV4ICYmIGEuaXRlbS5vcmRlckluZGV4IDwgYi5pdGVtLm9yZGVySW5kZXgpIHJldHVybiAtMTtcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH0pO1xuICB9XG59XG5cbiIsIlxuZXhwb3J0IGNsYXNzIENvbW1vblJlZ2lzdHJ5IHtcblxuICBwcml2YXRlIHJlZ2lzdHJ5ID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgcHJpdmF0ZSBncm91cGVkcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgTWFwPHN0cmluZywgYW55Pj4oKTtcbiAgcHJpdmF0ZSBzZXJ2aWNlcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICBwcml2YXRlIGdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgTWFwPHN0cmluZywgYW55Pj4oKTtcblxuXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBDb21tb25SZWdpc3RyeSA9IG5ldyBDb21tb25SZWdpc3RyeSgpO1xuICBzdGF0aWMgZ2V0IEluc3RhbmNlKCkgeyByZXR1cm4gdGhpcy5pbnN0YW5jZTsgfVxuICBzdGF0aWMgc2V0IEluc3RhbmNlKHY6IENvbW1vblJlZ2lzdHJ5KSB7IHRoaXMuaW5zdGFuY2UgPSB2IH07XG5cbiAgcHJvdmlkZUNvbXBvbmVudChjb21wb25lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCBncm91cD86IHN0cmluZykge1xuICAgIHRoaXMucmVnaXN0cnkuc2V0KGdyb3VwID8gYCR7Z3JvdXB9LSR7bmFtZX1gIDogbmFtZSwgY29tcG9uZW50KTtcbiAgICBpZiAoZ3JvdXApIHtcbiAgICAgIGlmICghdGhpcy5ncm91cGVkcmVnaXN0cnkuaGFzKGdyb3VwKSkgdGhpcy5ncm91cGVkcmVnaXN0cnkuc2V0KGdyb3VwLCBuZXcgTWFwPHN0cmluZywgYW55PigpKTtcblxuICAgICAgbGV0IGdnID0gdGhpcy5ncm91cGVkcmVnaXN0cnkuZ2V0KGdyb3VwKTtcbiAgICAgIGlmIChnZykgZ2cuc2V0KG5hbWUsIGNvbXBvbmVudCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29tcG9uZW50KG5hbWU6IHN0cmluZywgZ3JvdXA/OiBzdHJpbmcpOiBhbnkgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeS5nZXQoZ3JvdXAgPyBgJHtncm91cH0tJHtuYW1lfWAgOiBuYW1lKSB8fCBudWxsO1xuICB9XG5cbiAgZ2V0Q29tcG9uZW50cyguLi5uYW1lOiBzdHJpbmdbXSk6IChhbnkpW10ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMucmVnaXN0cnkuZW50cmllcygpKS5maWx0ZXIoaSA9PiBuYW1lLmluZGV4T2YoaVswXSkgPj0gMCkubWFwKGkgPT4gaVsxXSk7XG4gIH1cblxuICBnZXRHcm91cENvbXBvbmVudHMoZ3JvdXA6IHN0cmluZywgLi4ubmFtZTogc3RyaW5nW10pOiAoYW55KVtdIHtcbiAgICBsZXQgZyA9IHRoaXMuZ3JvdXBlZHJlZ2lzdHJ5LmdldChncm91cCk7XG4gICAgaWYgKGcpXG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShnLmVudHJpZXMoKSB8fCBbXSkuZmlsdGVyKGkgPT4gKCFuYW1lIHx8IG5hbWUubGVuZ3RoID09IDApIHx8IG5hbWUuaW5kZXhPZihpWzBdKSA+PSAwKS5tYXAoaSA9PiBpWzFdKTtcbiAgICByZXR1cm4gW11cbiAgfVxuXG4gIGdldEdyb3VwQ29tcG9uZW50c0tleXMoZ3JvdXA6IHN0cmluZyk6IChzdHJpbmcpW10ge1xuICAgIGxldCBnID0gdGhpcy5ncm91cGVkcmVnaXN0cnkuZ2V0KGdyb3VwKTtcbiAgICBpZiAoZykgcmV0dXJuIEFycmF5LmZyb20oZy5rZXlzKCkpO1xuICAgIHJldHVybiBbXVxuICB9XG5cbiAgcHJvdmlkZVNlcnZpY2UobmFtZTogc3RyaW5nLCBzZXJ2aWNlOiBhbnksIGdyb3VwPzogc3RyaW5nKSB7XG4gICAgdGhpcy5zZXJ2aWNlcmVnaXN0cnkuc2V0KG5hbWUsIHNlcnZpY2UpO1xuICAgIGlmIChncm91cCkge1xuICAgICAgaWYgKCF0aGlzLmdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkuaGFzKGdyb3VwKSkgdGhpcy5ncm91cGVkc2VydmljZXJlZ2lzdHJ5LnNldChncm91cCwgbmV3IE1hcDxzdHJpbmcsIGFueT4oKSk7XG4gICAgICBsZXQgZ2cgPSB0aGlzLmdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkuZ2V0KGdyb3VwKTtcbiAgICAgIGlmIChnZykgZ2cuc2V0KG5hbWUsIHNlcnZpY2UpO1xuICAgIH1cbiAgfVxuXG4gIGdldFNlcnZpY2U8VD4obmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuICh0aGlzLnNlcnZpY2VyZWdpc3RyeS5nZXQobmFtZSkgfHwgbnVsbCkgYXMgVDtcbiAgfVxuXG4gIGdldEdyb3VwU2VydmljZXMoZ3JvdXA6IHN0cmluZywgLi4ubmFtZTogc3RyaW5nW10pOiAoYW55KVtdIHtcbiAgICBsZXQgZyA9IHRoaXMuZ3JvdXBlZHNlcnZpY2VyZWdpc3RyeS5nZXQoZ3JvdXApO1xuICAgIGlmIChnKVxuICAgICAgcmV0dXJuIEFycmF5LmZyb20oZy5lbnRyaWVzKCkgfHwgW10pLmZpbHRlcihpID0+ICghbmFtZSB8fCBuYW1lLmxlbmd0aCA9PSAwKSB8fCBuYW1lLmluZGV4T2YoaVswXSkgPj0gMCkubWFwKGkgPT4gaVsxXSk7XG4gICAgcmV0dXJuIFtdXG4gIH1cbn0iLCJjb25zdCBhc2tSZXBseUNoYW5uZWxzID0gbmV3IE1hcDxzdHJpbmcsIE1lc3NhZ2VDaGFubmVsPigpO1xuY29uc3Qgc2VuZFN1YnNjcmliZUNoYW5uZWxzID0gbmV3IE1hcDxzdHJpbmcsIE1lc3NhZ2VDaGFubmVsPigpO1xuY29uc3Qgc2VuZFN1YnNjcmliZUNhbGxiYWNrcyA9IG5ldyBNYXA8RnVuY3Rpb24sICguLi5hcmdzOiBhbnlbXSkgPT4gYW55PigpO1xuXG5jb25zdCBhc2sgPSA8VD4obmFtZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IFByb21pc2U8VD4gPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgbGV0IHBvcnQgPSBhc2tSZXBseUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDFcbiAgICBpZiAoIXBvcnQpIHtcbiAgICAgIGNvbnN0IGMgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgIGFza1JlcGx5Q2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xuICAgICAgcG9ydCA9IGMucG9ydDFcbiAgICB9XG4gICAgbGV0IGlubmVyY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIGNvbnN0IGwgPSAoZXZ0OiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgICAgIHJlc29sdmUoZXZ0LmRhdGEpO1xuICAgICAgaW5uZXJjaGFubmVsID0gbnVsbCE7XG4gICAgfVxuICAgIGlubmVyY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsO1xuICAgIHBvcnQucG9zdE1lc3NhZ2UoYXJncywgW2lubmVyY2hhbm5lbC5wb3J0Ml0pO1xuICB9KTtcbn1cblxuY29uc3QgcmVwbHkgPSAobmFtZTogc3RyaW5nLCBjYjogKC4uLmFyZ3M6IGFueVtdKSA9PiBQcm9taXNlPGFueT4gfCBhbnksIG9wdHM6IHsgZm9yY2U6IGJvb2xlYW4gfSA9IHsgZm9yY2U6IGZhbHNlIH0pID0+IHtcbiAgbGV0IHBvcnQgPSBhc2tSZXBseUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDJcbiAgaWYgKCFwb3J0KSB7XG4gICAgY29uc3QgYyA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIGFza1JlcGx5Q2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xuICAgIHBvcnQgPSBjLnBvcnQyXG4gIH1cbiAgaWYgKCFvcHRzLmZvcmNlICYmIHBvcnQub25tZXNzYWdlKSB0aHJvdyBcInJlcGx5IGFscmVhZHkgc2V0IGZvciBtZXNzYWdlIFwiICsgbmFtZVxuICBjb25zdCBsID0gYXN5bmMgKGV2dDogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgY29uc3QgaW5uZXJwb3J0ID0gZXZ0LnBvcnRzWzBdXG4gICAgY29uc3QgciA9IGF3YWl0IGNiKC4uLmV2dC5kYXRhKTtcbiAgICBpbm5lcnBvcnQucG9zdE1lc3NhZ2Uocik7XG4gICAgaW5uZXJwb3J0LmNsb3NlKCk7XG4gIH1cbiAgcG9ydC5vbm1lc3NhZ2UgPSBsO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHBvcnQhLm9ubWVzc2FnZSA9IG51bGwhO1xuICB9XG59XG5cbmNvbnN0IHNlbmQgPSAobmFtZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkgPT4ge1xuICBsZXQgcG9ydCA9IHNlbmRTdWJzY3JpYmVDaGFubmVscy5nZXQobmFtZSk/LnBvcnQxXG4gIGlmICghcG9ydCkge1xuICAgIGNvbnN0IGMgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBzZW5kU3Vic2NyaWJlQ2hhbm5lbHMuc2V0KG5hbWUsIGMpO1xuICAgIHBvcnQgPSBjLnBvcnQxXG4gIH1cbiAgcG9ydC5wb3N0TWVzc2FnZShhcmdzKTtcbn1cblxuY29uc3Qgc3Vic2NyaWJlID0gKG5hbWU6IHN0cmluZywgY2I6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiB7XG4gIGxldCBwb3J0ID0gc2VuZFN1YnNjcmliZUNoYW5uZWxzLmdldChuYW1lKT8ucG9ydDJcbiAgaWYgKCFwb3J0KSB7XG4gICAgY29uc3QgYyA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHNlbmRTdWJzY3JpYmVDaGFubmVscy5zZXQobmFtZSwgYyk7XG4gICAgcG9ydCA9IGMucG9ydDJcbiAgfVxuICBjb25zdCBsID0gKGV2dDogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgY2IoLi4uZXZ0LmRhdGEpO1xuICB9XG4gIHNlbmRTdWJzY3JpYmVDYWxsYmFja3Muc2V0KGNiLCBsKTtcbiAgcG9ydC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBsKTtcbiAgcG9ydC5zdGFydCgpO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHBvcnQ/LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGwpO1xuICAgIHNlbmRTdWJzY3JpYmVDYWxsYmFja3MuZGVsZXRlKGNiKTtcbiAgfVxufVxuXG5jb25zdCBvbmNlID0gKG5hbWU6IHN0cmluZywgY2I6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KSA9PiB7XG4gIGNvbnN0IHVuc3Vic2NyaWJlID0gc3Vic2NyaWJlKG5hbWUsICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgIGNiKC4uLmFyZ3MpO1xuICAgIHVuc3Vic2NyaWJlKCk7XG4gIH0pO1xufVxuXG5jb25zdCB1bnN1YnNjcmliZSA9IChuYW1lOiBzdHJpbmcsIGNiOiAoLi4uYXJnczogYW55W10pID0+IGFueSkgPT4ge1xuICBsZXQgcG9ydCA9IHNlbmRTdWJzY3JpYmVDaGFubmVscy5nZXQobmFtZSk/LnBvcnQyXG4gIGlmICghcG9ydCkgcmV0dXJuO1xuICBjb25zdCBsID0gc2VuZFN1YnNjcmliZUNhbGxiYWNrcy5nZXQoY2IpO1xuICBpZiAobCkge1xuICAgIHBvcnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgbCk7XG4gICAgc2VuZFN1YnNjcmliZUNhbGxiYWNrcy5kZWxldGUoY2IpO1xuICB9XG59XG5cbmV4cG9ydCB7XG4gIGFzayxcbiAgcmVwbHksXG4gIHNlbmQsXG4gIHN1YnNjcmliZSxcbiAgb25jZSxcbiAgdW5zdWJzY3JpYmVcbn1cblxuZXhwb3J0IGNvbnN0IE1lc3NhZ2VTZXJ2aWNlID0ge1xuICBJbnN0YW5jZToge1xuICAgIGFzayxcbiAgICByZXBseSxcbiAgICBzZW5kLFxuICAgIHN1YnNjcmliZSxcbiAgICBvbmNlLFxuICAgIHVuc3Vic2NyaWJlXG4gIH1cbn0iLCJcbmltcG9ydCB7IGNvbXB1dGVkLCBkZWZpbmVDb21wb25lbnQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBDb21tb25SZWdpc3RyeSB9IGZyb20gXCIuLi9oZWxwZXJzL0NvbW1vblJlZ2lzdHJ5XCI7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiBcImluamVjdFwiLFxuICBwcm9wczoge1xuICAgIGlkOiB7IGRlZmF1bHQ6IG51bGwgfSxcbiAgICB0eXBlOiB7IGRlZmF1bHQ6IG51bGwsIHR5cGU6IFN0cmluZyB9LFxuICAgIHZhbHVlOiB7IGRlZmF1bHQ6IG51bGwgfSxcbiAgICBuYW1lOiB7IHR5cGU6IFN0cmluZywgZGVmYXVsdDogbnVsbCB9LFxuICAgIG5hbWVzOiB7IHR5cGU6IEFycmF5PHN0cmluZz4sIGRlZmF1bHQ6IG51bGwgfSxcbiAgICBncm91cDogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6IG51bGwgfSxcbiAgICBtZXRhZGF0YTogeyB0eXBlOiBPYmplY3QsIGRlZmF1bHQ6IG51bGwgfSxcbiAgICBkaXNhYmxlZDogeyB0eXBlOiBCb29sZWFuLCBkZWZhdWx0OiBmYWxzZSB9LFxuICAgIHJlYWRvbmx5OiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IGZhbHNlIH1cbiAgfSxcbiAgc2V0dXAocHJvcHMsIHsgZW1pdCB9KSB7XG5cblxuICAgIGNvbnN0IFZhbHVlID0gY29tcHV0ZWQoe1xuICAgICAgZ2V0OiAoKSA9PiB7IHJldHVybiBwcm9wcy52YWx1ZSB9LFxuICAgICAgc2V0OiAodikgPT4geyBlbWl0KFwiaW5wdXRcIiwgdik7IH1cbiAgICB9KVxuXG4gICAgY29uc3QgQ29tcG9uZW50cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy5uYW1lKVxuICAgICAgICByZXR1cm4gW0NvbW1vblJlZ2lzdHJ5Lkluc3RhbmNlLmdldENvbXBvbmVudChwcm9wcy5uYW1lLCBwcm9wcy5ncm91cCldO1xuICAgICAgaWYgKHByb3BzLmdyb3VwKVxuICAgICAgICByZXR1cm4gQ29tbW9uUmVnaXN0cnkuSW5zdGFuY2UuZ2V0R3JvdXBDb21wb25lbnRzKHByb3BzLmdyb3VwLCAuLi4ocHJvcHMubmFtZXMgfHwgW10pKTtcbiAgICAgIHJldHVybiBDb21tb25SZWdpc3RyeS5JbnN0YW5jZS5nZXRDb21wb25lbnRzKC4uLihwcm9wcy5uYW1lcyB8fCBbXSkpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgY2xpY2sgPSAoLi4uYXJnczogYW55W10pID0+IHsgZW1pdCgnY2xpY2snLCAuLi5hcmdzKSB9XG4gICAgY29uc3Qgc2F2ZSA9ICguLi5hcmdzOiBhbnlbXSkgPT4geyBlbWl0KCdzYXZlJywgLi4uYXJncykgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBwcm9wcy5pZCxcbiAgICAgIHR5cGU6IHByb3BzLnR5cGUsXG4gICAgICB2YWx1ZTogcHJvcHMudmFsdWUsXG4gICAgICBuYW1lOiBwcm9wcy5uYW1lLFxuICAgICAgbmFtZXM6IHByb3BzLm5hbWVzLFxuICAgICAgZ3JvdXA6IHByb3BzLmdyb3VwLFxuICAgICAgbWV0YWRhdGE6IHByb3BzLm1ldGFkYXRhLFxuICAgICAgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGVkLFxuICAgICAgcmVhZG9ubHk6IHByb3BzLnJlYWRvbmx5LFxuICAgICAgY2xpY2ssXG4gICAgICBzYXZlLFxuICAgICAgQ29tcG9uZW50cyxcbiAgICAgIFZhbHVlLFxuICAgIH1cbiAgfVxuXG59KTtcblxuIiwiXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudFB1YmxpY0luc3RhbmNlIH0gZnJvbSBcInZ1ZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9qZWN0YWJsZU1vZGVsPFQ+IHtcbiAgZGF0YTogVDsgcmVzb2x2ZTogKGl0ZW06IFQpID0+IHZvaWQ7IHJlamVjdDogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFByb2plY3RvciB7XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlID0gbmV3IFByb2plY3RvcigpO1xuICBzdGF0aWMgZ2V0IEluc3RhbmNlKCk6IFByb2plY3RvciB7IHJldHVybiBQcm9qZWN0b3IuaW5zdGFuY2UgfVxuICBzdGF0aWMgc2V0IEluc3RhbmNlKHY6IFByb2plY3RvcikgeyB0aGlzLmluc3RhbmNlID0gdjsgfVxuXG4gIHByaXZhdGUgc2NyZWVucyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gIHByaXZhdGUgcHJvamVjdGluZyA9IG5ldyBNYXA8c3RyaW5nLCB7IGNvbXBvbmVudDogQ29tcG9uZW50LCBtb2RlbDogSVByb2plY3RhYmxlTW9kZWw8YW55PiwgcHJvbWlzZTogUHJvbWlzZTxhbnk+IHwgbnVsbCwgcXVldWU6IGJvb2xlYW4gfVtdPigpO1xuXG4gIHNldFNjcmVlbihzY3JlZW46IENvbXBvbmVudFB1YmxpY0luc3RhbmNlLCBuYW1lOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIikge1xuICAgIHRoaXMuc2NyZWVucy5zZXQobmFtZSwgc2NyZWVuKTtcbiAgfVxuXG5cblxuICBwcm9qZWN0VG88VD4oY29tcG9uZW50OiBDb21wb25lbnQsIGRhdGE6IFQgfCBudWxsID0gbnVsbCwgc2NyZWVuOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIiwgcXVldWU6IGJvb2xlYW4gPSB0cnVlLCBhc3luYzogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTxUPiB8IG51bGwge1xuICAgIGNvbnN0IG1vZGVsID0geyBkYXRhIH0gYXMgSVByb2plY3RhYmxlTW9kZWw8VD47XG4gICAgY29uc3QgcHJvbWlzZSA9IGFzeW5jID8gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4geyBtb2RlbC5yZWplY3QgPSByZWplY3Q7IG1vZGVsLnJlc29sdmUgPSByZXNvbHZlIH0pIDogbnVsbDtcblxuICAgIGlmICghcXVldWUpIHtcblxuICAgICAgdGhpcy5wcm9qZWN0aW5nLnNldChzY3JlZW4sIFt7IGNvbXBvbmVudCwgbW9kZWwsIHByb21pc2UsIHF1ZXVlIH1dKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLnByb2plY3RpbmcuaGFzKHNjcmVlbikpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0aW5nLnNldChzY3JlZW4sIFtdKTtcbiAgICAgIH1cbiAgICAgICh0aGlzLnByb2plY3RpbmcuZ2V0KHNjcmVlbikgfHwgW10pLnB1c2goeyBjb21wb25lbnQsIG1vZGVsLCBwcm9taXNlLCBxdWV1ZSB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBzcyA9IHRoaXMuc2NyZWVucy5nZXQoc2NyZWVuKTtcbiAgICBpZiAoIXNzKSByZXR1cm4gbnVsbDtcbiAgICBzcy5tb2RlbCA9IG1vZGVsO1xuICAgIHNzLmN1cnJlbnRWaWV3ID0gY29tcG9uZW50O1xuXG4gICAgaWYgKHByb21pc2UpIHByb21pc2UudGhlbigoKSA9PiB0aGlzLnN0b3BQcm9qZWN0aW5nKHNjcmVlbikpLmNhdGNoKCgpID0+IHRoaXMuc3RvcFByb2plY3Rpbmcoc2NyZWVuKSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBwcm9qZWN0QXN5bmNUbzxUPihjb21wb25lbnQ6IENvbXBvbmVudCwgZGF0YTogVCwgc2NyZWVuOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIiwgcXVldWU6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdFRvKGNvbXBvbmVudCwgZGF0YSwgc2NyZWVuLCBxdWV1ZSwgdHJ1ZSlcbiAgfVxuXG4gIHN0b3BQcm9qZWN0aW5nKHNjcmVlbjogc3RyaW5nID0gXCJkZWZhdWx0c2NyZWVuXCIpIHtcbiAgICBpZiAodGhpcy5wcm9qZWN0aW5nLmhhcyhzY3JlZW4pKSB7XG4gICAgICAodGhpcy5wcm9qZWN0aW5nLmdldChzY3JlZW4pIHx8IFtdKS5wb3AoKVxuICAgIH1cblxuICAgIGxldCBfc2NyZWVuID0gdGhpcy5zY3JlZW5zLmdldChzY3JlZW4pXG4gICAgaWYgKF9zY3JlZW4gJiYgX3NjcmVlbi5jdXJyZW50Vmlldykge1xuICAgICAgX3NjcmVlbi5tb2RlbCA9IG51bGw7XG4gICAgICBfc2NyZWVuLnNjcmVlbk1vZGVsID0gbnVsbDtcbiAgICAgIF9zY3JlZW4uY3VycmVudFZpZXcgPSBudWxsO1xuXG4gICAgICBpZiAodGhpcy5wcm9qZWN0aW5nLmhhcyhzY3JlZW4pKSB7XG4gICAgICAgIGxldCBzID0gdGhpcy5wcm9qZWN0aW5nLmdldChzY3JlZW4pO1xuICAgICAgICBpZiAocyAmJiBzLmxlbmd0aCkge1xuICAgICAgICAgIGxldCBtID0gcy5wb3AoKTtcbiAgICAgICAgICBpZiAobSkgdGhpcy5wcm9qZWN0VG8obS5jb21wb25lbnQsIG0ubW9kZWwsIHNjcmVlbiwgbS5xdWV1ZSwgISFtLnByb21pc2UpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0YWJsZTxUPiB7XG4gIHZhbHVlOiB7XG4gICAgZGF0YTogVCxcbiAgICByZXNvbHZlOiAoaXRlbTogVCkgPT4gdm9pZDtcbiAgICByZWplY3Q6ICgpID0+IHZvaWQ7XG4gIH07XG59IiwiXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudFB1YmxpY0luc3RhbmNlLCBjb21wdXRlZCwgZGVmaW5lQ29tcG9uZW50LCBnZXRDdXJyZW50SW5zdGFuY2UsIG9uTW91bnRlZCwgUmVmLCByZWYsIHdhdGNoIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgSVByb2plY3RhYmxlTW9kZWwsIFByb2plY3RvciB9IGZyb20gXCIuLi9oZWxwZXJzL1Byb2plY3RvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiBcInNjcmVlblwiLFxuICBwcm9wczoge1xuICAgIG5hbWU6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiBcImRlZmF1bHRzY3JlZW5cIiB9LFxuICB9LFxuICBzZXR1cChwcm9wcywgeyBleHBvc2UgfSkge1xuXG4gICAgY29uc3QgbWUgPSBnZXRDdXJyZW50SW5zdGFuY2UoKTtcblxuICAgIGNvbnN0IGN1cnJlbnRWaWV3OiBSZWY8Q29tcG9uZW50PiA9IHJlZihudWxsISk7XG4gICAgY29uc3QgbW9kZWw6IFJlZjxJUHJvamVjdGFibGVNb2RlbDxhbnk+IHwgbnVsbD4gPSByZWYobnVsbCEpO1xuXG4gICAgZXhwb3NlKHsgY3VycmVudFZpZXcsIG1vZGVsIH0pXG5cbiAgICBjb25zdCBpc1Zpc2libGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gY3VycmVudFZpZXcudmFsdWUgIT0gbnVsbDtcbiAgICB9KVxuXG4gICAgY29uc3QgY3VycmVudFZpZXdVSUQgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4gKGN1cnJlbnRWaWV3LnZhbHVlIGFzIGFueSk/Ll9fZmlsZVxuICAgIH0pXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgUHJvamVjdG9yLkluc3RhbmNlLnNldFNjcmVlbigobWUgYXMgYW55KS5wcm94eSwgcHJvcHMubmFtZSk7XG4gICAgfSlcblxuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50Vmlld1VJRCxcbiAgICAgIGN1cnJlbnRWaWV3LFxuICAgICAgbW9kZWwsXG4gICAgICBpc1Zpc2libGVcbiAgICB9XG4gIH0sXG5cbn0pXG4iLCJjb25zdCBwcm9qZWN0VG9EaXJlY3RpdmUgPSB7XG5cbiAgaW5zZXJ0ZWQ6IChlbDogRWxlbWVudCwgYmluZDogYW55KSA9PiB7XG4gICAgU2NyZWVuc01hbmFnZXIuSW5zdGFuY2UuaW5qZWN0VG8oZWwsIGJpbmQuYXJnKTtcbiAgfSxcbiAgdW5iaW5kOiAoZWw6IEVsZW1lbnQsIGJpbmQ6IGFueSkgPT4ge1xuICAgIFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlLnJlbW92ZUZyb20oZWwsIGJpbmQuYXJnKVxuICB9XG59XG5cblxuY29uc3Qgc2NyZWVuRGlyZWN0aXZlID0ge1xuICBiaW5kOiAoZWw6IGFueSwgYmluZGluZzogYW55KSA9PiB7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgIFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlLnNldFNjcmVlbihlbCwgYmluZGluZy5hcmcpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcHJvamVjdFRvRGlyZWN0aXZlLCBzY3JlZW5EaXJlY3RpdmVcbn1cblxuZXhwb3J0IGNsYXNzIFNjcmVlbnNNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgU2NyZWVuc01hbmFnZXIoKTtcbiAgc3RhdGljIGdldCBJbnN0YW5jZSgpOiBTY3JlZW5zTWFuYWdlciB7IHJldHVybiBTY3JlZW5zTWFuYWdlci5pbnN0YW5jZSB9XG4gIHN0YXRpYyBzZXQgSW5zdGFuY2UodjogU2NyZWVuc01hbmFnZXIpIHsgdGhpcy5pbnN0YW5jZSA9IHY7IH1cbiAgcHJpdmF0ZSBzY3JlZW5zID0gbmV3IE1hcDxzdHJpbmcsIEVsZW1lbnQ+KCk7XG4gIFxuXG4gIGluamVjdFRvKGRvbUVsZW1lbnQ6IEVsZW1lbnQsIHNjcmVlbjogc3RyaW5nKSB7XG4gICAgaWYgKCFkb21FbGVtZW50IHx8ICFzY3JlZW4pIHJldHVybjtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuc2NyZWVucy5oYXMoc2NyZWVuKSA/IHRoaXMuc2NyZWVucy5nZXQoc2NyZWVuKSA6IG51bGw7XG4gICAgdHJ5IHsgZG9tRWxlbWVudC5wYXJlbnRFbGVtZW50ICYmIGRvbUVsZW1lbnQucmVtb3ZlQ2hpbGQoZG9tRWxlbWVudCk7IH0gY2F0Y2ggeyB9XG4gICAgaWYgKGVsZW1lbnQpIGVsZW1lbnQuYXBwZW5kKGRvbUVsZW1lbnQpO1xuICB9XG5cbiAgcmVtb3ZlRnJvbShkb21FbGVtZW50OiBFbGVtZW50LCBzY3JlZW46IHN0cmluZykge1xuICAgIGlmICghZG9tRWxlbWVudCB8fCAhc2NyZWVuKSByZXR1cm47XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLnNjcmVlbnMuaGFzKHNjcmVlbikgPyB0aGlzLnNjcmVlbnMuZ2V0KHNjcmVlbikgOiBudWxsO1xuICAgIHRyeSB7IGlmIChlbGVtZW50KSBlbGVtZW50LnJlbW92ZUNoaWxkKGRvbUVsZW1lbnQpIH0gY2F0Y2ggeyB9XG4gIH1cblxuICBzZXRTY3JlZW4oc2NyZWVuOiBFbGVtZW50LCBuYW1lOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIikge1xuICAgIHRoaXMuc2NyZWVucy5zZXQobmFtZSwgc2NyZWVuKTtcbiAgfVxufSIsImZ1bmN0aW9uIGNoZWNrSW5wdXRWYWxpZGF0aW9uKGE6IEV2ZW50LCBjYWxsb3V0OiAoZXJyb3JzOiBzdHJpbmdbXSwgdmFsaWQ6IGJvb2xlYW4pID0+IHZvaWQpIHtcbiAgaWYgKChhLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWxpZGl0eSkge1xuICAgIGxldCBlbCA9IChhLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KTtcblxuICAgIGlmIChlbC52YWxpZGl0eSkge1xuICAgICAgbGV0IGVycm9ycyA9IFtcbiAgICAgICAgZWwudmFsaWRpdHkuYmFkSW5wdXQgPyBcImJhZCBpbnB1dFwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkuY3VzdG9tRXJyb3IgPyBcImN1c3RvbSBlcnJvclwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkucGF0dGVybk1pc21hdGNoID8gXCJwYXR0ZXJuIG1pc21hdGNoXCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS5yYW5nZU92ZXJmbG93ID8gXCJyYW5nZSBvdmVyZmxvd1wiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkucmFuZ2VVbmRlcmZsb3cgPyBcInJhbmdlIHVuZGVyZmxvd1wiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkuc3RlcE1pc21hdGNoID8gXCJzdGVwIG1pc21hdGNoXCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS50b29Mb25nID8gXCJ0b28gbG9uZ1wiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkudG9vU2hvcnQgPyBcInRvbyBzaG9ydFwiIDogbnVsbCxcbiAgICAgICAgZWwudmFsaWRpdHkudHlwZU1pc21hdGNoID8gXCJ0eXBlIG1pc21hdGNoXCIgOiBudWxsLFxuICAgICAgICBlbC52YWxpZGl0eS52YWx1ZU1pc3NpbmcgPyBcInZhbHVlIG1pc3NpbmdcIiA6IG51bGxdLmZpbHRlcihpID0+ICEhaSlcblxuICAgICAgY2FsbG91dChlcnJvcnMgYXMgc3RyaW5nW10sIGVsLnZhbGlkaXR5LnZhbGlkICE9IHVuZGVmaW5lZCA/IGVsLnZhbGlkaXR5LnZhbGlkIDogdHJ1ZSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZSA9IHtcbiAgaW5zZXJ0ZWQ6IChlbDogSFRNTElucHV0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudCwgYmluZDoge1xuICAgIHZhbHVlOiAoZXJyb3JzOiBzdHJpbmdbXSwgdmFsaWQ6IGJvb2xlYW4pID0+IHZvaWQsXG4gICAgYXJnOiBcImltbWVkaWF0ZVwiXG4gIH0pID0+IHtcbiAgICBpZiAoIWVsIHx8ICFlbC53aWxsVmFsaWRhdGUpIHJldHVybjtcbiAgICBzd2l0Y2ggKGVsLm5vZGVOYW1lKSB7XG4gICAgICBjYXNlIFwiSU5QVVRcIjpcbiAgICAgIGNhc2UgXCJURVhUQVJFQVwiOiBlbC5vbmJsdXIgPSAoYXJnKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbihhcmcsIGJpbmQudmFsdWUpOyBicmVhaztcbiAgICAgIGNhc2UgXCJTRUxFQ1RcIjogZWwub25jaGFuZ2UgPSAoYXJnKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbihhcmcsIGJpbmQudmFsdWUpOyBicmVhaztcbiAgICB9XG5cbiAgICBlbC5vbmludmFsaWQgPSAoYXJnKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbihhcmcsIGJpbmQudmFsdWUpO1xuICAgIGlmIChlbC5mb3JtKSBlbC5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2ludmFsaWQnLCAoKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbih7IHRhcmdldDogZWwgfSBhcyBhbnksIGJpbmQudmFsdWUpKVxuXG4gICAgaWYgKGJpbmQuYXJnID09IFwiaW1tZWRpYXRlXCIpIGVsLnJlcG9ydFZhbGlkaXR5KCk7XG4gICAgZWxzZSBjaGVja0lucHV0VmFsaWRhdGlvbih7IHRhcmdldDogZWwgfSBhcyBhbnksIGJpbmQudmFsdWUpXG4gIH0sXG4gIHVuYmluZDogKGVsOiBFbGVtZW50KSA9PiB7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuXG4gIH0sXG59XG4iLCJpbXBvcnQgeyBNZW51SGVscGVyLCBtZW51VHlwZSwgTWVudU5vdGlmaWNhdGlvbnMsIElNZW51RGVmaW5pdGlvbiB9IGZyb20gXCIuL2hlbHBlcnMvTWVudUhlbHBlclwiO1xuaW1wb3J0IHsgQ29tbW9uUmVnaXN0cnkgfSBmcm9tIFwiLi9oZWxwZXJzL0NvbW1vblJlZ2lzdHJ5XCI7XG5pbXBvcnQgeyBNZXNzYWdlU2VydmljZSB9IGZyb20gXCIuL2hlbHBlcnMvTWVzc2FnZVNlcnZpY2VcIjtcbmltcG9ydCB7IElSb3V0ZUNvbmZpZyB9IGZyb20gXCIuL2ludGVyZmFjZXMvUm91dGVySW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgSVN0b3JlIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9TdG9yZUludGVyZmFjZXNcIjtcbmltcG9ydCBpbmplY3QgIGZyb20gJy4vY29tcG9uZW50cy9pbmplY3QudnVlJztcbmltcG9ydCBzY3JlZW4gZnJvbSBcIi4vY29tcG9uZW50cy9zY3JlZW4udnVlXCI7XG5pbXBvcnQgeyBJUHJvamVjdGFibGVNb2RlbCwgUHJvamVjdGFibGUsIFByb2plY3RvciB9IGZyb20gXCIuL2hlbHBlcnMvUHJvamVjdG9yXCI7XG5pbXBvcnQgZGlyZWN0aXZlcywgeyBTY3JlZW5zTWFuYWdlciB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvc2NyZWVuXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZSBhcyBWYWxpZGF0ZURpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvdmFsaWRhdGVcIjtcblxuXG5mdW5jdGlvbiBpbnN0YWxsKFZ1ZToge2NvbXBvbmVudDogYW55LCBkaXJlY3RpdmU6IGFueX0pIHtcbiAgVnVlLmNvbXBvbmVudChcInNjcmVlblwiLCBzY3JlZW4pO1xuICBWdWUuY29tcG9uZW50KFwiaW5qZWN0XCIsIGluamVjdCk7XG4gIFZ1ZS5kaXJlY3RpdmUoXCJzY3JlZW5cIiwgZGlyZWN0aXZlcy5zY3JlZW5EaXJlY3RpdmUpO1xuICBWdWUuZGlyZWN0aXZlKFwicHJvamVjdFRvXCIsIGRpcmVjdGl2ZXMucHJvamVjdFRvRGlyZWN0aXZlKTtcbiAgVnVlLmRpcmVjdGl2ZShcInZhbGlkYXRlXCIsIFZhbGlkYXRlRGlyZWN0aXZlIGFzIGFueSk7XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBJTW9kdWxlSW5pdGlhbGl6ZXIge1xuICBpbml0KHZ1ZW1mOiB0eXBlb2YgVnVlTWZNb2R1bGUsIG1lbnU6IE1lbnVIZWxwZXIsIHN0b3JlOiBJU3RvcmUsIGNvbmZpZ3VyYXRpb246IGFueSk6IFByb21pc2U8dm9pZD4sXG5cbiAgY29uZmlnPyhtZW51OiBNZW51SGVscGVyLCBzdG9yZTogSVN0b3JlLCBjb25maWd1cmF0aW9uOiBhbnkpOiBQcm9taXNlPHZvaWQ+LFxuXG4gIHJ1bj8obWVudTogTWVudUhlbHBlciwgc3RvcmU6IElTdG9yZSwgY29uZmlndXJhdGlvbjogYW55KTogUHJvbWlzZTx2b2lkPixcblxuICByb3V0ZXM6IElSb3V0ZUNvbmZpZ1tdXG59XG5cbmludGVyZmFjZSBJTW9kdWxlSW5pdGlhbGl6ZXJXcmFwcGVyIHtcbiAgaW5pdChtZW51OiBNZW51SGVscGVyLFxuICAgICAgIHN0b3JlOiBJU3RvcmUsXG4gICAgICAgY29uZmlndXJhdGlvbjogYW55XG4gICAgLCBvcHRpb25zOiB7XG4gIHJlZ2lzdHJ5OiBDb21tb25SZWdpc3RyeSxcbiAgbWVzc2FnZVNlcnZpY2U6IHR5cGVvZiBNZXNzYWdlU2VydmljZS5JbnN0YW5jZSxcbiAgcHJvamVjdG9yOiBQcm9qZWN0b3IsXG4gIHNjcmVlbnM6IFNjcmVlbnNNYW5hZ2VyXG4gICAgfSk6IFByb21pc2U8dm9pZD4sXG4gICAgY29uZmlnKG1lbnU6IE1lbnVIZWxwZXIsXG4gICAgICAgICAgIHN0b3JlOiBJU3RvcmUpOiBQcm9taXNlPHZvaWQ+LFxuICAgICAgICAgICBydW4obWVudTogTWVudUhlbHBlcixcbiAgICAgICAgICAgICAgIHN0b3JlOiBJU3RvcmUpOiBQcm9taXNlPHZvaWQ+LFxuICAgICAgICAgICAgICAgcm91dGVzOiBJUm91dGVDb25maWdbXVxufVxuXG5leHBvcnQgZnVuY3Rpb24gTW9kdWxlSW5pdGlhbGl6ZXIob3B0czogSU1vZHVsZUluaXRpYWxpemVyKSB7XG4gIGxldCBtb2R1bGVDb25maWcgPSB7fTtcbiAgcmV0dXJuIHtcbiAgICBpbml0KG1lbnU6IE1lbnVIZWxwZXIsIHN0b3JlOiBJU3RvcmUsIGNvbmZpZ3VyYXRpb246IGFueSxcbiAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgcmVnaXN0cnk6IENvbW1vblJlZ2lzdHJ5LFxuICAgICAgICAgICBtZXNzYWdlU2VydmljZTogdHlwZW9mIE1lc3NhZ2VTZXJ2aWNlLkluc3RhbmNlLFxuICAgICAgICAgICBwcm9qZWN0b3I6IFByb2plY3RvcixcbiAgICAgICAgICAgc2NyZWVuczogU2NyZWVuc01hbmFnZXJcbiAgICAgICAgIH0pIHtcblxuICAgICAgICAgICBpZiAob3B0aW9ucy5yZWdpc3RyeSkgQ29tbW9uUmVnaXN0cnkuSW5zdGFuY2UgPSBvcHRpb25zLnJlZ2lzdHJ5O1xuICAgICAgICAgICBpZiAob3B0aW9ucy5tZXNzYWdlU2VydmljZSkgTWVzc2FnZVNlcnZpY2UuSW5zdGFuY2UgPSBvcHRpb25zLm1lc3NhZ2VTZXJ2aWNlXG4gICAgICAgICAgICAgaWYgKG9wdGlvbnMucHJvamVjdG9yKSBQcm9qZWN0b3IuSW5zdGFuY2UgPSBvcHRpb25zLnByb2plY3RvcjtcbiAgICAgICAgICAgaWYgKG9wdGlvbnMuc2NyZWVucykgU2NyZWVuc01hbmFnZXIuSW5zdGFuY2UgPSBvcHRpb25zLnNjcmVlbnM7XG4gICAgICAgICAgIG1vZHVsZUNvbmZpZyA9IGNvbmZpZ3VyYXRpb247XG4gICAgICAgICAgIHJldHVybiBvcHRzLmluaXQoVnVlTWZNb2R1bGUsIG1lbnUsIHN0b3JlLCBjb25maWd1cmF0aW9uKTtcbiAgICAgICAgIH0sXG4gICAgICAgICBjb25maWcobWVudTogTWVudUhlbHBlciwgc3RvcmU6IElTdG9yZSkge1xuICAgICAgICAgICByZXR1cm4gb3B0cy5jb25maWcgPyBvcHRzLmNvbmZpZyhtZW51LCBzdG9yZSwgbW9kdWxlQ29uZmlnKSA6IG51bGw7XG4gICAgICAgICB9LFxuICAgICAgICAgcnVuKG1lbnU6IE1lbnVIZWxwZXIsIHN0b3JlOiBJU3RvcmUpIHtcbiAgICAgICAgICAgcmV0dXJuIG9wdHMucnVuID8gb3B0cy5ydW4obWVudSwgc3RvcmUsIG1vZHVsZUNvbmZpZykgOiBudWxsO1xuICAgICAgICAgfSxcbiAgICAgICAgIHJvdXRlczogb3B0cy5yb3V0ZXNcbiAgfSBhcyBJTW9kdWxlSW5pdGlhbGl6ZXJXcmFwcGVyXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBJbml0TW9kdWxlKG1vZHVsZTogYW55LCBzdG9yZTogSVN0b3JlLCBjb25maWd1cmF0aW9uOiBhbnkgfCB1bmRlZmluZWQpOiBQcm9taXNlPElNb2R1bGVJbml0aWFsaXplcj4ge1xuICBjb25zdCBpbml0b2JqID0gKG1vZHVsZS5kZWZhdWx0LmRlZmF1bHQgfHwgbW9kdWxlLmRlZmF1bHQpIGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXI7XG4gIHJldHVybiBpbml0b2JqLmluaXQoTWVudUhlbHBlci5JbnN0YW5jZSwgc3RvcmUsIGNvbmZpZ3VyYXRpb24gfHwge30sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVnaXN0cnk6IENvbW1vblJlZ2lzdHJ5Lkluc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLkluc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdG9yOiBQcm9qZWN0b3IuSW5zdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5zOiBTY3JlZW5zTWFuYWdlci5JbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluaXRvYmogYXMgdW5rbm93biBhcyBJTW9kdWxlSW5pdGlhbGl6ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb25maWdNb2R1bGUobW9kdWxlOiBhbnksIHN0b3JlOiBJU3RvcmUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgaW5pdG9iaiA9IChtb2R1bGUuZGVmYXVsdC5kZWZhdWx0IHx8IG1vZHVsZS5kZWZhdWx0KSBhcyBJTW9kdWxlSW5pdGlhbGl6ZXJXcmFwcGVyO1xuICByZXR1cm4gaW5pdG9iai5jb25maWcoTWVudUhlbHBlci5JbnN0YW5jZSwgc3RvcmUpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBSdW5Nb2R1bGUobW9kdWxlOiBhbnksIHN0b3JlOiBJU3RvcmUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgaW5pdG9iaiA9IChtb2R1bGUuZGVmYXVsdC5kZWZhdWx0IHx8IG1vZHVsZS5kZWZhdWx0KSBhcyBJTW9kdWxlSW5pdGlhbGl6ZXJXcmFwcGVyO1xuICByZXR1cm4gaW5pdG9iai5ydW4oTWVudUhlbHBlci5JbnN0YW5jZSwgc3RvcmUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTW9kdWxlUm91dGVzKG1vZHVsZTogYW55KTogSVJvdXRlQ29uZmlnW10ge1xuICBjb25zdCBpbml0b2JqID0gKG1vZHVsZS5kZWZhdWx0LmRlZmF1bHQgfHwgbW9kdWxlLmRlZmF1bHQpIGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXI7XG4gIHJldHVybiBpbml0b2JqLnJvdXRlcztcbn1cblxuZXhwb3J0IHtcbiAgTWVudUhlbHBlcixcbiAgdHlwZSBJTWVudURlZmluaXRpb24sXG4gIG1lbnVUeXBlLFxuICBDb21tb25SZWdpc3RyeSxcbiAgTWVzc2FnZVNlcnZpY2UsXG4gIGluamVjdCxcbiAgc2NyZWVuLFxuICBWYWxpZGF0ZURpcmVjdGl2ZSxcbiAgdHlwZSBQcm9qZWN0YWJsZSxcbiAgdHlwZSBJUHJvamVjdGFibGVNb2RlbCxcbiAgTWVudU5vdGlmaWNhdGlvbnMsXG4gIFByb2plY3Rvcixcbn1cblxuY29uc3QgVnVlTWZNb2R1bGUgPSB7XG4gIGluc3RhbGwsXG4gIE1lbnVIZWxwZXI6IG5ldyBNZW51SGVscGVyKCksXG4gIG1lbnVUeXBlLFxuICBDb21tb25SZWdpc3RyeTogbmV3IENvbW1vblJlZ2lzdHJ5KCksXG4gIE1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcbiAgaW5qZWN0LFxuICBzY3JlZW4sXG4gIFZhbGlkYXRlRGlyZWN0aXZlLFxuICBNZW51Tm90aWZpY2F0aW9ucyxcbiAgUHJvamVjdG9yXG59XG5cbmV4cG9ydCBkZWZhdWx0IFZ1ZU1mTW9kdWxlO1xuIl0sIm5hbWVzIjpbIkUiLCJuYW1lIiwiY2FsbGJhY2siLCJjdHgiLCJlIiwic2VsZiIsImxpc3RlbmVyIiwiZGF0YSIsImV2dEFyciIsImkiLCJsZW4iLCJldnRzIiwibGl2ZUV2ZW50cyIsInRpbnlFbWl0dGVyTW9kdWxlIiwiVGlueUVtaXR0ZXIiLCJtZW51VHlwZSIsIm1lbnVUeXBlMiIsIk1lbnVOb3RpZmljYXRpb25zIiwiX01lbnVIZWxwZXIiLCJfX3B1YmxpY0ZpZWxkIiwibWVudURlZmluaXRpb24iLCJwb3NpdGlvbnMiLCJmb3VuZCIsIm0iLCJlbGVtZW50IiwibWVudSIsInJlc3VsdCIsInVzZWQiLCJrZXkiLCJyciIsImIiLCJhIiwiTWVudUhlbHBlciIsIl9Db21tb25SZWdpc3RyeSIsInYiLCJjb21wb25lbnQiLCJncm91cCIsImdnIiwiZyIsInNlcnZpY2UiLCJDb21tb25SZWdpc3RyeSIsImFza1JlcGx5Q2hhbm5lbHMiLCJzZW5kU3Vic2NyaWJlQ2hhbm5lbHMiLCJzZW5kU3Vic2NyaWJlQ2FsbGJhY2tzIiwiYXNrIiwiYXJncyIsInJlc29sdmUiLCJwb3J0IiwiX2EiLCJjIiwiaW5uZXJjaGFubmVsIiwibCIsImV2dCIsInJlcGx5IiwiY2IiLCJvcHRzIiwiaW5uZXJwb3J0IiwiciIsInNlbmQiLCJzdWJzY3JpYmUiLCJvbmNlIiwidW5zdWJzY3JpYmUiLCJNZXNzYWdlU2VydmljZSIsIl9zZmNfbWFpbiQxIiwiZGVmaW5lQ29tcG9uZW50IiwicHJvcHMiLCJlbWl0IiwiVmFsdWUiLCJjb21wdXRlZCIsIkNvbXBvbmVudHMiLCJjbGljayIsInNhdmUiLCJfUHJvamVjdG9yIiwic2NyZWVuIiwicXVldWUiLCJhc3luYyIsIm1vZGVsIiwicHJvbWlzZSIsInJlamVjdCIsInNzIiwiX3NjcmVlbiIsInMiLCJQcm9qZWN0b3IiLCJfc2ZjX21haW4iLCJleHBvc2UiLCJtZSIsImdldEN1cnJlbnRJbnN0YW5jZSIsImN1cnJlbnRWaWV3IiwicmVmIiwiaXNWaXNpYmxlIiwiY3VycmVudFZpZXdVSUQiLCJvbk1vdW50ZWQiLCJwcm9qZWN0VG9EaXJlY3RpdmUiLCJlbCIsImJpbmQiLCJTY3JlZW5zTWFuYWdlciIsInNjcmVlbkRpcmVjdGl2ZSIsImJpbmRpbmciLCJkaXJlY3RpdmVzIiwiX1NjcmVlbnNNYW5hZ2VyIiwiZG9tRWxlbWVudCIsImNoZWNrSW5wdXRWYWxpZGF0aW9uIiwiY2FsbG91dCIsImVycm9ycyIsInZhbGlkYXRlIiwiYXJnIiwiaW5zdGFsbCIsIlZ1ZSIsImluamVjdCIsIlZhbGlkYXRlRGlyZWN0aXZlIiwiTW9kdWxlSW5pdGlhbGl6ZXIiLCJtb2R1bGVDb25maWciLCJzdG9yZSIsImNvbmZpZ3VyYXRpb24iLCJvcHRpb25zIiwiVnVlTWZNb2R1bGUiLCJJbml0TW9kdWxlIiwibW9kdWxlIiwiaW5pdG9iaiIsIkNvbmZpZ01vZHVsZSIsIlJ1bk1vZHVsZSIsIk1vZHVsZVJvdXRlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxTQUFTQSxJQUFLO0FBR2Q7QUFFQUEsRUFBRSxZQUFZO0FBQUEsRUFDWixJQUFJLFNBQVVDLEdBQU1DLEdBQVVDLEdBQUs7QUFDakMsUUFBSUMsSUFBSSxLQUFLLE1B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

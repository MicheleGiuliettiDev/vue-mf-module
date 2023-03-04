var F = Object.defineProperty;
var G = (n, e, t) => e in n ? F(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var c = (n, e, t) => (G(n, typeof e != "symbol" ? e + "" : e, t), t);
import { defineComponent as b, computed as y, getCurrentInstance as L, ref as $, onMounted as X } from "vue";
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
}, I = class {
  constructor() {
    c(this, "menuDefinitions", []);
    c(this, "menuStructure", {});
    c(this, "notifications", new A());
  }
  get Notifications() {
    return this.notifications;
  }
  static get Instance() {
    return I.instance;
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
let g = I;
c(g, "instance", new I());
const x = class {
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
let f = x;
c(f, "instance", new x());
const _ = class {
  constructor() {
    c(this, "notifier", new A());
  }
  static get Instance() {
    return _.instance;
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
let m = _;
c(m, "instance", new _());
const z = b({
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
      set: (u) => {
        e("input", u);
      }
    }), r = y(() => n.name ? [f.Instance.getComponent(n.name, n.group)] : n.group ? f.Instance.getGroupComponents(n.group, ...n.names || []) : f.Instance.getComponents(...n.names || [])), i = (...u) => {
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
  var l;
  if (u ? (l = function(d) {
    d = d || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !d && typeof __VUE_SSR_CONTEXT__ < "u" && (d = __VUE_SSR_CONTEXT__), i && i.call(this, d), d && d._registeredComponents && d._registeredComponents.add(u);
  }, a._ssrRegister = l) : i && (l = o ? function() {
    i.call(
      this,
      (a.functional ? this.parent : this).$root.$options.shadowRoot
    );
  } : i), l)
    if (a.functional) {
      a._injectStyles = l;
      var C = a.render;
      a.render = function(U, V) {
        return l.call(V), C(U, V);
      };
    } else {
      var M = a.beforeCreate;
      a.beforeCreate = M ? [].concat(M, l) : [l];
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
const N = W.exports, w = class {
  constructor() {
    c(this, "screens", /* @__PURE__ */ new Map());
    c(this, "projecting", /* @__PURE__ */ new Map());
  }
  static get Instance() {
    return w.instance;
  }
  static set Instance(e) {
    this.instance = e;
  }
  setScreen(e, t = "defaultscreen") {
    this.screens.set(t, e);
  }
  projectTo(e, t = null, r = "defaultscreen", i = !0, s = !1) {
    const u = { data: t }, o = s ? new Promise((l, C) => {
      u.reject = C, u.resolve = l;
    }) : null;
    i ? (this.projecting.has(r) || this.projecting.set(r, []), (this.projecting.get(r) || []).push({ component: e, model: u, promise: o, queue: i })) : this.projecting.set(r, [{ component: e, model: u, promise: o, queue: i }]);
    const a = this.screens.get(r);
    return a ? (a.model = u, a.currentView = e, o && o.then(() => this.stopProjecting(r)).catch(() => this.stopProjecting(r)), o) : null;
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
let v = w;
c(v, "instance", new w());
const J = b({
  name: "screen",
  props: {
    name: { type: String, default: "defaultscreen" }
  },
  setup(n, { expose: e }) {
    const t = L(), r = $(null), i = $(null);
    e({ currentView: r, model: i });
    const s = y(() => r.value != null), u = y(() => {
      var o;
      return (o = r.value) == null ? void 0 : o.__file;
    });
    return X(() => {
      v.Instance.setScreen(t.proxy, n.name);
    }), {
      currentViewUID: u,
      currentView: r,
      model: i,
      isVisible: s
    };
  }
});
var Q = function() {
  var e = this, t = e._self._c;
  return e._self._setupProxy, t("div", { directives: [{ name: "show", rawName: "v-show", value: e.isVisible, expression: "isVisible" }] }, [e.currentView ? t(e.currentView, { key: e.currentViewUID, tag: "component", attrs: { value: e.model } }) : e._e()], 1);
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
}, T = {
  projectToDirective: q,
  screenDirective: H
}, j = class {
  constructor() {
    c(this, "screens", /* @__PURE__ */ new Map());
  }
  static get Instance() {
    return j.instance;
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
let h = j;
c(h, "instance", new j());
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
  n.component("screen", O), n.component("inject", N), n.directive("screen", T.screenDirective), n.directive("projectTo", T.projectToDirective), n.directive("validate", P);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlLW1mLW1vZHVsZS5lcy5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RpbnktZW1pdHRlci9pbmRleC5qcyIsIi4uL3NyYy9oZWxwZXJzL01lbnVIZWxwZXIudHMiLCIuLi9zcmMvaGVscGVycy9Db21tb25SZWdpc3RyeS50cyIsIi4uL3NyYy9oZWxwZXJzL01lc3NhZ2VTZXJ2aWNlLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvaW5qZWN0LnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZy50cyIsIi4uL3NyYy9oZWxwZXJzL1Byb2plY3Rvci50cyIsIi4uL3NyYy9jb21wb25lbnRzL3NjcmVlbi52dWU/dnVlJnR5cGU9c2NyaXB0JmxhbmcudHMiLCIuLi9zcmMvZGlyZWN0aXZlcy9zY3JlZW4udHMiLCIuLi9zcmMvZGlyZWN0aXZlcy92YWxpZGF0ZS50cyIsIi4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBFICgpIHtcbiAgLy8gS2VlcCB0aGlzIGVtcHR5IHNvIGl0J3MgZWFzaWVyIHRvIGluaGVyaXQgZnJvbVxuICAvLyAodmlhIGh0dHBzOi8vZ2l0aHViLmNvbS9saXBzbWFjayBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvaXNzdWVzLzMpXG59XG5cbkUucHJvdG90eXBlID0ge1xuICBvbjogZnVuY3Rpb24gKG5hbWUsIGNhbGxiYWNrLCBjdHgpIHtcbiAgICB2YXIgZSA9IHRoaXMuZSB8fCAodGhpcy5lID0ge30pO1xuXG4gICAgKGVbbmFtZV0gfHwgKGVbbmFtZV0gPSBbXSkpLnB1c2goe1xuICAgICAgZm46IGNhbGxiYWNrLFxuICAgICAgY3R4OiBjdHhcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9LFxuXG4gIG9uY2U6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGxpc3RlbmVyICgpIHtcbiAgICAgIHNlbGYub2ZmKG5hbWUsIGxpc3RlbmVyKTtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGN0eCwgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgbGlzdGVuZXIuXyA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHRoaXMub24obmFtZSwgbGlzdGVuZXIsIGN0eCk7XG4gIH0sXG5cbiAgZW1pdDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgZGF0YSA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICB2YXIgZXZ0QXJyID0gKCh0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KSlbbmFtZV0gfHwgW10pLnNsaWNlKCk7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBsZW4gPSBldnRBcnIubGVuZ3RoO1xuXG4gICAgZm9yIChpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGV2dEFycltpXS5mbi5hcHBseShldnRBcnJbaV0uY3R4LCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvZmY6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgIHZhciBlID0gdGhpcy5lIHx8ICh0aGlzLmUgPSB7fSk7XG4gICAgdmFyIGV2dHMgPSBlW25hbWVdO1xuICAgIHZhciBsaXZlRXZlbnRzID0gW107XG5cbiAgICBpZiAoZXZ0cyAmJiBjYWxsYmFjaykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGV2dHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGV2dHNbaV0uZm4gIT09IGNhbGxiYWNrICYmIGV2dHNbaV0uZm4uXyAhPT0gY2FsbGJhY2spXG4gICAgICAgICAgbGl2ZUV2ZW50cy5wdXNoKGV2dHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBldmVudCBmcm9tIHF1ZXVlIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtcbiAgICAvLyBTdWdnZXN0ZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2xhemRcbiAgICAvLyBSZWY6IGh0dHBzOi8vZ2l0aHViLmNvbS9zY290dGNvcmdhbi90aW55LWVtaXR0ZXIvY29tbWl0L2M2ZWJmYWE5YmM5NzNiMzNkMTEwYTg0YTMwNzc0MmI3Y2Y5NGM5NTMjY29tbWl0Y29tbWVudC01MDI0OTEwXG5cbiAgICAobGl2ZUV2ZW50cy5sZW5ndGgpXG4gICAgICA/IGVbbmFtZV0gPSBsaXZlRXZlbnRzXG4gICAgICA6IGRlbGV0ZSBlW25hbWVdO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRTtcbm1vZHVsZS5leHBvcnRzLlRpbnlFbWl0dGVyID0gRTtcbiIsImltcG9ydCB7IFRpbnlFbWl0dGVyIH0gZnJvbSAndGlueS1lbWl0dGVyJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1lbnVEZWZpbml0aW9uIHtcclxuICBuYW1lOiBzdHJpbmcsXHJcbiAgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICBpY29uPzogc3RyaW5nLFxyXG4gIHJvdXRlTmFtZT86IHN0cmluZyxcclxuICByb3V0ZVBhcmFtcz86IG9iamVjdCxcclxuICBmZWF0dXJlZmxhZ3M/OiBzdHJpbmdbXSxcclxuICBvcmRlckluZGV4PzogbnVtYmVyLFxyXG4gIGNsYXNzPzogc3RyaW5nLFxyXG4gIGhpZGRlbjogKCkgPT4gYm9vbGVhblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGVudW0gbWVudVR5cGUge1xyXG4gIGRyYXdlciwgICAgICAgLy8gRHJhd2VyIE1lbnVcclxuICBib3R0b20sICAgICAgIC8vIEJvdHRvbSBNZW51XHJcbiAgaGVhZGVyXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBNZW51Tm90aWZpY2F0aW9ucyA9IHtcclxuICBtZW51RGVmaW5pdGlvbkFkZGVkOiAnbmV3bWVudWl0ZW0nXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNZW51SGVscGVyIHtcclxuXHJcbiAgcHJpdmF0ZSBtZW51RGVmaW5pdGlvbnM6IElNZW51RGVmaW5pdGlvbltdID0gW107XHJcbiAgcHJpdmF0ZSBtZW51U3RydWN0dXJlOiB7IFtrZXk6IHN0cmluZ106IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSB9ID0ge31cclxuICBwcml2YXRlIG5vdGlmaWNhdGlvbnM6IFRpbnlFbWl0dGVyID0gbmV3IFRpbnlFbWl0dGVyKCk7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgTWVudUhlbHBlcigpO1xyXG4gIHB1YmxpYyBnZXQgTm90aWZpY2F0aW9ucygpIHsgcmV0dXJuIHRoaXMubm90aWZpY2F0aW9uczsgfVxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCkgeyByZXR1cm4gTWVudUhlbHBlci5pbnN0YW5jZSB9XHJcblxyXG4gIHB1YmxpYyBhZGRNZW51RGVmaW5pdGlvbihtZW51RGVmaW5pdGlvbjogSU1lbnVEZWZpbml0aW9uLCAuLi5wb3NpdGlvbnM6IHsgc2VjdGlvbjogbWVudVR5cGUsIHBhcmVudD86IHN0cmluZyB9W10pIHtcclxuXHJcbiAgICAvLyBBZ2dpdW5nbyBsYSBkaWNoaWFyYXppb25lIGRlbCBtZW51w7kgYWxsJ2VsZW5jbyBkZWkgbWVuw7kgZGlzcG9uaWJpbGkuXHJcbiAgICBsZXQgZm91bmQgPSB0aGlzLm1lbnVEZWZpbml0aW9ucy5maW5kKG0gPT4gbS5uYW1lID09IG1lbnVEZWZpbml0aW9uLm5hbWUpO1xyXG4gICAgaWYgKCFmb3VuZClcclxuICAgICAgdGhpcy5tZW51RGVmaW5pdGlvbnMucHVzaChtZW51RGVmaW5pdGlvbik7XHJcbiAgICBlbHNlXHJcbiAgICAgIG1lbnVEZWZpbml0aW9uID0gZm91bmQ7XHJcblxyXG4gICAgZm9yIChjb25zdCBlbGVtZW50IG9mIHBvc2l0aW9ucykge1xyXG5cclxuICAgICAgdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl0gPSB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXSB8fCB7fTtcclxuICAgICAgdGhpcy5tZW51U3RydWN0dXJlW2VsZW1lbnQuc2VjdGlvbl1bZWxlbWVudC5wYXJlbnQgfHwgbWVudURlZmluaXRpb24ubmFtZV0gPSB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXVtlbGVtZW50LnBhcmVudCB8fCBtZW51RGVmaW5pdGlvbi5uYW1lXSB8fCBbXTtcclxuXHJcbiAgICAgIGlmIChlbGVtZW50LnBhcmVudClcclxuICAgICAgICB0aGlzLm1lbnVTdHJ1Y3R1cmVbZWxlbWVudC5zZWN0aW9uXVtlbGVtZW50LnBhcmVudF0ucHVzaChtZW51RGVmaW5pdGlvbi5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm5vdGlmaWNhdGlvbnMuZW1pdChNZW51Tm90aWZpY2F0aW9ucy5tZW51RGVmaW5pdGlvbkFkZGVkLCBtZW51RGVmaW5pdGlvbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TWVudUl0ZW0obmFtZTogc3RyaW5nKTogSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLm1lbnVEZWZpbml0aW9ucy5maW5kKGkgPT4gaS5uYW1lID09IG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE1lbnUobWVudTogbWVudVR5cGUpOiB7IGl0ZW06IElNZW51RGVmaW5pdGlvbiB8IHVuZGVmaW5lZCwgY2hpbGRyZW46IChJTWVudURlZmluaXRpb24gfCB1bmRlZmluZWQpW10gfVtdIHtcclxuICAgIGxldCByZXN1bHQ6IHsgaXRlbTogSU1lbnVEZWZpbml0aW9uIHwgdW5kZWZpbmVkLCBjaGlsZHJlbjogKElNZW51RGVmaW5pdGlvbiB8IHVuZGVmaW5lZClbXSB9W10gPSBbXTtcclxuICAgIGxldCB1c2VkID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5tZW51U3RydWN0dXJlW21lbnVdKSB7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLm1lbnVTdHJ1Y3R1cmVbbWVudV1ba2V5XTtcclxuXHJcblxyXG4gICAgICBsZXQgcnIgPSB7XHJcbiAgICAgICAgaXRlbTogdGhpcy5tZW51RGVmaW5pdGlvbnMuZmluZChtID0+IHtcclxuICAgICAgICAgIHJldHVybiBtLm5hbWUgPT0ga2V5ICYmXHJcbiAgICAgICAgICAgICghbS5oaWRkZW4gfHwgIW0uaGlkZGVuKCkpXHJcbiAgICAgICAgfSksXHJcblxyXG4gICAgICAgIGNoaWxkcmVuOiBlbGVtZW50Lm1hcChpID0+IHRoaXMubWVudURlZmluaXRpb25zLmZpbmQobSA9PiBtLm5hbWUgPT0gaSAmJiAoIW0uaGlkZGVuIHx8ICFtLmhpZGRlbigpKSkpXHJcbiAgICAgICAgICAuZmlsdGVyKGkgPT4gISFpKVxyXG4gICAgICAgICAgLnNvcnQoKGEsIGIpID0+IHtcclxuICAgICAgICAgICAgaWYgKGEgJiYgYiAmJiBhLm9yZGVySW5kZXggJiYgYi5vcmRlckluZGV4ICYmIGEub3JkZXJJbmRleCA+IGIub3JkZXJJbmRleCkgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIGlmIChhICYmIGIgJiYgYS5vcmRlckluZGV4ICYmIGIub3JkZXJJbmRleCAmJiBhLm9yZGVySW5kZXggPCBiLm9yZGVySW5kZXgpIHJldHVybiAtMTtcclxuICAgICAgICAgICAgcmV0dXJuIDBcclxuICAgICAgICAgIH0pXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoISFyci5pdGVtKSB7XHJcbiAgICAgICAgdXNlZC5hZGQoa2V5KTtcclxuICAgICAgICBlbGVtZW50LmZvckVhY2goaSA9PiB1c2VkLmFkZChpKSk7XHJcbiAgICAgICAgcmVzdWx0LnB1c2gocnIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0LmZpbHRlcihpID0+ICEhaS5pdGVtKVxyXG4gICAgICAuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICAgIGlmIChhICYmIGIgJiYgYS5pdGVtICYmIGIuaXRlbSAmJiBhLml0ZW0ub3JkZXJJbmRleCAmJiBiLml0ZW0ub3JkZXJJbmRleCAmJiBhLml0ZW0ub3JkZXJJbmRleCA+IGIuaXRlbS5vcmRlckluZGV4KSByZXR1cm4gMTtcclxuICAgICAgICBpZiAoYSAmJiBiICYmIGEuaXRlbSAmJiBiLml0ZW0gJiYgYS5pdGVtLm9yZGVySW5kZXggJiYgYi5pdGVtLm9yZGVySW5kZXggJiYgYS5pdGVtLm9yZGVySW5kZXggPCBiLml0ZW0ub3JkZXJJbmRleCkgcmV0dXJuIC0xO1xyXG4gICAgICAgIHJldHVybiAwXHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuIiwiXHJcbmV4cG9ydCBjbGFzcyBDb21tb25SZWdpc3RyeSB7XHJcblxyXG4gIHByaXZhdGUgcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xyXG4gIHByaXZhdGUgZ3JvdXBlZHJlZ2lzdHJ5ID0gbmV3IE1hcDxzdHJpbmcsIE1hcDxzdHJpbmcsIGFueT4+KCk7XHJcbiAgcHJpdmF0ZSBzZXJ2aWNlcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xyXG4gIHByaXZhdGUgZ3JvdXBlZHNlcnZpY2VyZWdpc3RyeSA9IG5ldyBNYXA8c3RyaW5nLCBNYXA8c3RyaW5nLCBhbnk+PigpO1xyXG5cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IENvbW1vblJlZ2lzdHJ5ID0gbmV3IENvbW1vblJlZ2lzdHJ5KCk7XHJcbiAgc3RhdGljIGdldCBJbnN0YW5jZSgpIHsgcmV0dXJuIHRoaXMuaW5zdGFuY2U7IH1cclxuICBzdGF0aWMgc2V0IEluc3RhbmNlKHY6IENvbW1vblJlZ2lzdHJ5KSB7IHRoaXMuaW5zdGFuY2UgPSB2IH07XHJcblxyXG4gIHByb3ZpZGVDb21wb25lbnQoY29tcG9uZW50OiBhbnksIG5hbWU6IHN0cmluZywgZ3JvdXA/OiBzdHJpbmcpIHtcclxuICAgIHRoaXMucmVnaXN0cnkuc2V0KGdyb3VwID8gYCR7Z3JvdXB9LSR7bmFtZX1gIDogbmFtZSwgY29tcG9uZW50KTtcclxuICAgIGlmIChncm91cCkge1xyXG4gICAgICBpZiAoIXRoaXMuZ3JvdXBlZHJlZ2lzdHJ5Lmhhcyhncm91cCkpIHRoaXMuZ3JvdXBlZHJlZ2lzdHJ5LnNldChncm91cCwgbmV3IE1hcDxzdHJpbmcsIGFueT4oKSk7XHJcblxyXG4gICAgICBsZXQgZ2cgPSB0aGlzLmdyb3VwZWRyZWdpc3RyeS5nZXQoZ3JvdXApO1xyXG4gICAgICBpZiAoZ2cpIGdnLnNldChuYW1lLCBjb21wb25lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0Q29tcG9uZW50KG5hbWU6IHN0cmluZywgZ3JvdXA/OiBzdHJpbmcpOiBhbnkgfCBudWxsIHtcclxuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5LmdldChncm91cCA/IGAke2dyb3VwfS0ke25hbWV9YCA6IG5hbWUpIHx8IG51bGw7XHJcbiAgfVxyXG5cclxuICBnZXRDb21wb25lbnRzKC4uLm5hbWU6IHN0cmluZ1tdKTogKGFueSlbXSB7XHJcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnJlZ2lzdHJ5LmVudHJpZXMoKSkuZmlsdGVyKGkgPT4gbmFtZS5pbmRleE9mKGlbMF0pID49IDApLm1hcChpID0+IGlbMV0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0R3JvdXBDb21wb25lbnRzKGdyb3VwOiBzdHJpbmcsIC4uLm5hbWU6IHN0cmluZ1tdKTogKGFueSlbXSB7XHJcbiAgICBsZXQgZyA9IHRoaXMuZ3JvdXBlZHJlZ2lzdHJ5LmdldChncm91cCk7XHJcbiAgICBpZiAoZylcclxuICAgICAgcmV0dXJuIEFycmF5LmZyb20oZy5lbnRyaWVzKCkgfHwgW10pLmZpbHRlcihpID0+ICghbmFtZSB8fCBuYW1lLmxlbmd0aCA9PSAwKSB8fCBuYW1lLmluZGV4T2YoaVswXSkgPj0gMCkubWFwKGkgPT4gaVsxXSk7XHJcbiAgICByZXR1cm4gW11cclxuICB9XHJcblxyXG4gIGdldEdyb3VwQ29tcG9uZW50c0tleXMoZ3JvdXA6IHN0cmluZyk6IChzdHJpbmcpW10ge1xyXG4gICAgbGV0IGcgPSB0aGlzLmdyb3VwZWRyZWdpc3RyeS5nZXQoZ3JvdXApO1xyXG4gICAgaWYgKGcpIHJldHVybiBBcnJheS5mcm9tKGcua2V5cygpKTtcclxuICAgIHJldHVybiBbXVxyXG4gIH1cclxuXHJcbiAgcHJvdmlkZVNlcnZpY2UobmFtZTogc3RyaW5nLCBzZXJ2aWNlOiBhbnksIGdyb3VwPzogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNlcnZpY2VyZWdpc3RyeS5zZXQobmFtZSwgc2VydmljZSk7XHJcbiAgICBpZiAoZ3JvdXApIHtcclxuICAgICAgaWYgKCF0aGlzLmdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkuaGFzKGdyb3VwKSkgdGhpcy5ncm91cGVkc2VydmljZXJlZ2lzdHJ5LnNldChncm91cCwgbmV3IE1hcDxzdHJpbmcsIGFueT4oKSk7XHJcbiAgICAgIGxldCBnZyA9IHRoaXMuZ3JvdXBlZHNlcnZpY2VyZWdpc3RyeS5nZXQoZ3JvdXApO1xyXG4gICAgICBpZiAoZ2cpIGdnLnNldChuYW1lLCBzZXJ2aWNlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFNlcnZpY2U8VD4obmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuc2VydmljZXJlZ2lzdHJ5LmdldChuYW1lKSB8fCBudWxsKSBhcyBUO1xyXG4gIH1cclxuXHJcbiAgZ2V0R3JvdXBTZXJ2aWNlcyhncm91cDogc3RyaW5nLCAuLi5uYW1lOiBzdHJpbmdbXSk6IChhbnkpW10ge1xyXG4gICAgbGV0IGcgPSB0aGlzLmdyb3VwZWRzZXJ2aWNlcmVnaXN0cnkuZ2V0KGdyb3VwKTtcclxuICAgIGlmIChnKVxyXG4gICAgICByZXR1cm4gQXJyYXkuZnJvbShnLmVudHJpZXMoKSB8fCBbXSkuZmlsdGVyKGkgPT4gKCFuYW1lIHx8IG5hbWUubGVuZ3RoID09IDApIHx8IG5hbWUuaW5kZXhPZihpWzBdKSA+PSAwKS5tYXAoaSA9PiBpWzFdKTtcclxuICAgIHJldHVybiBbXVxyXG4gIH1cclxufSIsImltcG9ydCB7IFRpbnlFbWl0dGVyIH0gZnJvbSBcInRpbnktZW1pdHRlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2UgPSBuZXcgTWVzc2FnZVNlcnZpY2UoKTtcclxuICBzdGF0aWMgZ2V0IEluc3RhbmNlKCkgeyByZXR1cm4gTWVzc2FnZVNlcnZpY2UuaW5zdGFuY2UgfVxyXG4gIHN0YXRpYyBzZXQgSW5zdGFuY2UodjogTWVzc2FnZVNlcnZpY2UpIHsgdGhpcy5pbnN0YW5jZSA9IHY7IH1cclxuXHJcbiAgbm90aWZpZXI6IFRpbnlFbWl0dGVyID0gbmV3IFRpbnlFbWl0dGVyKCk7XHJcblxyXG4gIHNlbmQobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xyXG4gICAgdGhpcy5ub3RpZmllci5lbWl0KG1lc3NhZ2UsIC4uLmFyZ3MpO1xyXG4gIH1cclxuXHJcbiAgc3Vic2NyaWJlKG1lc3NhZ2U6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uLCBjdHg/OiBhbnkpIHtcclxuICAgIHRoaXMubm90aWZpZXIub24obWVzc2FnZSwgY2FsbGJhY2ssIGN0eCk7XHJcbiAgfVxyXG5cclxuICBvbmNlKG1lc3NhZ2U6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uLCBjdHg/OiBhbnkpIHtcclxuICAgIHRoaXMubm90aWZpZXIub25jZShtZXNzYWdlLCBjYWxsYmFjaywgY3R4KTtcclxuICB9XHJcblxyXG4gIHVuc3Vic2NyaWJlKG1lc3NhZ2U6IHN0cmluZywgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG4gICAgdGhpcy5ub3RpZmllci5vZmYobWVzc2FnZSwgY2FsbGJhY2spO1xyXG4gIH1cclxuXHJcbiAgYXNrPFQ+KG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pOiBQcm9taXNlPFQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMubm90aWZpZXIuZW1pdChgJGFzay0ke21lc3NhZ2V9YCwge1xyXG4gICAgICAgIHJlc29sdmUsXHJcbiAgICAgICAgcmVqZWN0LFxyXG4gICAgICAgIGFyZ3NcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICByZXBseTxSPihtZXNzYWdlOiBzdHJpbmcsIGNhbGxiYWNrOiAoLi4uYXJnczogYW55W10pID0+IFIpIHtcclxuICAgIHRoaXMubm90aWZpZXIub24oYCRhc2stJHttZXNzYWdlfWAsIChtOiB7IHJlc29sdmU6IChkYXRhOiBSKSA9PiB2b2lkLCByZWplY3Q6IEZ1bmN0aW9uLCBhcmdzOiBhbnlbXSB9KSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGNhbGxiYWNrKC4uLm0uYXJncyk7XHJcbiAgICAgICAgbS5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgIH1cclxuICAgICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgIG0ucmVqZWN0KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSIsIlxyXG5pbXBvcnQgeyBjb21wdXRlZCwgZGVmaW5lQ29tcG9uZW50IH0gZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgeyBDb21tb25SZWdpc3RyeSB9IGZyb20gXCIuLi9oZWxwZXJzL0NvbW1vblJlZ2lzdHJ5XCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbXBvbmVudCh7XHJcbiAgbmFtZTogXCJpbmplY3RcIixcclxuICBwcm9wczoge1xyXG4gICAgaWQ6IHsgZGVmYXVsdDogbnVsbCB9LFxyXG4gICAgdHlwZTogeyBkZWZhdWx0OiBudWxsLCB0eXBlOiBTdHJpbmcgfSxcclxuICAgIHZhbHVlOiB7IGRlZmF1bHQ6IG51bGwgfSxcclxuICAgIG5hbWU6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiBudWxsIH0sXHJcbiAgICBuYW1lczogeyB0eXBlOiBBcnJheTxzdHJpbmc+LCBkZWZhdWx0OiBudWxsIH0sXHJcbiAgICBncm91cDogeyB0eXBlOiBTdHJpbmcsIGRlZmF1bHQ6IG51bGwgfSxcclxuICAgIG1ldGFkYXRhOiB7IHR5cGU6IE9iamVjdCwgZGVmYXVsdDogbnVsbCB9LFxyXG4gICAgZGlzYWJsZWQ6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogZmFsc2UgfSxcclxuICAgIHJlYWRvbmx5OiB7IHR5cGU6IEJvb2xlYW4sIGRlZmF1bHQ6IGZhbHNlIH1cclxuICB9LFxyXG4gIHNldHVwKHByb3BzLCB7IGVtaXQgfSkge1xyXG5cclxuXHJcbiAgICBjb25zdCBWYWx1ZSA9IGNvbXB1dGVkKHtcclxuICAgICAgZ2V0OiAoKSA9PiB7IHJldHVybiBwcm9wcy52YWx1ZSB9LFxyXG4gICAgICBzZXQ6ICh2KSA9PiB7IGVtaXQoXCJpbnB1dFwiLCB2KTsgfVxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBDb21wb25lbnRzID0gY29tcHV0ZWQoKCkgPT4ge1xyXG4gICAgICBpZiAocHJvcHMubmFtZSlcclxuICAgICAgICByZXR1cm4gW0NvbW1vblJlZ2lzdHJ5Lkluc3RhbmNlLmdldENvbXBvbmVudChwcm9wcy5uYW1lLCBwcm9wcy5ncm91cCldO1xyXG4gICAgICBpZiAocHJvcHMuZ3JvdXApXHJcbiAgICAgICAgcmV0dXJuIENvbW1vblJlZ2lzdHJ5Lkluc3RhbmNlLmdldEdyb3VwQ29tcG9uZW50cyhwcm9wcy5ncm91cCwgLi4uKHByb3BzLm5hbWVzIHx8IFtdKSk7XHJcbiAgICAgIHJldHVybiBDb21tb25SZWdpc3RyeS5JbnN0YW5jZS5nZXRDb21wb25lbnRzKC4uLihwcm9wcy5uYW1lcyB8fCBbXSkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgY2xpY2sgPSAoLi4uYXJnczogYW55W10pID0+IHsgZW1pdCgnY2xpY2snLCAuLi5hcmdzKSB9XHJcbiAgICBjb25zdCBzYXZlID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7IGVtaXQoJ3NhdmUnLCAuLi5hcmdzKSB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaWQ6IHByb3BzLmlkLFxyXG4gICAgICB0eXBlOiBwcm9wcy50eXBlLFxyXG4gICAgICB2YWx1ZTogcHJvcHMudmFsdWUsXHJcbiAgICAgIG5hbWU6IHByb3BzLm5hbWUsXHJcbiAgICAgIG5hbWVzOiBwcm9wcy5uYW1lcyxcclxuICAgICAgZ3JvdXA6IHByb3BzLmdyb3VwLFxyXG4gICAgICBtZXRhZGF0YTogcHJvcHMubWV0YWRhdGEsXHJcbiAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlZCxcclxuICAgICAgcmVhZG9ubHk6IHByb3BzLnJlYWRvbmx5LFxyXG4gICAgICBjbGljayxcclxuICAgICAgc2F2ZSxcclxuICAgICAgQ29tcG9uZW50cyxcclxuICAgICAgVmFsdWUsXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG4iLCJcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBDb21wb25lbnRQdWJsaWNJbnN0YW5jZSB9IGZyb20gXCJ2dWVcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb2plY3RhYmxlTW9kZWw8VD4ge1xyXG4gIGRhdGE6IFQ7IHJlc29sdmU6IChpdGVtOiBUKSA9PiB2b2lkOyByZWplY3Q6ICgpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0b3Ige1xyXG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlID0gbmV3IFByb2plY3RvcigpO1xyXG4gIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogUHJvamVjdG9yIHsgcmV0dXJuIFByb2plY3Rvci5pbnN0YW5jZSB9XHJcbiAgc3RhdGljIHNldCBJbnN0YW5jZSh2OiBQcm9qZWN0b3IpIHsgdGhpcy5pbnN0YW5jZSA9IHY7IH1cclxuXHJcbiAgcHJpdmF0ZSBzY3JlZW5zID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcclxuICBwcml2YXRlIHByb2plY3RpbmcgPSBuZXcgTWFwPHN0cmluZywgeyBjb21wb25lbnQ6IENvbXBvbmVudCwgbW9kZWw6IElQcm9qZWN0YWJsZU1vZGVsPGFueT4sIHByb21pc2U6IFByb21pc2U8YW55PiB8IG51bGwsIHF1ZXVlOiBib29sZWFuIH1bXT4oKTtcclxuXHJcbiAgc2V0U2NyZWVuKHNjcmVlbjogQ29tcG9uZW50UHVibGljSW5zdGFuY2UsIG5hbWU6IHN0cmluZyA9IFwiZGVmYXVsdHNjcmVlblwiKSB7XHJcbiAgICB0aGlzLnNjcmVlbnMuc2V0KG5hbWUsIHNjcmVlbik7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIHByb2plY3RUbzxUPihjb21wb25lbnQ6IENvbXBvbmVudCwgZGF0YTogVCB8IG51bGwgPSBudWxsLCBzY3JlZW46IHN0cmluZyA9IFwiZGVmYXVsdHNjcmVlblwiLCBxdWV1ZTogYm9vbGVhbiA9IHRydWUsIGFzeW5jOiBib29sZWFuID0gZmFsc2UpOiBQcm9taXNlPFQ+IHwgbnVsbCB7XHJcbiAgICBjb25zdCBtb2RlbCA9IHsgZGF0YSB9IGFzIElQcm9qZWN0YWJsZU1vZGVsPFQ+O1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IGFzeW5jID8gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4geyBtb2RlbC5yZWplY3QgPSByZWplY3Q7IG1vZGVsLnJlc29sdmUgPSByZXNvbHZlIH0pIDogbnVsbDtcclxuXHJcbiAgICBpZiAoIXF1ZXVlKSB7XHJcblxyXG4gICAgICB0aGlzLnByb2plY3Rpbmcuc2V0KHNjcmVlbiwgW3sgY29tcG9uZW50LCBtb2RlbCwgcHJvbWlzZSwgcXVldWUgfV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKCF0aGlzLnByb2plY3RpbmcuaGFzKHNjcmVlbikpIHtcclxuICAgICAgICB0aGlzLnByb2plY3Rpbmcuc2V0KHNjcmVlbiwgW10pO1xyXG4gICAgICB9XHJcbiAgICAgICh0aGlzLnByb2plY3RpbmcuZ2V0KHNjcmVlbikgfHwgW10pLnB1c2goeyBjb21wb25lbnQsIG1vZGVsLCBwcm9taXNlLCBxdWV1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzcyA9IHRoaXMuc2NyZWVucy5nZXQoc2NyZWVuKTtcclxuICAgIGlmICghc3MpIHJldHVybiBudWxsO1xyXG4gICAgc3MubW9kZWwgPSBtb2RlbDtcclxuICAgIHNzLmN1cnJlbnRWaWV3ID0gY29tcG9uZW50O1xyXG5cclxuICAgIGlmIChwcm9taXNlKSBwcm9taXNlLnRoZW4oKCkgPT4gdGhpcy5zdG9wUHJvamVjdGluZyhzY3JlZW4pKS5jYXRjaCgoKSA9PiB0aGlzLnN0b3BQcm9qZWN0aW5nKHNjcmVlbikpO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxuICBwcm9qZWN0QXN5bmNUbzxUPihjb21wb25lbnQ6IENvbXBvbmVudCwgZGF0YTogVCwgc2NyZWVuOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIiwgcXVldWU6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0VG8oY29tcG9uZW50LCBkYXRhLCBzY3JlZW4sIHF1ZXVlLCB0cnVlKVxyXG4gIH1cclxuXHJcbiAgc3RvcFByb2plY3Rpbmcoc2NyZWVuOiBzdHJpbmcgPSBcImRlZmF1bHRzY3JlZW5cIikge1xyXG4gICAgaWYgKHRoaXMucHJvamVjdGluZy5oYXMoc2NyZWVuKSkge1xyXG4gICAgICAodGhpcy5wcm9qZWN0aW5nLmdldChzY3JlZW4pIHx8IFtdKS5wb3AoKVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBfc2NyZWVuID0gdGhpcy5zY3JlZW5zLmdldChzY3JlZW4pXHJcbiAgICBpZiAoX3NjcmVlbiAmJiBfc2NyZWVuLmN1cnJlbnRWaWV3KSB7XHJcbiAgICAgIF9zY3JlZW4ubW9kZWwgPSBudWxsO1xyXG4gICAgICBfc2NyZWVuLnNjcmVlbk1vZGVsID0gbnVsbDtcclxuICAgICAgX3NjcmVlbi5jdXJyZW50VmlldyA9IG51bGw7XHJcblxyXG4gICAgICBpZiAodGhpcy5wcm9qZWN0aW5nLmhhcyhzY3JlZW4pKSB7XHJcbiAgICAgICAgbGV0IHMgPSB0aGlzLnByb2plY3RpbmcuZ2V0KHNjcmVlbik7XHJcbiAgICAgICAgaWYgKHMgJiYgcy5sZW5ndGgpIHtcclxuICAgICAgICAgIGxldCBtID0gcy5wb3AoKTtcclxuICAgICAgICAgIGlmIChtKSB0aGlzLnByb2plY3RUbyhtLmNvbXBvbmVudCwgbS5tb2RlbCwgc2NyZWVuLCBtLnF1ZXVlLCAhIW0ucHJvbWlzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdGFibGU8VD4ge1xyXG4gIHZhbHVlOiB7XHJcbiAgICBkYXRhOiBULFxyXG4gICAgcmVzb2x2ZTogKGl0ZW06IFQpID0+IHZvaWQ7XHJcbiAgICByZWplY3Q6ICgpID0+IHZvaWQ7XHJcbiAgfTtcclxufSIsIlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudFB1YmxpY0luc3RhbmNlLCBjb21wdXRlZCwgZGVmaW5lQ29tcG9uZW50LCBnZXRDdXJyZW50SW5zdGFuY2UsIG9uTW91bnRlZCwgUmVmLCByZWYsIHdhdGNoIH0gZnJvbSBcInZ1ZVwiO1xyXG5pbXBvcnQgeyBJUHJvamVjdGFibGVNb2RlbCwgUHJvamVjdG9yIH0gZnJvbSBcIi4uL2hlbHBlcnMvUHJvamVjdG9yXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xyXG4gIG5hbWU6IFwic2NyZWVuXCIsXHJcbiAgcHJvcHM6IHtcclxuICAgIG5hbWU6IHsgdHlwZTogU3RyaW5nLCBkZWZhdWx0OiBcImRlZmF1bHRzY3JlZW5cIiB9LFxyXG4gIH0sXHJcbiAgc2V0dXAocHJvcHMsIHsgZXhwb3NlIH0pIHtcclxuXHJcbiAgICBjb25zdCBtZSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRWaWV3OiBSZWY8Q29tcG9uZW50PiA9IHJlZihudWxsISk7XHJcbiAgICBjb25zdCBtb2RlbDogUmVmPElQcm9qZWN0YWJsZU1vZGVsPGFueT4gfCBudWxsPiA9IHJlZihudWxsISk7XHJcblxyXG4gICAgZXhwb3NlKHsgY3VycmVudFZpZXcsIG1vZGVsIH0pXHJcblxyXG4gICAgY29uc3QgaXNWaXNpYmxlID0gY29tcHV0ZWQoKCkgPT4ge1xyXG4gICAgICByZXR1cm4gY3VycmVudFZpZXcudmFsdWUgIT0gbnVsbDtcclxuICAgIH0pXHJcblxyXG4gICAgY29uc3QgY3VycmVudFZpZXdVSUQgPSBjb21wdXRlZCgoKSA9PiB7XHJcbiAgICAgIHJldHVybiAoY3VycmVudFZpZXcudmFsdWUgYXMgYW55KT8uX19maWxlXHJcbiAgICB9KVxyXG5cclxuICAgIG9uTW91bnRlZCgoKSA9PiB7XHJcbiAgICAgIFByb2plY3Rvci5JbnN0YW5jZS5zZXRTY3JlZW4oKG1lIGFzIGFueSkucHJveHksIHByb3BzLm5hbWUpO1xyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjdXJyZW50Vmlld1VJRCxcclxuICAgICAgY3VycmVudFZpZXcsXHJcbiAgICAgIG1vZGVsLFxyXG4gICAgICBpc1Zpc2libGVcclxuICAgIH1cclxuICB9LFxyXG5cclxufSlcclxuIiwiY29uc3QgcHJvamVjdFRvRGlyZWN0aXZlID0ge1xyXG5cclxuICBpbnNlcnRlZDogKGVsOiBFbGVtZW50LCBiaW5kOiBhbnkpID0+IHtcclxuICAgIFNjcmVlbnNNYW5hZ2VyLkluc3RhbmNlLmluamVjdFRvKGVsLCBiaW5kLmFyZyk7XHJcbiAgfSxcclxuICB1bmJpbmQ6IChlbDogRWxlbWVudCwgYmluZDogYW55KSA9PiB7XHJcbiAgICBTY3JlZW5zTWFuYWdlci5JbnN0YW5jZS5yZW1vdmVGcm9tKGVsLCBiaW5kLmFyZylcclxuICB9XHJcbn1cclxuXHJcblxyXG5jb25zdCBzY3JlZW5EaXJlY3RpdmUgPSB7XHJcbiAgYmluZDogKGVsOiBhbnksIGJpbmRpbmc6IGFueSkgPT4ge1xyXG4gICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgU2NyZWVuc01hbmFnZXIuSW5zdGFuY2Uuc2V0U2NyZWVuKGVsLCBiaW5kaW5nLmFyZyk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcHJvamVjdFRvRGlyZWN0aXZlLCBzY3JlZW5EaXJlY3RpdmVcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNjcmVlbnNNYW5hZ2VyIHtcclxuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZSA9IG5ldyBTY3JlZW5zTWFuYWdlcigpO1xyXG4gIHN0YXRpYyBnZXQgSW5zdGFuY2UoKTogU2NyZWVuc01hbmFnZXIgeyByZXR1cm4gU2NyZWVuc01hbmFnZXIuaW5zdGFuY2UgfVxyXG4gIHN0YXRpYyBzZXQgSW5zdGFuY2UodjogU2NyZWVuc01hbmFnZXIpIHsgdGhpcy5pbnN0YW5jZSA9IHY7IH1cclxuICBwcml2YXRlIHNjcmVlbnMgPSBuZXcgTWFwPHN0cmluZywgRWxlbWVudD4oKTtcclxuICBcclxuXHJcbiAgaW5qZWN0VG8oZG9tRWxlbWVudDogRWxlbWVudCwgc2NyZWVuOiBzdHJpbmcpIHtcclxuICAgIGlmICghZG9tRWxlbWVudCB8fCAhc2NyZWVuKSByZXR1cm47XHJcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuc2NyZWVucy5oYXMoc2NyZWVuKSA/IHRoaXMuc2NyZWVucy5nZXQoc2NyZWVuKSA6IG51bGw7XHJcbiAgICB0cnkgeyBkb21FbGVtZW50LnBhcmVudEVsZW1lbnQgJiYgZG9tRWxlbWVudC5yZW1vdmVDaGlsZChkb21FbGVtZW50KTsgfSBjYXRjaCB7IH1cclxuICAgIGlmIChlbGVtZW50KSBlbGVtZW50LmFwcGVuZChkb21FbGVtZW50KTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZyb20oZG9tRWxlbWVudDogRWxlbWVudCwgc2NyZWVuOiBzdHJpbmcpIHtcclxuICAgIGlmICghZG9tRWxlbWVudCB8fCAhc2NyZWVuKSByZXR1cm47XHJcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuc2NyZWVucy5oYXMoc2NyZWVuKSA/IHRoaXMuc2NyZWVucy5nZXQoc2NyZWVuKSA6IG51bGw7XHJcbiAgICB0cnkgeyBpZiAoZWxlbWVudCkgZWxlbWVudC5yZW1vdmVDaGlsZChkb21FbGVtZW50KSB9IGNhdGNoIHsgfVxyXG4gIH1cclxuXHJcbiAgc2V0U2NyZWVuKHNjcmVlbjogRWxlbWVudCwgbmFtZTogc3RyaW5nID0gXCJkZWZhdWx0c2NyZWVuXCIpIHtcclxuICAgIHRoaXMuc2NyZWVucy5zZXQobmFtZSwgc2NyZWVuKTtcclxuICB9XHJcbn0iLCJmdW5jdGlvbiBjaGVja0lucHV0VmFsaWRhdGlvbihhOiBFdmVudCwgY2FsbG91dDogKGVycm9yczogc3RyaW5nW10sIHZhbGlkOiBib29sZWFuKSA9PiB2b2lkKSB7XHJcbiAgaWYgKChhLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWxpZGl0eSkge1xyXG4gICAgbGV0IGVsID0gKGEudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpO1xyXG5cclxuICAgIGlmIChlbC52YWxpZGl0eSkge1xyXG4gICAgICBsZXQgZXJyb3JzID0gW1xyXG4gICAgICAgIGVsLnZhbGlkaXR5LmJhZElucHV0ID8gXCJiYWQgaW5wdXRcIiA6IG51bGwsXHJcbiAgICAgICAgZWwudmFsaWRpdHkuY3VzdG9tRXJyb3IgPyBcImN1c3RvbSBlcnJvclwiIDogbnVsbCxcclxuICAgICAgICBlbC52YWxpZGl0eS5wYXR0ZXJuTWlzbWF0Y2ggPyBcInBhdHRlcm4gbWlzbWF0Y2hcIiA6IG51bGwsXHJcbiAgICAgICAgZWwudmFsaWRpdHkucmFuZ2VPdmVyZmxvdyA/IFwicmFuZ2Ugb3ZlcmZsb3dcIiA6IG51bGwsXHJcbiAgICAgICAgZWwudmFsaWRpdHkucmFuZ2VVbmRlcmZsb3cgPyBcInJhbmdlIHVuZGVyZmxvd1wiIDogbnVsbCxcclxuICAgICAgICBlbC52YWxpZGl0eS5zdGVwTWlzbWF0Y2ggPyBcInN0ZXAgbWlzbWF0Y2hcIiA6IG51bGwsXHJcbiAgICAgICAgZWwudmFsaWRpdHkudG9vTG9uZyA/IFwidG9vIGxvbmdcIiA6IG51bGwsXHJcbiAgICAgICAgZWwudmFsaWRpdHkudG9vU2hvcnQgPyBcInRvbyBzaG9ydFwiIDogbnVsbCxcclxuICAgICAgICBlbC52YWxpZGl0eS50eXBlTWlzbWF0Y2ggPyBcInR5cGUgbWlzbWF0Y2hcIiA6IG51bGwsXHJcbiAgICAgICAgZWwudmFsaWRpdHkudmFsdWVNaXNzaW5nID8gXCJ2YWx1ZSBtaXNzaW5nXCIgOiBudWxsXS5maWx0ZXIoaSA9PiAhIWkpXHJcblxyXG4gICAgICBjYWxsb3V0KGVycm9ycyBhcyBzdHJpbmdbXSwgZWwudmFsaWRpdHkudmFsaWQgIT0gdW5kZWZpbmVkID8gZWwudmFsaWRpdHkudmFsaWQgOiB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZSA9IHtcclxuICBpbnNlcnRlZDogKGVsOiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudCB8IEhUTUxTZWxlY3RFbGVtZW50LCBiaW5kOiB7XHJcbiAgICB2YWx1ZTogKGVycm9yczogc3RyaW5nW10sIHZhbGlkOiBib29sZWFuKSA9PiB2b2lkLFxyXG4gICAgYXJnOiBcImltbWVkaWF0ZVwiXHJcbiAgfSkgPT4ge1xyXG4gICAgaWYgKCFlbCB8fCAhZWwud2lsbFZhbGlkYXRlKSByZXR1cm47XHJcbiAgICBzd2l0Y2ggKGVsLm5vZGVOYW1lKSB7XHJcbiAgICAgIGNhc2UgXCJJTlBVVFwiOlxyXG4gICAgICBjYXNlIFwiVEVYVEFSRUFcIjogZWwub25ibHVyID0gKGFyZykgPT4gY2hlY2tJbnB1dFZhbGlkYXRpb24oYXJnLCBiaW5kLnZhbHVlKTsgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJTRUxFQ1RcIjogZWwub25jaGFuZ2UgPSAoYXJnKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbihhcmcsIGJpbmQudmFsdWUpOyBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBlbC5vbmludmFsaWQgPSAoYXJnKSA9PiBjaGVja0lucHV0VmFsaWRhdGlvbihhcmcsIGJpbmQudmFsdWUpO1xyXG4gICAgaWYgKGVsLmZvcm0pIGVsLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignaW52YWxpZCcsICgpID0+IGNoZWNrSW5wdXRWYWxpZGF0aW9uKHsgdGFyZ2V0OiBlbCB9IGFzIGFueSwgYmluZC52YWx1ZSkpXHJcblxyXG4gICAgaWYgKGJpbmQuYXJnID09IFwiaW1tZWRpYXRlXCIpIGVsLnJlcG9ydFZhbGlkaXR5KCk7XHJcbiAgICBlbHNlIGNoZWNrSW5wdXRWYWxpZGF0aW9uKHsgdGFyZ2V0OiBlbCB9IGFzIGFueSwgYmluZC52YWx1ZSlcclxuICB9LFxyXG4gIHVuYmluZDogKGVsOiBFbGVtZW50KSA9PiB7XHJcbiAgICBpZiAoIWVsKSByZXR1cm47XHJcblxyXG4gIH0sXHJcbn1cclxuIiwiaW1wb3J0IHsgTWVudUhlbHBlciwgbWVudVR5cGUsIE1lbnVOb3RpZmljYXRpb25zLCBJTWVudURlZmluaXRpb24gfSBmcm9tIFwiLi9oZWxwZXJzL01lbnVIZWxwZXJcIjtcclxuaW1wb3J0IHsgQ29tbW9uUmVnaXN0cnkgfSBmcm9tIFwiLi9oZWxwZXJzL0NvbW1vblJlZ2lzdHJ5XCI7XHJcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSBcIi4vaGVscGVycy9NZXNzYWdlU2VydmljZVwiO1xyXG5pbXBvcnQgeyBJUm91dGVDb25maWcgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL1JvdXRlckludGVyZmFjZXNcIjtcclxuaW1wb3J0IHsgSVN0b3JlIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9TdG9yZUludGVyZmFjZXNcIjtcclxuaW1wb3J0IEluamVjdCBmcm9tIFwiLi9jb21wb25lbnRzL2luamVjdC52dWVcIjtcclxuaW1wb3J0IFNjcmVlbiBmcm9tIFwiLi9jb21wb25lbnRzL3NjcmVlbi52dWVcIjtcclxuaW1wb3J0IHsgVnVlQ29uc3RydWN0b3IgfSBmcm9tIFwidnVlXCI7XHJcbmltcG9ydCB7IElQcm9qZWN0YWJsZU1vZGVsLCBQcm9qZWN0YWJsZSwgUHJvamVjdG9yIH0gZnJvbSBcIi4vaGVscGVycy9Qcm9qZWN0b3JcIjtcclxuaW1wb3J0IGRpcmVjdGl2ZXMsIHsgU2NyZWVuc01hbmFnZXIgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL3NjcmVlblwiO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZSBhcyBWYWxpZGF0ZURpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvdmFsaWRhdGVcIjtcclxuXHJcblxyXG5mdW5jdGlvbiBpbnN0YWxsKFZ1ZTogVnVlQ29uc3RydWN0b3IpIHtcclxuICBWdWUuY29tcG9uZW50KFwic2NyZWVuXCIsIFNjcmVlbik7XHJcbiAgVnVlLmNvbXBvbmVudChcImluamVjdFwiLCBJbmplY3QpO1xyXG4gIFZ1ZS5kaXJlY3RpdmUoXCJzY3JlZW5cIiwgZGlyZWN0aXZlcy5zY3JlZW5EaXJlY3RpdmUpO1xyXG4gIFZ1ZS5kaXJlY3RpdmUoXCJwcm9qZWN0VG9cIiwgZGlyZWN0aXZlcy5wcm9qZWN0VG9EaXJlY3RpdmUpO1xyXG4gIFZ1ZS5kaXJlY3RpdmUoXCJ2YWxpZGF0ZVwiLCBWYWxpZGF0ZURpcmVjdGl2ZSBhcyBhbnkpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTW9kdWxlSW5pdGlhbGl6ZXIge1xyXG4gIGluaXQodnVlbWY6IHR5cGVvZiBWdWVNZk1vZHVsZSwgbWVudTogTWVudUhlbHBlciwgc3RvcmU6IElTdG9yZSwgY29uZmlndXJhdGlvbjogYW55KTogUHJvbWlzZTx2b2lkPixcclxuXHJcbiAgY29uZmlnPyhtZW51OiBNZW51SGVscGVyLCBzdG9yZTogSVN0b3JlLCBjb25maWd1cmF0aW9uOiBhbnkpOiBQcm9taXNlPHZvaWQ+LFxyXG5cclxuICBydW4/KG1lbnU6IE1lbnVIZWxwZXIsIHN0b3JlOiBJU3RvcmUsIGNvbmZpZ3VyYXRpb246IGFueSk6IFByb21pc2U8dm9pZD4sXHJcblxyXG4gIHJvdXRlczogSVJvdXRlQ29uZmlnW11cclxufVxyXG5cclxuaW50ZXJmYWNlIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXIge1xyXG4gIGluaXQobWVudTogTWVudUhlbHBlcixcclxuICAgIHN0b3JlOiBJU3RvcmUsXHJcbiAgICBjb25maWd1cmF0aW9uOiBhbnlcclxuICAgICwgb3B0aW9uczoge1xyXG4gICAgICByZWdpc3RyeTogQ29tbW9uUmVnaXN0cnksXHJcbiAgICAgIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSxcclxuICAgICAgcHJvamVjdG9yOiBQcm9qZWN0b3IsXHJcbiAgICAgIHNjcmVlbnM6IFNjcmVlbnNNYW5hZ2VyXHJcbiAgICB9KTogUHJvbWlzZTx2b2lkPixcclxuICBjb25maWcobWVudTogTWVudUhlbHBlcixcclxuICAgIHN0b3JlOiBJU3RvcmUpOiBQcm9taXNlPHZvaWQ+LFxyXG4gIHJ1bihtZW51OiBNZW51SGVscGVyLFxyXG4gICAgc3RvcmU6IElTdG9yZSk6IFByb21pc2U8dm9pZD4sXHJcbiAgcm91dGVzOiBJUm91dGVDb25maWdbXVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTW9kdWxlSW5pdGlhbGl6ZXIob3B0czogSU1vZHVsZUluaXRpYWxpemVyKSB7XHJcbiAgbGV0IG1vZHVsZUNvbmZpZyA9IHt9O1xyXG4gIHJldHVybiB7XHJcbiAgICBpbml0KG1lbnU6IE1lbnVIZWxwZXIsIHN0b3JlOiBJU3RvcmUsIGNvbmZpZ3VyYXRpb246IGFueSxcclxuICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgIHJlZ2lzdHJ5OiBDb21tb25SZWdpc3RyeSxcclxuICAgICAgICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXHJcbiAgICAgICAgcHJvamVjdG9yOiBQcm9qZWN0b3IsXHJcbiAgICAgICAgc2NyZWVuczogU2NyZWVuc01hbmFnZXJcclxuICAgICAgfSkge1xyXG5cclxuICAgICAgaWYgKG9wdGlvbnMucmVnaXN0cnkpIENvbW1vblJlZ2lzdHJ5Lkluc3RhbmNlID0gb3B0aW9ucy5yZWdpc3RyeTtcclxuICAgICAgaWYgKG9wdGlvbnMubWVzc2FnZVNlcnZpY2UpIE1lc3NhZ2VTZXJ2aWNlLkluc3RhbmNlID0gb3B0aW9ucy5tZXNzYWdlU2VydmljZVxyXG4gICAgICBpZiAob3B0aW9ucy5wcm9qZWN0b3IpIFByb2plY3Rvci5JbnN0YW5jZSA9IG9wdGlvbnMucHJvamVjdG9yO1xyXG4gICAgICBpZiAob3B0aW9ucy5zY3JlZW5zKSBTY3JlZW5zTWFuYWdlci5JbnN0YW5jZSA9IG9wdGlvbnMuc2NyZWVucztcclxuICAgICAgbW9kdWxlQ29uZmlnID0gY29uZmlndXJhdGlvbjtcclxuICAgICAgcmV0dXJuIG9wdHMuaW5pdChWdWVNZk1vZHVsZSwgbWVudSwgc3RvcmUsIGNvbmZpZ3VyYXRpb24pO1xyXG4gICAgfSxcclxuICAgIGNvbmZpZyhtZW51OiBNZW51SGVscGVyLCBzdG9yZTogSVN0b3JlKSB7XHJcbiAgICAgIHJldHVybiBvcHRzLmNvbmZpZyA/IG9wdHMuY29uZmlnKG1lbnUsIHN0b3JlLCBtb2R1bGVDb25maWcpIDogbnVsbDtcclxuICAgIH0sXHJcbiAgICBydW4obWVudTogTWVudUhlbHBlciwgc3RvcmU6IElTdG9yZSkge1xyXG4gICAgICByZXR1cm4gb3B0cy5ydW4gPyBvcHRzLnJ1bihtZW51LCBzdG9yZSwgbW9kdWxlQ29uZmlnKSA6IG51bGw7XHJcbiAgICB9LFxyXG4gICAgcm91dGVzOiBvcHRzLnJvdXRlc1xyXG4gIH0gYXMgSU1vZHVsZUluaXRpYWxpemVyV3JhcHBlclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gSW5pdE1vZHVsZShtb2R1bGU6IGFueSwgc3RvcmU6IElTdG9yZSwgY29uZmlndXJhdGlvbjogYW55IHwgdW5kZWZpbmVkKTogUHJvbWlzZTxJTW9kdWxlSW5pdGlhbGl6ZXI+IHtcclxuICBjb25zdCBpbml0b2JqID0gKG1vZHVsZS5kZWZhdWx0LmRlZmF1bHQgfHwgbW9kdWxlLmRlZmF1bHQpIGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXI7XHJcbiAgcmV0dXJuIGluaXRvYmouaW5pdChNZW51SGVscGVyLkluc3RhbmNlLCBzdG9yZSwgY29uZmlndXJhdGlvbiB8fCB7fSxcclxuICAgIHtcclxuICAgICAgcmVnaXN0cnk6IENvbW1vblJlZ2lzdHJ5Lkluc3RhbmNlLFxyXG4gICAgICBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UuSW5zdGFuY2UsXHJcbiAgICAgIHByb2plY3RvcjogUHJvamVjdG9yLkluc3RhbmNlLFxyXG4gICAgICBzY3JlZW5zOiBTY3JlZW5zTWFuYWdlci5JbnN0YW5jZVxyXG4gICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgIHJldHVybiBpbml0b2JqIGFzIHVua25vd24gYXMgSU1vZHVsZUluaXRpYWxpemVyO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBDb25maWdNb2R1bGUobW9kdWxlOiBhbnksIHN0b3JlOiBJU3RvcmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICBjb25zdCBpbml0b2JqID0gKG1vZHVsZS5kZWZhdWx0LmRlZmF1bHQgfHwgbW9kdWxlLmRlZmF1bHQpIGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXI7XHJcbiAgcmV0dXJuIGluaXRvYmouY29uZmlnKE1lbnVIZWxwZXIuSW5zdGFuY2UsIHN0b3JlKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSdW5Nb2R1bGUobW9kdWxlOiBhbnksIHN0b3JlOiBJU3RvcmUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICBjb25zdCBpbml0b2JqID0gKG1vZHVsZS5kZWZhdWx0LmRlZmF1bHQgfHwgbW9kdWxlLmRlZmF1bHQpIGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXI7XHJcbiAgcmV0dXJuIGluaXRvYmoucnVuKE1lbnVIZWxwZXIuSW5zdGFuY2UsIHN0b3JlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1vZHVsZVJvdXRlcyhtb2R1bGU6IGFueSk6IElSb3V0ZUNvbmZpZ1tdIHtcclxuICBjb25zdCBpbml0b2JqID0gKG1vZHVsZS5kZWZhdWx0LmRlZmF1bHQgfHwgbW9kdWxlLmRlZmF1bHQpIGFzIElNb2R1bGVJbml0aWFsaXplcldyYXBwZXI7XHJcbiAgcmV0dXJuIGluaXRvYmoucm91dGVzO1xyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIE1lbnVIZWxwZXIsXHJcbiAgdHlwZSBJTWVudURlZmluaXRpb24sXHJcbiAgbWVudVR5cGUsXHJcbiAgQ29tbW9uUmVnaXN0cnksXHJcbiAgTWVzc2FnZVNlcnZpY2UsXHJcbiAgSW5qZWN0LFxyXG4gIFNjcmVlbixcclxuICBWYWxpZGF0ZURpcmVjdGl2ZSxcclxuICB0eXBlIFByb2plY3RhYmxlLFxyXG4gIHR5cGUgSVByb2plY3RhYmxlTW9kZWwsXHJcbiAgTWVudU5vdGlmaWNhdGlvbnMsXHJcbiAgUHJvamVjdG9yLFxyXG59XHJcblxyXG5jb25zdCBWdWVNZk1vZHVsZSA9IHtcclxuICBpbnN0YWxsLFxyXG4gIE1lbnVIZWxwZXI6IG5ldyBNZW51SGVscGVyKCksXHJcbiAgbWVudVR5cGUsXHJcbiAgQ29tbW9uUmVnaXN0cnk6IG5ldyBDb21tb25SZWdpc3RyeSgpLFxyXG4gIE1lc3NhZ2VTZXJ2aWNlOiBuZXcgTWVzc2FnZVNlcnZpY2UoKSxcclxuICBJbmplY3QsXHJcbiAgU2NyZWVuLFxyXG4gIFZhbGlkYXRlRGlyZWN0aXZlLFxyXG4gIE1lbnVOb3RpZmljYXRpb25zLFxyXG4gIFByb2plY3RvclxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWdWVNZk1vZHVsZTtcclxuIl0sIm5hbWVzIjpbIkUiLCJuYW1lIiwiY2FsbGJhY2siLCJjdHgiLCJlIiwic2VsZiIsImxpc3RlbmVyIiwiZGF0YSIsImV2dEFyciIsImkiLCJsZW4iLCJldnRzIiwibGl2ZUV2ZW50cyIsInRpbnlFbWl0dGVyTW9kdWxlIiwiVGlueUVtaXR0ZXIiLCJ0aW55RW1pdHRlciIsIm1lbnVUeXBlIiwibWVudVR5cGUyIiwiTWVudU5vdGlmaWNhdGlvbnMiLCJfTWVudUhlbHBlciIsIl9fcHVibGljRmllbGQiLCJtZW51RGVmaW5pdGlvbiIsInBvc2l0aW9ucyIsImZvdW5kIiwibSIsImVsZW1lbnQiLCJtZW51IiwicmVzdWx0IiwidXNlZCIsImtleSIsInJyIiwiYSIsImIiLCJNZW51SGVscGVyIiwiX0NvbW1vblJlZ2lzdHJ5IiwidiIsImNvbXBvbmVudCIsImdyb3VwIiwiZ2ciLCJnIiwic2VydmljZSIsIkNvbW1vblJlZ2lzdHJ5IiwiX01lc3NhZ2VTZXJ2aWNlIiwibWVzc2FnZSIsImFyZ3MiLCJyZXNvbHZlIiwicmVqZWN0IiwiTWVzc2FnZVNlcnZpY2UiLCJfc2ZjX21haW4kMSIsImRlZmluZUNvbXBvbmVudCIsInByb3BzIiwiZW1pdCIsIlZhbHVlIiwiY29tcHV0ZWQiLCJDb21wb25lbnRzIiwiY2xpY2siLCJzYXZlIiwiX1Byb2plY3RvciIsInNjcmVlbiIsInF1ZXVlIiwiYXN5bmMiLCJtb2RlbCIsInByb21pc2UiLCJzcyIsIl9zY3JlZW4iLCJzIiwiUHJvamVjdG9yIiwiX3NmY19tYWluIiwiZXhwb3NlIiwibWUiLCJnZXRDdXJyZW50SW5zdGFuY2UiLCJjdXJyZW50VmlldyIsInJlZiIsImlzVmlzaWJsZSIsImN1cnJlbnRWaWV3VUlEIiwiX2EiLCJvbk1vdW50ZWQiLCJwcm9qZWN0VG9EaXJlY3RpdmUiLCJlbCIsImJpbmQiLCJTY3JlZW5zTWFuYWdlciIsInNjcmVlbkRpcmVjdGl2ZSIsImJpbmRpbmciLCJkaXJlY3RpdmVzIiwiX1NjcmVlbnNNYW5hZ2VyIiwiZG9tRWxlbWVudCIsImNoZWNrSW5wdXRWYWxpZGF0aW9uIiwiY2FsbG91dCIsImVycm9ycyIsInZhbGlkYXRlIiwiYXJnIiwiaW5zdGFsbCIsIlZ1ZSIsIlNjcmVlbiIsIkluamVjdCIsIlZhbGlkYXRlRGlyZWN0aXZlIiwiTW9kdWxlSW5pdGlhbGl6ZXIiLCJvcHRzIiwibW9kdWxlQ29uZmlnIiwic3RvcmUiLCJjb25maWd1cmF0aW9uIiwib3B0aW9ucyIsIlZ1ZU1mTW9kdWxlIiwiSW5pdE1vZHVsZSIsIm1vZHVsZSIsImluaXRvYmoiLCJDb25maWdNb2R1bGUiLCJSdW5Nb2R1bGUiLCJNb2R1bGVSb3V0ZXMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsU0FBU0EsSUFBSztBQUdkO0FBRUFBLEVBQUUsWUFBWTtBQUFBLEVBQ1osSUFBSSxTQUFVQyxHQUFNQyxHQUFVQyxHQUFLO0FBQ2pDLFFBQUlDLElBQUksS0FBSyxNQUFNLEtBQUssSUFBSSxDQUFBO0FBRTVCLFlBQUNBLEVBQUVILE9BQVVHLEVBQUVILEtBQVEsQ0FBQSxJQUFLLEtBQUs7QUFBQSxNQUMvQixJQUFJQztBQUFBLE1BQ0osS0FBS0M7QUFBQSxJQUNYLENBQUssR0FFTTtBQUFBLEVBQ1I7QUFBQSxFQUVELE1BQU0sU0FBVUYsR0FBTUMsR0FBVUMsR0FBSztBQUNuQyxRQUFJRSxJQUFPO0FBQ1gsYUFBU0MsSUFBWTtBQUNuQixNQUFBRCxFQUFLLElBQUlKLEdBQU1LLENBQVEsR0FDdkJKLEVBQVMsTUFBTUMsR0FBSyxTQUFTO0FBQUEsSUFFbkM7QUFDSSxXQUFBRyxFQUFTLElBQUlKLEdBQ04sS0FBSyxHQUFHRCxHQUFNSyxHQUFVSCxDQUFHO0FBQUEsRUFDbkM7QUFBQSxFQUVELE1BQU0sU0FBVUYsR0FBTTtBQUNwQixRQUFJTSxJQUFPLENBQUEsRUFBRyxNQUFNLEtBQUssV0FBVyxDQUFDLEdBQ2pDQyxNQUFXLEtBQUssTUFBTSxLQUFLLElBQUksQ0FBQSxJQUFLUCxNQUFTLENBQUUsR0FBRSxNQUFLLEdBQ3REUSxJQUFJLEdBQ0pDLElBQU1GLEVBQU87QUFFakIsU0FBS0MsR0FBR0EsSUFBSUMsR0FBS0Q7QUFDZixNQUFBRCxFQUFPQyxHQUFHLEdBQUcsTUFBTUQsRUFBT0MsR0FBRyxLQUFLRixDQUFJO0FBR3hDLFdBQU87QUFBQSxFQUNSO0FBQUEsRUFFRCxLQUFLLFNBQVVOLEdBQU1DLEdBQVU7QUFDN0IsUUFBSUUsSUFBSSxLQUFLLE1BQU0sS0FBSyxJQUFJLENBQUEsSUFDeEJPLElBQU9QLEVBQUVILElB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

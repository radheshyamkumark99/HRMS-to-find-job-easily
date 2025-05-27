import { setLogLevel as Vn, LogLevel as St, setLogExtension as Hn, RoomEvent as y, ParticipantEvent as w, Room as Et, Track as R, TrackEvent as Yt, compareVersions as zn } from "livekit-client";
import * as M from "react";
const De = Math.min, se = Math.max, $e = Math.round, Le = Math.floor, G = (e) => ({
  x: e,
  y: e
}), Yn = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, qn = {
  start: "end",
  end: "start"
};
function Tt(e, t, n) {
  return se(e, De(t, n));
}
function He(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ae(e) {
  return e.split("-")[0];
}
function ze(e) {
  return e.split("-")[1];
}
function qt(e) {
  return e === "x" ? "y" : "x";
}
function Kt(e) {
  return e === "y" ? "height" : "width";
}
function he(e) {
  return ["top", "bottom"].includes(ae(e)) ? "y" : "x";
}
function Gt(e) {
  return qt(he(e));
}
function Kn(e, t, n) {
  n === void 0 && (n = !1);
  const r = ze(e), i = Gt(e), o = Kt(i);
  let s = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[o] > t.floating[o] && (s = Ne(s)), [s, Ne(s)];
}
function Gn(e) {
  const t = Ne(e);
  return [it(e), t, it(t)];
}
function it(e) {
  return e.replace(/start|end/g, (t) => qn[t]);
}
function Qn(e, t, n) {
  const r = ["left", "right"], i = ["right", "left"], o = ["top", "bottom"], s = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? i : r : t ? r : i;
    case "left":
    case "right":
      return t ? o : s;
    default:
      return [];
  }
}
function Jn(e, t, n, r) {
  const i = ze(e);
  let o = Qn(ae(e), n === "start", r);
  return i && (o = o.map((s) => s + "-" + i), t && (o = o.concat(o.map(it)))), o;
}
function Ne(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Yn[t]);
}
function Xn(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Zn(e) {
  return typeof e != "number" ? Xn(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Fe(e) {
  const {
    x: t,
    y: n,
    width: r,
    height: i
  } = e;
  return {
    width: r,
    height: i,
    top: n,
    left: t,
    right: t + r,
    bottom: n + i,
    x: t,
    y: n
  };
}
function Ct(e, t, n) {
  let {
    reference: r,
    floating: i
  } = e;
  const o = he(t), s = Gt(t), a = Kt(s), c = ae(t), u = o === "y", l = r.x + r.width / 2 - i.width / 2, f = r.y + r.height / 2 - i.height / 2, h = r[a] / 2 - i[a] / 2;
  let d;
  switch (c) {
    case "top":
      d = {
        x: l,
        y: r.y - i.height
      };
      break;
    case "bottom":
      d = {
        x: l,
        y: r.y + r.height
      };
      break;
    case "right":
      d = {
        x: r.x + r.width,
        y: f
      };
      break;
    case "left":
      d = {
        x: r.x - i.width,
        y: f
      };
      break;
    default:
      d = {
        x: r.x,
        y: r.y
      };
  }
  switch (ze(t)) {
    case "start":
      d[s] -= h * (n && u ? -1 : 1);
      break;
    case "end":
      d[s] += h * (n && u ? -1 : 1);
      break;
  }
  return d;
}
const er = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: i = "absolute",
    middleware: o = [],
    platform: s
  } = n, a = o.filter(Boolean), c = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let u = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: i
  }), {
    x: l,
    y: f
  } = Ct(u, r, c), h = r, d = {}, m = 0;
  for (let p = 0; p < a.length; p++) {
    const {
      name: b,
      fn: v
    } = a[p], {
      x,
      y: E,
      data: P,
      reset: g
    } = await v({
      x: l,
      y: f,
      initialPlacement: r,
      placement: h,
      strategy: i,
      middlewareData: d,
      rects: u,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    l = x ?? l, f = E ?? f, d = {
      ...d,
      [b]: {
        ...d[b],
        ...P
      }
    }, g && m <= 50 && (m++, typeof g == "object" && (g.placement && (h = g.placement), g.rects && (u = g.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: i
    }) : g.rects), {
      x: l,
      y: f
    } = Ct(u, h, c)), p = -1);
  }
  return {
    x: l,
    y: f,
    placement: h,
    strategy: i,
    middlewareData: d
  };
};
async function Qt(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: i,
    platform: o,
    rects: s,
    elements: a,
    strategy: c
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: l = "viewport",
    elementContext: f = "floating",
    altBoundary: h = !1,
    padding: d = 0
  } = He(t, e), m = Zn(d), b = a[h ? f === "floating" ? "reference" : "floating" : f], v = Fe(await o.getClippingRect({
    element: (n = await (o.isElement == null ? void 0 : o.isElement(b))) == null || n ? b : b.contextElement || await (o.getDocumentElement == null ? void 0 : o.getDocumentElement(a.floating)),
    boundary: u,
    rootBoundary: l,
    strategy: c
  })), x = f === "floating" ? {
    x: r,
    y: i,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, E = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(a.floating)), P = await (o.isElement == null ? void 0 : o.isElement(E)) ? await (o.getScale == null ? void 0 : o.getScale(E)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, g = Fe(o.convertOffsetParentRelativeRectToViewportRelativeRect ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: x,
    offsetParent: E,
    strategy: c
  }) : x);
  return {
    top: (v.top - g.top + m.top) / P.y,
    bottom: (g.bottom - v.bottom + m.bottom) / P.y,
    left: (v.left - g.left + m.left) / P.x,
    right: (g.right - v.right + m.right) / P.x
  };
}
const tr = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: i,
        middlewareData: o,
        rects: s,
        initialPlacement: a,
        platform: c,
        elements: u
      } = t, {
        mainAxis: l = !0,
        crossAxis: f = !0,
        fallbackPlacements: h,
        fallbackStrategy: d = "bestFit",
        fallbackAxisSideDirection: m = "none",
        flipAlignment: p = !0,
        ...b
      } = He(e, t);
      if ((n = o.arrow) != null && n.alignmentOffset)
        return {};
      const v = ae(i), x = he(a), E = ae(a) === a, P = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), g = h || (E || !p ? [Ne(a)] : Gn(a)), S = m !== "none";
      !h && S && g.push(...Jn(a, p, m, P));
      const C = [a, ...g], $ = await Qt(t, b), I = [];
      let z = ((r = o.flip) == null ? void 0 : r.overflows) || [];
      if (l && I.push($[v]), f) {
        const K = Kn(i, s, P);
        I.push($[K[0]], $[K[1]]);
      }
      if (z = [...z, {
        placement: i,
        overflows: I
      }], !I.every((K) => K <= 0)) {
        var T, L;
        const K = (((T = o.flip) == null ? void 0 : T.index) || 0) + 1, ke = C[K];
        if (ke)
          return {
            data: {
              index: K,
              overflows: z
            },
            reset: {
              placement: ke
            }
          };
        let xe = (L = z.filter((fe) => fe.overflows[0] <= 0).sort((fe, te) => fe.overflows[1] - te.overflows[1])[0]) == null ? void 0 : L.placement;
        if (!xe)
          switch (d) {
            case "bestFit": {
              var oe;
              const fe = (oe = z.filter((te) => {
                if (S) {
                  const ne = he(te.placement);
                  return ne === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  ne === "y";
                }
                return !0;
              }).map((te) => [te.placement, te.overflows.filter((ne) => ne > 0).reduce((ne, Bn) => ne + Bn, 0)]).sort((te, ne) => te[1] - ne[1])[0]) == null ? void 0 : oe[0];
              fe && (xe = fe);
              break;
            }
            case "initialPlacement":
              xe = a;
              break;
          }
        if (i !== xe)
          return {
            reset: {
              placement: xe
            }
          };
      }
      return {};
    }
  };
};
async function nr(e, t) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = e, o = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), s = ae(n), a = ze(n), c = he(n) === "y", u = ["left", "top"].includes(s) ? -1 : 1, l = o && c ? -1 : 1, f = He(t, e);
  let {
    mainAxis: h,
    crossAxis: d,
    alignmentAxis: m
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return a && typeof m == "number" && (d = a === "end" ? m * -1 : m), c ? {
    x: d * l,
    y: h * u
  } : {
    x: h * u,
    y: d * l
  };
}
const rr = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: i,
        y: o,
        placement: s,
        middlewareData: a
      } = t, c = await nr(t, e);
      return s === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset ? {} : {
        x: i + c.x,
        y: o + c.y,
        data: {
          ...c,
          placement: s
        }
      };
    }
  };
}, ir = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: i
      } = t, {
        mainAxis: o = !0,
        crossAxis: s = !1,
        limiter: a = {
          fn: (b) => {
            let {
              x: v,
              y: x
            } = b;
            return {
              x: v,
              y: x
            };
          }
        },
        ...c
      } = He(e, t), u = {
        x: n,
        y: r
      }, l = await Qt(t, c), f = he(ae(i)), h = qt(f);
      let d = u[h], m = u[f];
      if (o) {
        const b = h === "y" ? "top" : "left", v = h === "y" ? "bottom" : "right", x = d + l[b], E = d - l[v];
        d = Tt(x, d, E);
      }
      if (s) {
        const b = f === "y" ? "top" : "left", v = f === "y" ? "bottom" : "right", x = m + l[b], E = m - l[v];
        m = Tt(x, m, E);
      }
      const p = a.fn({
        ...t,
        [h]: d,
        [f]: m
      });
      return {
        ...p,
        data: {
          x: p.x - n,
          y: p.y - r,
          enabled: {
            [h]: o,
            [f]: s
          }
        }
      };
    }
  };
};
function Ye() {
  return typeof window < "u";
}
function ge(e) {
  return Jt(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function j(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function X(e) {
  var t;
  return (t = (Jt(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Jt(e) {
  return Ye() ? e instanceof Node || e instanceof j(e).Node : !1;
}
function Y(e) {
  return Ye() ? e instanceof Element || e instanceof j(e).Element : !1;
}
function Q(e) {
  return Ye() ? e instanceof HTMLElement || e instanceof j(e).HTMLElement : !1;
}
function Pt(e) {
  return !Ye() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof j(e).ShadowRoot;
}
function Oe(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: i
  } = q(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(i);
}
function or(e) {
  return ["table", "td", "th"].includes(ge(e));
}
function qe(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function ft(e) {
  const t = dt(), n = Y(e) ? q(e) : e;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function sr(e) {
  let t = ie(e);
  for (; Q(t) && !ve(t); ) {
    if (ft(t))
      return t;
    if (qe(t))
      return null;
    t = ie(t);
  }
  return null;
}
function dt() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function ve(e) {
  return ["html", "body", "#document"].includes(ge(e));
}
function q(e) {
  return j(e).getComputedStyle(e);
}
function Ke(e) {
  return Y(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function ie(e) {
  if (ge(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Pt(e) && e.host || // Fallback.
    X(e)
  );
  return Pt(t) ? t.host : t;
}
function Xt(e) {
  const t = ie(e);
  return ve(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Q(t) && Oe(t) ? t : Xt(t);
}
function Te(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const i = Xt(e), o = i === ((r = e.ownerDocument) == null ? void 0 : r.body), s = j(i);
  if (o) {
    const a = ot(s);
    return t.concat(s, s.visualViewport || [], Oe(i) ? i : [], a && n ? Te(a) : []);
  }
  return t.concat(i, Te(i, [], n));
}
function ot(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Zt(e) {
  const t = q(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const i = Q(e), o = i ? e.offsetWidth : n, s = i ? e.offsetHeight : r, a = $e(n) !== o || $e(r) !== s;
  return a && (n = o, r = s), {
    width: n,
    height: r,
    $: a
  };
}
function pt(e) {
  return Y(e) ? e : e.contextElement;
}
function de(e) {
  const t = pt(e);
  if (!Q(t))
    return G(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: i,
    $: o
  } = Zt(t);
  let s = (o ? $e(n.width) : n.width) / r, a = (o ? $e(n.height) : n.height) / i;
  return (!s || !Number.isFinite(s)) && (s = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: s,
    y: a
  };
}
const ar = /* @__PURE__ */ G(0);
function en(e) {
  const t = j(e);
  return !dt() || !t.visualViewport ? ar : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function cr(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== j(e) ? !1 : t;
}
function ce(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const i = e.getBoundingClientRect(), o = pt(e);
  let s = G(1);
  t && (r ? Y(r) && (s = de(r)) : s = de(e));
  const a = cr(o, n, r) ? en(o) : G(0);
  let c = (i.left + a.x) / s.x, u = (i.top + a.y) / s.y, l = i.width / s.x, f = i.height / s.y;
  if (o) {
    const h = j(o), d = r && Y(r) ? j(r) : r;
    let m = h, p = ot(m);
    for (; p && r && d !== m; ) {
      const b = de(p), v = p.getBoundingClientRect(), x = q(p), E = v.left + (p.clientLeft + parseFloat(x.paddingLeft)) * b.x, P = v.top + (p.clientTop + parseFloat(x.paddingTop)) * b.y;
      c *= b.x, u *= b.y, l *= b.x, f *= b.y, c += E, u += P, m = j(p), p = ot(m);
    }
  }
  return Fe({
    width: l,
    height: f,
    x: c,
    y: u
  });
}
function ht(e, t) {
  const n = Ke(e).scrollLeft;
  return t ? t.left + n : ce(X(e)).left + n;
}
function tn(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), i = r.left + t.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    ht(e, r)
  )), o = r.top + t.scrollTop;
  return {
    x: i,
    y: o
  };
}
function ur(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: i
  } = e;
  const o = i === "fixed", s = X(r), a = t ? qe(t.floating) : !1;
  if (r === s || a && o)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = G(1);
  const l = G(0), f = Q(r);
  if ((f || !f && !o) && ((ge(r) !== "body" || Oe(s)) && (c = Ke(r)), Q(r))) {
    const d = ce(r);
    u = de(r), l.x = d.x + r.clientLeft, l.y = d.y + r.clientTop;
  }
  const h = s && !f && !o ? tn(s, c, !0) : G(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - c.scrollLeft * u.x + l.x + h.x,
    y: n.y * u.y - c.scrollTop * u.y + l.y + h.y
  };
}
function lr(e) {
  return Array.from(e.getClientRects());
}
function fr(e) {
  const t = X(e), n = Ke(e), r = e.ownerDocument.body, i = se(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), o = se(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + ht(e);
  const a = -n.scrollTop;
  return q(r).direction === "rtl" && (s += se(t.clientWidth, r.clientWidth) - i), {
    width: i,
    height: o,
    x: s,
    y: a
  };
}
function dr(e, t) {
  const n = j(e), r = X(e), i = n.visualViewport;
  let o = r.clientWidth, s = r.clientHeight, a = 0, c = 0;
  if (i) {
    o = i.width, s = i.height;
    const u = dt();
    (!u || u && t === "fixed") && (a = i.offsetLeft, c = i.offsetTop);
  }
  return {
    width: o,
    height: s,
    x: a,
    y: c
  };
}
function pr(e, t) {
  const n = ce(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, o = Q(e) ? de(e) : G(1), s = e.clientWidth * o.x, a = e.clientHeight * o.y, c = i * o.x, u = r * o.y;
  return {
    width: s,
    height: a,
    x: c,
    y: u
  };
}
function Ot(e, t, n) {
  let r;
  if (t === "viewport")
    r = dr(e, n);
  else if (t === "document")
    r = fr(X(e));
  else if (Y(t))
    r = pr(t, n);
  else {
    const i = en(e);
    r = {
      x: t.x - i.x,
      y: t.y - i.y,
      width: t.width,
      height: t.height
    };
  }
  return Fe(r);
}
function nn(e, t) {
  const n = ie(e);
  return n === t || !Y(n) || ve(n) ? !1 : q(n).position === "fixed" || nn(n, t);
}
function hr(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Te(e, [], !1).filter((a) => Y(a) && ge(a) !== "body"), i = null;
  const o = q(e).position === "fixed";
  let s = o ? ie(e) : e;
  for (; Y(s) && !ve(s); ) {
    const a = q(s), c = ft(s);
    !c && a.position === "fixed" && (i = null), (o ? !c && !i : !c && a.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || Oe(s) && !c && nn(e, s)) ? r = r.filter((l) => l !== s) : i = a, s = ie(s);
  }
  return t.set(e, r), r;
}
function vr(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = e;
  const s = [...n === "clippingAncestors" ? qe(t) ? [] : hr(t, this._c) : [].concat(n), r], a = s[0], c = s.reduce((u, l) => {
    const f = Ot(t, l, i);
    return u.top = se(f.top, u.top), u.right = De(f.right, u.right), u.bottom = De(f.bottom, u.bottom), u.left = se(f.left, u.left), u;
  }, Ot(t, a, i));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function mr(e) {
  const {
    width: t,
    height: n
  } = Zt(e);
  return {
    width: t,
    height: n
  };
}
function br(e, t, n) {
  const r = Q(t), i = X(t), o = n === "fixed", s = ce(e, !0, o, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = G(0);
  if (r || !r && !o)
    if ((ge(t) !== "body" || Oe(i)) && (a = Ke(t)), r) {
      const h = ce(t, !0, o, t);
      c.x = h.x + t.clientLeft, c.y = h.y + t.clientTop;
    } else i && (c.x = ht(i));
  const u = i && !r && !o ? tn(i, a) : G(0), l = s.left + a.scrollLeft - c.x - u.x, f = s.top + a.scrollTop - c.y - u.y;
  return {
    x: l,
    y: f,
    width: s.width,
    height: s.height
  };
}
function Xe(e) {
  return q(e).position === "static";
}
function At(e, t) {
  if (!Q(e) || q(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return X(e) === n && (n = n.ownerDocument.body), n;
}
function rn(e, t) {
  const n = j(e);
  if (qe(e))
    return n;
  if (!Q(e)) {
    let i = ie(e);
    for (; i && !ve(i); ) {
      if (Y(i) && !Xe(i))
        return i;
      i = ie(i);
    }
    return n;
  }
  let r = At(e, t);
  for (; r && or(r) && Xe(r); )
    r = At(r, t);
  return r && ve(r) && Xe(r) && !ft(r) ? n : r || sr(e) || n;
}
const gr = async function(e) {
  const t = this.getOffsetParent || rn, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: br(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function yr(e) {
  return q(e).direction === "rtl";
}
const wr = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ur,
  getDocumentElement: X,
  getClippingRect: vr,
  getOffsetParent: rn,
  getElementRects: gr,
  getClientRects: lr,
  getDimensions: mr,
  getScale: de,
  isElement: Y,
  isRTL: yr
};
function on(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function xr(e, t) {
  let n = null, r;
  const i = X(e);
  function o() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), n = null;
  }
  function s(a, c) {
    a === void 0 && (a = !1), c === void 0 && (c = 1), o();
    const u = e.getBoundingClientRect(), {
      left: l,
      top: f,
      width: h,
      height: d
    } = u;
    if (a || t(), !h || !d)
      return;
    const m = Le(f), p = Le(i.clientWidth - (l + h)), b = Le(i.clientHeight - (f + d)), v = Le(l), E = {
      rootMargin: -m + "px " + -p + "px " + -b + "px " + -v + "px",
      threshold: se(0, De(1, c)) || 1
    };
    let P = !0;
    function g(S) {
      const C = S[0].intersectionRatio;
      if (C !== c) {
        if (!P)
          return s();
        C ? s(!1, C) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      C === 1 && !on(u, e.getBoundingClientRect()) && s(), P = !1;
    }
    try {
      n = new IntersectionObserver(g, {
        ...E,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(g, E);
    }
    n.observe(e);
  }
  return s(!0), o;
}
function Sr(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: o = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, u = pt(e), l = i || o ? [...u ? Te(u) : [], ...Te(t)] : [];
  l.forEach((v) => {
    i && v.addEventListener("scroll", n, {
      passive: !0
    }), o && v.addEventListener("resize", n);
  });
  const f = u && a ? xr(u, n) : null;
  let h = -1, d = null;
  s && (d = new ResizeObserver((v) => {
    let [x] = v;
    x && x.target === u && d && (d.unobserve(t), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var E;
      (E = d) == null || E.observe(t);
    })), n();
  }), u && !c && d.observe(u), d.observe(t));
  let m, p = c ? ce(e) : null;
  c && b();
  function b() {
    const v = ce(e);
    p && !on(p, v) && n(), p = v, m = requestAnimationFrame(b);
  }
  return n(), () => {
    var v;
    l.forEach((x) => {
      i && x.removeEventListener("scroll", n), o && x.removeEventListener("resize", n);
    }), f == null || f(), (v = d) == null || v.disconnect(), d = null, c && cancelAnimationFrame(m);
  };
}
const Er = rr, Tr = ir, Cr = tr, Pr = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: wr,
    ...n
  }, o = {
    ...i.platform,
    _c: r
  };
  return er(e, t, {
    ...i,
    platform: o
  });
};
var Do = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Or(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Me = { exports: {} }, Ar = Me.exports, kt;
function kr() {
  return kt || (kt = 1, function(e) {
    (function(t, n) {
      e.exports ? e.exports = n() : t.log = n();
    })(Ar, function() {
      var t = function() {
      }, n = "undefined", r = typeof window !== n && typeof window.navigator !== n && /Trident\/|MSIE /.test(window.navigator.userAgent), i = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
      ], o = {}, s = null;
      function a(p, b) {
        var v = p[b];
        if (typeof v.bind == "function")
          return v.bind(p);
        try {
          return Function.prototype.bind.call(v, p);
        } catch {
          return function() {
            return Function.prototype.apply.apply(v, [p, arguments]);
          };
        }
      }
      function c() {
        console.log && (console.log.apply ? console.log.apply(console, arguments) : Function.prototype.apply.apply(console.log, [console, arguments])), console.trace && console.trace();
      }
      function u(p) {
        return p === "debug" && (p = "log"), typeof console === n ? !1 : p === "trace" && r ? c : console[p] !== void 0 ? a(console, p) : console.log !== void 0 ? a(console, "log") : t;
      }
      function l() {
        for (var p = this.getLevel(), b = 0; b < i.length; b++) {
          var v = i[b];
          this[v] = b < p ? t : this.methodFactory(v, p, this.name);
        }
        if (this.log = this.debug, typeof console === n && p < this.levels.SILENT)
          return "No console available for logging";
      }
      function f(p) {
        return function() {
          typeof console !== n && (l.call(this), this[p].apply(this, arguments));
        };
      }
      function h(p, b, v) {
        return u(p) || f.apply(this, arguments);
      }
      function d(p, b) {
        var v = this, x, E, P, g = "loglevel";
        typeof p == "string" ? g += ":" + p : typeof p == "symbol" && (g = void 0);
        function S(T) {
          var L = (i[T] || "silent").toUpperCase();
          if (!(typeof window === n || !g)) {
            try {
              window.localStorage[g] = L;
              return;
            } catch {
            }
            try {
              window.document.cookie = encodeURIComponent(g) + "=" + L + ";";
            } catch {
            }
          }
        }
        function C() {
          var T;
          if (!(typeof window === n || !g)) {
            try {
              T = window.localStorage[g];
            } catch {
            }
            if (typeof T === n)
              try {
                var L = window.document.cookie, oe = encodeURIComponent(g), K = L.indexOf(oe + "=");
                K !== -1 && (T = /^([^;]+)/.exec(
                  L.slice(K + oe.length + 1)
                )[1]);
              } catch {
              }
            return v.levels[T] === void 0 && (T = void 0), T;
          }
        }
        function $() {
          if (!(typeof window === n || !g)) {
            try {
              window.localStorage.removeItem(g);
            } catch {
            }
            try {
              window.document.cookie = encodeURIComponent(g) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            } catch {
            }
          }
        }
        function I(T) {
          var L = T;
          if (typeof L == "string" && v.levels[L.toUpperCase()] !== void 0 && (L = v.levels[L.toUpperCase()]), typeof L == "number" && L >= 0 && L <= v.levels.SILENT)
            return L;
          throw new TypeError("log.setLevel() called with invalid level: " + T);
        }
        v.name = p, v.levels = {
          TRACE: 0,
          DEBUG: 1,
          INFO: 2,
          WARN: 3,
          ERROR: 4,
          SILENT: 5
        }, v.methodFactory = b || h, v.getLevel = function() {
          return P ?? E ?? x;
        }, v.setLevel = function(T, L) {
          return P = I(T), L !== !1 && S(P), l.call(v);
        }, v.setDefaultLevel = function(T) {
          E = I(T), C() || v.setLevel(T, !1);
        }, v.resetLevel = function() {
          P = null, $(), l.call(v);
        }, v.enableAll = function(T) {
          v.setLevel(v.levels.TRACE, T);
        }, v.disableAll = function(T) {
          v.setLevel(v.levels.SILENT, T);
        }, v.rebuild = function() {
          if (s !== v && (x = I(s.getLevel())), l.call(v), s === v)
            for (var T in o)
              o[T].rebuild();
        }, x = I(
          s ? s.getLevel() : "WARN"
        );
        var z = C();
        z != null && (P = I(z)), l.call(v);
      }
      s = new d(), s.getLogger = function(b) {
        if (typeof b != "symbol" && typeof b != "string" || b === "")
          throw new TypeError("You must supply a name when creating a logger.");
        var v = o[b];
        return v || (v = o[b] = new d(
          b,
          s.methodFactory
        )), v;
      };
      var m = typeof window !== n ? window.log : void 0;
      return s.noConflict = function() {
        return typeof window !== n && window.log === s && (window.log = m), s;
      }, s.getLoggers = function() {
        return o;
      }, s.default = s, s;
    });
  }(Me)), Me.exports;
}
var Lr = kr();
const _r = /* @__PURE__ */ Or(Lr);
var st = function(e, t) {
  return st = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, r) {
    n.__proto__ = r;
  } || function(n, r) {
    for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (n[i] = r[i]);
  }, st(e, t);
};
function ee(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  st(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
function Ir(e, t, n, r) {
  function i(o) {
    return o instanceof n ? o : new n(function(s) {
      s(o);
    });
  }
  return new (n || (n = Promise))(function(o, s) {
    function a(l) {
      try {
        u(r.next(l));
      } catch (f) {
        s(f);
      }
    }
    function c(l) {
      try {
        u(r.throw(l));
      } catch (f) {
        s(f);
      }
    }
    function u(l) {
      l.done ? o(l.value) : i(l.value).then(a, c);
    }
    u((r = r.apply(e, t || [])).next());
  });
}
function sn(e, t) {
  var n = { label: 0, sent: function() {
    if (o[0] & 1) throw o[1];
    return o[1];
  }, trys: [], ops: [] }, r, i, o, s = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return s.next = a(0), s.throw = a(1), s.return = a(2), typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function a(u) {
    return function(l) {
      return c([u, l]);
    };
  }
  function c(u) {
    if (r) throw new TypeError("Generator is already executing.");
    for (; s && (s = 0, u[0] && (n = 0)), n; ) try {
      if (r = 1, i && (o = u[0] & 2 ? i.return : u[0] ? i.throw || ((o = i.return) && o.call(i), 0) : i.next) && !(o = o.call(i, u[1])).done) return o;
      switch (i = 0, o && (u = [u[0] & 2, o.value]), u[0]) {
        case 0:
        case 1:
          o = u;
          break;
        case 4:
          return n.label++, { value: u[1], done: !1 };
        case 5:
          n.label++, i = u[1], u = [0];
          continue;
        case 7:
          u = n.ops.pop(), n.trys.pop();
          continue;
        default:
          if (o = n.trys, !(o = o.length > 0 && o[o.length - 1]) && (u[0] === 6 || u[0] === 2)) {
            n = 0;
            continue;
          }
          if (u[0] === 3 && (!o || u[1] > o[0] && u[1] < o[3])) {
            n.label = u[1];
            break;
          }
          if (u[0] === 6 && n.label < o[1]) {
            n.label = o[1], o = u;
            break;
          }
          if (o && n.label < o[2]) {
            n.label = o[2], n.ops.push(u);
            break;
          }
          o[2] && n.ops.pop(), n.trys.pop();
          continue;
      }
      u = t.call(e, n);
    } catch (l) {
      u = [6, l], i = 0;
    } finally {
      r = o = 0;
    }
    if (u[0] & 5) throw u[1];
    return { value: u[0] ? u[1] : void 0, done: !0 };
  }
}
function me(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number") return {
    next: function() {
      return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
    }
  };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function ue(e, t) {
  var n = typeof Symbol == "function" && e[Symbol.iterator];
  if (!n) return e;
  var r = n.call(e), i, o = [], s;
  try {
    for (; (t === void 0 || t-- > 0) && !(i = r.next()).done; ) o.push(i.value);
  } catch (a) {
    s = { error: a };
  } finally {
    try {
      i && !i.done && (n = r.return) && n.call(r);
    } finally {
      if (s) throw s.error;
    }
  }
  return o;
}
function be(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, i = t.length, o; r < i; r++)
    (o || !(r in t)) && (o || (o = Array.prototype.slice.call(t, 0, r)), o[r] = t[r]);
  return e.concat(o || Array.prototype.slice.call(t));
}
function pe(e) {
  return this instanceof pe ? (this.v = e, this) : new pe(e);
}
function Mr(e, t, n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(e, t || []), i, o = [];
  return i = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), a("next"), a("throw"), a("return", s), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function s(d) {
    return function(m) {
      return Promise.resolve(m).then(d, f);
    };
  }
  function a(d, m) {
    r[d] && (i[d] = function(p) {
      return new Promise(function(b, v) {
        o.push([d, p, b, v]) > 1 || c(d, p);
      });
    }, m && (i[d] = m(i[d])));
  }
  function c(d, m) {
    try {
      u(r[d](m));
    } catch (p) {
      h(o[0][3], p);
    }
  }
  function u(d) {
    d.value instanceof pe ? Promise.resolve(d.value.v).then(l, f) : h(o[0][2], d);
  }
  function l(d) {
    c("next", d);
  }
  function f(d) {
    c("throw", d);
  }
  function h(d, m) {
    d(m), o.shift(), o.length && c(o[0][0], o[0][1]);
  }
}
function Rr(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator], n;
  return t ? t.call(e) : (e = typeof me == "function" ? me(e) : e[Symbol.iterator](), n = {}, r("next"), r("throw"), r("return"), n[Symbol.asyncIterator] = function() {
    return this;
  }, n);
  function r(o) {
    n[o] = e[o] && function(s) {
      return new Promise(function(a, c) {
        s = e[o](s), i(a, c, s.done, s.value);
      });
    };
  }
  function i(o, s, a, c) {
    Promise.resolve(c).then(function(u) {
      o({ value: u, done: a });
    }, s);
  }
}
function O(e) {
  return typeof e == "function";
}
function vt(e) {
  var t = function(r) {
    Error.call(r), r.stack = new Error().stack;
  }, n = e(t);
  return n.prototype = Object.create(Error.prototype), n.prototype.constructor = n, n;
}
var Ze = vt(function(e) {
  return function(n) {
    e(this), this.message = n ? n.length + ` errors occurred during unsubscription:
` + n.map(function(r, i) {
      return i + 1 + ") " + r.toString();
    }).join(`
  `) : "", this.name = "UnsubscriptionError", this.errors = n;
  };
});
function Ue(e, t) {
  if (e) {
    var n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var Ae = function() {
  function e(t) {
    this.initialTeardown = t, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  return e.prototype.unsubscribe = function() {
    var t, n, r, i, o;
    if (!this.closed) {
      this.closed = !0;
      var s = this._parentage;
      if (s)
        if (this._parentage = null, Array.isArray(s))
          try {
            for (var a = me(s), c = a.next(); !c.done; c = a.next()) {
              var u = c.value;
              u.remove(this);
            }
          } catch (p) {
            t = { error: p };
          } finally {
            try {
              c && !c.done && (n = a.return) && n.call(a);
            } finally {
              if (t) throw t.error;
            }
          }
        else
          s.remove(this);
      var l = this.initialTeardown;
      if (O(l))
        try {
          l();
        } catch (p) {
          o = p instanceof Ze ? p.errors : [p];
        }
      var f = this._finalizers;
      if (f) {
        this._finalizers = null;
        try {
          for (var h = me(f), d = h.next(); !d.done; d = h.next()) {
            var m = d.value;
            try {
              Lt(m);
            } catch (p) {
              o = o ?? [], p instanceof Ze ? o = be(be([], ue(o)), ue(p.errors)) : o.push(p);
            }
          }
        } catch (p) {
          r = { error: p };
        } finally {
          try {
            d && !d.done && (i = h.return) && i.call(h);
          } finally {
            if (r) throw r.error;
          }
        }
      }
      if (o)
        throw new Ze(o);
    }
  }, e.prototype.add = function(t) {
    var n;
    if (t && t !== this)
      if (this.closed)
        Lt(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this))
            return;
          t._addParent(this);
        }
        (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
      }
  }, e.prototype._hasParent = function(t) {
    var n = this._parentage;
    return n === t || Array.isArray(n) && n.includes(t);
  }, e.prototype._addParent = function(t) {
    var n = this._parentage;
    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
  }, e.prototype._removeParent = function(t) {
    var n = this._parentage;
    n === t ? this._parentage = null : Array.isArray(n) && Ue(n, t);
  }, e.prototype.remove = function(t) {
    var n = this._finalizers;
    n && Ue(n, t), t instanceof e && t._removeParent(this);
  }, e.EMPTY = function() {
    var t = new e();
    return t.closed = !0, t;
  }(), e;
}(), an = Ae.EMPTY;
function cn(e) {
  return e instanceof Ae || e && "closed" in e && O(e.remove) && O(e.add) && O(e.unsubscribe);
}
function Lt(e) {
  O(e) ? e() : e.unsubscribe();
}
var Dr = {
  Promise: void 0
}, $r = {
  setTimeout: function(e, t) {
    for (var n = [], r = 2; r < arguments.length; r++)
      n[r - 2] = arguments[r];
    return setTimeout.apply(void 0, be([e, t], ue(n)));
  },
  clearTimeout: function(e) {
    return clearTimeout(e);
  },
  delegate: void 0
};
function un(e) {
  $r.setTimeout(function() {
    throw e;
  });
}
function je() {
}
function Re(e) {
  e();
}
var mt = function(e) {
  ee(t, e);
  function t(n) {
    var r = e.call(this) || this;
    return r.isStopped = !1, n ? (r.destination = n, cn(n) && n.add(r)) : r.destination = Ur, r;
  }
  return t.create = function(n, r, i) {
    return new Ce(n, r, i);
  }, t.prototype.next = function(n) {
    this.isStopped || this._next(n);
  }, t.prototype.error = function(n) {
    this.isStopped || (this.isStopped = !0, this._error(n));
  }, t.prototype.complete = function() {
    this.isStopped || (this.isStopped = !0, this._complete());
  }, t.prototype.unsubscribe = function() {
    this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this), this.destination = null);
  }, t.prototype._next = function(n) {
    this.destination.next(n);
  }, t.prototype._error = function(n) {
    try {
      this.destination.error(n);
    } finally {
      this.unsubscribe();
    }
  }, t.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }, t;
}(Ae), Nr = function() {
  function e(t) {
    this.partialObserver = t;
  }
  return e.prototype.next = function(t) {
    var n = this.partialObserver;
    if (n.next)
      try {
        n.next(t);
      } catch (r) {
        _e(r);
      }
  }, e.prototype.error = function(t) {
    var n = this.partialObserver;
    if (n.error)
      try {
        n.error(t);
      } catch (r) {
        _e(r);
      }
    else
      _e(t);
  }, e.prototype.complete = function() {
    var t = this.partialObserver;
    if (t.complete)
      try {
        t.complete();
      } catch (n) {
        _e(n);
      }
  }, e;
}(), Ce = function(e) {
  ee(t, e);
  function t(n, r, i) {
    var o = e.call(this) || this, s;
    return O(n) || !n ? s = {
      next: n ?? void 0,
      error: r ?? void 0,
      complete: i ?? void 0
    } : s = n, o.destination = new Nr(s), o;
  }
  return t;
}(mt);
function _e(e) {
  un(e);
}
function Fr(e) {
  throw e;
}
var Ur = {
  closed: !0,
  next: je,
  error: Fr,
  complete: je
}, bt = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}();
function gt(e) {
  return e;
}
function jr(e) {
  return e.length === 0 ? gt : e.length === 1 ? e[0] : function(n) {
    return e.reduce(function(r, i) {
      return i(r);
    }, n);
  };
}
var k = function() {
  function e(t) {
    t && (this._subscribe = t);
  }
  return e.prototype.lift = function(t) {
    var n = new e();
    return n.source = this, n.operator = t, n;
  }, e.prototype.subscribe = function(t, n, r) {
    var i = this, o = Br(t) ? t : new Ce(t, n, r);
    return Re(function() {
      var s = i, a = s.operator, c = s.source;
      o.add(a ? a.call(o, c) : c ? i._subscribe(o) : i._trySubscribe(o));
    }), o;
  }, e.prototype._trySubscribe = function(t) {
    try {
      return this._subscribe(t);
    } catch (n) {
      t.error(n);
    }
  }, e.prototype.forEach = function(t, n) {
    var r = this;
    return n = _t(n), new n(function(i, o) {
      var s = new Ce({
        next: function(a) {
          try {
            t(a);
          } catch (c) {
            o(c), s.unsubscribe();
          }
        },
        error: o,
        complete: i
      });
      r.subscribe(s);
    });
  }, e.prototype._subscribe = function(t) {
    var n;
    return (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t);
  }, e.prototype[bt] = function() {
    return this;
  }, e.prototype.pipe = function() {
    for (var t = [], n = 0; n < arguments.length; n++)
      t[n] = arguments[n];
    return jr(t)(this);
  }, e.prototype.toPromise = function(t) {
    var n = this;
    return t = _t(t), new t(function(r, i) {
      var o;
      n.subscribe(function(s) {
        return o = s;
      }, function(s) {
        return i(s);
      }, function() {
        return r(o);
      });
    });
  }, e.create = function(t) {
    return new e(t);
  }, e;
}();
function _t(e) {
  var t;
  return (t = e ?? Dr.Promise) !== null && t !== void 0 ? t : Promise;
}
function Wr(e) {
  return e && O(e.next) && O(e.error) && O(e.complete);
}
function Br(e) {
  return e && e instanceof mt || Wr(e) && cn(e);
}
function Vr(e) {
  return O(e == null ? void 0 : e.lift);
}
function U(e) {
  return function(t) {
    if (Vr(t))
      return t.lift(function(n) {
        try {
          return e(n, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function B(e, t, n, r, i) {
  return new Hr(e, t, n, r, i);
}
var Hr = function(e) {
  ee(t, e);
  function t(n, r, i, o, s, a) {
    var c = e.call(this, n) || this;
    return c.onFinalize = s, c.shouldUnsubscribe = a, c._next = r ? function(u) {
      try {
        r(u);
      } catch (l) {
        n.error(l);
      }
    } : e.prototype._next, c._error = o ? function(u) {
      try {
        o(u);
      } catch (l) {
        n.error(l);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._error, c._complete = i ? function() {
      try {
        i();
      } catch (u) {
        n.error(u);
      } finally {
        this.unsubscribe();
      }
    } : e.prototype._complete, c;
  }
  return t.prototype.unsubscribe = function() {
    var n;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var r = this.closed;
      e.prototype.unsubscribe.call(this), !r && ((n = this.onFinalize) === null || n === void 0 || n.call(this));
    }
  }, t;
}(mt), zr = vt(function(e) {
  return function() {
    e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed";
  };
}), J = function(e) {
  ee(t, e);
  function t() {
    var n = e.call(this) || this;
    return n.closed = !1, n.currentObservers = null, n.observers = [], n.isStopped = !1, n.hasError = !1, n.thrownError = null, n;
  }
  return t.prototype.lift = function(n) {
    var r = new It(this, this);
    return r.operator = n, r;
  }, t.prototype._throwIfClosed = function() {
    if (this.closed)
      throw new zr();
  }, t.prototype.next = function(n) {
    var r = this;
    Re(function() {
      var i, o;
      if (r._throwIfClosed(), !r.isStopped) {
        r.currentObservers || (r.currentObservers = Array.from(r.observers));
        try {
          for (var s = me(r.currentObservers), a = s.next(); !a.done; a = s.next()) {
            var c = a.value;
            c.next(n);
          }
        } catch (u) {
          i = { error: u };
        } finally {
          try {
            a && !a.done && (o = s.return) && o.call(s);
          } finally {
            if (i) throw i.error;
          }
        }
      }
    });
  }, t.prototype.error = function(n) {
    var r = this;
    Re(function() {
      if (r._throwIfClosed(), !r.isStopped) {
        r.hasError = r.isStopped = !0, r.thrownError = n;
        for (var i = r.observers; i.length; )
          i.shift().error(n);
      }
    });
  }, t.prototype.complete = function() {
    var n = this;
    Re(function() {
      if (n._throwIfClosed(), !n.isStopped) {
        n.isStopped = !0;
        for (var r = n.observers; r.length; )
          r.shift().complete();
      }
    });
  }, t.prototype.unsubscribe = function() {
    this.isStopped = this.closed = !0, this.observers = this.currentObservers = null;
  }, Object.defineProperty(t.prototype, "observed", {
    get: function() {
      var n;
      return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0;
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._trySubscribe = function(n) {
    return this._throwIfClosed(), e.prototype._trySubscribe.call(this, n);
  }, t.prototype._subscribe = function(n) {
    return this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n);
  }, t.prototype._innerSubscribe = function(n) {
    var r = this, i = this, o = i.hasError, s = i.isStopped, a = i.observers;
    return o || s ? an : (this.currentObservers = null, a.push(n), new Ae(function() {
      r.currentObservers = null, Ue(a, n);
    }));
  }, t.prototype._checkFinalizedStatuses = function(n) {
    var r = this, i = r.hasError, o = r.thrownError, s = r.isStopped;
    i ? n.error(o) : s && n.complete();
  }, t.prototype.asObservable = function() {
    var n = new k();
    return n.source = this, n;
  }, t.create = function(n, r) {
    return new It(n, r);
  }, t;
}(k), It = function(e) {
  ee(t, e);
  function t(n, r) {
    var i = e.call(this) || this;
    return i.destination = n, i.source = r, i;
  }
  return t.prototype.next = function(n) {
    var r, i;
    (i = (r = this.destination) === null || r === void 0 ? void 0 : r.next) === null || i === void 0 || i.call(r, n);
  }, t.prototype.error = function(n) {
    var r, i;
    (i = (r = this.destination) === null || r === void 0 ? void 0 : r.error) === null || i === void 0 || i.call(r, n);
  }, t.prototype.complete = function() {
    var n, r;
    (r = (n = this.destination) === null || n === void 0 ? void 0 : n.complete) === null || r === void 0 || r.call(n);
  }, t.prototype._subscribe = function(n) {
    var r, i;
    return (i = (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n)) !== null && i !== void 0 ? i : an;
  }, t;
}(J), ln = function(e) {
  ee(t, e);
  function t(n) {
    var r = e.call(this) || this;
    return r._value = n, r;
  }
  return Object.defineProperty(t.prototype, "value", {
    get: function() {
      return this.getValue();
    },
    enumerable: !1,
    configurable: !0
  }), t.prototype._subscribe = function(n) {
    var r = e.prototype._subscribe.call(this, n);
    return !r.closed && n.next(this._value), r;
  }, t.prototype.getValue = function() {
    var n = this, r = n.hasError, i = n.thrownError, o = n._value;
    if (r)
      throw i;
    return this._throwIfClosed(), o;
  }, t.prototype.next = function(n) {
    e.prototype.next.call(this, this._value = n);
  }, t;
}(J), Yr = {
  now: function() {
    return Date.now();
  }
}, qr = function(e) {
  ee(t, e);
  function t(n, r) {
    return e.call(this) || this;
  }
  return t.prototype.schedule = function(n, r) {
    return this;
  }, t;
}(Ae), Mt = {
  setInterval: function(e, t) {
    for (var n = [], r = 2; r < arguments.length; r++)
      n[r - 2] = arguments[r];
    return setInterval.apply(void 0, be([e, t], ue(n)));
  },
  clearInterval: function(e) {
    return clearInterval(e);
  },
  delegate: void 0
}, Kr = function(e) {
  ee(t, e);
  function t(n, r) {
    var i = e.call(this, n, r) || this;
    return i.scheduler = n, i.work = r, i.pending = !1, i;
  }
  return t.prototype.schedule = function(n, r) {
    var i;
    if (r === void 0 && (r = 0), this.closed)
      return this;
    this.state = n;
    var o = this.id, s = this.scheduler;
    return o != null && (this.id = this.recycleAsyncId(s, o, r)), this.pending = !0, this.delay = r, this.id = (i = this.id) !== null && i !== void 0 ? i : this.requestAsyncId(s, this.id, r), this;
  }, t.prototype.requestAsyncId = function(n, r, i) {
    return i === void 0 && (i = 0), Mt.setInterval(n.flush.bind(n, this), i);
  }, t.prototype.recycleAsyncId = function(n, r, i) {
    if (i === void 0 && (i = 0), i != null && this.delay === i && this.pending === !1)
      return r;
    r != null && Mt.clearInterval(r);
  }, t.prototype.execute = function(n, r) {
    if (this.closed)
      return new Error("executing a cancelled action");
    this.pending = !1;
    var i = this._execute(n, r);
    if (i)
      return i;
    this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }, t.prototype._execute = function(n, r) {
    var i = !1, o;
    try {
      this.work(n);
    } catch (s) {
      i = !0, o = s || new Error("Scheduled action threw falsy error");
    }
    if (i)
      return this.unsubscribe(), o;
  }, t.prototype.unsubscribe = function() {
    if (!this.closed) {
      var n = this, r = n.id, i = n.scheduler, o = i.actions;
      this.work = this.state = this.scheduler = null, this.pending = !1, Ue(o, this), r != null && (this.id = this.recycleAsyncId(i, r, null)), this.delay = null, e.prototype.unsubscribe.call(this);
    }
  }, t;
}(qr), Rt = function() {
  function e(t, n) {
    n === void 0 && (n = e.now), this.schedulerActionCtor = t, this.now = n;
  }
  return e.prototype.schedule = function(t, n, r) {
    return n === void 0 && (n = 0), new this.schedulerActionCtor(this, t).schedule(r, n);
  }, e.now = Yr.now, e;
}(), Gr = function(e) {
  ee(t, e);
  function t(n, r) {
    r === void 0 && (r = Rt.now);
    var i = e.call(this, n, r) || this;
    return i.actions = [], i._active = !1, i;
  }
  return t.prototype.flush = function(n) {
    var r = this.actions;
    if (this._active) {
      r.push(n);
      return;
    }
    var i;
    this._active = !0;
    do
      if (i = n.execute(n.state, n.delay))
        break;
    while (n = r.shift());
    if (this._active = !1, i) {
      for (; n = r.shift(); )
        n.unsubscribe();
      throw i;
    }
  }, t;
}(Rt), Qr = new Gr(Kr);
function Jr(e) {
  return e && O(e.schedule);
}
function Xr(e) {
  return e[e.length - 1];
}
function yt(e) {
  return Jr(Xr(e)) ? e.pop() : void 0;
}
var wt = function(e) {
  return e && typeof e.length == "number" && typeof e != "function";
};
function fn(e) {
  return O(e == null ? void 0 : e.then);
}
function dn(e) {
  return O(e[bt]);
}
function pn(e) {
  return Symbol.asyncIterator && O(e == null ? void 0 : e[Symbol.asyncIterator]);
}
function hn(e) {
  return new TypeError("You provided " + (e !== null && typeof e == "object" ? "an invalid object" : "'" + e + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function Zr() {
  return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator;
}
var vn = Zr();
function mn(e) {
  return O(e == null ? void 0 : e[vn]);
}
function bn(e) {
  return Mr(this, arguments, function() {
    var n, r, i, o;
    return sn(this, function(s) {
      switch (s.label) {
        case 0:
          n = e.getReader(), s.label = 1;
        case 1:
          s.trys.push([1, , 9, 10]), s.label = 2;
        case 2:
          return [4, pe(n.read())];
        case 3:
          return r = s.sent(), i = r.value, o = r.done, o ? [4, pe(void 0)] : [3, 5];
        case 4:
          return [2, s.sent()];
        case 5:
          return [4, pe(i)];
        case 6:
          return [4, s.sent()];
        case 7:
          return s.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return n.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function gn(e) {
  return O(e == null ? void 0 : e.getReader);
}
function H(e) {
  if (e instanceof k)
    return e;
  if (e != null) {
    if (dn(e))
      return ei(e);
    if (wt(e))
      return ti(e);
    if (fn(e))
      return ni(e);
    if (pn(e))
      return yn(e);
    if (mn(e))
      return ri(e);
    if (gn(e))
      return ii(e);
  }
  throw hn(e);
}
function ei(e) {
  return new k(function(t) {
    var n = e[bt]();
    if (O(n.subscribe))
      return n.subscribe(t);
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function ti(e) {
  return new k(function(t) {
    for (var n = 0; n < e.length && !t.closed; n++)
      t.next(e[n]);
    t.complete();
  });
}
function ni(e) {
  return new k(function(t) {
    e.then(function(n) {
      t.closed || (t.next(n), t.complete());
    }, function(n) {
      return t.error(n);
    }).then(null, un);
  });
}
function ri(e) {
  return new k(function(t) {
    var n, r;
    try {
      for (var i = me(e), o = i.next(); !o.done; o = i.next()) {
        var s = o.value;
        if (t.next(s), t.closed)
          return;
      }
    } catch (a) {
      n = { error: a };
    } finally {
      try {
        o && !o.done && (r = i.return) && r.call(i);
      } finally {
        if (n) throw n.error;
      }
    }
    t.complete();
  });
}
function yn(e) {
  return new k(function(t) {
    oi(e, t).catch(function(n) {
      return t.error(n);
    });
  });
}
function ii(e) {
  return yn(bn(e));
}
function oi(e, t) {
  var n, r, i, o;
  return Ir(this, void 0, void 0, function() {
    var s, a;
    return sn(this, function(c) {
      switch (c.label) {
        case 0:
          c.trys.push([0, 5, 6, 11]), n = Rr(e), c.label = 1;
        case 1:
          return [4, n.next()];
        case 2:
          if (r = c.sent(), !!r.done) return [3, 4];
          if (s = r.value, t.next(s), t.closed)
            return [2];
          c.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return a = c.sent(), i = { error: a }, [3, 11];
        case 6:
          return c.trys.push([6, , 9, 10]), r && !r.done && (o = n.return) ? [4, o.call(n)] : [3, 8];
        case 7:
          c.sent(), c.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (i) throw i.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return t.complete(), [2];
      }
    });
  });
}
function re(e, t, n, r, i) {
  r === void 0 && (r = 0), i === void 0 && (i = !1);
  var o = t.schedule(function() {
    n(), i ? e.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if (e.add(o), !i)
    return o;
}
function wn(e, t) {
  return t === void 0 && (t = 0), U(function(n, r) {
    n.subscribe(B(r, function(i) {
      return re(r, e, function() {
        return r.next(i);
      }, t);
    }, function() {
      return re(r, e, function() {
        return r.complete();
      }, t);
    }, function(i) {
      return re(r, e, function() {
        return r.error(i);
      }, t);
    }));
  });
}
function xn(e, t) {
  return t === void 0 && (t = 0), U(function(n, r) {
    r.add(e.schedule(function() {
      return n.subscribe(r);
    }, t));
  });
}
function si(e, t) {
  return H(e).pipe(xn(t), wn(t));
}
function ai(e, t) {
  return H(e).pipe(xn(t), wn(t));
}
function ci(e, t) {
  return new k(function(n) {
    var r = 0;
    return t.schedule(function() {
      r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule());
    });
  });
}
function ui(e, t) {
  return new k(function(n) {
    var r;
    return re(n, t, function() {
      r = e[vn](), re(n, t, function() {
        var i, o, s;
        try {
          i = r.next(), o = i.value, s = i.done;
        } catch (a) {
          n.error(a);
          return;
        }
        s ? n.complete() : n.next(o);
      }, 0, !0);
    }), function() {
      return O(r == null ? void 0 : r.return) && r.return();
    };
  });
}
function Sn(e, t) {
  if (!e)
    throw new Error("Iterable cannot be null");
  return new k(function(n) {
    re(n, t, function() {
      var r = e[Symbol.asyncIterator]();
      re(n, t, function() {
        r.next().then(function(i) {
          i.done ? n.complete() : n.next(i.value);
        });
      }, 0, !0);
    });
  });
}
function li(e, t) {
  return Sn(bn(e), t);
}
function fi(e, t) {
  if (e != null) {
    if (dn(e))
      return si(e, t);
    if (wt(e))
      return ci(e, t);
    if (fn(e))
      return ai(e, t);
    if (pn(e))
      return Sn(e, t);
    if (mn(e))
      return ui(e, t);
    if (gn(e))
      return li(e, t);
  }
  throw hn(e);
}
function Ge(e, t) {
  return t ? fi(e, t) : H(e);
}
function Dt() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  var n = yt(e);
  return Ge(e, n);
}
function di(e) {
  return e instanceof Date && !isNaN(e);
}
var pi = vt(function(e) {
  return function(n) {
    n === void 0 && (n = null), e(this), this.message = "Timeout has occurred", this.name = "TimeoutError", this.info = n;
  };
});
function hi(e, t) {
  var n = di(e) ? { first: e } : typeof e == "number" ? { each: e } : e, r = n.first, i = n.each, o = n.with, s = o === void 0 ? vi : o, a = n.scheduler, c = a === void 0 ? Qr : a, u = n.meta, l = u === void 0 ? null : u;
  if (r == null && i == null)
    throw new TypeError("No timeout provided.");
  return U(function(f, h) {
    var d, m, p = null, b = 0, v = function(x) {
      m = re(h, c, function() {
        try {
          d.unsubscribe(), H(s({
            meta: l,
            lastValue: p,
            seen: b
          })).subscribe(h);
        } catch (E) {
          h.error(E);
        }
      }, x);
    };
    d = f.subscribe(B(h, function(x) {
      m == null || m.unsubscribe(), b++, h.next(p = x), i > 0 && v(i);
    }, void 0, void 0, function() {
      m != null && m.closed || m == null || m.unsubscribe(), p = null;
    })), !b && v(r != null ? typeof r == "number" ? r : +r - c.now() : i);
  });
}
function vi(e) {
  throw new pi(e);
}
function A(e, t) {
  return U(function(n, r) {
    var i = 0;
    n.subscribe(B(r, function(o) {
      r.next(e.call(t, o, i++));
    }));
  });
}
var mi = Array.isArray;
function bi(e, t) {
  return mi(t) ? e.apply(void 0, be([], ue(t))) : e(t);
}
function gi(e) {
  return A(function(t) {
    return bi(e, t);
  });
}
function yi(e, t, n, r, i, o, s, a) {
  var c = [], u = 0, l = 0, f = !1, h = function() {
    f && !c.length && !u && t.complete();
  }, d = function(p) {
    return u < r ? m(p) : c.push(p);
  }, m = function(p) {
    u++;
    var b = !1;
    H(n(p, l++)).subscribe(B(t, function(v) {
      t.next(v);
    }, function() {
      b = !0;
    }, void 0, function() {
      if (b)
        try {
          u--;
          for (var v = function() {
            var x = c.shift();
            s || m(x);
          }; c.length && u < r; )
            v();
          h();
        } catch (x) {
          t.error(x);
        }
    }));
  };
  return e.subscribe(B(t, d, function() {
    f = !0, h();
  })), function() {
  };
}
function xt(e, t, n) {
  return n === void 0 && (n = 1 / 0), O(t) ? xt(function(r, i) {
    return A(function(o, s) {
      return t(r, o, i, s);
    })(H(e(r, i)));
  }, n) : (typeof t == "number" && (n = t), U(function(r, i) {
    return yi(r, i, e, n);
  }));
}
function wi(e) {
  return xt(gt, e);
}
function xi() {
  return wi(1);
}
function We() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  return xi()(Ge(e, yt(e)));
}
var Si = ["addListener", "removeListener"], Ei = ["addEventListener", "removeEventListener"], Ti = ["on", "off"];
function at(e, t, n, r) {
  if (O(n) && (r = n, n = void 0), r)
    return at(e, t, n).pipe(gi(r));
  var i = ue(Oi(e) ? Ei.map(function(a) {
    return function(c) {
      return e[a](t, c, n);
    };
  }) : Ci(e) ? Si.map($t(e, t)) : Pi(e) ? Ti.map($t(e, t)) : [], 2), o = i[0], s = i[1];
  if (!o && wt(e))
    return xt(function(a) {
      return at(a, t, n);
    })(H(e));
  if (!o)
    throw new TypeError("Invalid event target");
  return new k(function(a) {
    var c = function() {
      for (var u = [], l = 0; l < arguments.length; l++)
        u[l] = arguments[l];
      return a.next(1 < u.length ? u : u[0]);
    };
    return o(c), function() {
      return s(c);
    };
  });
}
function $t(e, t) {
  return function(n) {
    return function(r) {
      return e[n](t, r);
    };
  };
}
function Ci(e) {
  return O(e.addListener) && O(e.removeListener);
}
function Pi(e) {
  return O(e.on) && O(e.off);
}
function Oi(e) {
  return O(e.addEventListener) && O(e.removeEventListener);
}
function Qe(e, t) {
  return U(function(n, r) {
    var i = 0;
    n.subscribe(B(r, function(o) {
      return e.call(t, o, i++) && r.next(o);
    }));
  });
}
function Ai(e, t, n, r, i) {
  return function(o, s) {
    var a = n, c = t, u = 0;
    o.subscribe(B(s, function(l) {
      var f = u++;
      c = a ? e(c, l, f) : (a = !0, l), s.next(c);
    }, i));
  };
}
function ki(e, t) {
  return t === void 0 && (t = gt), e = e ?? Li, U(function(n, r) {
    var i, o = !0;
    n.subscribe(B(r, function(s) {
      var a = t(s);
      (o || !e(i, a)) && (o = !1, i = a, r.next(s));
    }));
  });
}
function Li(e, t) {
  return e === t;
}
function _i(e) {
  return U(function(t, n) {
    try {
      t.subscribe(n);
    } finally {
      n.add(e);
    }
  });
}
function ct(e, t) {
  return U(Ai(e, t, arguments.length >= 2, !0));
}
function Ii(e) {
  e === void 0 && (e = {});
  var t = e.connector, n = t === void 0 ? function() {
    return new J();
  } : t, r = e.resetOnError, i = r === void 0 ? !0 : r, o = e.resetOnComplete, s = o === void 0 ? !0 : o, a = e.resetOnRefCountZero, c = a === void 0 ? !0 : a;
  return function(u) {
    var l, f, h, d = 0, m = !1, p = !1, b = function() {
      f == null || f.unsubscribe(), f = void 0;
    }, v = function() {
      b(), l = h = void 0, m = p = !1;
    }, x = function() {
      var E = l;
      v(), E == null || E.unsubscribe();
    };
    return U(function(E, P) {
      d++, !p && !m && b();
      var g = h = h ?? n();
      P.add(function() {
        d--, d === 0 && !p && !m && (f = et(x, c));
      }), g.subscribe(P), !l && d > 0 && (l = new Ce({
        next: function(S) {
          return g.next(S);
        },
        error: function(S) {
          p = !0, b(), f = et(v, i, S), g.error(S);
        },
        complete: function() {
          m = !0, b(), f = et(v, s), g.complete();
        }
      }), H(E).subscribe(l));
    })(u);
  };
}
function et(e, t) {
  for (var n = [], r = 2; r < arguments.length; r++)
    n[r - 2] = arguments[r];
  if (t === !0) {
    e();
    return;
  }
  if (t !== !1) {
    var i = new Ce({
      next: function() {
        i.unsubscribe(), e();
      }
    });
    return H(t.apply(void 0, be([], ue(n)))).subscribe(i);
  }
}
function Mi(e) {
  return U(function(t, n) {
    var r = !1, i = B(n, function() {
      i == null || i.unsubscribe(), r = !0;
    }, je);
    H(e).subscribe(i), t.subscribe(B(n, function(o) {
      return r && n.next(o);
    }));
  });
}
function D() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  var n = yt(e);
  return U(function(r, i) {
    (n ? We(e, r, n) : We(e, r)).subscribe(i);
  });
}
function En(e, t) {
  return U(function(n, r) {
    var i = null, o = 0, s = !1, a = function() {
      return s && !i && r.complete();
    };
    n.subscribe(B(r, function(c) {
      i == null || i.unsubscribe();
      var u = 0, l = o++;
      H(e(c, l)).subscribe(i = B(r, function(f) {
        return r.next(t ? t(c, f, l, u++) : f);
      }, function() {
        i = null, a();
      }));
    }, function() {
      s = !0, a();
    }));
  });
}
function Nt(e) {
  return U(function(t, n) {
    H(e).subscribe(B(n, function() {
      return n.complete();
    }, je)), !n.closed && t.subscribe(n);
  });
}
var Ri = Object.defineProperty, Di = Object.defineProperties, $i = Object.getOwnPropertyDescriptors, Ft = Object.getOwnPropertySymbols, Ni = Object.prototype.hasOwnProperty, Fi = Object.prototype.propertyIsEnumerable, Ut = (e, t, n) => t in e ? Ri(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Z = (e, t) => {
  for (var n in t || (t = {}))
    Ni.call(t, n) && Ut(e, n, t[n]);
  if (Ft)
    for (var n of Ft(t))
      Fi.call(t, n) && Ut(e, n, t[n]);
  return e;
}, Ee = (e, t) => Di(e, $i(t)), V = (e, t, n) => new Promise((r, i) => {
  var o = (c) => {
    try {
      a(n.next(c));
    } catch (u) {
      i(u);
    }
  }, s = (c) => {
    try {
      a(n.throw(c));
    } catch (u) {
      i(u);
    }
  }, a = (c) => c.done ? r(c.value) : Promise.resolve(c.value).then(o, s);
  a((n = n.apply(e, t)).next());
}), Tn = "lk";
function W(e) {
  return typeof e > "u" ? !1 : Ui(e) || ji(e);
}
function Ui(e) {
  var t;
  return e ? e.hasOwnProperty("participant") && e.hasOwnProperty("source") && e.hasOwnProperty("track") && typeof ((t = e.publication) == null ? void 0 : t.track) < "u" : !1;
}
function ji(e) {
  return e ? e.hasOwnProperty("participant") && e.hasOwnProperty("source") && e.hasOwnProperty("publication") && typeof e.publication < "u" : !1;
}
function Pe(e) {
  return e ? e.hasOwnProperty("participant") && e.hasOwnProperty("source") && typeof e.publication > "u" : !1;
}
function N(e) {
  if (typeof e == "string" || typeof e == "number")
    return `${e}`;
  if (Pe(e))
    return `${e.participant.identity}_${e.source}_placeholder`;
  if (W(e))
    return `${e.participant.identity}_${e.publication.source}_${e.publication.trackSid}`;
  throw new Error(`Can't generate a id for the given track reference: ${e}`);
}
function $o(e, t) {
  return e === void 0 || t === void 0 ? !1 : W(e) && W(t) ? e.publication.trackSid === t.publication.trackSid : N(e) === N(t);
}
function No(e, t) {
  return typeof t > "u" ? !1 : W(e) ? t.some(
    (n) => n.participant.identity === e.participant.identity && W(n) && n.publication.trackSid === e.publication.trackSid
  ) : Pe(e) ? t.some(
    (n) => n.participant.identity === e.participant.identity && Pe(n) && n.source === e.source
  ) : !1;
}
function Wi(e, t) {
  return Pe(e) && W(t) && t.participant.identity === e.participant.identity && t.source === e.source;
}
function Fo() {
  const e = document.createElement("p");
  e.style.width = "100%", e.style.height = "200px";
  const t = document.createElement("div");
  t.style.position = "absolute", t.style.top = "0px", t.style.left = "0px", t.style.visibility = "hidden", t.style.width = "200px", t.style.height = "150px", t.style.overflow = "hidden", t.appendChild(e), document.body.appendChild(t);
  const n = e.offsetWidth;
  t.style.overflow = "scroll";
  let r = e.offsetWidth;
  return n === r && (r = t.clientWidth), document.body.removeChild(t), n - r;
}
function Uo() {
  return typeof document < "u";
}
function Bi(e) {
  e = Z({}, e);
  const t = "(?:(?:[a-z]+:)?//)?", n = "(?:\\S+(?::\\S*)?@)?", r = new RegExp(
    "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}",
    "g"
  ).source, u = `(?:${t}|www\\.)${n}(?:localhost|${r}|(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#][^\\s"]*)?`;
  return e.exact ? new RegExp(`(?:^${u}$)`, "i") : new RegExp(u, "ig");
}
var jt = "[^\\.\\s@:](?:[^\\s@:]*[^\\s@:\\.])?@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*";
function Vi({ exact: e } = {}) {
  return e ? new RegExp(`^${jt}$`) : new RegExp(jt, "g");
}
function jo(e, t, n) {
  return Sr(e, t, () => V(this, null, function* () {
    const { x: i, y: o } = yield Pr(e, t, {
      placement: "top",
      middleware: [Er(6), Cr(), Tr({ padding: 5 })]
    });
    n == null || n(i, o);
  }));
}
function Wo(e, t) {
  return !e.contains(t.target);
}
var Bo = () => ({
  email: Vi(),
  url: Bi({})
});
function Vo(e, t) {
  const n = Object.entries(t).map(
    ([o, s], a) => Array.from(e.matchAll(s)).map(({ index: c, 0: u }) => ({
      type: o,
      weight: a,
      content: u,
      index: c ?? 0
    }))
  ).flat().sort((o, s) => {
    const a = o.index - s.index;
    return a !== 0 ? a : o.weight - s.weight;
  }).filter(({ index: o }, s, a) => {
    if (s === 0) return !0;
    const c = a[s - 1];
    return c.index + c.content.length <= o;
  }), r = [];
  let i = 0;
  for (const { type: o, content: s, index: a } of n)
    a > i && r.push(e.substring(i, a)), r.push({ type: o, content: s }), i = a + s.length;
  return e.length > i && r.push(e.substring(i)), r;
}
var Hi = [
  y.ConnectionStateChanged,
  y.RoomMetadataChanged,
  y.ActiveSpeakersChanged,
  y.ConnectionQualityChanged,
  y.ParticipantConnected,
  y.ParticipantDisconnected,
  y.ParticipantPermissionsChanged,
  y.ParticipantMetadataChanged,
  y.ParticipantNameChanged,
  y.ParticipantAttributesChanged,
  y.TrackMuted,
  y.TrackUnmuted,
  y.TrackPublished,
  y.TrackUnpublished,
  y.TrackStreamStateChanged,
  y.TrackSubscriptionFailed,
  y.TrackSubscriptionPermissionChanged,
  y.TrackSubscriptionStatusChanged
], Cn = [
  ...Hi,
  y.LocalTrackPublished,
  y.LocalTrackUnpublished
], zi = [
  w.TrackPublished,
  w.TrackUnpublished,
  w.TrackMuted,
  w.TrackUnmuted,
  w.TrackStreamStateChanged,
  w.TrackSubscribed,
  w.TrackUnsubscribed,
  w.TrackSubscriptionPermissionChanged,
  w.TrackSubscriptionFailed,
  w.LocalTrackPublished,
  w.LocalTrackUnpublished
], Yi = [
  w.ConnectionQualityChanged,
  w.IsSpeakingChanged,
  w.ParticipantMetadataChanged,
  w.ParticipantPermissionsChanged,
  w.TrackMuted,
  w.TrackUnmuted,
  w.TrackPublished,
  w.TrackUnpublished,
  w.TrackStreamStateChanged,
  w.TrackSubscriptionFailed,
  w.TrackSubscriptionPermissionChanged,
  w.TrackSubscriptionStatusChanged
], Pn = [
  ...Yi,
  w.LocalTrackPublished,
  w.LocalTrackUnpublished
], _ = _r.getLogger("lk-components-js");
_.setDefaultLevel("WARN");
function Ho(e, t = {}) {
  var n;
  _.setLevel(e), Vn((n = t.liveKitClientLogLevel) != null ? n : e);
}
function zo(e, t = {}) {
  var n;
  const r = _.methodFactory;
  _.methodFactory = (i, o, s) => {
    const a = r(i, o, s), c = St[i], u = c >= o && c < St.silent;
    return (l, f) => {
      f ? a(l, f) : a(l), u && e(c, l, f);
    };
  }, _.setLevel(_.getLevel()), Hn((n = t.liveKitClientLogExtension) != null ? n : e);
}
var Yo = [
  {
    columns: 1,
    rows: 1
  },
  {
    columns: 1,
    rows: 2,
    orientation: "portrait"
  },
  {
    columns: 2,
    rows: 1,
    orientation: "landscape"
  },
  {
    columns: 2,
    rows: 2,
    minWidth: 560
  },
  {
    columns: 3,
    rows: 3,
    minWidth: 700
  },
  {
    columns: 4,
    rows: 4,
    minWidth: 960
  },
  {
    columns: 5,
    rows: 5,
    minWidth: 1100
  }
];
function qi(e, t, n, r) {
  if (e.length < 1)
    throw new Error("At least one grid layout definition must be provided.");
  const i = Ki(e);
  if (n <= 0 || r <= 0)
    return i[0];
  let o = 0;
  const s = n / r > 1 ? "landscape" : "portrait";
  let a = i.find((c, u, l) => {
    o = u;
    const f = l.findIndex((h, d) => {
      const m = !h.orientation || h.orientation === s, p = d > u, b = h.maxTiles === c.maxTiles;
      return p && b && m;
    }) !== -1;
    return c.maxTiles >= t && !f;
  });
  if (a === void 0)
    if (a = i[i.length - 1], a)
      _.warn(
        `No layout found for: participantCount: ${t}, width/height: ${n}/${r} fallback to biggest available layout (${a}).`
      );
    else
      throw new Error("No layout or fallback layout found.");
  if ((n < a.minWidth || r < a.minHeight) && o > 0) {
    const c = i[o - 1];
    a = qi(
      i.slice(0, o),
      c.maxTiles,
      n,
      r
    );
  }
  return a;
}
function Ki(e) {
  return [...e].map((t) => {
    var n, r;
    return {
      name: `${t.columns}x${t.rows}`,
      columns: t.columns,
      rows: t.rows,
      maxTiles: t.columns * t.rows,
      minWidth: (n = t.minWidth) != null ? n : 0,
      minHeight: (r = t.minHeight) != null ? r : 0,
      orientation: t.orientation
    };
  }).sort((t, n) => t.maxTiles !== n.maxTiles ? t.maxTiles - n.maxTiles : t.minWidth !== 0 || n.minWidth !== 0 ? t.minWidth - n.minWidth : t.minHeight !== 0 || n.minHeight !== 0 ? t.minHeight - n.minHeight : 0);
}
function qo() {
  return typeof navigator < "u" && navigator.mediaDevices && !!navigator.mediaDevices.getDisplayMedia;
}
function Ko(e, t) {
  var n;
  return Ee(Z({}, e), {
    receivedAtMediaTimestamp: (n = t.rtpTimestamp) != null ? n : 0,
    receivedAt: t.timestamp
  });
}
function Go(e, t, n) {
  return [...e, ...t].reduceRight((r, i) => (r.find((o) => o.id === i.id) || r.unshift(i), r), []).slice(0 - n);
}
var On = [], An = {
  showChat: !1,
  unreadMessages: 0,
  showSettings: !1
};
function Gi(e) {
  return typeof e == "object";
}
function Qo(e) {
  return Array.isArray(e) && e.filter(Gi).length > 0;
}
function kn(e, t) {
  return t.audioLevel - e.audioLevel;
}
function Ln(e, t) {
  return e.isSpeaking === t.isSpeaking ? 0 : e.isSpeaking ? -1 : 1;
}
function _n(e, t) {
  var n, r, i, o;
  return e.lastSpokeAt !== void 0 || t.lastSpokeAt !== void 0 ? ((r = (n = t.lastSpokeAt) == null ? void 0 : n.getTime()) != null ? r : 0) - ((o = (i = e.lastSpokeAt) == null ? void 0 : i.getTime()) != null ? o : 0) : 0;
}
function Be(e, t) {
  var n, r, i, o;
  return ((r = (n = e.joinedAt) == null ? void 0 : n.getTime()) != null ? r : 0) - ((o = (i = t.joinedAt) == null ? void 0 : i.getTime()) != null ? o : 0);
}
function Qi(e, t) {
  return W(e) ? W(t) ? 0 : -1 : W(t) ? 1 : 0;
}
function Ji(e, t) {
  const n = e.participant.isCameraEnabled, r = t.participant.isCameraEnabled;
  return n !== r ? n ? -1 : 1 : 0;
}
function Jo(e) {
  const t = [], n = [], r = [], i = [];
  e.forEach((a) => {
    a.participant.isLocal && a.source === R.Source.Camera ? t.push(a) : a.source === R.Source.ScreenShare ? n.push(a) : a.source === R.Source.Camera ? r.push(a) : i.push(a);
  });
  const o = Xi(n), s = Zi(r);
  return [...t, ...o, ...s, ...i];
}
function Xi(e) {
  const t = [], n = [];
  return e.forEach((i) => {
    i.participant.isLocal ? t.push(i) : n.push(i);
  }), t.sort((i, o) => Be(i.participant, o.participant)), n.sort((i, o) => Be(i.participant, o.participant)), [...n, ...t];
}
function Zi(e) {
  const t = [], n = [];
  return e.forEach((r) => {
    r.participant.isLocal ? t.push(r) : n.push(r);
  }), n.sort((r, i) => r.participant.isSpeaking && i.participant.isSpeaking ? kn(r.participant, i.participant) : r.participant.isSpeaking !== i.participant.isSpeaking ? Ln(r.participant, i.participant) : r.participant.lastSpokeAt !== i.participant.lastSpokeAt ? _n(r.participant, i.participant) : W(r) !== W(i) ? Qi(r, i) : r.participant.isCameraEnabled !== i.participant.isCameraEnabled ? Ji(r, i) : Be(r.participant, i.participant)), [...t, ...n];
}
function Xo(e) {
  const t = [...e];
  t.sort((r, i) => {
    if (r.isSpeaking && i.isSpeaking)
      return kn(r, i);
    if (r.isSpeaking !== i.isSpeaking)
      return Ln(r, i);
    if (r.lastSpokeAt !== i.lastSpokeAt)
      return _n(r, i);
    const o = r.videoTrackPublications.size > 0, s = i.videoTrackPublications.size > 0;
    return o !== s ? o ? -1 : 1 : Be(r, i);
  });
  const n = t.find((r) => r.isLocal);
  if (n) {
    const r = t.indexOf(n);
    r >= 0 && (t.splice(r, 1), t.length > 0 ? t.splice(0, 0, n) : t.push(n));
  }
  return t;
}
function eo(e, t) {
  return e.reduce(
    (n, r, i) => i % t === 0 ? [...n, [r]] : [...n.slice(0, -1), [...n.slice(-1)[0], r]],
    []
  );
}
function Wt(e, t) {
  const n = Math.max(e.length, t.length);
  return new Array(n).fill([]).map((r, i) => [e[i], t[i]]);
}
function Ve(e, t, n) {
  return e.filter((r) => !t.map((i) => n(i)).includes(n(r)));
}
function ut(e) {
  return e.map((t) => typeof t == "string" || typeof t == "number" ? `${t}` : N(t));
}
function to(e, t) {
  return {
    dropped: Ve(e, t, N),
    added: Ve(t, e, N)
  };
}
function no(e) {
  return e.added.length !== 0 || e.dropped.length !== 0;
}
function lt(e, t) {
  const n = t.findIndex(
    (r) => N(r) === N(e)
  );
  if (n === -1)
    throw new Error(
      `Element not part of the array: ${N(
        e
      )} not in ${ut(t)}`
    );
  return n;
}
function ro(e, t, n) {
  const r = lt(e, n), i = lt(t, n);
  return n.splice(r, 1, t), n.splice(i, 1, e), n;
}
function io(e, t) {
  const n = lt(e, t);
  return t.splice(n, 1), t;
}
function oo(e, t) {
  return [...t, e];
}
function tt(e, t) {
  return eo(e, t);
}
function Zo(e, t, n) {
  let r = so(e, t);
  if (r.length < t.length) {
    const s = Ve(t, r, N);
    r = [...r, ...s];
  }
  const i = tt(r, n), o = tt(t, n);
  if (Wt(i, o).forEach(([s, a], c) => {
    if (s && a) {
      const u = tt(r, n)[c], l = to(u, a);
      no(l) && (_.debug(
        `Detected visual changes on page: ${c}, current: ${ut(
          s
        )}, next: ${ut(a)}`,
        { changes: l }
      ), l.added.length === l.dropped.length && Wt(l.added, l.dropped).forEach(([f, h]) => {
        if (f && h)
          r = ro(f, h, r);
        else
          throw new Error(
            `For a swap action we need a addition and a removal one is missing: ${f}, ${h}`
          );
      }), l.added.length === 0 && l.dropped.length > 0 && l.dropped.forEach((f) => {
        r = io(f, r);
      }), l.added.length > 0 && l.dropped.length === 0 && l.added.forEach((f) => {
        r = oo(f, r);
      }));
    }
  }), r.length > t.length) {
    const s = Ve(r, t, N);
    r = r.filter(
      (a) => !s.map(N).includes(N(a))
    );
  }
  return r;
}
function so(e, t) {
  return e.map((n) => {
    const r = t.find(
      (i) => (
        // If the IDs match or ..
        N(n) === N(i) || // ... if the current item is a placeholder and the new item is the track reference can replace it.
        typeof n != "number" && Pe(n) && W(i) && Wi(n, i)
      )
    );
    return r ?? n;
  });
}
function F(e) {
  return `${Tn}-${e}`;
}
function es(e) {
  const t = Bt(e), n = In(e.participant).pipe(
    A(() => Bt(e)),
    D(t)
  );
  return { className: F(
    e.source === R.Source.Camera || e.source === R.Source.ScreenShare ? "participant-media-video" : "participant-media-audio"
  ), trackObserver: n };
}
function Bt(e) {
  if (W(e))
    return e.publication;
  {
    const { source: t, name: n, participant: r } = e;
    if (t && n)
      return r.getTrackPublications().find((i) => i.source === t && i.trackName === n);
    if (n)
      return r.getTrackPublicationByName(n);
    if (t)
      return r.getTrackPublication(t);
    throw new Error("At least one of source and name needs to be defined");
  }
}
function le(e, ...t) {
  return new k((r) => {
    const i = () => {
      r.next(e);
    };
    return t.forEach((s) => {
      e.on(s, i);
    }), () => {
      t.forEach((s) => {
        e.off(s, i);
      });
    };
  }).pipe(D(e));
}
function ye(e, t) {
  return new k((r) => {
    const i = (...s) => {
      r.next(s);
    };
    return e.on(t, i), () => {
      e.off(t, i);
    };
  });
}
function ts(e) {
  return ye(e, y.ConnectionStateChanged).pipe(
    A(([t]) => t),
    D(e.state)
  );
}
function ns(e) {
  return le(
    e,
    y.RoomMetadataChanged,
    y.ConnectionStateChanged
  ).pipe(
    A((n) => ({ name: n.name, metadata: n.metadata }))
  );
}
function rs(e) {
  return ye(e, y.ActiveSpeakersChanged).pipe(
    A(([t]) => t)
  );
}
function is(e, t, n = !0) {
  var r;
  const i = () => V(this, null, function* () {
    try {
      const a = yield Et.getLocalDevices(e, n);
      o.next(a);
    } catch (a) {
      t == null || t(a);
    }
  }), o = new J(), s = o.pipe(
    _i(() => {
      var a;
      (a = navigator == null ? void 0 : navigator.mediaDevices) == null || a.removeEventListener("devicechange", i);
    })
  );
  if (typeof window < "u") {
    if (!window.isSecureContext)
      throw new Error(
        "Accessing media devices is available only in secure contexts (HTTPS and localhost), in some or all supporting browsers. See: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/mediaDevices"
      );
    (r = navigator == null ? void 0 : navigator.mediaDevices) == null || r.addEventListener("devicechange", i);
  }
  return We(
    Et.getLocalDevices(e, n).catch((a) => (t == null || t(a), [])),
    s
  );
}
function ao(e) {
  return ye(e, y.DataReceived);
}
function co(e) {
  return le(e, y.AudioPlaybackStatusChanged).pipe(
    A((n) => ({ canPlayAudio: n.canPlaybackAudio }))
  );
}
function uo(e) {
  return le(e, y.VideoPlaybackStatusChanged).pipe(
    A((n) => ({ canPlayVideo: n.canPlaybackVideo }))
  );
}
function lo(e, t) {
  return ye(e, y.ActiveDeviceChanged).pipe(
    Qe(([n]) => n === t),
    A(([n, r]) => (_.debug("activeDeviceObservable | RoomEvent.ActiveDeviceChanged", { kind: n, deviceId: r }), r))
  );
}
function os(e, t) {
  return ye(e, y.ParticipantEncryptionStatusChanged).pipe(
    Qe(
      ([, n]) => (t == null ? void 0 : t.identity) === (n == null ? void 0 : n.identity) || !n && (t == null ? void 0 : t.identity) === e.localParticipant.identity
    ),
    A(([n]) => n),
    D(
      t != null && t.isLocal ? t.isE2EEEnabled : !!(t != null && t.isEncrypted)
    )
  );
}
function ss(e) {
  return ye(e, y.RecordingStatusChanged).pipe(
    A(([t]) => t),
    D(e.isRecording)
  );
}
function we(e, ...t) {
  return new k((r) => {
    const i = () => {
      r.next(e);
    };
    return t.forEach((s) => {
      e.on(s, i);
    }), () => {
      t.forEach((s) => {
        e.off(s, i);
      });
    };
  }).pipe(D(e));
}
function In(e) {
  return we(
    e,
    w.TrackMuted,
    w.TrackUnmuted,
    w.ParticipantPermissionsChanged,
    // ParticipantEvent.IsSpeakingChanged,
    w.TrackPublished,
    w.TrackUnpublished,
    w.LocalTrackPublished,
    w.LocalTrackUnpublished,
    w.MediaDevicesError,
    w.TrackSubscriptionStatusChanged
    // ParticipantEvent.ConnectionQualityChanged,
  ).pipe(
    A((n) => {
      const { isMicrophoneEnabled: r, isCameraEnabled: i, isScreenShareEnabled: o } = n, s = n.getTrackPublication(R.Source.Microphone), a = n.getTrackPublication(R.Source.Camera);
      return {
        isCameraEnabled: i,
        isMicrophoneEnabled: r,
        isScreenShareEnabled: o,
        cameraTrack: a,
        microphoneTrack: s,
        participant: n
      };
    })
  );
}
function fo(e) {
  return e ? we(
    e,
    w.ParticipantMetadataChanged,
    w.ParticipantNameChanged
  ).pipe(
    A(({ name: n, identity: r, metadata: i }) => ({
      name: n,
      identity: r,
      metadata: i
    })),
    D({
      name: e.name,
      identity: e.identity,
      metadata: e.metadata
    })
  ) : void 0;
}
function po(e) {
  return Je(
    e,
    w.ConnectionQualityChanged
  ).pipe(
    A(([n]) => n),
    D(e.connectionQuality)
  );
}
function Je(e, t) {
  return new k((r) => {
    const i = (...s) => {
      r.next(s);
    };
    return e.on(t, i), () => {
      e.off(t, i);
    };
  });
}
function ho(e) {
  var t, n, r, i;
  return we(
    e.participant,
    w.TrackMuted,
    w.TrackUnmuted,
    w.TrackSubscribed,
    w.TrackUnsubscribed,
    w.LocalTrackPublished,
    w.LocalTrackUnpublished
  ).pipe(
    A((o) => {
      var s, a;
      const c = (s = e.publication) != null ? s : o.getTrackPublication(e.source);
      return (a = c == null ? void 0 : c.isMuted) != null ? a : !0;
    }),
    D(
      (i = (r = (t = e.publication) == null ? void 0 : t.isMuted) != null ? r : (n = e.participant.getTrackPublication(e.source)) == null ? void 0 : n.isMuted) != null ? i : !0
    )
  );
}
function as(e) {
  return Je(e, w.IsSpeakingChanged).pipe(
    A(([t]) => t)
  );
}
function cs(e, t = {}) {
  var n;
  let r;
  const i = new k((c) => (r = c, () => a.unsubscribe())).pipe(D(Array.from(e.remoteParticipants.values()))), o = (n = t.additionalRoomEvents) != null ? n : Cn, s = Array.from(
    /* @__PURE__ */ new Set([
      y.ParticipantConnected,
      y.ParticipantDisconnected,
      y.ConnectionStateChanged,
      ...o
    ])
  ), a = le(e, ...s).subscribe(
    (c) => r == null ? void 0 : r.next(Array.from(c.remoteParticipants.values()))
  );
  return e.remoteParticipants.size > 0 && (r == null || r.next(Array.from(e.remoteParticipants.values()))), i;
}
function us(e, t, n = {}) {
  var r;
  const i = (r = n.additionalEvents) != null ? r : Pn;
  return le(
    e,
    y.ParticipantConnected,
    y.ParticipantDisconnected,
    y.ConnectionStateChanged
  ).pipe(
    En((s) => {
      const a = s.getParticipantByIdentity(t);
      return a ? we(a, ...i) : new k((c) => c.next(void 0));
    }),
    D(e.getParticipantByIdentity(t))
  );
}
function ls(e) {
  return Je(
    e,
    w.ParticipantPermissionsChanged
  ).pipe(
    A(() => e.permissions),
    D(e.permissions)
  );
}
function fs(e, { kind: t, identity: n }, r = {}) {
  var i;
  const o = (i = r.additionalEvents) != null ? i : Pn, s = (c) => {
    let u = !0;
    return t && (u = u && c.kind === t), n && (u = u && c.identity === n), u;
  };
  return le(
    e,
    y.ParticipantConnected,
    y.ParticipantDisconnected,
    y.ConnectionStateChanged
  ).pipe(
    En((c) => {
      const u = Array.from(c.remoteParticipants.values()).find(
        (l) => s(l)
      );
      return u ? we(u, ...o) : new k((l) => l.next(void 0));
    }),
    D(Array.from(e.remoteParticipants.values()).find((c) => s(c)))
  );
}
function ds(e) {
  return typeof e > "u" ? new k() : Je(e, w.AttributesChanged).pipe(
    A(([t]) => ({
      changed: t,
      attributes: e.attributes
    })),
    D({ changed: e.attributes, attributes: e.attributes })
  );
}
function ps(e, t, n, r, i) {
  const { localParticipant: o } = t, s = (f, h) => {
    let d = !1;
    switch (f) {
      case R.Source.Camera:
        d = h.isCameraEnabled;
        break;
      case R.Source.Microphone:
        d = h.isMicrophoneEnabled;
        break;
      case R.Source.ScreenShare:
        d = h.isScreenShareEnabled;
        break;
    }
    return d;
  }, a = In(o).pipe(
    A((f) => s(e, f.participant)),
    D(s(e, o))
  ), c = new J(), u = (f, h) => V(this, null, function* () {
    try {
      switch (h ?? (h = n), c.next(!0), e) {
        case R.Source.Camera:
          return yield o.setCameraEnabled(
            f ?? !o.isCameraEnabled,
            h,
            r
          ), o.isCameraEnabled;
        case R.Source.Microphone:
          return yield o.setMicrophoneEnabled(
            f ?? !o.isMicrophoneEnabled,
            h,
            r
          ), o.isMicrophoneEnabled;
        case R.Source.ScreenShare:
          return yield o.setScreenShareEnabled(
            f ?? !o.isScreenShareEnabled,
            h,
            r
          ), o.isScreenShareEnabled;
        default:
          throw new TypeError("Tried to toggle unsupported source");
      }
    } catch (d) {
      if (i && d instanceof Error) {
        i == null || i(d);
        return;
      } else
        throw d;
    } finally {
      c.next(!1);
    }
  });
  return {
    className: F("button"),
    toggle: u,
    enabledObserver: a,
    pendingObserver: c.asObservable()
  };
}
function hs() {
  let e = !1;
  const t = new J(), n = new J(), r = (o) => V(this, null, function* () {
    n.next(!0), e = o ?? !e, t.next(e), n.next(!1);
  });
  return {
    className: F("button"),
    toggle: r,
    enabledObserver: t.asObservable(),
    pendingObserver: n.asObservable()
  };
}
function vs(e, t, n) {
  const r = new ln(void 0), i = lo(t, e), o = (a, ...c) => V(this, [a, ...c], function* (u, l = {}) {
    var f, h, d;
    if (t) {
      _.debug(`Switching active device of kind "${e}" with id ${u}.`), yield t.switchActiveDevice(e, u, l.exact);
      const m = (f = t.getActiveDevice(e)) != null ? f : u;
      m !== u && u !== "default" && _.info(
        `We tried to select the device with id (${u}), but the browser decided to select the device with id (${m}) instead.`
      );
      let p;
      e === "audioinput" ? p = (h = t.localParticipant.getTrackPublication(R.Source.Microphone)) == null ? void 0 : h.track : e === "videoinput" && (p = (d = t.localParticipant.getTrackPublication(R.Source.Camera)) == null ? void 0 : d.track);
      const b = u === "default" && !p || u === "default" && (p == null ? void 0 : p.mediaStreamTrack.label.startsWith("Default"));
      r.next(b ? u : m);
    }
  });
  return {
    className: F("media-device-select"),
    activeDeviceObservable: i,
    setActiveMediaDevice: o
  };
}
function ms(e) {
  const t = (r) => {
    e.disconnect(r);
  };
  return { className: F("disconnect-button"), disconnect: t };
}
function bs(e) {
  const t = F("connection-quality"), n = po(e);
  return { className: t, connectionQualityObserver: n };
}
function gs(e) {
  let t = "track-muted-indicator-camera";
  switch (e.source) {
    case R.Source.Camera:
      t = "track-muted-indicator-camera";
      break;
    case R.Source.Microphone:
      t = "track-muted-indicator-microphone";
      break;
  }
  const n = F(t), r = ho(e);
  return { className: n, mediaMutedObserver: r };
}
function ys(e) {
  return { className: "lk-participant-name", infoObserver: fo(e) };
}
function ws() {
  return {
    className: F("participant-tile")
  };
}
var vo = {
  CHAT: "lk.chat"
}, mo = {
  CHAT: "lk-chat-topic"
};
function Mn(e, t) {
  return V(this, arguments, function* (n, r, i = {}) {
    const { reliable: o, destinationIdentities: s, topic: a } = i;
    yield n.publishData(r, {
      destinationIdentities: s,
      topic: a,
      reliable: o
    });
  });
}
function bo(e, t, n) {
  const r = Array.isArray(t) ? t : [t], i = ao(e).pipe(
    Qe(
      ([, , , c]) => t === void 0 || c !== void 0 && r.includes(c)
    ),
    A(([c, u, , l]) => {
      const f = {
        payload: c,
        topic: l,
        from: u
      };
      return n == null || n(f), f;
    })
  );
  let o;
  const s = new k((c) => {
    o = c;
  });
  return { messageObservable: i, isSendingObservable: s, send: (c, ...u) => V(this, [c, ...u], function* (l, f = {}) {
    o.next(!0);
    try {
      yield Mn(e.localParticipant, l, Z({ topic: r[0] }, f));
    } finally {
      o.next(!1);
    }
  }) };
}
var Ie = /* @__PURE__ */ new WeakMap();
function go(e) {
  return e.ignoreLegacy == !0;
}
var yo = (e) => JSON.parse(new TextDecoder().decode(e)), wo = (e) => new TextEncoder().encode(JSON.stringify(e));
function xs(e, t) {
  var n, r, i, o, s, a;
  const c = () => {
    var g, S, C;
    return ((g = e.serverInfo) == null ? void 0 : g.edition) === 1 || !!((S = e.serverInfo) != null && S.version) && zn((C = e.serverInfo) == null ? void 0 : C.version, "1.8.2") > 0;
  }, u = new J(), l = (n = t == null ? void 0 : t.channelTopic) != null ? n : vo.CHAT, f = (r = t == null ? void 0 : t.channelTopic) != null ? r : mo.CHAT;
  let h = !1;
  Ie.has(e) || (h = !0);
  const d = (i = Ie.get(e)) != null ? i : /* @__PURE__ */ new Map(), m = (o = d.get(l)) != null ? o : new J();
  d.set(l, m), Ie.set(e, d);
  const p = (s = t == null ? void 0 : t.messageDecoder) != null ? s : yo;
  if (h) {
    e.registerTextStreamHandler(l, (S, C) => V(this, null, function* () {
      const { id: $, timestamp: I } = S.info;
      Ge(S).pipe(
        ct((T, L) => T + L),
        A((T) => ({
          id: $,
          timestamp: I,
          message: T,
          from: e.getParticipantByIdentity(C.identity)
          // editTimestamp: type === 'update' ? timestamp : undefined,
        }))
      ).subscribe({
        next: (T) => m.next(T)
      });
    }));
    const { messageObservable: g } = bo(e, [f]);
    g.pipe(
      A((S) => {
        const C = p(S.payload);
        return go(C) ? void 0 : Ee(Z({}, C), { from: S.from });
      }),
      Qe((S) => !!S),
      Nt(u)
    ).subscribe(m);
  }
  const b = m.pipe(
    ct((g, S) => {
      if ("id" in S && g.find((C) => {
        var $, I;
        return (($ = C.from) == null ? void 0 : $.identity) === ((I = S.from) == null ? void 0 : I.identity) && C.id === S.id;
      })) {
        const C = g.findIndex(($) => $.id === S.id);
        if (C > -1) {
          const $ = g[C];
          g[C] = Ee(Z({}, S), {
            timestamp: $.timestamp,
            editTimestamp: S.timestamp
          });
        }
        return [...g];
      }
      return [...g, S];
    }, []),
    Nt(u)
  ), v = new ln(!1), x = (a = t == null ? void 0 : t.messageEncoder) != null ? a : wo, E = (g, S) => V(this, null, function* () {
    var C;
    S || (S = {}), (C = S.topic) != null || (S.topic = l), v.next(!0);
    try {
      const I = {
        id: (yield e.localParticipant.sendText(g, S)).id,
        timestamp: Date.now(),
        message: g,
        from: e.localParticipant,
        attachedFiles: S.attachments
      };
      m.next(I);
      const z = x(Ee(Z({}, I), {
        ignoreLegacy: c()
      }));
      return yield Mn(e.localParticipant, z, {
        reliable: !0,
        topic: f
      }), I;
    } finally {
      v.next(!1);
    }
  });
  function P() {
    u.next(), u.complete(), m.complete(), Ie.delete(e), e.unregisterTextStreamHandler(l);
  }
  return e.once(y.Disconnected, P), {
    messageObservable: b,
    isSendingObservable: v,
    send: E
  };
}
function Ss() {
  const e = (n) => V(this, null, function* () {
    _.info("Start Audio for room: ", n), yield n.startAudio();
  });
  return { className: F("start-audio-button"), roomAudioPlaybackAllowedObservable: co, handleStartAudioPlayback: e };
}
function Es() {
  const e = (n) => V(this, null, function* () {
    _.info("Start Video for room: ", n), yield n.startVideo();
  });
  return { className: F("start-audio-button"), roomVideoPlaybackAllowedObservable: uo, handleStartVideoPlayback: e };
}
function Ts() {
  return { className: [F("button"), F("chat-toggle")].join(" ") };
}
function Cs() {
  return { className: [F("button"), F("focus-toggle-button")].join(" ") };
}
function Ps() {
  return { className: "lk-clear-pin-button lk-button" };
}
function Os() {
  return { className: "lk-room-container" };
}
function Vt(e, t, n = !0) {
  const i = [e.localParticipant, ...Array.from(e.remoteParticipants.values())], o = [];
  return i.forEach((s) => {
    t.forEach((a) => {
      const c = Array.from(
        s.trackPublications.values()
      ).filter(
        (u) => u.source === a && // either return all or only the ones that are subscribed
        (!n || u.track)
      ).map((u) => ({
        participant: s,
        publication: u,
        source: u.source
      }));
      o.push(...c);
    });
  }), { trackReferences: o, participants: i };
}
function Ht(e, t, n = !1) {
  const { sources: r, kind: i, name: o } = t;
  return Array.from(e.trackPublications.values()).filter(
    (a) => (!r || r.includes(a.source)) && (!i || a.kind === i) && (!o || a.trackName === o) && // either return all or only the ones that are subscribed
    (!n || a.track)
  ).map((a) => ({
    participant: e,
    publication: a,
    source: a.source
  }));
}
function As(e, t, n) {
  var r, i;
  const o = (r = n.additionalRoomEvents) != null ? r : Cn, s = (i = n.onlySubscribed) != null ? i : !0, a = Array.from(
    (/* @__PURE__ */ new Set([
      y.ParticipantConnected,
      y.ParticipantDisconnected,
      y.ConnectionStateChanged,
      y.LocalTrackPublished,
      y.LocalTrackUnpublished,
      y.TrackPublished,
      y.TrackUnpublished,
      y.TrackSubscriptionStatusChanged,
      ...o
    ])).values()
  );
  return le(e, ...a).pipe(
    A((u) => {
      const l = Vt(u, t, s);
      return _.debug(`TrackReference[] was updated. (length ${l.trackReferences.length})`, l), l;
    }),
    D(Vt(e, t, s))
  );
}
function ks(e, t) {
  return we(e, ...zi).pipe(
    A((r) => {
      const i = Ht(r, t);
      return _.debug(`TrackReference[] was updated. (length ${i.length})`, i), i;
    }),
    D(Ht(e, t))
  );
}
function Rn(e, t) {
  return new k((r) => {
    const i = (...s) => {
      r.next(s);
    };
    return e.on(t, i), () => {
      e.off(t, i);
    };
  });
}
function Ls(e) {
  return Rn(e, Yt.TranscriptionReceived);
}
function _s(e) {
  return Rn(e, Yt.TimeSyncUpdate).pipe(
    A(([t]) => t)
  );
}
function Is(e, t = 1e3) {
  if (e === null) return Dt(!1);
  const n = at(e, "mousemove", { passive: !0 }).pipe(A(() => !0)), r = n.pipe(
    hi({
      each: t,
      with: () => We(Dt(!1), r.pipe(Mi(n)))
    }),
    ki()
  );
  return r;
}
function xo(e, t) {
  if (typeof localStorage > "u") {
    _.error("Local storage is not available.");
    return;
  }
  try {
    if (t) {
      const n = Object.fromEntries(
        Object.entries(t).filter(([, r]) => r !== "")
      );
      localStorage.setItem(e, JSON.stringify(n));
    }
  } catch (n) {
    _.error(`Error setting item to local storage: ${n}`);
  }
}
function So(e) {
  if (typeof localStorage > "u") {
    _.error("Local storage is not available.");
    return;
  }
  try {
    const t = localStorage.getItem(e);
    if (!t) {
      _.warn(`Item with key ${e} does not exist in local storage.`);
      return;
    }
    return JSON.parse(t);
  } catch (t) {
    _.error(`Error getting item from local storage: ${t}`);
    return;
  }
}
function Eo(e) {
  return {
    load: () => So(e),
    save: (t) => xo(e, t)
  };
}
var To = `${Tn}-user-choices`, Se = {
  videoEnabled: !0,
  audioEnabled: !0,
  videoDeviceId: "default",
  audioDeviceId: "default",
  username: ""
}, { load: Co, save: Po } = Eo(To);
function Ms(e, t = !1) {
  t !== !0 && Po(e);
}
function Rs(e, t = !1) {
  var n, r, i, o, s;
  const a = {
    videoEnabled: (n = e == null ? void 0 : e.videoEnabled) != null ? n : Se.videoEnabled,
    audioEnabled: (r = e == null ? void 0 : e.audioEnabled) != null ? r : Se.audioEnabled,
    videoDeviceId: (i = e == null ? void 0 : e.videoDeviceId) != null ? i : Se.videoDeviceId,
    audioDeviceId: (o = e == null ? void 0 : e.audioDeviceId) != null ? o : Se.audioDeviceId,
    username: (s = e == null ? void 0 : e.username) != null ? s : Se.username
  };
  if (t)
    return a;
  {
    const c = Co();
    return Z(Z({}, a), c ?? {});
  }
}
var nt = null, rt = null, Oo = 0;
function zt() {
  return nt || (nt = /* @__PURE__ */ new Map()), nt;
}
function Ao() {
  return rt || (rt = /* @__PURE__ */ new WeakMap()), rt;
}
function ko(e, t) {
  const n = Ao();
  let r = n.get(e);
  return r || (r = `room_${Oo++}`, n.set(e, r)), `${r}:${t}`;
}
function Ds(e, t) {
  const n = ko(e, t), r = zt(), i = r.get(n);
  if (i)
    return i;
  const o = new J(), s = [];
  e.registerTextStreamHandler(t, (c, u) => V(this, null, function* () {
    Ge(c).pipe(
      ct((f, h) => f + h, "")
    ).subscribe((f) => {
      const h = s.findIndex((d) => d.streamInfo.id === c.info.id);
      h !== -1 ? (s[h] = Ee(Z({}, s[h]), {
        text: f
      }), o.next([...s])) : (s.push({
        text: f,
        participantInfo: u,
        streamInfo: c.info
      }), o.next([...s]));
    });
  }));
  const a = o.asObservable().pipe(Ii());
  return r.set(n, a), e.once(y.Disconnected, () => {
    o.complete(), zt().delete(n);
  }), a;
}
function Dn(e, t) {
  if (t.msg === "show_chat")
    return { ...e, showChat: !0, unreadMessages: 0 };
  if (t.msg === "hide_chat")
    return { ...e, showChat: !1 };
  if (t.msg === "toggle_chat") {
    const n = { ...e, showChat: !e.showChat };
    return n.showChat === !0 && (n.unreadMessages = 0), n;
  } else return t.msg === "unread_msg" ? { ...e, unreadMessages: t.count } : t.msg === "toggle_settings" ? { ...e, showSettings: !e.showSettings } : { ...e };
}
function $n(e, t) {
  return t.msg === "set_pin" ? [t.trackReference] : t.msg === "clear_pin" ? [] : { ...e };
}
const Nn = M.createContext(void 0);
function $s() {
  const e = M.useContext(Nn);
  if (!e)
    throw Error("Tried to access LayoutContext context outside a LayoutContextProvider provider.");
  return e;
}
function Ns(e) {
  const t = Lo();
  if (e ?? (e = t), !e)
    throw Error("Tried to access LayoutContext context outside a LayoutContextProvider provider.");
  return e;
}
function Fs() {
  const [e, t] = M.useReducer($n, On), [n, r] = M.useReducer(Dn, An);
  return {
    pin: { dispatch: t, state: e },
    widget: { dispatch: r, state: n }
  };
}
function Us(e) {
  const [t, n] = M.useReducer($n, On), [r, i] = M.useReducer(Dn, An);
  return e ?? {
    pin: { dispatch: n, state: t },
    widget: { dispatch: i, state: r }
  };
}
function Lo() {
  return M.useContext(Nn);
}
const Fn = M.createContext(
  void 0
);
function js() {
  const e = M.useContext(Fn);
  if (!e)
    throw Error("tried to access track context outside of track context provider");
  return e;
}
function Un() {
  return M.useContext(Fn);
}
function Ws(e) {
  const t = Un(), n = e ?? t;
  if (!n)
    throw new Error(
      "No TrackRef, make sure you are inside a TrackRefContext or pass the TrackRef explicitly"
    );
  return n;
}
const jn = M.createContext(void 0);
function Bs() {
  const e = M.useContext(jn);
  if (!e)
    throw Error("tried to access participant context outside of participant context provider");
  return e;
}
function _o() {
  return M.useContext(jn);
}
function Vs(e) {
  const t = _o(), n = Un(), r = e ?? t ?? (n == null ? void 0 : n.participant);
  if (!r)
    throw new Error(
      "No participant provided, make sure you are inside a participant context or pass the participant explicitly"
    );
  return r;
}
const Wn = M.createContext(void 0);
function Hs() {
  const e = M.useContext(Wn);
  if (!e)
    throw Error("tried to access room context outside of livekit room component");
  return e;
}
function Io() {
  return M.useContext(Wn);
}
function zs(e) {
  const t = Io(), n = e ?? t;
  if (!n)
    throw new Error(
      "No room provided, make sure you are inside a Room context or pass the room explicitly"
    );
  return n;
}
const Mo = M.createContext(void 0);
function Ys(e) {
  const t = M.useContext(Mo);
  if (e === !0) {
    if (t)
      return t;
    throw Error("tried to access feature context, but none is present");
  }
  return t;
}
export {
  Ms as $,
  Zo as A,
  _o as B,
  fo as C,
  ws as D,
  cs as E,
  Ns as F,
  Yo as G,
  us as H,
  fs as I,
  ns as J,
  rs as K,
  Mo as L,
  Xo as M,
  Ss as N,
  Es as O,
  Ts as P,
  gs as Q,
  Wn as R,
  ps as S,
  hs as T,
  Gi as U,
  As as V,
  Qo as W,
  Bt as X,
  es as Y,
  xs as Z,
  Rs as _,
  $s as a,
  os as a0,
  W as a1,
  ks as a2,
  _s as a3,
  Ls as a4,
  Go as a5,
  Ko as a6,
  ds as a7,
  ss as a8,
  Ds as a9,
  Un as aa,
  Nn as ab,
  ys as ac,
  Do as ad,
  Or as ae,
  jn as af,
  Fn as ag,
  Ys as ah,
  Is as ai,
  Fo as aj,
  Us as ak,
  Vo as al,
  Bo as am,
  jo as an,
  Wo as ao,
  qo as ap,
  Fs as aq,
  $o as ar,
  Uo as as,
  Ho as at,
  zo as au,
  Bs as av,
  js as aw,
  Ps as b,
  Vs as c,
  bs as d,
  ts as e,
  Hs as f,
  bo as g,
  ms as h,
  Ws as i,
  Lo as j,
  Cs as k,
  _ as l,
  No as m,
  qi as n,
  ho as o,
  N as p,
  as as q,
  co as r,
  Os as s,
  In as t,
  zs as u,
  ls as v,
  Io as w,
  is as x,
  vs as y,
  Jo as z
};
//# sourceMappingURL=contexts-CPsnPrz2.mjs.map

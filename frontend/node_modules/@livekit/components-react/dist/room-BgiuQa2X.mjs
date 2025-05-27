import * as i from "react";
import { l as u, s as K, R as x, L as V } from "./contexts-CPsnPrz2.mjs";
import { Room as j, RoomEvent as l, MediaDeviceFailure as U } from "livekit-client";
function L(n) {
  var e, o, t = "";
  if (typeof n == "string" || typeof n == "number") t += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var r = n.length;
    for (e = 0; e < r; e++) n[e] && (o = L(n[e])) && (t && (t += " "), t += o);
  } else for (o in n) n[o] && (t && (t += " "), t += o);
  return t;
}
function A() {
  for (var n, e, o = 0, t = "", r = arguments.length; o < r; o++) (n = arguments[o]) && (e = L(n)) && (t && (t += " "), t += e);
  return t;
}
function _(...n) {
  return (...e) => {
    for (const o of n)
      if (typeof o == "function")
        try {
          o(...e);
        } catch (t) {
          console.error(t);
        }
  };
}
function M(...n) {
  const e = { ...n[0] };
  for (let o = 1; o < n.length; o++) {
    const t = n[o];
    for (const r in t) {
      const d = e[r], a = t[r];
      typeof d == "function" && typeof a == "function" && // This is a lot faster than a regex.
      r[0] === "o" && r[1] === "n" && r.charCodeAt(2) >= /* 'A' */
      65 && r.charCodeAt(2) <= /* 'Z' */
      90 ? e[r] = _(d, a) : (r === "className" || r === "UNSAFE_className") && typeof d == "string" && typeof a == "string" ? e[r] = A(d, a) : e[r] = a !== void 0 ? a : d;
    }
  }
  return e;
}
function I(n) {
  return n !== void 0;
}
function B(...n) {
  return M(...n.filter(I));
}
function G(n, e, o) {
  return i.Children.map(n, (t) => i.isValidElement(t) && i.Children.only(n) ? (t.props.class && (e ?? (e = {}), e.class = A(t.props.class, e.class), e.style = { ...t.props.style, ...e.style }), i.cloneElement(t, { ...e, key: o })) : t);
}
function H(n) {
  var e, o;
  if (typeof window < "u" && typeof process < "u" && // eslint-disable-next-line turbo/no-undeclared-env-vars
  (((e = process == null ? void 0 : process.env) == null ? void 0 : e.NODE_ENV) === "dev" || // eslint-disable-next-line turbo/no-undeclared-env-vars
  ((o = process == null ? void 0 : process.env) == null ? void 0 : o.NODE_ENV) === "development")) {
    const t = document.querySelector(".lk-room-container");
    t && !getComputedStyle(t).getPropertyValue("--lk-has-imported-styles") && u.warn(
      "It looks like you're not using the `@livekit/components-styles package`. To render the UI with the default styling, please import it in your layout or page."
    );
  }
}
function J(n, e) {
  return n === "processor" && e && typeof e == "object" && "name" in e ? e.name : n === "e2ee" && e ? "e2ee-enabled" : e;
}
const T = {
  connect: !0,
  audio: !1,
  video: !1
};
function q(n) {
  const {
    token: e,
    serverUrl: o,
    options: t,
    room: r,
    connectOptions: d,
    connect: a,
    audio: p,
    video: y,
    screen: g,
    onConnected: v,
    onDisconnected: h,
    onError: c,
    onMediaDeviceFailure: b,
    onEncryptionError: E,
    simulateParticipants: w,
    ...P
  } = { ...T, ...n };
  t && r && u.warn(
    "when using a manually created room, the options object will be ignored. set the desired options directly when creating the room instead."
  );
  const [s, O] = i.useState(), C = i.useRef(a);
  i.useEffect(() => {
    O(r ?? new j(t));
  }, [r, JSON.stringify(t, J)]);
  const F = i.useMemo(() => {
    const { className: m } = K();
    return M(P, { className: m });
  }, [P]);
  return i.useEffect(() => {
    if (!s) return;
    const m = () => {
      const f = s.localParticipant;
      u.debug("trying to publish local tracks"), Promise.all([
        f.setMicrophoneEnabled(!!p, typeof p != "boolean" ? p : void 0),
        f.setCameraEnabled(!!y, typeof y != "boolean" ? y : void 0),
        f.setScreenShareEnabled(!!g, typeof g != "boolean" ? g : void 0)
      ]).catch((R) => {
        u.warn(R), c == null || c(R);
      });
    }, S = (f) => {
      const R = U.getFailure(f);
      b == null || b(R);
    }, k = (f) => {
      E == null || E(f);
    }, N = (f) => {
      h == null || h(f);
    }, D = () => {
      v == null || v();
    };
    return s.on(l.SignalConnected, m).on(l.MediaDevicesError, S).on(l.EncryptionError, k).on(l.Disconnected, N).on(l.Connected, D), () => {
      s.off(l.SignalConnected, m).off(l.MediaDevicesError, S).off(l.EncryptionError, k).off(l.Disconnected, N).off(l.Connected, D);
    };
  }, [
    s,
    p,
    y,
    g,
    c,
    E,
    b,
    v,
    h
  ]), i.useEffect(() => {
    if (s) {
      if (w) {
        s.simulateParticipants({
          participants: {
            count: w
          },
          publish: {
            audio: !0,
            useRealTracks: !0
          }
        });
        return;
      }
      if (a) {
        if (C.current = !0, u.debug("connecting"), !e) {
          u.debug("no token yet");
          return;
        }
        if (!o) {
          u.warn("no livekit url provided"), c == null || c(Error("no livekit url provided"));
          return;
        }
        s.connect(o, e, d).catch((m) => {
          u.warn(m), C.current === !0 && (c == null || c(m));
        });
      } else
        u.debug("disconnecting because connect is false"), C.current = !1, s.disconnect();
    }
  }, [
    a,
    e,
    JSON.stringify(d),
    s,
    c,
    o,
    w
  ]), i.useEffect(() => {
    if (s)
      return () => {
        u.info("disconnecting on onmount"), s.disconnect();
      };
  }, [s]), { room: s, htmlProps: F };
}
const Q = /* @__PURE__ */ i.forwardRef(function(e, o) {
  const { room: t, htmlProps: r } = q(e);
  return /* @__PURE__ */ i.createElement("div", { ref: o, ...r }, t && /* @__PURE__ */ i.createElement(x.Provider, { value: t }, /* @__PURE__ */ i.createElement(V.Provider, { value: e.featureFlags }, e.children)));
});
export {
  Q as L,
  B as a,
  G as c,
  M as m,
  J as r,
  q as u,
  H as w
};
//# sourceMappingURL=room-BgiuQa2X.mjs.map

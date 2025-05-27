import * as r from "react";
import { u as k, r as j, a as x, b as X, c as A, d as Y, e as Z, f as E, g as K, h as ee, i as R, j as te, k as ne, m as se, G as ae, n as re, o as ce, p as N, q as oe, t as ie, v as W, w as G, x as Q, y as ue, l as w, z as de, A as le, B as F, C as fe, D as pe, E as be, F as me, H as Se, I as ge, J as ve, K as he, M as B, N as Me, O as ye, P as Pe, Q as ke, S as Ee, T as Te, U as we, V as Ae, W as $, X as Ce, Y as Oe, Z as Ie, _ as De, $ as Le, a0 as Re, a1 as Ne, a2 as Fe, a3 as Ve, a4 as Be, a5 as ze, a6 as Ue, a7 as L, a8 as qe, a9 as _e } from "./contexts-CPsnPrz2.mjs";
import { m as T } from "./room-BgiuQa2X.mjs";
import { ConnectionQuality as Je, ConnectionState as C, LocalTrackPublication as xe, facingModeFromLocalTrack as We, Room as Ge, Track as v, createAudioAnalyser as V, ParticipantKind as z } from "livekit-client";
const Qe = (e) => {
  const t = r.useRef(e);
  return r.useEffect(() => {
    t.current = e;
  }), t;
};
function $e(e, t) {
  const n = je(), a = Qe(t);
  return r.useLayoutEffect(() => {
    let s = !1;
    const c = e.current;
    if (!c) return;
    function o(u, i) {
      s || a.current(u, i);
    }
    return n == null || n.subscribe(c, o), () => {
      s = !0, n == null || n.unsubscribe(c, o);
    };
  }, [e.current, n, a]), n == null ? void 0 : n.observer;
}
function He() {
  let e = !1, t = [];
  const n = /* @__PURE__ */ new Map();
  if (typeof window > "u")
    return;
  const a = new ResizeObserver((s, c) => {
    t = t.concat(s), e || window.requestAnimationFrame(() => {
      const o = /* @__PURE__ */ new Set();
      for (let u = 0; u < t.length; u++) {
        if (o.has(t[u].target)) continue;
        o.add(t[u].target);
        const i = n.get(t[u].target);
        i == null || i.forEach((d) => d(t[u], c));
      }
      t = [], e = !1;
    }), e = !0;
  });
  return {
    observer: a,
    subscribe(s, c) {
      a.observe(s);
      const o = n.get(s) ?? [];
      o.push(c), n.set(s, o);
    },
    unsubscribe(s, c) {
      const o = n.get(s) ?? [];
      if (o.length === 1) {
        a.unobserve(s), n.delete(s);
        return;
      }
      const u = o.indexOf(c);
      u !== -1 && o.splice(u, 1), n.set(s, o);
    }
  };
}
let D;
const je = () => D || (D = He()), Xe = (e) => {
  const [t, n] = r.useState({ width: 0, height: 0 });
  r.useLayoutEffect(() => {
    if (e.current) {
      const { width: s, height: c } = e.current.getBoundingClientRect();
      n({ width: s, height: c });
    }
  }, [e.current]);
  const a = r.useCallback(
    (s) => n(s.contentRect),
    []
  );
  return $e(e, a), t;
};
function b(e, t, n = !0) {
  const [a, s] = r.useState(t);
  return r.useEffect(() => {
    if (n && s(t), typeof window > "u" || !e) return;
    const c = e.subscribe(s);
    return () => c.unsubscribe();
  }, [e, n]), a;
}
function gt(e) {
  const t = (c) => typeof window < "u" ? window.matchMedia(c).matches : !1, [n, a] = r.useState(t(e));
  function s() {
    a(t(e));
  }
  return r.useEffect(() => {
    const c = window.matchMedia(e);
    return s(), c.addListener ? c.addListener(s) : c.addEventListener("change", s), () => {
      c.removeListener ? c.removeListener(s) : c.removeEventListener("change", s);
    };
  }, [e]), n;
}
function vt(e) {
  const t = k(e), n = r.useCallback(async () => {
    await t.startAudio();
  }, [t]), a = r.useMemo(
    () => j(t),
    [t]
  ), { canPlayAudio: s } = b(a, {
    canPlayAudio: t.canPlaybackAudio
  });
  return { canPlayAudio: s, startAudio: n };
}
function ht(e) {
  const { state: t, dispatch: n } = x().pin;
  return { buttonProps: r.useMemo(() => {
    const { className: s } = X();
    return T(e, {
      className: s,
      disabled: !(t != null && t.length),
      onClick: () => {
        n && n({ msg: "clear_pin" });
      }
    });
  }, [e, n, t]) };
}
function Mt(e = {}) {
  const t = A(e.participant), { className: n, connectionQualityObserver: a } = r.useMemo(
    () => Y(t),
    [t]
  ), s = b(a, Je.Unknown);
  return { className: n, quality: s };
}
function O(e) {
  const t = k(e), n = r.useMemo(() => Z(t), [t]);
  return b(n, t.state);
}
function yt(e, t) {
  const n = typeof e == "function" ? e : t, a = typeof e == "string" ? e : void 0, s = E(), { send: c, messageObservable: o, isSendingObservable: u } = r.useMemo(
    () => K(s, a, n),
    [s, a, n]
  ), i = b(o, void 0), d = b(u, !1);
  return {
    message: i,
    send: c,
    isSending: d
  };
}
function Pt(e) {
  const t = E(), n = O(t);
  return { buttonProps: r.useMemo(() => {
    const { className: s, disconnect: c } = ee(t);
    return T(e, {
      className: s,
      onClick: () => c(e.stopTracks ?? !0),
      disabled: n === C.Disconnected
    });
  }, [t, e, n]) };
}
function Ye(e) {
  if (e.publication instanceof xe) {
    const t = e.publication.track;
    if (t) {
      const { facingMode: n } = We(t);
      return n;
    }
  }
  return "undefined";
}
function kt({ trackRef: e, props: t }) {
  const n = R(e), a = te(), { className: s } = r.useMemo(() => ne(), []), c = r.useMemo(() => se(n, a == null ? void 0 : a.pin.state), [n, a == null ? void 0 : a.pin.state]);
  return { mergedProps: r.useMemo(
    () => T(t, {
      className: s,
      onClick: (u) => {
        var i, d, f, l, p;
        (i = t.onClick) == null || i.call(t, u), c ? (f = a == null ? void 0 : (d = a.pin).dispatch) == null || f.call(d, {
          msg: "clear_pin"
        }) : (p = a == null ? void 0 : (l = a.pin).dispatch) == null || p.call(l, {
          msg: "set_pin",
          trackReference: n
        });
      }
    }),
    [t, s, n, c, a == null ? void 0 : a.pin]
  ), inFocus: c };
}
function Et(e, t, n = {}) {
  const a = n.gridLayouts ?? ae, { width: s, height: c } = Xe(e), o = re(a, t, s, c);
  return r.useEffect(() => {
    e.current && o && (e.current.style.setProperty("--lk-col-count", o == null ? void 0 : o.columns.toString()), e.current.style.setProperty("--lk-row-count", o == null ? void 0 : o.rows.toString()));
  }, [e, o]), {
    layout: o,
    containerWidth: s,
    containerHeight: c
  };
}
function U(e, t = {}) {
  var u, i;
  const n = typeof e == "string" ? t.participant : e.participant, a = A(n), s = typeof e == "string" ? { participant: a, source: e } : e, [c, o] = r.useState(
    !!((u = s.publication) != null && u.isMuted || (i = a.getTrackPublication(s.source)) != null && i.isMuted)
  );
  return r.useEffect(() => {
    const d = ce(s).subscribe(o);
    return () => d.unsubscribe();
  }, [N(s)]), c;
}
function Ze(e) {
  const t = A(e), n = r.useMemo(() => oe(t), [t]);
  return b(n, t.isSpeaking);
}
function Ke(e = {}) {
  const t = k(e.room), [n, a] = r.useState(t.localParticipant), [s, c] = r.useState(
    n.isMicrophoneEnabled
  ), [o, u] = r.useState(
    n.isMicrophoneEnabled
  ), [i, d] = r.useState(
    n.lastMicrophoneError
  ), [f, l] = r.useState(n.lastCameraError), [p, S] = r.useState(
    n.isMicrophoneEnabled
  ), [g, m] = r.useState(
    void 0
  ), [y, h] = r.useState(void 0), P = (M) => {
    u(M.isCameraEnabled), c(M.isMicrophoneEnabled), S(M.isScreenShareEnabled), h(M.cameraTrack), m(M.microphoneTrack), d(M.participant.lastMicrophoneError), l(M.participant.lastCameraError), a(M.participant);
  };
  return r.useEffect(() => {
    const M = ie(t.localParticipant).subscribe(P);
    return () => M.unsubscribe();
  }, [t]), {
    isMicrophoneEnabled: s,
    isScreenShareEnabled: p,
    isCameraEnabled: o,
    microphoneTrack: g,
    cameraTrack: y,
    lastMicrophoneError: i,
    lastCameraError: f,
    localParticipant: n
  };
}
function Tt() {
  const e = E(), t = r.useMemo(
    () => W(e.localParticipant),
    [e]
  );
  return b(t, e.localParticipant.permissions);
}
function wt({
  kind: e,
  room: t,
  track: n,
  requestPermissions: a,
  onError: s
}) {
  const c = G(), o = r.useMemo(() => t ?? c ?? new Ge(), [t, c]), u = r.useMemo(
    () => Q(e, s, a),
    [e, a, s]
  ), i = b(u, []), [d, f] = r.useState(
    (o == null ? void 0 : o.getActiveDevice(e)) ?? "default"
  ), { className: l, activeDeviceObservable: p, setActiveMediaDevice: S } = r.useMemo(
    () => ue(e, o),
    [e, o, n]
  );
  return r.useEffect(() => {
    const g = p.subscribe((m) => {
      m && (w.info("setCurrentDeviceId", m), f(m));
    });
    return () => {
      g == null || g.unsubscribe();
    };
  }, [p]), { devices: i, className: l, activeDeviceId: d, setActiveMediaDevice: S };
}
function At({
  kind: e,
  onError: t
}) {
  const n = r.useMemo(
    () => Q(e, t),
    [e, t]
  );
  return b(n, []);
}
function et(e, t, n = {}) {
  const a = r.useRef([]), s = r.useRef(-1), c = t !== s.current, o = typeof n.customSortFunction == "function" ? n.customSortFunction(e) : de(e);
  let u = [...o];
  if (c === !1)
    try {
      u = le(a.current, o, t);
    } catch (i) {
      w.error("Error while running updatePages(): ", i);
    }
  return c ? a.current = o : a.current = u, s.current = t, u;
}
function Ct(e, t) {
  const [n, a] = r.useState(1), s = Math.max(Math.ceil(t.length / e), 1);
  n > s && a(s);
  const c = n * e, o = c - e, u = (l) => {
    a((p) => l === "next" ? p === s ? p : p + 1 : p === 1 ? p : p - 1);
  }, i = (l) => {
    l > s ? a(s) : l < 1 ? a(1) : a(l);
  }, f = et(t, e).slice(o, c);
  return {
    totalPageCount: s,
    nextPage: () => u("next"),
    prevPage: () => u("previous"),
    setPage: i,
    firstItemIndex: o,
    lastItemIndex: c,
    tracks: f,
    currentPage: n
  };
}
function Ot(e = {}) {
  let t = F();
  e.participant && (t = e.participant);
  const n = r.useMemo(() => fe(t), [t]), { identity: a, name: s, metadata: c } = b(n, {
    name: t == null ? void 0 : t.name,
    identity: t == null ? void 0 : t.identity,
    metadata: t == null ? void 0 : t.metadata
  });
  return { identity: a, name: s, metadata: c };
}
function It(e = {}) {
  const t = A(e.participant), n = r.useMemo(() => W(t), [t]);
  return b(n, t.permissions);
}
function Dt({
  trackRef: e,
  onParticipantClick: t,
  disableSpeakingIndicator: n,
  htmlProps: a
}) {
  const s = R(e), c = r.useMemo(() => {
    const { className: p } = pe();
    return T(a, {
      className: p,
      onClick: (S) => {
        var g;
        if ((g = a.onClick) == null || g.call(a, S), typeof t == "function") {
          const m = s.publication ?? s.participant.getTrackPublication(s.source);
          t({ participant: s.participant, track: m });
        }
      }
    });
  }, [
    a,
    t,
    s.publication,
    s.source,
    s.participant
  ]), o = s.participant.getTrackPublication(v.Source.Microphone), u = r.useMemo(() => ({
    participant: s.participant,
    source: v.Source.Microphone,
    publication: o
  }), [o, s.participant]), i = U(s), d = U(u), f = Ze(s.participant), l = Ye(s);
  return {
    elementProps: {
      "data-lk-audio-muted": d,
      "data-lk-video-muted": i,
      "data-lk-speaking": n === !0 ? !1 : f,
      "data-lk-local-participant": s.participant.isLocal,
      "data-lk-source": s.source,
      "data-lk-facing-mode": l,
      ...c
    }
  };
}
function H(e = {}) {
  const t = k(e.room), [n, a] = r.useState([]);
  return r.useEffect(() => {
    const s = be(t, {
      additionalRoomEvents: e.updateOnlyOn
    }).subscribe(a);
    return () => s.unsubscribe();
  }, [t, JSON.stringify(e.updateOnlyOn)]), n;
}
function Lt(e = {}) {
  const t = H(e), { localParticipant: n } = Ke(e);
  return r.useMemo(
    () => [n, ...t],
    [n, t]
  );
}
function Rt(e) {
  return e = me(e), r.useMemo(() => (e == null ? void 0 : e.pin.state) !== void 0 && e.pin.state.length >= 1 ? e.pin.state : [], [e.pin.state]);
}
function Nt(e, t = {}) {
  const n = E(), [a] = r.useState(t.updateOnlyOn), s = r.useMemo(() => typeof e == "string" ? Se(n, e, {
    additionalEvents: a
  }) : ge(n, e, {
    additionalEvents: a
  }), [n, JSON.stringify(e), a]), [c, o] = r.useState({
    p: void 0
  });
  return r.useEffect(() => {
    const u = s.subscribe((i) => o({ p: i }));
    return () => u.unsubscribe();
  }, [s]), c.p;
}
function Ft(e = {}) {
  const t = k(e.room), n = r.useMemo(() => ve(t), [t]), { name: a, metadata: s } = b(n, {
    name: t.name,
    metadata: t.metadata
  });
  return { name: a, metadata: s };
}
function tt() {
  const e = E(), t = r.useMemo(() => he(e), [e]);
  return b(t, e.activeSpeakers);
}
function Vt(e) {
  const [t, n] = r.useState(
    B(e)
  ), a = tt();
  return r.useEffect(() => {
    n(B(e));
  }, [a, e]), t;
}
function Bt({ room: e, props: t }) {
  const n = k(e), { className: a, roomAudioPlaybackAllowedObservable: s, handleStartAudioPlayback: c } = r.useMemo(
    () => Me(),
    []
  ), o = r.useMemo(
    () => s(n),
    [n, s]
  ), { canPlayAudio: u } = b(o, {
    canPlayAudio: n.canPlaybackAudio
  });
  return { mergedProps: r.useMemo(
    () => T(t, {
      className: a,
      onClick: () => {
        c(n);
      },
      style: { display: u ? "none" : "block" }
    }),
    [t, a, u, c, n]
  ), canPlayAudio: u };
}
function zt({ room: e, props: t }) {
  const n = k(e), { className: a, roomVideoPlaybackAllowedObservable: s, handleStartVideoPlayback: c } = r.useMemo(
    () => ye(),
    []
  ), o = r.useMemo(
    () => s(n),
    [n, s]
  ), { canPlayVideo: u } = b(o, {
    canPlayVideo: n.canPlaybackVideo
  });
  return { mergedProps: r.useMemo(
    () => T(t, {
      className: a,
      onClick: () => {
        c(n);
      },
      style: { display: u ? "none" : "block" }
    }),
    [t, a, u, c, n]
  ), canPlayVideo: u };
}
function Ut(e, t = {}) {
  const n = r.useRef(null), a = r.useRef(null), s = t.minSwipeDistance ?? 50, c = (i) => {
    a.current = null, n.current = i.targetTouches[0].clientX;
  }, o = (i) => {
    a.current = i.targetTouches[0].clientX;
  }, u = r.useCallback(() => {
    if (!n.current || !a.current)
      return;
    const i = n.current - a.current, d = i > s, f = i < -s;
    d && t.onLeftSwipe && t.onLeftSwipe(), f && t.onRightSwipe && t.onRightSwipe();
  }, [s, t]);
  r.useEffect(() => {
    const i = e.current;
    return i && (i.addEventListener("touchstart", c, { passive: !0 }), i.addEventListener("touchmove", o, { passive: !0 }), i.addEventListener("touchend", u, { passive: !0 })), () => {
      i && (i.removeEventListener("touchstart", c), i.removeEventListener("touchmove", o), i.removeEventListener("touchend", u));
    };
  }, [e, u]);
}
function qt({ props: e }) {
  const { dispatch: t, state: n } = x().widget, { className: a } = r.useMemo(() => Pe(), []);
  return { mergedProps: r.useMemo(() => T(e, {
    className: a,
    onClick: () => {
      t && t({ msg: "toggle_chat" });
    },
    "aria-pressed": n != null && n.showChat ? "true" : "false",
    "data-lk-unread-msgs": n ? n.unreadMessages < 10 ? n.unreadMessages.toFixed(0) : "9+" : "0"
  }), [e, a, t, n]) };
}
function _t(e, t, n = {}) {
  const [a, s] = r.useState(void 0);
  return r.useEffect(() => {
    var o;
    if (e === void 0)
      throw Error("token endpoint needs to be defined");
    if (((o = n.userInfo) == null ? void 0 : o.identity) === void 0)
      return;
    (async () => {
      w.debug("fetching token");
      const u = new URLSearchParams({ ...n.userInfo, roomName: t }), i = await fetch(`${e}?${u.toString()}`);
      if (!i.ok) {
        w.error(
          `Could not fetch token. Server responded with status ${i.status}: ${i.statusText}`
        );
        return;
      }
      const { accessToken: d } = await i.json();
      s(d);
    })();
  }, [e, t, JSON.stringify(n)]), a;
}
function Jt(e) {
  var c, o;
  const t = R(e), { className: n, mediaMutedObserver: a } = r.useMemo(
    () => ke(t),
    [N(t)]
  );
  return { isMuted: b(
    a,
    !!((c = t.publication) != null && c.isMuted || (o = t.participant.getTrackPublication(t.source)) != null && o.isMuted)
  ), className: n };
}
function xt({
  source: e,
  onChange: t,
  initialState: n,
  captureOptions: a,
  publishOptions: s,
  onDeviceError: c,
  ...o
}) {
  var P;
  const u = G(), i = (P = u == null ? void 0 : u.localParticipant) == null ? void 0 : P.getTrackPublication(e), d = r.useRef(!1), { toggle: f, className: l, pendingObserver: p, enabledObserver: S } = r.useMemo(
    () => u ? Ee(e, u, a, s, c) : Te(),
    [u, e, JSON.stringify(a), s]
  ), g = b(p, !1), m = b(S, n ?? !!(i != null && i.isEnabled));
  r.useEffect(() => {
    t == null || t(m, d.current), d.current = !1;
  }, [m, t]), r.useEffect(() => {
    n !== void 0 && (w.debug("forcing initial toggle state", e, n), f(n));
  }, []);
  const y = r.useMemo(() => T(o, { className: l }), [o, l]), h = r.useCallback(
    (M) => {
      var I;
      d.current = !0, f().catch(() => d.current = !1), (I = o.onClick) == null || I.call(o, M);
    },
    [o, f]
  );
  return {
    toggle: f,
    enabled: m,
    pending: g,
    track: i,
    buttonProps: {
      ...y,
      "aria-pressed": m,
      "data-lk-source": e,
      "data-lk-enabled": m,
      disabled: g,
      onClick: h
    }
  };
}
function Wt(e = [
  v.Source.Camera,
  v.Source.Microphone,
  v.Source.ScreenShare,
  v.Source.ScreenShareAudio,
  v.Source.Unknown
], t = {}) {
  const n = k(t.room), [a, s] = r.useState([]), [c, o] = r.useState([]), u = r.useMemo(() => e.map((d) => we(d) ? d.source : d), [JSON.stringify(e)]);
  return r.useEffect(() => {
    const d = Ae(n, u, {
      additionalRoomEvents: t.updateOnlyOn,
      onlySubscribed: t.onlySubscribed
    }).subscribe(({ trackReferences: f, participants: l }) => {
      w.debug("setting track bundles", f, l), s(f), o(l);
    });
    return () => d.unsubscribe();
  }, [
    n,
    JSON.stringify(t.onlySubscribed),
    JSON.stringify(t.updateOnlyOn),
    JSON.stringify(e)
  ]), r.useMemo(() => {
    if ($(e)) {
      const d = st(e, c), f = Array.from(a);
      return c.forEach((l) => {
        d.has(l.identity) && (d.get(l.identity) ?? []).forEach((S) => {
          if (a.find(
            ({ participant: m, publication: y }) => l.identity === m.identity && y.source === S
          ))
            return;
          w.debug(
            `Add ${S} placeholder for participant ${l.identity}.`
          );
          const g = {
            participant: l,
            source: S
          };
          f.push(g);
        });
      }), f;
    } else
      return a;
  }, [a, c, e]);
}
function nt(e, t) {
  const n = new Set(e);
  for (const a of t)
    n.delete(a);
  return n;
}
function st(e, t) {
  const n = /* @__PURE__ */ new Map();
  if ($(e)) {
    const a = e.filter((s) => s.withPlaceholder).map((s) => s.source);
    t.forEach((s) => {
      const c = s.getTrackPublications().map((u) => {
        var i;
        return (i = u.track) == null ? void 0 : i.source;
      }).filter((u) => u !== void 0), o = Array.from(
        nt(new Set(a), new Set(c))
      );
      o.length > 0 && n.set(s.identity, o);
    });
  }
  return n;
}
function at(e) {
  const [t, n] = r.useState(Ce(e)), { trackObserver: a } = r.useMemo(() => Oe(e), [e.participant.sid ?? e.participant.identity, e.source]);
  return r.useEffect(() => {
    const s = a.subscribe((c) => {
      n(c);
    });
    return () => s == null ? void 0 : s.unsubscribe();
  }, [a]), {
    participant: e.participant,
    source: e.source ?? v.Source.Unknown,
    publication: t
  };
}
function Gt(e, t) {
  const n = A(t);
  return at({ name: e, participant: n });
}
function Qt(e) {
  const t = E(), n = O(t), a = r.useMemo(
    () => n === C.Disconnected,
    [n]
  ), s = r.useMemo(
    () => Ie(t, e),
    [t, e, a]
  ), c = b(s.isSendingObservable, !1), o = b(s.messageObservable, []);
  return { send: s.send, chatMessages: o, isSending: c };
}
function $t(e = {}) {
  const [t, n] = r.useState(
    De(e.defaults, e.preventLoad ?? !1)
  ), a = r.useCallback((i) => {
    n((d) => ({ ...d, audioEnabled: i }));
  }, []), s = r.useCallback((i) => {
    n((d) => ({ ...d, videoEnabled: i }));
  }, []), c = r.useCallback((i) => {
    n((d) => ({ ...d, audioDeviceId: i }));
  }, []), o = r.useCallback((i) => {
    n((d) => ({ ...d, videoDeviceId: i }));
  }, []), u = r.useCallback((i) => {
    n((d) => ({ ...d, username: i }));
  }, []);
  return r.useEffect(() => {
    Le(t, e.preventSave ?? !1);
  }, [t, e.preventSave]), {
    userChoices: t,
    saveAudioInputEnabled: a,
    saveVideoInputEnabled: s,
    saveAudioInputDeviceId: c,
    saveVideoInputDeviceId: o,
    saveUsername: u
  };
}
function Ht(e, t = {}) {
  const n = A(e), a = k(t.room), s = r.useMemo(() => Re(a, n), [a, n]);
  return b(
    s,
    n.isLocal ? n.isE2EEEnabled : !!(n != null && n.isEncrypted)
  );
}
function jt(e, t = { fftSize: 32, smoothingTimeConstant: 0 }) {
  const n = Ne(e) ? e.publication.track : e, [a, s] = r.useState(0);
  return r.useEffect(() => {
    if (!n || !n.mediaStream)
      return;
    const { cleanup: c, analyser: o } = V(n, t), u = o.frequencyBinCount, i = new Uint8Array(u), f = setInterval(() => {
      o.getByteFrequencyData(i);
      let l = 0;
      for (let p = 0; p < i.length; p++) {
        const S = i[p];
        l += S * S;
      }
      s(Math.sqrt(l / i.length) / 255);
    }, 1e3 / 30);
    return () => {
      c(), clearInterval(f);
    };
  }, [n, n == null ? void 0 : n.mediaStream, JSON.stringify(t)]), a;
}
const rt = (e) => {
  const t = (n) => {
    let c = 1 - Math.max(-100, Math.min(-10, n)) * -1 / 100;
    return c = Math.sqrt(c), c;
  };
  return e.map((n) => n === -1 / 0 ? 0 : t(n));
}, ct = {
  bands: 5,
  loPass: 100,
  hiPass: 600,
  updateInterval: 32,
  analyserOptions: { fftSize: 2048 }
};
function Xt(e, t = {}) {
  var o;
  const n = e instanceof v ? e : (o = e == null ? void 0 : e.publication) == null ? void 0 : o.track, a = { ...ct, ...t }, [s, c] = r.useState(
    new Array(a.bands).fill(0)
  );
  return r.useEffect(() => {
    if (!n || !(n != null && n.mediaStream))
      return;
    const { analyser: u, cleanup: i } = V(n, a.analyserOptions), d = u.frequencyBinCount, f = new Float32Array(d), p = setInterval(() => {
      u.getFloatFrequencyData(f);
      let S = new Float32Array(f.length);
      for (let h = 0; h < f.length; h++)
        S[h] = f[h];
      S = S.slice(t.loPass, t.hiPass);
      const g = rt(S), m = Math.ceil(g.length / a.bands), y = [];
      for (let h = 0; h < a.bands; h++) {
        const P = g.slice(h * m, (h + 1) * m).reduce((M, I) => M += I, 0);
        y.push(P / m);
      }
      c(y);
    }, a.updateInterval);
    return () => {
      i(), clearInterval(p);
    };
  }, [n, n == null ? void 0 : n.mediaStream, JSON.stringify(t)]), s;
}
const ot = {
  barCount: 120,
  volMultiplier: 5,
  updateInterval: 20
};
function Yt(e, t = {}) {
  var f;
  const n = e instanceof v ? e : (f = e == null ? void 0 : e.publication) == null ? void 0 : f.track, a = { ...ot, ...t }, s = r.useRef(new Float32Array()), c = r.useRef(performance.now()), o = r.useRef(0), [u, i] = r.useState([]), d = r.useCallback((l) => {
    i(
      Array.from(
        ut(l, a.barCount).map((p) => Math.sqrt(p) * a.volMultiplier)
        // wave.slice(0, opts.barCount).map((v) => sigmoid(v * opts.volMultiplier, 0.08, 0.2)),
      )
    );
  }, []);
  return r.useEffect(() => {
    if (!n || !(n != null && n.mediaStream))
      return;
    const { analyser: l, cleanup: p } = V(n, {
      fftSize: q(a.barCount)
    }), S = q(a.barCount), g = new Float32Array(S), m = () => {
      if (y = requestAnimationFrame(m), l.getFloatTimeDomainData(g), s.current.map((h, P) => h + g[P]), o.current += 1, performance.now() - c.current >= a.updateInterval) {
        const h = g.map((P) => P / o.current);
        d(h), c.current = performance.now(), o.current = 0;
      }
    };
    let y = requestAnimationFrame(m);
    return () => {
      p(), cancelAnimationFrame(y);
    };
  }, [n, n == null ? void 0 : n.mediaStream, JSON.stringify(t), d]), {
    bars: u
  };
}
function q(e) {
  return e < 32 ? 32 : it(e);
}
function it(e) {
  let t = 2;
  for (; e >>= 1; )
    t <<= 1;
  return t;
}
function ut(e, t) {
  const n = Math.floor(e.length / t), a = new Float32Array(t);
  for (let s = 0; s < t; s++) {
    const c = n * s;
    let o = 0;
    for (let u = 0; u < n; u++)
      o = o + Math.abs(e[c + u]);
    a[s] = o / n;
  }
  return a;
}
function _(e, t) {
  const n = E(), a = F(), s = t ? n.getParticipantByIdentity(t) : a, c = r.useMemo(
    () => s ? Fe(s, { sources: e }) : void 0,
    [s == null ? void 0 : s.sid, s == null ? void 0 : s.identity, JSON.stringify(e)]
  );
  return b(c, []);
}
function dt(e) {
  var n, a, s;
  const t = r.useMemo(
    () => {
      var c;
      return (c = e == null ? void 0 : e.publication) != null && c.track ? Ve(e == null ? void 0 : e.publication.track) : void 0;
    },
    [(n = e == null ? void 0 : e.publication) == null ? void 0 : n.track]
  );
  return b(t, {
    timestamp: Date.now(),
    rtpTimestamp: (s = (a = e == null ? void 0 : e.publication) == null ? void 0 : a.track) == null ? void 0 : s.rtpTimestamp
  });
}
const lt = {
  bufferSize: 100
  // maxAge: 2_000,
};
function ft(e, t) {
  const n = { ...lt, ...t }, [a, s] = r.useState([]), c = dt(e), o = (u) => {
    var i;
    (i = n.onTranscription) == null || i.call(n, u), s(
      (d) => ze(
        d,
        // when first receiving a segment, add the current media timestamp to it
        u.map((f) => Ue(f, c)),
        n.bufferSize
      )
    );
  };
  return r.useEffect(() => {
    if (!(e != null && e.publication))
      return;
    const u = Be(e.publication).subscribe((i) => {
      o(...i);
    });
    return () => {
      u.unsubscribe();
    };
  }, [e && N(e), o]), { segments: a };
}
function pt(e = {}) {
  const t = F(), n = e.participant ?? t, a = r.useMemo(
    // weird typescript constraint
    () => n ? L(n) : L(n),
    [n]
  );
  return b(a, {
    attributes: n == null ? void 0 : n.attributes
  });
}
function Zt(e, t = {}) {
  const n = A(t.participant), [a, s] = r.useState(n.attributes[e]);
  return r.useEffect(() => {
    if (!n)
      return;
    const c = L(n).subscribe((o) => {
      o.changed[e] !== void 0 && s(o.attributes[e]);
    });
    return () => {
      c.unsubscribe();
    };
  }, [n, e]), a;
}
const J = "lk.agent.state";
function Kt() {
  const e = H(), t = e.find(
    (l) => l.kind === z.AGENT && !("lk.publish_on_behalf" in l.attributes)
  ), n = e.find(
    (l) => l.kind === z.AGENT && l.attributes["lk.publish_on_behalf"] === (t == null ? void 0 : t.identity)
  ), a = _(
    [v.Source.Microphone, v.Source.Camera],
    t == null ? void 0 : t.identity
  ), s = _(
    [v.Source.Microphone, v.Source.Camera],
    n == null ? void 0 : n.identity
  ), c = a.find((l) => l.source === v.Source.Microphone) ?? s.find((l) => l.source === v.Source.Microphone), o = a.find((l) => l.source === v.Source.Camera) ?? s.find((l) => l.source === v.Source.Camera), { segments: u } = ft(c), i = O(), { attributes: d } = pt({ participant: t }), f = r.useMemo(() => i === C.Disconnected ? "disconnected" : i === C.Connecting || !t || !(d != null && d[J]) ? "connecting" : d[J], [d, t, i]);
  return {
    agent: t,
    state: f,
    audioTrack: c,
    videoTrack: o,
    agentTranscriptions: u,
    agentAttributes: d
  };
}
function en(e) {
  const t = k(e), n = O(t), a = r.useMemo(() => qe(t), [t, n]);
  return b(a, t.isRecording);
}
function tn(e) {
  const t = E(), a = O(t) === C.Disconnected, s = r.useMemo(() => _e(t, e), [t, e]);
  return { textStreams: b(a ? void 0 : s, []) };
}
export {
  Tt as A,
  Rt as B,
  Ke as C,
  vt as D,
  yt as E,
  Ye as F,
  U as G,
  Ze as H,
  Ot as I,
  It as J,
  Lt as K,
  Nt as L,
  H as M,
  Vt as N,
  tt as O,
  _t as P,
  Gt as Q,
  jt as R,
  Yt as S,
  _ as T,
  ft as U,
  Kt as V,
  pt as W,
  Zt as X,
  en as Y,
  tn as Z,
  O as a,
  qt as b,
  Pt as c,
  kt as d,
  wt as e,
  Bt as f,
  zt as g,
  xt as h,
  Mt as i,
  b as j,
  Jt as k,
  Dt as l,
  Ht as m,
  Et as n,
  Ct as o,
  Ut as p,
  Xe as q,
  et as r,
  Xt as s,
  Wt as t,
  ht as u,
  Ft as v,
  Qt as w,
  $t as x,
  At as y,
  gt as z
};
//# sourceMappingURL=hooks-CWooKGw2.mjs.map

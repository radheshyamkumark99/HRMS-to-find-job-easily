import * as e from "react";
import { c as ie, w as oe, r as le, m as ue, a as G } from "./room-BgiuQa2X.mjs";
import { C as J, S as de, a as me, M as B, b as fe, T as R, c as he, d as pe, D as z, e as ge, f as H, L as Q, G as Ee, P as K, F as ve, g as Se, h as ke, R as be, i as Ce, j as we, k as ye, B as Ie } from "./components-3NBkfi42.mjs";
import { w as Me, x, y as Ne, z as Pe, A as X, t as Y, B as Te, C as Le } from "./hooks-CWooKGw2.mjs";
import { j as Z, an as Ae, ao as De, l as P, a as Re, ap as Ve, aq as Oe, a1 as q, ar as $e, as as Ue } from "./contexts-CPsnPrz2.mjs";
import { Track as y, facingModeFromLocalTrack as _e, Mutex as Fe, createLocalTracks as Be, createLocalVideoTrack as qe, VideoPresets as xe, createLocalAudioTrack as We, RoomEvent as je } from "livekit-client";
function ee({
  messageFormatter: o,
  messageDecoder: d,
  messageEncoder: l,
  channelTopic: n,
  ...E
}) {
  const p = e.useRef(null), m = e.useRef(null), u = e.useMemo(() => ({ messageDecoder: d, messageEncoder: l, channelTopic: n }), [d, l, n]), { chatMessages: s, send: I, isSending: t } = Me(u), h = Z(), r = e.useRef(0);
  async function v(c) {
    c.preventDefault(), m.current && m.current.value.trim() !== "" && (await I(m.current.value), m.current.value = "", m.current.focus());
  }
  return e.useEffect(() => {
    var c;
    p && ((c = p.current) == null || c.scrollTo({ top: p.current.scrollHeight }));
  }, [p, s]), e.useEffect(() => {
    var i, g, a, C, S;
    if (!h || s.length === 0)
      return;
    if ((i = h.widget.state) != null && i.showChat && s.length > 0 && r.current !== ((g = s[s.length - 1]) == null ? void 0 : g.timestamp)) {
      r.current = (a = s[s.length - 1]) == null ? void 0 : a.timestamp;
      return;
    }
    const c = s.filter(
      (A) => !r.current || A.timestamp > r.current
    ).length, { widget: f } = h;
    c > 0 && ((C = f.state) == null ? void 0 : C.unreadMessages) !== c && ((S = f.dispatch) == null || S.call(f, { msg: "unread_msg", count: c }));
  }, [s, h == null ? void 0 : h.widget]), /* @__PURE__ */ e.createElement("div", { ...E, className: "lk-chat" }, /* @__PURE__ */ e.createElement("div", { className: "lk-chat-header" }, "Messages", h && /* @__PURE__ */ e.createElement(J, { className: "lk-close-button" }, /* @__PURE__ */ e.createElement(de, null))), /* @__PURE__ */ e.createElement("ul", { className: "lk-list lk-chat-messages", ref: p }, E.children ? s.map(
    (c, f) => ie(E.children, {
      entry: c,
      key: c.id ?? f,
      messageFormatter: o
    })
  ) : s.map((c, f, i) => {
    const g = f >= 1 && i[f - 1].from === c.from, a = f >= 1 && c.timestamp - i[f - 1].timestamp < 6e4;
    return /* @__PURE__ */ e.createElement(
      me,
      {
        key: c.id ?? f,
        hideName: g,
        hideTimestamp: g === !1 ? !1 : a,
        entry: c,
        messageFormatter: o
      }
    );
  })), /* @__PURE__ */ e.createElement("form", { className: "lk-chat-form", onSubmit: v }, /* @__PURE__ */ e.createElement(
    "input",
    {
      className: "lk-form-control lk-chat-form-input",
      disabled: t,
      ref: m,
      type: "text",
      placeholder: "Enter a message...",
      onInput: (c) => c.stopPropagation(),
      onKeyDown: (c) => c.stopPropagation(),
      onKeyUp: (c) => c.stopPropagation()
    }
  ), /* @__PURE__ */ e.createElement("button", { type: "submit", className: "lk-button lk-chat-form-button", disabled: t }, "Send")));
}
function O({
  kind: o,
  initialSelection: d,
  onActiveDeviceChange: l,
  tracks: n,
  requestPermissions: E = !1,
  ...p
}) {
  const [m, u] = e.useState(!1), [s, I] = e.useState([]), [t, h] = e.useState(!0), [r, v] = e.useState(E), c = (a, C) => {
    P.debug("handle device change"), u(!1), l == null || l(a, C);
  }, f = e.useRef(null), i = e.useRef(null);
  e.useLayoutEffect(() => {
    m && v(!0);
  }, [m]), e.useLayoutEffect(() => {
    let a;
    return f.current && i.current && (s || t) && (a = Ae(f.current, i.current, (C, S) => {
      i.current && Object.assign(i.current.style, { left: `${C}px`, top: `${S}px` });
    })), h(!1), () => {
      a == null || a();
    };
  }, [f, i, s, t]);
  const g = e.useCallback(
    (a) => {
      i.current && a.target !== f.current && m && De(i.current, a) && u(!1);
    },
    [m, i, f]
  );
  return e.useEffect(() => (document.addEventListener("click", g), () => {
    document.removeEventListener("click", g);
  }), [g]), /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement(
    "button",
    {
      className: "lk-button lk-button-menu",
      "aria-pressed": m,
      ...p,
      onClick: () => u(!m),
      ref: f
    },
    p.children
  ), !p.disabled && /* @__PURE__ */ e.createElement(
    "div",
    {
      className: "lk-device-menu",
      ref: i,
      style: { visibility: m ? "visible" : "hidden" }
    },
    o ? /* @__PURE__ */ e.createElement(
      B,
      {
        initialSelection: d,
        onActiveDeviceChange: (a) => c(o, a),
        onDeviceListChange: I,
        kind: o,
        track: n == null ? void 0 : n[o],
        requestPermissions: r
      }
    ) : /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("div", { className: "lk-device-menu-heading" }, "Audio inputs"), /* @__PURE__ */ e.createElement(
      B,
      {
        kind: "audioinput",
        onActiveDeviceChange: (a) => c("audioinput", a),
        onDeviceListChange: I,
        track: n == null ? void 0 : n.audioinput,
        requestPermissions: r
      }
    ), /* @__PURE__ */ e.createElement("div", { className: "lk-device-menu-heading" }, "Video inputs"), /* @__PURE__ */ e.createElement(
      B,
      {
        kind: "videoinput",
        onActiveDeviceChange: (a) => c("videoinput", a),
        onDeviceListChange: I,
        track: n == null ? void 0 : n.videoinput,
        requestPermissions: r
      }
    ))
  ));
}
function W() {
  e.useEffect(() => {
    oe();
  }, []);
}
function Ke(o, d) {
  const [l, n] = e.useState(), E = e.useMemo(() => new Fe(), []);
  return e.useEffect(() => {
    let p = !1, m = [];
    return E.lock().then(async (u) => {
      try {
        (o.audio || o.video) && (m = await Be(o), p ? m.forEach((s) => s.stop()) : n(m));
      } catch (s) {
        d && s instanceof Error ? d(s) : P.error(s);
      } finally {
        u();
      }
    }), () => {
      p = !0, m.forEach((u) => {
        u.stop();
      });
    };
  }, [JSON.stringify(o, le), d, E]), l;
}
function Ze(o, d, l) {
  const [n, E] = e.useState(null), [p, m] = e.useState(!1), u = Ne({ kind: l }), [s, I] = e.useState(
    void 0
  ), [t, h] = e.useState(), [r, v] = e.useState(d);
  e.useEffect(() => {
    v(d);
  }, [d]);
  const c = async (g, a) => {
    try {
      const C = a === "videoinput" ? await qe({
        deviceId: g,
        resolution: xe.h720.resolution
      }) : await We({ deviceId: g }), S = await C.getDeviceId(!1);
      S && g !== S && (i.current = S, v(S)), h(C);
    } catch (C) {
      C instanceof Error && E(C);
    }
  }, f = async (g, a) => {
    await g.setDeviceId(a), i.current = a;
  }, i = e.useRef(r);
  return e.useEffect(() => {
    o && !t && !n && !p && (P.debug("creating track", l), m(!0), c(r, l).finally(() => {
      m(!1);
    }));
  }, [o, t, n, p]), e.useEffect(() => {
    t && (o ? s != null && s.deviceId && i.current !== (s == null ? void 0 : s.deviceId) ? (P.debug(`switching ${l} device from`, i.current, s.deviceId), f(t, s.deviceId)) : (P.debug(`unmuting local ${l} track`), t.unmute()) : (P.debug(`muting ${l} track`), t.mute().then(() => P.debug(t.mediaStreamTrack))));
  }, [t, s, o, l]), e.useEffect(() => () => {
    t && (P.debug(`stopping local ${l} track`), t.stop(), t.mute());
  }, []), e.useEffect(() => {
    I(u == null ? void 0 : u.find((g) => g.deviceId === r));
  }, [r, u]), {
    selectedDevice: s,
    localTrack: t,
    deviceError: n
  };
}
function et({
  defaults: o = {},
  onValidate: d,
  onSubmit: l,
  onError: n,
  debug: E,
  joinLabel: p = "Join Room",
  micLabel: m = "Microphone",
  camLabel: u = "Camera",
  userLabel: s = "Username",
  persistUserChoices: I = !0,
  videoProcessor: t,
  ...h
}) {
  const {
    userChoices: r,
    saveAudioInputDeviceId: v,
    saveAudioInputEnabled: c,
    saveVideoInputDeviceId: f,
    saveVideoInputEnabled: i,
    saveUsername: g
  } = x({
    defaults: o,
    preventSave: !I,
    preventLoad: !I
  }), [a, C] = e.useState(r), [S, A] = e.useState(a.audioEnabled), [w, L] = e.useState(a.videoEnabled), [T, $] = e.useState(a.audioDeviceId), [k, N] = e.useState(a.videoDeviceId), [V, ae] = e.useState(a.username);
  e.useEffect(() => {
    c(S);
  }, [S, c]), e.useEffect(() => {
    i(w);
  }, [w, i]), e.useEffect(() => {
    v(T);
  }, [T, v]), e.useEffect(() => {
    f(k);
  }, [k, f]), e.useEffect(() => {
    g(V);
  }, [V, g]);
  const D = Ke(
    {
      audio: S ? { deviceId: r.audioDeviceId } : !1,
      video: w ? { deviceId: r.videoDeviceId, processor: t } : !1
    },
    n
  ), U = e.useRef(null), M = e.useMemo(
    () => D == null ? void 0 : D.filter((b) => b.kind === y.Kind.Video)[0],
    [D]
  ), ne = e.useMemo(() => {
    if (M) {
      const { facingMode: b } = _e(M);
      return b;
    } else
      return "undefined";
  }, [M]), j = e.useMemo(
    () => D == null ? void 0 : D.filter((b) => b.kind === y.Kind.Audio)[0],
    [D]
  );
  e.useEffect(() => (U.current && M && (M.unmute(), M.attach(U.current)), () => {
    M == null || M.detach();
  }), [M]);
  const [se, ce] = e.useState(), _ = e.useCallback(
    (b) => typeof d == "function" ? d(b) : b.username !== "",
    [d]
  );
  e.useEffect(() => {
    const b = {
      username: V,
      videoEnabled: w,
      videoDeviceId: k,
      audioEnabled: S,
      audioDeviceId: T
    };
    C(b), ce(_(b));
  }, [V, w, _, S, T, k]);
  function re(b) {
    b.preventDefault(), _(a) ? typeof l == "function" && l(a) : P.warn("Validation failed with: ", a);
  }
  return W(), /* @__PURE__ */ e.createElement("div", { className: "lk-prejoin", ...h }, /* @__PURE__ */ e.createElement("div", { className: "lk-video-container" }, M && /* @__PURE__ */ e.createElement("video", { ref: U, width: "1280", height: "720", "data-lk-facing-mode": ne }), (!M || !w) && /* @__PURE__ */ e.createElement("div", { className: "lk-camera-off-note" }, /* @__PURE__ */ e.createElement(fe, null))), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-container" }, /* @__PURE__ */ e.createElement("div", { className: "lk-button-group audio" }, /* @__PURE__ */ e.createElement(
    R,
    {
      initialState: S,
      source: y.Source.Microphone,
      onChange: (b) => A(b)
    },
    m
  ), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ e.createElement(
    O,
    {
      initialSelection: T,
      kind: "audioinput",
      disabled: !j,
      tracks: { audioinput: j },
      onActiveDeviceChange: (b, F) => $(F)
    }
  ))), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group video" }, /* @__PURE__ */ e.createElement(
    R,
    {
      initialState: w,
      source: y.Source.Camera,
      onChange: (b) => L(b)
    },
    u
  ), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ e.createElement(
    O,
    {
      initialSelection: k,
      kind: "videoinput",
      disabled: !M,
      tracks: { videoinput: M },
      onActiveDeviceChange: (b, F) => N(F)
    }
  )))), /* @__PURE__ */ e.createElement("form", { className: "lk-username-container" }, /* @__PURE__ */ e.createElement(
    "input",
    {
      className: "lk-form-control",
      id: "username",
      name: "username",
      type: "text",
      defaultValue: V,
      placeholder: s,
      onChange: (b) => ae(b.target.value),
      autoComplete: "off"
    }
  ), /* @__PURE__ */ e.createElement(
    "button",
    {
      className: "lk-button lk-join-button",
      type: "submit",
      onClick: re,
      disabled: !se
    },
    p
  )), E && /* @__PURE__ */ e.createElement(e.Fragment, null, /* @__PURE__ */ e.createElement("strong", null, "User Choices:"), /* @__PURE__ */ e.createElement("ul", { className: "lk-list", style: { overflow: "hidden", maxWidth: "15rem" } }, /* @__PURE__ */ e.createElement("li", null, "Username: ", `${a.username}`), /* @__PURE__ */ e.createElement("li", null, "Video Enabled: ", `${a.videoEnabled}`), /* @__PURE__ */ e.createElement("li", null, "Audio Enabled: ", `${a.audioEnabled}`), /* @__PURE__ */ e.createElement("li", null, "Video Device: ", `${a.videoDeviceId}`), /* @__PURE__ */ e.createElement("li", null, "Audio Device: ", `${a.audioDeviceId}`))));
}
function Ge({ props: o }) {
  const { dispatch: d, state: l } = Re().widget, n = "lk-button lk-settings-toggle";
  return { mergedProps: e.useMemo(() => ue(o, {
    className: n,
    onClick: () => {
      d && d({ msg: "toggle_settings" });
    },
    "aria-pressed": l != null && l.showSettings ? "true" : "false"
  }), [o, n, d, l]) };
}
const Je = /* @__PURE__ */ e.forwardRef(
  function(d, l) {
    const { mergedProps: n } = Ge({ props: d });
    return /* @__PURE__ */ e.createElement("button", { ref: l, ...n }, d.children);
  }
);
function te({
  variation: o,
  controls: d,
  saveUserChoices: l = !0,
  onDeviceError: n,
  ...E
}) {
  var $;
  const [p, m] = e.useState(!1), u = Z();
  e.useEffect(() => {
    var k, N;
    ((k = u == null ? void 0 : u.widget.state) == null ? void 0 : k.showChat) !== void 0 && m((N = u == null ? void 0 : u.widget.state) == null ? void 0 : N.showChat);
  }, [($ = u == null ? void 0 : u.widget.state) == null ? void 0 : $.showChat]);
  const I = Pe(`(max-width: ${p ? 1e3 : 760}px)`) ? "minimal" : "verbose";
  o ?? (o = I);
  const t = { leave: !0, ...d }, h = X();
  h ? (t.camera ?? (t.camera = h.canPublish), t.microphone ?? (t.microphone = h.canPublish), t.screenShare ?? (t.screenShare = h.canPublish), t.chat ?? (t.chat = h.canPublishData && (d == null ? void 0 : d.chat))) : (t.camera = !1, t.chat = !1, t.microphone = !1, t.screenShare = !1);
  const r = e.useMemo(
    () => o === "minimal" || o === "verbose",
    [o]
  ), v = e.useMemo(
    () => o === "textOnly" || o === "verbose",
    [o]
  ), c = Ve(), [f, i] = e.useState(!1), g = e.useCallback(
    (k) => {
      i(k);
    },
    [i]
  ), a = G({ className: "lk-control-bar" }, E), {
    saveAudioInputEnabled: C,
    saveVideoInputEnabled: S,
    saveAudioInputDeviceId: A,
    saveVideoInputDeviceId: w
  } = x({ preventSave: !l }), L = e.useCallback(
    (k, N) => N ? C(k) : null,
    [C]
  ), T = e.useCallback(
    (k, N) => N ? S(k) : null,
    [S]
  );
  return /* @__PURE__ */ e.createElement("div", { ...a }, t.microphone && /* @__PURE__ */ e.createElement("div", { className: "lk-button-group" }, /* @__PURE__ */ e.createElement(
    R,
    {
      source: y.Source.Microphone,
      showIcon: r,
      onChange: L,
      onDeviceError: (k) => n == null ? void 0 : n({ source: y.Source.Microphone, error: k })
    },
    v && "Microphone"
  ), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ e.createElement(
    O,
    {
      kind: "audioinput",
      onActiveDeviceChange: (k, N) => A(N ?? "default")
    }
  ))), t.camera && /* @__PURE__ */ e.createElement("div", { className: "lk-button-group" }, /* @__PURE__ */ e.createElement(
    R,
    {
      source: y.Source.Camera,
      showIcon: r,
      onChange: T,
      onDeviceError: (k) => n == null ? void 0 : n({ source: y.Source.Camera, error: k })
    },
    v && "Camera"
  ), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ e.createElement(
    O,
    {
      kind: "videoinput",
      onActiveDeviceChange: (k, N) => w(N ?? "default")
    }
  ))), t.screenShare && c && /* @__PURE__ */ e.createElement(
    R,
    {
      source: y.Source.ScreenShare,
      captureOptions: { audio: !0, selfBrowserSurface: "include" },
      showIcon: r,
      onChange: g,
      onDeviceError: (k) => n == null ? void 0 : n({ source: y.Source.ScreenShare, error: k })
    },
    v && (f ? "Stop screen share" : "Share screen")
  ), t.chat && /* @__PURE__ */ e.createElement(J, null, r && /* @__PURE__ */ e.createElement(he, null), v && "Chat"), t.settings && /* @__PURE__ */ e.createElement(Je, null, r && /* @__PURE__ */ e.createElement(pe, null), v && "Settings"), t.leave && /* @__PURE__ */ e.createElement(z, null, r && /* @__PURE__ */ e.createElement(ge, null), v && "Leave"), /* @__PURE__ */ e.createElement(H, null));
}
function tt({
  chatMessageFormatter: o,
  chatMessageDecoder: d,
  chatMessageEncoder: l,
  SettingsComponent: n,
  ...E
}) {
  var c, f;
  const [p, m] = e.useState({
    showChat: !1,
    unreadMessages: 0,
    showSettings: !1
  }), u = e.useRef(null), s = Y(
    [
      { source: y.Source.Camera, withPlaceholder: !0 },
      { source: y.Source.ScreenShare, withPlaceholder: !1 }
    ],
    { updateOnlyOn: [je.ActiveSpeakersChanged], onlySubscribed: !1 }
  ), I = (i) => {
    P.debug("updating widget state", i), m(i);
  }, t = Oe(), h = s.filter(q).filter((i) => i.publication.source === y.Source.ScreenShare), r = (c = Te(t)) == null ? void 0 : c[0], v = s.filter((i) => !$e(i, r));
  return e.useEffect(() => {
    var i, g, a, C, S, A;
    if (h.some((w) => w.publication.isSubscribed) && u.current === null ? (P.debug("Auto set screen share focus:", { newScreenShareTrack: h[0] }), (g = (i = t.pin).dispatch) == null || g.call(i, { msg: "set_pin", trackReference: h[0] }), u.current = h[0]) : u.current && !h.some(
      (w) => {
        var L, T;
        return w.publication.trackSid === ((T = (L = u.current) == null ? void 0 : L.publication) == null ? void 0 : T.trackSid);
      }
    ) && (P.debug("Auto clearing screen share focus."), (C = (a = t.pin).dispatch) == null || C.call(a, { msg: "clear_pin" }), u.current = null), r && !q(r)) {
      const w = s.find(
        (L) => L.participant.identity === r.participant.identity && L.source === r.source
      );
      w !== r && q(w) && ((A = (S = t.pin).dispatch) == null || A.call(S, { msg: "set_pin", trackReference: w }));
    }
  }, [
    h.map((i) => `${i.publication.trackSid}_${i.publication.isSubscribed}`).join(),
    (f = r == null ? void 0 : r.publication) == null ? void 0 : f.trackSid,
    s
  ]), W(), /* @__PURE__ */ e.createElement("div", { className: "lk-video-conference", ...E }, Ue() && /* @__PURE__ */ e.createElement(
    Q,
    {
      value: t,
      onWidgetChange: I
    },
    /* @__PURE__ */ e.createElement("div", { className: "lk-video-conference-inner" }, r ? /* @__PURE__ */ e.createElement("div", { className: "lk-focus-layout-wrapper" }, /* @__PURE__ */ e.createElement(ve, null, /* @__PURE__ */ e.createElement(Se, { tracks: v }, /* @__PURE__ */ e.createElement(K, null)), r && /* @__PURE__ */ e.createElement(ke, { trackRef: r }))) : /* @__PURE__ */ e.createElement("div", { className: "lk-grid-layout-wrapper" }, /* @__PURE__ */ e.createElement(Ee, { tracks: s }, /* @__PURE__ */ e.createElement(K, null))), /* @__PURE__ */ e.createElement(te, { controls: { chat: !0, settings: !!n } })),
    /* @__PURE__ */ e.createElement(
      ee,
      {
        style: { display: p.showChat ? "grid" : "none" },
        messageFormatter: o,
        messageEncoder: l,
        messageDecoder: d
      }
    ),
    n && /* @__PURE__ */ e.createElement(
      "div",
      {
        className: "lk-settings-menu-modal",
        style: { display: p.showSettings ? "block" : "none" }
      },
      /* @__PURE__ */ e.createElement(n, null)
    )
  ), /* @__PURE__ */ e.createElement(be, null), /* @__PURE__ */ e.createElement(Ce, null));
}
function at({ ...o }) {
  const [d, l] = e.useState({
    showChat: !1,
    unreadMessages: 0
  }), n = Y([y.Source.Microphone]);
  return W(), /* @__PURE__ */ e.createElement(Q, { onWidgetChange: l }, /* @__PURE__ */ e.createElement("div", { className: "lk-audio-conference", ...o }, /* @__PURE__ */ e.createElement("div", { className: "lk-audio-conference-stage" }, /* @__PURE__ */ e.createElement(we, { tracks: n }, /* @__PURE__ */ e.createElement(ye, null))), /* @__PURE__ */ e.createElement(
    te,
    {
      controls: { microphone: !0, screenShare: !1, camera: !1, chat: !0 }
    }
  ), d.showChat && /* @__PURE__ */ e.createElement(ee, null)));
}
function nt({
  controls: o,
  saveUserChoices: d = !0,
  onDeviceError: l,
  ...n
}) {
  const E = { leave: !0, microphone: !0, ...o }, p = X(), { microphoneTrack: m, localParticipant: u } = Le(), s = e.useMemo(() => ({
    participant: u,
    source: y.Source.Microphone,
    publication: m
  }), [u, m]);
  p ? E.microphone ?? (E.microphone = p.canPublish) : E.microphone = !1;
  const I = G({ className: "lk-agent-control-bar" }, n), { saveAudioInputEnabled: t, saveAudioInputDeviceId: h } = x({
    preventSave: !d
  }), r = e.useCallback(
    (v, c) => {
      c && t(v);
    },
    [t]
  );
  return /* @__PURE__ */ e.createElement("div", { ...I }, E.microphone && /* @__PURE__ */ e.createElement("div", { className: "lk-button-group" }, /* @__PURE__ */ e.createElement(
    R,
    {
      source: y.Source.Microphone,
      showIcon: !0,
      onChange: r,
      onDeviceError: (v) => l == null ? void 0 : l({ source: y.Source.Microphone, error: v })
    },
    /* @__PURE__ */ e.createElement(Ie, { trackRef: s, barCount: 7, options: { minHeight: 5 } })
  ), /* @__PURE__ */ e.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ e.createElement(
    O,
    {
      kind: "audioinput",
      onActiveDeviceChange: (v, c) => h(c ?? "default")
    }
  ))), E.leave && /* @__PURE__ */ e.createElement(z, null, "Disconnect"), /* @__PURE__ */ e.createElement(H, null));
}
export {
  at as AudioConference,
  ee as Chat,
  te as ControlBar,
  O as MediaDeviceMenu,
  et as PreJoin,
  tt as VideoConference,
  nt as VoiceAssistantControlBar,
  Ze as usePreviewDevice,
  Ke as usePreviewTracks
};
//# sourceMappingURL=prefabs.mjs.map

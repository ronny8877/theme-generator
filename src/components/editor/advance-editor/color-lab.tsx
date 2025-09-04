"use client";

import * as React from "react";
import * as culori from "culori";

function clamp(n: number, a = 0, b = 1) {
  return Math.max(a, Math.min(b, n));
}

// converters from culori
const toRgb = culori.converter("rgb");
const toHsl = culori.converter("hsl");

function hslToRgbFallback(h: number, s: number, l: number) {
  // kept as fallback in case culori throws; same behavior as before
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hh = h / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  let r = 0,
    g = 0,
    b = 0;
  if (hh >= 0 && hh < 1) [r, g, b] = [c, x, 0];
  else if (hh >= 1 && hh < 2) [r, g, b] = [x, c, 0];
  else if (hh >= 2 && hh < 3) [r, g, b] = [0, c, x];
  else if (hh >= 3 && hh < 4) [r, g, b] = [0, x, c];
  else if (hh >= 4 && hh < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const m = l - c / 2;
  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

function hslToRgb(h: number, s: number, l: number) {
  try {
    const rgb = toRgb({ mode: "hsl", h, s, l });
    return [
      Math.round((rgb.r ?? 0) * 255),
      Math.round((rgb.g ?? 0) * 255),
      Math.round((rgb.b ?? 0) * 255),
    ];
  } catch {
    return hslToRgbFallback(h, s, l);
  }
}

// small epsilon comparator to avoid repeated tiny updates
const EPS = 1e-3;
function almostEqual(a: number, b: number) {
  return Math.abs(a - b) < EPS;
}

export default function ColorLab({
  initial = "#ffffff",
  onChange,
}: {
  initial?: string;
  onChange?: (val: {
    hex: string;
    h: number;
    s: number;
    l: number;
    a: number;
  }) => void;
}) {
  const [hexEdit, setHexEdit] = React.useState(() => initial);
  const updatingFromPickerRef = React.useRef(false);
  const pickerInputRef = React.useRef<HTMLInputElement | null>(null);
  const pickerDebounceRef = React.useRef<number | null>(null);

  const [editingHex, setEditingHex] = React.useState(false);
  const [h, setH] = React.useState(0);
  const [s, setS] = React.useState(1);
  const [l, setL] = React.useState(1);
  const [a, setA] = React.useState(1);
  const lastPayloadRef = React.useRef<string | null>(null);
  const onChangeRef = React.useRef<typeof onChange>(onChange);
  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  React.useEffect(() => {
    // initialize from hex using culori
    const parsed = culori.parse(initial);
    if (parsed) {
      const asHsl = toHsl(parsed);
      const hh = Math.round(((asHsl.h ?? 0) + 360) % 360);
      const ss = Number((asHsl.s ?? 0).toFixed(3));
      const ll = Number((asHsl.l ?? 0).toFixed(3));
      const aa = parsed.alpha ?? 1;
      setH(hh);
      setS(ss);
      setL(ll);
      setA(aa);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // computed hex string from HSL
  const computedHex = React.useMemo(() => {
    // Always produce a 6-digit hex for <input type="color"> compatibility
    const [r, g, b] = hslToRgb(h, s, l);
    const to2 = (v: number) => Math.round(v).toString(16).padStart(2, "0");
    return `#${to2(r)}${to2(g)}${to2(b)}`;
  }, [h, s, l]);

  // external change notification, debounced
  React.useEffect(() => {
    const payloadKey = `${computedHex}|${h}|${s}|${l}|${a}`;
    const id = setTimeout(() => {
      if (payloadKey !== lastPayloadRef.current) {
        lastPayloadRef.current = payloadKey;
        onChangeRef.current?.({ hex: computedHex, h, s, l, a });
      }
    }, 120);
    return () => clearTimeout(id);
  }, [computedHex, h, s, l, a]);

  // keep the editable hex input in sync when internal hex updates
  React.useEffect(() => {
    if (!editingHex) {
      setHexEdit((prev) => (prev === computedHex ? prev : computedHex));
    }
  }, [computedHex, editingHex]);

  // sync computedHex into the native color input (uncontrolled) unless user is dragging
  React.useEffect(() => {
    if (updatingFromPickerRef.current) return;
    const el = pickerInputRef.current;
    if (el && el.value !== computedHex) el.value = computedHex;
  }, [computedHex]);

  // cleanup debounce timer on unmount
  React.useEffect(() => {
    return () => {
      if (pickerDebounceRef.current) {
        window.clearTimeout(pickerDebounceRef.current);
        pickerDebounceRef.current = null;
      }
    };
  }, []);

  // Use the native picker value for live preview while dragging to avoid React re-renders.
  let previewRgb: number[] = hslToRgb(h, s, l);
  if (updatingFromPickerRef.current && pickerInputRef.current) {
    const p = culori.parse(pickerInputRef.current.value);
    if (p) {
      try {
        const rgbObj = toRgb(p);
        previewRgb = [
          Math.round((rgbObj.r ?? 0) * 255),
          Math.round((rgbObj.g ?? 0) * 255),
          Math.round((rgbObj.b ?? 0) * 255),
        ];
      } catch {
        previewRgb = hslToRgb(h, s, l);
      }
    }
  }
  const preview = `rgba(${previewRgb.join(",")}, ${clamp(a, 0, 1)})`;

  return (
    <div className="w-full max-w-3xl card bg-base-100 shadow-sm mx-auto">
      <div className="card-body p-4">
        <div className="flex gap-4 items-start">
          <div className="w-44 flex-shrink-0">
            <div className="rounded-md border p-3 bg-base-200">
              <div className="aspect-video rounded-md overflow-hidden border bg-gradient-to-br from-white/20 to-black/5">
                <div
                  style={{ background: preview }}
                  className="h-full w-full"
                />
              </div>
              <div className="mt-3 grid gap-2">
                <div className="form-control">
                  <label className="label p-0">
                    <span className="label-text text-sm">Picker</span>
                  </label>
                  <input
                    aria-label="color-picker"
                    type="color"
                    ref={pickerInputRef}
                    onInput={() => {
                      const el = pickerInputRef.current;
                      if (!el) return;
                      const val = (el.value || "").toLowerCase();
                      // avoid unnecessary work if same as last parsed value
                      if (pickerDebounceRef.current)
                        window.clearTimeout(pickerDebounceRef.current);
                      updatingFromPickerRef.current = true;
                      pickerDebounceRef.current = window.setTimeout(() => {
                        const parsed = culori.parse(val);
                        if (parsed) {
                          const asHsl = toHsl(parsed);
                          const hh = Math.round(((asHsl.h ?? 0) + 360) % 360);
                          const ss = Number((asHsl.s ?? 0).toFixed(3));
                          const ll = Number((asHsl.l ?? 0).toFixed(3));
                          const aa = parsed.alpha ?? 1;
                          if (
                            !(
                              h === hh &&
                              almostEqual(s, ss) &&
                              almostEqual(l, ll) &&
                              almostEqual(a, aa)
                            )
                          ) {
                            setH((prev) => (prev === hh ? prev : hh));
                            setS((prev) => (almostEqual(prev, ss) ? prev : ss));
                            setL((prev) => (almostEqual(prev, ll) ? prev : ll));
                            setA((prev) => (almostEqual(prev, aa) ? prev : aa));
                          }
                        }
                        updatingFromPickerRef.current = false;
                        pickerDebounceRef.current = null;
                      }, 120);
                    }}
                    className="w-full h-9 appearance-none rounded-md"
                  />
                </div>

                <div className="form-control">
                  <label className="label p-0">
                    <span className="label-text text-sm">Hex</span>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    value={hexEdit}
                    onFocus={() => setEditingHex(true)}
                    onChange={(e) => setHexEdit(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const v = (
                          hexEdit.startsWith("#") ? hexEdit : `#${hexEdit}`
                        ).toLowerCase();
                        if (v === computedHex) {
                          setEditingHex(false);
                          return;
                        }
                        const parsed = culori.parse(v);
                        if (parsed) {
                          const asHsl = toHsl(parsed);
                          const hh = Math.round(((asHsl.h ?? 0) + 360) % 360);
                          const ss = Number((asHsl.s ?? 0).toFixed(3));
                          const ll = Number((asHsl.l ?? 0).toFixed(3));
                          const aa = parsed.alpha ?? 1;
                          setH((prev) => (prev === hh ? prev : hh));
                          setS((prev) => (almostEqual(prev, ss) ? prev : ss));
                          setL((prev) => (almostEqual(prev, ll) ? prev : ll));
                          setA((prev) => (almostEqual(prev, aa) ? prev : aa));
                          const [rr, gg, bb] = hslToRgb(hh, ss, ll);
                          const to2 = (x: number) =>
                            Math.round(x).toString(16).padStart(2, "0");
                          setHexEdit(`#${to2(rr)}${to2(gg)}${to2(bb)}`);
                        }
                        setEditingHex(false);
                      }
                    }}
                    onBlur={() => {
                      const v = (
                        hexEdit.startsWith("#") ? hexEdit : `#${hexEdit}`
                      ).toLowerCase();
                      if (v === computedHex) {
                        setEditingHex(false);
                        return;
                      }
                      const parsed = culori.parse(v);
                      if (parsed) {
                        const asHsl = toHsl(parsed);
                        const hh = Math.round(((asHsl.h ?? 0) + 360) % 360);
                        const ss = Number((asHsl.s ?? 0).toFixed(3));
                        const ll = Number((asHsl.l ?? 0).toFixed(3));
                        const aa = parsed.alpha ?? 1;
                        setH((prev) => (prev === hh ? prev : hh));
                        setS((prev) => (almostEqual(prev, ss) ? prev : ss));
                        setL((prev) => (almostEqual(prev, ll) ? prev : ll));
                        setA((prev) => (almostEqual(prev, aa) ? prev : aa));
                        const [rr, gg, bb] = hslToRgb(hh, ss, ll);
                        const to2 = (x: number) =>
                          Math.round(x).toString(16).padStart(2, "0");
                        setHexEdit(`#${to2(rr)}${to2(gg)}${to2(bb)}`);
                      }
                      setEditingHex(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label p-0">
                  <span className="label-text text-sm">Hue</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={360}
                  value={h}
                  onChange={(e) => setH(Number(e.target.value))}
                  className="range range-primary"
                />
                <div className="text-xs mt-1">{h}°</div>
              </div>

              <div className="form-control">
                <label className="label p-0">
                  <span className="label-text text-sm">Saturation</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(s * 100)}
                  onChange={(e) => setS(Number(e.target.value) / 100)}
                  className="range range-primary"
                />
                <div className="text-xs mt-1">{Math.round(s * 100)}%</div>
              </div>

              <div className="form-control">
                <label className="label p-0">
                  <span className="label-text text-sm">Lightness</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(l * 100)}
                  onChange={(e) => setL(Number(e.target.value) / 100)}
                  className="range range-primary"
                />
                <div className="text-xs mt-1">{Math.round(l * 100)}%</div>
              </div>

              <div className="form-control">
                <label className="label p-0">
                  <span className="label-text text-sm">Alpha</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(a * 100)}
                  onChange={(e) => {
                    const v = Number(e.target.value) / 100;
                    setA((prev) => (almostEqual(prev, v) ? prev : v));
                  }}
                  className="range range-primary"
                />
                <div className="text-xs mt-1">{a.toFixed(2)}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div>
                <div className="text-sm text-muted-foreground">HEX</div>
                <div className="font-mono">{computedHex.toUpperCase()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">HSL</div>
                <div className="font-mono">
                  hsl({h}, {Math.round(s * 100)}%, {Math.round(l * 100)}%)
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">RGBA</div>
                <div className="font-mono">
                  rgba({hslToRgb(h, s, l).join(",")}, {a.toFixed(2)})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

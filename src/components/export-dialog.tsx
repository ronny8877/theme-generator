"use client";

import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { ScrollArea } from "@/ui/scroll-area";
import { Copy, Palette, Code2, Check } from "lucide-react";
import { useActiveTheme, useBodyFont, useHeadingFont } from "@/store/hooks";
import { exportTheme, flattenColors } from "@/lib/exporter";
import type { ExportPreset } from "@/lib/exporter";

type Props = { open: boolean; onOpenChange: (v: boolean) => void };

export function ExportDialog({ open, onOpenChange }: Props) {
  const theme = useActiveTheme();
  const heading = useHeadingFont();
  const body = useBodyFont();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [preset, setPreset] = useState<ExportPreset>("daisyui");

  const bundles = useMemo(() => exportTheme(theme), [theme]);
  const colors = useMemo(() => flattenColors(theme), [theme]);

  const copy = async (text: string, key?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key ?? text.slice(0, 16));
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {}
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl w-[min(96vw,900px)] p-0 bg-base-200 border-base-300 rounded-3xl">
        <DialogHeader className="p-5 border-b border-base-300 bg-base-100 rounded-t-3xl">
          <DialogTitle className="flex items-center gap-2">
            <Code2 className="w-4 h-4" /> Export
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="css" className="w-full">
          <div className="px-5 pt-4">
            <TabsList className="bg-base-300 rounded-full h-11">
              <TabsTrigger
                value="css"
                className="rounded-full data-[state=active]:bg-base-100"
              >
                CSS
              </TabsTrigger>
              <TabsTrigger
                value="colors"
                className="rounded-full data-[state=active]:bg-base-100"
              >
                Colors
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="css" className="mt-2">
            <ScrollArea className="h-[65vh]">
              <section className="p-5 grid gap-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm opacity-70">Target framework</div>
                  <div className="flex items-center gap-2">
                    <select
                      className="select select-sm rounded-full bg-base-100 border-base-300"
                      value={preset}
                      onChange={(e) =>
                        setPreset(e.target.value as ExportPreset)
                      }
                    >
                      <option value="daisyui">daisyUI (default)</option>
                      <option value="tailwind-v4">Tailwind v4 (@theme)</option>
                      <option value="tailwind-v3">Tailwind v3 (config)</option>
                      <option value="styled-components">
                        styled-components
                      </option>
                      <option value="empty-components">Empty components</option>
                    </select>
                    <button
                      className="btn btn-sm rounded-full"
                      onClick={() => copy(bundles[preset], preset)}
                    >
                      {copiedKey === preset ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      Copy
                    </button>
                  </div>
                </div>

                <article className="rounded-3xl border border-base-300 bg-base-100 shadow-sm">
                  <header className="flex items-center justify-between p-4 border-b border-base-300">
                    <div className="font-medium uppercase tracking-wide text-xs opacity-70">
                      {preset}
                    </div>
                    <button
                      className="btn btn-xs rounded-full"
                      onClick={() => copy(bundles[preset], preset)}
                    >
                      {copiedKey === preset ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}{" "}
                      Copy
                    </button>
                  </header>
                  <pre className="p-4 text-xs overflow-x-auto">
                    <code>{bundles[preset]}</code>
                  </pre>
                </article>
              </section>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="colors" className="mt-2">
            <ScrollArea className="h-[65vh]">
              <div className="p-5 grid gap-6">
                <section className="rounded-3xl border border-base-300 bg-base-100 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-sm opacity-70">Fonts</div>
                      <div className="text-base font-semibold">
                        {heading.family} / {body.family}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="btn btn-xs rounded-full"
                        onClick={() => copy(heading.family, "heading-font")}
                      >
                        Copy Heading
                      </button>
                      <button
                        className="btn btn-xs rounded-full"
                        onClick={() => copy(body.family, "body-font")}
                      >
                        Copy Body
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm opacity-80">
                    The quick brown fox jumps over the lazy dog. 0123456789
                  </p>
                </section>

                <section className="grid gap-3">
                  <div className="flex items-center gap-2 text-sm opacity-70">
                    <Palette className="w-4 h-4" /> Palette
                  </div>
                  <div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-4">
                    {Object.entries(colors).map(([key, value]) => (
                      <div
                        key={key}
                        className="group rounded-3xl overflow-hidden border border-base-300 bg-base-100 shadow-sm"
                      >
                        <div
                          className="h-20 w-full"
                          style={{ background: value }}
                        />
                        <div className="flex items-center justify-between px-4 py-3">
                          <div className="min-w-0">
                            <div
                              className="text-xs font-mono truncate"
                              title={key}
                            >
                              {key.replace("--color-", "")}
                            </div>
                            <div className="text-[10px] opacity-70 font-mono truncate">
                              {value}
                            </div>
                          </div>
                          <button
                            className="btn btn-ghost btn-xs rounded-full"
                            onClick={() => copy(value, key)}
                          >
                            {copiedKey === key ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="grid gap-3">
                  <div className="text-sm opacity-70">Auto gradients</div>
                  <div className="grid grid-cols-1 @md:grid-cols-2 gap-5">
                    <GradientCard
                      title="Base gradient"
                      from={theme.colors["--color-base-100"]}
                      to={theme.colors["--color-base-300"]}
                      onCopy={(v) => copy(v, "base-gradient")}
                    />
                    <GradientCard
                      title="Primary gradient"
                      from={theme.colors["--color-primary"]}
                      to={theme.colors["--color-primary-content"]}
                      onCopy={(v) => copy(v, "primary-gradient")}
                    />
                  </div>
                </section>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function GradientCard({
  title,
  from,
  to,
  onCopy,
}: {
  title: string;
  from: string;
  to: string;
  onCopy: (v: string) => void;
}) {
  const value = `linear-gradient(135deg, ${from}, ${to})`;
  return (
    <article className="rounded-3xl border border-base-300 bg-base-100 overflow-hidden shadow-sm">
      <div
        className="h-32 w-full animate-[pulse_2.5s_ease-in-out_infinite]"
        style={{ backgroundImage: value }}
      />
      <div className="flex items-center justify-between p-4">
        <div className="text-sm font-medium">{title}</div>
        <div className="flex items-center gap-2">
          <button
            className="btn btn-xs rounded-full"
            onClick={() => onCopy(value)}
          >
            <Copy className="w-3 h-3" /> Copy CSS
          </button>
        </div>
      </div>
    </article>
  );
}

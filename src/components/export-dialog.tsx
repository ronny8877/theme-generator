"use client";

import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { ScrollArea } from "@/ui/scroll-area";
import { Copy, Palette, Code2, Check } from "lucide-react";
import { useActiveTheme, useBodyFont, useHeadingFont } from "@/store/hooks";
import { exportTheme, flattenColors } from "@/lib/exporter";

type Props = { open: boolean; onOpenChange: (v: boolean) => void };

export function ExportDialog({ open, onOpenChange }: Props) {
  const theme = useActiveTheme();
  const heading = useHeadingFont();
  const body = useBodyFont();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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
      <DialogContent className="sm:max-w-3xl w-[min(96vw,900px)] p-0 overflow-hidden bg-base-200 border-base-300">
        <DialogHeader className="p-4 border-b border-base-300 bg-base-100">
          <DialogTitle className="flex items-center gap-2">
            <Code2 className="w-4 h-4" /> Export
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="css" className="w-full">
          <div className="px-4 pt-3">
            <TabsList className="bg-base-300 rounded-full h-10">
              <TabsTrigger value="css" className="rounded-full data-[state=active]:bg-base-100">CSS</TabsTrigger>
              <TabsTrigger value="colors" className="rounded-full data-[state=active]:bg-base-100">Colors</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="css" className="mt-2">
            <ScrollArea className="h-[60vh]">
              <section className="p-4 grid gap-4">
                {Object.entries(bundles).map(([k, v]) => (
                  <article key={k} className="rounded-xl border border-base-300 bg-base-100">
                    <header className="flex items-center justify-between p-3 border-b border-base-300">
                      <div className="font-medium uppercase tracking-wide text-xs opacity-70">{k}</div>
                      <button className="btn btn-xs rounded-full" onClick={() => copy(v, k)}>
                        {copiedKey === k ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Copy
                      </button>
                    </header>
                    <pre className="p-3 text-xs overflow-x-auto">
                      <code>{v}</code>
                    </pre>
                  </article>
                ))}
              </section>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="colors" className="mt-2">
            <ScrollArea className="h-[60vh]">
              <div className="p-4 grid gap-6">
                <section className="rounded-xl border border-base-300 bg-base-100 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-sm opacity-70">Fonts</div>
                      <div className="text-base font-semibold">{heading.family} / {body.family}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="btn btn-xs rounded-full" onClick={() => copy(heading.family, "heading-font")}>Copy Heading</button>
                      <button className="btn btn-xs rounded-full" onClick={() => copy(body.family, "body-font")}>Copy Body</button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm opacity-80">The quick brown fox jumps over the lazy dog. 0123456789</p>
                </section>

                <section className="grid gap-3">
                  <div className="flex items-center gap-2 text-sm opacity-70"><Palette className="w-4 h-4" /> Palette</div>
                  <div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-3">
                    {Object.entries(colors).map(([key, value]) => (
                      <div key={key} className="group rounded-xl overflow-hidden border border-base-300 bg-base-100">
                        <div className="h-16 w-full" style={{ background: value }} />
                        <div className="flex items-center justify-between px-3 py-2">
                          <div className="text-xs font-mono truncate" title={key}>{key.replace("--color-", "")}</div>
                          <button className="btn btn-ghost btn-xs rounded-full" onClick={() => copy(value, key)}>
                            {copiedKey === key ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="grid gap-3">
                  <div className="text-sm opacity-70">Auto gradients</div>
                  <div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
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

function GradientCard({ title, from, to, onCopy }: { title: string; from: string; to: string; onCopy: (v: string) => void }) {
  const value = `linear-gradient(135deg, ${from}, ${to})`;
  return (
    <article className="rounded-xl border border-base-300 bg-base-100 overflow-hidden">
      <div className="h-28 w-full animate-[pulse_2.5s_ease-in-out_infinite]" style={{ backgroundImage: value }} />
      <div className="flex items-center justify-between p-3">
        <div className="text-sm font-medium">{title}</div>
        <div className="flex items-center gap-2">
          <button className="btn btn-xs rounded-full" onClick={() => onCopy(value)}>
            <Copy className="w-3 h-3" /> Copy CSS
          </button>
        </div>
      </div>
    </article>
  );
}

import { CheckCircle2 } from "lucide-react";

export default function WorkflowSteps() {
  const steps = [
    {
      title: "Choose Template",
      desc:
        "Start with a professionally designed template—ready for blogs, portfolios, landing pages and more.",
      bullets: ["30+ templates", "Industry-specific layouts", "Mobile-ready"],
    },
    {
      title: "Customize Colors & Fonts",
      desc:
        "Use live preview to tweak DaisyUI variables and typography. See changes in real time.",
      bullets: ["Realtime preview", "Advanced color controls", "Typography controls"],
    },
    {
      title: "Share & Export",
      desc:
        "Share a link or export clean code. Works with any framework—copy CSS variables or theme JSON.",
      bullets: ["CSS variables based", "Framework agnostic", "Shareable themes"],
    },
  ];

  return (
    <section className="py-12 lg:py-16">
      <h2 className="text-center text-3xl lg:text-5xl font-extrabold mb-8">Three simple steps</h2>
      <div className="rounded-[2rem] bg-base-200 p-4 sm:p-6 lg:p-10">
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body">
                <div className="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center font-semibold">{i + 1}</div>
                <h3 className="card-title mt-2">{s.title}</h3>
                <p className="opacity-70">{s.desc}</p>
                <ul className="mt-3 space-y-1">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-warning" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

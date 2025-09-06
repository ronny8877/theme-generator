export default function TextPitch() {
  return (
    <section className="pt-16 lg:pt-24">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight">
          Apply your own design decisions
        </h2>
        <p className="mt-4 text-lg lg:text-xl text-base-content/70">
          Create a custom DaisyUI theme and preview it on real templates
          instantly. Pick colors and fonts, then see exactly how it looks on a
          live site—no setup.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <a className="btn btn-primary rounded-box" href="/templates">
            {" "}
            GOTO Theme generator
          </a>
          {/* <a className="btn btn-ghost rounded-box" href="/templates">Learn more about themes</a> */}
        </div>
      </div>
    </section>
  );
}

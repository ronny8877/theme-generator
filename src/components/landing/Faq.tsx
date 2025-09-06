import Link from "next/link";

export default function Faq() {
  return (
    <section className="py-12">
      <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-6">
        Frequently asked questions
      </h2>
      <div className="join join-vertical w-full">
        <div className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-medium">
            Is LiveTheme free to use?
          </div>
          <div className="collapse-content text-base-content/80">
            <p>
              Yes. You can edit themes, preview templates, share links and
              export CSS variables for free. No account required.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-medium">
            Does it work with my framework?
          </div>
          <div className="collapse-content text-base-content/80">
            <p>
              Exports are framework-agnostic. Copy CSS variables into
              Tailwind/DaisyUI configs, or inline in any React, Next.js, Vue or
              Svelte app.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-medium">
            Where do I start?
          </div>
          <div className="collapse-content text-base-content/80">
            <p>
              Open the{" "}
              <Link href="/templates" className="link link-primary">
                Templates
              </Link>{" "}
              page, choose a layout and start tweaking theme variables.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

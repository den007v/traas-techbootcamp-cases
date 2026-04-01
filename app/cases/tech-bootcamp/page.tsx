import { CaseCatalog } from "@/components/cases/case-catalog";
import { getCases } from "@/lib/cases/queries";

export default async function TechBootcampCasesPage() {
  const items = await getCases("tech-bootcamp");

  return (
    <>
      {/* Hero */}
      <section className="border-b" style={{ borderColor: "var(--color-border)" }}>
        <div
          className="mx-auto max-w-[1120px] px-6"
          style={{ paddingTop: "clamp(3rem, 6vw, 5rem)", paddingBottom: "clamp(2rem, 4vw, 4rem)" }}
        >
          <span
            className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.1em]"
            style={{ color: "var(--color-primary)" }}
          >
            Tech Bootcamp
          </span>
          <h1
            className="mb-4 font-black leading-tight tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 1.2rem + 2.5vw, 3.5rem)",
              color: "var(--color-text)",
            }}
          >
            Кейсы участников Tech Bootcamp
          </h1>
          <p
            className="leading-relaxed"
            style={{
              fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
              color: "var(--color-muted)",
              maxWidth: "54ch",
            }}
          >
            Истории о запуске технических решений: от аналитики до AI-инструментов и продуктовых процессов.
          </p>
        </div>
      </section>

      {/* Catalog */}
      <section className="mx-auto max-w-[1120px] px-6" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
        <CaseCatalog items={items} />
      </section>
    </>
  );
}

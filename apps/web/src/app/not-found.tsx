import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="surface-ivory">
      <section className="container-page section-pad text-center">
        <p className="eyebrow mx-auto justify-center">404</p>
        <h1 className="display mt-4 text-5xl md:text-6xl">Page not found</h1>
        <p className="mx-auto mt-5 max-w-xl text-muted">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Back home</Button>
          <Button href="/contact" variant="secondary">
            Contact
          </Button>
        </div>
      </section>
    </div>
  );
}

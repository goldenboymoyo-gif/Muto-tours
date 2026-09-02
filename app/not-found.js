import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-20 bg-sand">
      <div className="container-editorial text-center py-24">
        <p className="text-xs uppercase tracking-widest2 text-clay mb-4">404</p>
        <h1 className="font-archivo uppercase text-3xl sm:text-5xl text-ink text-balance">
          This trail doesn&rsquo;t lead anywhere.
        </h1>
        <p className="mt-5 text-ink/70 max-w-md mx-auto">
          The page you&rsquo;re looking for may have moved. Try one of the routes below.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
          <Button href="/" variant="primary">Back home</Button>
          <Button href="/destinations" variant="primary">See destinations</Button>
        </div>
      </div>
    </div>
  );
}

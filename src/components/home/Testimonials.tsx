import { Button } from "@/components/ui/button";

export function Testimonials() {
  return (
    <section className="section-padding bg-midnight-light relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/3 w-[50vw] h-[50vh] bg-sapphire/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/3 w-[40vw] h-[40vh] bg-champagne/5 rounded-full blur-[100px]" />
      
      <div className="container-luxury relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs tracking-widest uppercase text-champagne">
            Community Feedback
          </span>
          <h2 className="heading-large mt-3 mb-4 text-cream">
            Help Us Grow
          </h2>
          <p className="text-cream/60 mb-8">
            We're just getting started, and your feedback is crucial in helping us build the best platform for digital creators. Share your experience and help shape the future of 94mercato.
          </p>
          <Button variant="champagne-outline" size="lg" asChild>
            <a href="/contact">
              Share Your Feedback
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
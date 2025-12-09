import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content:
      "94mercato has transformed how I sell my design assets. The platform is elegant, the commission is fair, and my sales have tripled since joining.",
    author: {
      name: "Sarah Chen",
      role: "UI Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    rating: 5,
  },
  {
    id: 2,
    content:
      "As a buyer, I love the curated selection. Every product I've purchased has exceeded expectations. The quality here is unmatched.",
    author: {
      name: "Michael Torres",
      role: "Creative Director",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    rating: 5,
  },
  {
    id: 3,
    content:
      "The seller dashboard is intuitive and the analytics help me understand what my customers want. Best platform for digital creators.",
    author: {
      name: "Emma Wright",
      role: "Template Designer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    },
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-midnight-light relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-sapphire/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-champagne/5 rounded-full blur-[100px]" />
      
      <div className="container-luxury relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs tracking-widest uppercase text-champagne">
            Testimonials
          </span>
          <h2 className="heading-large mt-3 mb-4 text-cream">
            Loved by Creators
          </h2>
          <p className="text-cream/60">
            See what our community of sellers and buyers have to say about their
            experience with 94mercato.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`midnight-glass p-8 animate-fade-up delay-${(index + 1) * 100}`}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-champagne fill-current"
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-cream mb-8 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-sapphire/20">
                <img
                  src={testimonial.author.avatar}
                  alt={testimonial.author.name}
                  className="w-12 h-12 rounded-full bg-midnight border border-sapphire/30"
                />
                <div>
                  <p className="font-medium text-cream">{testimonial.author.name}</p>
                  <p className="text-sm text-cream/50">
                    {testimonial.author.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Shield, Sparkles } from "lucide-react";

const values = [
  {
    icon: Sparkles,
    title: "Quality First",
    description:
      "Every product on 94mercato is curated for quality. We believe in showcasing only the best digital craftsmanship.",
  },
  {
    icon: Heart,
    title: "Creator-Centric",
    description:
      "We build for creators. Our platform is designed to help you showcase your work and earn what you deserve.",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description:
      "Secure payments, verified sellers, and buyer protection. We\'re building a foundation of trust.",
  },
];

const team = [
  {
    name: "Jeroen Benny",
    role: "Founder",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jeroen&topType=ShortHairShortFlat&facialHairType=BeardLight",
  },
  {
    name: "Farhan",
    role: "COO",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Farhan&topType=ShortHairFrizzle&facialHairType=MoustacheMagnum",
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About — 94mercato</title>
        <meta
          name="description"
          content="Learn about 94mercato, the premium digital marketplace where digital craft becomes timeless. Our mission, values, and team."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="pt-24 md:pt-32 pb-16 md:pb-20 bg-gradient-to-b from-stone/30 to-background">
          <div className="container-luxury">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-champagne/10 rounded-full mb-6 md:mb-8 animate-fade-up">
                <span className="text-xs tracking-widest uppercase text-muted-foreground">
                  Our Story
                </span>
              </span>
              <h1 className="heading-display text-4xl md:text-6xl mb-6 animate-fade-up delay-100">
                Where Digital Craft
                <br />
                <span className="text-taupe">Becomes Timeless</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground animate-fade-up delay-200">
                94mercato is a curated marketplace for premium digital products.
                We connect talented creators with customers who value quality and
                craftsmanship.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding bg-background">
          <div className="container-luxury">
            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="space-y-6">
                <div>
                  <span className="text-xs tracking-widest uppercase text-champagne">
                    Our Mission
                  </span>
                  <h2 className="heading-large text-3xl md:text-4xl mt-3">
                    Elevating Digital Creativity
                  </h2>
                </div>
                <p className="text-editorial">
                  We believe that great digital products deserve a premium
                  showcase. 94mercato was founded to create a space where
                  quality matters — where creators can present their best work
                  and customers can discover products that truly stand out.
                </p>
                <p className="text-muted-foreground">
                  In a world flooded with digital content, we curate. Every
                  product on our platform will meet our standards for quality,
                  originality, and craftsmanship. This isn\'t just another
                  marketplace — it\'s a gallery of the best digital creation has
                  to offer.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="glass-card-elevated p-6 md:p-8 text-center">
                  <p className="text-3xl md:text-4xl font-serif font-bold text-champagne">
                    Just Launched
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Join us on our journey!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-stone/30">
          <div className="container-luxury">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="text-xs tracking-widest uppercase text-champagne">
                Our Values
              </span>
              <h2 className="heading-large text-3xl md:text-4xl mt-3 mb-4">
                What We Stand For
              </h2>
              <p className="text-muted-foreground">
                These principles guide everything we do at 94mercato.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className={`glass-card-elevated p-6 md:p-8 text-center animate-fade-up delay-${
                    (index + 1) * 100
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-champagne/10 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-7 w-7 text-champagne" />
                  </div>
                  <h3 className="font-serif text-xl font-medium mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="section-padding bg-background">
          <div className="container-luxury">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <span className="text-xs tracking-widest uppercase text-champagne">
                Our Team
              </span>
              <h2 className="heading-large text-3xl md:text-4xl mt-3 mb-4">
                Meet the People Behind
              </h2>
              <p className="text-muted-foreground">
                A passionate team dedicated to building the best marketplace for
                digital creators.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 max-w-sm mx-auto">
              {team.map((member, index) => (
                <div
                  key={member.name}
                  className={`text-center animate-fade-up delay-${
                    (index + 1) * 100
                  }`}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-secondary mx-auto mb-4 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Parent Company */}
        <section className="section-padding bg-foreground text-background">
          <div className="container-luxury text-center">
            <p className="text-xs tracking-widest uppercase text-champagne mb-4">
              A Product By
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">Outbrix</h2>
            <p className="text-background/60 max-w-lg mx-auto mb-10">
              94mercato is proudly built by Outbrix, a company dedicated to
              creating tools and platforms that empower creators worldwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="champagne"
                size="lg"
                className="text-foreground w-full sm:w-auto"
                asChild
              >
                <Link to="/sell">
                  Start Selling
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="luxury-outline"
                size="lg"
                className="border-background/20 text-background hover:bg-background hover:text-foreground w-full sm:w-auto"
                asChild
              >
                <Link to="/products">Explore Products</Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;

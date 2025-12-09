import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Mail, MessageSquare, HelpCircle, Send } from "lucide-react";

const contactOptions = [
  {
    icon: HelpCircle,
    title: "Support",
    description: "Get help with your account, purchases, or technical issues.",
    email: "support@94mercato.com",
  },
  {
    icon: MessageSquare,
    title: "Sales",
    description: "Questions about selling, commissions, or partnerships.",
    email: "sellers@94mercato.com",
  },
  {
    icon: Mail,
    title: "Press",
    description: "Media inquiries and press kit requests.",
    email: "press@94mercato.com",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for contact form submission
    console.log("Contact form submitted:", formData);
  };

  return (
    <>
      <Helmet>
        <title>Contact — 94mercato</title>
        <meta
          name="description"
          content="Get in touch with 94mercato. Contact our support team, sales, or press departments."
        />
      </Helmet>
      <Layout>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-stone/30 to-background">
          <div className="container-luxury">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="heading-display mb-4">Get in Touch</h1>
              <p className="text-xl text-muted-foreground">
                We'd love to hear from you. Choose an option below or send us a
                message.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="pb-16 bg-background">
          <div className="container-luxury">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {contactOptions.map((option) => (
                <a
                  key={option.title}
                  href={`mailto:${option.email}`}
                  className="glass-card-elevated p-6 text-center hover:shadow-elevated transition-shadow group"
                >
                  <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-champagne/20 transition-colors">
                    <option.icon className="h-5 w-5 text-champagne" />
                  </div>
                  <h3 className="font-serif text-lg font-medium mb-2">
                    {option.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {option.description}
                  </p>
                  <span className="text-sm text-champagne">{option.email}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="section-padding bg-stone/30">
          <div className="container-luxury">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-xs tracking-widest uppercase text-champagne">
                  Send a Message
                </span>
                <h2 className="heading-large mt-3">Contact Form</h2>
              </div>

              <div className="glass-card-elevated p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button type="submit" variant="luxury" size="lg" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="section-padding bg-background">
          <div className="container-luxury text-center">
            <h2 className="font-serif text-2xl font-medium mb-4">
              Looking for quick answers?
            </h2>
            <p className="text-muted-foreground mb-6">
              Check out our FAQ section for common questions about buying, selling,
              and account management.
            </p>
            <Button variant="luxury-outline" size="lg">
              View FAQ
            </Button>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Contact;

import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Categories } from "@/components/home/Categories";
import { SellerCTA } from "@/components/home/SellerCTA";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
import { AIFeatures } from "@/components/home/AIFeatures";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Mercato94 — Premium Digital Marketplace | Curated Creative Assets</title>
        <meta
          name="description"
          content="Discover premium digital products from top creators. Templates, UI kits, courses, mockups, fonts and more. Where digital craft becomes timeless."
        />
        <meta property="og:title" content="Mercato94 — Premium Digital Marketplace" />
        <meta
          property="og:description"
          content="Curated high-end digital assets for creators who value excellence."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://mercato94.com" />
      </Helmet>
      <Layout>
        <Hero />
        <FeaturedProducts />
        <Categories />
        <AIFeatures />
        <SellerCTA />
        <Testimonials />
        <Newsletter />
      </Layout>
    </>
  );
};

export default Index;

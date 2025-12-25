"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Share2, Film, Maximize, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { BlockchainVisualization } from "@/components/BlockchainVisualization";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

  const locale = pathname && pathname.includes("/zh") ? "zh" : "en";

  const navItems = [
    { href: "#what", label: t("nav.whatsMBN") },
    { href: "#comparing", label: t("nav.comparing") },
    { href: "#why", label: t("nav.whyImportant") },
    { href: "#how", label: t("nav.howItWorks") },
    { href: "#faq", label: t("nav.faq") },
    { href: "https://api.metabitcoin.network/api-base/swagger/index.html", label: t("nav.apiDoc") },
  ];

  const languageLabel = locale === "zh" ? "中文" : "EN";

  return (
    <header className="w-full h-16 md:h-24 fixed top-0 z-[100] bg-opacity-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-full flex items-center justify-between md:max-w-[1200px]">
        <div className="flex items-center">
          <button
            className="md:hidden mr-4 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Image src="/mbn-logo.svg" width={40} height={40} alt="MBN" />
          {/* <div className="text-2xl font-bold cursor-pointer text-white">
            MBN
          </div> */}
        </div>

        <nav className="hidden md:flex items-center flex-1 justify-center">
          <div className="flex items-center gap-x-8 px-8 py-2.5 rounded-full">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-white/90 text-base font-normal leading-loose hover:text-orange-500 transition-colors"
                {...(item.href.startsWith('http') ? {
                  target: "_blank",
                  rel: "noopener noreferrer"
                } : {})}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        {/* FIXME: dropdown menu shake */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-white border-none outline-none hover:outline-none"
            >
              <Globe className="h-4 w-4 mr-2" />
              {languageLabel}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="center"
            side="top"
            className="bg-black/90 backdrop-blur-md border-stone-800 z-[500] w-32 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-black/30"
          >
            <DropdownMenuItem
              className="text-white/90 hover:text-orange-500"
              onClick={() => router.push("/en")}
            >
              English
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-white/90 hover:text-orange-500"
              onClick={() => router.push("/zh")}
            >
              中文
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="h-screen flex flex-col bg-black/90 backdrop-blur-lg">
          <div className="flex justify-end p-4">
            <button className="text-white" onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-white/90 text-2xl py-4 hover:text-orange-500 transition-colors animate-in fade-in slide-in-from-left duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setIsMenuOpen(false)}
                {...(item.href.startsWith('http') ? {
                  target: "_blank",
                  rel: "noopener noreferrer"
                } : {})}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

const LandingPage = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const locale = pathname && pathname.includes("/zh") ? "zh" : "en";

  const features = [
    t("hero.features.0"),
    t("hero.features.1"),
    t("hero.features.2"),
    t("hero.features.3"),
  ];

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const renderFeatures = () => {
    return features.map((feature, index) => (
      <div key={index} className="flex items-start gap-4">
        <div className="w-4 h-4 md:w-5 md:h-5 mt-1 rounded-full bg-orange-500 flex-shrink-0"></div>
        <p className="flex-1 text-white/90 text-base md:text-lg font-medium leading-7">
          {feature}
        </p>
      </div>
    ));
  };

  const renderFAQs = () => {
    const faqs = [
      {
        title: t("faq.questions.0.title"),
        content: t("faq.questions.0.content"),
      },
      {
        title: t("faq.questions.1.title"),
        content: t("faq.questions.1.content"),
      },
      {
        title: t("faq.questions.2.title"),
        content: t("faq.questions.2.content"),
      },
      {
        title: t("faq.questions.3.title"),
        content: t("faq.questions.3.content"),
      },
    ];

    return (
      <>
        {faqs.map((faq, i) => (
          <Card
            key={i}
            className="bg-white/10 border-none transition-colors relative"
          >
            <CardContent className="p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white/90">
                {faq.title}
              </h3>
              <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-4 line-clamp-2">
                {faq.content}
              </p>
              <Button
                variant="link"
                className="text-orange-500 p-0 flex items-center hover:text-orange-400 transition-colors gap-0 hover:no-underline text-sm md:text-base"
                onClick={() => setExpandedFAQ(i)}
              >
                {t("faq.learnMore")}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
            {expandedFAQ === i && (
              <div
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-in fade-in duration-300"
                onClick={() => setExpandedFAQ(null)}
              >
                <div
                  className="bg-white/10 backdrop-blur-md p-6 rounded-lg max-w-lg w-[90%] md:w-full relative text-white max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-black/30"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-2 right-2 text-white"
                    onClick={() => setExpandedFAQ(null)}
                  >
                    <X size={18} />
                  </button>
                  <h3 className="text-xl md:text-2xl font-semibold mb-4">
                    {faq.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed mb-4">
                    {faq.content}
                  </p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </>
    );
  };

  const howItWorksCards = [
    {
      icon: <Share2 className="h-5 w-5 md:h-6 md:w-6" />,
      title: t("how.point1.title"),
      description: t("how.point1.description"),
    },
    {
      icon: <Film className="h-5 w-5 md:h-6 md:w-6" />,
      title: t("how.point2.title"),
      description: t("how.point2.description"),
    },
    {
      icon: <Maximize className="h-5 w-5 md:h-6 md:w-6" />,
      title: t("how.point3.title"),
      description: t("how.point3.description"),
    },
    {
      title: t("how.point4.title"),
      description: (
        <ul className="list-inside text-white/70 text-xs md:text-sm leading-relaxed list-none space-y-[18px]">
          <li className="flex items-center gap-x-2">
            <Image src="/network/mvc.png" alt="mvc" width={20} height={20} />
            <span>{t("how.point4.list.0")}</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Image src="/network/fb.png" alt="mvc" width={20} height={20} />
            <span>{t("how.point4.list.1")}</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Image src="/network/bch.png" alt="mvc" width={20} height={20} />
            <span>{t("how.point4.list.2")}</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Image src="/network/bsv.png" alt="mvc" width={20} height={20} />
            <span>{t("how.point4.list.3")}</span>
          </li>
          <li className="flex items-center gap-x-2">
            <Image src="/network/xec.png" alt="mvc" width={20} height={20} />
            <span>{t("how.point4.list.4")}</span>
          </li>
        </ul>
      ),
    },
    {
      title: t("how.point5.title"),
      description: (
        <ul className="list-inside text-white/70 text-xs md:text-sm leading-relaxed list-decimal">
          <li>{t("how.point5.list.0")}</li>
          <li>{t("how.point5.list.1")}</li>
          <li>{t("how.point5.list.2")}</li>
        </ul>
      ),
    },
  ];

  const whySection = [
    {
      title: t("why.point1.title"),
      description: t("why.point1.description"),
    },
    {
      title: t("why.point2.title"),
      description: t("why.point2.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white scroll-smooth">
      <Header />

      <BlockchainVisualization />

      {/* Hero Section */}
      <section
        id="what"
        className="scroll-mt-16 md:scroll-mt-24 min-h-screen flex items-center relative overflow-hidden pt-16 md:pt-24"
        style={{
          backgroundImage: "url('/space-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-semibold leading-tight mb-6 md:mb-8 text-white/90">
              {t("hero.title")}
            </h1>
            <p className="text-white/70 text-base md:text-xl lg:text-2xl leading-loose mb-8 md:mb-12">
              {t("hero.description")}
            </p>
            <div className="space-y-4 md:space-y-6 bg-[#28211b] p-4 md:p-6 rounded-xl">
              {renderFeatures()}
            </div>
          </div>
        </div>
      </section>

      <div
        className="bg-cover bg-center min-h-screen"
        style={{
          backgroundImage: "url('/bg2.png')",
        }}
      >
        {/* MetaID Boosts Section */}
        <section className="scroll-mt-16 md:scroll-mt-24 pt-16 md:pt-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
              <div className="flex-1 flex flex-col items-start hidden">
                <div className="flex flex-col items-start gap-2 md:gap-4 mb-4 md:mb-6">
                  <h2 className="flex items-center gap-x-2 md:gap-x-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold whitespace-nowrap">
                    <Image
                      src="/METAID.svg"
                      alt="MetaID"
                      width={0}
                      height={0}
                      className="w-24 md:w-36"
                    />
                    <span>{t("comparing.title1")}</span>
                  </h2>
                  <h2 className="flex items-center gap-x-2 md:gap-x-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                    <Image
                      src="/Bitcoin.svg"
                      alt="Bitcoin"
                      width={48}
                      height={48}
                      className="size-8 md:size-10 lg:size-12"
                    />
                    <span className="text-white">{t("comparing.title2")}</span>
                  </h2>
                </div>
                <p className="text-white/70 text-sm md:text-base lg:text-lg leading-relaxed">
                  {t("comparing.description")}
                </p>
              </div>
              <div className="flex-1">
                <Image
                  src="/puzzle.png"
                  alt="BTC Scalability"
                  width={500}
                  height={500}
                  className="lg:max-w-[800px] w-full h-auto mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparing" className="scroll-mt-16 md:scroll-mt-24 pb-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 md:mb-12 text-center text-white/90 max-w-[600px] text-balance mx-auto">
              {t("comparison.title")}
            </h2>
            <Image
              src={`/table_${locale}.png`}
              alt="comparing"
              width={500}
              height={500}
              className="max-w-[960px] mx-auto w-full h-auto"
            />
          </div>
        </section>
      </div>

      {/* Why Important Section */}
      <section
        id="why"
        className="scroll-mt-16 md:scroll-mt-24 pt-16 md:pt-24 relative overflow-hidden min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/galaxy-bg.png')",
        }}
      >
        <div className="container mx-auto px-4 relative z-10 sm:mt-60">
          <div className="max-w-4xl mx-auto md:mr-0 md:ml-auto text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-semibold mb-6 text-white">
              {t("why.title")}
            </h2>
            <div className="flex flex-col lg:flex-row gap-8 md:gap-16">
              {whySection.map((point, index) => (
                <div key={index} className="lg:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
                    {point.title}
                  </h3>
                  <p className="text-white/70 text-base md:text-lg leading-loose">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Image
        src="/planet-bg.png"
        alt="Solutions"
        width={500}
        height={500}
        className="max-w-[960px] mx-auto w-full h-auto"
      />
      {/* How It Works Section */}
      <section
        id="how"
        className="scroll-mt-16 md:scroll-mt-24 pt-16 md:pt-24 overflow-hidden pb-12 min-h-screen"
      >
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-semibold leading-tight mb-6 md:mb-8 text-white/90 text-center">
            {t("how.title")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {howItWorksCards.map((card, index) => (
              <Card
                key={index}
                className={`bg-black/40 backdrop-blur-md border-stone-800 ${
                  index === 3 ? "lg:col-span-2" : ""
                }`}
                style={
                  index === 4
                    ? {
                        backgroundImage: "url('/grid-sm-bg.png')",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }
                    : index === 3
                    ? {
                        backgroundImage: "url('/grid-bg.png')",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }
                    : {}
                }
              >
                <CardContent className="p-3 md:p-4">
                  {card.icon && (
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-500/10 flex items-center justify-center mb-3 md:mb-4">
                      <div className="text-orange-500">{card.icon}</div>
                    </div>
                  )}
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-3 text-white/90">
                    {card.title}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm leading-loose mt-[18px]">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="scroll-mt-16 md:scroll-mt-24 pt-16 md:pt-24 relative overflow-hidden min-h-screen"
        style={{
          backgroundImage: "url('/faq-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-semibold leading-tight mb-6 md:mb-8 text-white/90 text-center">
            {t("faq.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {renderFAQs()}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 md:py-6 bg-black border-t border-stone-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white/70 text-xs mb-2 md:mb-0">
              {t("footer.copyright")}
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-4">
              {[
                "MetaID Protocol Labs",
                "MVC DAO",
                "Metalet Team",
                "Octopus Team",
              ].map((item, i) => (
                <Link
                  key={i}
                  href="#"
                  className="text-white/70 text-xs hover:text-orange-500 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

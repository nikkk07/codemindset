import Image from 'next/image';
import Link from 'next/link';
import { BrandDuo } from '@/components/brand/BrandDuo';
import { CallbackForm } from '@/components/contact/CallbackForm';
import { GuideCard } from '@/components/guides/GuideCard';
import { ChatDemo } from '@/components/home/ChatDemo';
import { FAQSection, SectionHead } from '@/components/ui/Blocks';
import { ContactLink } from '@/components/ui/ContactLink';
import {
  ArrowIcon,
  ChatIcon,
  CheckIcon,
  MailIcon,
  PhoneIcon,
  ServiceIcon,
} from '@/components/ui/Icons';
import { JsonLd } from '@/components/ui/JsonLd';
import { ProjectCard } from '@/components/work/ProjectCard';
import { homeFaqs, problems, reasons, steps } from '@/content/home';
import { corePages } from '@/content/pages';
import { site } from '@/content/site';
import { callHref, emailHref, whatsappHref } from '@/lib/contact';
import { getServiceOptions } from '@/lib/enquiry/options';
import { buildMetadata, graph, itemListJsonLd } from '@/lib/seo';
import {
  getVisibleHubs,
  getVisibleIndustries,
  getVisibleLongGuides,
  getVisibleProjects,
  hubHref,
  subHref,
} from '@/lib/visibility';

const page = corePages.home;
export const metadata = buildMetadata({ ...page, absoluteTitle: true });

/** One colour per everyday service, so each is recognisable at a glance. */
const TONES: Record<string, string> = {
  'website-development': 'violet',
  'mobile-app-development': 'blue',
  'ai-chatbots-automation': 'green',
  'crm-whatsapp-integration': 'orange',
  'seo-services': 'teal',
};

export default function HomePage() {
  const hubs = getVisibleHubs();
  const everyday = hubs.filter((h) => h.segment === 'everyday');
  const bigger = hubs.filter((h) => h.segment === 'advanced');
  const help = hubs.find((h) => h.segment === 'start');
  const featured = getVisibleProjects().filter((p) => p.featured);
  const industries = getVisibleIndustries();
  const guides = getVisibleLongGuides();
  const pains = problems.filter((p) => hubs.some((h) => h.slug === p.link));
  const chatbots = hubs.some((h) => h.slug === 'ai-chatbots-automation');

  return (
    <>
      {/* 1. Hook: what we do, for whom, proof and the next step — all above the fold */}
      <section className="hero2" aria-labelledby="hero-title">
        <div className="container hero2__grid">
          <div className="hero2__copy">
            <p className="hero2__badge">
              <span className="hero2__dot" aria-hidden="true" />
              Website &amp; app development company in India
            </p>
            <h1 id="hero-title">
              Websites, apps and chatbots that bring in <span>more customers.</span>
            </h1>
            <p className="lead">
              Website, app and WhatsApp chatbot development for growing businesses across India.
              Fixed quote. Fast delivery. You own everything.
            </p>
            <div className="btn-row btn-row--grow">
              <Link href="/contact/" className="btn btn--primary btn--lg">
                Get a free quote <ArrowIcon />
              </Link>
              <ContactLink
                kind="whatsapp"
                where="hero"
                href={whatsappHref()}
                className="btn btn--outline btn--lg"
              >
                <ChatIcon /> WhatsApp us
              </ContactLink>
            </div>
            <p className="h-hero__note">
              Quick reply · No obligation · Prefer to talk?{' '}
              <ContactLink kind="call" where="hero" href={callHref}>
                Call us
              </ContactLink>
            </p>
            <ul className="hero2__stats">
              <li>
                <strong>{site.proof.websitesLive}</strong>
                <span>websites live</span>
              </li>
              <li>
                <strong>Fixed</strong>
                <span>written quote</span>
              </li>
              <li>
                <strong>100%</strong>
                <span>yours: code &amp; logins</span>
              </li>
            </ul>
          </div>

          {featured.length > 0 ? (
            <div className="hero2__visual" aria-hidden="true">
              <div className="shots">
                {featured.slice(0, 3).map((p) => (
                  <div key={p.slug} className="shot">
                    <div className="shot__bar">{new URL(p.url).hostname.replace(/^www\./, '')}</div>
                    <Image
                      src={p.image}
                      alt=""
                      width={800}
                      height={500}
                      priority
                      sizes="(min-width: 1024px) 460px, 80vw"
                    />
                  </div>
                ))}
              </div>
              <span className="float-chip float-chip--a">
                <CheckIcon /> Mobile-first
              </span>
              <span className="float-chip float-chip--b">
                <CheckIcon /> Google-ready
              </span>
              <span className="float-chip float-chip--c">
                <ChatIcon /> WhatsApp built in
              </span>
            </div>
          ) : null}
        </div>
      </section>

      {/* 2. Proof first: real, live work */}
      {featured.length > 0 ? (
        <section className="section section--flush-top" aria-labelledby="work-title">
          <div className="container">
            <SectionHead
              eyebrow="Our work"
              title="Websites we’ve built that are live today"
              lead={`${site.proof.websitesLive} websites delivered. Open any of them.`}
              id="work-title"
              action={
                <Link href={corePages.work.path} className="link-arrow">
                  See all work
                </Link>
              }
            />
            <div className="proj-grid proj-grid--3">
              {featured.map((p) => (
                <ProjectCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 3. Services: the five most-asked-for, each with its own colour */}
      {everyday.length > 0 ? (
        <section className="section section--alt" aria-labelledby="services-title">
          <div className="container">
            <SectionHead
              eyebrow="What we do"
              title="What does your business need?"
              lead="Pick your goal. We handle the technology."
              id="services-title"
            />
            <div className="svc-grid">
              {everyday.map((h) => (
                <Link
                  key={h.slug}
                  href={hubHref(h.slug)}
                  className="svc"
                  data-tone={TONES[h.slug] ?? 'violet'}
                  data-testid={`tile-${h.slug}`}
                >
                  <span className="icon-box">
                    <ServiceIcon name={h.icon} />
                  </span>
                  <span className="svc__title">{h.plainTitle}</span>
                  <span className="svc__tech">{h.title}</span>
                  <span className="svc__text">{h.blurb}.</span>
                  <span className="svc__more">See how it works →</span>
                </Link>
              ))}
              {help ? (
                <Link href={hubHref(help.slug)} className="svc svc--help">
                  <span className="svc__title">Not sure what you need?</span>
                  <span className="svc__text">
                    Tell us the problem. We will suggest the simplest fix, even if that is a tool
                    you already have.
                  </span>
                  <span className="svc__more">Book a free consultation →</span>
                </Link>
              ) : null}
            </div>
            {bigger.length > 0 ? (
              <div className="bigger">
                <p className="svc-menu__label">For bigger or custom projects</p>
                <ul className="inline-links">
                  {bigger.map((h) => (
                    <li key={h.slug}>
                      <Link href={hubHref(h.slug)}>{h.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* 4. Show, don't tell: what a chatbot does, in a conversation anyone recognises */}
      {chatbots ? (
        <section className="section" aria-labelledby="demo-title">
          <div className="container demo">
            <ChatDemo />
            <div className="demo__copy">
              <p className="kicker">WhatsApp chatbot</p>
              <h2 id="demo-title">Never miss a WhatsApp enquiry again, even at 10 pm</h2>
              <p className="lead">
                It answers questions about timings, prices and bookings the moment they arrive, and
                saves every lead for your team to follow up in the morning.
              </p>
              <ul className="points points--lg">
                <li>
                  <CheckIcon /> Replies in seconds, day and night
                </li>
                <li>
                  <CheckIcon /> Answers only from details you approve
                </li>
                <li>
                  <CheckIcon /> Hands the chat to your team when needed
                </li>
                <li>
                  <CheckIcon /> Official WhatsApp Business Platform, on your number
                </li>
              </ul>
              <div className="btn-row">
                <Link
                  href={subHref('ai-chatbots-automation', 'whatsapp-chatbots')}
                  className="btn btn--primary"
                >
                  See WhatsApp chatbots <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* 5. The problem, in the visitor's own words */}
      {pains.length > 0 ? (
        <section className="section section--alt" aria-labelledby="pains-title">
          <div className="container">
            <SectionHead
              eyebrow="Sound familiar?"
              title="Common problems we fix"
              id="pains-title"
            />
            <ul className="pains">
              {pains.map((p) => (
                <li key={p.problem} className="pain" data-tone={TONES[p.link] ?? 'violet'}>
                  <span className="pain__q">“{p.problem}”</span>
                  <span className="pain__a">{p.fix}</span>
                  <Link href={hubHref(p.link)}>{p.linkLabel} →</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* 6. How it works: low risk, step by step */}
      <section className="section section--ink" aria-labelledby="how-title">
        <div className="container">
          <SectionHead
            eyebrow="How it works"
            title="How does it work?"
            id="how-title"
            action={
              <Link href={corePages.process.path} className="link-arrow">
                How we work
              </Link>
            }
          />
          <ol className="flow">
            {steps.map((s) => (
              <li key={s.title}>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Build + grow: our own marketing agency */}
      <section className="section" aria-labelledby="brands-title">
        <div className="container">
          <BrandDuo />
        </div>
      </section>

      {/* 8. Why us: promises, not adjectives */}
      <section className="section section--alt" aria-labelledby="why-title">
        <div className="container">
          <SectionHead
            eyebrow={`Why ${site.name}`}
            title="What you can count on"
            lead="No fake reviews. No invented numbers."
            id="why-title"
          />
          <ul className="reasons">
            {reasons.map((r) => (
              <li key={r.title}>
                <CheckIcon />
                <strong>{r.title}</strong>
                <span>{r.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. Who we work with */}
      {industries.length > 0 ? (
        <section className="section" aria-labelledby="ind-title">
          <div className="container">
            <SectionHead
              eyebrow="Industries"
              title="Businesses we work with"
              lead="Clinics, coaching institutes, shops, online stores and more, from anywhere in India."
              id="ind-title"
            />
            <ul className="inline-links" style={{ marginTop: 20 }}>
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries/${i.slug}/`}>{i.name}</Link>
                </li>
              ))}
              <li>
                <Link href={corePages.india.path}>Across India →</Link>
              </li>
            </ul>
          </div>
        </section>
      ) : null}

      {guides.length > 0 ? (
        <section className="section section--alt" aria-labelledby="guides-title">
          <div className="container">
            <SectionHead
              eyebrow="Free guides"
              title="Learn first, decide later"
              lead="In-depth, fact-checked guides written for business owners."
              id="guides-title"
              action={
                <Link href={corePages.guides.path} className="link-arrow">
                  All guides
                </Link>
              }
            />
            <div className="gcard-grid" style={{ marginTop: 24 }}>
              {guides.slice(0, 3).map((g) => (
                <GuideCard key={g.slug} g={g} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FAQSection title="Questions people ask before they enquire" items={homeFaqs} where="home" />

      {/* 10. Close: the lowest-effort next step */}
      <section className="section section--flush-top" aria-labelledby="final-title">
        <div className="container">
          <div className="final final--brand">
            <div className="final__copy">
              <h2 id="final-title">Start your project.</h2>
              <p>Quick reply. Clear quote. Fast delivery.</p>
              <ul className="final__links">
                <li>
                  <ContactLink kind="call" where="home-final" href={callHref}>
                    <span>
                      <PhoneIcon />
                    </span>
                    Call us
                  </ContactLink>
                </li>
                <li>
                  <ContactLink kind="whatsapp" where="home-final" href={whatsappHref()}>
                    <span>
                      <ChatIcon />
                    </span>
                    WhatsApp us
                  </ContactLink>
                </li>
                <li>
                  <ContactLink kind="email" where="home-final" href={emailHref}>
                    <span>
                      <MailIcon />
                    </span>
                    Email us
                  </ContactLink>
                </li>
              </ul>
            </div>
            <CallbackForm options={getServiceOptions()} source="/" />
          </div>
        </div>
      </section>

      {featured.length > 0 ? (
        <JsonLd
          data={graph(
            itemListJsonLd(
              `Websites built by ${site.name}`,
              featured.map((p) => ({ name: p.name, url: p.url })),
            ),
          )}
        />
      ) : null}
    </>
  );
}

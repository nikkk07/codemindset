import Link from 'next/link';
import { CallbackForm } from '@/components/contact/CallbackForm';
import { ContactBand, FAQSection, SectionHead, Steps } from '@/components/ui/Blocks';
import { ContactLink } from '@/components/ui/ContactLink';
import { DraftNotice } from '@/components/ui/DraftNotice';
import {
  ArrowIcon,
  ChatIcon,
  CheckIcon,
  MailIcon,
  PhoneIcon,
  ServiceIcon,
} from '@/components/ui/Icons';
import { commitments, featuredRegions, homeFaqs, problems, steps, teamRoles } from '@/content/home';
import { corePages } from '@/content/pages';
import { regions } from '@/content/regions';
import { callHref, emailHref, whatsappHref } from '@/lib/contact';
import { getServiceOptions } from '@/lib/enquiry/options';
import { showDrafts } from '@/lib/env';
import { buildMetadata } from '@/lib/seo';
import {
  getRegion,
  getVisibleHubs,
  getVisibleIndustries,
  getVisibleSubs,
  guideHref,
  hubHref,
  isDraft,
  isGuideVisible,
  subHref,
} from '@/lib/visibility';

const page = corePages.home;
export const metadata = buildMetadata({ ...page, absoluteTitle: true });

export default function HomePage() {
  const hubs = getVisibleHubs();
  // Hero tiles stay the six everyday starting points; every service is in the directory below.
  const main = hubs.filter((h) => h.segment === 'everyday' || h.slug === 'custom-software');
  const assessment = hubs.find((h) => h.slug === 'technical-assessment');
  const industries = getVisibleIndustries();
  const visibleProblems = problems.filter((p) => hubs.some((h) => h.slug === p.link));

  return (
    <>
      {showDrafts() && isDraft(page) ? (
        <DraftNotice>
          This page and the services it lists are awaiting approval. Hidden from search until
          approved.
        </DraftNotice>
      ) : null}

      {/* 1. Hook: what we do, for whom, and a direct route to every service */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="pill">Indian IT services company · Think in Algorithms</span>
            <h1 id="hero-title">
              We build websites, apps and software that <span>grow your business.</span>
            </h1>
            <p className="lead">
              No technical knowledge needed. Tell us what you want — more customers, less manual
              work, faster service — and our team builds it. Delivered fast, anywhere in India.
            </p>
            <div className="btn-row btn-row--grow">
              <Link href="/contact/" className="btn btn--primary btn--lg">
                Get a quote <ArrowIcon />
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
            <p className="hero__note">
              Prefer to talk?{' '}
              <ContactLink kind="call" where="hero" href={callHref}>
                Call us
              </ContactLink>{' '}
              — we reply fast.
            </p>
            <ul className="check-list">
              {[
                'Serving all of India',
                'Fast turnaround',
                'Fixed written quote',
                'You own the code',
              ].map((t) => (
                <li key={t}>
                  <CheckIcon />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {main.length > 0 ? (
            <div className="panel" aria-labelledby="need-title">
              <div className="panel__head">
                <h2 id="need-title">What do you need?</h2>
                <span>Pick one — go straight to it</span>
              </div>
              <div className="panel__tiles">
                {main.map((h) => (
                  <Link
                    key={h.slug}
                    href={hubHref(h.slug)}
                    className="tile"
                    data-testid={`tile-${h.slug}`}
                  >
                    <span className="icon-box">
                      <ServiceIcon name={h.icon} />
                    </span>
                    <span className="tile__text">
                      <strong>{h.plainTitle}</strong>
                      <span>{h.title}</span>
                    </span>
                  </Link>
                ))}
                <Link
                  href={assessment ? hubHref(assessment.slug) : '/contact/'}
                  className="tile tile--amber"
                >
                  <span className="tile__text">
                    <strong>Not sure what you need?</strong>
                    <span>Just tell us the problem — we’ll suggest the solution</span>
                  </span>
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* 2. Reality: the visitor's problem in their own words */}
      {visibleProblems.length > 0 ? (
        <section className="section section--tint" aria-labelledby="problems-title">
          <div className="container">
            <SectionHead
              eyebrow="Sound familiar?"
              title="Real problems. Practical fixes."
              id="problems-title"
            />
            <div className="grid" style={{ '--min': '280px' } as React.CSSProperties}>
              {visibleProblems.map((p) => (
                <article key={p.problem} className="problem">
                  <span className="problem__label">The problem</span>
                  <p className="problem__quote">“{p.problem}”</p>
                  <hr />
                  <span className="problem__label problem__label--fix">The fix</span>
                  <p>{p.fix}</p>
                  <Link href={hubHref(p.link)} className="link-arrow">
                    {p.linkLabel}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section
        className="section section--flush-top"
        style={{ paddingTop: 'clamp(40px, 6vw, 72px)' }}
      >
        <div className="container">
          <ContactBand where="home-band" />
        </div>
      </section>

      {/* 3. Going deeper: every service, platform and need */}
      {hubs.length > 0 ? (
        <section className="section" aria-labelledby="services-title">
          <div className="container">
            <SectionHead
              eyebrow="Going deeper · All services"
              title="Everything we build, in one place"
              lead="Know the technology you want? Jump straight to it. Don’t? Pick “Help me choose” and we’ll recommend the right one."
              id="services-title"
              action={
                <Link href="/services/" className="link-arrow">
                  View all services
                </Link>
              }
            />
            <div className="grid" style={{ '--min': '270px' } as React.CSSProperties}>
              {hubs.map((h, i) => {
                const subs = getVisibleSubs(h);
                const types = subs.filter((s) => s.kind === 'type');
                const tech = subs.filter((s) => s.kind === 'platform');
                return (
                  <div key={h.slug} className={`dir${i === 2 ? ' dir--bold' : ''}`}>
                    <div className="dir__head">
                      <Link href={hubHref(h.slug)}>{h.title}</Link>
                      <span className="dir__num" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="dir__plain">{h.plainTitle}</p>
                    {types.length > 0 ? (
                      <ul>
                        {types.map((s) => (
                          <li key={s.slug}>
                            <Link href={subHref(h.slug, s.slug)}>{s.name}</Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {tech.length > 0 ? (
                      <p className="dir__tech">
                        Built with:{' '}
                        {tech.map((t, j) => (
                          <span key={t.slug}>
                            {j > 0 ? ', ' : ''}
                            <Link href={subHref(h.slug, t.slug)}>{t.name}</Link>
                          </span>
                        ))}
                      </p>
                    ) : null}
                    {isGuideVisible(h) ? (
                      <Link
                        href={guideHref(h.slug)}
                        className={`btn btn--sm dir__choose ${i === 2 ? 'btn--amber' : 'btn--outline'}`}
                      >
                        Help me choose →
                      </Link>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* 4. How it works */}
      <section className="section section--purple" aria-labelledby="how-title">
        <div className="container">
          <SectionHead
            eyebrow="How it works"
            title="From your first message to a system that keeps working"
            id="how-title"
          />
          <Steps items={steps} highlight={2} />
          <div
            className="btn-row"
            style={{ marginTop: 'clamp(24px, 3vw, 36px)', alignItems: 'center' }}
          >
            <Link href="/contact/" className="btn btn--amber btn--lg">
              Start with step 01 →
            </Link>
            <span style={{ color: 'var(--purple-100)' }}>
              or{' '}
              <ContactLink kind="call" where="how-it-works" href={callHref}>
                call us
              </ContactLink>
            </span>
          </div>
        </div>
      </section>

      {/* 5. Industries */}
      {industries.length > 0 ? (
        <section className="section" aria-labelledby="industries-title">
          <div className="container">
            <SectionHead
              eyebrow="Industries"
              title="Built around how your sector works"
              id="industries-title"
            />
            <div className="grid" style={{ '--min': '250px' } as React.CSSProperties}>
              {industries.map((i) => (
                <Link key={i.slug} href={`/industries/${i.slug}/`} className="card">
                  <span className="icon-box">
                    <ServiceIcon name={i.icon} />
                  </span>
                  <span className="card__title">{i.name}</span>
                  <span className="card__text">{`${i.intro.split('. ')[0]}.`}</span>
                  <span className="card__more">See solutions →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 6. Team + India */}
      <section className="section section--flush-top" aria-label="Our team and coverage">
        <div className="container duo">
          <div className="duo__card duo__card--dark">
            <p className="eyebrow">Our team</p>
            <h2>One team. Every skill your project needs.</h2>
            <p>
              Professionals across all major technologies — so you deal with one company, not five
              freelancers.
            </p>
            <ul className="chips">
              {teamRoles.map((r) => (
                <li key={r} className="chip chip--dark">
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="duo__card duo__card--tint">
            <p className="eyebrow">Across India</p>
            <h2>An Indian company, delivering in every state.</h2>
            <p>
              From Kashmir to Kanyakumari, Gujarat to the North-East — all 28 states and 8 union
              territories, in big cities and small towns alike.
            </p>
            <ul className="chips">
              {featuredRegions.map((slug) => {
                const r = regions.find((x) => x.slug === slug);
                if (!r) return null;
                return (
                  <li key={slug}>
                    {getRegion(slug) ? (
                      <Link href={`/india/${slug}/`} className="chip">
                        {r.name}
                      </Link>
                    ) : (
                      <span className="chip">{r.name}</span>
                    )}
                  </li>
                );
              })}
              <li>
                <Link href={corePages.india.path} className="chip chip--solid">
                  All states →
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. The honest version */}
      <section className="section section--flush-top" aria-labelledby="honest-title">
        <div className="container">
          <div className="honest">
            <div>
              <p className="eyebrow">The honest version</p>
              <h2 id="honest-title">No fake reviews. No inflated numbers.</h2>
              <p className="lead">
                You won’t find made-up testimonials, invented statistics or borrowed client logos
                here. Real results are published only with our clients’ permission.
              </p>
            </div>
            <ul className="honest__list">
              {commitments.map((c) => (
                <li key={c.title}>
                  <strong>{c.title}</strong>
                  <span>{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FAQSection title="What people ask before they enquire" items={homeFaqs} where="home" />

      {/* 8. Close */}
      <section className="section section--flush-top" aria-labelledby="final-title">
        <div className="container">
          <div className="final">
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
    </>
  );
}

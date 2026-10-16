import Link from 'next/link';
import { corePages } from '@/content/pages';

export default function NotFound() {
  return (
    <section className="section">
      <div
        className="container"
        style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 760 }}
      >
        <p className="eyebrow">404</p>
        <h1>This page doesn’t exist</h1>
        <p className="lead">
          The link may be out of date, or the address may have a typo. These pages may help instead.
        </p>
        <div className="btn-row">
          <Link href="/" className="btn btn--primary">
            Home
          </Link>
          <Link href={corePages.services.path} className="btn btn--outline">
            Services
          </Link>
          <Link href={corePages.contact.path} className="btn btn--outline">
            Get a quote
          </Link>
        </div>
      </div>
    </section>
  );
}

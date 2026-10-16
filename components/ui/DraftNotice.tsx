import { AlertIcon } from './Icons';

/**
 * Visible only outside production. Marks content that still needs owner confirmation,
 * so reviewers never mistake a draft for an approved claim.
 */
export function DraftNotice({ children }: { children: React.ReactNode }) {
  return (
    <div role="note" className="draft-notice" data-testid="draft-notice">
      <div className="container draft-notice__inner">
        <AlertIcon />
        <p>
          <strong>Draft for review.</strong> {children}
        </p>
      </div>
    </div>
  );
}

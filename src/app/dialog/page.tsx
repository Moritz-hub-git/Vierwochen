import Dialog from '@/components/Dialog';

export const metadata = { title: 'Ihr Fall — vierwochen' };

export default async function DialogSeite({
  searchParams,
}: {
  searchParams: Promise<{ fall?: string }>;
}) {
  const { fall } = await searchParams;
  const start = (fall ?? '').trim().slice(0, 1500);

  return (
    <div className="sheet">
      <header className="masthead">
        <a className="masthead__mark" href="/" style={{ textDecoration: 'none' }}>
          vierwochen<span>.</span>
        </a>
        <div className="masthead__meta">Ersteinschätzung · unverbindlich · ~3 Minuten</div>
      </header>

      {start ? (
        <Dialog start={start} />
      ) : (
        <section className="close">
          <div className="label">Ihr Fall</div>
          <h2>Beschreiben Sie zuerst Ihren Fall.</h2>
          <p className="prose">
            Der Dialog startet auf der Startseite — ein Satz genügt.
          </p>
          <div className="actions">
            <a className="btn btn--primary" href="/">
              Zur Startseite
            </a>
          </div>
        </section>
      )}
    </div>
  );
}

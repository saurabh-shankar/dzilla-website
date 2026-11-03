import { Header, type HeaderVariant } from "./Header";
import { Footer } from "./Footer";

/**
 * Page chrome. Footers follow the references: landing + service pages have one;
 * case studies and the contact page end without a footer.
 */
export function PageShell({
  header,
  footer = "default",
  children,
}: {
  header: HeaderVariant;
  footer?: "default" | "political" | false;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-clip bg-paper text-ink">
      <Header variant={header} />
      <main id="main">{children}</main>
      {footer ? <Footer phoneOrder={footer} /> : null}
    </div>
  );
}

import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { site } from "@/data/site";

const socials = [
  { label: "GitHub", href: site.links.github, Icon: Github },
  { label: "LinkedIn", href: site.links.linkedin, Icon: Linkedin },
  { label: "Email", href: site.links.emailCompose, Icon: Mail },
];

const SiteFooter = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer id="contato" className="section-divider">
      <div className="container-page grid gap-10 py-16 md:grid-cols-3">
        <div>
          <img
            src={site.logo}
            alt=""
            aria-hidden="true"
            className="h-9 w-9 rounded-full object-cover"
          />
          <p className="mt-4 text-lg font-medium">{t("footer.tagline")}</p>
        </div>

        <div>
          <p className="eyebrow mb-4">{t("footer.talk")}</p>
          <ul className="space-y-2.5">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  data-hover
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:text-right">
          <p className="font-hand text-2xl text-muted-foreground">{t("footer.thanks")}</p>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="container-page flex flex-col gap-2 py-5 text-[12px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {t("footer.rights")}
          </p>
          <p className="inline-flex items-center gap-1">
            {t("footer.made")} <span className="text-secondary">&hearts;</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;

import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center overflow-hidden rounded-lg border border-hairline text-[11px] font-mono">
      {(["pt", "en"] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`px-2 py-1.5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            lang === code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={lang === code}
          aria-label={code === "pt" ? "Português" : "English"}
          data-hover
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;

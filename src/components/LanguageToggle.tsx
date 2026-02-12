import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 text-xs font-mono border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setLang("pt")}
        className={`px-2.5 py-1.5 transition-all duration-300 ${
          lang === "pt"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        data-hover
      >
        PT
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-2.5 py-1.5 transition-all duration-300 ${
          lang === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        data-hover
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;

import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

const LanguageSwitcher = () => {
  const { locale, setLocale } = useI18n()
  const toggle = () => setLocale(locale === "en" ? "ar" : "en")
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={toggle}>
        {locale === "en" ? "العربية" : "English"}
      </Button>
    </div>
  )
}

export default LanguageSwitcher


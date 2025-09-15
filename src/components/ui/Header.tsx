import { useI18n } from "@/lib/i18n";

const Header = () => {
  const { t } = useI18n();
  return (
    <header className="bg-blue-500 text-white text-center py-4">
      <h1 className="text-2xl font-bold">{t("app_name")}</h1>
    </header>
  );
};

export default Header;


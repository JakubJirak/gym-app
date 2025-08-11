import FunctionsCard from "@/components/index/FunctionsCard.tsx";

const News = () => {
  return (
    <section className="bg-secondary w-full py-15">
      <h1 className="text-3xl font-bold">NOVNIKY</h1>
      <div className="w-[90%] mx-auto space-y-4 mt-15">
        <FunctionsCard
          title="Přidání Powerlifting cílů"
          text="Nově si můžete v profilu nastavit cíle pro svoje PR na squat, bench a deadlift. V Powerlifting statistikách poté uvidíte progress bar jak moc blízko jste k dosažení cíle."
        />
        <FunctionsCard
          title="Přidání Powerlifting statistik"
          text="Pokud máte zaznamenanou v tréninku alespoň jednu sérii dřepu, benche nebo deadliftu, tak nově ve statistikách najdede tabulku s vašimi PR pro daný cvik. Pokud si v profilu nastavíte svoji váhu, přidá se vám přepočet na BW ratio."
        />
        <FunctionsCard
          title="Kompletní editace tréninku"
          text="Nově se po kliknutí tlačítka upravit u tréninku zobrazí vedle názvu cviku ikona tužky, pod kterou se nacházejí všechny možnosti pro úpravu cviku."
        />
      </div>
    </section>
  );
};

export default News;

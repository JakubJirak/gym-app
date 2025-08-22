import FunctionsCard from "@/components/index/FunctionsCard.tsx";

const News = () => {
  return (
    <section className="bg-secondary w-full py-12">
      <h3 className="text-3xl font-bold">NOVNIKY</h3>
      <div className="w-[90%] mx-auto space-y-4 mt-12">
        <FunctionsCard
          title="Přidání statistik pro každý trénink"
          text="Nově se po kliknutí na libovolný trénink zobrazí nejen všechny cviky,ale také statistiky a grafy pro daný trénink."
        />
        <FunctionsCard
          title="Přidání Powerlifting cílů"
          text="Nově si můžete v profilu nastavit cíle pro svoje PR na squat, bench a deadlift. V Powerlifting statistikách poté uvidíte progress bar jak moc blízko jste k dosažení cíle."
        />
        <FunctionsCard
          title="Přidání Powerlifting statistik"
          text="Pokud máte zaznamenanou v tréninku alespoň jednu sérii dřepu, benche nebo deadliftu, tak nově najdede tabulku s vašimi PR pro daný cvik. Pokud si v profilu nastavíte svoji váhu, přidá se vám přepočet na BW ratio."
        />
      </div>
    </section>
  );
};

export default News;

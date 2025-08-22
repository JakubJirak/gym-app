import FunctionsCard from "@/components/index/FunctionsCard.tsx";

const Functions = () => {
  return (
    <section className="bg-secondary w-full py-12">
      <h3 className="text-3xl font-bold">FUNKCE</h3>
      <div className="w-[90%] mx-auto space-y-4 mt-12">
        <FunctionsCard
          title="Tvorba a správa tréninků"
          text="Sestav si vlastní tréninky přesně podle svých potřeb – vyber cviky z databáze nebo si přidej vlastní. Každý cvik můžeš kdykoliv upravit, mazat či přidávat nové série i opakování."
        />
        <FunctionsCard
          title="Vlastní cviky vždy po ruce"
          text="Přidej si vlastní cviky a ulož si je. Ke každému cviku si vybereš jakou svalovou partii cvičí. Poté u každého tréninku uvidíš statistiky s grafem pro jednotlivé svalové partie."
        />
        <FunctionsCard
          title="Statistiky a progres"
          text="Sleduj detailní statistiky pro všechny cviky i celé tréninky – grafy a přehledy tvého posunu. U trojbojových cviků navíc uvidíš výpočet poměru síly k tělesné váze (BW ratio)."
        />
        <FunctionsCard
          title="Kalendář a cíle"
          text="Získej detailní přehled všech svých tréninků v kalendáři a nastav si cíle pro své Powerlifting PR."
        />
      </div>
    </section>
  );
};

export default Functions;

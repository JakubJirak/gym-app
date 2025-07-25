import FunctionsCard from "@/components/index/FunctionsCard.tsx";

const Functions = () => {
  return (
    <div className="bg-secondary w-full py-15">
      <h1 className="text-3xl font-bold">FUNKCE</h1>
      <div className="w-[90%] mx-auto space-y-4 mt-15">
        <FunctionsCard
          title="Tvorba a správa tréninků"
          text="Sestav si vlastní tréninky přesně podle svých potřeb – vyber cviky z databáze nebo si přidej vlastní. Každý cvik můžeš kdykoliv upravit, mazat či přidávat nové série i opakování."
        />
        <FunctionsCard
          title="Vlastní cviky vždy po ruce"
          text="Přidej si vlastní cviky a ulož si je do rutiny. Při tvorbě nového tréninku je pak jednoduše vložíš bez zdlouhavého vypisování – stačí doplnit váhy nebo série."
        />
        <FunctionsCard
          title="Statistiky a progres"
          text="Sleduj detailní statistiky pro všechny cviky i celé tréninky – grafy a přehledy tvého posunu. U trojbojových cviků navíc uvidíš výpočet poměru síly k tělesné váze (BW ratio)."
        />
        <FunctionsCard
          title="Ocenění a motivace"
          text="Získej medaile a odznaky za své výkony, ať už podle zvednuté váhy nebo podle BW ratia, a motivuj se k dalšímu zlepšení!"
        />
      </div>
    </div>
  );
};

export default Functions;

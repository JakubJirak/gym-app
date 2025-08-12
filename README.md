# Gym App

**Komplexní fitness aplikace pro správu tréninků, cviků a sledování pokroku**

---

## 🚀 Technologie

- **TanStack Start** – Moderní fullstack framework pro rychlý vývoj webových aplikací
- **TypeScript** – Typová bezpečnost napříč projektem
- **Drizzle ORM** – Efektivní a typově bezpečná práce s databází
- **PostgreSQL** – Výkonná relační databáze pro ukládání dat
- **BetterAuth** – Bezpečná autentizace a správa uživatelů
- **shadcn/ui** – Moderní React komponenty pro elegantní UI

---

## 🏋️‍♀️ Funkce aplikace

- **Autentifikace** – Přihlášení a registrace přes BetterAuth
- **Přidávání & editace tréninků** – Kompletní správa tréninků
- **Vlastní cviky** – Možnost vytvářet a spravovat vlastní cviky
- **Statistiky cviků** – Detailní statistiky včetně powerlifting PR a cílů
- **Grafy pokroku** – Vizualizace progresu pro každý cvik
- **Rutiny** – Systém pro rychlé přidávání cviků a tréninků
- **Kalendář tréninků** – Přehled dnů s naplánovaným nebo zapsaným tréninkem
- **Profil uživatele** – Editace údajů, zadání vlastní váhy nebo cílů

---

## 📦 Struktura projektu

```
gym-app/
├── src/
│   ├── components/     # UI komponenty (shadcn/ui)
│   ├── db/             # Drizzle ORM schémata a migrace
│   ├── lib/            # Soubory pro BetterAuth
│   ├── utils/          # Pomocné utility
│   ├── routes/         # Jednotlivé routy aplikace
│   └── ...
├── public/
├── drizzle.config.ts
├── docker-compose.yml
├── package.json
├── README.md
└── ...
```

---

## ⚡ Instalace & spuštění

1. **Klónujte repozitář:**
   ```bash
   git clone https://github.com/JakubJirak/gym-app.git
   cd gym-app
   ```

2. **Instalujte závislosti:**
   ```bash
   npm install
   ```

3. **Nastavte proměnné prostředí (.env):**
   - PostgreSQL connection string
   - BetterAuth konfigurace

4. **Spusťte migraci databáze:**
   ```bash
   npm run db:migrate
   ```

5. **Spusťte vývojový server:**
   ```bash
   npm run dev
   ```

---

## 🌟 Ukázka funkcí

- **Autentifikace** – Přihlášení, registrace, správa profilu
- **Dashboard** – Přehled tréninků, cviků a statistik
- **Editace & přidávání tréninků** – Rychlé rutiny, vlastní cviky, kalendář tréninků
- **Statistiky & grafy** – Progres každého cviku, powerlifting analýzy

---

## 🛡️ Bezpečnost & Autentizace

- **BetterAuth** – Ověření uživatelů, správa session, ochrana dat
- **Drizzle ORM** – Bezpečné SQL dotazy a migrace
- **Env proměnné** – Citlivé údaje mimo kód

---

## 📚 Dokumentace

- [TanStack Start](https://tanstack.com/start)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [BetterAuth](https://www.better-auth.com/)
- [shadcn/ui](https://ui.shadcn.com/)

**Vytvořeno pomocí TanStack Start, TypeScript, Drizzle ORM, PostgreSQL, BetterAuth a shadcn/ui pro všechny gym bros!**

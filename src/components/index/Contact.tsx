import { Card } from "../ui/card";

const Contact = () => {
  return (
    <section className="bg-background w-full py-12">
      <h3 className="text-3xl font-bold">KONTAKT</h3>
      <div className="w-[90%] mx-auto space-y-4 mt-12">
        <a
          href="https://github.com/JakubJirak"
          target="_blank"
          rel="noreferrer"
        >
          <Card>
            <p className="text-center text-xl font-bold tracking-wide">
              github.com/JakubJirak
            </p>
          </Card>
        </a>
      </div>
    </section>
  );
};

export default Contact;

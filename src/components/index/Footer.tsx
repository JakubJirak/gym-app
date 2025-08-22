const Footer = () => {
  return (
    <footer className="bg-secondary w-full py-6 flex justify-center items-center gap-2">
      <a
        className="text-lg tracking-wider hover:underline"
        href="https://jakub.jirak.dev/"
      >
        Jakub Jirák
      </a>
      <p className="text-lg tracking-wider">| {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;

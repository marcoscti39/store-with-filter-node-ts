export const Footer = () => {
  return (
    <footer className="flex justify-center w-full bg-blue-600 py-8 mt-8">
      <p className="text-white font-semibold ">
        @ {new Date().getFullYear()} Comfy Sloth All rights reserved
      </p>
    </footer>
  );
};

import Image from "next/image";

export function HeroDossier() {
  return (
    <div className="relative min-h-[30rem] overflow-hidden border border-white/12 bg-inkSoft shadow-[0_44px_110px_rgba(0,0,0,0.42)]">
      <Image
        alt="Dossier jurídico con documentos, anotaciones estratégicas y marca Leal Abogados"
        className="absolute inset-0 h-full w-full object-cover opacity-95"
        fill
        loading="eager"
        priority
        src="/assets/legal-dossier-v2.svg"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,7,0.15),rgba(7,7,7,0)_48%,rgba(7,7,7,0.28))]" />
      <div className="absolute left-5 top-5 border border-white/14 bg-black/45 px-4 py-3 backdrop-blur-md">
        <p className="font-serif text-2xl font-semibold text-white">18+</p>
        <p className="mt-1 max-w-32 text-xs leading-5 text-white/62">años de experiencia jurídica</p>
      </div>
      <div className="absolute bottom-5 right-5 max-w-60 border border-white/14 bg-black/48 p-4 backdrop-blur-md">
        <span className="block h-px w-10 bg-brand-red" />
        <p className="mt-4 text-sm font-semibold leading-6 text-white">Consulta, criterio y ruta legal antes de actuar.</p>
      </div>
    </div>
  );
}

import Image from "next/image";

export function HeroDossier() {
  return (
    <div className="relative mx-auto min-h-[22rem] w-full max-w-xl overflow-hidden border border-white/12 bg-inkSoft shadow-[0_44px_110px_rgba(0,0,0,0.42)] lg:min-h-[30rem] lg:max-w-none">
      <Image
        alt="Dossier jurídico con documentos, anotaciones estratégicas y marca Leal Abogados"
        className="absolute inset-0 h-full w-full object-cover opacity-95"
        fill
        loading="eager"
        priority
        src="/assets/leal-hero-logo-original.png"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,7,0.18),rgba(7,7,7,0)_48%,rgba(7,7,7,0.34))]" />
      <div className="absolute left-4 top-4 border border-white/14 bg-black/45 px-3 py-2 backdrop-blur-md sm:left-5 sm:top-5 sm:px-4 sm:py-3">
        <p className="font-serif text-xl font-semibold text-white sm:text-2xl">18 años</p>
        <p className="mt-1 max-w-28 text-[11px] leading-4 text-white/72 sm:max-w-32 sm:text-xs sm:leading-5">de experiencia jurídica</p>
      </div>
      <div className="absolute bottom-4 right-4 max-w-52 border border-white/14 bg-black/48 p-3 backdrop-blur-md sm:bottom-5 sm:right-5 sm:max-w-60 sm:p-4">
        <span className="block h-px w-10 bg-brand-red" />
        <p className="mt-3 text-xs font-semibold leading-5 text-white sm:mt-4 sm:text-sm sm:leading-6">Consulta, criterio y ruta legal antes de actuar.</p>
      </div>
    </div>
  );
}

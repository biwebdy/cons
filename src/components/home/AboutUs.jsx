export default function AboutUs({ lang }) {
  return (
    <div className="tailwind">
      <section className="bg-yellow-brand pt-6 pb-12">
        <div className="container mx-auto">
          <div
            className="border-2 border-blue-brand rounded-full  w-[165px] flex items-center justify-around  my-4"
            style={{ border: "2px solid" }}
          >
            <div className="bg-blue-brand rounded-full p-2 w-4 h-4"> </div>
            <p className="text-blue-brand text-sm font-proxima font-bold pt-3">
              {lang === "fr"
                ? "À propos de nous"
                : lang === "ger"
                ? "Über uns"
                : "About us"}
            </p>
          </div>
          <div className="flex gap-5">
            <h2 className="text-blue-brand lg:text-[45px] text-[30px]  font-proxima leading-[40px] animate-up-1">
              {lang === "fr"
                ? "Expertree est soutenu par LifeSci Consulting SA, qui a été actif en Suisse depuis 2011."
                : lang === "ger"
                ? "Expertree wird von LifeSci Consulting SA unterstützt, die seit 2011 in der Schweiz aktiv ist."
                : "Expertree is supported by LifeSci Consulting SA, which has been active in Switzerland since 2011."}
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}

import Image from "next/image";

export default function WhatWeOffer({ lang }) {
  return (
    <>
      <div className="tailwind">
        <div className="grey-bg py-[50px]  ">
          <div className="container mx-auto">
            <div className="main-title text-center text-blue-brand animate-up-1">
              <h2>
                {lang === "fr"
                  ? "Spécialisation dans l'industrie de la vie"
                  : lang === "ger"
                  ? "Spezialisierung in der Lebensmittelindustrie"
                  : "Specialized Expertise in Life Sciences "}
              </h2>
              <p className="text-gray-500 mt-4 text-lg">
                {lang === "fr"
                  ? "Connectez-vous avec des consultants qui ont les compétences spécifiques à votre projet, dans plusieurs domaines"
                  : lang === "ger"
                  ? "Verbinden Sie sich mit Beratern, die die spezifischen Fähigkeiten und Erfahrungen Ihres Projekts benötigen, in verschiedenen Disziplinen"
                  : "Connect with consultants who have the specific industry knowledge and experience your projects require, across multipledisciplines"}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-3 lg:col-span-1">
                <div className="bg-blue-brand p-6 rounded-lg shadow-md text-center w-[90%] mx-auto">
                  <Image
                    src="/images/home/icons/projectmng.svg"
                    alt="Project Management"
                    width={60}
                    height={60}
                  />
                  <h3 className="text-yellow font-bold text-2xl mt-4">
                    {lang === "fr"
                      ? "Gestion de projet"
                      : lang === "ger"
                      ? "Projektmanagement"
                      : "Project Management"}
                  </h3>
                  <hr className="border-yellow border-2 w-1/4 mx-auto mt-4" />
                  <p className="text-white mt-4">
                    {lang === "fr"
                      ? "Des chefs de projet expérimentés qui garantissent que vos initiatives en sciences de la vie sont livrées dans les délais et dans le respect du budget."
                      : lang === "ger"
                      ? "Experienced Projektmanager, die sicherstellen, dass Ihre Leben-Wissenschaft-Initiativen rechtzeitig und innerhalb des Budgets geliefert werden."
                      : "Experienced project managers who ensure your life science initiatives are delivered on time and within budget."}
                  </p>
                </div>
              </div>
              <div className="col-span-3 lg:col-span-1">
                <div className="bg-blue-brand p-6 rounded-lg shadow-md text-center w-[90%] mx-auto">
                  <Image
                    src="/images/home/icons/validation.svg"
                    alt="Validation"
                    width={60}
                    height={60}
                  />
                  <h3 className="text-yellow font-bold text-2xl mt-4">
                    {lang === "fr"
                      ? "Validation"
                      : lang === "ger"
                      ? "Validierung"
                      : "Validation"}
                  </h3>
                  <hr className="border-yellow border-2 w-1/4 mx-auto mt-4" />
                  <p className="text-white mt-4">
                    {lang === "fr"
                      ? "Experts en établissement de preuves documentées pour garantir que les systèmes, les processus et l'équipement répondent aux exigences réglementaires."
                      : lang === "ger"
                      ? "Experten in der Erstellung dokumentierter Beweise, um sicherzustellen, dass Systeme, Prozesse und Ausrüstung den regulatorischen Anforderungen entsprechen."
                      : "Experts in establishing documented evidence to ensure systems, processes, and equipment meet regulatory requirements."}
                  </p>
                </div>
              </div>
              <div className="col-span-3 lg:col-span-1">
                <div className="bg-blue-brand p-6 rounded-lg shadow-md text-center w-[90%] mx-auto">
                  <Image
                    src="/images/home/icons/regulation.svg"
                    alt="Data Integrity"
                    width={60}
                    height={60}
                  />
                  <h3 className="text-yellow font-bold text-2xl mt-4">
                    {lang === "fr"
                      ? "Intégrité des données"
                      : lang === "ger"
                      ? "Datenintegrität"
                      : "Data Integrity"}
                  </h3>
                  <hr className="border-yellow border-2 w-1/4 mx-auto mt-4" />
                  <p className="text-white mt-4">
                    {lang === "fr"
                      ? "Assurez l’exactitude et la fiabilité des données tout au long de leur cycle de vie, en garantissant la conformité et la confiance."
                      : lang === "ger"
                      ? "Stellen Sie sicher, dass die Daten genau und zuverlässig während ihres Lebenszyklus bleiben, indem Sie die Einhaltung und die Vertrauen gewährleisten."
                      : "Ensure data accuracy and reliability throughout its lifecycle, maintaining compliance and trust."}
                  </p>
                </div>
              </div>
              <div className="col-span-3 lg:col-span-1">
                <div className="bg-blue-brand p-6 rounded-lg shadow-md text-center w-[90%] mx-auto">
                  <Image
                    src="/images/home/icons/quality.svg"
                    alt="Quality Assurance"
                    width={60}
                    height={60}
                  />
                  <h3 className="text-yellow font-bold text-2xl mt-4">
                    {lang === "fr"
                      ? "Assurance de la qualité"
                      : lang === "ger"
                      ? "Qualitätsgarantie"
                      : "Quality Assurance"}
                  </h3>
                  <hr className="border-yellow border-2 w-1/4 mx-auto mt-4" />
                  <p className="text-white mt-4">
                    {lang === "fr"
                      ? "Conservez les normes de qualité les plus élevées avec des consultants expérimentés dans GMP, GLP, ISO et d'autres cadres de qualité."
                      : lang === "ger"
                      ? "Behalten Sie die höchsten Qualitätsstandards mit Beratern, die in GMP, GLP, ISO und anderen Qualitätsrahmen erfahren sind."
                      : "Maintain highest quality standards with consultants experienced in GMP, GLP, ISO, and other quality frameworks."}
                  </p>
                </div>
              </div>
              <div className="col-span-3 lg:col-span-1">
                <div className="bg-blue-brand p-6 rounded-lg shadow-md text-center w-[90%] mx-auto">
                  <Image
                    src="/images/home/icons/clinical.svg"
                    alt="Computerized System Validation"
                    width={60}
                    height={60}
                  />
                  <h3 className="text-yellow font-bold text-2xl mt-4">
                    {lang === "fr"
                      ? "Validation des systèmes informatiques"
                      : lang === "ger"
                      ? "Computerisierte Systeme Validierung"
                      : "Computerized System Validation"}
                  </h3>
                  <hr className="border-yellow border-2 w-1/4 mx-auto mt-4" />
                  <p className="text-white mt-4">
                    {lang === "fr"
                      ? "Validez les systèmes en matière de sécurité et de conformité aux normes de l’industrie, afin de garantir des opérations efficaces."
                      : lang === "ger"
                      ? "Validieren Sie Systeme hinsichtlich Sicherheit und Einhaltung von Branchenstandards, um einen effizienten Betrieb sicherzustellen."
                      : "Validate systems for security and compliance with industry standards, ensuring efficient operations."}
                  </p>
                </div>
              </div>
              <div className="col-span-3 lg:col-span-1">
                <div className="bg-blue-brand p-6 rounded-lg shadow-md text-center w-[90%] mx-auto">
                  <Image
                    src="/images/home/icons/medical.svg"
                    alt="MSAT"
                    width={60}
                    height={60}
                  />
                  <h3 className="text-yellow font-bold text-2xl mt-4">
                    {lang === "fr" ? "MSAT" : lang === "ger" ? "MSAT" : "MSAT"}
                  </h3>
                  <hr className="border-yellow border-2 w-1/4 mx-auto mt-4" />
                  <p className="text-white mt-4">
                    {lang === "fr"
                      ? "Optimisez les processus de fabrication pour la qualité et l’efficacité grâce aux avancées scientifiques et technologiques."
                      : lang === "ger"
                      ? "Optimieren Sie die Herstellungsschritte für Qualität und Effizienz durch fortschrittliche Wissenschaft und Technologie."
                      : "Optimize manufacturing processes for quality and efficiency through advanced science and technology."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

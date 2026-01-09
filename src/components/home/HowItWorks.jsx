"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function HowItWorks({ lang }) {
  const router = useRouter();
  return (
    <>
      <div className="tailwind">
        <div className="bg-blue-brand py-[50px]  ">
          <div className="container mx-auto">
            <div className="main-title text-center text-yellow animate-up-1">
              <h2>
                {lang === "fr"
                  ? "Comment ça marche"
                  : lang === "ger"
                  ? "Wie es funktioniert"
                  : "How It Works"}
              </h2>
              <p className="text-white mt-4 mb-8 text-lg">
                {lang === "fr"
                  ? "Notre processus rend la recherche et l'engagement avec des consultants spécialisés dans le secteur de la vie rapide et efficace."
                  : lang === "ger"
                  ? "Unsere Prozess macht es schnell und effizient, spezialisierte Leitungskräfte im Leitungsbereich zu finden und mit ihnen zu engagieren."
                  : "Our process makes finding and engaging with specialized life science consultants quick and efficient."}
              </p>
            </div>

            <div className="hidden lg:block relative mt-20 mb-16">
              <div className="absolute top-[120px] left-0 right-0 h-1 bg-white"></div>

              <div className="flex justify-between relative">
                <div className="flex flex-col items-center w-1/4 px-2">
                  <div className="bg-yellow-brand rounded-full w-16 h-16 flex items-center justify-center  relative z-10">
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-blue-900 text-3xl font-bold">
                        1
                      </span>
                    </div>
                  </div>
                  <div className="h-16 w-0.5 bg-white"></div>
                  <div
                    className="bg-blue-brand rounded-full w-5 h-5 absolute top-28 z-20"
                    style={{ border: "1px solid white" }}
                  >
                    <div className="bg-yellow-brand rounded-full w-3 h-3 mx-auto mt-[3px]"></div>
                  </div>
                  <div className="text-center mt-6">
                    <p className="text-md text-white">
                      {lang === "fr"
                        ? "Inscrivez-vous et créez votre profil."
                        : lang === "ger"
                        ? "Registrieren Sie sich und erstellen Sie Ihr Profil."
                        : "Sign up and create your profile."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center w-1/4 px-2">
                  <div className="bg-yellow-brand rounded-full w-16 h-16 flex items-center justify-center  relative z-10">
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-blue-900 text-3xl font-bold">
                        2
                      </span>
                    </div>
                  </div>
                  <div className="h-16 w-0.5 bg-white"></div>
                  <div
                    className="bg-blue-brand rounded-full w-5 h-5 absolute top-28 z-20"
                    style={{ border: "1px solid white" }}
                  >
                    <div className="bg-yellow-brand rounded-full w-3 h-3 mx-auto mt-[3px]"></div>
                  </div>{" "}
                  <div className="text-center mt-6">
                    <p className="text-md text-white">
                      {lang === "fr"
                        ? "Recherchez des consultants spécialisés dans votre besoin."
                        : lang === "ger"
                        ? "Suchen Sie nach Beratern, die Ihren Bedarf erfüllen."
                        : "Search for consultants based on your needs."}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center w-1/4 px-2">
                  <div className="bg-yellow-brand rounded-full w-16 h-16 flex items-center justify-center  relative z-10">
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-blue-900 text-3xl font-bold">
                        3
                      </span>
                    </div>
                  </div>
                  <div className="h-16 w-0.5 bg-white"></div>
                  <div
                    className="bg-blue-brand rounded-full w-5 h-5 absolute top-28 z-20"
                    style={{ border: "1px solid white" }}
                  >
                    <div className="bg-yellow-brand rounded-full w-3 h-3 mx-auto mt-[3px]"></div>
                  </div>{" "}
                  <div className="text-center mt-6">
                    <p className="text-md text-white">
                      {lang === "fr"
                        ? "Envoyer une proposition au consultant."
                        : lang === "ger"
                        ? "Senden Sie eine Anfrage an den Berater."
                        : "Send a proposal to the consultant."}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center w-1/4 px-2">
                  <div className="bg-yellow-brand rounded-full w-16 h-16 flex items-center justify-center  relative z-10">
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-blue-900 text-3xl font-bold">
                        4
                      </span>
                    </div>
                  </div>
                  <div className="h-16 w-0.5 bg-white"></div>
                  <div
                    className="bg-blue-brand rounded-full w-5 h-5 absolute top-28 z-20"
                    style={{ border: "1px solid white" }}
                  >
                    <div className="bg-yellow-brand rounded-full w-3 h-3 mx-auto mt-[3px]"></div>
                  </div>{" "}
                  <div className="text-center mt-6">
                    <p className="text-md text-white">
                      {lang === "fr"
                        ? "Obtenir la réponse du consultant et commencer à travailler."
                        : lang === "ger"
                        ? "Erhalten Sie die Antwort des Beraters und beginnen Sie mit der Arbeit."
                        : "Get the consultants response and start working."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="block lg:hidden">
              <div className="w-full mx-auto">
                <div className="flex flex-col items-center  px-2">
                  <div className="bg-yellow-brand rounded-full w-16 h-16 flex items-center justify-center  relative z-10">
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-blue-900 text-3xl font-bold">
                        1
                      </span>
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-md text-white">
                      {lang === "fr"
                        ? "Inscrivez-vous et créez votre profil."
                        : lang === "ger"
                        ? "Registrieren Sie sich und erstellen Sie Ihr Profil."
                        : "Sign up and create your profile."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center  px-2">
                  <div className="bg-yellow-brand rounded-full w-16 h-16 flex items-center justify-center  relative z-10">
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-blue-900 text-3xl font-bold">
                        2
                      </span>
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-md text-white">
                      {lang === "fr"
                        ? "Recherchez des consultants spécialisés dans votre besoin."
                        : lang === "ger"
                        ? "Suchen Sie nach Beratern, die Ihren Bedarf erfüllen."
                        : "Search for consultants based on your needs."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center  px-2">
                  <div className="bg-yellow-brand rounded-full w-16 h-16 flex items-center justify-center  relative z-10">
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-blue-900 text-3xl font-bold">
                        3
                      </span>
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-md text-white">
                      {lang === "fr"
                        ? "Envoyer une proposition au consultant."
                        : lang === "ger"
                        ? "Senden Sie eine Anfrage an den Berater."
                        : "Send a proposal to the consultant."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center  px-2">
                  <div className="bg-yellow-brand rounded-full w-16 h-16 flex items-center justify-center  relative z-10">
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                      <span className="text-blue-900 text-3xl font-bold">
                        4
                      </span>
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-md text-white">
                      {lang === "fr"
                        ? "Obtenir la réponse du consultant et commencer à travailler."
                        : lang === "ger"
                        ? "Erhalten Sie die Antwort des Beraters und beginnen Sie mit der Arbeit."
                        : "Get the consultants response and start working."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="btn-prm"
                onClick={() => router.push("/register")}
              >
                {lang === "fr"
                  ? "Commencer aujourd'hui"
                  : lang === "ger"
                  ? "Heute starten"
                  : "Get Started Today"}
              </button>
            </div>

            <div className="main-title text-center text-yellow animate-up-1 mt-20">
              <h2>
                {lang === "fr"
                  ? "Avantages pour tous"
                  : lang === "ger"
                  ? "Vorteile für alle"
                  : "Benefits for Everyone"}
              </h2>
              <p className="text-white mt-4 mb-8 text-lg">
                {lang === "fr"
                  ? "Expertree crée de la valeur pour les entreprises qui recherchent des compétences spécialisées et les consultants qui offrent leurs compétences spécialisées."
                  : lang === "ger"
                  ? "Expertree erstellt Wert für beide Seiten: Für Unternehmen, die Experten benötigen, und für Berater, die ihre Fähigkeiten anbieten."
                  : "Expertree creates value for both companies seeking expertise and consultants offering their specialized skills."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12">
              <div className="col-span-2 lg:col-span-1">
                <div className="bg-yellow-brand rounded-md  text-center py-6">
                  <div className="bg-blue-brand rounded-full p-2 w-24 h-24 flex items-center justify-center mx-auto mt-6">
                    <Image
                      src="/images/home/icons/company.svg"
                      alt="icon"
                      width={60}
                      height={60}
                      className="mx-auto "
                    />
                  </div>
                  <h2 className="text-blue-brand text-2xl font-bold mt-2">
                    {lang === "fr"
                      ? "Pour les entreprises de la vie scientifique"
                      : lang === "ger"
                      ? "Für Lebensmittelunternehmen"
                      : "For Life Science Companies"}
                  </h2>
                  <hr className="text-blue-brand bg-blue-brand border-blue-brand border-1 w-full" />
                  <div className="h-[130px] lg:h-[80px]">
                    <h3 className="text-blue-brand text-xl font-bold">
                      {lang === "fr"
                        ? "Schnelle Beschaffung"
                        : lang === "ger"
                        ? "Schnelle Beschaffung"
                        : "Fast Hiring"}
                    </h3>
                    <p className="text-blue-brand text-sm w-2/3 text-center mx-auto">
                      {lang === "fr"
                        ? "Accédez à un réseau de consultants spécialisés avec des compétences en sciences de la vie facilement et rapidement."
                        : lang === "ger"
                        ? "Zugang zu einem Netzwerk von Expertenberatern mit Fachkenntnissen in der Lebensmittelindustrie schnell und einfach."
                        : "Access a network of life science consultants with expertise easily and quickly."}
                    </p>
                  </div>
                  <hr className="text-blue-brand bg-blue-brand border-blue-brand border-1 w-full" />
                  <div className="h-[130px] lg:h-[80px]">
                    <h3 className="text-blue-brand text-xl font-bold">
                      {lang === "fr"
                        ? "Accès à plus de 100 consultants"
                        : lang === "ger"
                        ? "Zugang zu mehr als 100 Expertenberatern"
                        : "Access to more than 100 consultants"}
                    </h3>
                    <p className="text-blue-brand text-sm w-2/3 text-center mx-auto">
                      {lang === "fr"
                        ? "Trouvez le consultant approprié pour vos besoins parmi plus de 100 consultants spécialisés."
                        : lang === "ger"
                        ? "Finden Sie den passenden Berater für Ihre Bedürfnisse aus einem Netzwerk von 100+ Expertenberatern."
                        : "Find the right consultant for your needs from a network of 100+ consultants."}
                    </p>
                  </div>
                  <hr className="text-blue-brand bg-blue-brand border-blue-brand border-1 w-full" />
                  <div className="h-[130px] lg:h-[80px]">
                    <h3 className="text-blue-brand text-xl font-bold">
                      {lang === "fr"
                        ? "Système de paie en ligne"
                        : lang === "ger"
                        ? "Online-Gehaltsabrechnungssystem"
                        : "Online Payroll System"}
                    </h3>
                    <p className="text-blue-brand text-sm w-2/3 text-center mx-auto">
                      {lang === "fr"
                        ? "Accédez à un réseau de consultants spécialisés avec des compétences en sciences de la vie facilement et rapidement."
                        : lang === "ger"
                        ? "Zugang zu einem Netzwerk von Expertenberatern mit Fachkenntnissen in der Lebensmittelindustrie schnell und einfach."
                        : "We offer a payroll system that is easy to use and manage."}
                    </p>
                  </div>

                  <hr className="text-blue-brand bg-blue-brand border-blue-brand border-1 w-full" />
                  <button
                    className="btn-tri"
                    onClick={() => router.push("/register-client")}
                  >
                    {lang === "fr"
                      ? "Engager un consultant"
                      : lang === "ger"
                      ? "Berater engagieren"
                      : "Hire Consultant"}
                  </button>
                </div>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <div className="bg-white rounded-md text-center py-6">
                  <div className="bg-blue-brand rounded-full p-2 w-24 h-24 flex items-center justify-center mx-auto mt-6">
                    <Image
                      src="/images/home/icons/businessman.svg"
                      alt="icon"
                      width={60}
                      height={60}
                      className="mx-auto"
                    />
                  </div>
                  <h2 className="text-blue-brand text-2xl font-bold mt-2">
                    {lang === "fr"
                      ? "Pour les consultants"
                      : lang === "ger"
                      ? "Für Berater"
                      : "For Consultants"}
                  </h2>
                  <hr className="text-blue-brand bg-blue-brand border-blue-brand border-1 w-full" />
                  <div className="h-[130px] lg:h-[80px]">
                    <h3 className="text-blue-brand text-xl font-bold">
                      {lang === "fr"
                        ? "Flexible Arbeitszeiten"
                        : lang === "ger"
                        ? "Flexible Arbeitszeiten"
                        : "Flexible Work Hours"}
                    </h3>
                    <p className="text-blue-brand text-sm w-2/3 text-center mx-auto">
                      {lang === "fr"
                        ? "Choisissez votre propre horaire de travail."
                        : lang === "ger"
                        ? "Wählen Sie Ihren eigenen Arbeitszeitplan."
                        : "Choose your own work schedule."}
                    </p>
                  </div>
                  <hr className="text-blue-brand bg-blue-brand border-blue-brand border-1 w-full" />
                  <div className="h-[130px] lg:h-[80px]">
                    <h3 className="text-blue-brand text-xl font-bold">
                      {lang === "fr"
                        ? "Transparence"
                        : lang === "ger"
                        ? "Transparenz"
                        : "Transparency"}
                    </h3>
                    <p className="text-blue-brand text-sm w-2/3 text-center mx-auto">
                      {lang === "fr"
                        ? "Nous offrons un système de paie transparent. Savoir où chaque centime est allé."
                        : lang === "ger"
                        ? "Wir bieten ein transparentes Gehaltsabrechnungssystem. Wissen, wo jeder Cent hin geht."
                        : "We offer a transparent payroll system. Understand where every penny is going."}
                    </p>
                  </div>
                  <hr className="text-blue-brand bg-blue-brand border-blue-brand border-1 w-full" />
                  <div className="h-[130px] lg:h-[80px]">
                    <h3 className="text-blue-brand text-xl font-bold">
                      {lang === "fr"
                        ? "Choisissez votre taux"
                        : lang === "ger"
                        ? "Wählen Sie Ihren Stundensatz"
                        : "Choose Your Rate"}
                    </h3>
                    <p className="text-blue-brand text-sm w-2/3 text-center mx-auto">
                      {lang === "fr"
                        ? "Choisissez votre taux horaire."
                        : lang === "ger"
                        ? "Wählen Sie Ihren Stundensatz."
                        : "Choose your own rate."}
                    </p>
                  </div>

                  <hr className="text-blue-brand bg-blue-brand border-blue-brand border-1 w-full" />
                  <button
                    className="btn-tri"
                    onClick={() => router.push("/register")}
                  >
                    {lang === "fr"
                      ? "Rejoignez comme consultant"
                      : lang === "ger"
                      ? "Als Berater beitreten"
                      : "Join as Consultant"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

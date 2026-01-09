import {
  Award,
  Banknote,
  Timer,
  CircleCheckBig,
  ShieldCheck,
} from "lucide-react";

export default function ValuePropsSection() {
  return (
    <section className="tailwind ">
      <div className="grey-bg py-[50px]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="main-title text-center text-blue-brand animate-up-1">
              Why Choose Expertree
            </h2>
            <p className="text-gray-500 my-6 text-lg">
              Three reasons teams trust us to hire faster, better, and smarter.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
            {/* Widget 1: Quality First */}
            <div className="h-full rounded-[18px] p-[1px] ">
              <article className="h-full flex flex-col bg-white rounded-[16px] p-6 md:p-8 shadow-[0_10px_30px_rgba(6,22,59,0.08)] hover:shadow-[0_16px_40px_rgba(6,22,59,0.12)] hover:-translate-y-1 transition-all">
                <div className="flex items-start gap-4 mb-5">
                  <div className="bg-[#083B5D] rounded-[12px] p-3 shrink-0">
                    <Award className="text-yellow" size={28} />
                  </div>
                  <div>
                    <h3 className="text-blue font-bold text-[22px] leading-[26px] mb-1">
                      Quality First
                    </h3>
                    <p className="text-[#697488] text-[15px] leading-[22px]">
                      Unmatched quality with a 3‑step selection process
                    </p>
                  </div>
                </div>
                <ul className="space-y-3 mt-2 pl-0 md:pl-0">
                  <li className="flex items-start gap-3">
                    <div>
                      <p className="text-blue font-semibold mb-1">
                        Initial Vetting
                      </p>
                      <p className="text-[#697488] text-[15px] leading-[22px]">
                        Based on resumes, reputation, recommendation and
                        references.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div>
                      <p className="text-blue font-semibold mb-1">
                        Behavioral Insights Interview
                      </p>
                      <p className="text-[#697488] text-[15px] leading-[22px]">
                        Using the AEC DISC® framework to assess behaviour for
                        optimized performance.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div>
                      <p className="text-blue font-semibold mb-1">
                        Technical Evaluation
                      </p>
                      <p className="text-[#697488] text-[15px] leading-[22px]">
                        Led by industry experts with role‑playing scenarios and
                        mimicking real‑world challenges.
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="flex items-center gap-2 mt-6 text-[#1F4B3F]">
                  <ShieldCheck size={18} />
                  <span className="text-[14px]">Verified by experts</span>
                </div>
              </article>
            </div>

            {/* Widget 2: Cost Efficiency Through Automation */}
            <div className="h-full rounded-[18px] p-[1px] ">
              <article className="h-full flex flex-col bg-white rounded-[16px] p-6 md:p-8 shadow-[0_10px_30px_rgba(6,22,59,0.08)] hover:shadow-[0_16px_40px_rgba(6,22,59,0.12)] hover:-translate-y-1 transition-all">
                <div className="flex items-start gap-4 mb-5">
                  <div className="bg-[#083B5D] rounded-[12px] p-3 shrink-0">
                    <Banknote className="text-yellow" size={28} />
                  </div>
                  <div>
                    <h3 className="text-blue font-bold text-[22px] leading-[26px] mb-1">
                      Cost Efficiency
                    </h3>
                    <p className="text-[#697488] text-[15px] leading-[22px]">
                      Automation to minimize costs and maximize rewards
                    </p>
                  </div>
                </div>
                <ul className="space-y-3 mt-2 pl-0">
                  <li className="flex items-start gap-3">
                    <div>
                      <p className="text-blue font-semibold mb-1">
                        Lean, Automated Workflow
                      </p>
                      <p className="text-[#697488] text-[15px] leading-[22px]">
                        Our automated process cuts unnecessary steps, letting us
                        offer the most competitive prices.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div>
                      <p className="text-blue font-semibold mb-1">
                        Transparent Pricing & Access
                      </p>
                      <p className="text-[#697488] text-[15px] leading-[22px]">
                        No hidden fees. Get real‑time access to profiles, rates,
                        and availabilities.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div>
                      <p className="text-blue font-semibold mb-1">
                        Fair Terms for Consultants
                      </p>
                      <p className="text-[#697488] text-[15px] leading-[22px]">
                        Consultants benefit from transparent, fair, and open
                        terms.
                      </p>
                    </div>
                  </li>
                </ul>
              </article>
            </div>

            {/* Widget 3: 24-Hour Candidate Delivery */}
            <div className="h-full rounded-[18px] p-[1px] ">
              <article className="h-full flex flex-col bg-white rounded-[16px] p-6 md:p-8 shadow-[0_10px_30px_rgba(6,22,59,0.08)] hover:shadow-[0_16px_40px_rgba(6,22,59,0.12)] hover:-translate-y-1 transition-all">
                <div className="flex items-start gap-4 mb-5">
                  <div className="bg-[#083B5D] rounded-[12px] p-3 shrink-0">
                    <Timer className="text-yellow" size={28} />
                  </div>
                  <div>
                    <h3 className="text-blue font-bold text-[22px] leading-[26px] mb-1">
                      24‑Hour Candidate Delivery
                    </h3>
                    <p className="text-[#697488] text-[15px] leading-[22px]">
                      Optimized supply chain and AI‑powered matching
                    </p>
                  </div>
                </div>
                <ul className="space-y-3 mt-2 pl-0">
                  <li className="flex items-start gap-3">
                    <div>
                      <p className="text-blue font-semibold mb-1">
                        Parallel Sourcing & Coordination
                      </p>
                      <p className="text-[#697488] text-[15px] leading-[22px]">
                        Streamlined supply chain delivers qualified candidates
                        within 24 hours through parallel sourcing and rapid
                        coordination.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div>
                      <p className="text-blue font-semibold mb-1">
                        AI‑Driven Prioritization
                      </p>
                      <p className="text-[#697488] text-[15px] leading-[22px]">
                        AI‑driven ranking reduces time‑to‑hire by prioritizing
                        best‑fit profiles based on skills, domain expertise,
                        rates, and availability.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div>
                      <p className="text-blue font-semibold mb-1">
                        Confirmed Shortlists in 24 Hours
                      </p>
                      <p className="text-[#697488] text-[15px] leading-[22px]">
                        Confirmed shortlists help you meet deadlines
                        effortlessly with candidates ready for immediate
                        interviews and fast starts.
                      </p>
                    </div>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

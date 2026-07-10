import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/data";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Privacy Policy — ARK Kidoid App | Masti Ki Paathshaala",
  description:
    "Privacy Policy for the ARK Kidoid mobile app by Masti Ki Paathshaala — how we handle information for parents and teachers, including account deletion.",
};

const EFFECTIVE_DATE = "July 10, 2026";

export default function PrivacyPolicy() {
  return (
    <>
      {/* Simple header */}
      <header className="sticky top-0 z-50 border-b border-ink/5 bg-cream/85 backdrop-blur-xl">
        <div className="container-x flex h-[72px] items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Masti Ki Paathshaala home">
            <Image src="/mkplogo.png" alt="Masti Ki Paathshaala" width={44} height={44} className="h-11 w-11 object-contain" />
            <span className="hidden font-display text-lg font-extrabold leading-none tracking-tight text-ink sm:block">
              Masti Ki<br />
              <span className="text-orange">Paathshaala</span>
            </span>
          </Link>
          <Link href="/" className="btn-ghost">
            <Icon name="arrow" size={16} className="rotate-180" /> Back to Home
          </Link>
        </div>
      </header>

      <main id="main" className="relative overflow-hidden">
        {/* Hero band */}
        <section className="relative bg-hero-mesh">
          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-sky/10 blur-3xl" />
          <div className="container-x py-16 sm:py-20">
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" /> Legal
            </span>
            <h1 className="heading mt-5 text-4xl sm:text-5xl">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">
              This Privacy Policy explains how <strong>Masti Ki Paathshaala</strong> collects,
              uses, and protects information within the{" "}
              <strong>{CONTACT.appName}</strong> mobile application, used by parents and
              teachers of our academy.
            </p>
            <p className="mt-4 text-sm font-semibold text-ink/50">
              Effective date: {EFFECTIVE_DATE}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="container-x pb-24">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-10 rounded-5xl bg-white p-7 shadow-card ring-1 ring-ink/5 sm:p-12">
              <Clause n="1" title="Who this policy applies to">
                <p>
                  The {CONTACT.appName} app is provided to two types of users of Masti Ki
                  Paathshaala:
                </p>
                <ul>
                  <li>
                    <strong>Parents &amp; guardians</strong> — to view their child&apos;s
                    activities, attendance, progress and status.
                  </li>
                  <li>
                    <strong>Teachers &amp; instructors</strong> — to mark attendance, view
                    their schedules and manage assigned batches.
                  </li>
                </ul>
                <p>
                  By creating an account or using the app, you agree to the practices
                  described in this policy.
                </p>
              </Clause>

              <Clause n="2" title="Information we collect">
                <ul>
                  <li>
                    <strong>Account details:</strong> name, phone number, email address and
                    your role (parent or teacher), used to create and secure your account.
                  </li>
                  <li>
                    <strong>For parents:</strong> your child&apos;s name, enrolled program /
                    batch, attendance records, activity updates and progress status shared by
                    the academy.
                  </li>
                  <li>
                    <strong>For teachers / instructors:</strong> your class schedule, assigned
                    batches and the attendance and activity entries you record.
                  </li>
                  <li>
                    <strong>Basic device &amp; usage information:</strong> such as app version,
                    device type and log data, used to keep the app secure and working
                    reliably.
                  </li>
                </ul>
                <p>
                  We collect only the information needed to run the academy&apos;s day-to-day
                  activities. We do not sell your data and we do not use it for third-party
                  advertising.
                </p>
              </Clause>

              <Clause n="3" title="How we use your information">
                <ul>
                  <li>To let parents view their child&apos;s attendance, activities and status.</li>
                  <li>To let teachers mark attendance and view their schedules.</li>
                  <li>To send important updates, notices and reminders related to the academy.</li>
                  <li>To maintain, secure and improve the app experience.</li>
                  <li>To comply with legal or safety obligations where required.</li>
                </ul>
              </Clause>

              <Clause n="4" title="Children's information">
                <p>
                  A child&apos;s information in {CONTACT.appName} is provided and managed by the
                  academy and its authorised staff. It is visible only to that child&apos;s
                  linked parent / guardian and the relevant teachers and administrators of
                  their branch. We treat children&apos;s data with extra care, never sell it,
                  and never use it for advertising or profiling.
                </p>
              </Clause>

              <Clause n="5" title="How we share information">
                <p>We share information only in limited ways:</p>
                <ul>
                  <li>
                    <strong>Within your branch:</strong> between the relevant parents,
                    teachers and administrators, to run classes and share updates.
                  </li>
                  <li>
                    <strong>Trusted service providers:</strong> that help us operate the app
                    (for example, secure hosting), under confidentiality obligations.
                  </li>
                  <li>
                    <strong>Legal reasons:</strong> when required by law, or to protect the
                    safety and rights of our students, staff and community.
                  </li>
                </ul>
                <p>We never sell your personal information.</p>
              </Clause>

              <Clause n="6" title="Data security & retention">
                <p>
                  We use reasonable technical and organisational measures to protect your
                  information against unauthorised access, loss or misuse. We keep information
                  only for as long as your account is active or as needed to provide the
                  service and meet legal requirements.
                </p>
              </Clause>

              {/* Account deletion — highlighted */}
              <div className="rounded-4xl bg-orange-tint p-6 ring-1 ring-orange/20 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange text-white">
                    <Icon name="shield" size={22} />
                  </span>
                  <h2 className="heading text-xl">7. Account &amp; data deletion</h2>
                </div>
                <div className="prose-clause mt-4">
                  <p>
                    You can request deletion of your {CONTACT.appName} account and its
                    associated personal data at any time. Because accounts are linked to a
                    specific centre, <strong>account deletion is handled by contacting your
                    respective Masti Ki Paathshaala branch.</strong>
                  </p>
                  <p>
                    Please reach out to the branch where you (or your child) are enrolled, or
                    use the contact details below, and our team will verify your request and
                    delete your account and associated personal data, except where we are
                    legally required to retain certain records.
                  </p>
                  <ul>
                    <li>
                      Email:{" "}
                      <a href={CONTACT.emailHref} className="font-semibold text-orange">
                        {CONTACT.email}
                      </a>
                    </li>
                    <li>
                      Phone / WhatsApp:{" "}
                      <a href={CONTACT.phoneHref} className="font-semibold text-orange">
                        {CONTACT.phone}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <Clause n="8" title="Your rights">
                <p>
                  Subject to applicable law, you may request access to, correction of, or
                  deletion of your personal information. To exercise these rights, contact your
                  branch or use the details below.
                </p>
              </Clause>

              <Clause n="9" title="Changes to this policy">
                <p>
                  We may update this Privacy Policy from time to time. When we do, we will
                  revise the &ldquo;Effective date&rdquo; above and, where appropriate, notify
                  you within the app.
                </p>
              </Clause>

              <Clause n="10" title="Contact us">
                <p>
                  For any questions about this policy or your data, contact Masti Ki
                  Paathshaala:
                </p>
                <ul>
                  <li>
                    Email:{" "}
                    <a href={CONTACT.emailHref} className="font-semibold text-orange">
                      {CONTACT.email}
                    </a>
                  </li>
                  <li>
                    Phone / WhatsApp:{" "}
                    <a href={CONTACT.phoneHref} className="font-semibold text-orange">
                      {CONTACT.phone}
                    </a>
                  </li>
                  <li>
                    Instagram:{" "}
                    <a
                      href={CONTACT.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-orange"
                    >
                      {CONTACT.instagramHandle}
                    </a>
                  </li>
                </ul>
              </Clause>
            </div>

            <p className="mt-8 text-center text-sm text-ink/45">
              This policy applies to the {CONTACT.appName} app by Masti Ki Paathshaala.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Clause({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="heading flex items-baseline gap-2 text-xl">
        <span className="text-orange">{n}.</span> {title}
      </h2>
      <div className="prose-clause mt-3">{children}</div>
    </div>
  );
}

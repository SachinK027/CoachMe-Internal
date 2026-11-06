import type { Workshop } from "./types";

export const workshops: Workshop[] = [
  {
    slug: "do-we-really-understand-each-other",
    title: "Do We Really Understand Each Other?",
    language: "English",
    format: "Online",
    shortDescription: "Practical tools for clearer communication at work",
    description:
      "Bring one real work situation that isn't going as well as you'd like. In three hours, we'll look at what is actually happening in that conversation, where it breaks down, and what you can do differently. You'll work with your own situation throughout, so you leave with practical tools and a clear next step. Confidentiality: no need to disclose real names or company names — you can present your situation anonymously.",
    learningOutcomes: [
      "Ask questions that get you the information you actually need",
      "Make conversations more specific and clear",
      "Understand other people's points of view",
      "Reduce misunderstandings and handle difficult conversations with more confidence",
    ],
    audience: "Professionals and leaders who want clearer workplace communication.",
    facilitator: "Mirjana Radenović Ratković, MSc in Communication Sciences and founder of CoachME Advisory. 26+ years leading people in multinational business environments.",
    startDate: "2026-11-28",
    endDate: "2026-11-28",
    timeLabel: "11am Gulf Standard Time (GST)",
    timezone: "Asia/Dubai",
    duration: "3 hours",
    price: 395,
    currency: "AED",
    maxParticipants: 10,
    availableSeats: 10,
    cancellationPolicy:
      "Cancellations made at least 7 days before the workshop are eligible for a full refund. Cancellations made less than 7 days before the workshop are non-refundable. If you are unable to attend, you may transfer your place to another person by contacting CoachME at least 24 hours before the workshop. Full Terms & Conditions apply.",
    image: "/images/workshops/english-workshop.png",
    status: "upcoming",
    seo: {
      title: "Do We Really Understand Each Other? | CoachME Advisory",
      description:
        "Live online English workshop on practical tools for clearer communication at work. 28 November 2026.",
    },
  },
  {
    slug: "da-li-se-zaista-razumemo",
    title: "Da Li Se Zaista Razumemo?",
    language: "Serbian",
    format: "Online",
    shortDescription: "Praktični alati za jasniju komunikaciju na poslu",
    description:
      "Ponesi jednu stvarnu situaciju sa posla koja ne ide kako bi trebalo. Za tri sata ćemo razložiti šta se u tom razgovoru zapravo dešava, gde zapinje i šta možeš da uradiš drugačije. Ceo rad je na tvojoj situaciji, pa ne odlaziš samo sa alatima, već i sa jasnim sledećim korakom. Poverljivost: situaciju možeš da predstaviš anonimno bez imena ili naziva kompanije.",
    learningOutcomes: [
      "Kako da postavljaš pitanja koja ti daju informacije koje su ti stvarno potrebne",
      "Kako da razgovor učiniš konkretnijim i jasnijim",
      "Kako da bolje razumeš tuđu perspektivu",
      "Kako da smanjiš nesporazume i lakše vodiš teške razgovore",
    ],
    audience: "Profesionalci i lideri koji žele jasniju komunikaciju na poslu.",
    facilitator:
      "Mirjana Radenović Ratković, MSc iz komunikacionih nauka i osnivač CoachME Advisory. 26+ godina vođenja ljudi u multinacionalnom poslovnom okruženju.",
    startDate: "2026-11-21",
    endDate: "2026-11-21",
    timeLabel: "10h (vreme u Srbiji - CET)",
    timezone: "Europe/Belgrade",
    duration: "3 sata",
    price: 245,
    currency: "AED",
    priceNote: "oko 58 €, u zavisnosti od kursa",
    maxParticipants: 10,
    availableSeats: 10,
    cancellationPolicy:
      "Ukoliko otkažete učešće najmanje 7 dana pre radionice, biće vam vraćen celokupan uplaćeni iznos. Za otkazivanje manje od 7 dana pre radionice, uplaćeni iznos se ne vraća. Ako niste u mogućnosti da prisustvujete, svoje mesto možete preneti na drugu osobu uz obaveštenje CoachME-u najmanje 24 sata pre početka radionice. Važe Uslovi poslovanja.",
    image: "/images/workshops/serbian-workshop.png",
    status: "upcoming",
    seo: {
      title: "Da Li Se Zaista Razumemo? | CoachME Advisory",
      description:
        "Uživo online radionica na srpskom jeziku — praktični alati za jasniju komunikaciju na poslu. 21. novembar 2026.",
    },
  },
];

export function getWorkshopBySlug(slug: string) {
  return workshops.find((workshop) => workshop.slug === slug);
}

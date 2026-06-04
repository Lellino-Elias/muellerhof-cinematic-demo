/**
 * ─────────────────────────────────────────────────────────────────────────
 *  CAMPSITE TEMPLATE — Datenschicht (Single Source of Truth)
 * ─────────────────────────────────────────────────────────────────────────
 *  Das Design liest AUSSCHLIESSLICH aus diesem Objekt. Kein hartkodierter
 *  Text in den Komponenten. Für einen neuen Campingplatz: nur dieses Objekt
 *  + die Bilder unter /public/campsites/<slug>/ austauschen — Design bleibt.
 *
 *  Sektionen sind optional: fehlt ein Block (z. B. keine `mobilheime`),
 *  blendet sich die Sektion automatisch aus.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type ImageRef = { src: string; alt: string };

export type Feature = { title: string; text: string; image: ImageRef };

export type Accommodation = {
  name: string;
  kind: string;
  text: string;
  image: ImageRef;
  priceFrom?: number;
  features?: string[];
};

export type Activity = { title: string; text: string; image: ImageRef };

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export type BookingCategory = {
  id: string;
  label: string;
  /** Preis pro Nacht (Basis, 2 Personen) — Platzhalter, mit Kunde bestätigen */
  perNight: number;
  /** Aufpreis je weiterer Person/Nacht */
  perExtraGuest?: number;
};

export interface CampsiteConfig {
  name: string;
  shortName: string;
  slug: string;
  ort: string;
  region: string;
  see: string;
  regionLong: string;
  claim: string;
  claimEmphasis: string; // Wort/Phrase im Headline, das hervorgehoben (serif italic) wird
  intro: string;
  pillars: { title: string; text: string }[];
  usps: string[];
  awards: { label: string; image?: ImageRef }[];
  saison: { von: string; bis: string };
  hero: { aerial: ImageRef; sunset: ImageRef };
  camping: { heading: string; intro: string; features: Feature[] };
  mobilheime?: { heading: string; intro: string; items: Accommodation[] };
  kinder?: { heading: string; intro: string; features: Feature[] };
  aktivitaeten?: { heading: string; intro: string; items: Activity[] };
  anreise: { heading: string; modes: { title: string; text: string }[] };
  galerie: ImageRef[];
  booking: {
    heading: string;
    intro: string;
    categories: BookingCategory[];
    pricesArePlaceholder: boolean;
  };
  kontakt: {
    tel: string;
    telHref: string;
    mail: string;
    facebook: string;
    adresse: string;
    coords: { lat: number; lng: number };
  };
  languages: string[];
  nav: NavItem[];
}

const IMG = "/campsites/muellerhof";

export const campsite: CampsiteConfig = {
  name: "FKK-Camping Müllerhof",
  shortName: "Müllerhof",
  slug: "muellerhof",
  ort: "Keutschach am See",
  region: "Kärnten",
  see: "Keutschacher See",
  regionLong: "Region Wörthersee · Kärnten · Österreich",

  claim: "Das ruhige FKK-Camping-Erlebnis am Keutschacher See",
  claimEmphasis: "Keutschacher See",
  intro:
    "Viel Platz und Privatsphäre in sonniger Natur — direkt am Naturbadesee mit Trinkwasserqualität. Spontan buchen mit Platzgarantie, ganz ohne Reservierungsgebühr.",

  pillars: [
    { title: "Freiheitsliebe", text: "Pure Entspannung am Naturbadesee mit Trinkwasserqualität." },
    { title: "Naturschönheit", text: "Pure Erholung in einer idyllischen Landschaft am Wörthersee." },
    { title: "Wohlfühlcamping", text: "Gepflegte Anlage, TOP-Seerestaurant und WLAN auf dem ganzen Gelände." },
  ],

  usps: [
    "Ohne Reservierungsgebühr",
    "Platzgarantie ohne Preisaufschlag",
    "Drei Badestrände am See",
    "TOP-Seerestaurant",
    "WLAN auf dem gesamten Gelände",
    "Trinkwasserqualität im See",
  ],

  awards: [
    { label: "ADAC Camping 2024", image: { src: `${IMG}/adac24-camping.png`, alt: "ADAC Camping Auszeichnung 2024" } },
    { label: "PiNCAMP Top 100 Österreich 2024", image: { src: `${IMG}/PiNCAMP_Top_100_Icon_2024___sterreich.png`, alt: "PiNCAMP Top 100 Österreich 2024" } },
    { label: "Ausgezeichneter Campingplatz", image: { src: `${IMG}/award25.png`, alt: "Auszeichnung Campingplatz 2025" } },
  ],

  saison: { von: "April", bis: "Oktober" },

  hero: {
    aerial: { src: `${IMG}/luft-titel2007-5247.jpg`, alt: "Luftaufnahme des FKK-Camping Müllerhof am Keutschacher See" },
    sunset: { src: `${IMG}/163-6376_sonnenu.jpg`, alt: "Sonnenuntergang am Keutschacher See" },
  },

  camping: {
    heading: "Camping am See",
    intro:
      "Ein Platz, der atmet: weite Stellplätze in der Sonne, drei eigene Badestrände und ein See in Trinkwasserqualität — Erholung, wie sie sein soll.",
    features: [
      { title: "Traumlage", text: "Eingebettet in die idyllische Landschaft am Keutschacher See, mitten in der Region Wörthersee.", image: { src: `${IMG}/luft1.jpg`, alt: "Traumlage am Keutschacher See aus der Luft" } },
      { title: "Stellplätze", text: "Großzügige, sonnige Stellplätze mit viel Platz und Privatsphäre — direkt am Wasser oder im Grünen.", image: { src: `${IMG}/fkk_165915.jpg`, alt: "Sonnige Stellplätze am Müllerhof" } },
      { title: "Drei Badestrände", text: "Gleich drei eigene Badestrände laden zum Schwimmen im glasklaren Naturbadesee ein.", image: { src: `${IMG}/fkk_165896.jpg`, alt: "Badestrand am Keutschacher See" } },
      { title: "Sanitäreinrichtung", text: "Gepflegte, moderne Sanitäranlagen sorgen für Komfort während des gesamten Aufenthalts.", image: { src: `${IMG}/fkk_165905.jpg`, alt: "Gepflegte Anlage am Müllerhof" } },
      { title: "Seerestaurant", text: "Kulinarischer Genuss mit Seeblick: das TOP-Seerestaurant verwöhnt von früh bis spät.", image: { src: `${IMG}/rest08-terrasse-6315.jpg`, alt: "Seerestaurant mit Terrasse am Müllerhof" } },
      { title: "Der kleine Laden", text: "Frische Brötchen und alles für den täglichen Bedarf — direkt am Platz.", image: { src: `${IMG}/shop-0854.jpg`, alt: "Der kleine Laden am Campingplatz" } },
    ],
  },

  mobilheime: {
    heading: "Mobilheime & Mietunterkünfte",
    intro: "Komfortabel wohnen mitten in der Natur — schlüsselfertig, stilvoll, direkt am See.",
    items: [
      { name: "Nemo", kind: "Mobilheim", text: "Modernes Mobilheim mit überdachter Terrasse — ideal für Paare und kleine Familien.", image: { src: `${IMG}/fkk-wohnen6447-nemo.jpg`, alt: "Mobilheim Nemo am Müllerhof" }, priceFrom: 89, features: ["bis 4 Personen", "Terrasse", "voll ausgestattet"] },
      { name: "Ginger", kind: "Mobilheim", text: "Großzügiges Mobilheim mit viel Licht und Platz für entspannte Familientage.", image: { src: `${IMG}/fkk-wohnen6447-ginger.jpg`, alt: "Mobilheim Ginger am Müllerhof" }, priceFrom: 95, features: ["bis 5 Personen", "2 Schlafzimmer", "Terrasse"] },
      { name: "Mietwohnwagen", kind: "Mietwohnwagen", text: "Die unkomplizierte Art zu campen — fertig eingerichtet, einfach ankommen.", image: { src: `${IMG}/fkk-wohnen6404.jpg`, alt: "Mietwohnwagen am Müllerhof" }, priceFrom: 65, features: ["bis 4 Personen", "Vorzelt", "sofort bezugsfertig"] },
    ],
  },

  kinder: {
    heading: "Für die ganze Familie",
    intro: "Hier dürfen Kinder Kinder sein: Animation, Natur zum Anfassen und Platz zum Spielen.",
    features: [
      { title: "Kinderanimation", text: "Buntes Programm in den Ferien — von Spielen bis Basteln, für strahlende Kinderaugen.", image: { src: `${IMG}/clown-12-3881.jpg`, alt: "Kinderanimation am Müllerhof" } },
      { title: "Naturerlebnis", text: "See, Wiese, Wald: Die Natur ist der schönste Abenteuerspielplatz.", image: { src: `${IMG}/kinder-rad.jpg`, alt: "Kinder beim Radfahren in der Natur" } },
      { title: "Spielplatz & Spielraum", text: "Geschützte Spielbereiche zum Toben — drinnen wie draußen.", image: { src: `${IMG}/fkk_165890.jpg`, alt: "Spielbereich am Campingplatz" } },
    ],
  },

  aktivitaeten: {
    heading: "Aktiv in Kärnten",
    intro: "Berge, Seen und Kultur direkt vor der Tür — die Region Wörthersee ist ein Spielplatz für Entdecker.",
    items: [
      { title: "Bergerlebnisse", text: "Wandern in den Kärntner Nockbergen und auf den Hausbergen rund um den See.", image: { src: `${IMG}/Wandern.jpg`, alt: "Wandern in den Bergen Kärntens" } },
      { title: "Radfahren & Biken", text: "Genussradln am See oder anspruchsvolle Touren — direkt ab Platz.", image: { src: `${IMG}/Rad.jpg`, alt: "Radfahren rund um den Wörthersee" } },
      { title: "Golfen", text: "Mehrere Golfplätze in der Umgebung für entspannte Runden mit Aussicht.", image: { src: `${IMG}/golf1.jpg`, alt: "Golfen in der Region Wörthersee" } },
      { title: "Burg Hochosterwitz", text: "Eine der schönsten Burgen Österreichs — ein Ausflug in die Geschichte.", image: { src: `${IMG}/hochosterwitz-0472.jpg`, alt: "Burg Hochosterwitz" } },
      { title: "Großglockner", text: "Die legendäre Hochalpenstraße — Alpenpanorama zum Greifen nah.", image: { src: `${IMG}/grossglockner_3733.jpg`, alt: "Großglockner Hochalpenstraße" } },
      { title: "Minimundus", text: "Die Welt im Kleinen am Wörthersee — ein Klassiker für Familien.", image: { src: `${IMG}/125-2598_minimundus.jpg`, alt: "Minimundus am Wörthersee" } },
    ],
  },

  anreise: {
    heading: "So findest du uns",
    modes: [
      { title: "Mit dem Auto", text: "Über die A2 Südautobahn bis Klagenfurt, dann Richtung Keutschach am See — gut beschildert." },
      { title: "Mit dem Flugzeug", text: "Flughafen Klagenfurt (KLU) in rund 20 Minuten Fahrt, Ljubljana & Graz als Alternativen." },
      { title: "Mit Bahn & Bus", text: "Bahnhof Klagenfurt Hbf, weiter mit Bus oder Transfer in die Region Keutschach." },
    ],
  },

  galerie: [
    { src: `${IMG}/luft2.jpg`, alt: "Luftaufnahme des Campingplatzes am See" },
    { src: `${IMG}/fkk_165913.jpg`, alt: "Idylle am Keutschacher See" },
    { src: `${IMG}/rest08-terrasse6303.jpg`, alt: "Terrasse des Seerestaurants" },
    { src: `${IMG}/fkk-wohnen6-6716.jpg`, alt: "Wohnen am Müllerhof" },
    { src: `${IMG}/fkk_165903.jpg`, alt: "Stellplatz im Grünen" },
    { src: `${IMG}/shop-0867.jpg`, alt: "Der kleine Laden" },
    { src: `${IMG}/fkk_165898.jpg`, alt: "Sonniger Tag am See" },
    { src: `${IMG}/fkk_165910.jpg`, alt: "Natur am Keutschacher See" },
  ],

  booking: {
    heading: "Buchen & Anfragen",
    intro: "Wähle Zeitraum, Unterkunft und Personen — wir melden uns mit deiner persönlichen Verfügbarkeit. Ohne Reservierungsgebühr.",
    pricesArePlaceholder: true,
    categories: [
      { id: "stellplatz", label: "Stellplatz", perNight: 28, perExtraGuest: 7 },
      { id: "mietwohnwagen", label: "Mietwohnwagen", perNight: 65, perExtraGuest: 6 },
      { id: "mobilheim", label: "Mobilheim", perNight: 89, perExtraGuest: 6 },
    ],
  },

  kontakt: {
    tel: "+43 4273 2517",
    telHref: "tel:+4342732517",
    mail: "muellerhof@fkk-camping.at",
    facebook: "https://www.facebook.com/muellerhof/",
    adresse: "Keutschach am See · Kärnten · Österreich",
    coords: { lat: 46.5897, lng: 14.2272 },
  },

  languages: ["DE", "EN", "NL"],

  nav: [
    {
      label: "Camping",
      href: "#camping",
      children: [
        { label: "Traumlage", href: "#camping" },
        { label: "Stellplätze", href: "#camping" },
        { label: "Drei Badestrände", href: "#camping" },
        { label: "Sanitäreinrichtung", href: "#camping" },
        { label: "Seerestaurant", href: "#camping" },
        { label: "Der kleine Laden", href: "#camping" },
        { label: "3D-Tour", href: "#" },
      ],
    },
    {
      label: "Mobilheime",
      href: "#mobilheime",
      children: [
        { label: "Nemo", href: "#mobilheime" },
        { label: "Ginger", href: "#mobilheime" },
        { label: "Mietwohnwagen", href: "#mobilheime" },
      ],
    },
    {
      label: "Kinder",
      href: "#kinder",
      children: [
        { label: "Kinderanimation", href: "#kinder" },
        { label: "Naturerlebnis", href: "#kinder" },
        { label: "Spielplatz & Spielraum", href: "#kinder" },
      ],
    },
    {
      label: "Aktivitäten",
      href: "#aktivitaeten",
      children: [
        { label: "Bergerlebnisse", href: "#aktivitaeten" },
        { label: "Radfahren & Biken", href: "#aktivitaeten" },
        { label: "Golfen", href: "#aktivitaeten" },
        { label: "Wörthersee Plus Card", href: "#" },
        { label: "Ausflugsziele", href: "#aktivitaeten" },
      ],
    },
    {
      label: "Preise & Lage",
      href: "#booking",
      children: [
        { label: "Lageplan", href: "#anreise" },
        { label: "Preise Stellplätze", href: "#booking" },
        { label: "Preise Mobilheime", href: "#booking" },
        { label: "Dauercamper", href: "#" },
        { label: "Angebote", href: "#booking" },
      ],
    },
    {
      label: "Anreise",
      href: "#anreise",
      children: [
        { label: "Mit dem Auto", href: "#anreise" },
        { label: "Mit dem Flugzeug", href: "#anreise" },
        { label: "Mit Bahn & Bus", href: "#anreise" },
      ],
    },
  ],
};

export default campsite;

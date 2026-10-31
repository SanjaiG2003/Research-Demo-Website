/* Sample data. In the Django version this comes from the database.
   Names, papers and numbers are placeholders – replace with real content. */

const SITE = { name: "Meridian Research Hub", tagline: "Open research from our four-person team", email: "research@example.org" };

const RESEARCHERS = [
  { id: 1, name: "Dr. Amara Okafor", role: "Principal Investigator", areas: ["Machine Learning", "Data Ethics"],
    bio: "Leads the group's work on privacy-preserving machine learning and the fairness of automated decisions.", email: "a.okafor@example.org", active: true },
  { id: 2, name: "Dr. Daniel Reyes", role: "Senior Researcher", areas: ["Public Health", "Data Ethics"],
    bio: "Studies how community programmes and surveillance data shape public health outcomes.", email: "d.reyes@example.org", active: true },
  { id: 3, name: "Dr. Priya Nair", role: "Senior Researcher", areas: ["Environmental Science"],
    bio: "Works on coastal and freshwater ecosystems, combining field sampling with remote sensing.", email: "p.nair@example.org", active: true },
  { id: 4, name: "Dr. Elena Voss", role: "Researcher", areas: ["Education Technology"],
    bio: "Researches adaptive learning tools and how teachers adopt new technology in the classroom.", email: "e.voss@example.org", active: true }
];

const AREAS = ["Machine Learning", "Public Health", "Environmental Science", "Education Technology", "Data Ethics"];

// status: approved | pending | rejected | archived
const PAPERS = [
  { id: 1, title: "Federated Learning for Rural Clinic Diagnostics", ownerId: 1, authors: "Amara Okafor, L. Mensah", area: "Machine Learning", year: 2025,
    keywords: ["federated learning", "diagnostics", "privacy", "healthcare"], status: "approved", featured: true, views: 1240, downloads: 310, publicView: true,
    abstract: "We evaluate federated learning across twelve low-connectivity clinics to train diagnostic models without centralising patient records. Models matched centralised baselines within two percentage points of accuracy. We discuss communication costs and consent requirements for deployment." },
  { id: 2, title: "Transformer Models for Low-Resource Language Translation", ownerId: 1, authors: "Amara Okafor", area: "Machine Learning", year: 2024,
    keywords: ["transformers", "translation", "low-resource languages", "transfer learning"], status: "approved", featured: true, views: 980, downloads: 255, publicView: true,
    abstract: "This paper tests transfer learning strategies for translating between languages with few parallel texts. Pre-training on related languages improved translation quality more than adding synthetic data. We release evaluation sets for three regional languages." },
  { id: 3, title: "Community Vaccination Outreach: A Mixed-Methods Study", ownerId: 2, authors: "Daniel Reyes, S. Whitfield", area: "Public Health", year: 2023,
    keywords: ["vaccination", "community outreach", "health equity", "mixed methods"], status: "approved", featured: true, views: 860, downloads: 190, publicView: true,
    abstract: "We combine survey data with interviews to understand why vaccination uptake differs across neighbourhoods. Trusted local messengers raised uptake more than mass advertising. The findings suggest funding should favour community-led outreach." },
  { id: 4, title: "Air Quality Sensors and Urban Asthma Admissions", ownerId: 2, authors: "Daniel Reyes, Priya Nair", area: "Public Health", year: 2025,
    keywords: ["air quality", "asthma", "sensors", "urban health"], status: "approved", featured: false, views: 640, downloads: 120, publicView: true,
    abstract: "Low-cost air quality sensors were deployed across a city for eighteen months and compared with hospital admissions for asthma. Spikes in fine particulate matter preceded admissions by two to three days. We outline how sensor networks could support early warnings." },
  { id: 5, title: "Coastal Wetland Carbon Storage Under Sea-Level Rise", ownerId: 3, authors: "Priya Nair", area: "Environmental Science", year: 2024,
    keywords: ["wetlands", "carbon storage", "sea-level rise", "coastal ecosystems"], status: "approved", featured: true, views: 720, downloads: 160, publicView: true,
    abstract: "Soil cores from nine coastal wetlands show how carbon storage changes as water levels rise. Sites able to migrate inland kept their stored carbon, while constrained sites lost it. Protecting inland buffer zones is therefore central to wetland climate policy." },
  { id: 6, title: "Microplastics in Freshwater Catchments", ownerId: 3, authors: "Priya Nair, T. Okello", area: "Environmental Science", year: 2022,
    keywords: ["microplastics", "freshwater", "pollution", "sampling"], status: "approved", featured: false, views: 510, downloads: 98, publicView: true,
    abstract: "We sampled river water from twenty catchments to estimate microplastic loads. Concentrations were highest downstream of wastewater outlets. The study proposes a standard sampling protocol so results can be compared between regions." },
  { id: 7, title: "Adaptive Quizzing and Learning Gains in Secondary Mathematics", ownerId: 4, authors: "Elena Voss", area: "Education Technology", year: 2025,
    keywords: ["adaptive learning", "mathematics", "assessment", "secondary education"], status: "approved", featured: false, views: 590, downloads: 134, publicView: true,
    abstract: "Students in twelve classrooms used an adaptive quiz tool for one term. Learning gains were largest for students who began below the class average. Teachers reported that the tool saved marking time but needed clearer progress reports." },
  { id: 8, title: "Teacher Perceptions of AI Writing Tools", ownerId: 4, authors: "Elena Voss, M. Haddad", area: "Education Technology", year: 2026,
    keywords: ["generative AI", "teachers", "writing", "classroom policy"], status: "approved", featured: false, views: 430, downloads: 77, publicView: false,
    abstract: "Interviews with forty teachers explore how they respond to AI writing tools in coursework. Most favoured guided use over bans but wanted clear school policies. The paper recommends professional development before any policy is introduced." },
  { id: 9, title: "Auditing Bias in Hiring Algorithms", ownerId: 1, authors: "Amara Okafor", area: "Data Ethics", year: 2026,
    keywords: ["algorithmic bias", "hiring", "fairness", "audit"], status: "pending", featured: false, views: 0, downloads: 0, publicView: true,
    abstract: "We propose an audit method for screening software used in hiring, testing outcomes across demographic groups. Two of five systems showed measurable disparities. The audit can be run without access to the vendors' source code." },
  { id: 10, title: "Explainable Models in Credit Scoring", ownerId: 1, authors: "Amara Okafor", area: "Data Ethics", year: 2021,
    keywords: ["explainability", "credit scoring", "regulation"], status: "archived", featured: false, views: 300, downloads: 60, publicView: true,
    abstract: "A review of explanation methods for credit scoring models and how well they satisfy regulatory expectations. Simple models with monotonic constraints were easier to defend than post-hoc explanations of complex ones." },
  { id: 11, title: "Data Consent in Public Health Surveillance", ownerId: 2, authors: "Daniel Reyes", area: "Data Ethics", year: 2026,
    keywords: ["consent", "surveillance", "public health", "privacy"], status: "pending", featured: false, views: 0, downloads: 0, publicView: true,
    abstract: "This paper examines how consent is handled when health data is reused for surveillance. Existing models of consent rarely match how data moves between agencies. We suggest a tiered consent framework." },
  { id: 12, title: "Remote Sensing of Mangrove Loss", ownerId: 3, authors: "Priya Nair", area: "Environmental Science", year: 2023,
    keywords: ["mangroves", "remote sensing", "satellite imagery"], status: "rejected", featured: false, views: 0, downloads: 0, publicView: true,
    abstract: "Satellite imagery is used to map mangrove loss over fifteen years. Methods section incomplete in this draft." }
];

const ACTIVITY = [
  { when: "Today, 09:12", text: "Dr. Okafor uploaded “Auditing Bias in Hiring Algorithms”" },
  { when: "Yesterday", text: "Dr. Reyes uploaded “Data Consent in Public Health Surveillance”" },
  { when: "Yesterday", text: "Admin approved “Teacher Perceptions of AI Writing Tools”" },
  { when: "2 days ago", text: "Admin rejected “Remote Sensing of Mangrove Loss” (incomplete methods)" },
  { when: "4 days ago", text: "New visitor registered" }
];

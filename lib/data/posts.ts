export interface Author {
  name: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  date: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  coverImage?: string;
  gradient?: string;
  authors: Author[];
  slug: string;
  featured?: boolean;
}

export const MOCK_POSTS: BlogPost[] = [
  {
    id: "1",
    date: "Sep 15, 2022",
    title: "The Love Story of Majipa Lakhey: The Demon Among the Gods",
    description:
      "Lakhey is a demon in Newari culture. Majipa Lakhey is worshipped as Calm Bhairab and only comes out during Indra Jatra for eight days in Kathmandu Valley. Discover the legendary love story behind this worshipped demon.",
    category: "Story",
    tags: ["Festivals", "Indra Jatra", "Lakhey", "Kathmandu", "Culture"],
    coverImage:
      "https://culturesofnepal.wordpress.com/wp-content/uploads/2022/09/untitled-2sfafsdafs.png?w=600",
    gradient: "bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600",
    authors: [{ name: "Subarna Tandukar" }],
    slug: "majipa-lakhey-love-story",
    featured: true,
  },
  {
    id: "2",
    date: "Oct 12, 2024",
    title: "Exploring the Vibrant Panauti Jatra Festival",
    description:
      "Among Nepal's many festivals, the Jatras stand out. Panauti Jatra features vibrant processions, rituals, and ceremonies passed down through generations in the historic town of Panauti.",
    category: "Jatra",
    tags: ["Panauti", "Jatra", "Festivals", "Tradition"],
    coverImage:
      "https://culturesofnepal.wordpress.com/wp-content/uploads/2024/10/f5-1.jpg?w=600",
    gradient: "bg-gradient-to-tr from-amber-500 via-rose-500 to-red-600",
    authors: [{ name: "Subarna Tandukar" }],
    slug: "exploring-vibrant-panauti-jatra-festival",
    featured: true,
  },
  {
    id: "3",
    date: "Oct 11, 2024",
    title: "Reviving the 12-Year Swet Kali Ajima Jatra in Patan",
    description:
      "More than 700 years old, the 12-year Swet Kali Ajima Jatra in Patan was revived after a hiatus of 35 years, filling the streets of Patan with sacred chants and traditional energy.",
    category: "Festivals",
    tags: ["Swet Kali", "Patan", "Ajima Jatra", "Heritage"],
    coverImage:
      "https://culturesofnepal.wordpress.com/wp-content/uploads/2024/10/doroubye_1464242682.jpg?w=600",
    gradient: "bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-600",
    authors: [{ name: "Subarna Tandukar" }],
    slug: "reviving-12-year-swet-kali-ajima-jatra-patan",
    featured: true,
  },
  {
    id: "4",
    date: "Oct 11, 2024",
    title: "Nardevi Jatra: A Unique Tradition of Kathmandu Valley",
    description:
      "Kathmandu Valley is famous for traditional rituals of the Newar community. During Nardevi Jatra, the sacred 'Ngatbhulu Azima' (Shwetakali) dance is performed by masked deities.",
    category: "Dance",
    tags: ["Nardevi", "Kathmandu", "Newar", "Tradition"],
    coverImage:
      "https://culturesofnepal.wordpress.com/wp-content/uploads/2024/10/275116700-932907390736226-3992973624077012797-n.jpg?w=600",
    gradient: "bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400",
    authors: [{ name: "Subarna Tandukar" }],
    slug: "nardevi-jatra-unique-tradition-kathmandu-valley",
    featured: true,
  },
  {
    id: "5",
    date: "Oct 11, 2024",
    title:
      "Chyala Punhi or Mila Punhi – Festival of Breaking Old Clay Utensils",
    description:
      "Old pottery is shattered across chowks and junctions in Bhaktapur every year on Poush Shukla Purnima as locals discard old clay utensils during Chyala Punhi.",
    category: "Culture",
    tags: ["Bhaktapur", "Chyala Punhi", "Pottery", "Culture"],
    coverImage:
      "https://culturesofnepal.wordpress.com/wp-content/uploads/2024/10/bhada4.jpg?w=600",
    gradient: "bg-gradient-to-tr from-emerald-500 via-teal-600 to-cyan-500",
    authors: [{ name: "Subarna Tandukar" }],
    slug: "chyala-punhi-mila-punhi-breaking-clay-utensils",
    featured: true,
  },
  {
    id: "6",
    date: "Oct 18, 2022",
    title:
      "Gaan Pyakhan (Asta Matrika Naach): The 350-Year-Old Traditional Dance",
    description:
      "Staged in the royal court of Mulchowk inside Patan Durbar Square, Gaan Pyakhan is a sacred dance starting from Ghatasthapana and concluding on Ekadashi.",
    category: "History",
    tags: ["Asta Matrika", "Patan Durbar", "Dance", "History"],
    coverImage:
      "https://culturesofnepal.wordpress.com/wp-content/uploads/2022/10/gaan.jpg?w=600",
    gradient: "bg-gradient-to-tr from-red-600 via-rose-500 to-amber-200",
    authors: [{ name: "Subarna Tandukar" }],
    slug: "gaan-pyakhan-asta-matrika-naach-traditional-dance",
    featured: true,
  },
  {
    id: "7",
    date: "Oct 18, 2022",
    title: "Macha Marney Festival of Bhaktapur: Spiritual Game with the Gods",
    description:
      "Bhaktapur, the Land of Devotees, celebrates Macha Marney Festival—a sacred spiritual game with the gods rich in ancient Newari rituals.",
    category: "Festivals",
    tags: ["Bhaktapur", "Macha Marney", "Spiritual", "Newar"],
    coverImage:
      "https://culturesofnepal.wordpress.com/wp-content/uploads/2022/10/macha-marney-festival.jpg?w=600",
    gradient: "bg-gradient-to-tr from-violet-600 via-purple-500 to-pink-400",
    authors: [{ name: "Subarna Tandukar" }],
    slug: "macha-marney-festival-bhaktapur-spiritual-game",
    featured: false,
  },
  {
    id: "8",
    date: "Jul 03, 2021",
    title: "Asar 15: Centuries-Old Rice Planting Celebration",
    description:
      "Monsoon rains mark the arrival of Asar 15 (Ropai Jatra) in Nepal, where farmers and locals sing, dance in paddy mud, and feast on Dahi-Chiura.",
    category: "Festivals",
    tags: ["Ropai Jatra", "Asar 15", "Agriculture", "Celebration"],
    coverImage:
      "https://culturesofnepal.wordpress.com/wp-content/uploads/2021/07/54d7bc66860795.5b24fdd4c8c50.jpg?w=600",
    gradient: "bg-gradient-to-tr from-teal-400 via-blue-500 to-indigo-600",
    authors: [{ name: "Subarna Tandukar" }],
    slug: "asar-15-centuries-old-rice-planting-celebration",
    featured: true,
  },
  {
    id: "9",
    date: "Jul 02, 2021",
    title: "Jya Punhi | Palanti Punhi – Panauti Jatra: The Festival of Panauti",
    description:
      "Panauti Jatra is a 9-day festival starting from Jyestha bright fortnight, combining magnificent palanquin and chariot processions along the holy rivers.",
    category: "Jatra",
    tags: ["Panauti", "Palanti Punhi", "Jatra", "History"],
    coverImage:
      "https://culturesofnepal.wordpress.com/wp-content/uploads/2021/07/banner_img-3.jpg?w=600",
    gradient: "bg-gradient-to-tr from-fuchsia-600 via-rose-500 to-orange-400",
    authors: [{ name: "Subarna Tandukar" }],
    slug: "jya-punhi-palanti-punhi-panauti-jatra",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return MOCK_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3,
): BlogPost[] {
  const sameCategory = MOCK_POSTS.filter(
    (p) =>
      p.slug !== currentSlug &&
      p.category.toLowerCase() === category.toLowerCase(),
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const remaining = MOCK_POSTS.filter(
    (p) =>
      p.slug !== currentSlug &&
      p.category.toLowerCase() !== category.toLowerCase(),
  );
  return [...sameCategory, ...remaining].slice(0, limit);
}

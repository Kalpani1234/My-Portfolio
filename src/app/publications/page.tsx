'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import {
  Card,
  CardContent,
  Footer,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Badge,
  Particles,
} from '@/components/ui';
import {
  BookOpen,
  FileText,
  ScrollText,
  Users,
  Calendar,
  Building,
  MapPin,
  ExternalLink,
  Quote,
  Tag,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// Type definitions for OpenAlex API response
interface OpenAlexData {
  title?: string;
  publication_date?: string;
  publication_year?: number;
  cited_by_count?: number;
  doi?: string;
  abstract_inverted_index?: Record<string, number[]>;
  authorships?: Array<{
    author: {
      display_name: string;
      orcid?: string;
    };
    institutions: Array<{
      display_name: string;
      country_code?: string;
    }>;
  }>;
  primary_location?: {
    source?: {
      display_name: string;
    };
    landing_page_url?: string;
  };
  topics?: Array<{
    display_name: string;
    score: number;
  }>;
  keywords?: Array<{
    display_name: string;
    score: number;
  }>;
  biblio?: {
    volume?: string;
    issue?: string;
    first_page?: string;
    last_page?: string;
  };
}

// Function to reconstruct abstract from inverted index
function reconstructAbstract(invertedIndex: Record<string, number[]>): string {
  const words: [string, number][] = [];
  for (const [word, positions] of Object.entries(invertedIndex)) {
    for (const pos of positions) {
      words.push([word, pos]);
    }
  }
  words.sort((a, b) => a[1] - b[1]);
  return words.map(([word]) => word).join(' ');
}

// Publication Dialog Component
function PublicationDialog({
  doi,
  title,
  abstract,
  authors,
  journal,
  conference,
  publisher,
  date,
  children,
}: {
  doi: string;
  title: string;
  abstract?: string;
  authors?: string[];
  journal?: string;
  conference?: string;
  publisher?: string;
  date?: string;
  children: ReactNode;
}) {
  const [data, setData] = useState<OpenAlexData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPublicationData = async () => {
    if (data) return; // Already loaded

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.openalex.org/works/doi:${doi}`);
      if (!response.ok) throw new Error('Failed to fetch publication data');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const openAlexAbstract = data?.abstract_inverted_index
    ? reconstructAbstract(data.abstract_inverted_index)
    : null;

  // Use provided abstract, fallback to OpenAlex abstract
  const displayAbstract = abstract || openAlexAbstract;

  return (
    <Dialog>
      <DialogTrigger asChild onClick={fetchPublicationData}>
        {children}
      </DialogTrigger>
      <DialogContent className="w-full sm:w-[90%]! sm:max-w-[90vw]! lg:w-[40%]! lg:max-w-[40vw]! max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold pr-8">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            Detailed information about the publication
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        )}

        {error && (
          <div className="text-destructive text-sm p-4 bg-destructive/10 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Authors */}
          {authors && authors.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <Users className="w-5 h-5" />
                Authors
              </h3>
              <p className="text-sm text-muted-foreground pl-4">
                {authors.join(', ')}
              </p>
            </div>
          )}

          {/* Publication Details */}
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5" />
              Publication Details
            </h3>
            <div className="space-y-2 pl-4">
              {(journal || conference) && (
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium min-w-25">
                    {journal ? 'Journal:' : 'Conference:'}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {journal || conference}
                  </span>
                </div>
              )}
              {publisher && (
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium min-w-25">
                    Publisher:
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {publisher}
                  </span>
                </div>
              )}
              {(date || data?.publication_date) && (
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium min-w-25">
                    Published Date:
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {date || data?.publication_date}
                  </span>
                </div>
              )}
              {data?.biblio && (data.biblio.volume || data.biblio.issue) && (
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium min-w-25">
                    Volume/Issue:
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {[data.biblio.volume, data.biblio.issue]
                      .filter(Boolean)
                      .join(', ')}
                  </span>
                </div>
              )}
              <div className="flex items-start gap-2">
                <span className="text-sm font-medium min-w-25">DOI:</span>
                <a
                  href={`https://doi.org/${doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  {doi}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              {data && typeof data.cited_by_count === 'number' && (
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium min-w-25">
                    Citations:
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {data.cited_by_count}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Abstract */}
          {displayAbstract && (
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <Quote className="w-5 h-5" />
                Abstract
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed text-justify pl-4">
                {displayAbstract}
              </p>
            </div>
          )}

          {/* Topics */}
          {data?.topics && data.topics.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <Tag className="w-5 h-5" />
                Research Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.topics.slice(0, 5).map((topic, idx) => (
                  <Badge key={idx} variant="outline">
                    {topic.display_name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Keywords */}
          {data?.keywords && data.keywords.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                <Tag className="w-5 h-5" />
                Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.keywords.map((keyword, idx) => (
                  <Badge key={idx} variant="secondary">
                    {keyword.display_name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* External Link */}
          {data?.primary_location?.landing_page_url && (
            <div className="pt-4 border-t">
              <a
                href={data.primary_location.landing_page_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <Globe className="w-4 h-4" />
                View on Publisher Website
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Dummy data for publications
const journalPublications = [
  {
    id: 1,
    title:
      'Resilient cybersecurity: ensemble deep learning and reinforcement learning for Next-Gen IDS',
    abstract:
      'Traditional Network Intrusion Detection Systems (NIDS) face significant challenges in identifying novel cyberattacks, primarily due to the inherent limitations of signature-based and anomaly-based detection methods. This study proposes an innovative Ensemble Learning (EL) framework that integrates Deep Learning (DL) and Reinforcement Learning (RL) to enhance the capabilities of NIDS. The framework utilizes DL models, specifically convolutional neural networks (CNNs), for effective pattern recognition in network traffic, while incorporating RL agents, particularly Deep Q-Networks (DQNs), to facilitate adaptive threat detection. A key contribution of this work is the implementation of a stacking ensemble technique employing a metaclassifier to combine the outputs of the DL and RL models, thereby improving detection accuracy and reducing false-positive rates. The framework is evaluated using the CIC-IDS2017 and CSE-CIC-IDS2018 datasets. Experimental results show that the EL-based NIDS outperforms individual DL and RL models, achieving an F1 score of 0.95, a notable improvement over baseline approaches. This research presents a practical solution to develop resilient NIDS capable of adapting to emerging cyber threats, thereby strengthening network security and mitigating the impact of cybercrime.',
    authors: [
      'Nethma Kalpani',
      'Nureka Rodrigo',
      'Dilmi Seneviratne',
      'Subhash Ariyadasa',
      'Janaka Senanayake',
    ],
    publisher: 'Springer Nature',
    journal: 'Iran Journal of Computer Science',
    date: '2026-01-05',
    doi: '10.1007/s42044-025-00364-3',
  },
  {
    id: 2,
    title:
      'Securing industry 4.0: a systematic review of AI-driven intrusion detection approaches and emerging trends',
    abstract:
      'The convergence of cyber-physical systems, the Industrial Internet of Things (IIoT), and edge computing in Industry 4.0 has dramatically expanded the attack surfaces of industrial networks, making traditional intrusion detection systems (IDS) increasingly inadequate. While artificial intelligence (AI) and machine learning (ML) offer promising solutions, existing surveys often lack a specific focus on Industry 4.0 and a critical evaluation of the deployment feasibility. This systematic literature review (SLR) addresses these gaps through a PRISMA-guided analysis of AI-driven IDS research published between 2020 and 2025. From more than 8,000 studies, 22 high-quality papers were selected for detailed evaluation, revealing a pronounced shift towards edge-enabled detection architectures, hybrid AI models balancing accuracy and interpretability, and the integration of explainable AI (XAI) to strengthen operator trust. Key challenges persist, including reliance on synthetic datasets, limited validation in operational environments, computational demands unsuitable for resource-constrained edge devices, and integration issues with legacy operational technology (OT). The review’s contributions include a unified taxonomy mapping AI techniques to Industry 4.0 threats, a comparative analysis highlighting emerging trends such as federated learning and digital twins, and a research roadmap that emphasises lightweight models, realistic industrial datasets, and proactive autonomous response mechanisms. This SLR bridges the gap between academic innovation and practical deployment, supporting secure, intelligent manufacturing ecosystems.',
    authors: ['Nethma Kalpani', 'Nureka Rodrigo'],
    publisher: 'Springer Nature',
    journal: 'Iran Journal of Computer Science',
    date: '2025-12-22',
    doi: '10.1007/s40860-025-00264-0',
  },
  {
    id: 3,
    title:
      'Cutting-edge approaches in intrusion detection systems: a systematic review of deep learning, reinforcement learning, and ensemble techniques',
    abstract:
      'This study investigates the effectiveness of Ensemble Learning (EL) techniques by integrating reproducible Deep Learning (DL) and Reinforcement Learning (RL) models to enhance network intrusion detection. Through a systematic review of the literature, the most effective DL and RL models from 2020 to 2024 were identified based on their F1 scores and reproducibility, focusing on recent advancements in network intrusion detection. A structured normalisation and evaluation process allowed for an objective comparison of model performances. The best performing DL and RL models were subsequently integrated using a stacking ensemble technique, chosen for its ability to combine the complementary strengths of the DL and RL models. Experimental validation in a benchmark dataset confirmed the high accuracy and robust detection capabilities of the model, outperforming the individual DL and RL models to detect network intrusions in multiple classes. This research demonstrates the potential of ensemble methods for advancing Intrusion Detection Systems (IDSs), offering a scalable and effective solution for dynamic cybersecurity environments.',
    authors: [
      'Nethma Kalpani',
      'Nureka Rodrigo',
      'Dilmi Seneviratne',
      'Subhash Ariyadasa',
      'Janaka Senanayake',
    ],
    publisher: 'Springer Nature',
    journal: 'Iran Journal of Computer Science',
    date: '2025-03-05',
    doi: '10.1007/s42044-025-00246-8',
  },
];

const fullPaperConferences = [
  {
    id: 1,
    title:
      'Enhancing Network Intrusion Detection with Stacked Deep and Reinforcement Learning Models',
    abstract:
      'This study investigates the effectiveness of Ensemble Learning (EL) techniques by integrating reproducible Deep Learning (DL) and Reinforcement Learning (RL) models to enhance network intrusion detection. Through a systematic review of the literature, the most effective DL and RL models from 2020 to 2024 were identified based on their F1 scores and reproducibility, focusing on recent advancements in network intrusion detection. A structured normalisation and evaluation process allowed for an objective comparison of model performances. The best performing DL and RL models were subsequently integrated using a stacking ensemble technique, chosen for its ability to combine the complementary strengths of the DL and RL models. Experimental validation in a benchmark dataset confirmed the high accuracy and robust detection capabilities of the model, outperforming the individual DL and RL models to detect network intrusions in multiple classes. This research demonstrates the potential of ensemble methods for advancing Intrusion Detection Systems (IDSs), offering a scalable and effective solution for dynamic cybersecurity environments.',
    authors: [
      'Nethma Kalpani',
      'Nureka Rodrigo',
      'Dilmi Seneviratne',
      'Subhash Ariyadasa',
      'Janaka Senanayake',
    ],
    publisher: 'Institute of Electrical and Electronics Engineers (IEEE)',
    conference:
      '2025 International Research Conference on Smart Computing and Systems Engineering (SCSE)',
    date: '2025-04-03',
    doi: '10.1109/scse65633.2025.11031023',
  },
];

const abstractConferences = [
  {
    id: 1,
    title:
      'Uncovering Hidden Attack Pathways: Graph-Based Intrusion Detection with Dynamic Behavioral Context in Network Environments',
    abstract:
      'Modern intrusion detection systems (IDS) are increasingly challenged by the complexity of contemporary cyberattacks, which often unfold in multiple stages and leverage relationships between various network entities. Traditional IDS approaches, which rely on flat, tabular data representations, struggle to capture the behavioural context and temporal sequences vital for detecting such sophisticated threats. This limitation persists even when using rich public datasets like CSE-CIC-IDS2018, CIC-IDS2017, and CIC-DDoS2019, as existing tools typically convert these datasets into basic graph structures without modelling the nuanced interactions or attack progressions that occur over time. To address this critical gap, our research introduces a behaviour-aware graph modelling framework for intrusion detection, utilising Neo4j to transform IDS data into semantically enriched property graphs. Our methodology captures not only static connections between entities such as IP addresses, ports, and protocols, but also behavioural features within graph relationships. By developing custom Cypher  queries and behaviour-driven graph traversal techniques, the system enables the identification of complex, multi-stage attack patterns that are often missed by conventional detection methods. An interactive web interface further enhances analyst engagement, supporting intuitive visualisation and exploration of attack  pathways. This approach significantly advances the state of intrusion detection by improving both detection accuracy and interpretability, while offering a modular and extensible schema that can be adapted to additional datasets and real-time monitoring. Ultimately, our work bridges the gap between raw network logs and actionable behavioural analysis, providing a scalable and explainable solution that empowers analysts to understand, trace, and respond to advanced cyber threats as they evolve.',
    authors: ['Nethma Kalpani', 'Nureka Rodrigo'],
    conference: '14th Annual International Research Conference (AiRC2025)',
    date: '2025',
  },
  {
    id: 2,
    title:
      'AI-Powered Intrusion Detection for Industry 4.0: A Comprehensive Systematic Review of Methods, Challenges, and Future Directions',
    abstract:
      'The rapid digital transformation associated with Industry 4.0 has fundamentally reshaped industrial operations by integrating cyber-physical systems, the Industrial Internet of Things (IIoT), and edge computing, thereby enhancing efficiency while simultaneously introducing unprecedented cybersecurity challenges. This systematic literature review aims to provide a comprehensive  synthesis of recent advances in artificial intelligence (AI) driven intrusion  detection systems (IDS) specifically tailored for Industry 4.0 environments. The primary objective is to identify and critically evaluate state of the art AI-based IDS approaches, assess their effectiveness in addressing the unique security demands of interconnected industrial systems, and highlight prevailing gaps and  future research directions. Employing the PRISMA methodology, the study systematically filtered an initial corpus of over 8,000 records to 22 high-quality  articles published between 2020 and 2025, ensuring rigour and transparency. The analysis reveals key trends, including the increasing adoption of edge-enabled  detection methods, the integration of explainable AI (XAI) to enhance trust and transparency, and the implementation of privacy-preserving techniques such as federated learning. Despite these advancements, the review identifies persistent  challenges, notably the reliance on synthetic or outdated datasets, resource  constraints at the edge, and limited validation in real-world industrial settings, all of which impede the practical deployment of current solutions. The findings offer a holistic perspective on the strengths and limitations of contemporary AI-driven IDS, providing actionable insights for researchers and practitioners striving to develop robust, adaptive, and scalable security frameworks for modern industrial networks. In conclusion, this review not only maps the current landscape of AI-based intrusion detection in Industry 4.0 but also outlines critical challenges and  future directions. This serves as a valuable resource to guide the development of next-generation IDS capable of meeting the stringent demands of industrial cybersecurity',
    authors: ['Nethma Kalpani', 'Nureka Rodrigo'],
    conference: '14th Annual International Research Conference (AiRC2025)',
    date: '2025',
  },
];

export default function PublicationsPage() {
  const { theme } = useTheme();
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    const newColor = theme === 'dark' ? '#fff' : '#000000';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setColor(newColor);
  }, [theme]);

  return (
    <>
      <main className="relative min-h-screen bg-background overflow-hidden pt-24 md:pt-32">
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color={color}
          refresh
        />
        <motion.div
          className="relative z-10 container mx-auto px-4 max-w-6xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Journal Publications Section */}
          <motion.section className="mb-16" variants={sectionVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Journal Publications
              </h2>
            </div>
            <div className="space-y-4">
              {journalPublications.map((pub) => (
                <motion.div key={pub.id} variants={cardVariants}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="px-6">
                      <h3 className="text-xl font-semibold mb-3 text-foreground">
                        {pub.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        <Users className="w-4 h-4 inline mr-1" />
                        {Array.isArray(pub.authors)
                          ? pub.authors.join(', ')
                          : pub.authors}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        <BookOpen className="w-4 h-4 inline mr-1" />
                        {pub.journal}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        <Building className="w-4 h-4 inline mr-1" />
                        {pub.publisher}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
                        <span>
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {pub.date}
                        </span>
                      </div>
                      {pub.abstract && (
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground leading-relaxed text-justify line-clamp-3">
                            {pub.abstract}
                          </p>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {pub.doi && (
                          <>
                            <PublicationDialog
                              doi={pub.doi}
                              title={pub.title}
                              abstract={pub.abstract}
                              authors={pub.authors}
                              journal={pub.journal}
                              publisher={pub.publisher}
                              date={pub.date}
                            >
                              <Button variant="outline" size="sm">
                                Additional Details
                              </Button>
                            </PublicationDialog>
                            <Button variant="default" size="sm" asChild>
                              <Link
                                href={`https://doi.org/${pub.doi}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Read the Paper
                              </Link>
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Full Paper Conference Publications Section */}
          <motion.section className="mb-16" variants={sectionVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Full Paper Conference Publications
              </h2>
            </div>
            <motion.div className="space-y-4" variants={cardContainerVariants}>
              {fullPaperConferences.map((pub) => (
                <motion.div key={pub.id} variants={cardVariants}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="px-6">
                      <h3 className="text-xl font-semibold mb-3 text-foreground">
                        {pub.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        <Users className="w-4 h-4 inline mr-1" />
                        {Array.isArray(pub.authors)
                          ? pub.authors.join(', ')
                          : pub.authors}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        {pub.conference}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        <Building className="w-4 h-4 inline mr-1" />
                        {pub.publisher}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3">
                        <span>
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {pub.date}
                        </span>
                      </div>
                      {pub.abstract && (
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground leading-relaxed text-justify line-clamp-3">
                            {pub.abstract}
                          </p>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {pub.doi && (
                          <>
                            <PublicationDialog
                              doi={pub.doi}
                              title={pub.title}
                              abstract={pub.abstract}
                              authors={pub.authors}
                              conference={pub.conference}
                              publisher={pub.publisher}
                              date={pub.date}
                            >
                              <Button variant="outline" size="sm">
                                Additional Details
                              </Button>
                            </PublicationDialog>
                            <Button variant="default" size="sm" asChild>
                              <Link
                                href={`https://doi.org/${pub.doi}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Read the Paper
                              </Link>
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Abstract Conference Publications Section */}
          <motion.section variants={sectionVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <ScrollText className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Abstract Conference Publications
              </h2>
            </div>
            <motion.div className="space-y-4" variants={cardContainerVariants}>
              {abstractConferences.map((pub) => (
                <motion.div key={pub.id} variants={cardVariants}>
                  <Card
                    key={pub.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="px-6">
                      <h3 className="text-xl font-semibold mb-3 text-foreground">
                        {pub.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        <Users className="w-4 h-4 inline mr-1" />
                        {Array.isArray(pub.authors)
                          ? pub.authors.join(', ')
                          : pub.authors}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        {pub.conference}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span>
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {pub.date}
                        </span>
                      </div>
                      {pub.abstract && (
                        <div className="mt-4">
                          <p className="text-sm text-muted-foreground leading-relaxed text-justify line-clamp-3">
                            {pub.abstract}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Footer */}
          <Footer />
        </motion.div>
      </main>
    </>
  );
}

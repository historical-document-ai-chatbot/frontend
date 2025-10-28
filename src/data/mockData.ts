import { Newspaper } from '../types';

export const mockNewspapers: Newspaper[] = [
  {
    id: '1',
    title: 'Chilian Times',
    date: '1845-03-15',
    source: 'English Language Press',
    summary: 'Weekly English-language newspaper for the British and foreign communities in Valparaíso and Santiago.',
    articles: [
      {
        id: '1-1',
        title: 'Commercial Expansion at Valparaíso Harbor',
        content: 'The bustling port of Valparaíso continues to attract merchants and traders from across the globe. The recent increase in copper exports has bolstered the local economy, with several British shipping companies establishing permanent offices along the waterfront.',
        author: 'George Edwards',
        section: 'Commerce',
        page: 1
      },
      {
        id: '1-2',
        title: 'Letter from Santiago: Diplomatic Developments',
        content: 'The British community in Santiago grows larger by the year, with new families arriving from London and the colonies. Our minister has met with President Bulnes regarding trade negotiations and the status of British interests in the mining sector.',
        author: 'James Thompson',
        section: 'Politics',
        page: 3
      }
    ]
  },
  {
    id: '2',
    title: 'VWCM (Valparaíso & West Coast Mail)',
    date: '1860-07-22',
    source: 'Shipping Gazette',
    summary: 'Maritime and commercial news for the Pacific coast, with particular focus on shipping schedules and port conditions.',
    articles: [
      {
        id: '2-1',
        title: 'Steam Packet Schedule Announced',
        content: 'The Pacific Steam Navigation Company announces its updated schedule for vessels traveling between Valparaíso and Callao. The PSNC is pleased to report that the new steamer "Amazon" has reduced passage time by two days, now completing the journey in under a week.',
        author: 'William Harrison',
        section: 'Shipping',
        page: 1
      },
      {
        id: '2-2',
        title: 'Copper Markets Show Strong Performance',
        content: 'Exports of Chilean copper continue to command high prices in European markets. The Atacama mines report excellent yields this quarter, with several new claims being filed by British and German investors. Labor disputes in the northern territories have been resolved amicably.',
        author: 'Edward Mitchell',
        section: 'Markets',
        page: 4
      }
    ]
  },
  {
    id: '3',
    title: 'Valparaiso Review',
    date: '1852-11-08',
    source: 'Literary & Social Weekly',
    summary: 'Cultural and intellectual affairs of the foreign community in Chile, featuring literary reviews and social commentary.',
    articles: [
      {
        id: '3-1',
        title: 'The British Club Hosts Annual Ball',
        content: 'The esteemed British Club in Valparaíso held its annual autumn ball last Saturday evening. Nearly three hundred guests attended the festivities, including prominent members of the Chilean aristocracy and foreign diplomatic corps. The festivities continued until the early hours of the morning.',
        author: 'Lady Charlotte Withers',
        section: 'Society',
        page: 2
      },
      {
        id: '3-2',
        title: 'Review: Darwin\'s Account of Voyages Published in Santiago',
        content: 'We have received from London a copy of Charles Darwin\'s recently published account of his voyage aboard HMS Beagle. The naturalist\'s observations of the Chilean coastline and Patagonian regions are of particular interest to residents here. The work provides valuable insights into the geological formations we observe daily in the Andes.',
        author: 'Dr. Robert Fleming',
        section: 'Literature',
        page: 5
      }
    ]
  },
  {
    id: '4',
    title: 'Star of Chile',
    date: '1847-09-14',
    source: 'Santiago Daily',
    summary: 'News and information for the English-speaking community in the Chilean capital, covering local affairs and international news.',
    articles: [
      {
        id: '4-1',
        title: 'New Consulate Building Opens in Santiago',
        content: 'His Majesty\'s Government has established a new consular office in the heart of Santiago, reflecting the growing importance of British trade and influence in the region. Consul-General James Robertson presided over the opening ceremony, attended by Chilean government officials and prominent British residents.',
        author: 'Henry Powell',
        section: 'Government',
        page: 1
      },
      {
        id: '4-2',
        title: 'Agriculture Flourishes in Central Valley',
        content: 'Reports from the central valley indicate a bumper harvest this season. Wheat and barley crops have exceeded expectations, with many estates reporting yields double those of the previous year. The favorable weather has been a boon to both Chilean and British landholders in the region.',
        author: 'Thomas Morris',
        section: 'Agriculture',
        page: 3
      }
    ]
  }
];

// Simulate database fetch delay
export const fetchNewspapers = async (): Promise<Newspaper[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNewspapers);
    }, 1000);
  });
};

import { CropItem, CropType, DetectionResult, KnowledgeItem, RiskAlert, ScanRecord, WeatherCondition, FarmerProfile } from '../types';

export const SUPPORTED_CROPS: { name: CropType; scientific: string; season: string; icon: string; image: string; commonIssues: string[] }[] = [
  {
    name: 'Sugarcane',
    scientific: 'Saccharum officinarum',
    season: 'Annual / Perennial',
    icon: '🎋',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    commonIssues: ['Red Rot', 'Smut', 'Early Shoot Borer', 'Pyrilla']
  },
  {
    name: 'Maize',
    scientific: 'Zea mays',
    season: 'Kharif & Rabi',
    icon: '🌽',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    commonIssues: ['Fall Armyworm', 'Turcicum Leaf Blight', 'Common Rust', 'Stem Borer']
  },
  {
    name: 'Mustard',
    scientific: 'Brassica juncea',
    season: 'Rabi (Winter)',
    icon: '🌼',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=800&q=80',
    commonIssues: ['Mustard Aphid', 'White Rust', 'Alternaria Blight', 'Downy Mildew']
  },
  {
    name: 'Rice',
    scientific: 'Oryza sativa',
    season: 'Kharif / Monsoon',
    icon: '🌾',
    image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80',
    commonIssues: ['Bacterial Leaf Blight', 'Blast', 'Brown Plant Hopper', 'Stem Borer']
  },
  {
    name: 'Tomato',
    scientific: 'Solanum lycopersicum',
    season: 'All Seasons',
    icon: '🍅',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80',
    commonIssues: ['Early Blight', 'Late Blight', 'Leaf Curl Virus', 'Fruit Borer']
  },
  {
    name: 'Potato',
    scientific: 'Solanum tuberosum',
    season: 'Rabi / Winter',
    icon: '🥔',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    commonIssues: ['Late Blight', 'Early Blight', 'Black Scurf', 'Aphids']
  },
  {
    name: 'Wheat',
    scientific: 'Triticum aestivum',
    season: 'Rabi / Winter',
    icon: '🌾',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    commonIssues: ['Yellow Rust', 'Loose Smut', 'Powdery Mildew', 'Armyworm']
  },
  {
    name: 'Cotton',
    scientific: 'Gossypium hirsutum',
    season: 'Kharif',
    icon: '🌱',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80',
    commonIssues: ['Pink Bollworm', 'Whitefly', 'Bacterial Blight', 'Grey Mildew']
  },
  {
    name: 'Chili',
    scientific: 'Capsicum annuum',
    season: 'Warm / Tropical',
    icon: '🌶️',
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
    commonIssues: ['Chili Leaf Curl', 'Anthracnose / Die Back', 'Thrips', 'Aphids']
  }
];

export const SAMPLE_SCAN_PRESETS: {
  crop: CropType;
  label: string;
  type: 'disease' | 'pest';
  thumbnail: string;
  result: DetectionResult;
}[] = [
  {
    crop: 'Tomato',
    label: 'Tomato Leaf with Brown Rings (Early Blight)',
    type: 'disease',
    thumbnail: '/assets/tomato_early_blight_infected.jpg',
    result: {
      id: 'res-tomato-eb',
      type: 'disease',
      crop: 'Tomato',
      name: 'Early Blight',
      scientificName: 'Alternaria solani',
      confidence: 92,
      severity: 'Moderate',
      imageUrl: '/assets/tomato_early_blight_infected.jpg',
      timestamp: 'Just now',
      affectedAreaEstimate: '18% leaf coverage',
      symptoms: [
        'Small circular dark brown to black spots on older leaves',
        'Target-board concentric rings visible inside lesion spots',
        'Yellow chlorotic halos surrounding necrotic tissue',
        'Early lower leaf senescence and defoliation'
      ],
      possibleCauses: [
        'Alternaria solani fungal spores splashing from infected soil',
        'Extended leaf wetness (>8 hours) coupled with 24°C - 29°C temperature',
        'Excessive dense plant canopy hindering air circulation',
        'Overhead irrigation creating prolonged moisture on foliage'
      ],
      recommendedActions: {
        immediate: [
          'Prune and safely discard heavily infected lower foliage in closed bags (do not compost)',
          'Switch immediately from overhead sprinkling to drip or furrow irrigation at base',
          'Avoid handling or pruning crops when leaves are still wet with morning dew'
        ],
        shortTerm: [
          'Apply Copper Oxychloride 50 WP @ 2.5g/liter or Mancozeb 75 WP @ 2g/liter on foliage',
          'Ensure thorough coverage on both upper and undersides of leaves',
          'Reapply after 7-10 days if humid conditions and rainfall persist'
        ],
        longTerm: [
          'Practice a 3-year crop rotation avoiding Solanaceae family (potatoes, eggplants, peppers)',
          'Mulch base with clean straw or plastic to prevent soil splash onto lower stems',
          'Plant blight-resistant tomato cultivars (e.g., Mountain Supreme, Defiant PhR)'
        ]
      },
      preventiveMeasures: [
        'Stake and trellis vines to elevate foliage 30cm+ above ground surface',
        'Maintain 60cm row spacing to promote wind ventilation',
        'Conduct weekly leaf scouting during warm monsoon spells'
      ],
      notes: 'AI prediction: 92% match based on concentric ring morphology. Recommend local agronomist review if spreading rapidly.'
    }
  },
  {
    crop: 'Sugarcane',
    label: 'Sugarcane Stalk & Midrib Red Lesions (Red Rot)',
    type: 'disease',
    thumbnail: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'res-cane-rr',
      type: 'disease',
      crop: 'Sugarcane',
      name: 'Red Rot of Sugarcane',
      scientificName: 'Colletotrichum falcatum',
      confidence: 89,
      severity: 'High',
      imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
      affectedAreaEstimate: '32% stalk & leaf midrib',
      symptoms: [
        'Yellowing and drooping of upper third crown leaves followed by complete drying',
        'Longitudinal red discoloration inside split cane pith with distinctive white transverse bands',
        'Dark red lesions on leaf midrib with black acervuli spots',
        'Alcoholic or sour fermenting odor emanating from internally rotting stalk tissue'
      ],
      possibleCauses: [
        'Use of infected seed cane (setts) from previous diseased harvest',
        'Waterlogging in low-lying field patches with poor subsoil drainage',
        'Borer injury punctures facilitating pathogen entry'
      ],
      recommendedActions: {
        immediate: [
          'Rogue out and incinerate completely withered clumps including rootstocks',
          'Drain stagnant standing water out of irrigation furrows immediately',
          'Disinfect harvesting knives and sickle blades with 5% Lysol solution'
        ],
        shortTerm: [
          'Soil drench around infected clump border with Carbendazim 50 WP @ 1g/liter',
          'Avoid transporting irrigation water runoff from infected field blocks to healthy blocks'
        ],
        longTerm: [
          'Plant certified disease-free tissue-cultured or hot-water treated setts (52°C for 30 mins)',
          'Adopt red rot resistant varieties such as Co 0238, Co 86032, or CoLk 94184',
          'Implement green manuring with Sunn hemp before planting cane'
        ]
      },
      preventiveMeasures: [
        'Never take ratoon crop from a field showing >5% red rot symptoms',
        'Dip seed setts in Carbendazim (0.1%) solution for 15 minutes before sowing'
      ]
    }
  },
  {
    crop: 'Rice',
    label: 'Rice Leaf Lesions & Water-Soaked Streaks (Bacterial Blight)',
    type: 'disease',
    thumbnail: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'res-rice-blb',
      type: 'disease',
      crop: 'Rice',
      name: 'Bacterial Leaf Blight (BLB)',
      scientificName: 'Xanthomonas oryzae pv. oryzae',
      confidence: 94,
      severity: 'High',
      imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
      affectedAreaEstimate: '26% canopy affected',
      symptoms: [
        'Water-soaked, greenish-yellow stripes originating from leaf tips along margins',
        'Wavy, undulating margin borders turning straw-bleached white',
        'Bacterial amber exudate beads visible on early morning leaf blades',
        'Kresek syndrome (seedling wilting) in early vegetative stage'
      ],
      possibleCauses: [
        'Excessive or late top-dressing of synthetic nitrogen fertilizer',
        'Typhoon, heavy squalls, or strong wind causing microscopic leaf friction wounds',
        'High humidity (>70%) and warm temperatures (25-34°C)'
      ],
      recommendedActions: {
        immediate: [
          'Halt all top-dressing of urea / nitrogen fertilizers immediately',
          'Drain field water for 3 to 4 days to reduce ambient soil humidity',
          'Avoid walking across wet paddy fields to prevent transmitting bacterial slime'
        ],
        shortTerm: [
          'Spray Streptocycline @ 1.5g + Copper Oxychloride @ 25g dissolved in 10 liters water',
          'Apply secondary spray of Potassium fertilizer (MOP @ 5kg/acre) to harden leaf epidermis'
        ],
        longTerm: [
          'Adopt BLB resistant rice varieties like IR64, Improved Samba Mahsuri, or PR 126',
          'Balance N-P-K nutrition in split applications based on soil health cards'
        ]
      },
      preventiveMeasures: [
        'Keep bunds free of weed hosts (Leersia oryzoides and wild grass hosts)',
        'Treat seed paddy with hot water at 52-54°C for 10 minutes prior to germination'
      ]
    }
  },
  {
    crop: 'Mustard',
    label: 'Mustard Leaf Underside White Blisters (White Rust)',
    type: 'disease',
    thumbnail: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'res-mustard-wr',
      type: 'disease',
      crop: 'Mustard',
      name: 'White Rust of Mustard',
      scientificName: 'Albugo candida',
      confidence: 91,
      severity: 'Moderate',
      imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
      affectedAreaEstimate: '15% lower canopy',
      symptoms: [
        'Prominent chalky white or creamy pustules on lower leaf surface',
        'Corresponding pale yellow chlorotic blemishes on upper leaf surface',
        'Severe floral malformation (staghead symptom) with swollen, distorted inflorescence',
        'Hypertrophy of stems and flower pedicels'
      ],
      possibleCauses: [
        'Prolonged winter morning fog and dense dew lasting into mid-day',
        'Dense planting canopy reducing ground sunshine penetration',
        'Soil-borne oospores surviving in leftover crop stubble from previous season'
      ],
      recommendedActions: {
        immediate: [
          'Clip and safely bury severely distorted floral stagheads and heavily infected basal leaves',
          'Avoid flood irrigation during cold, overcast, foggy winter mornings'
        ],
        shortTerm: [
          'Foliar spray with Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2g per liter water',
          'Repeat foliar treatment after 12 to 14 days if fog conditions persist'
        ],
        longTerm: [
          'Clean cultivate field with deep summer ploughing to expose resting oospores to solar heat',
          'Sow early in October (before October 20th) to escape peak epidemic period',
          'Sow tolerant cultivars such as Pusa Karishma or NRCHB-101'
        ]
      },
      preventiveMeasures: [
        'Seed treatment with Apron 35 SD @ 6g/kg of mustard seed',
        'Maintain 30 x 10 cm optimal plant spacing to allow sun and air penetration'
      ]
    }
  },
  {
    crop: 'Maize',
    label: 'Maize Whorl Chewed Leaves & Frass (Fall Armyworm)',
    type: 'pest',
    thumbnail: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'res-maize-faw',
      type: 'pest',
      crop: 'Maize',
      name: 'Fall Armyworm Infestation',
      scientificName: 'Spodoptera frugiperda',
      confidence: 95,
      severity: 'High',
      imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
      affectedAreaEstimate: '22% whorl damage',
      symptoms: [
        'Shot-hole punctures and window-pane skeletonized feeding marks on emerging leaves',
        'Deep ragged tears in leaf whorl resembling severe hail damage',
        'Large accumulation of sawdust-like moist frass (caterpillar droppings) inside whorl',
        'Larva with inverted Y mark on head capsule and four square-arranged dots on 8th abdominal segment'
      ],
      possibleCauses: [
        'High nocturnal adult moth migration riding prevailing monsoon wind fronts',
        'Dry spell followed by sudden warm humidity accelerating egg incubation',
        'Continuous staggered planting of sweetcorn and grain maize in adjacent plots'
      ],
      recommendedActions: {
        immediate: [
          'Handpick and crush egg masses and young larvae found in the central whorl',
          'Apply dry fine sand or wood ash (1-2 pinches per whorl) to dehydrate small caterpillars',
          'Install pheromone traps @ 5 traps per acre for early monitoring and mass trapping'
        ],
        shortTerm: [
          'Spray bio-pesticide Bacillus thuringiensis (Bt) kurstaki @ 2g/liter or Neem oil (10,000 ppm) @ 2ml/liter directly into the whorl nozzle directed downward',
          'If larval count exceeds economic threshold (>10% plants infested), apply Emamectin benzoate 5 SG @ 0.4g/liter directed specifically into the whorl'
        ],
        longTerm: [
          'Intercrop maize with legumes (cowpea, desmodium) to attract natural predatory wasps and beetles',
          'Release egg parasitoid Trichogramma pretiosum @ 50,000/acre at weekly intervals',
          'Deep ploughing immediately after harvest to expose pupae to predatory birds'
        ]
      },
      preventiveMeasures: [
        'Synchronize planting dates with neighboring farms in the village cluster',
        'Scout 20 consecutive plants across 5 spots in the field weekly'
      ],
      ipmPractices: {
        cultural: ['Timely synchronous planting', 'Intercropping with pulses / desmodium push-pull', 'Clean borders free from grass weeds'],
        biological: ['Encourage earwigs and assassin bugs', 'Trichogramma egg parasitoids release', 'Entomopathogenic fungi Nomuraea rileyi'],
        chemicalThreshold: 'Only apply selective spray if >10% of plants show active live larvae in whorls'
      }
    }
  },
  {
    crop: 'Chili',
    label: 'Chili Curling Leaves & Clusters (Aphids & Thrips)',
    type: 'pest',
    thumbnail: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'res-chili-aphids',
      type: 'pest',
      crop: 'Chili',
      name: 'Aphid & Sucking Pest Complex',
      scientificName: 'Aphis gossypii / Scirtothrips dorsalis',
      confidence: 90,
      severity: 'Moderate',
      imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
      affectedAreaEstimate: '14% plant tips',
      symptoms: [
        'Downward cupping and curling of tender young leaves with crinkled leaf margins',
        'Sticky shiny honeydew droplets on foliage followed by black sooty mold fungus growth',
        'Stunted internodal growth with flower drop and poor fruit setting',
        'Dense colonies of tiny pear-shaped soft-bodied insects visible on leaf undersides and shoot tips'
      ],
      possibleCauses: [
        'Hot and dry weather intervals following monsoon rains',
        'Excessive synthetic nitrogen application leading to succulent, soft vegetative growth',
        'Absence of beneficial predators (ladybugs, lacewings) due to broad-spectrum spraying'
      ],
      recommendedActions: {
        immediate: [
          'Install yellow sticky traps (15-20 traps/acre) placed 15cm above crop canopy to capture winged adults',
          'Hose down underside of leaves with sharp high-pressure water jet during sunny morning to dislodge colonies'
        ],
        shortTerm: [
          'Spray cold-pressed Neem Seed Kernel Extract (NSKE 5%) or 10,000 ppm Neem Oil @ 3ml/liter with 1ml liquid soap surfactant',
          'Release green lacewing larvae (Chrysoperla carnea) @ 10,000/acre in two split doses',
          'If severity escalates beyond threshold, use bio-rational Diafenthiuron 50 WP @ 1g/liter'
        ],
        longTerm: [
          'Plant border barrier crops of 2-3 rows of maize or sorghum to impede windborne winged aphids',
          'Avoid broad-spectrum synthetic pyrethroid insecticides that destroy native ladybird beetles'
        ]
      },
      preventiveMeasures: [
        'Regular field monitoring with sticky card counts',
        'Maintain balanced soil potassium and silica to toughen leaf cuticle against piercing stylets'
      ],
      ipmPractices: {
        cultural: ['Border rows of maize/pearl millet', 'Aluminium reflective mulches to deter landing insects'],
        biological: ['Conserve ladybird beetles (Coccinellids) and Syrphid fly larvae', 'Beauveria bassiana bio-fungus spray @ 5g/liter'],
        chemicalThreshold: 'Threshold: 5-10 aphids per leaf on top 3 nodes of sample plants'
      }
    }
  }
];

export const MOCK_WEATHER: WeatherCondition = {
  temperature: 28.5,
  humidity: 84,
  rainfallMm: 12.4,
  forecast: 'High Humidity & Intermittent Showers',
  windSpeedKmH: 14,
  uvIndex: 5,
  city: 'Karnal Agri Research Zone'
};

export const MOCK_ALERTS: RiskAlert[] = [
  {
    id: 'alt-1',
    title: 'High Fungal Disease Risk (Monsoon Humidity Surge)',
    category: 'Disease Risk',
    severity: 'High',
    affectedCrops: ['Tomato', 'Potato', 'Rice', 'Sugarcane'],
    description: 'Current 84% relative humidity paired with continuous cloud cover and 28°C ambient temperature creates ideal microclimates for Early Blight, Late Blight, and Rice Blast sporulation.',
    weatherFactor: 'Humidity 84%, 12.4mm rain, temp 28°C',
    recommendedAction: 'Inspect lower leaves immediately. Apply preventative copper or bio-fungicide protective sprays. Ensure drainage channels are open.',
    validUntil: 'Next 48 Hours'
  },
  {
    id: 'alt-2',
    title: 'Aphid & Sucking Pest Population Spike Warning',
    category: 'Pest Risk',
    severity: 'Moderate',
    affectedCrops: ['Mustard', 'Chili', 'Cotton'],
    description: 'Dry spell intervals between rain showers are accelerating aphid and thrips multiplication. Tender shoot growth in mustard and chili shows elevated nymph clustering.',
    weatherFactor: 'Intermittent sunny breaks, daytime highs 30°C',
    recommendedAction: 'Erect yellow and blue sticky traps at canopy level. Apply 5% Neem Seed Kernel Extract (NSKE) preventive wash.',
    validUntil: 'Valid for 5 days'
  },
  {
    id: 'alt-3',
    title: 'Fall Armyworm Early Whorl Alert in Maize',
    category: 'Pest Risk',
    severity: 'Moderate',
    affectedCrops: ['Maize'],
    description: 'Pheromone trap captures across regional monitoring stations recorded adult moth influx following eastern wind shifts. Crops in 15-35 day vegetative stage are most vulnerable.',
    weatherFactor: 'Nocturnal temperatures 22-25°C, mild winds',
    recommendedAction: 'Inspect central whorls of 20 plants per quadrant. Hand-pick egg masses and apply neem formulations early.',
    validUntil: 'Valid for 7 days'
  },
  {
    id: 'alt-4',
    title: 'Sugarcane Subsoil Waterlogging Precaution',
    category: 'Weather',
    severity: 'Low',
    affectedCrops: ['Sugarcane'],
    description: 'Soil saturation levels reaching 90% field capacity in low-elevation cane plots. Prolonged root anaerobic stress can aggravate Red Rot spread.',
    weatherFactor: 'Rainfall accumulation 42mm this week',
    recommendedAction: 'Clear peripheral field runoff trenches. Avoid heavy machinery movement to prevent root compaction.',
    validUntil: 'Next 3 Days'
  }
];

export const MOCK_SCAN_HISTORY: ScanRecord[] = [
  {
    id: 'scan-101',
    userId: 'user-1',
    farmerName: 'user1',
    date: '2026-09-04 10:15 AM',
    crop: 'Tomato',
    type: 'disease',
    detectionName: 'Early Blight (Alternaria solani)',
    confidence: 92,
    severity: 'Moderate',
    imageUrl: '/assets/tomato_early_blight_infected.jpg',
    status: 'Action Required',
    recommendationSummary: 'Pruned affected lower leaves; sprayed copper oxychloride. Follow up in 7 days.',
    symptoms: ['Brown target-ring spots', 'Leaf edge yellowing', 'Defoliation of lower stems']
  },
  {
    id: 'scan-102',
    userId: 'user-1',
    farmerName: 'user1',
    date: '2026-09-02 03:40 PM',
    crop: 'Rice',
    type: 'disease',
    detectionName: 'Healthy Crop (No Disease Detected)',
    confidence: 98,
    severity: 'Low',
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
    status: 'Monitoring',
    recommendationSummary: 'Canopy is vigorous. Maintain regulated water depth of 3-5 cm. Continue weekly scouting.',
    symptoms: ['Normal chlorophyll distribution', 'No necrotic lesions visible', 'Strong tillering vigor']
  },
  {
    id: 'scan-103',
    userId: 'user-1',
    farmerName: 'user1',
    date: '2026-08-30 09:20 AM',
    crop: 'Sugarcane',
    type: 'disease',
    detectionName: 'Red Rot (Colletotrichum falcatum)',
    confidence: 89,
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    status: 'Action Required',
    recommendationSummary: 'Rogued 3 infected clumps; cleared waterlogging furrow. Contacted Krishi Vigyan Kendra extension officer.',
    symptoms: ['Midrib red streak', 'Crown leaf wilting', 'Sour smell in split cane']
  },
  {
    id: 'scan-104',
    userId: 'user-2',
    farmerName: 'user2',
    date: '2026-08-25 11:05 AM',
    crop: 'Maize',
    type: 'pest',
    detectionName: 'Fall Armyworm (Spodoptera frugiperda)',
    confidence: 95,
    severity: 'High',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    status: 'Action Required',
    recommendationSummary: 'Applied Bacillus thuringiensis (Bt) in whorls. Pheromone traps deployed at 5 units/acre.',
    symptoms: ['Window-pane holes in whorl leaves', 'Moist frass accumulation', 'Active young larvae detected']
  },
  {
    id: 'scan-105',
    userId: 'user-2',
    farmerName: 'user2',
    date: '2026-08-21 04:30 PM',
    crop: 'Mustard',
    type: 'disease',
    detectionName: 'White Rust (Albugo candida)',
    confidence: 91,
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=600&q=80',
    status: 'Resolved',
    recommendationSummary: 'Treated with Ridomil MZ spray. Pustule proliferation successfully halted.',
    symptoms: ['White chalky blisters on lower leaf', 'Yellowing upper surface', 'Mild stem curvature']
  },
  {
    id: 'scan-106',
    userId: 'user-2',
    farmerName: 'user2',
    date: '2026-08-16 08:50 AM',
    crop: 'Chili',
    type: 'pest',
    detectionName: 'Aphids & Thrips Infestation',
    confidence: 90,
    severity: 'Moderate',
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    status: 'Resolved',
    recommendationSummary: 'Applied 5% neem extract + yellow sticky sheets. Predator ladybug population re-established.',
    symptoms: ['Leaf upward and downward curl', 'Sticky honeydew', 'Terminal cluster colonies']
  }
];

export const MOCK_MY_CROPS: CropItem[] = [
  {
    id: 'crop-1',
    name: 'Sugarcane',
    variety: 'Co 0238 (Early Cane)',
    acres: 4.5,
    sowingDate: 'Feb 18, 2026',
    healthStatus: 'Moderate Risk',
    currentRisk: 'Red Rot Alert & Waterlogging',
    lastScanDate: 'Aug 30, 2026',
    stage: 'Vegetative',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'crop-2',
    name: 'Rice',
    variety: 'PR 126 (Basmati Cross)',
    acres: 6.0,
    sowingDate: 'Jun 22, 2026',
    healthStatus: 'Healthy',
    currentRisk: 'Low (Bacterial Blight Monitoring)',
    lastScanDate: 'Sep 02, 2026',
    stage: 'Flowering',
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'crop-3',
    name: 'Maize',
    variety: 'Pioneer P3396 Hybrid',
    acres: 3.2,
    sowingDate: 'Jul 10, 2026',
    healthStatus: 'High Risk',
    currentRisk: 'Fall Armyworm Active Whorl Infestation',
    lastScanDate: 'Aug 25, 2026',
    stage: 'Vegetative',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'crop-4',
    name: 'Mustard',
    variety: 'Pusa Bold / NRCHB-101',
    acres: 2.8,
    sowingDate: 'Oct preparation',
    healthStatus: 'Moderate Risk',
    currentRisk: 'Early Aphid & White Rust Alert',
    lastScanDate: 'Aug 21, 2026',
    stage: 'Germination',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'crop-5',
    name: 'Tomato',
    variety: 'Abhinav Hybrid',
    acres: 1.5,
    sowingDate: 'May 14, 2026',
    healthStatus: 'Moderate Risk',
    currentRisk: 'Early Blight Detected (92% Conf.)',
    lastScanDate: 'Sep 04, 2026',
    stage: 'Maturity',
    imageUrl: '/assets/tomato_early_blight_infected.jpg'
  }
];

export const MOCK_KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'kb-1',
    name: 'Early Blight',
    scientificName: 'Alternaria solani',
    category: 'Diseases',
    crop: 'Tomato',
    imageUrl: '/assets/tomato_early_blight_infected.jpg',
    description: 'A destructive fungal pathogen attacking tomatoes and potatoes, distinguished by concentric target-ring spots on leaves and dark leathery fruit lesions.',
    symptoms: [
      'Circular brown spots with distinct concentric rings',
      'Yellow chlorotic halos around necrotic patches',
      'Defoliation starting on lowest older leaves and moving upward',
      'Sunscald on exposed fruits due to loss of leaf cover'
    ],
    prevention: [
      'Use 3-year crop rotation without Solanaceous crops',
      'Stake plants to keep foliage elevated off soil',
      'Drip irrigation rather than overhead sprinklers'
    ],
    management: [
      'Prune and safely burn infected lower foliage',
      'Foliar spray with Copper Oxychloride 50 WP (2.5g/L) or Mancozeb (2g/L)',
      'Apply Trichoderma viride bio-fungicide in soil at transplanting'
    ],
    favorableConditions: 'Warm temperatures (24-29°C) with intermittent rain showers and heavy dew periods.'
  },
  {
    id: 'kb-2',
    name: 'Red Rot of Sugarcane',
    scientificName: 'Colletotrichum falcatum',
    category: 'Diseases',
    crop: 'Sugarcane',
    imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80',
    description: 'Often termed the "cancer of sugarcane", Red Rot causes internal stalk rotting, alcohol fermentation odor, and drastic sugar recovery loss.',
    symptoms: [
      'Upper leaves turn pale yellow, wither and droop prematurely',
      'Split stalk reveals red tissues interspersed with white cross-bands',
      'Faint fermented alcohol smell inside damaged cane canes',
      'Shrunken rind and hollowed stalk pith in late stage'
    ],
    prevention: [
      'Select seed setts strictly from certified disease-free nurseries',
      'Hot water sett treatment at 52°C for 30 minutes',
      'Avoid continuous ratoon cropping when disease incidence is observed'
    ],
    management: [
      'Uproot and burn diseased clumps immediately with root balls',
      'Drench surrounding border soil with Carbendazim 0.1%',
      'Ensure prompt field drainage following heavy rainfall'
    ],
    favorableConditions: 'High temperature (27-32°C), waterlogged field soil, and cloudy humid monsoon days.'
  },
  {
    id: 'kb-3',
    name: 'Bacterial Leaf Blight (BLB)',
    scientificName: 'Xanthomonas oryzae pv. oryzae',
    category: 'Diseases',
    crop: 'Rice',
    imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=700&q=80',
    description: 'One of the most widespread bacterial diseases of paddy rice, causing massive photosynthetic tissue destruction and chalky grain development.',
    symptoms: [
      'Water-soaked lesions beginning at leaf margin near the tips',
      'Lesions enlarge with undulating wavy margins turning whitish-gray',
      'Milky or opaque bacterial dew beads on young lesions at dawn',
      'Complete drying of entire leaf canopy in susceptible varieties'
    ],
    prevention: [
      'Adopt resistant cultivars such as IR64, PR 126, or Pusa Basmati 1718',
      'Avoid high doses of nitrogenous fertilizers',
      'Maintain field bunds clean of wild grass weed hosts'
    ],
    management: [
      'Temporarily drain paddy water to dry soil surface for 3-4 days',
      'Spray Streptocycline (1.5g) + Copper Oxychloride (25g) per 10 liters',
      'Apply supplementary Muriate of Potash (MOP) to toughen leaf margins'
    ],
    favorableConditions: 'Continuous rainfall with high humidity (80-95%) and warm temperatures (25-34°C).'
  },
  {
    id: 'kb-4',
    name: 'White Rust of Mustard',
    scientificName: 'Albugo candida',
    category: 'Diseases',
    crop: 'Mustard',
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=700&q=80',
    description: 'An obligate oomycete pathogen producing prominent white chalky blisters on cruciferous crops and severe floral deformities known as "stagheads".',
    symptoms: [
      'Chalky white blister-like raised pustules on the lower leaf epidermis',
      'Pale chlorotic yellow spots mirroring blisters on the upper surface',
      'Hypertrophy and floral staghead malformation preventing pod setting',
      'Stems and siliquae become swollen, fleshy and sterile'
    ],
    prevention: [
      'Sow early in season (before October 20) to complete flowering before fog peak',
      'Deep summer ploughing to bury residual oospores',
      'Seed treatment with Metalaxyl 35 SD @ 6g/kg seed'
    ],
    management: [
      'Rogue out and bury distorted floral stagheads',
      'Foliar spray of Ridomil MZ (Metalaxyl 8% + Mancozeb 64%) @ 2g/L',
      'Maintain recommended spacing to prevent dense overlapping canopies'
    ],
    favorableConditions: 'Prolonged winter morning fog, dew retention, and 12-18°C temperature range.'
  },
  {
    id: 'kb-5',
    name: 'Fall Armyworm (FAW)',
    scientificName: 'Spodoptera frugiperda',
    category: 'Pests',
    crop: 'Maize',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=700&q=80',
    description: 'An invasive polyphagous pest capable of devastating maize crops by voraciously feeding deep inside the protective vegetative whorl.',
    symptoms: [
      'Window pane pinholes on young emerging leaf blades',
      'Ragged jagged tears resembling hail damage as leaves unfold',
      'Massive sawdust-like moist frass deposits clogging central whorl',
      'Destruction of developing tassels and ear silks'
    ],
    prevention: [
      'Install pheromone traps @ 5 traps/acre for timely arrival detection',
      'Intercrop with legumes (cowpea, beans) to boost beneficial predators',
      'Synchronized planting across adjacent village fields'
    ],
    management: [
      'Apply fine sand or wood ash into whorls to kill early instar larvae physically',
      'Spray Bacillus thuringiensis (Bt) @ 2g/L or Neem Oil (10,000 ppm) @ 2ml/L',
      'If >10% whorls infested, target spray Emamectin Benzoate 5 SG @ 0.4g/L directly into whorl'
    ],
    favorableConditions: 'Warm tropical weather (25-30°C), intermittent dry-wet transitions, and nocturnal tailwinds.'
  },
  {
    id: 'kb-6',
    name: 'Aphids & Sucking Insects',
    scientificName: 'Aphis gossypii / Lipaphis erysimi',
    category: 'Pests',
    crop: 'Multiple Crops',
    imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=700&q=80',
    description: 'Tiny sap-sucking insects that colonize tender shoot tips and leaf undersides, stunting plant vigor and transmitting dangerous viral pathogens.',
    symptoms: [
      'Upward and downward curling of tender apical leaves',
      'Sticky honeydew secretions attracting black sooty mold fungus',
      'Chlorotic yellowing, leaf crinkling, and stunted internode elongation',
      'Premature blossom drop and distorted fruit shapes'
    ],
    prevention: [
      'Erect yellow sticky cards (15-20 per acre) above crop canopy',
      'Avoid high doses of nitrogen fertilizer that induce soft juicy tissue',
      'Grow barrier border rows of tall maize or sorghum'
    ],
    management: [
      'Spray 5% Neem Seed Kernel Extract (NSKE) or commercial neem oil (3ml/L)',
      'Release predatory ladybird beetles (Coccinella septempunctata) and green lacewings',
      'Conserve natural micro-wasp parasitoids (Diaeretiella rapae)'
    ],
    favorableConditions: 'Cool, cloudy, dry intervals during vegetative flushing stages.'
  }
];

export const MOCK_FARMER_PROFILE: FarmerProfile = {
  name: 'user1',
  farmName: 'Greenfield Agri Sanctuary',
  phone: '+91 98765 43210',
  email: 'user1@agroguard.org',
  location: 'Sector 4, Karnal Agri Belt',
  district: 'Karnal',
  state: 'Haryana',
  totalAcres: 18.0,
  primaryCrops: ['Sugarcane', 'Rice', 'Maize', 'Mustard', 'Tomato'],
  preferredLanguage: 'English',
  notifications: {
    smsAlerts: true,
    weatherWarnings: true,
    pestOutbreakUpdates: true,
    weeklyDigest: false
  },
  offlineMode: false
};

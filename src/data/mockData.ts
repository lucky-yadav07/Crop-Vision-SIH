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
  },
  {
    crop: 'Potato',
    label: 'Potato Leaf Water-Soaked Lesions (Late Blight)',
    type: 'disease',
    thumbnail: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'res-potato-lb',
      type: 'disease',
      crop: 'Potato',
      name: 'Late Blight of Potato',
      scientificName: 'Phytophthora infestans',
      confidence: 94,
      severity: 'Severe',
      imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
      affectedAreaEstimate: '24% foliar area',
      symptoms: [
        'Water-soaked dark green to purplish-black lesions starting from leaf tips and margins',
        'Delicate white fungal downy mildew growth on leaf undersides in humid mornings',
        'Rapid collapsing and rotting of petioles and stems with foul odor in wet fields',
        'Tuber brown dry rot beneath skin during harvest'
      ],
      possibleCauses: [
        'Prolonged cool (15-20°C) and highly humid (>90% RH) weather spells',
        'Infected seed tubers carrying latent mycelium from storage',
        'Windborne sporangia travelling from adjacent infected plots'
      ],
      recommendedActions: {
        immediate: [
          'Halt overhead sprinkler irrigation immediately to arrest foliar wetness',
          'Destroy heavily blighted foliage patches with targeted desiccant or cutting (dehaulming)'
        ],
        shortTerm: [
          'Spray Cymoxanil 8% + Mancozeb 64% WP @ 2.5g/L or Dimethomorph 50% WP @ 1g/L',
          'Ensure uniform coverage on lower canopy surfaces before rain intervals'
        ],
        longTerm: [
          'Use certified disease-free seed tubers from trusted cold storage sources',
          'Plant resistant varieties like Kufri Girdhari, Kufri Khyati, or Kufri Pukhraj',
          'Practice proper earthing up to create a 10-15cm soil barrier over tubers'
        ]
      },
      preventiveMeasures: [
        'Prophylactic spray of Mancozeb 75 WP @ 2.5g/L before canopy closure',
        'Maintain 60 x 20 cm spacing for good row aeration'
      ],
      ipmPractices: {
        cultural: ['Proper earthing up to protect tubers', 'Dehaulming 10-12 days before harvest'],
        biological: ['Foliar application of Trichoderma harzianum @ 5g/L'],
        chemicalThreshold: 'Spray immediately upon first local weather blight alert'
      }
    }
  },
  {
    crop: 'Potato',
    label: 'Potato Stunted Shoots & Leaf Curl (Aphids & Tuber Moth)',
    type: 'pest',
    thumbnail: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'res-potato-aphid',
      type: 'pest',
      crop: 'Potato',
      name: 'Potato Aphid & Sucking Pest Complex',
      scientificName: 'Macrosiphum euphorbiae / Myzus persicae',
      confidence: 91,
      severity: 'Moderate',
      imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
      affectedAreaEstimate: '16% shoot tips',
      symptoms: [
        'Curling, crinkling, and yellowing of young growing tips',
        'Honeydew secretion promoting dark sooty mold on upper leaf surfaces',
        'Stunted plant vigor and transmission of Potato Virus Y (PVY)',
        'Colonies of small green or pinkish aphids clustered on petiole undersides'
      ],
      possibleCauses: [
        'Warm dry spells following winter planting',
        'Excessive vegetative nitrogen fertilizer promoting succulent foliage',
        'Nearby solanaceous weeds acting as alternative hosts'
      ],
      recommendedActions: {
        immediate: [
          'Install yellow sticky cards (15 per acre) across field borders to track winged migrants',
          'Rogue out virus-infected stunted plants showing mosaic mottling'
        ],
        shortTerm: [
          'Spray cold-pressed Neem Oil (10,000 ppm) @ 3ml/L with liquid soap',
          'If aphid threshold exceeds 20 per 100 compound leaves, apply Flonicamid 50 WG @ 0.3g/L'
        ],
        longTerm: [
          'Intercrop with companion crops like coriander or mustard to host predatory insects',
          'Store seed tubers in diffused light stores with mesh netting to prevent tuber moth entry'
        ]
      },
      preventiveMeasures: [
        'Keep field borders weed-free from nightshade species',
        'Ensure balanced potash application to strengthen leaf epidermis'
      ],
      ipmPractices: {
        cultural: ['Yellow sticky traps monitoring', 'Deep earthing up to prevent tuber infestation'],
        biological: ['Conservation of predatory ladybird beetles and hoverfly larvae'],
        chemicalThreshold: 'Threshold: 20 aphids per 100 compound leaves for seed crop'
      }
    }
  },
  {
    crop: 'Wheat',
    label: 'Wheat Leaf Yellow Pustule Stripes (Yellow / Stripe Rust)',
    type: 'disease',
    thumbnail: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'res-wheat-yr',
      type: 'disease',
      crop: 'Wheat',
      name: 'Stripe Rust / Yellow Rust of Wheat',
      scientificName: 'Puccinia striiformis f. sp. tritici',
      confidence: 96,
      severity: 'High',
      imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
      affectedAreaEstimate: '28% leaf area',
      symptoms: [
        'Bright yellow to orange-yellow uredinial pustules arranged in parallel linear stripes along leaf veins',
        'Chlorotic yellow banding and premature leaf drying from tip downwards',
        'Yellow powdery rust spore dust easily rubbing off onto fingertips and clothing',
        'Shrinkage and shriveling of wheat grains during grain filling stage'
      ],
      possibleCauses: [
        'Cool temperatures (10-15°C) combined with high relative humidity and morning dew',
        'Planting susceptible older wheat cultivars in foothill / northern plains corridors',
        'Airborne rust urediniospores blown from Himalayan foothills'
      ],
      recommendedActions: {
        immediate: [
          'Scout entire field perimeter to locate foci of initial infection patches',
          'Avoid excess irrigation that prolongs morning leaf wetness and humidity'
        ],
        shortTerm: [
          'Foliar spray with Propiconazole 25% EC (Tilt) @ 1ml/L or Tebuconazole 25.9% EC @ 1.25ml/L',
          'Ensure spray volume of 200 liters of water per acre for thorough canopy coverage'
        ],
        longTerm: [
          'Sow rust-resistant wheat varieties such as DBW 187, DBW 222, HD 3086, or HD 3226',
          'Ensure timely sowing in November to escape late-season epidemic peaks'
        ]
      },
      preventiveMeasures: [
        'Do not grow susceptible varieties in the sub-mountainous stripe rust corridor',
        'Maintain balanced N-P-K nutrition (avoid excess urea application)'
      ],
      ipmPractices: {
        cultural: ['Timely sowing before Nov 15th', 'Diversified resistant varietal deployment'],
        biological: ['Bio-agents like Trichoderma viride seed coating'],
        chemicalThreshold: 'Apply triazole fungicide as soon as first pustule stripe is detected'
      }
    }
  },
  {
    crop: 'Wheat',
    label: 'Wheat Ragged Leaf Margins & Nibbled Spikes (Armyworm)',
    type: 'pest',
    thumbnail: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'res-wheat-aw',
      type: 'pest',
      crop: 'Wheat',
      name: 'Wheat Armyworm & Ear-Cutting Caterpillar',
      scientificName: 'Mythimna separata',
      confidence: 88,
      severity: 'Moderate',
      imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
      affectedAreaEstimate: '12% canopy damage',
      symptoms: [
        'Irregular ragged notches chewed along leaf margins, often leaving only the central midrib',
        'Ear heads clipped off and dropped onto the field soil during night feeding',
        'Dark cylindrical frass pellets found around plant base and crown soil',
        'Nocturnal smooth caterpillars hiding under soil clods and leaf debris during daytime'
      ],
      possibleCauses: [
        'Warm cloudy spells following late winter rain showers',
        'Dense lodged crop providing moist shady shelter for pupation',
        'Abundance of grassy weeds around irrigation channels'
      ],
      recommendedActions: {
        immediate: [
          'Irrigate the field lightly to flush caterpillars out of soil clods for bird predation',
          'Dig 15cm perimeter trenches around infested field patches to halt marching caterpillars'
        ],
        shortTerm: [
          'Spray during late evening with Chlorantraniliprole 18.5 SC @ 0.3ml/L or Quinalphos 25 EC @ 2ml/L',
          'Direct spray nozzle towards plant base and crown where larvae aggregate'
        ],
        longTerm: [
          'Deep summer ploughing to expose dormant pupae to scorching sunlight and birds',
          'Keep bunds and irrigation channels clean of wild grasses'
        ]
      },
      preventiveMeasures: [
        'Monitor field during dusk with a flashlight when armyworms climb up stems',
        'Encourage bird perches (T-shaped bamboo perches @ 15/acre)'
      ],
      ipmPractices: {
        cultural: ['Perimeter trenches to trap marching larvae', 'T-shaped bird perches'],
        biological: ['Encourage predatory ground beetles (Carabidae) and parasitic tachinid flies'],
        chemicalThreshold: 'Threshold: 4-5 larvae per meter row in heading stage'
      }
    }
  },
  {
    crop: 'Cotton',
    label: 'Cotton Angular Water-Soaked Leaf Spots (Bacterial Blight)',
    type: 'disease',
    thumbnail: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'res-cotton-bb',
      type: 'disease',
      crop: 'Cotton',
      name: 'Bacterial Blight / Angular Leaf Spot of Cotton',
      scientificName: 'Xanthomonas citri pv. malvacearum',
      confidence: 93,
      severity: 'High',
      imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
      affectedAreaEstimate: '22% leaf canopy',
      symptoms: [
        'Angular dark green water-soaked spots bounded by small leaf veins',
        'Spots turning dark reddish-brown to black on upper leaf surface',
        'Black arm symptom with elongated sunken black cankers on branches causing snapping',
        'Boll rot with sunken dark lesions staining lint fibers'
      ],
      possibleCauses: [
        'High humidity (>85%) and warm temperatures (28-34°C) with intermittent rain squalls',
        'Use of fuzzy non-delinted seed carrying bacteria on seed coat',
        'Windborne rain splashing inoculum from lower leaves upward'
      ],
      recommendedActions: {
        immediate: [
          'Prune and destroy severely infected black-arm branches during dry weather',
          'Avoid entering or cultivating wet fields to prevent spreading bacterial slime'
        ],
        shortTerm: [
          'Foliar spray with Copper Oxychloride 50 WP @ 2.5g/L + Streptocycline @ 0.1g/L',
          'Repeat after 12-15 days if monsoon rainfall persists'
        ],
        longTerm: [
          'Plant acid-delinted certified seeds treated with concentrated sulphuric acid',
          'Grow resistant cotton hybrids and rotate with non-host crops like maize or sorghum'
        ]
      },
      preventiveMeasures: [
        'Hot water seed soak or Agrimycin seed treatment before sowing',
        'Maintain proper 90 x 60 cm plant spacing to avoid dense canopy microclimate'
      ],
      ipmPractices: {
        cultural: ['Acid delinting of seed', 'Crop residue destruction after picking'],
        biological: ['Seed treatment with Pseudomonas fluorescens @ 10g/kg'],
        chemicalThreshold: 'Spray on initial notice of angular lesions before black arm progression'
      }
    }
  },
  {
    crop: 'Cotton',
    label: 'Cotton Rosetted Flowers & Pierced Bolls (Pink Bollworm)',
    type: 'pest',
    thumbnail: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'res-cotton-pbw',
      type: 'pest',
      crop: 'Cotton',
      name: 'Pink Bollworm Infestation',
      scientificName: 'Pectinophora gossypiella',
      confidence: 95,
      severity: 'Severe',
      imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
      affectedAreaEstimate: '30% squares & bolls',
      symptoms: [
        'Rosetted flowers with petals twisted and sealed together by caterpillar webbing',
        'Tiny entry holes on green developing bolls with brown frass staining',
        'Burrowed hollowed seeds inside unopened bolls with stained discolored lint',
        'Pink-banded caterpillars feeding inside locules destroying fiber quality'
      ],
      possibleCauses: [
        'Prolonged continuous cotton cropping extending into ratoon seasons',
        'Failure to destroy ginning waste and cotton stalks containing diapausing larvae',
        'Development of resistance to early-generation Cry toxins'
      ],
      recommendedActions: {
        immediate: [
          'Hand-collect and incinerate all rosetted flowers and prematurely dropped squares',
          'Deploy Gossyplure pheromone traps @ 8-10 traps per acre for mass monitoring'
        ],
        shortTerm: [
          'Install mating disruption pheromone ropes or PB-Rope L @ 150 dispensers/acre',
          'Spray Profenofos 50 EC @ 2ml/L or Spinetoram 11.7 SC @ 1ml/L targeted at evening dusk'
        ],
        longTerm: [
          'Terminate cotton crop by December and strictly avoid taking ratoon crops',
          'Shred and deeply incorporate cotton stalks immediately after final picking'
        ]
      },
      preventiveMeasures: [
        'Grow non-Bt refuge borders (20% non-Bt) to delay insect resistance',
        'Scout 20 bolls weekly for entry punctures from 60 days after sowing'
      ],
      ipmPractices: {
        cultural: ['Strict closed season without ratoon crop', 'Timely stalk destruction'],
        biological: ['Trichogrammatoidea bactrae egg parasitoid releases @ 50,000/acre'],
        chemicalThreshold: 'Threshold: 10% infested green bolls or 8 moths/trap/night for 3 consecutive days'
      }
    }
  },
  {
    crop: 'Maize',
    label: 'Maize Cigar-Shaped Grey Lesions (Turcicum Leaf Blight)',
    type: 'disease',
    thumbnail: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'res-maize-tlb',
      type: 'disease',
      crop: 'Maize',
      name: 'Turcicum Leaf Blight (Northern Corn Leaf Blight)',
      scientificName: 'Exserohilum turcicum',
      confidence: 93,
      severity: 'Moderate',
      imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
      affectedAreaEstimate: '20% canopy foliage',
      symptoms: [
        'Long elliptical, cigar-shaped tan to grayish-green necrotic lesions on leaf blades',
        'Lesions extending up to 15cm in length with dark olive-brown fungal spore dusting',
        'Premature blighting and burning of lower canopy leaves moving upwards toward tassels',
        'Impaired photosynthesis causing poor grain filling in developing cobs'
      ],
      possibleCauses: [
        'Moderate temperatures (18-27°C) with prolonged morning dew and overcast skies',
        'Susceptible maize hybrids planted under high plant density',
        'Fungal spores surviving on unploughed corn stubble from prior seasons'
      ],
      recommendedActions: {
        immediate: [
          'Strip and destroy severely blighted lower 2-3 leaves to limit spore spread',
          'Avoid sprinkler irrigation late in the evening'
        ],
        shortTerm: [
          'Foliar spray with Mancozeb 75 WP @ 2.5g/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/L',
          'Direct spray to ensure full coverage of ear leaf and leaves above the ear'
        ],
        longTerm: [
          'Select certified blight-tolerant maize hybrids (e.g. HQPM-1, Pusa Vivek QPM-9)',
          'Adopt 2-year crop rotation with pulses or oilseeds'
        ]
      },
      preventiveMeasures: [
        'Treat seed with Thiram or Carbendazim @ 2.5g/kg of seed',
        'Maintain 60 x 20 cm spacing to maximize air circulation'
      ],
      ipmPractices: {
        cultural: ['Deep autumn tillage', 'Crop rotation with non-gramineous hosts'],
        biological: ['Seed biopriming with Trichoderma asperellum'],
        chemicalThreshold: 'Apply fungicide if lesions appear on 3rd leaf below the ear prior to silking'
      }
    }
  },
  {
    crop: 'Sugarcane',
    label: 'Sugarcane Dead Heart & Bore Holes (Early Shoot Borer)',
    type: 'pest',
    thumbnail: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'res-cane-esb',
      type: 'pest',
      crop: 'Sugarcane',
      name: 'Early Shoot Borer of Sugarcane',
      scientificName: 'Chilo infuscatellus',
      confidence: 92,
      severity: 'High',
      imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
      affectedAreaEstimate: '18% young tillers',
      symptoms: [
        'Drying of central spindle shoot resulting in a distinctive dead heart in 1-3 month old shoots',
        'Dead heart easily pulled out from shoot with rotten, foul-smelling basal portion',
        'Small pinhole bore entry holes at ground level on the base of cane shoots',
        'Reduced tillering and patchy field stand with stunted auxiliary shoots'
      ],
      possibleCauses: [
        'Hot and dry summer months (March to June) with low atmospheric humidity',
        'Shallow planting of cane setts with inadequate soil earthing',
        'Heavy early nitrogen application without adequate irrigation'
      ],
      recommendedActions: {
        immediate: [
          'Pull out and safely bury dead hearts to eliminate larvae inside the shoot base',
          'Provide light, frequent irrigation to raise microclimate humidity and deter egg laying'
        ],
        shortTerm: [
          'Apply Chlorantraniliprole 0.4 G @ 7.5 kg/acre or Cartap hydrochloride 4 G @ 10 kg/acre in furrows followed by light earthing up and irrigation',
          'Release egg parasitoid Trichogramma chilonis @ 20,000/acre at 10-day intervals'
        ],
        longTerm: [
          'Deep planting in furrows (20-25 cm depth) followed by timely partial earthing up at 45 days',
          'Trash mulching along ridges with 10 cm layer of cane leaves to conserve moisture and impede moth emergence'
        ]
      },
      preventiveMeasures: [
        'Intercrop with companion crops like daincha (Sesbania) or cowpea',
        'Avoid late planting in peak borer emergence months'
      ],
      ipmPractices: {
        cultural: ['Trash mulching @ 3 tonnes/acre', 'Timely earthing up to cover bore holes'],
        biological: ['Trichogramma chilonis releases @ 20,000/acre/week (4-6 releases)'],
        chemicalThreshold: 'Threshold: 15% dead hearts in the early tillering phase'
      }
    }
  },
  {
    crop: 'Rice',
    label: 'Rice Circular Hopper Burn Patches & Nilaparvata (BPH)',
    type: 'pest',
    thumbnail: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'res-rice-bph',
      type: 'pest',
      crop: 'Rice',
      name: 'Brown Plant Hopper (BPH) Infestation',
      scientificName: 'Nilaparvata lugens',
      confidence: 96,
      severity: 'Severe',
      imageUrl: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
      affectedAreaEstimate: '25% field patch',
      symptoms: [
        'Circular patches of dried, golden-brown straw-colored plants known as hopper burn',
        'Dense colonies of brown adult hoppers and nymphs clustered at the submerged stem base',
        'Excessive honeydew secretion with black sooty mold choking lower tillers',
        'Total lodging and complete collapse of rice hills in severe infestations'
      ],
      possibleCauses: [
        'High humidity and stagnant water standing continuously in dense rice canopies',
        'Excessive synthetic urea top-dressing with zero potassium balance',
        'Indiscriminate use of synthetic pyrethroids destroying natural wolf spiders and mirid bugs'
      ],
      recommendedActions: {
        immediate: [
          'Drain standing water from the field completely for 3-4 days to expose hopper habitat',
          'Create alleyways (skip one row every 2-3 meters) to allow sunlight and aeration into canopy base'
        ],
        shortTerm: [
          'Spray Pymetrozine 50 WG @ 120g/acre or Triflumezopyrim 10 SC @ 94ml/acre directed specifically at the base of the hills',
          'Avoid broad-spectrum pyrethroid insecticides which trigger resurgence'
        ],
        longTerm: [
          'Deploy BPH-tolerant rice varieties such as CR Dhan 310, Improved White Ponni, or MTU 1010',
          'Practice alternate wetting and drying (AWD) irrigation rather than continuous flooding'
        ]
      },
      preventiveMeasures: [
        'Maintain 20 x 15 cm spacing and skip one row every 2.5m for inspection alleys',
        'Apply nitrogen fertilizer in 3-4 split doses rather than heavy single applications'
      ],
      ipmPractices: {
        cultural: ['Alternate wetting and drying (AWD)', 'Formation of walking alleys (skip rows)'],
        biological: ['Conservation of Lycosa wolf spiders and Cyrtorhinus mirid bugs'],
        chemicalThreshold: 'Threshold: 10-15 hoppers per hill before booting; 20 hoppers per hill at heading'
      }
    }
  },
  {
    crop: 'Mustard',
    label: 'Mustard Curled Pods & Sticky Clusters (Mustard Aphid)',
    type: 'pest',
    thumbnail: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'res-mustard-aphid',
      type: 'pest',
      crop: 'Mustard',
      name: 'Mustard Aphid Infestation',
      scientificName: 'Lipaphis erysimi',
      confidence: 93,
      severity: 'High',
      imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
      affectedAreaEstimate: '24% flower & pod cluster',
      symptoms: [
        'Dense colonies of greenish-gray soft-bodied aphids covering flower buds, pods, and tender shoots',
        'Severe curling, crinkling, and yellowing of inflorescence and terminal leaves',
        'Blasting of flowers preventing siliqua (pod) formation and seed development',
        'Copious honeydew deposition resulting in black sooty mold over foliage'
      ],
      possibleCauses: [
        'Cloudy, humid, and calm winter weather during December to February',
        'Late sowing of mustard after October 25th in northern plains',
        'Excessive synthetic nitrogen application producing dense succulent vegetative shoots'
      ],
      recommendedActions: {
        immediate: [
          'Clip and destroy heavily infested terminal twigs showing initial aphid colonies',
          'Install yellow sticky traps (15-20/acre) around field boundaries'
        ],
        shortTerm: [
          'Spray cold-pressed Neem Oil (10,000 ppm) @ 3ml/L with liquid soap at early colonization',
          'If aphid colonies exceed 20% plants infested, spray Dimethoate 30 EC @ 1.7ml/L or Thiamethoxam 25 WG @ 0.4g/L'
        ],
        longTerm: [
          'Early sowing before October 20th to escape peak aphid reproductive population in January',
          'Plant tolerant cultivars such as Pusa Gaurav, RH 749, or RGN 73'
        ]
      },
      preventiveMeasures: [
        'Sow early in October with optimal 30 x 10 cm row spacing',
        'Conserve natural predators by avoiding chemical spraying during peak bee foraging hours'
      ],
      ipmPractices: {
        cultural: ['Timely early sowing in October', 'Clipping of infested terminal twigs'],
        biological: ['Conservation of Coccinella septempunctata ladybird beetles and syrphid fly maggots'],
        chemicalThreshold: 'Threshold: 20-25 aphids on 10 cm terminal shoot of 10% sample plants'
      }
    }
  },
  {
    crop: 'Tomato',
    label: 'Tomato Bored Fruits & Frass (Tomato Fruit Borer)',
    type: 'pest',
    thumbnail: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'res-tomato-fb',
      type: 'pest',
      crop: 'Tomato',
      name: 'Tomato Fruit Borer / American Bollworm',
      scientificName: 'Helicoverpa armigera',
      confidence: 94,
      severity: 'High',
      imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
      affectedAreaEstimate: '20% developing fruit',
      symptoms: [
        'Circular bore holes on developing green and ripe tomato fruits with head thrust inside while feeding',
        'Granular moist caterpillar fecal frass accumulated around entry punctures',
        'Premature fruit rotting, yellowing, and drop before commercial maturity',
        'Defoliation of tender shoot leaves and flower buds by young instar larvae'
      ],
      possibleCauses: [
        'High nocturnal moth activity during warm humid evenings',
        'Presence of alternative host crops (chickpea, pigeonpea, corn) in neighboring plots',
        'Monocropping of tomato without marigold trap crops'
      ],
      recommendedActions: {
        immediate: [
          'Handpick and destroy bored fruits and conspicuous caterpillars daily',
          'Deploy Helilure pheromone traps @ 5 per acre to monitor adult moth flight surges'
        ],
        shortTerm: [
          'Spray bio-pesticide HaNPV (Helicoverpa nuclear polyhedrosis virus) @ 250 LE/acre with jaggery (1%) at dusk',
          'Apply Chlorantraniliprole 18.5 SC @ 0.3ml/L or Flubendiamide 39.35 SC @ 0.3ml/L if fruit damage exceeds 5%'
        ],
        longTerm: [
          'Plant African tall marigold as a trap crop (1 row of marigold for every 16 rows of tomato)',
          'Deep summer ploughing to destroy overwintering soil pupae'
        ]
      },
      preventiveMeasures: [
        'Interplant marigold to attract egg-laying moths away from tomato fruits',
        'Release egg parasitoid Trichogramma pretiosum @ 50,000/acre at flowering stage'
      ],
      ipmPractices: {
        cultural: ['African Marigold trap cropping (1:16 ratio)', 'Hand-picking bored fruits'],
        biological: ['HaNPV viral spray @ 250 LE/acre', 'Release Trichogramma pretiosum'],
        chemicalThreshold: 'Threshold: 1 larva per plant or 5% fruit damage'
      }
    }
  },
  {
    crop: 'Chili',
    label: 'Chili Sunken Fruit Spots & Twig Die-Back (Anthracnose)',
    type: 'disease',
    thumbnail: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80',
    result: {
      id: 'res-chili-anth',
      type: 'disease',
      crop: 'Chili',
      name: 'Anthracnose & Fruit Rot / Die-Back of Chili',
      scientificName: 'Colletotrichum capsici',
      confidence: 92,
      severity: 'High',
      imageUrl: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
      timestamp: 'Just now',
      affectedAreaEstimate: '22% fruits and stems',
      symptoms: [
        'Sunken circular water-soaked spots on ripening red and green chili fruits',
        'Concentric rings of dark acervuli spots within fruit lesions producing salmon-pink spore masses in moist weather',
        'Die-back symptom: necrosis and drying of twigs from top downwards with straw-colored bark',
        'Premature fruit drop and rotting of infected peppers'
      ],
      possibleCauses: [
        'Heavy intermittent monsoon rains with warm temperatures (28-32°C)',
        'Infected seed or fungal spores splashing from previous season chili residue',
        'Overhead irrigation creating prolonged wetness on ripening pods'
      ],
      recommendedActions: {
        immediate: [
          'Pick and safely destroy infected mummified fruits and dried twigs away from the field',
          'Switch from sprinkler or flood watering to furrow/drip irrigation at base'
        ],
        shortTerm: [
          'Foliar spray with Azoxystrobin 23% SC @ 1ml/L or Difenoconazole 25% EC @ 0.5ml/L',
          'Apply Copper Oxychloride 50 WP @ 2.5g/L on canopy and fruit clusters'
        ],
        longTerm: [
          'Use certified disease-free seeds treated with Thiram or Captan @ 3g/kg seed',
          'Practice 2-year crop rotation avoiding solanaceous crops (tomato, brinjal)',
          'Plant anthracnose-tolerant varieties like Punjab Lal, Pusa Jwala, or Kashi Anmol'
        ]
      },
      preventiveMeasures: [
        'Seed treatment with Trichoderma viride @ 5g/kg seed',
        'Maintain 60 x 45 cm spacing to facilitate quick drying of foliage after rain'
      ],
      ipmPractices: {
        cultural: ['Pruning and burning of dead branches', 'Deep summer ploughing'],
        biological: ['Seed treatment with Trichoderma viride @ 4g/kg seed'],
        chemicalThreshold: 'Spray on initial fruit spot detection before red fruit ripening'
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

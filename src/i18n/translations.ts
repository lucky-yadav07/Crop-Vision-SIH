export type Language = 'en' | 'hi';

export interface TranslationSchema {
  // Brand & General
  brandName: string;
  brandTagline: string;
  agriTechBadge: string;
  cloudModelActive: string;
  fieldSyncOnline: string;
  helpline: string;
  helplineNumber: string;
  scanCrop: string;
  quickScan: string;

  // Nav Items
  navHome: string;
  navDetectDisease: string;
  navPestDetection: string;
  navDashboard: string;
  navAlerts: string;
  navLearn: string;
  navExpert: string;
  navMyCrops: string;
  navHistory: string;
  navSettings: string;

  // Language Switcher
  langToggleLabel: string;
  switchLanguage: string;
  english: string;
  hindi: string;

  // GPS & Weather
  weatherTitle: string;
  weatherSubtitle: string;
  detectGpsBtn: string;
  detectingLocation: string;
  gpsLocked: string;
  gpsPermissionDenied: string;
  selectDistrictFallback: string;
  currentTemp: string;
  feelsLike: string;
  humidity: string;
  rainfallChance: string;
  windSpeed: string;
  windDirection: string;
  uvIndex: string;
  sprayWindow: string;
  sprayOptimal: string;
  sprayUnfavorable: string;
  sprayCaution: string;
  sprayReasonOptimal: string;
  sprayReasonWind: string;
  sprayReasonRain: string;
  diseaseRiskTitle: string;
  diseaseRiskHigh: string;
  diseaseRiskModerate: string;
  diseaseRiskLow: string;
  diseaseRiskFungalWarning: string;
  diseaseRiskSafe: string;
  fiveDayForecast: string;
  refreshWeather: string;
  coordinates: string;
  exactLocation: string;
  gpsAccuracy: string;
  viewOnMap: string;
  popularAgriRegions: string;

  // Home Hero
  heroBadge: string;
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  heroHeadingLine3: string;
  heroSubtext: string;
  heroScanCta: string;
  heroExploreCta: string;
  heroStatPrecision: string;
  heroStatPrecisionLabel: string;
  heroStatCrops: string;
  heroStatCropsLabel: string;
  heroStatSpeed: string;
  heroStatSpeedLabel: string;

  // Hero Card
  analyzingCrop: string;
  diseaseDetected: string;
  suspectedPathology: string;
  confidenceLabel: string;
  cropHealthIndex: string;
  liveFieldDiagnostic: string;

  // How It Works
  howItWorksBadge: string;
  howItWorksTitle: string;
  howItWorksSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;

  // Why Choose Us
  whyChooseTitle: string;
  whyChooseSubtitle: string;
  whyFeature1Title: string;
  whyFeature1Desc: string;
  whyFeature2Title: string;
  whyFeature2Desc: string;
  whyFeature3Title: string;
  whyFeature3Desc: string;
  whyFeature4Title: string;
  whyFeature4Desc: string;

  // Supported Crops
  supportedCropsBadge: string;
  supportedCropsTitle: string;
  supportedCropsSubtitle: string;
  scanThisCrop: string;

  // Camera & Image Upload
  captureLiveBtn: string;
  uploadDeviceBtn: string;
  dropImageHere: string;
  selectCropLabel: string;
  nonPlantErrorTitle: string;
  nonPlantErrorMessage: string;
  retakeLive: string;
  replaceImage: string;
  analyzeDiseaseBtn: string;
  analyzePestBtn: string;
  analyzingNow: string;

  // Live Camera Viewfinder
  liveCameraTitle: string;
  targetingLabel: string;
  frameLeafGuidance: string;
  retakePhoto: string;
  confirmAnalyze: string;
  cameraUnavailable: string;
  tryAgain: string;
  toggleFlashlight: string;
  toggleGrid: string;
  switchCamera: string;

  // Diagnosis & Recommendations
  diagnosisTitle: string;
  severityLabel: string;
  immediateTreatment: string;
  preventiveMeasures: string;
  organicBioTreatment: string;
  chemicalIpm: string;
  consultExpertBtn: string;
  saveToHistory: string;
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    // Brand & General
    brandName: 'CropVisionAI',
    brandTagline: 'Detect Early. Act Smart. Protect Every Crop.',
    agriTechBadge: 'AgriTech',
    cloudModelActive: 'CropVisionAI Cloud Model v2.4 Active',
    fieldSyncOnline: 'Field Sync: Online',
    helpline: 'Farmer Helpline',
    helplineNumber: '1800-AGRO-AI',
    scanCrop: 'Scan Crop',
    quickScan: 'Quick Scan',

    // Nav Items
    navHome: 'Home',
    navDetectDisease: 'Detect Disease',
    navPestDetection: 'Pest Detection',
    navDashboard: 'Dashboard',
    navAlerts: 'Alerts',
    navLearn: 'Learn',
    navExpert: 'Expert Support',
    navMyCrops: 'My Crops',
    navHistory: 'History',
    navSettings: 'Settings',

    // Language Switcher
    langToggleLabel: 'Language',
    switchLanguage: 'हिन्दी में बदलें',
    english: 'English',
    hindi: 'हिन्दी',

    // GPS & Weather
    weatherTitle: 'Field Weather & Agricultural Advisory',
    weatherSubtitle: 'Hyper-local satellite and weather station data based on your exact GPS coordinates.',
    detectGpsBtn: 'Detect My Field Weather (GPS)',
    detectingLocation: 'Locating field via GPS sensor...',
    gpsLocked: 'GPS Location Locked',
    gpsPermissionDenied: 'GPS permission denied or unavailable. You can select your agricultural district below.',
    selectDistrictFallback: 'Or Select Agricultural Region',
    currentTemp: 'Temperature',
    feelsLike: 'Feels like',
    humidity: 'Relative Humidity',
    rainfallChance: 'Rain Probability',
    windSpeed: 'Wind Speed',
    windDirection: 'Wind Direction',
    uvIndex: 'Solar / UV Index',
    sprayWindow: 'Pesticide Spray Window',
    sprayOptimal: 'Optimal for Spraying',
    sprayUnfavorable: 'Do Not Spray',
    sprayCaution: 'Spray with Caution',
    sprayReasonOptimal: 'Wind speed < 15 km/h and rain probability < 20%. Safe for pesticide spraying without drift.',
    sprayReasonWind: 'Wind speed is high (> 15 km/h). Severe pesticide drift risk to neighboring crops.',
    sprayReasonRain: 'Rain predicted within 4 hours. Chemical runoff risk. Postpone spraying.',
    diseaseRiskTitle: 'Crop Disease Risk Index',
    diseaseRiskHigh: 'High Fungal & Blight Risk',
    diseaseRiskModerate: 'Moderate Disease Risk',
    diseaseRiskLow: 'Low Disease Risk (Normal)',
    diseaseRiskFungalWarning: 'High humidity (> 80%) and warm temperatures favor Early Blight and Powdery Mildew spores. Inspect crops closely.',
    diseaseRiskSafe: 'Dry conditions suppress fungal spore germination. Low outbreak likelihood.',
    fiveDayForecast: '5-Day Agricultural Forecast',
    refreshWeather: 'Refresh Weather',
    coordinates: 'Exact GPS Coordinates',
    exactLocation: 'Exact Location',
    gpsAccuracy: 'GPS Accuracy',
    viewOnMap: 'View on Google Maps',
    popularAgriRegions: 'Popular Farming Belts',

    // Home Hero
    heroBadge: 'Next-Gen Agricultural Intelligence Platform',
    heroHeadingLine1: 'Early Detection.',
    heroHeadingLine2: 'Smart Management.',
    heroHeadingLine3: 'Healthier Crops.',
    heroSubtext: 'AI-powered crop health monitoring that helps identify diseases and pest infestations early and provides actionable management guidance.',
    heroScanCta: 'Scan Your Crop',
    heroExploreCta: 'Explore Solutions',
    heroStatPrecision: '94.8%',
    heroStatPrecisionLabel: 'Diagnostic Precision',
    heroStatCrops: '9+ Crops',
    heroStatCropsLabel: 'Full Field Coverage',
    heroStatSpeed: '< 3 Sec',
    heroStatSpeedLabel: 'Real-Time Analysis',

    // Hero Card
    analyzingCrop: 'Analyzing crop...',
    diseaseDetected: 'Disease risk detected',
    suspectedPathology: 'Suspected Pathology',
    confidenceLabel: 'Confidence',
    cropHealthIndex: 'Crop Health Index',
    liveFieldDiagnostic: 'Live Field Diagnostic',

    // How It Works
    howItWorksBadge: 'Simplicity For Every Farmer',
    howItWorksTitle: 'How It Works in 4 Easy Steps',
    howItWorksSubtitle: 'From field observation to practical treatment in under a minute without complex technical setup.',
    step1Title: 'Upload Image',
    step1Desc: 'Snap a clear photo of the infected leaf, stem, or fruit using your phone camera or upload an existing photo.',
    step2Title: 'AI Analysis',
    step2Desc: 'CropVisionAI neural models scan microscopic chlorosis patterns, target spots, lesions, and pest damage signatures.',
    step3Title: 'Get Results',
    step3Desc: 'Receive suspected disease or pest diagnosis with confidence scoring, threat severity ratings, and visible symptoms.',
    step4Title: 'Take Action',
    step4Desc: 'Implement step-by-step biological, cultural, and targeted Integrated Pest Management (IPM) guidance safely.',

    // Why Choose Us
    whyChooseTitle: 'Why Choose CropVisionAI?',
    whyChooseSubtitle: 'Engineered specifically for practical farm resilience, field conditions, and sustainable crop yields.',
    whyFeature1Title: 'AI-Based Detection',
    whyFeature1Desc: 'Trained on over 100,000 verified pathological field leaves, achieving high precision across varied lighting and angles.',
    whyFeature2Title: 'Early Risk Alerts',
    whyFeature2Desc: 'Connects regional humidity, monsoon rainfall, and temperature trends to forecast outbreaks before visible damage spreads.',
    whyFeature3Title: 'Smart Management Guidance',
    whyFeature3Desc: 'Advocates responsible Integrated Pest Management (IPM) and bio-rational alternatives instead of blanket chemical spraying.',
    whyFeature4Title: 'Farmer-Friendly Interface',
    whyFeature4Desc: 'Big touch targets, multi-language support (English & हिन्दी), high outdoor contrast, and live GPS weather.',

    // Supported Crops
    supportedCropsBadge: 'Full Spectrum Protection',
    supportedCropsTitle: 'Supported Crops & Varieties',
    supportedCropsSubtitle: 'Dedicated pathology diagnostics optimized for major commercial crops.',
    scanThisCrop: 'Scan This Crop',

    // Camera & Image Upload
    captureLiveBtn: 'Capture Live Image',
    uploadDeviceBtn: 'Upload From Device',
    dropImageHere: 'Drop leaf photo here or tap button below',
    selectCropLabel: 'Select Your Crop',
    nonPlantErrorTitle: 'Plant Photo Required',
    nonPlantErrorMessage: 'Please upload a plant-related image. Photos of human faces, animals, or non-agricultural objects cannot be diagnosed.',
    retakeLive: 'Retake Live',
    replaceImage: 'Replace Image',
    analyzeDiseaseBtn: 'Analyze Crop Disease',
    analyzePestBtn: 'Analyze Pest Infestation',
    analyzingNow: 'Analyzing crop foliage...',

    // Live Camera Viewfinder
    liveCameraTitle: 'Live Field Camera',
    targetingLabel: 'Targeting Crop:',
    frameLeafGuidance: 'Frame affected leaf in center reticle',
    retakePhoto: 'Retake Photo',
    confirmAnalyze: 'Confirm & Analyze',
    cameraUnavailable: 'Camera Unavailable',
    tryAgain: 'Try Again',
    toggleFlashlight: 'Toggle Flashlight',
    toggleGrid: 'Toggle Composition Grid',
    switchCamera: 'Switch Camera',

    // Diagnosis & Recommendations
    diagnosisTitle: 'Diagnostic Diagnosis & Management',
    severityLabel: 'Severity Level',
    immediateTreatment: 'Immediate Action Plan',
    preventiveMeasures: 'Preventive Measures',
    organicBioTreatment: 'Organic & Bio-Control Options',
    chemicalIpm: 'Chemical & IPM Threshold',
    consultExpertBtn: 'Consult Agriculture Officer',
    saveToHistory: 'Saved to Farm History'
  },

  hi: {
    // Brand & General
    brandName: 'CropVision AI',
    brandTagline: 'समय पर पहचानें। सही उपचार करें। हर फसल सुरक्षित रखें।',
    agriTechBadge: 'कृषि तकनीक',
    cloudModelActive: 'CropVisionAI क्लाउड मॉडल सक्रिय',
    fieldSyncOnline: 'फील्ड सिंक: ऑनलाइन',
    helpline: 'किसान हेल्पलाइन',
    helplineNumber: '1800-AGRO-AI',
    scanCrop: 'फसल स्कैन करें',
    quickScan: 'त्वरित स्कैन',

    // Nav Items
    navHome: 'होम (मुख्य पृष्ठ)',
    navDetectDisease: 'रोग पहचान',
    navPestDetection: 'कीट पहचान',
    navDashboard: 'डैशबोर्ड',
    navAlerts: 'अलर्ट व चेतावनियां',
    navLearn: 'फसल सीखें',
    navExpert: 'विशेषज्ञ सहायता',
    navMyCrops: 'मेरी फसलें',
    navHistory: 'स्कैन इतिहास',
    navSettings: 'सेटिंग्स',

    // Language Switcher
    langToggleLabel: 'भाषा / Language',
    switchLanguage: 'Switch to English',
    english: 'English',
    hindi: 'हिन्दी',

    // GPS & Weather
    weatherTitle: 'खेत का मौसम एवं कृषि सलाह',
    weatherSubtitle: 'आपके सटीक जीपीएस (GPS) स्थान के आधार पर लाइव मौसम, तापमान और छिड़काव की सलाह।',
    detectGpsBtn: 'जीपीएस से खेत का मौसम पता करें',
    detectingLocation: 'जीपीएस द्वारा आपके खेत का स्थान खोजा जा रहा है...',
    gpsLocked: 'जीपीएस स्थान निर्धारित',
    gpsPermissionDenied: 'जीपीएस अनुमति नहीं मिली या बंद है। आप नीचे से अपना कृषि क्षेत्र चुन सकते हैं।',
    selectDistrictFallback: 'या अपना प्रमुख कृषि क्षेत्र चुनें',
    currentTemp: 'तापमान',
    feelsLike: 'महसूस होता है',
    humidity: 'हवा में नमी (आर्द्रता)',
    rainfallChance: 'बारिश की संभावना',
    windSpeed: 'हवा की रफ्तार',
    windDirection: 'हवा की दिशा',
    uvIndex: 'सौर / धूप तीव्रता',
    sprayWindow: 'कीटनाशक छिड़काव की स्थिति',
    sprayOptimal: 'छिड़काव के लिए अनुकूल समय',
    sprayUnfavorable: 'छिड़काव न करें (प्रतिकूल)',
    sprayCaution: 'सावधानीपूर्वक छिड़काव करें',
    sprayReasonOptimal: 'हवा की गति 15 किमी/घंटा से कम और बारिश की संभावना 20% से कम है। छिड़काव सुरक्षित रहेगा।',
    sprayReasonWind: 'हवा की रफ्तार तेज है (>15 किमी/घंटा)। दवाई उड़कर दूसरी फसल पर जा सकती है।',
    sprayReasonRain: 'अगले 4 घंटों में बारिश का अनुमान है। दवाई धुलने का खतरा है। छिड़काव टालें।',
    diseaseRiskTitle: 'रोग संक्रमण जोखिम सूचकांक',
    diseaseRiskHigh: 'फफूंद व झुलसा रोग का उच्च खतरा',
    diseaseRiskModerate: 'मध्यम रोग जोखिम',
    diseaseRiskLow: 'कम जोखिम (सामान्य स्थिति)',
    diseaseRiskFungalWarning: 'हवा में अधिक नमी (>80%) और गर्म मौसम के कारण अगेती झुलसा व फफूंद रोग फैलने की प्रबल संभावना है। फसल का नियमित निरीक्षण करें।',
    diseaseRiskSafe: 'मौसम सूखा है जिससे फफूंद के बीजाणु नहीं पनप रहे हैं। फसल सुरक्षित है।',
    fiveDayForecast: 'अगले 5 दिनों का कृषि मौसम अनुमान',
    refreshWeather: 'मौसम अपडेट करें',
    coordinates: 'सटीक जीपीएस निर्देशांक',
    exactLocation: 'सटीक स्थान',
    gpsAccuracy: 'जीपीएस सटीकता',
    viewOnMap: 'गूगल मैप पर देखें',
    popularAgriRegions: 'प्रमुख कृषि क्षेत्र',

    // Home Hero
    heroBadge: 'आधुनिक कृषि बुद्धिमत्ता प्लेटफॉर्म',
    heroHeadingLine1: 'समय पर पहचानें।',
    heroHeadingLine2: 'सटीक प्रबंधन करें।',
    heroHeadingLine3: 'स्वस्थ और भरपूर फसल पाएं।',
    heroSubtext: 'आर्टिफिशियल इंटेलिजेंस (AI) से अपनी फसलों के रोगों और कीटों को समय रहते पहचानें और सही रोकथाम के व्यावहारिक उपाय पाएं।',
    heroScanCta: 'अपनी फसल स्कैन करें',
    heroExploreCta: 'रोग व उपाय देखें',
    heroStatPrecision: '94.8%',
    heroStatPrecisionLabel: 'जांच सटीकता',
    heroStatCrops: '9+ फसलें',
    heroStatCropsLabel: 'संपूर्ण खेत सुरक्षा',
    heroStatSpeed: '< 3 सेकंड',
    heroStatSpeedLabel: 'त्वरित परिणाम',

    // Hero Card
    analyzingCrop: 'फसल की जांच जारी है...',
    diseaseDetected: 'रोग का लक्षण पाया गया',
    suspectedPathology: 'संभावित रोग',
    confidenceLabel: 'विश्वसनीयता',
    cropHealthIndex: 'फसल स्वास्थ्य सूचकांक',
    liveFieldDiagnostic: 'लाइव खेत निदान',

    // How It Works
    howItWorksBadge: 'हर किसान के लिए आसान',
    howItWorksTitle: '4 आसान चरणों में उपचार पाएं',
    howItWorksSubtitle: 'खेत में रोग दिखने से लेकर उचित उपचार तक केवल एक मिनट में—बिना किसी कठिन तकनीकी जानकारी के।',
    step1Title: 'फोटो अपलोड करें',
    step1Desc: 'फोन के कैमरे से रोगग्रस्त पत्ती या तने की साफ फोटो लें या गैलरी से फोटो चुनें।',
    step2Title: 'एआई द्वारा जांच',
    step2Desc: 'एग्रोगार्ड AI पत्ती के धब्बों, रंग परिवर्तन और कीटों के लक्षणों का सेकंडों में मिलान करता है।',
    step3Title: 'रोग परिणाम पाएं',
    step3Desc: 'रोग या कीट का नाम, गंभीरता का स्तर और लक्षण तुरंत अपनी स्क्रीन पर देखें।',
    step4Title: 'उपचार शुरू करें',
    step4Desc: 'जैविक, घरेलू और अनुमोदित कीटनाशकों के सुरक्षित प्रयोग की पूरी सलाह पाएं।',

    // Why Choose Us
    whyChooseTitle: 'एग्रोगार्ड AI ही क्यों चुनें?',
    whyChooseSubtitle: 'भारतीय किसानों की जमीनी जरूरतों, मौसम और टिकाऊ खेती के लिए विशेष रूप से विकसित।',
    whyFeature1Title: 'सटीक एआई जांच',
    whyFeature1Desc: '1,00,000 से अधिक रोगग्रस्त पत्तों के डाटा पर प्रशिक्षित, जो धूप और छांव में भी सही परिणाम देता है।',
    whyFeature2Title: 'मौसम अनुसार अग्रिम चेतावनी',
    whyFeature2Desc: 'स्थानीय तापमान, बारिश और नमी के आधार पर रोग फैलने से पहले ही किसानों को सावधान करता है।',
    whyFeature3Title: 'सुलभ व सुरक्षित प्रबंधन',
    whyFeature3Desc: 'अंधाधुंध रासायनिक छिड़काव के बजाय जैविक एवं समन्वित कीट प्रबंधन (IPM) को बढ़ावा देता है।',
    whyFeature4Title: 'किसान मित्र इंटरफेस',
    whyFeature4Desc: 'पूरी तरह हिन्दी में उपलब्ध, बड़े और स्पष्ट बटन, और जीपीएस आधारित स्थानीय मौसम की सटीक जानकारी।',

    // Supported Crops
    supportedCropsBadge: 'व्यापक सुरक्षा',
    supportedCropsTitle: 'सहायक फसलें एवं किस्में',
    supportedCropsSubtitle: 'भारत की प्रमुख नकदी व खाद्यान्न फसलों के लिए विशेष रोग पहचान मॉडल।',
    scanThisCrop: 'यह फसल स्कैन करें',

    // Camera & Image Upload
    captureLiveBtn: 'लाइव कैमरा से फोटो लें',
    uploadDeviceBtn: 'गैलरी / फाइल से चुनें',
    dropImageHere: 'रोगग्रस्त पत्ती की फोटो यहां खींचें या नीचे दिए बटन दबाएं',
    selectCropLabel: 'अपनी फसल चुनें',
    nonPlantErrorTitle: 'पौधे या पत्ती की फोटो आवश्यक है',
    nonPlantErrorMessage: 'कृपया पौधे या फसल से संबंधित फोटो ही अपलोड करें। इंसान के चेहरे, पालतू जानवरों या अन्य वस्तुओं की जांच नहीं की जा सकती।',
    retakeLive: 'फिर से लाइव फोटो लें',
    replaceImage: 'दूसरी फोटो लगाएं',
    analyzeDiseaseBtn: 'फसल रोग का विश्लेषण करें',
    analyzePestBtn: 'फसल कीट का विश्लेषण करें',
    analyzingNow: 'पौधे की जांच की जा रही है...',

    // Live Camera Viewfinder
    liveCameraTitle: 'लाइव फील्ड कैमरा',
    targetingLabel: 'लक्षित फसल:',
    frameLeafGuidance: 'प्रभावित पत्ती को बीच के चौकोर घेरे में रखें',
    retakePhoto: 'फिर से फोटो लें',
    confirmAnalyze: 'पुष्टि करें और जांचें',
    cameraUnavailable: 'कैमरा शुरू नहीं हो सका',
    tryAgain: 'पुनः प्रयास करें',
    toggleFlashlight: 'टॉर्च चालू/बंद करें',
    toggleGrid: 'ग्रिड चालू/बंद करें',
    switchCamera: 'कैमरा बदलें (आगे/पीछे)',

    // Diagnosis & Recommendations
    diagnosisTitle: 'निदान परिणाम एवं प्रबंधन सलाह',
    severityLabel: 'गंभीरता स्तर',
    immediateTreatment: 'तत्काल जरूरी कदम',
    preventiveMeasures: 'भविष्य में रोकथाम के उपाय',
    organicBioTreatment: 'जैविक व प्राकृतिक उपचार',
    chemicalIpm: 'रासायनिक व समन्वित प्रबंधन (IPM)',
    consultExpertBtn: 'कृषि विशेषज्ञ से बात करें',
    saveToHistory: 'खेत इतिहास में सुरक्षित किया गया'
  }
};

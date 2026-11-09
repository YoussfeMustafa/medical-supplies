import { Category } from "@/types/product.types";

export const mockCategories: Category[] = [
  {
    id: "cat-1",
    slug: "personal-protective-equipment",
    name: {
      ar: "مهمات الوقاية الشخصية (PPE)",
      en: "Personal Protective Equipment",
    },
    description: {
      ar: "قفازات لاتكس ونيتريل، كمامات جراحية N95، شيلد وجه، وبدل عزل معقمة",
      en: "Nitrile & latex gloves, N95 surgical masks, face shields, and sterile isolation gowns",
    },
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    iconName: "ShieldAlert",
    productCount: 8,
    featured: true,
  },
  {
    id: "cat-2",
    slug: "diagnostic-equipment",
    name: {
      ar: "أجهزة التشخيص والقياس",
      en: "Diagnostic Equipment",
    },
    description: {
      ar: "أجهزة ضغط دم رقمية، سماعات طبية، أجهزة نبض الأكسجين، وموازين حرارة طبية",
      en: "Digital blood pressure monitors, stethoscopes, pulse oximeters, and clinical thermometers",
    },
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80",
    iconName: "Stethoscope",
    productCount: 7,
    featured: true,
  },
  {
    id: "cat-3",
    slug: "surgical-consumables",
    name: {
      ar: "المستهلكات الجراحية والتعقيم",
      en: "Surgical & Consumables",
    },
    description: {
      ar: "سرنجات معقمة، كانيولات وريدية، شاش وقطن طبي، وخيوط جراحية عالية الجودة",
      en: "Sterile syringes, IV cannulas, medical gauze, bandages, and surgical sutures",
    },
    image: "https://images.unsplash.com/photo-1583912267670-6575ad472688?auto=format&fit=crop&w=600&q=80",
    iconName: "Scissors",
    productCount: 6,
    featured: true,
  },
  {
    id: "cat-4",
    slug: "mobility-rehabilitation",
    name: {
      ar: "أجهزة الحركة والتأهيل الطبي",
      en: "Mobility & Rehabilitation",
    },
    description: {
      ar: "كراسي متحركة يدوية وكهربائية، عكازات طبية، مشايات كبار السن، ودعامات المفاصل",
      en: "Manual & electric wheelchairs, crutches, senior walkers, and orthotic braces",
    },
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80",
    iconName: "Accessibility",
    productCount: 5,
    featured: true,
  },
  {
    id: "cat-5",
    slug: "diabetes-care",
    name: {
      ar: "رعاية مرضى السكري",
      en: "Diabetes Care",
    },
    description: {
      ar: "أجهزة قياس السكر بالدم، شرائط اختبار، شكاكات معقمة، وحافظات إنسولين مبردة",
      en: "Blood glucose monitors, test strips, sterile lancets, and insulin cooling cases",
    },
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80",
    iconName: "Activity",
    productCount: 5,
    featured: true,
  },
  {
    id: "cat-6",
    slug: "respiratory-care",
    name: {
      ar: "أجهزة التنفس والأكسجين",
      en: "Respiratory Care",
    },
    description: {
      ar: "أجهزة نيبولايزر، مولدات أكسجين طبية، أجهزة شفط بلغم، وأقنعة استنشاق",
      en: "Compressor nebulizers, medical oxygen concentrators, suction units, and inhalation masks",
    },
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80",
    iconName: "Wind",
    productCount: 5,
    featured: true,
  },
  {
    id: "cat-7",
    slug: "first-aid-emergency",
    name: {
      ar: "الإسعافات الأولية والطوارئ",
      en: "First Aid & Emergency",
    },
    description: {
      ar: "حقائب إسعاف للمصانع والمنازل، مثبتات العنق، جبائر طوارئ، وبطانيات حرارية",
      en: "Industrial & home first aid kits, cervical collars, emergency splints, and thermal trauma blankets",
    },
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=600&q=80",
    iconName: "Cross",
    productCount: 5,
  },
  {
    id: "cat-8",
    slug: "hospital-furniture",
    name: {
      ar: "أثاث المستشفيات والعيادات",
      en: "Hospital Furniture",
    },
    description: {
      ar: "أسرة عناية مركزة كهربائية، طاولات فحص طبية، حوامل محاليل، وكراسي سحب عينات",
      en: "Electric ICU beds, examination tables, IV poles, and blood donation phlebotomy chairs",
    },
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
    iconName: "Bed",
    productCount: 5,
  },
  {
    id: "cat-9",
    slug: "sterilization-disinfection",
    name: {
      ar: "التعقيم والتطهير الطبي",
      en: "Sterilization & Disinfection",
    },
    description: {
      ar: "أجهزة أوتوكلاف، مطهرات جراحية للأيدي والأسطح، رولات تعقيم حرارية",
      en: "Autoclave sterilizers, hospital grade disinfectants, and sterilization pouches",
    },
    image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=600&q=80",
    iconName: "Sparkles",
    productCount: 5,
  },
  {
    id: "cat-10",
    slug: "dental-supplies",
    name: {
      ar: "مستلزمات طب الأسنان",
      en: "Dental Supplies",
    },
    description: {
      ar: "أدوات فحص الأسنان، مواد حشو معقمة، مرايل واقية، وإبر تخدير الأسنان",
      en: "Dental diagnostic instruments, restorative composites, dental bibs, and dental anesthesia needles",
    },
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80",
    iconName: "Smile",
    productCount: 4,
  },
  {
    id: "cat-11",
    slug: "mother-child-care",
    name: {
      ar: "رعاية الأم وحديثي الولادة",
      en: "Mother & Child Care",
    },
    description: {
      ar: "أجهزة شفط الحليب الطبية، حضانات أطفال، موازين رضع، وأطواق سرّة معقمة",
      en: "Clinical breast pumps, infant phototherapy units, baby weighing scales, and sterile cord clamps",
    },
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80",
    iconName: "HeartHandshake",
    productCount: 4,
  },
  {
    id: "cat-12",
    slug: "laboratory-supplies",
    name: {
      ar: "مستلزمات المعامل والتحاليل",
      en: "Laboratory Supplies",
    },
    description: {
      ar: "أنابيب سحب الدم Vacuum، شرائح ميكروسكوب، بيبيتات دقيقة، وحاضنات بكتيرية",
      en: "Vacutainer blood collection tubes, microscope slides, micropipettes, and lab petri dishes",
    },
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    iconName: "FlaskConical",
    productCount: 4,
  },
];

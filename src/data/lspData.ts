
export interface LSP {
  id: number;
  name: string;
  photo: string;
  specialization: string[];
  qualification: string[];
  experience: number;
  languages: string[];
  fees: {
    consultation: number;
    hourly?: number;
    fixed?: {
      service: string;
      amount: number;
    }[];
  };
  location: {
    city: string;
    state: string;
    address: string;
  };
  rating: number;
  reviews: number;
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  about: string;
  verified: boolean;
}

const lspData: LSP[] = [
  {
    id: 1,
    name: "Rajesh Sharma",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    specialization: ["Corporate Law", "Mergers & Acquisitions", "Business Law"],
    qualification: ["LLB, Delhi University", "LLM, National Law School of India"],
    experience: 12,
    languages: ["English", "Hindi", "Punjabi"],
    fees: {
      consultation: 2500,
      hourly: 5000,
      fixed: [
        { service: "Contract Review", amount: 15000 },
        { service: "Legal Documentation", amount: 25000 }
      ]
    },
    location: {
      city: "New Delhi",
      state: "Delhi",
      address: "M-24, Greater Kailash Part 1, New Delhi"
    },
    rating: 4.8,
    reviews: 94,
    contact: {
      phone: "+91 98765 43210",
      email: "rajesh.sharma@legalpulse.in",
      website: "www.rajeshsharmalaw.com"
    },
    about: "Rajesh Sharma is a seasoned corporate lawyer with over 12 years of experience handling complex business transactions and corporate structuring. He has assisted numerous startups and established businesses with their legal needs.",
    verified: true
  },
  {
    id: 2,
    name: "Priya Patel",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    specialization: ["Family Law", "Divorce Law", "Child Custody"],
    qualification: ["LLB, Mumbai University", "Family Law Certification, Indian Law Institute"],
    experience: 8,
    languages: ["English", "Hindi", "Gujarati", "Marathi"],
    fees: {
      consultation: 1500,
      hourly: 3500,
      fixed: [
        { service: "Divorce Filing", amount: 35000 },
        { service: "Child Custody Case", amount: 45000 }
      ]
    },
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      address: "404, Sunset Plaza, Bandra West, Mumbai"
    },
    rating: 4.9,
    reviews: 128,
    contact: {
      phone: "+91 92223 33411",
      email: "priya.patel@legalpulse.in",
      website: "www.priyapatellaw.com"
    },
    about: "Priya Patel specializes in family law matters with a compassionate approach to sensitive issues. She has successfully represented clients in divorce proceedings, child custody battles, and maintenance cases across Maharashtra.",
    verified: true
  },
  {
    id: 3,
    name: "Vikram Singh",
    photo: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    specialization: ["Criminal Law", "Bail Applications", "White Collar Crime"],
    qualification: ["LLB, Punjab University", "Criminology Diploma, Delhi Institute"],
    experience: 15,
    languages: ["English", "Hindi", "Punjabi"],
    fees: {
      consultation: 3000,
      hourly: 6000,
      fixed: [
        { service: "Bail Application", amount: 25000 },
        { service: "Criminal Trial", amount: 150000 }
      ]
    },
    location: {
      city: "Chandigarh",
      state: "Punjab",
      address: "Sector 17, Chandigarh"
    },
    rating: 4.7,
    reviews: 86,
    contact: {
      phone: "+91 94444 55555",
      email: "vikram.singh@legalpulse.in"
    },
    about: "Vikram Singh is a prominent criminal lawyer with extensive experience in handling high-profile criminal cases. His strategic approach and in-depth knowledge of criminal procedure have earned him a reputation as one of the top criminal defense attorneys in Punjab.",
    verified: true
  },
  {
    id: 4,
    name: "Ananya Krishnan",
    photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    specialization: ["Intellectual Property", "Patents", "Trademarks", "Copyrights"],
    qualification: ["LLB, National Law School", "LLM in IP Law, University of Delhi"],
    experience: 10,
    languages: ["English", "Hindi", "Tamil", "Malayalam"],
    fees: {
      consultation: 2000,
      hourly: 4500,
      fixed: [
        { service: "Trademark Registration", amount: 20000 },
        { service: "Patent Filing", amount: 50000 }
      ]
    },
    location: {
      city: "Bangalore",
      state: "Karnataka",
      address: "Indiranagar, Bangalore"
    },
    rating: 4.9,
    reviews: 63,
    contact: {
      phone: "+91 87654 32109",
      email: "ananya.k@legalpulse.in",
      website: "www.ipwithananya.com"
    },
    about: "Ananya Krishnan is an intellectual property expert specializing in patents, trademarks, and copyrights. She has helped numerous tech startups and creative professionals protect their intellectual assets and navigate complex IP regulations.",
    verified: true
  },
  {
    id: 5,
    name: "Mohammed Qureshi",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    specialization: ["Property Law", "Real Estate", "Land Acquisition"],
    qualification: ["LLB, Aligarh Muslim University", "Diploma in Real Estate Law"],
    experience: 18,
    languages: ["English", "Hindi", "Urdu"],
    fees: {
      consultation: 2000,
      hourly: 4000,
      fixed: [
        { service: "Property Documentation", amount: 25000 },
        { service: "Title Verification", amount: 15000 }
      ]
    },
    location: {
      city: "Hyderabad",
      state: "Telangana",
      address: "Banjara Hills, Hyderabad"
    },
    rating: 4.6,
    reviews: 112,
    contact: {
      phone: "+91 76543 21098",
      email: "m.qureshi@legalpulse.in"
    },
    about: "Mohammed Qureshi is a veteran property lawyer with 18 years of experience in handling complex property matters. His expertise spans property disputes, land acquisition cases, and real estate transactions across Telangana and Andhra Pradesh.",
    verified: true
  },
  {
    id: 6,
    name: "Lakshmi Raman",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    specialization: ["Tax Law", "GST Compliance", "Income Tax"],
    qualification: ["LLB, Chennai Law College", "Chartered Accountant"],
    experience: 9,
    languages: ["English", "Tamil", "Telugu"],
    fees: {
      consultation: 1800,
      hourly: 3800,
      fixed: [
        { service: "Tax Planning", amount: 30000 },
        { service: "Tax Dispute Resolution", amount: 40000 }
      ]
    },
    location: {
      city: "Chennai",
      state: "Tamil Nadu",
      address: "T. Nagar, Chennai"
    },
    rating: 4.7,
    reviews: 75,
    contact: {
      phone: "+91 65432 10987",
      email: "lakshmi.r@legalpulse.in",
      website: "www.lakshmitax.com"
    },
    about: "Lakshmi Raman combines her legal expertise with her CA qualification to provide comprehensive tax law services. She specializes in GST compliance, income tax planning, and representing clients in tax disputes before various tribunals.",
    verified: true
  },
  {
    id: 7,
    name: "Arjun Mehta",
    photo: "https://images.unsplash.com/photo-1542190891-2093d38760f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    specialization: ["Employment Law", "Labor Disputes", "Workplace Harassment"],
    qualification: ["LLB, Gujarat National Law University", "Masters in Labor Law, Symbiosis"],
    experience: 7,
    languages: ["English", "Hindi", "Gujarati"],
    fees: {
      consultation: 1500,
      hourly: 3500
    },
    location: {
      city: "Ahmedabad",
      state: "Gujarat",
      address: "Navrangpura, Ahmedabad"
    },
    rating: 4.5,
    reviews: 48,
    contact: {
      phone: "+91 54321 09876",
      email: "arjun.m@legalpulse.in"
    },
    about: "Arjun Mehta specializes in employment law and labor disputes, representing both employers and employees. He has successfully handled numerous cases related to workplace discrimination, wrongful termination, and labor compliance issues.",
    verified: true
  },
  {
    id: 8,
    name: "Sunita Agarwal",
    photo: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    specialization: ["Consumer Law", "Civil Litigation", "Medical Negligence"],
    qualification: ["LLB, Rajasthan University", "Certification in Consumer Rights Law"],
    experience: 14,
    languages: ["English", "Hindi", "Rajasthani"],
    fees: {
      consultation: 1200,
      hourly: 3000,
      fixed: [
        { service: "Consumer Case Filing", amount: 18000 },
        { service: "Medical Negligence Case", amount: 50000 }
      ]
    },
    location: {
      city: "Jaipur",
      state: "Rajasthan",
      address: "C-Scheme, Jaipur"
    },
    rating: 4.8,
    reviews: 103,
    contact: {
      phone: "+91 43210 98765",
      email: "sunita.a@legalpulse.in",
      website: "www.consumerrightsindia.com"
    },
    about: "Sunita Agarwal is a leading consumer rights advocate with extensive experience in civil litigation and medical negligence cases. She has helped numerous consumers get justice against unfair trade practices and medical malpractice.",
    verified: true
  }
];

export default lspData;

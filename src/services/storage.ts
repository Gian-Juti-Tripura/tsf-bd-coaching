import {
  User,
  CourseVideo,
  ModelTest,
  TestAttempt,
  Notice,
  FeeRecord,
  UserRole,
  UnitType
} from '../types';

const STORAGE_KEYS = {
  USERS: 'tsf_pure_users',
  CURRENT_USER: 'tsf_pure_current_user',
  VIDEOS: 'tsf_pure_videos',
  TESTS: 'tsf_pure_tests',
  ATTEMPTS: 'tsf_pure_attempts',
  NOTICES: 'tsf_pure_notices',
  FEES: 'tsf_pure_fees',
};

// Initial Creators & Super Admins
export const INITIAL_SUPER_ADMINS: User[] = [
  {
    id: 'admin-1',
    email: 'dhamayantripura13@gmail.com',
    pin: '2026',
    name: 'Dhamayan Tripura',
    role: 'super_admin',
    enrolledUnits: ['Science', 'Commerce', 'Arts', 'Nursing'],
    phone: '+880 1819-002627',
    createdAt: '2026-01-01'
  },
  {
    id: 'admin-2',
    email: 'gianjuti.csecu@gmail.com',
    pin: '2026',
    name: 'Gian Juti Tripura (CSE, CU)',
    role: 'super_admin',
    enrolledUnits: ['Science', 'Commerce', 'Arts', 'Nursing'],
    phone: '+880 1711-223344',
    createdAt: '2026-01-01'
  }
];

const INITIAL_USERS: User[] = [
  ...INITIAL_SUPER_ADMINS,
  {
    id: 'teacher-1',
    email: 'teacher.science@gmail.com',
    pin: '1234',
    name: 'Prof. Animesh Tripura (DU Physics)',
    role: 'teacher',
    enrolledUnits: ['Science'],
    phone: '+880 1822-114455',
    createdAt: '2026-01-05'
  },
  {
    id: 'teacher-2',
    email: 'teacher.nursing@gmail.com',
    pin: '1234',
    name: 'Sister Priyanka Chakma (B.Sc Nursing)',
    role: 'teacher',
    enrolledUnits: ['Nursing'],
    phone: '+880 1733-445566',
    createdAt: '2026-01-08'
  },
  {
    id: 'student-1',
    email: 'student.rahim@gmail.com',
    pin: '1234',
    name: 'Rahim Tripura',
    role: 'student',
    enrolledUnits: ['Science', 'Nursing'],
    phone: '+880 1855-667788',
    createdAt: '2026-01-15'
  },
  {
    id: 'student-2',
    email: 'student.priya@gmail.com',
    pin: '1234',
    name: 'Priya Marma',
    role: 'student',
    enrolledUnits: ['Arts', 'Commerce'],
    phone: '+880 1644-889900',
    createdAt: '2026-01-18'
  }
];

const INITIAL_VIDEOS: CourseVideo[] = [
  {
    id: 'vid-sci-1',
    title: 'ভেক্টর ও গতিবিদ্যা - শর্টকাট টেকনিক ও বিশ্ববিদ্যালয় বিগত বছরের প্রশ্ন সমাধান',
    unit: 'Science',
    subject: 'Physics',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Embed-friendly sample URL
    duration: '45m',
    teacherName: 'Prof. Animesh Tripura',
    teacherEmail: 'teacher.science@gmail.com',
    description: 'ঢাকা বিশ্ববিদ্যালয় ও বুয়েট প্রিলিমিনারি পরীক্ষার জন্য ভেক্টর বিভাজন, ডট ও ক্রস গুণনের সর্বাধিক গুরুত্বপূর্ণ টাইপভিত্তিক শর্টকাট।',
    createdAt: '2026-02-01'
  },
  {
    id: 'vid-sci-2',
    title: 'জৈব রসায়ন: হাইড্রোকার্বন ও বেনজিন বিক্রিয়ার সহজ মানচিত্র',
    unit: 'Science',
    subject: 'Chemistry',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '52m',
    teacherName: 'Prof. Animesh Tripura',
    teacherEmail: 'teacher.science@gmail.com',
    description: 'মেডিকেল ও ঢাবি ক-ইউনিটের ভর্তি পরীক্ষায় বারবার আসা অ্যালকাইল হ্যালাইড ও ইলেক্ট্রোফিলিক প্রতিস্থাপন বিক্রিয়া।',
    createdAt: '2026-02-05'
  },
  {
    id: 'vid-nurs-1',
    title: 'মানব শারীরতত্ত্ব: রক্ত ও সংবহনতন্ত্র (রক্তকণিকা, হৃদপিণ্ডের কপাটিকা)',
    unit: 'Nursing',
    subject: 'Anatomy & Physiology',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '40m',
    teacherName: 'Sister Priyanka Chakma',
    teacherEmail: 'teacher.nursing@gmail.com',
    description: 'নার্সিং ভর্তি পরীক্ষার সবচেয়ে গুরুত্বপূর্ণ মানবদেহ অধ্যায়। রক্ত গ্রুপ, Rh ফ্যাক্টর এবং হৃদস্পন্দনের চক্র।',
    createdAt: '2026-02-10'
  },
  {
    id: 'vid-comm-1',
    title: 'হিসাববিজ্ঞান ১ম পত্র: ব্যাংক সমন্বয় বিবরণী ও সমন্বিত জাবেদা',
    unit: 'Commerce',
    subject: 'Accounting',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '48m',
    teacherName: 'Ripon Dewan (MBA, DU)',
    teacherEmail: 'teacher.commerce@gmail.com',
    description: 'ঢাবি গ-ইউনিট ও গুচ্ছ বাণিজ্যের ব্যাংক সমন্বয় বিবরণীর ক্রেডিট ও ডেবিট মেমোরান্ডাম টেকনিক।',
    createdAt: '2026-02-12'
  },
  {
    id: 'vid-arts-1',
    title: 'English: Subject-Verb Agreement & Right Forms of Verbs Masterclass',
    unit: 'Arts',
    subject: 'English',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '50m',
    teacherName: 'Kabita Tripura',
    teacherEmail: 'teacher.arts@gmail.com',
    description: 'DU B-Unit (Kha) and Law Admission English pin-point rules with previous 10 years question breakdown.',
    createdAt: '2026-02-14'
  }
];

const INITIAL_TESTS: ModelTest[] = [
  {
    id: 'test-sci-1',
    title: 'বিজ্ঞান ইউনিট - পদার্থবিজ্ঞান ও রসায়ন স্পেশাল মডেল টেস্ট ০১',
    unit: 'Science',
    subject: 'Physics & Chemistry',
    durationMinutes: 15,
    totalMarks: 4,
    passMarks: 2.5,
    negativeMarking: 0.25,
    teacherName: 'Prof. Animesh Tripura',
    teacherEmail: 'teacher.science@gmail.com',
    createdAt: '2026-02-15',
    questions: [
      {
        id: 'q1',
        question: 'দুটি সমান ভেক্টরের লব্ধি এদের যেকোনো একটির সমান হলে ভেক্টরদ্বয়ের মধ্যবর্তী কোণ কত?',
        options: ['60°', '90°', '120°', '180°'],
        correctOption: 2,
        explanation: 'R² = P² + Q² + 2PQ cosθ সূত্রানুসারে P = Q = R বসালে cosθ = -1/2, অর্থাৎ θ = 120°।'
      },
      {
        id: 'q2',
        question: 'কোন যৌগে sp³ সংকরায়ণ (Hybridization) বিদ্যমান?',
        options: ['C2H4', 'C2H2', 'CH4', 'C6H6'],
        correctOption: 2,
        explanation: 'মিথেন (CH4) অণুর কেন্দ্রীয় কার্বনে ৪টি সিগমা বন্ধন থাকায় এটি sp³ সংকরিত।'
      },
      {
        id: 'q3',
        question: 'মহাকর্ষীয় ধ্রুবক G এর এসআই (SI) একক কী?',
        options: ['N m² kg⁻²', 'N m kg⁻¹', 'N m⁻² kg²', 'N kg⁻¹'],
        correctOption: 0,
        explanation: 'F = G(m1 m2)/r² সূত্রানুসারে G = F r² / (m1 m2), যার একক N m² kg⁻²।'
      },
      {
        id: 'q4',
        question: 'নিচের কোনটির pH মান সর্বাধিক ক্ষারীয়?',
        options: ['দুধ (pH 6.6)', 'বিশুদ্ধ পানি (pH 7.0)', 'রক্ত (pH 7.4)', 'সোডিয়াম হাইড্রোক্সাইড (pH 13+)'],
        correctOption: 3,
        explanation: 'NaOH একটি শক্তিশালী ক্ষার যার pH মান প্রায় ১৩-১৪।'
      }
    ]
  },
  {
    id: 'test-nurs-1',
    title: 'নার্সিং ভর্তি মডেল টেস্ট - জীববিজ্ঞান ও সাধারণ জ্ঞান',
    unit: 'Nursing',
    subject: 'Biology & GK',
    durationMinutes: 10,
    totalMarks: 3,
    passMarks: 2,
    negativeMarking: 0.25,
    teacherName: 'Sister Priyanka Chakma',
    teacherEmail: 'teacher.nursing@gmail.com',
    createdAt: '2026-02-18',
    questions: [
      {
        id: 'nq1',
        question: 'মানবদেহের সবচেয়ে দীর্ঘ ও শক্তিশালী অস্থি কোনটি?',
        options: ['হিউমেরাস', 'ফিমার (Femur)', 'টিবিয়া', 'রেডিয়াস'],
        correctOption: 1,
        explanation: 'উর্বস্থি বা ফিমার মানবদেহের সবচেয়ে দীর্ঘ, ভারী ও শক্তিশালী অস্থি।'
      },
      {
        id: 'nq2',
        question: 'আন্তর্জাতিক রেড ক্রস সোসাইটির প্রতিষ্ঠাতা কে?',
        options: ['ফ্লোরেন্স নাইটিঙ্গেল', 'হেনরি ডুনান্ট', 'লুই পাস্তুর', 'মাদার তেরেসা'],
        correctOption: 1,
        explanation: 'জঁ অঁরি ডুনান্ট ১৮৬৩ সালে জেনেভায় রেড ক্রস প্রতিষ্ঠা করেন।'
      },
      {
        id: 'nq3',
        question: 'হৃদপিণ্ডের কোন প্রকোষ্ঠ থেকে সারা শরীরে বিশুদ্ধ রক্ত সঞ্চালিত হয়?',
        options: ['ডান অলিন্দ', 'বাম অলিন্দ', 'ডান নিলয়', 'বাম নিলয় (Left Ventricle)'],
        correctOption: 3,
        explanation: 'বাম নিলয় মহাধমনীর (Aorta) মাধ্যমে অক্সিজেনযুক্ত রক্ত সমগ্র দেহে পাম্প করে।'
      }
    ]
  },
  {
    id: 'test-comm-1',
    title: 'বাণিজ্য ইউনিট - হিসাববিজ্ঞান মডেল টেস্ট ০১',
    unit: 'Commerce',
    subject: 'Accounting',
    durationMinutes: 10,
    totalMarks: 3,
    passMarks: 2,
    negativeMarking: 0.25,
    teacherName: 'Ripon Dewan',
    teacherEmail: 'teacher.commerce@gmail.com',
    createdAt: '2026-02-20',
    questions: [
      {
        id: 'cq1',
        question: 'হিসাব সমীকরণ কোনটি সঠিক?',
        options: ['সম্পদ = দায় + মালিকানাস্বত্ব', 'সম্পদ = দায় - মালিকানাস্বত্ব', 'দায় = সম্পদ + আয়', 'মালিকানাস্বত্ব = সম্পদ + দায়'],
        correctOption: 0,
        explanation: 'মৌলিক হিসাব সমীকরণ হলো: A = L + OE (Assets = Liabilities + Owner\'s Equity)।'
      },
      {
        id: 'cq2',
        question: 'কোন হিসাবটি ক্রেডিট উদ্বৃত্ত প্রকাশ করে?',
        options: ['বেতন খরচ', 'প্রদেয় হিসাব (Accounts Payable)', 'নগদান হিসাব', 'যন্ত্রপাতি'],
        correctOption: 1,
        explanation: 'প্রদেয় হিসাব একটি দায় এবং দায়ের সাধারণ উদ্বৃত্ত ক্রেডিট।'
      },
      {
        id: 'cq3',
        question: 'রেওয়ামিল তৈরির মূল উদ্দেশ্য কী?',
        options: ['নিট লাভ নির্ণয়', 'হিসাবের গাণিতিক শুদ্ধতা যাচাই', 'উদ্বৃত্তপত্র তৈরি', 'মূলধন নির্ণয়'],
        correctOption: 1,
        explanation: 'খতিয়ান হিসাবগুলোর ডেবিট ও ক্রেডিট টাকার অঙ্কের সমতা ও গাণিতিক নির্ভুলতা যাচাই করা রেওয়ামিলের মূল কাজ।'
      }
    ]
  },
  {
    id: 'test-arts-1',
    title: 'মানবিক ইউনিট - বাংলা ও ইংরেজি ফাউন্ডেশন মডেল টেস্ট',
    unit: 'Arts',
    subject: 'Bangla & English',
    durationMinutes: 10,
    totalMarks: 3,
    passMarks: 2,
    negativeMarking: 0.25,
    teacherName: 'Kabita Tripura',
    teacherEmail: 'teacher.arts@gmail.com',
    createdAt: '2026-02-22',
    questions: [
      {
        id: 'aq1',
        question: '"চণ্ডীমঙ্গল" কাব্যের সর্বশ্রেষ্ঠ কবি কে?',
        options: ['মুকুন্দরাম চক্রবর্তী', 'বিজয়গুপ্ত', 'ভারতচন্দ্র রায়গুণাকর', 'দৌলত কাজী'],
        correctOption: 0,
        explanation: 'কবি কঙ্কন উপাধিতে ভূষিত মুকুন্দরাম চক্রবর্তী চণ্ডীমঙ্গল কাব্যের শ্রেষ্ঠ কবি।'
      },
      {
        id: 'aq2',
        question: 'Choose the correct preposition: "He is senior ___ me by two years."',
        options: ['than', 'to', 'from', 'with'],
        correctOption: 1,
        explanation: 'Latin comparative adjectives (senior, junior, superior, inferior) take "to", not "than".'
      },
      {
        id: 'aq3',
        question: '"অপমান" শব্দের "অপ" উপসর্গটি কোন অর্থে ব্যবহৃত হয়েছে?',
        options: ['বিপরীত', 'নিকৃষ্ট', 'স্থানান্তর', 'ক্ষুদ্রতা'],
        correctOption: 0,
        explanation: 'মানের বিপরীত অপমান, তাই এখানে "অপ" উপসর্গটি বিপরীত অর্থে ব্যবহৃত হয়েছে।'
      }
    ]
  }
];

const INITIAL_NOTICES: Notice[] = [
  {
    id: 'not-1',
    title: '২০২৬–২৭ শিক্ষাবর্ষে সকল ইউনিটের ক্লাস শিডিউল ও ওরিয়েন্টেশন',
    content: 'সকল ইউনিটের (বিজ্ঞান, বাণিজ্য, মানবিক ও নার্সিং) ভর্তিকৃত শিক্ষার্থীদের জানানো যাচ্ছে যে আগামী শুক্রবার সকাল ৯:০০ টায় কেন্দ্রীয় ভার্চুয়াল ওরিয়েন্টেশন অনুষ্ঠিত হবে।',
    unit: 'All',
    authorName: 'Dhamayan Tripura',
    authorRole: 'Super Admin',
    isUrgent: true,
    createdAt: '2026-02-10'
  },
  {
    id: 'not-2',
    title: 'বিজ্ঞান ও নার্সিং ইউনিটের স্পেশাল মডেল টেস্ট সিরিজ ঘোষণা',
    content: 'মেডিকেল ও ঢাবি ক-ইউনিটের ভর্তি পরীক্ষার্থীদের জন্য আগামী সপ্তাহ থেকে প্রতি শনিবার ও মঙ্গলবার পূর্ণাঙ্গ ১০০ নম্বরের লাইভ কম্পিউটার বেজড পরীক্ষা অনুষ্ঠিত হবে।',
    unit: 'Science',
    authorName: 'Prof. Animesh Tripura',
    authorRole: 'Teacher',
    isUrgent: false,
    createdAt: '2026-02-12'
  },
  {
    id: 'not-3',
    title: 'নার্সিং ভর্তি পরীক্ষার সরকারি সার্কুলার নির্দেশিকা ২০২৬',
    content: 'নার্সিং ও মিডওয়াইফারি অধিদপ্তরের বিজ্ঞপ্তি অনুযায়ী জীববিজ্ঞান বিষয়ে ন্যূনতম জিপিএ ৩.০০ এবং মোট জিপিএ ৭.০০ (বিজ্ঞান) বা ৬.৫০ (উপজাতি কোটা) থাকতে হবে।',
    unit: 'Nursing',
    authorName: 'Sister Priyanka Chakma',
    authorRole: 'Teacher',
    isUrgent: true,
    createdAt: '2026-02-15'
  }
];

const INITIAL_FEES: FeeRecord[] = [
  {
    id: 'fee-1',
    receiptNo: 'TSF-REC-001',
    studentEmail: 'student.rahim@gmail.com',
    studentName: 'Rahim Tripura',
    unit: 'Science',
    amount: 5000,
    feeType: 'Admission Fee',
    paymentMethod: 'bKash',
    transactionId: 'BK9X274810M',
    date: '2026-02-01',
    status: 'Paid'
  },
  {
    id: 'fee-2',
    receiptNo: 'TSF-REC-002',
    studentEmail: 'student.priya@gmail.com',
    studentName: 'Priya Marma',
    unit: 'Nursing',
    amount: 4500,
    feeType: 'Admission Fee',
    paymentMethod: 'Nagad',
    transactionId: 'NG88112233K',
    date: '2026-02-05',
    status: 'Paid'
  }
];

function getStored<T>(key: string, defaultVal: T): T {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(raw);
  } catch (e) {
    return defaultVal;
  }
}

function setStored<T>(key: string, val: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error(`Failed to write to localStorage for key ${key}:`, e);
  }
}

export const storageService = {
  // User Authentication & Management
  getUsers(): User[] {
    return getStored<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
  },
  saveUsers(users: User[]): void {
    setStored(STORAGE_KEYS.USERS, users);
  },
  getCurrentUser(): User | null {
    const user = getStored<User | null>(STORAGE_KEYS.CURRENT_USER, INITIAL_SUPER_ADMINS[0]);
    return user;
  },
  setCurrentUser(user: User | null): void {
    setStored(STORAGE_KEYS.CURRENT_USER, user);
  },
  authenticateUser(email: string, pin: string): User | null {
    const users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPin = pin.trim();

    // Check if creator email trying to log in
    const isCreator1 = cleanEmail === 'dhamayantripura13@gmail.com';
    const isCreator2 = cleanEmail === 'gianjuti.csecu@gmail.com';

    let found = users.find((u) => u.email.toLowerCase() === cleanEmail && u.pin === cleanPin);

    // If creators logging in with PIN 2026 for first time or resetting
    if (!found && (isCreator1 || isCreator2) && (cleanPin === '2026' || cleanPin === '1234')) {
      const creatorObj: User = {
        id: isCreator1 ? 'admin-1' : 'admin-2',
        email: cleanEmail,
        pin: cleanPin,
        name: isCreator1 ? 'Dhamayan Tripura' : 'Gian Juti Tripura (CSE, CU)',
        role: 'super_admin',
        enrolledUnits: ['Science', 'Commerce', 'Arts', 'Nursing'],
        phone: '+880 1819-002627',
        createdAt: '2026-01-01'
      };
      this.saveUsers([...users.filter((u) => u.email.toLowerCase() !== cleanEmail), creatorObj]);
      found = creatorObj;
    }

    if (found) {
      this.setCurrentUser(found);
      return found;
    }
    return null;
  },
  registerUser(name: string, email: string, pin: string, startingUnit: UnitType): User {
    const users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPin = pin.trim();

    // If matches creator email, make super admin!
    const isCreator = cleanEmail === 'dhamayantripura13@gmail.com' || cleanEmail === 'gianjuti.csecu@gmail.com';

    const newUser: User = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      pin: cleanPin,
      name: name.trim(),
      role: isCreator ? 'super_admin' : 'student',
      enrolledUnits: [startingUnit],
      createdAt: new Date().toISOString().slice(0, 10)
    };

    const updated = [...users.filter((u) => u.email.toLowerCase() !== cleanEmail), newUser];
    this.saveUsers(updated);
    this.setCurrentUser(newUser);
    return newUser;
  },
  updateUserRole(email: string, newRole: UserRole): boolean {
    const users = this.getUsers();
    const cleanEmail = email.trim().toLowerCase();

    // Preserve the 2 creators as super admin
    if ((cleanEmail === 'dhamayantripura13@gmail.com' || cleanEmail === 'gianjuti.csecu@gmail.com') && newRole !== 'super_admin') {
      return false; // Cannot demote permanent creators
    }

    const updated = users.map((u) => {
      if (u.email.toLowerCase() === cleanEmail) {
        return { ...u, role: newRole };
      }
      return u;
    });
    this.saveUsers(updated);

    const current = this.getCurrentUser();
    if (current && current.email.toLowerCase() === cleanEmail) {
      this.setCurrentUser({ ...current, role: newRole });
    }
    return true;
  },
  toggleEnrollment(email: string, unit: UnitType): User | null {
    const users = this.getUsers();
    let updatedUser: User | null = null;
    const cleanEmail = email.trim().toLowerCase();

    const updated = users.map((u) => {
      if (u.email.toLowerCase() === cleanEmail) {
        const currentUnits = u.enrolledUnits || [];
        const isEnrolled = currentUnits.includes(unit);
        const newUnits = isEnrolled
          ? currentUnits.filter((item) => item !== unit)
          : [...currentUnits, unit];
        updatedUser = { ...u, enrolledUnits: newUnits };
        return updatedUser;
      }
      return u;
    });

    this.saveUsers(updated);
    if (updatedUser) {
      this.setCurrentUser(updatedUser);
    }
    return updatedUser;
  },

  // Course Videos
  getVideos(): CourseVideo[] {
    return getStored<CourseVideo[]>(STORAGE_KEYS.VIDEOS, INITIAL_VIDEOS);
  },
  saveVideo(video: CourseVideo): void {
    const videos = this.getVideos();
    setStored(STORAGE_KEYS.VIDEOS, [video, ...videos.filter((v) => v.id !== video.id)]);
  },
  deleteVideo(id: string): void {
    const videos = this.getVideos();
    setStored(STORAGE_KEYS.VIDEOS, videos.filter((v) => v.id !== id));
  },

  // Model Tests
  getModelTests(): ModelTest[] {
    return getStored<ModelTest[]>(STORAGE_KEYS.TESTS, INITIAL_TESTS);
  },
  saveModelTest(test: ModelTest): void {
    const tests = this.getModelTests();
    setStored(STORAGE_KEYS.TESTS, [test, ...tests.filter((t) => t.id !== test.id)]);
  },
  deleteModelTest(id: string): void {
    const tests = this.getModelTests();
    setStored(STORAGE_KEYS.TESTS, tests.filter((t) => t.id !== id));
  },

  // Test Attempts
  getTestAttempts(): TestAttempt[] {
    return getStored<TestAttempt[]>(STORAGE_KEYS.ATTEMPTS, []);
  },
  saveTestAttempt(attempt: TestAttempt): void {
    const attempts = this.getTestAttempts();
    setStored(STORAGE_KEYS.ATTEMPTS, [attempt, ...attempts]);
  },

  // Notices
  getNotices(): Notice[] {
    return getStored<Notice[]>(STORAGE_KEYS.NOTICES, INITIAL_NOTICES);
  },
  saveNotice(notice: Notice): void {
    const notices = this.getNotices();
    setStored(STORAGE_KEYS.NOTICES, [notice, ...notices.filter((n) => n.id !== notice.id)]);
  },
  deleteNotice(id: string): void {
    const notices = this.getNotices();
    setStored(STORAGE_KEYS.NOTICES, notices.filter((n) => n.id !== id));
  },

  // Fees
  getFees(): FeeRecord[] {
    return getStored<FeeRecord[]>(STORAGE_KEYS.FEES, INITIAL_FEES);
  },
  saveFee(fee: FeeRecord): void {
    const fees = this.getFees();
    setStored(STORAGE_KEYS.FEES, [fee, ...fees]);
  },

  // Database Backup / Reset
  exportBackupJson(): string {
    const backup = {
      version: '3.0.0',
      exportedAt: new Date().toISOString(),
      app: 'TSF Coaching Hub',
      data: {
        users: this.getUsers(),
        videos: this.getVideos(),
        tests: this.getModelTests(),
        attempts: this.getTestAttempts(),
        notices: this.getNotices(),
        fees: this.getFees()
      }
    };
    return JSON.stringify(backup, null, 2);
  },
  importBackupJson(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.data) return false;
      if (parsed.data.users) setStored(STORAGE_KEYS.USERS, parsed.data.users);
      if (parsed.data.videos) setStored(STORAGE_KEYS.VIDEOS, parsed.data.videos);
      if (parsed.data.tests) setStored(STORAGE_KEYS.TESTS, parsed.data.tests);
      if (parsed.data.attempts) setStored(STORAGE_KEYS.ATTEMPTS, parsed.data.attempts);
      if (parsed.data.notices) setStored(STORAGE_KEYS.NOTICES, parsed.data.notices);
      if (parsed.data.fees) setStored(STORAGE_KEYS.FEES, parsed.data.fees);
      return true;
    } catch (e) {
      return false;
    }
  },
  resetToFactoryDefaults(): void {
    if (typeof window === 'undefined') return;
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  }
};

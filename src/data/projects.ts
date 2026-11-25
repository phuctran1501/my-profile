export type ProjectId = 'newshub' | 'ctu' | 'smarthire' | 'nimdora';

export interface ProjectCaseStudy {
  id: ProjectId;
  index: string;
  name: string;
  stack: string;
  repo: string;
  vi: {
    metric: string;
    meta: string;
    overview: string;
    highlights: string[];
    flow: string;
  };
  en: {
    metric: string;
    meta: string;
    overview: string;
    highlights: string[];
    flow: string;
  };
}

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'newshub',
    index: '01',
    name: 'NEWSHUB',
    stack: 'C# · ASP.NET CORE · REACT · TYPESCRIPT · POSTGRESQL · GEMINI 1.5 PRO',
    repo: 'https://github.com/phuctran1501/NewsHub',
    vi: {
      metric: 'GEMINI AI · <350MS',
      meta: 'BẢN VẼ 01 · HỆ THỐNG GEMINI AI',
      overview:
        'Nền tảng tổng hợp tin tức thông minh chống quá tải thông tin số bằng quy trình thu thập tự động, trích xuất thực thể và gọi Google Gemini API để tóm tắt 3 ý chính trong 10 giây.',
      highlights: [
        'Clean Architecture: Tách biệt rõ Domain, Application, Infrastructure và Web API layers.',
        'Pipeline AI chống quá tải: Rate-limiting, retry exponential backoff và fallback tự động.',
        'Stateless JWT Authentication kết hợp Role-Based Access Control (RBAC).',
        'Compound indexes trên Supabase PostgreSQL cho truy vấn phân trang dưới 50ms.',
      ],
      flow: 'CLIENT SPA ➔ TOKEN BUCKET LIMITER ➔ MEDIATR CQRS ➔ GEMINI STREAMING ➔ POSTGRESQL GIN',
    },
    en: {
      metric: 'GEMINI AI · <350MS',
      meta: 'BLUEPRINT 01 · GEMINI AI PIPELINE',
      overview:
        'AI-powered news aggregator mitigating information overload with automated article ingestion, entity extraction, and 10-second 3-bullet Gemini TL;DR synthesis.',
      highlights: [
        'Clean Architecture: Strict decoupling across Domain, Application, Infrastructure, and Web API.',
        'Resilient AI Pipeline: Token-bucket rate limiting, exponential backoff, and graceful degradation.',
        'Stateless JWT Authentication paired with Role-Based Access Control (RBAC).',
        'Compound indexes on Supabase PostgreSQL delivering sub-50ms paginated queries.',
      ],
      flow: 'CLIENT SPA ➔ TOKEN BUCKET LIMITER ➔ MEDIATR CQRS ➔ GEMINI STREAMING ➔ POSTGRESQL GIN',
    },
  },
  {
    id: 'ctu',
    index: '02',
    name: 'CTU-SCHEDULER',
    stack: 'C# · .NET DESKTOP · CSP BACKTRACKING · MRV HEURISTIC',
    repo: 'https://github.com/phuctran1501/CTU-Scheduler',
    vi: {
      metric: 'GIẢI CSP · 100+ SINH VIÊN',
      meta: 'BẢN VẼ 02 · 100+ SINH VIÊN CTU',
      overview:
        'Giải quyết triệt để tình trạng trùng lịch học và hết chỗ lớp đăng ký học phần cho hơn 100 sinh viên Đại học Cần Thơ bằng thuật toán tự động ghép thời khóa biểu không xung đột.',
      highlights: [
        'Thuật toán thỏa mãn ràng buộc (CSP): Duyệt hoán vị nhóm học phần kết hợp cắt tỉa MRV & Forward Checking.',
        'Đồng bộ sĩ số thực: Phân tích dữ liệu lớp học thời gian thực, cảnh báo các nhóm đã đầy.',
        'Trực quan hóa lưới thời khóa biểu hàng tuần và xuất lịch chỉ với 1 lần nhấp.',
      ],
      flow: 'DANH SÁCH MÔN ➔ CHỌN BIẾN MRV ➔ CẮT TỈA FORWARD CHECKING ➔ LỊCH KHÔNG TRÙNG',
    },
    en: {
      metric: 'CSP ENGINE · 100+ USERS',
      meta: 'BLUEPRINT 02 · 100+ CTU STUDENTS',
      overview:
        'Eliminates course registration clashes and full-section surprises for 100+ Can Tho University students by computing conflict-free schedule permutations in milliseconds.',
      highlights: [
        'Constraint Satisfaction Solver: Evaluates class permutations with MRV heuristic & Forward Checking pruning.',
        'Real-Time Seat Verification: Parses live enrollment quotas to flag saturated sections early.',
        'Weekly timetable grid visualization with 1-click schedule export.',
      ],
      flow: 'COURSE VARIABLES ➔ MRV SELECTION ➔ FORWARD CHECK PRUNING ➔ ZERO-CONFLICT TIMETABLE',
    },
  },
  {
    id: 'smarthire',
    index: '03',
    name: 'SMARTHIRE',
    stack: 'ASP.NET CORE · TYPESCRIPT · NLP TOKENIZER · POSTGRESQL',
    repo: 'https://github.com/phuctran1501/SmartHire',
    vi: {
      metric: 'CHẤM ĐIỂM ATS · ASP.NET',
      meta: 'BẢN VẼ 03 · ĐỒ ÁN KỸ THUẬT PHẦN MỀM CTU',
      overview:
        'Dự án chuyên ngành Kỹ thuật Phần mềm tại Đại học Cần Thơ (SE-Project-CTU), tự động hóa quy trình sàng lọc hồ sơ ứng viên và chấm điểm độ tương thích CV theo chuẩn ATS.',
      highlights: [
        'Bộ trích xuất thực thể: Phân tích kỹ năng, số năm kinh nghiệm và học vấn từ CV ứng viên.',
        'Chấm điểm trọng số: Tính toán độ tương quan đa chiều giữa năng lực ứng viên và Job Description.',
        'Luồng nghiệp vụ tách biệt cho Nhà tuyển dụng và Ứng viên.',
      ],
      flow: 'NỘP CV ➔ TÁCH TỪ KHÓA KỸ NĂNG ➔ SO KHỚP MA TRẬN TRỌNG SỐ ➔ XẾP HẠNG ATS',
    },
    en: {
      metric: 'ATS SCORING · ASP.NET',
      meta: 'BLUEPRINT 03 · SE PROJECT CTU',
      overview:
        'Software Engineering capstone project at Can Tho University (SE-Project-CTU), automating applicant triage and scoring resume compatibility against ATS job criteria.',
      highlights: [
        'Entity Extraction Engine: Tokenizes skills, experience years, and academic credentials from CVs.',
        'Deterministic Scoring: Computes multidimensional correlation weights against Job Descriptions.',
        'Dedicated workflows for both Talent Acquisition teams and Candidates.',
      ],
      flow: 'CV UPLOAD ➔ SKILL TOKENIZER ➔ WEIGHT MATRIX MATCHING ➔ RANKED CANDIDATE SHORTLIST',
    },
  },
  {
    id: 'nimdora',
    index: '04',
    name: 'NIMDORA',
    stack: 'TYPESCRIPT · COMBINATORIAL GAME THEORY · BITWISE XOR',
    repo: 'https://github.com/phuctran1501/Nimdora',
    vi: {
      metric: 'BOUTON XOR · GAME AI',
      meta: 'BẢN VẼ 04 · AI LÝ THUYẾT TRÒ CHƠI',
      overview:
        'Trò chơi chiến thuật toán học mô phỏng bài toán NIM kinh điển. Cài đặt thuật toán giải trạng thái tối ưu P-position và N-position dựa trên Định lý Bouton và phép toán XOR Nim-sum.',
      highlights: [
        'Định lý Bouton: Tính tổng Nim-sum qua các đống bằng phép toán XOR nhị phân (P1 ⊕ P2 ⊕ P3).',
        'Phân loại P/N-position: Nim-sum = 0 là trạng thái thua ép buộc; khác 0 luôn tồn tại nước đi thắng.',
        'Logic TypeScript thuần khiết với độ chính xác toán học 100%.',
      ],
      flow: 'VECTOR ĐỐNG SỎI ➔ PHÉP TOÁN XOR (⊕) ➔ ĐÁNH GIÁ N-POSITION ➔ NƯỚC ĐI TỐI ƯU',
    },
    en: {
      metric: 'BOUTON XOR · GAME AI',
      meta: 'BLUEPRINT 04 · MATHEMATICAL GAME AI',
      overview:
        'Desktop strategy engine modeling the mathematical game of NIM. Implements Bouton Theorem bitwise XOR arithmetic to compute provably optimal P-position and N-position moves.',
      highlights: [
        'Bouton Theorem Evaluator: Computes binary Nim-sum across piles via XOR (P1 ⊕ P2 ⊕ P3).',
        'Deterministic Strategy: Zero Nim-sum isolates P-position traps; non-zero selects exact reduction.',
        'Strict TypeScript game core with zero external math dependencies.',
      ],
      flow: 'PILE VECTOR ➔ BITWISE XOR (⊕) ➔ N-POSITION EVALUATION ➔ OPTIMAL REDUCTION',
    },
  },
];

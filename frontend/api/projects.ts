import type { VercelRequest, VercelResponse } from '@vercel/node';

export const projects = [
  {
    id: '1',
    title: '경쟁사 스마트폰 카메라 UI/UX 기능 벤치마크 리서치',
    company: '삼성전자',
    logo: '/logos/samsung.svg',
    description: '애플, 구글 등 주요 경쟁사 플래그십 스마트폰의 카메라 앱 UI와 신기능을 캡처하고 엑셀로 비교 분석하는 리서치 업무입니다.',
    requirements: [
      '스마트폰 및 IT 기기에 대한 높은 관심',
      '꼼꼼한 엑셀 문서 작성 능력',
      '타사 UI 화면 캡처 및 주관적 장단점 코멘트 작성'
    ],
    duration: '1주',
    fee: '월 구독 (9,900원)',
    capacity: 5,
    currentApplicants: 3,
    category: '리서치/UX'
  },
  {
    id: '2',
    title: '글로벌 B2B 마케팅용 콜드 이메일 초안 작성 지원',
    company: '삼성전자',
    logo: '/logos/samsung.svg',
    description: '해외 B2B 파트너사에게 발송할 제품 소개 콜드 이메일의 초안(Draft) 5종을 다양한 톤앤매너로 작성해보는 과제입니다.',
    requirements: [
      '비즈니스 영어 작문 능력',
      '해외 B2B 세일즈 트렌드 이해',
      '영문 이메일 템플릿 5종 제출'
    ],
    duration: '2주',
    fee: '월 구독 (9,900원)',
    capacity: 3,
    currentApplicants: 3,
    category: '마케팅/세일즈'
  },
  {
    id: '3',
    title: '신입사원 온보딩 매뉴얼 오탈자 검수 및 포맷팅',
    company: 'SK텔레콤',
    logo: '/logos/sktelecom.jpg',
    description: '기존에 텍스트로만 작성된 50페이지 분량의 신입사원 가이드북의 오탈자를 교정하고, 노션(Notion)으로 보기 좋게 옮기는 작업입니다.',
    requirements: [
      '뛰어난 맞춤법 및 교정 능력',
      '노션(Notion) 활용 능력',
      '가독성을 고려한 문서 구조화 역량'
    ],
    duration: '1주',
    fee: '월 구독 (9,900원)',
    capacity: 2,
    currentApplicants: 1,
    category: '인사/HR지원'
  },
  {
    id: '4',
    title: 'Z세대 타겟 신규 요금제 네이밍 아이디에이션',
    company: 'SK텔레콤',
    logo: '/logos/sktelecom.jpg',
    description: '1020 세대를 타겟으로 하는 데이터 무제한 요금제의 톡톡 튀는 네이밍 후보 20개를 제안하고 각각의 의미를 설명합니다.',
    requirements: [
      '최신 밈(Meme)과 1020 트렌드 이해',
      '창의적인 카피라이팅 능력',
      '아이디어 제안서(1장 분량) 제출'
    ],
    duration: '1주',
    fee: '월 구독 (9,900원)',
    capacity: 10,
    currentApplicants: 7,
    category: '기획/마케팅'
  },
  {
    id: '5',
    title: '네이버 스마트스토어 리뷰 데이터 감성 분석 라벨링',
    company: '네이버',
    logo: '/logos/naver.jpg',
    description: 'AI 모델 학습을 위해 제공되는 500건의 텍스트 리뷰 데이터를 읽고 긍정/부정/중립 및 주요 키워드로 태깅(Tagging)하는 작업입니다.',
    requirements: [
      '단순 반복 업무에 대한 끈기와 꼼꼼함',
      '문맥을 정확히 파악하는 문해력',
      '구글 스프레드시트를 이용한 라벨링'
    ],
    duration: '2주',
    fee: '월 구독 (9,900원)',
    capacity: 20,
    currentApplicants: 15,
    category: '데이터/AI학습'
  },
  {
    id: '6',
    title: '클립(Clip) 숏폼 콘텐츠 썸네일 A/B 테스트 기획',
    company: '네이버',
    logo: '/logos/naver.jpg',
    description: '특정 숏폼 영상에 대해 클릭률(CTR)을 높일 수 있는 썸네일 이미지 후보 2종을 기획하고 어떤 이미지가 더 반응이 좋을지 가설을 세웁니다.',
    requirements: [
      '유튜브/숏폼 콘텐츠 소비 트렌드 파악',
      '간단한 이미지 편집 또는 기획안(스케치) 작성 능력',
      'A/B 테스트 가설 리포트'
    ],
    duration: '1주',
    fee: '월 구독 (9,900원)',
    capacity: 4,
    currentApplicants: 2,
    category: '콘텐츠/기획'
  },
  {
    id: '7',
    title: '카카오톡 이모티콘 스토어 유저 리뷰 동향 리서치',
    company: '카카오',
    logo: '/logos/kakao.png',
    description: '온라인 커뮤니티와 앱스토어에서 카카오 이모티콘 플러스 구독 서비스에 대한 유저들의 불만사항 50건을 수집하고 분류합니다.',
    requirements: [
      '웹 크롤링 또는 데스크 리서치 능력',
      'VoC(Voice of Customer) 분류 및 요약',
      '인사이트를 도출한 요약 보고서'
    ],
    duration: '1주',
    fee: '월 구독 (9,900원)',
    capacity: 3,
    currentApplicants: 3,
    category: '서비스 기획'
  },
  {
    id: '8',
    title: '오픈소스 라이선스 현황 조사 및 스프레드시트 정리',
    company: '카카오',
    logo: '/logos/kakao.png',
    description: '개발팀이 사용 중인 30개의 오픈소스 라이브러리 목록을 바탕으로, 각 라이브러리의 라이선스 종류(MIT, GPL 등)를 검색해 표로 정리합니다.',
    requirements: [
      '개발 지식은 없어도 무관, 정확한 검색 능력 필요',
      '꼼꼼한 엑셀 데이터 취합',
      '정해진 양식에 맞춘 엑셀 파일 제출'
    ],
    duration: '1주',
    fee: '월 구독 (9,900원)',
    capacity: 2,
    currentApplicants: 0,
    category: '개발/지원'
  },
  {
    id: '9',
    title: '토스 앱 내 금융 용어(Jargon) 쉬운 우리말 순화 리스트업',
    company: '토스뱅크',
    logo: '/logos/tossbank.png',
    description: '앱 내에 사용되는 어려운 금융 용어(예: 여신, 수신, 거치식) 20개를 찾고, 타겟 유저(10대~시니어)가 이해하기 쉬운 직관적인 단어로 변경 제안합니다.',
    requirements: [
      'UX 라이팅 및 카피라이팅에 대한 관심',
      '사용자 중심의 사고방식',
      '용어 변경 전/후 제안서 제출'
    ],
    duration: '2주',
    fee: '월 구독 (9,900원)',
    capacity: 5,
    currentApplicants: 4,
    category: 'UX라이팅'
  },
  {
    id: '10',
    title: '인터넷 전문은행 해외 진출 사례 데스크 리서치',
    company: '토스뱅크',
    logo: '/logos/tossbank.png',
    description: '영국의 Monzo, Revolut 등 해외 성공적인 인터넷 뱅크들의 동남아시아 진출 실패/성공 사례 기사들을 찾아 핵심만 요약합니다.',
    requirements: [
      '영어 기사 독해 및 리서치 역량',
      '비즈니스 관점의 요약 능력',
      '리서치 요약 워드 문서 3장'
    ],
    duration: '2주',
    fee: '월 구독 (9,900원)',
    capacity: 3,
    currentApplicants: 1,
    category: '사업전략'
  },
  {
    id: '11',
    title: '햇반 글로벌 틱톡 캠페인 레퍼런스 수집',
    company: 'CJ제일제당',
    logo: '/logos/cj.png',
    description: '해외 식품 브랜드들이 틱톡(TikTok)에서 진행한 성공적인 바이럴 챌린지 영상 링크 30개를 수집하고 공통된 흥행 요소를 분석합니다.',
    requirements: [
      '틱톡 및 숏폼 플랫폼에 대한 높은 이해',
      '콘텐츠 바이럴 요소 분석 능력',
      '레퍼런스 링크 모음 및 분석 코멘트'
    ],
    duration: '1주',
    fee: '월 구독 (9,900원)',
    capacity: 4,
    currentApplicants: 4,
    category: '콘텐츠/마케팅'
  },
  {
    id: '12',
    title: '성수동 팝업스토어 주변 유동인구 및 핫플레이스 지도 맵핑',
    company: 'CJ제일제당',
    logo: '/logos/cj.png',
    description: '신규 팝업스토어 입점 검토를 위해 성수동 메인 거리의 주요 카페/식당 20곳을 구글 맵스에 마커로 표시하고 짧은 코멘트를 남깁니다.',
    requirements: [
      '오프라인 공간 트렌드에 대한 관심',
      '지도 앱 활용 능력',
      '구글 내 지도(My Maps) 링크 제출'
    ],
    duration: '1주',
    fee: '월 구독 (9,900원)',
    capacity: 2,
    currentApplicants: 1,
    category: '리테일/기획'
  },
  {
    id: '13',
    title: '쿠팡이츠 배달 파트너 모집용 인스타그램 광고 이미지 기획',
    company: '쿠팡',
    logo: '/logos/coupang.png',
    description: '대학생, 직장인 투잡족을 타겟으로 한 배달 파트너 모집 SNS 광고 배너의 문구와 들어갈 이미지 스케치를 3장 기획합니다.',
    requirements: [
      '타겟 고객층에 맞는 후킹(Hooking) 카피 작성',
      '디자인 툴 사용 못해도 무관 (손그림, PPT 스케치 가능)',
      '광고 소재 기획안 제출'
    ],
    duration: '1주',
    fee: '월 구독 (9,900원)',
    capacity: 6,
    currentApplicants: 2,
    category: '마케팅/디자인'
  },
  {
    id: '14',
    title: '수도권 캠프(물류센터) 주변 교통 통제 구역 리서치',
    company: '쿠팡',
    logo: '/logos/coupang.png',
    description: '배송 지연 방지를 위해 공공데이터를 활용, 수도권 주요 도로의 장기 공사 및 통제 구역 리스트를 찾아 엑셀로 취합하는 지원 업무입니다.',
    requirements: [
      '공공데이터 및 뉴스 기사 검색 능력',
      '빠르고 정확한 정보 수집과 엑셀 정리',
      '교통 통제 구역 정리 엑셀 파일'
    ],
    duration: '1주',
    fee: '월 구독 (9,900원)',
    capacity: 3,
    currentApplicants: 0,
    category: '운영/물류지원'
  }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json(projects);
}

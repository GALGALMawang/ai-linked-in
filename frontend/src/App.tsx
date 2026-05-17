import { useState, useEffect } from 'react';
import './App.css';

interface Project {
  id: string;
  title: string;
  company: string;
  logo: string;
  description: string;
  requirements: string[];
  duration: string;
  fee: string;
  capacity: number;
  currentApplicants: number;
  category: string;
}

const getMentorInfo = (company: string, category: string) => {
  const names = ['김지윤', '박현우', '이서연', '최민준', '정우진', '강하늘', '조수아', '윤도현'];
  const titles: Record<string, string> = {
    '마케팅/PR': '시니어 마케터',
    '사업전략': '전략기획 매니저',
    '인사/HR': 'HR BP',
    '데이터': '데이터 분석가',
    '데이터 기획': '데이터 기획자',
    '디자인/UX': '리드 프로덕트 디자이너',
    '영업/기획': '엔터프라이즈 세일즈 리드',
    '운영/기획': '프로덕트 오퍼레이션 매니저',
    '데이터/물류': 'SCM 데이터 사이언티스트',
    '경영지원': '경영지원 프로',
    '마케팅/리서치': '글로벌 리서처',
    '구매/소싱': '글로벌 소싱 매니저',
    '운영/지원': 'CX 운영 리드',
    '서비스 기획': '리드 PM',
  };
  
  const hash = company.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const name = names[hash % names.length];
  const title = titles[category] || '시니어 매니저';
  
  return { name, title };
};

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai' | 'mentor', content: string, mentorInfo?: {name: string, title: string}}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const [currentView, setCurrentView] = useState<'explore' | 'portfolio'>('explore');

  useEffect(() => {
    const API_BASE = import.meta.env.DEV ? 'http://localhost:3001' : '';
    fetch(`${API_BASE}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Failed to fetch projects:', err));
  }, []);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    const mentor = getMentorInfo(project.company, project.category);
    setChatMessages([
      { role: 'mentor', content: `안녕하세요! ${project.company} ${mentor.title} ${mentor.name}입니다. 이번 실무 과제의 사수로 여러분의 성장을 도울 예정입니다. 잘 부탁드립니다!`, mentorInfo: mentor },
      { role: 'ai', content: `안녕하세요, 팀 워크스페이스 보조를 맡은 AI 어시스턴트입니다. 자료 조사나 1차 초안 피드백은 저에게 먼저 요청해주시면 실시간으로 도와드리겠습니다.` }
    ]);
  };

  const handleNavClick = (view: 'explore' | 'portfolio') => {
    setCurrentView(view);
    setSelectedProject(null);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedProject) return;

    const newMessages: {role: 'user'|'ai'|'mentor', content: string, mentorInfo?: {name: string, title: string}}[] = [...chatMessages, { role: 'user', content: chatInput }];
    setChatMessages(newMessages);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const API_BASE = import.meta.env.DEV ? 'http://localhost:3001' : '';
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          projectId: selectedProject.id, 
          messages: newMessages 
        }),
      });
      const data = await response.json();
      
      if (data.response) {
        setChatMessages([...newMessages, { role: 'ai', content: data.response }]);
      } else {
        setChatMessages([...newMessages, { role: 'ai', content: "응답을 받아오는데 문제가 발생했습니다." }]);
      }
    } catch (error) {
      console.error('Chat API Error:', error);
      setChatMessages([...newMessages, { role: 'ai', content: "서버와 연결할 수 없습니다." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo" onClick={() => handleNavClick('explore')}>
            <span className="logo-cursor" />
            첫<span className="logo-accent">줄</span>
          </div>
          <div className="nav-links">
            <span className={`nav-item ${currentView === 'explore' ? 'active' : ''}`} onClick={() => handleNavClick('explore')}>실무 인턴십 탐색</span>
            <span className={`nav-item ${currentView === 'portfolio' ? 'active' : ''}`} onClick={() => handleNavClick('portfolio')}>포트폴리오</span>
            <span className="divider">|</span>
            <span className="nav-item" onClick={() => alert('B2B 기업용 도입 문의 페이지는 준비 중입니다.')}>도입 문의</span>
            <button className="login-btn" onClick={() => setIsLoginModalOpen(true)}>로그인</button>
          </div>        </div>
      </nav>

      <main className="main-content">
        {currentView === 'portfolio' ? (
          <div className="portfolio-view fade-in">
            <div className="portfolio-hero">
              <div className="container">
                <div className="profile-header">
                  <div className="profile-avatar">K</div>
                  <div className="profile-info">
                    <h1>김철수 님의 실무 포트폴리오</h1>
                    <p className="profile-target">희망 직무: 서비스 기획 / UX 리서치</p>
                  </div>
                  <div className="profile-stats">
                    <div className="stat-box">
                      <span className="stat-label">수료한 프로젝트</span>
                      <strong className="stat-value">2건</strong>
                    </div>
                    <div className="stat-box">
                      <span className="stat-label">실무 종합 평가 점수</span>
                      <strong className="stat-value highlight">92점</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="portfolio-layout">
                <div className="portfolio-main">
                  <section className="portfolio-section">
                    <h2>수료한 프로젝트 이력</h2>
                    <div className="history-list">
                      <div className="history-item">
                        <div className="history-header">
                          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <img src="/logos/naver.jpg" alt="Naver" style={{width: '24px', height: '24px', borderRadius: '4px', objectFit: 'contain', backgroundColor: '#fff', border: '1px solid #e5e5e5'}} />
                            <span className="company-name">네이버</span>
                          </div>
                          <span className="history-date">2023. 10. (2주)</span>
                        </div>
                        <h3>커머스 플랫폼 검색 로직 개선 데이터 분석</h3>
                        <p className="history-desc">실제 검색 이탈 데이터를 바탕으로 퍼널 분석을 진행하고, 구매 전환율을 높이기 위한 UX/검색 로직 개선안을 도출했습니다.</p>
                        <div className="history-ai-review">
                          <h4>실무진 멘토의 최종 평가 (95/100)</h4>
                          <p>"데이터를 해석하는 논리적 흐름이 매우 우수하며, 문제 정의부터 해결 방안 제시까지 실무진 수준의 기획서를 작성했습니다."</p>
                        </div>
                      </div>
                      
                      <div className="history-item">
                        <div className="history-header">
                          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <img src="/logos/tossbank.png" alt="Toss" style={{width: '24px', height: '24px', borderRadius: '4px', objectFit: 'contain', backgroundColor: '#fff', border: '1px solid #e5e5e5'}} />
                            <span className="company-name">토스뱅크</span>
                          </div>
                          <span className="history-date">2023. 09. (1주)</span>
                        </div>
                        <h3>토스 앱 내 금융 용어(Jargon) 쉬운 우리말 순화 리스트업</h3>
                        <p className="history-desc">앱 내 사용되는 어려운 금융 용어를 발굴하고, 사용자 리서치를 통해 10대부터 시니어까지 이해하기 쉬운 직관적인 UX 라이팅으로 개편을 제안했습니다.</p>
                        <div className="history-ai-review">
                          <h4>실무진 멘토의 최종 평가 (89/100)</h4>
                          <p>"사용자 중심적인 사고방식이 돋보입니다. 다만 제안한 용어가 법적/컴플라이언스 이슈에 위배되지 않는지에 대한 추가 검토가 포함되었다면 더 좋았을 것입니다."</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
                
                <aside className="portfolio-sidebar">
                  <div className="sidebar-card">
                    <h3>검증된 보유 스킬</h3>
                    <p className="sidebar-desc">수료한 프로젝트를 기반으로 실무진이 인증한 역량입니다.</p>
                    <div className="skill-tags">
                      <span className="skill-tag verified">✓ 데이터 퍼널 분석</span>
                      <span className="skill-tag verified">✓ UX 라이팅</span>
                      <span className="skill-tag verified">✓ 문제 해결 논리력</span>
                      <span className="skill-tag verified">✓ 엑셀 활용 능통</span>
                      <span className="skill-tag verified">✓ 사용자 리서치</span>
                    </div>
                  </div>
                  
                  <div className="sidebar-card export-card">
                    <h3>포트폴리오 내보내기</h3>
                    <p className="sidebar-desc">기업 지원 시 제출할 수 있도록 이력서 포맷으로 다운로드합니다.</p>
                    <button className="primary-btn" onClick={() => alert('PDF 다운로드 기능은 준비 중입니다.')}>PDF 파일로 저장하기</button>
                    <button className="outline-btn" style={{marginTop: '12px'}} onClick={() => alert('링크 복사 완료!')}>공유 링크 복사</button>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        ) : !selectedProject ? (
          <>
            <div className="hero-section">
              <div className="container">
                <h1>사이드 프로젝트 인턴십 플랫폼</h1>
                <p>대기업 현업 담당자가 직접 올린 핵심 실무 과제를 해결하세요.<br/>현업의 피드백을 받으며 가장 빠르고 확실하게 직무 포트폴리오를 완성할 수 있습니다.</p>
              </div>
            </div>

            <div className="container">
              <section className="project-list-section">
                <div className="section-header">
                  <h2>모집 중인 실무 팀</h2>
                  <span className="project-count">{projects.length}</span>
                </div>
                
                <div className="list-layout">
                  {projects.map((project) => (
                    <div key={project.id} className="list-item" onClick={() => handleProjectSelect(project)}>
                      <div className="item-company">
                        <div className="company-logo-box">
                          <img 
                            src={project.logo} 
                            alt={`${project.company} logo`} 
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                              (e.target as HTMLImageElement).parentElement!.innerText = project.company.substring(0, 1);
                            }}
                          />
                        </div>
                        <span className="company-name">{project.company}</span>
                      </div>
                      
                      <div className="item-core">
                        <h3 className="item-title">{project.title}</h3>
                        <div className="item-tags">
                          <span className="tag">{project.category}</span>
                          <span className="tag">{project.duration}</span>
                          <span className={`tag ${project.currentApplicants >= project.capacity ? 'full' : ''}`}>
                            팀 현황: {project.currentApplicants}/{project.capacity}명
                          </span>
                        </div>
                      </div>
                      
                      <div className="item-action">
                        <button className="apply-btn">상세 보기</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        ) : (
          <section className="project-detail-view fade-in">
            <div className="detail-view-container">
              <div className="detail-layout-wrapper">
                
                {/* Left Sidebar: Info & Progress */}
                <aside className="detail-left-sidebar">
                  <button className="back-btn" onClick={() => setSelectedProject(null)} style={{textAlign: 'left'}}>
                    ← 목록으로 돌아가기
                  </button>

                  <div className="sidebar-card">
                    <h3>담당 사수 정보</h3>
                    <div className="mentor-profile" style={{ marginTop: '16px', marginBottom: '24px', padding: '16px', background: '#F8F9FA', borderRadius: '8px', border: '1px solid #E5E5E5' }}>
                      <strong style={{ display: 'block', fontSize: '16px', color: '#111111', marginBottom: '4px' }}>{getMentorInfo(selectedProject.company, selectedProject.category).name} 멘토</strong>
                      <span style={{ fontSize: '14px', color: '#666666' }}>{selectedProject.company} {getMentorInfo(selectedProject.company, selectedProject.category).title}</span>
                    </div>

                    <h3>실무 진행 정보</h3>
                    <div className="info-row">
                      <span className="info-label">직무 카테고리</span>
                      <span className="info-value">{selectedProject.category}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">소요 기간</span>
                      <span className="info-value">{selectedProject.duration}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">팀 구성 현황</span>
                      <span className="info-value">{selectedProject.currentApplicants} / {selectedProject.capacity} 명</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">월 구독(교육비)</span>
                      <span className="info-value highlight">{selectedProject.fee}</span>
                    </div>
                    <button className={`primary-btn mt-4 ${isSubscribed ? 'subscribed' : ''}`} style={{marginTop: '20px'}} onClick={() => { if(!isSubscribed) setIsPaymentModalOpen(true); }}>
                      {isSubscribed ? '구독 중 (진행 가능)' : '구독하고 인턴십 시작하기'}
                    </button>
                  </div>
                </aside>

                {/* Center: Main Content */}
                <main className="detail-main-content">
                  <div className="detail-header-block">
                    <p className="detail-company">{selectedProject.company}</p>
                    <h2 className="detail-title">{selectedProject.title}</h2>
                  </div>

                  <div className="content-section ai-briefing">
                    <h3 style={{ borderBottom: 'none', paddingBottom: 0 }}>실무 과제 브리핑 및 온보딩 플랜</h3>
                    <p style={{ marginTop: '12px' }}><strong>업무 분석:</strong> 본 프로젝트는 {selectedProject.company}의 {selectedProject.category} 실무를 직접 경험하는 과정입니다. {selectedProject.description}</p>
                    <p><strong>권장 역할 배분:</strong> 자료 조사 40%, 데이터 요약 30%, 기획안 작성 30%의 비중으로 업무가 진행됩니다.</p>
                  </div>

                  <div className="content-section schedule-section">
                    <h3>인턴십 마일스톤 및 교육 커리큘럼</h3>
                    <div className="timeline">
                      <div className="timeline-item active">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <strong>[Step 1] 사전 교육 및 팀 롤(Role) 배분 (D-3)</strong>
                          <span>사수 멘토가 배정하는 필수 기초 지식(해당 산업 동향, 툴 활용법)을 학습하고 팀원들과 역할을 나눕니다.</span>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <strong>[Step 2] 현업 담당자 킥오프 미팅 (D-Day)</strong>
                          <span>{selectedProject.company} 실무 담당자와 화상 미팅을 통해 구체적인 과제 목표와 기대 수준(R&R)을 조율합니다.</span>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <strong>[Step 3] 과제 수행 및 무제한 피드백 (진행 중)</strong>
                          <span>우측 실무 멘토 채팅창을 통해 궁금한 점을 질문하고, 작성한 초안의 피드백을 실시간으로 받습니다.</span>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <strong>[Step 4] 실무진 오피스 아워 (중간 점검)</strong>
                          <span>현업 담당자와의 중간 점검 미팅을 통해 실무 관점의 날카로운 피드백을 수령하고 방향성을 수정합니다.</span>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <strong>[Step 5] 최종 보고 및 수료</strong>
                          <span>최종 결과물을 산출하고 평가받습니다. 인증된 포트폴리오 데이터는 향후 채용 연계 시 검증 자료로 활용됩니다.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>

                {/* Right: Workspace Chat */}
                <aside className="detail-right-workspace">
                  <div className="chat-widget">
                    <div className="chat-header">
                      <h4>팀 워크스페이스</h4>
                      <span className="online-badge">온라인</span>
                    </div>
                    <div className="chat-messages">
                      {chatMessages.map((msg, index) => (
                        <div key={index} className={`chat-bubble-wrapper ${msg.role}`}>
                          {msg.role === 'mentor' && (
                            <div className="chat-avatar" style={{background: '#3366FF', color: 'white'}}>{msg.mentorInfo?.name.substring(1) || '사수'}</div>
                          )}
                          {msg.role === 'ai' && (
                            <div className="chat-avatar">AI</div>
                          )}
                          <div className={`chat-bubble ${msg.role}`}>
                            {msg.role === 'mentor' && <div style={{fontSize: '12px', fontWeight: 'bold', marginBottom: '4px'}}>{msg.mentorInfo?.name} 멘토</div>}
                            {msg.role === 'ai' && <div style={{fontSize: '12px', fontWeight: 'bold', marginBottom: '4px'}}>AI 어시스턴트</div>}
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      {isChatLoading && (
                        <div className="chat-bubble-wrapper ai">
                          <div className="chat-avatar">AI</div>
                          <div className="chat-bubble ai typing">입력 중...</div>
                        </div>
                      )}
                    </div>
                    <div className="chat-input-container" onClick={() => { if (!isSubscribed) setIsPaymentModalOpen(true); }}>
                      <form className="chat-input-form" onSubmit={handleChatSubmit} style={{ pointerEvents: isSubscribed ? 'auto' : 'none' }}>
                        <input
                          type="text"
                          placeholder={isSubscribed ? "질문이나 초안 링크를 남겨주세요." : "구독 후 멘토링을 시작해보세요."}
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          disabled={isChatLoading}
                          readOnly={!isSubscribed}
                        />
                        <button type="submit" disabled={isChatLoading || chatInput.trim() === '' || !isSubscribed}>전송</button>
                      </form>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="modal-overlay" onClick={() => setIsLoginModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsLoginModalOpen(false)}>✕</button>
            <h2 className="modal-title">로그인 및 회원가입</h2>
            <p className="modal-desc">첫줄에 오신 것을 환영합니다.</p>
            <div className="mock-input-group">
              <input type="email" className="modal-input" placeholder="이메일 주소" />
              <input type="password" className="modal-input" placeholder="비밀번호" />
            </div>
            <button className="primary-btn modal-btn" onClick={() => setIsLoginModalOpen(false)}>이메일로 계속하기</button>
            <div className="modal-divider"><span>또는</span></div>
            <button className="outline-btn social-btn" onClick={() => setIsLoginModalOpen(false)}>카카오로 3초 만에 시작하기</button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="modal-overlay" onClick={() => setIsPaymentModalOpen(false)}>
          <div className="modal-content payment-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsPaymentModalOpen(false)}>✕</button>
            <h2 className="modal-title">인턴십 멤버십 구독</h2>
            <p className="modal-desc">월 9,900원으로 대기업 실무 과제와 현업 사수의 무제한 멘토링을 경험하세요.</p>
            
            <div className="payment-plan-card">
              <div className="plan-header">
                <h4>Basic Plan</h4>
                <div className="price">₩9,900<span>/월</span></div>
              </div>
              <ul className="plan-features">
                <li><span className="check">✓</span> 현업 실무 과제 무제한 열람 및 지원</li>
                <li><span className="check">✓</span> 담당 멘토 무제한 피드백 및 코칭</li>
                <li><span className="check">✓</span> 프로젝트 수료증 및 포트폴리오 인증</li>
              </ul>
            </div>

            <button className="primary-btn modal-btn" onClick={() => {
              setIsSubscribed(true);
              setIsPaymentModalOpen(false);
              alert('구독이 완료되었습니다. 이제 워크스페이스를 자유롭게 이용해보세요!');
            }}>결제하고 시작하기</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;

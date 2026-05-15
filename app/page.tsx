import { ContactForm } from "./contact-form";

const integrations = [
  "Slack",
  "GitHub",
  "GitLab",
  "Jira",
  "Linear",
  "Confluence",
];

const capabilities = [
  {
    title: "코드베이스 질의응답",
    copy: [
      "로직 위치, 변경 영향,",
      "배포 전 검토 파일을 슬랙에서 바로 확인합니다.",
    ],
  },
  {
    title: "레포지토리 분석",
    copy: [
      "실제 커밋 이력으로 오너십과 의존성 병목,",
      "오래된 모듈과 장애 위험 서비스를 파악합니다.",
    ],
  },
  {
    title: "슬랙 워크플로우",
    copy: [
      "반복되는 엔지니어링 질문을",
      "채널 기반 프롬프트, 요약, 승인 기록으로 전환합니다.",
    ],
  },
  {
    title: "AX 의사결정 레이어",
    copy: [
      "코드 인텔리전스를 적절한 의사결정자에게",
      "직관적인 우선순위로 정리하여 제공합니다.",
    ],
  },
];

const workflow = [
  {
    step: "01",
    title: "Read-only 소스 연결",
    copy: [
      "레포지토리, 이슈, 문서, 슬랙 접근 범위를",
      "워크스페이스와 팀 단위로 제한합니다.",
    ],
  },
  {
    step: "02",
    title: "권한 인지 그래프 구축",
    copy: ["코드, 권한, 릴리스 히스토리,", "내부 문서를 인덱싱합니다."],
  },
  {
    step: "03",
    title: "슬랙 에이전트 배포",
    copy: [
      "팀은 기존 채널에서 질문하고,",
      "신뢰도 있는 답변을 출처와 함께 제공 받습니다.",
    ],
  },
  {
    step: "04",
    title: "검토 후 확장",
    copy: [
      "실사용 지표를 바탕으로 다음 커넥터,",
      "자동화 흐름과 AX 기회를 확장합니다.",
    ],
  },
];

const securityItems = [
  "읽기 전용 레포지토리 설치",
  "권한을 반영한 검색과 채널 범위 지정",
  "프롬프트, 답변, 출처에 대한 감사 기록",
  "엔터프라이즈 환경을 위한 전용 배포 옵션",
];

const demoThreads = [
  {
    label: "질문",
    text: ["결제 마이그레이션의 영향을 받는", "서비스는 뭐지?"],
  },
  {
    label: "Reliever",
    text: [
      "invoice-api, plans-worker, ledger-sync",
      "3개 서비스가 영향 범위입니다.",
      "가장 큰 위험은 /billing/rates의 공통 세금 로직입니다.",
    ],
  },
  {
    label: "액션",
    text: [
      "리뷰 체크리스트를 열고 오너를 지정한 뒤,",
      "릴리스 노트 초안을 게시합니다.",
    ],
  },
];

function TextLines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line) => (
        <span className="text-line" key={line}>
          {line}
        </span>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header" aria-label="주요 내비게이션">
        <a className="brand" href="#top" aria-label="Reliever 홈">
          <img
            className="brand-logo"
            src="/onlyLogo.png"
            alt=""
            aria-hidden="true"
            width="1254"
            height="1254"
          />
          <span>Reliever</span>
        </a>
        <nav className="nav-links" aria-label="기본 메뉴">
          <a href="#platform">플랫폼</a>
          <a href="#security">보안</a>
          <a href="#deployment">배포 방식</a>
        </nav>
        <a className="header-cta" href="#contact">
          데모 문의
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div
          className="hero-visual"
          aria-label="Reliever 슬랙 에이전트 제품 미리보기"
        >
          <div className="console-shell">
            <div className="console-topbar">
              <span />
              <span />
              <span />
              <strong># Reliever AI</strong>
            </div>
            <div className="thread-list">
              {demoThreads.map((thread) => (
                <div className="thread" key={thread.label}>
                  <span>{thread.label}</span>
                  <p>
                    <TextLines lines={thread.text} />
                  </p>
                </div>
              ))}
            </div>
            <div className="insight-row">
              <div>
                <span>신뢰도</span>
                <strong>99%</strong>
              </div>
              <div>
                <span>출처</span>
                <strong>14</strong>
              </div>
              <div>
                <span>오너</span>
                <strong>5</strong>
              </div>
            </div>
          </div>
          <div className="repo-panel">
            <span>레포지토리 그래프</span>
            <div className="graph-line wide" />
            <div className="graph-line medium" />
            <div className="graph-line short" />
            <div className="graph-metrics">
              <strong>217</strong>
              <small>인덱싱된 문서</small>
            </div>
          </div>
        </div>

        <div className="hero-content">
          <p className="eyebrow">엔지니어링 조직을 위한 AX</p>
          <h1>
            <TextLines
              lines={["코드베이스를 이해하는", "슬랙 기반 인텔리전스."]}
            />
          </h1>
          <p className="hero-copy">
            <TextLines
              lines={[
                "Reliever는 고객사의 레포지토리, 엔지니어링 도구,",
                "내부 문맥을 이해하는 안전한 에이전트를 제공합니다.",
              ]}
            />
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#contact">
              데모 문의
            </a>
            <a className="secondary-button" href="#deployment">
              배포 방식 보기
            </a>
          </div>
          <div className="hero-proof" aria-label="핵심 제품 근거">
            <span>Read-Only 에이전트</span>
            <span>권한 기반 답변 제공</span>
            <span>B2B 파일럿에 최적화</span>
          </div>
        </div>
      </section>

      <section className="asset-showcase" aria-label="Reliever 제품 시각 자료">
        <img
          src="/agent-preview.png"
          alt="레포지토리 그래프 맥락과 함께 코드베이스 질문에 답하는 Reliever 슬랙 에이전트"
        />
        <div>
          <p className="eyebrow">신뢰할 수 있는 실용적인 답변</p>
          <h2>
            <TextLines
              lines={[
                "답변은 출처가 있고 범위가 명확하며,",
                "바로 실행 가능해야 합니다.",
              ]}
            />
          </h2>
          <p>
            <TextLines
              lines={[
                "레포지토리 기반 슬랙 답변,",
                "출처, 권한 맥락을 중심으로 구성되어",
                "사내 협업 과정 중 병목을 혁신적으로 제거합니다.",
              ]}
            />
          </p>
        </div>
      </section>

      <section className="section intro-section" id="platform">
        <div className="section-heading">
          <p className="eyebrow">Reliever를 선택하는 이유</p>
          <h2>
            <TextLines
              lines={[
                "죽어있는 문서와 코드베이스를",
                "운영 인사이트로 바꿉니다.",
              ]}
            />
          </h2>
        </div>
        <div className="intro-copy">
          <p>
            <TextLines
              lines={[
                "회사 내부에서의 효율적인 협업은",
                "흩어진 코드, 티켓, 문서, 암묵지를 한 데 모으는 것에서 시작합니다.",
                "Reliever는 이 소스들을 안전한 슬랙 인터페이스로 전환해",
                "고객사 팀이 새로운 도구를 배우지 않고도",
                "더 효과적인 작업을 할 수 있게 돕습니다.",
              ]}
            />
          </p>
        </div>
      </section>

      <section className="section capability-grid" aria-label="주요 기능">
        {capabilities.map((capability) => (
          <article className="capability-card" key={capability.title}>
            <h3>{capability.title}</h3>
            <p>
              <TextLines lines={capability.copy} />
            </p>
          </article>
        ))}
      </section>

      <section className="section workflow-section">
        <div className="section-heading">
          <p className="eyebrow">Reliever 에이전트 도입 절차</p>
          <h2>
            <TextLines
              lines={["안전한 접근부터 슬랙 답변까지", "4단계로 진행합니다."]}
            />
          </h2>
        </div>
        <div className="workflow-list">
          {workflow.map((item) => (
            <article className="workflow-item" key={item.step}>
              <span>{item.step}</span>
              <div>
                <h3>{item.title}</h3>
                <p>
                  <TextLines lines={item.copy} />
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="security-band" id="security">
        <div>
          <p className="eyebrow">권한 기반 에이전트</p>
          <h2>
            <TextLines
              lines={["허용된 범위 내에서만 작동하는", "믿을 수 있는 에이전트"]}
            />
          </h2>
          <p>
            <TextLines
              lines={[
                "Reliever는 에이전트 워크플로우 도입 과정에 있어",
                "신뢰도를 최우선으로 하는 B2B 팀을 위해 포지셔닝됩니다.",
                "설치 범위, 명확한 출처, 검토 가능한 감사 기록을",
                "에이전트 설계의 중심에 둡니다.",
              ]}
            />
          </p>
        </div>
        <ul>
          {securityItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section deployment-section" id="deployment">
        <div className="section-heading">
          <p className="eyebrow">에이전트 도입 진행 과정</p>
          <h2>
            <TextLines
              lines={[
                "파일럿에서 엔터프라이즈 확장까지,",
                "확장성 있는 에이전트 워크플로우",
              ]}
            />
          </h2>
        </div>
        <div className="deployment-grid">
          <article>
            <span>1주차</span>
            <h3>진단</h3>
            <p>
              <TextLines
                lines={[
                  "대상 레포와 슬랙 채널을 분석하고",
                  "성공 지표를 정의합니다.",
                ]}
              />
            </p>
          </article>
          <article>
            <span>2-3주차</span>
            <h3>파일럿</h3>
            <p>
              <TextLines
                lines={[
                  "선별된 프롬프트와 피드백 루프로",
                  "핵심 엔지니어링 팀에 배포합니다.",
                ]}
              />
            </p>
          </article>
          <article>
            <span>4주차 이후</span>
            <h3>확장</h3>
            <p>
              <TextLines
                lines={[
                  "커넥터를 확장하고",
                  "보다 넓은 영역에서 효과적인 협업을 돕습니다.",
                ]}
              />
            </p>
          </article>
        </div>
      </section>

      <section className="section questions-section">
        <div className="question-panel">
          <span>매끄러운 소통</span>
          <p>
            <TextLines
              lines={["이번 스프린트에서 인증 영역은 무엇이 바뀌었어?"]}
            />
          </p>
          <p>
            <TextLines lines={["체크아웃 리스크의 담당 팀은 어디였지?"]} />
          </p>
          <p>
            <TextLines lines={["이 PR을 장애 대응 채널용으로 요약해 줘."]} />
          </p>
          <p>
            <TextLines
              lines={["서비스 간 중복 로직을 찾아서 출처를 리스트업해줘."]}
            />
          </p>
        </div>
        <div className="question-copy">
          <p className="eyebrow">익숙한 슬랙 인터페이스</p>
          <h2>
            <TextLines
              lines={[
                "팀 리드에게 질문하듯,",
                "손쉽고 지연없는 코드베이스 분석",
              ]}
            />
          </h2>
          <p>
            <TextLines
              lines={[
                "Reliever는 엔지니어링 의사결정이 이미 일어나는 곳에 에이전트를 둡니다.",
                "답변에는 출처 파일, 관련 티켓, 예상 오너, 추천 후속 작업이 포함되어",
                "각 응답이 바로 업무로 이어질 수 있습니다.",
              ]}
            />
          </p>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="contact-copy">
          <p className="eyebrow">AX 팀을 위한 Reliever</p>
          <h2>
            <TextLines
              lines={[
                "팀에 필요한 자동화 업무를",
                "슬랙 기반 파일럿으로 설계합니다.",
              ]}
            />
          </h2>
          <p>
            <TextLines
              lines={[
                "업종과 팀 규모, 반복되는 업무를 알려주시면",
                "Reliever 팀이 도입 가능성과 파일럿 범위를 검토해 연락드립니다.",
              ]}
            />
          </p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}

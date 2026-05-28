'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import styles from './summary.module.css';

// 텍스트 타이핑 효과 및 테스트 편의를 위한 사전 정의된 회의 데이터셋
const SAMPLE_MEETINGS = [
  {
    title: "신제품 런칭 온·오프라인 마케팅 전략 회의",
    transcript: "김팀장: 다음 달 신제품 출시를 앞두고 온오프라인 마케팅 계획을 확정해야 합니다.\n이대리: 온라인은 인스타그램 릴스와 틱톡 챌린지를 위주로 MZ 세대를 공략하는 것이 효과적일 것 같습니다. 인플루언서 협찬 예산으로 500만 원 정도 책정했습니다.\n박과장: 오프라인은 강남역 부근에 3일간 팝업스토어를 여는 방안이 어떨까요? 현장에서 제품 체험과 굿즈 증정을 하면 바이럴 효과가 엄청날 것입니다.\n김팀장: 좋습니다. 온라인 예산 500만 원 승인합니다. 강남역 팝업스토어는 박과장님이 대관 비용 및 일정을 파악해서 이번 주 금요일까지 공유해 주세요. 릴스 기획안은 이대리님이 목요일까지 작성해서 피드백 받는 걸로 하죠.",
    summary: {
      overview: "다음 달 출시될 신제품의 온·오프라인 마케팅 채널 믹스 및 예산을 확정하고 담당자별 실행 과제를 부여하기 위해 진행된 전략 회의입니다.",
      decisions: [
        "MZ 세대 공략을 위한 온라인 숏폼(릴스, 틱톡) 챌린지 마케팅 집행 확정",
        "온라인 인플루언서 협찬 예산 500만 원 최종 승인 및 집행 결정",
        "브랜드 바이럴 극대화를 위한 강남역 인근 오프라인 팝업스토어 3일 운영안 잠정 합의"
      ],
      actionItems: [
        "이대리: 온라인 릴스 마케팅 상세 기획안 작성 및 공유 (기한: 목요일)",
        "박과장: 강남역 인근 팝업스토어 대관 가능 장소, 비용 및 일정 조사 리포트 작성 (기한: 금요일)"
      ]
    }
  },
  {
    title: "개발팀 2분기 인프라 개선 및 스케일링 스프린트 회의",
    transcript: "최CTO: 최근 트래픽 급증으로 인해 간헐적인 데이터베이스 지연이 감지되었습니다. 2분기 우선 과제로 인프라 스케일링을 잡아야겠습니다.\n정시니어: 데이터베이스에 Read Replica(읽기 전용 복제본)를 구성하고 느린 쿼리를 튜닝하면 API 지연 시간이 40% 이상 줄어들 것으로 예상됩니다.\n한주니어: 알림 발송 로직도 동기식에서 RabbitMQ를 활용한 비동기 메시지 큐 방식으로 전환하면 서버 부하를 많이 경감할 수 있을 것 같습니다.\n최CTO: 훌륭한 제안입니다. 4월 말까지 DB 읽기 복제본 구축과 슬로우 쿼리 개선을 완료합시다. 담당은 정시니어님이 맡아주세요. 메시지 큐 알림 아키텍처 조사는 한주니어님이 다음 스프린트 회의 전까지 개념 검증(PoC) 코드를 공유해 주시기 바랍니다.",
    summary: {
      overview: "최근 사용자 트래픽 급증에 따른 데이터베이스 부하 및 서버 지연 문제를 해결하기 위한 기술적 스펙 아웃 및 2분기 개발 스프린트 태스크 분배 회의입니다.",
      decisions: [
        "데이터베이스 병목 해결을 위해 Read Replica(읽기 복제본) 구성 도입 최종 확정",
        "API 반응 속도 및 처리량 개선을 위한 슬로우 쿼리 튜닝 프로세스 돌입",
        "서버 리소스 절약을 위해 알림 시스템 아키텍처를 비동기 메시지 큐(RabbitMQ) 기반으로 전환하기로 합의"
      ],
      actionItems: [
        "정시니어: DB Read Replica 인프라 구축 및 기존 쿼리 튜닝 작업 진행 (기한: 4월 말)",
        "한주니어: RabbitMQ를 활용한 비동기 알림 시스템 PoC 코드 개발 및 테스트 리포트 작성 (기한: 다음 스프린트 회의)"
      ]
    }
  }
];

interface SummaryData {
  overview: string;
  decisions: string[];
  actionItems: string[];
}

export default function SummaryPage() {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [transcript, setTranscript] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryResult, setSummaryResult] = useState<SummaryData | null>(null);
  
  // 모달 및 이메일 발송 관련 상태
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  
  // 브루탈리즘 토스트 메시지 상태
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // 토스트 발생 시 3초 후 자동 소멸
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // 템플릿 불러오기 핸들러
  const handleLoadTemplate = (index: number) => {
    const sample = SAMPLE_MEETINGS[index];
    setMeetingTitle(sample.title);
    setTranscript(sample.transcript);
    setSummaryResult(null); // 새로운 데이터 로딩 시 기존 결과 초기화
    
    setToast({
      type: 'success',
      message: `'${sample.title.slice(0, 10)}...' 템플릿 로드 완료!`
    });
  };

  // AI 요약 시뮬레이션 핸들러
  const handleSummarize = (e: FormEvent) => {
    e.preventDefault();
    if (!meetingTitle.trim() || !transcript.trim()) {
      setToast({
        type: 'error',
        message: '회의 제목과 텍스트 내용을 모두 입력해 주세요!'
      });
      return;
    }

    setIsSummarizing(true);
    setSummaryResult(null);

    // AI 가 가동되는 느낌의 1.8초 가상 딜레이 부여
    setTimeout(() => {
      // 입력된 데이터가 샘플 데이터셋 중 하나와 겹치면 그 실제 요약본을 쓰고, 아니면 일반 요약본 생성
      const matchedSample = SAMPLE_MEETINGS.find(
        s => s.title === meetingTitle || transcript.includes(s.transcript.slice(0, 30))
      );

      if (matchedSample) {
        setSummaryResult(matchedSample.summary);
      } else {
        // 커스텀 입력 시 가상 AI 요약본 생성
        setSummaryResult({
          overview: `입력해 주신 '${meetingTitle}'에 대한 회의 내용 분석 결과입니다. 작성된 발화 목록을 토대로 주요 쟁점과 할 일을 요약했습니다.`,
          decisions: [
            "회의 안건에 대한 구성원 간 브레인스토밍 및 다양한 마일스톤 설계 검토 완료",
            "회의 진행 상황의 투명한 모니터링을 위한 통합 자동화 솔루션 활용 추진",
            "다음 회의 전까지 부서별 우선순위 핵심 태스크 재정비 합의"
          ],
          actionItems: [
            "담당자: 회의 피드백 결과 바탕으로 구체적인 실행 마케팅 기획안 수립 (기한: 차주 월요일)",
            "개발자: 현재 지연이 예상되는 기능들의 병목 요소를 최소화하기 위한 사전 테스트 실행 (기한: 금요일)"
          ]
        });
      }
      setIsSummarizing(false);
      setToast({
        type: 'success',
        message: '⚡ AI 회의록 분석 및 요약 완료!'
      });
    }, 1800);
  };

  // 이메일 전송 API 연동 핸들러
  const handleSendEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!shareEmail || !shareEmail.includes('@')) {
      setToast({
        type: 'error',
        message: '유효한 이메일 주소를 입력해 주세요.'
      });
      return;
    }

    if (!summaryResult) return;

    setIsSendingEmail(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: shareEmail,
          subject: `[AI 요약본 공유] ${meetingTitle} 회의 리포트 ⚡`,
          meetingTitle: meetingTitle,
          summary: summaryResult
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsShareModalOpen(false);
        setShareEmail('');
        setToast({
          type: 'success',
          message: '발송 완료!'
        });
      } else {
        setToast({
          type: 'error',
          message: result.error || '이메일 발송에 실패했습니다.'
        });
      }
    } catch (err) {
      console.error('Email send request failed:', err);
      setToast({
        type: 'error',
        message: '네트워크 연결 오류 또는 API 요청 장애가 발생했습니다.'
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleReset = () => {
    setMeetingTitle('');
    setTranscript('');
    setSummaryResult(null);
    setToast({
      type: 'success',
      message: '분석 내용이 초기화되었습니다.'
    });
  };

  return (
    <main className={styles.main}>
      {/* Giant Background Typography */}
      <div className={styles.giantBgText}>REPORTING<br/>ENGINE</div>

      {/* Toast Notification */}
      {toast && (
        <div 
          className={styles.toast}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 10000,
            backgroundColor: toast.type === 'success' ? 'var(--neon-green)' : 'var(--neon-yellow)',
            color: 'var(--pure-black)',
            border: '4px solid var(--pure-black)',
            boxShadow: '6px 6px 0px #000000',
            padding: '20px 30px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            fontFamily: "'Courier New', Courier, monospace",
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transform: 'rotate(-1deg)',
            animation: `${styles.slideIn} 0.3s ease-out`
          }}
        >
          {toast.type === 'success' ? '🎉' : '⚠️'} {toast.message}
        </div>
      )}

      <div className={styles.container}>
        {/* Back navigation */}
        <Link href="/" className={styles.backBtn}>
          ← 홈으로 가기!
        </Link>

        <h1 className={styles.title}>AI MEETING SUMMARY PLAYGROUND</h1>

        {/* Input Playground Section */}
        {!summaryResult ? (
          <div className={styles.card}>
            <div className={styles.cardTitle}>회의록 입력기</div>
            
            {/* Quick Templates Loader */}
            <div className={styles.templateGroup}>
              <div className={styles.templateLabel}>💡 빠른 테스트용 샘플 프리셋 로드하기:</div>
              <button 
                type="button" 
                className={styles.templateBtn} 
                onClick={() => handleLoadTemplate(0)}
                disabled={isSummarizing}
              >
                📢 마케팅 런칭 전략 회의
              </button>
              <button 
                type="button" 
                className={styles.templateBtn} 
                onClick={() => handleLoadTemplate(1)}
                disabled={isSummarizing}
              >
                💻 개발팀 DB 인프라 회의
              </button>
            </div>

            <form onSubmit={handleSummarize}>
              <label className={styles.label}>회의 제목</label>
              <input 
                type="text" 
                placeholder="예: 마케팅 전략 수립 회의, 주간 개발 스프린트..." 
                className={styles.input} 
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                disabled={isSummarizing}
                required
              />

              <label className={styles.label}>회의 대화 내용 / 트랜스크립트 입력</label>
              <textarea 
                placeholder="회의 시간에 나누었던 발화자명과 구체적인 대화 스크립트를 입력해 주세요! AI가 요약해 드립니다." 
                className={styles.textarea} 
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                disabled={isSummarizing}
                required
              />

              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={isSummarizing}
              >
                {isSummarizing ? (
                  <>
                    <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</span>
                    AI가 회의록을 분석하는 중...
                  </>
                ) : 'AI 요약하기! ⚡'}
              </button>
            </form>
          </div>
        ) : (
          /* Summary Result View Section */
          <div>
            <h2 className={styles.resultTitle}>AI SUMMARY COMPLETED!</h2>
            
            <div className={styles.resultCard}>
              <div className={styles.resultTitleBadge}>📝 {meetingTitle} 회의록 분석 리포트</div>
              
              {/* 1. Overview */}
              <div className={styles.resultSection}>
                <h3 className={`${styles.sectionHeading} ${styles.pink}`}>📋 회의 개요</h3>
                <p className={styles.overviewText}>{summaryResult.overview}</p>
              </div>

              {/* 2. Decisions */}
              <div className={styles.resultSection}>
                <h3 className={`${styles.sectionHeading} ${styles.purple}`}>🎯 주요 결정 사항</h3>
                <ul className={styles.list}>
                  {summaryResult.decisions.map((decision, i) => (
                    <li key={i} className={styles.listItem}>
                      <span className={styles.bullet}>▶</span>
                      {decision}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. Action Items */}
              <div className={styles.resultSection}>
                <h3 className={styles.sectionHeading}>⚡ 후속 실행 과제 (Action Items)</h3>
                <ul className={styles.list}>
                  {summaryResult.actionItems.map((item, i) => (
                    <li key={i} className={styles.listItem}>
                      <span className={styles.todoBadge}>TODO</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Sharing Actions */}
            <div className={styles.actionBtnGroup}>
              <button 
                type="button" 
                className={styles.shareBtn} 
                onClick={() => setIsShareModalOpen(true)}
              >
                이메일로 공유 ✉️
              </button>
              
              <button 
                type="button" 
                className={styles.resetBtn} 
                onClick={handleReset}
              >
                다시 쓰기 🔄
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Share Email Input Modal */}
      {isShareModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button 
              className={styles.modalCloseBtn} 
              onClick={() => setIsShareModalOpen(false)}
              disabled={isSendingEmail}
            >
              X
            </button>
            <h2 className={styles.modalTitle}>이메일로 공유</h2>
            <p style={{
              color: 'var(--pure-white)',
              fontWeight: 'bold',
              marginBottom: '20px',
              fontFamily: "'Courier New', Courier, monospace",
              textShadow: '1.5px 1.5px 0 #000'
            }}>
              요약된 회의록 리포트를 받아볼 이메일 주소를 입력하세요!
            </p>

            <form onSubmit={handleSendEmail}>
              <input 
                type="email" 
                placeholder="받는 사람의 이메일 입력" 
                className={styles.modalInput} 
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                disabled={isSendingEmail}
                required
              />
              <button 
                type="submit" 
                className={styles.modalSubmitBtn} 
                disabled={isSendingEmail}
              >
                {isSendingEmail ? '발송 중...' : '이메일 발송!'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Spin animation injection inside standard client rendering */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}

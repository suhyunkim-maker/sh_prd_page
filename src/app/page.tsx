'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className={styles.main}>
      {/* Giant Background Typography */}
      <div className={styles.giantBgText}>AUTOMATE<br/>EVERYTHING</div>

      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.sticker}>NEW!</div>
          <h1 className={styles.heroTitle}>
            팀장이 챙기던 업무,<br />이제 자동으로!
          </h1>
          <p className={styles.heroSubtitle}>
            리마인드와 진척도 확인, 시스템에 맡기세요.
          </p>
          <div>
            <button className={styles.ctaBtn} onClick={openModal}>무료 체험 시작하기!</button>
          </div>
          
          <div className={styles.heroImageWrap}>
            <div className={styles.heroImageMockup}>
              UI DASHBOARD MOCKUP
            </div>
          </div>
        </div>
      </section>

      {/* 2. Problem Empathy Section */}
      <section className={styles.problem}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>매일 반복되는 피로!</h2>
          <div className={styles.problemCards}>
            <div className={styles.card}>
              <div className={styles.sticker}>PROBLEM 1</div>
              <div className={styles.cardIcon}>😫</div>
              <h3 className={styles.cardTitle}>"어떻게 됐나요?"</h3>
              <p className={styles.cardDesc}>끊임없이 팀원들에게 진척도를 물어보는 소모적인 커뮤니케이션</p>
            </div>
            <div className={styles.card}>
              <div className={styles.sticker}>PROBLEM 2</div>
              <div className={styles.cardIcon}>🚨</div>
              <h3 className={styles.cardTitle}>"아, 잊고 있었네요"</h3>
              <p className={styles.cardDesc}>바쁜 팀원들의 업무 누락을 막기 위해 마감일을 체크하는 스트레스</p>
            </div>
            <div className={styles.card}>
              <div className={styles.sticker}>PROBLEM 3</div>
              <div className={styles.cardIcon}>🕵️</div>
              <h3 className={styles.cardTitle}>"담당자가 누구죠?"</h3>
              <p className={styles.cardDesc}>업무 히스토리가 흩어져 있어 책임 소재를 파악하기 어려움</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>알아서 굴러가는 마법!</h2>

          <div className={styles.featureRow}>
            <div className={styles.featureText}>
              <div className={styles.sticker}>FEATURE 1</div>
              <h3>리마인드 자동화</h3>
              <p>마감일이 다가오면 봇이 알아서 알림을 전송합니다. 팀장이 독촉할 필요가 없습니다!</p>
            </div>
            <div className={styles.featureImage}>
              REMIND BOT
            </div>
          </div>

          <div className={styles.featureRow}>
            <div className={styles.featureText}>
              <div className={styles.sticker}>FEATURE 2</div>
              <h3>진행 추적 대시보드</h3>
              <p>모든 업무 진행 상황이 한눈에 보이는 실시간 대시보드. 누가 뭘 하는지 직관적으로 파악!</p>
            </div>
            <div className={styles.featureImage}>
              KANBAN UI
            </div>
          </div>

          <div className={styles.featureRow}>
            <div className={styles.featureText}>
              <div className={styles.sticker}>FEATURE 3</div>
              <h3>스마트 누락 방지</h3>
              <p>지연 중이거나 누락 위험이 있는 업무를 시스템이 감지해 팀장에게만 리포트!</p>
            </div>
            <div className={styles.featureImage}>
              SMART ALERTS
            </div>
          </div>
        </div>
      </section>

      {/* 4. How it Works Section */}
      <section className={styles.howItWorks}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>다양한 흐름에 완벽 적용!</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h3>주간 회의</h3>
              <p>회의 전 팀원 주간 리포트 자동 취합!</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h3>콘텐츠 발행</h3>
              <p>기획-제작 단계가 넘어가면 담당자 자동 Ping!</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h3>월말 정산</h3>
              <p>제출 기한 알림부터 자동 독촉까지!</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing Section */}
      <section className={styles.pricing}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>합리적인 요금제!</h2>
          <div className={styles.pricingCards}>
            <div className={styles.pricingCard}>
              <h3 className={styles.priceTitle}>FREE</h3>
              <div className={styles.priceAmount}>₩0</div>
              <ul className={styles.priceFeatures}>
                <li>✅ 모든 기능 제한 없음</li>
                <li>✅ 무제한 팀원 초대</li>
              </ul>
              <button className={styles.ctaBtn} style={{background: 'var(--pure-white)'}} onClick={openModal}>START NOW</button>
            </div>
            
            <div className={styles.pricingCard}>
              <div className={styles.popularBadge}>HOT!</div>
              <h3 className={styles.priceTitle}>PRO</h3>
              <div className={styles.priceAmount}>₩15K</div>
              <ul className={styles.priceFeatures}>
                <li>✅ 강력한 워크플로우</li>
                <li>✅ 외부 툴(Slack) 연동</li>
              </ul>
              <button className={styles.ctaBtn} onClick={openModal}>GET PRO</button>
            </div>

            <div className={styles.pricingCard}>
              <h3 className={styles.priceTitle}>TEAM</h3>
              <div className={styles.priceAmount}>₩25K</div>
              <ul className={styles.priceFeatures}>
                <li>✅ 다수 부서 통합 관리</li>
                <li>✅ 고급 보안 제어</li>
              </ul>
              <button className={styles.ctaBtn} style={{background: 'var(--pure-white)'}} onClick={openModal}>CONTACT US</button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.modalCloseBtn} onClick={closeModal}>X</button>
            <h2 className={styles.modalTitle}>무료 체험 시작!</h2>
            <input type="email" placeholder="이메일을 입력하세요!" className={styles.modalInput} />
            <button className={styles.modalSubmitBtn} onClick={() => {
              alert('신청되었습니다! 팝아트 감성을 느껴보세요!');
              closeModal();
            }}>신청하기!</button>
          </div>
        </div>
      )}
    </main>
  );
}

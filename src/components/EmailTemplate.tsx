import * as React from 'react';

interface EmailTemplateProps {
  email: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
}) => (
  <div style={{
    fontFamily: "'Arial Black', 'Impact', -apple-system, BlinkMacSystemFont, sans-serif",
    backgroundColor: '#fffb00', // Neon Yellow
    padding: '40px 20px',
    color: '#000000',
    minHeight: '100%',
  }}>
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#ffffff',
      border: '6px solid #000000',
      boxShadow: '10px 10px 0px 0px #000000',
      padding: '40px',
      boxSizing: 'border-box',
    }}>
      {/* Header section */}
      <div style={{
        backgroundColor: '#ff00ff', // Neon Pink
        color: '#ffffff',
        padding: '15px',
        border: '4px solid #000000',
        textAlign: 'center',
        marginBottom: '30px',
      }}>
        <h1 style={{ margin: 0, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '-1px' }}>
          AUTOMATE EVERYTHING!
        </h1>
      </div>

      <h2 style={{ fontSize: '22px', marginBottom: '20px', textTransform: 'uppercase', borderBottom: '4px solid #000000', paddingBottom: '10px' }}>
        무료 체험 신청이 완료되었습니다! ⚡
      </h2>

      <p style={{ fontSize: '15px', lineHeight: '1.5', marginBottom: '20px', fontFamily: 'sans-serif', fontWeight: 'bold' }}>
        안녕하세요! {email}님,
      </p>

      <p style={{ fontSize: '15px', lineHeight: '1.5', marginBottom: '20px', fontFamily: 'sans-serif' }}>
        팀장이 직접 일일이 챙겨야 했던 업무 진척도 확인, 마감 리마인드, 누락 체크 등을 시스템이 알아서 자동으로 관리해 주는 <strong>Automate Everything</strong> 무료 체험 신청이 성공적으로 접수되었습니다.
      </p>

      {/* Info card box */}
      <div style={{
        backgroundColor: '#ccff00', // Neon Green
        border: '4px solid #000000',
        padding: '20px',
        marginBottom: '30px',
      }}>
        <h3 style={{ margin: '0 0 10px 0', textTransform: 'uppercase', fontSize: '16px' }}>
          🎁 무료 체험 제공 혜택
        </h3>
        <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none', fontFamily: 'sans-serif', fontSize: '14px', lineHeight: '1.6', fontWeight: 'bold' }}>
          <li style={{ marginBottom: '8px' }}>✅ 모든 워크플로우 기능 제한 없이 전면 오픈</li>
          <li style={{ marginBottom: '8px' }}>✅ 초대 팀원 수 제한 없는 무제한 연동</li>
          <li>✅ 실시간 지연 누락 감지 대시보드 무료 제공</li>
        </ul>
      </div>

      {/* Action button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <a href="https://sh-prd-page.vercel.app" target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block',
          backgroundColor: '#9d00ff', // Neon Purple
          color: '#ffffff',
          padding: '15px 30px',
          border: '4px solid #000000',
          boxShadow: '4px 4px 0px 0px #000000',
          fontWeight: 'bold',
          fontSize: '18px',
          textTransform: 'uppercase',
          textDecoration: 'none',
        }}>
          체험하러 바로가기!
        </a>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '40px',
        borderTop: '4px solid #000000',
        paddingTop: '20px',
        fontSize: '12px',
        color: '#666666',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        lineHeight: '1.5',
      }}>
        본 메일은 발신 전용이므로 회신이 불가능합니다. 문의사항이 있으시면 고객지원팀으로 문의해 주시기 바랍니다.
        <br />
        © 2026 Automate Everything. All rights reserved.
      </div>
    </div>
  </div>
);

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend SDK 초기화
const resend = new Resend(process.env.RESEND_API_KEY);

// 브라우저로 직접 URL 접속(GET) 시 친절하게 작동 안내 제공
export async function GET() {
  return NextResponse.json({
    status: 'active',
    message: '이메일 발송 API 엔드포인트가 활성화 상태입니다. 회의록 요약 이메일 공유를 위해 POST 메서드로 데이터를 보내주세요! ⚡',
    supportMethod: 'POST only',
    payloadStructure: {
      to: 'string (수신인 이메일)',
      meetingTitle: 'string (회의 제목)',
      subject: 'string (선택사항, 메일 제목)',
      summary: {
        overview: 'string (개요)',
        decisions: 'string[] (결정사항 목록)',
        actionItems: 'string[] (할 일 목록)'
      }
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, meetingTitle, summary } = body;

    // 데이터 필수 검증
    if (!to || !meetingTitle || !summary) {
      return NextResponse.json(
        { error: '이메일 수신인(to), 회의 제목(meetingTitle), 요약본(summary)은 필수 입력 사항입니다.' },
        { status: 400 }
      );
    }

    const { overview = '', decisions = [], actionItems = [] } = summary;

    // 회의 제목을 포함한 최종 메일 제목 구성
    const finalSubject = subject || `[회의록] ${meetingTitle}`;

    // 가독성 높고 세련된 브루탈리즘 테이블 스타일 HTML 본문 생성 (이메일 뷰어 호환성 고려)
    const emailHtmlContent = `
      <div style="background-color: #fffb00; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; color: #000000; min-height: 100%;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 6px solid #000000; box-shadow: 10px 10px 0px 0px #000000; box-sizing: border-box;">
          <!-- Header -->
          <tr>
            <td style="background-color: #ff00ff; padding: 25px 20px; border-bottom: 6px solid #000000; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 900; text-transform: uppercase; color: #ffffff; letter-spacing: -1px; text-shadow: 2px 2px 0px #000000; font-family: 'Impact', 'Arial Black', sans-serif;">
                AI MEETING SUMMARY
              </h1>
            </td>
          </tr>
          
          <!-- Body Container -->
          <tr>
            <td style="padding: 40px 30px; background-color: #ffffff;">
              <!-- Meeting Title Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; background-color: #ccff00; border: 4px solid #000000; box-shadow: 4px 4px 0px 0px #000000;">
                <tr>
                  <td style="padding: 20px;">
                    <span style="display: inline-block; background-color: #000000; color: #ffffff; padding: 4px 10px; font-size: 11px; font-weight: 900; text-transform: uppercase; margin-bottom: 10px; border: 2px solid #000000; letter-spacing: 0.5px;">
                      MEETING TITLE
                    </span>
                    <h2 style="margin: 0; font-size: 22px; font-weight: 900; color: #000000; line-height: 1.3;">
                      ${meetingTitle}
                    </h2>
                  </td>
                </tr>
              </table>

              <!-- Overview Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; background-color: #ffffff; border: 4px solid #000000; box-shadow: 4px 4px 0px 0px #000000;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 900; text-transform: uppercase; border-bottom: 3px solid #000000; padding-bottom: 8px; color: #000000;">
                      📋 회의 개요
                    </h3>
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #333333; font-weight: 600;">
                      ${overview}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Decisions Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; background-color: #ffffff; border: 4px solid #000000; box-shadow: 4px 4px 0px 0px #000000;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 900; text-transform: uppercase; border-bottom: 3px solid #000000; padding-bottom: 8px; color: #9d00ff;">
                      🎯 주요 결정 사항
                    </h3>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      ${
                        decisions.length > 0
                          ? decisions.map((decision: string) => `
                            <tr>
                              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; font-size: 14px; font-weight: bold; line-height: 1.5; color: #000000;">
                                <span style="color: #ff00ff; font-weight: 900; margin-right: 8px;">▶</span> ${decision}
                              </td>
                            </tr>
                          `).join('')
                          : `<tr><td style="padding: 10px 0; font-size: 14px; color: #888888;">결정된 사항이 없습니다.</td></tr>`
                      }
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Action Items Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 10px; background-color: #ffffff; border: 4px solid #000000; box-shadow: 4px 4px 0px 0px #000000;">
                <tr>
                  <td style="padding: 20px;">
                    <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 900; text-transform: uppercase; border-bottom: 3px solid #000000; padding-bottom: 8px; color: #ff00ff;">
                      ⚡ 후속 실행 과제 (Action Items)
                    </h3>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      ${
                        actionItems.length > 0
                          ? actionItems.map((item: string) => `
                            <tr>
                              <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee; font-size: 14px; font-weight: bold; line-height: 1.5; color: #000000;">
                                <span style="display: inline-block; background-color: #ccff00; color: #000000; border: 2px solid #000000; padding: 2px 6px; font-size: 10px; font-weight: 900; margin-right: 8px; text-transform: uppercase;">TODO</span>
                                ${item}
                              </td>
                            </tr>
                          `).join('')
                          : `<tr><td style="padding: 10px 0; font-size: 14px; color: #888888;">지정된 실행 과제가 없습니다.</td></tr>`
                      }
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #000000; color: #ffffff; padding: 25px 20px; text-align: center; font-size: 12px; font-family: monospace; font-weight: bold; border-top: 6px solid #000000;">
              AUTOMATE EVERYTHING • AI REPORTING SERVICE
              <br/>
              <span style="color: #888888; font-size: 10px; display: block; margin-top: 5px; font-family: sans-serif; font-weight: normal;">
                본 메일은 AI 회의록 요약 공유 기능을 통해 발송되었습니다.
              </span>
            </td>
          </tr>
        </table>
      </div>
    `;

    // Resend API를 통해 이메일 발송
    const { data, error } = await resend.emails.send({
      from: 'Automate Everything <onboarding@resend.dev>', // onboarding@resend.dev 가 기본 송신 주소
      to: [to.trim()],
      subject: finalSubject,
      html: emailHtmlContent,
    });

    if (error) {
      console.error('Resend API Error during meeting summary send:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('send-email api route error:', err);
    return NextResponse.json(
      { error: err?.message || '이메일 발송 중 알 수 없는 서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

'use server';

import { Resend } from 'resend';
import { EmailTemplate } from '../components/EmailTemplate';
import * as React from 'react';

// Resend SDK 인스턴스 초기화 (서버 환경 변수에서 API KEY 로드)
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * 사용자에게 웰컴 이메일을 전송하는 서버 액션
 * @param email 수신자 이메일 주소
 */
export async function sendWelcomeEmail(email: string) {
  // 간단한 이메일 유효성 체크
  if (!email || !email.includes('@') || email.length < 5) {
    return { success: false, error: '유효한 이메일 주소를 입력해 주세요.' };
  }

  try {
    const { db } = await import('../lib/firebase');
    const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
    
    // Firestore에 이메일 저장
    await addDoc(collection(db, 'subscribers'), {
      email: email.trim(),
      createdAt: serverTimestamp()
    });
  } catch (dbError) {
    console.error('Firestore Save Error:', dbError);
    // DB 저장에 실패해도 이메일은 계속 전송하도록 하거나 여기서 멈출 수 있습니다.
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Automate Everything <onboarding@resend.dev>', // Resend 도메인 미인증 시 onboarding@resend.dev 고정 사용해야 함
      to: [email.trim()],
      subject: '[Automate Everything] 무료 체험 신청이 완료되었습니다! ⚡',
      react: React.createElement(EmailTemplate, { email: email.trim() }),
    });

    if (error) {
      console.error('Resend API Error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Email Server Action Failure:', err);
    return { success: false, error: err?.message || '이메일 전송 중 알 수 없는 서버 오류가 발생했습니다.' };
  }
}

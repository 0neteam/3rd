// cypress/e2e/full_profile_flow.cy.js

describe('프로필 전체 기능 테스트', () => {
    beforeEach(() => {
      cy.login();
    });
  
    it('프로필 정보 확인', () => {
      cy.contains('내 프로필', { timeout: 10000 }).should('exist');
      cy.contains('이메일:', { timeout: 10000 }).should('exist');
    });
  
    it('댓글 작성 가능', () => {
      // 게시글이 로딩되었는지 먼저 확인
      cy.get('div').contains(/내용|게시글|post/i, { timeout: 10000 }).should('exist');
      cy.get('input[placeholder="댓글 작성"]', { timeout: 10000 }).first().should('exist');
      cy.get('input[placeholder="댓글 작성"]').first().type('테스트 댓글');
      cy.contains('댓글 작성').click();
    });
  
    it('좋아요 누르기', () => {
      // 게시글이 존재할 때만 좋아요 가능
      cy.contains('❤️ 좋아요', { timeout: 10000 }).should('exist');
      cy.contains('❤️ 좋아요').first().click();
    });
  
    it('DM 메시지 전송', () => {
      cy.get('textarea', { timeout: 10000 }).eq(1).should('exist').type('Cypress DM 테스트');
      cy.contains('전송', { timeout: 10000 }).should('exist').click();
    });
  
    it('알림 섹션 확인', () => {
      cy.contains('알림', { timeout: 10000 }).should('exist');
      // 알림 메시지가 하나라도 존재하는지 확인
      cy.get('div').contains(/📢|새 알림/i, { timeout: 10000 }).should('exist');
    });
  });
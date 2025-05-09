// cypress/support/commands.js

Cypress.Commands.add('login', () => {
    cy.request('POST', 'http://localhost:8081/api/auth/login', {
      email: 'ehdrb6782@gmail.com',
      password: 'ehdrb3114##@@' 
    }).then((res) => {
      const token = res.body.token;
  
      // 사용자 정보 요청
      cy.request({
        method: 'GET',
        url: 'http://localhost:8081/api/users/me',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((userRes) => {
        const user = userRes.body;
  
        // React 로딩 전에 토큰과 사용자 정보 저장
        cy.visit('http://localhost:3000/profile', {
          onBeforeLoad(win) {
            win.localStorage.setItem('authToken', token);
            win.localStorage.setItem('user', JSON.stringify(user));
          }
        });
  
        cy.contains('내 프로필', { timeout: 10000 }).should('exist');
        cy.wait(1000); // 🔁 안정성 확보용 대기
      });
    });
  });
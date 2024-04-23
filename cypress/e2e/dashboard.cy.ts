describe('dashboard panels', () => {
    before(() => {
        cy.visit('/');
        cy.acceptTerms();
        cy.wait(4000);
    });

    it('Opens and cloess Accoount Modal', () => {
        cy.modalOpenClose('Show My Account Panel', 'Account');
    });

    it('Opens and closes Downloads Modal', () => {
        cy.modalOpenClose('Show Downloads', 'Downloads');
    });

    it('Opens and closes How to Use it Modal', () => {
        cy.modalOpenClose('How to use it', 'How to use it', 'text');
    });

    it('Opens and closes Summary Statistics', () => {
        cy.findByText('Summary Statistics').should('exist').click();
        cy.get('[data-testid="summary-statistics"]')
            .wait(1000)
            .get('h2')
            .should('have.text', 'Summary Statistics in Current View')
            .get('[aria-label="Close Summary Statistics"]')
            .click();
    });

    it('Logs Rendering Stats', () => {
        cy.window().then(win => {
            console.log((win as any).RenderStats);
        });
    });
});

// {
//     "App": {
//         "base": 66.29999999701977,
//         "actual": 260.50000055134296
//     },
//     "Main": {
//         "base": 48.099999979138374,
//         "actual": 155.70000010728836
//     }
// }

class RouteConfig {
    /**
     * Verifies if the route page is displayed.
     * @param {string} routeName - The expected route name to check against the page title.
     */
    isPageDisplayed(routeName) {
        cy.get('span.title').should('have.text', routeName)
    }

    /**
    * Navigates back to the overview page by clicking the "Back" button.
    */
    backToOverview() {
        cy.get('button[data-testaction="action-back"]').click()
    }

    /**
     * Validates if the displayed route name matches the expected name.
     * @param {string} name - The expected name to validate.
     */
    validateName(name) {
        cy.get('div[data-testid="name-plain-text"]').should('have.text', name)
    }

    /**
     * Validates if the displayed service name matches the expected service name.
     * @param {string} serviceName - The expected service name to validate.
     */
    validateServiceName(serviceName) {
        cy.get('div[data-testid="service-property-value"]').should('have.text', serviceName)
    }

    /**
     * Validates multiple tags by checking if each tag matches the expected value.
     * @param {...string} tags - The expected tags to validate.
     */
    validateTag(...tags) {
        tags.forEach((tag, index) => {
            cy.get('div[data-testid="tags-badge-tag-' + index + '"]').should('have.text', tag)
        });

    }

    /**
     * Validates multiple protocols by checking if each protocol matches the expected value.
     * @param {...string} protocols - The expected protocols to validate.
     */
    validateProtocols(...protocols) {
        protocols.forEach((protocol, index) => {
            cy.get('div[data-testid="protocols-badge-tag-' + index + '"]').should('have.text', protocol)
        });
    }

    /**
     * Validates if the displayed path is the expected path.
     * @param {string} path - The expected path to validate.
     */
    validatePaths(path) {
        cy.get('div[data-testid="paths-copy-uuid-0"]').invoke('text').should('include', path)
    }

    /**
     * Validates if the displayed HTTPS redirect status code matches the expected value.
     * @param {string} statusCode - The expected HTTPS redirect status code to validate.
     */
    validateHttpsRedirectStatusCode(statusCode) {
        cy.get('div[data-testid="https_redirect_status_code-plain-text"]').should('have.text', statusCode)
    }

    /**
     * Validates if the displayed regex priority matches the expected value.
     * @param {string|number} priority - The expected regex priority to validate.
     */
    validateRegexPriority(priority) {
        cy.get('div[data-testid="regex_priority-plain-text"]').should('have.text', priority)
    }

    /**
     * Validates if the displayed strip path setting matches the expected value.
     * @param {string} value - The expected strip path setting to validate.
     */
    validateStripPath(value) {
        cy.get('div[data-testid="strip_path-plain-text"]').should('have.text', value)
    }

    /**
    * Validates if the displayed preserve host setting matches the expected value.
    * @param {string} value - The expected preserve host setting to validate.
    */
    validatePreserveHost(value) {
        cy.get('div[data-testid="preserve_host-plain-text"]').should('have.text', value)
    }

    /**
     * Validates if the displayed request buffering setting matches the expected value.
     * @param {string} value - The expected request buffering setting to validate.
     */
    validateRequestBuffering(value) {
        cy.get('div[data-testid="request_buffering-plain-text"]').should('have.text', value)
    }
    
    /**
     * Validates if the displayed path handling setting matches the expected value.
     * @param {string} value - The expected path handling setting to validate.
     */
    validatePathHandling(value) {
        cy.get('div[data-testid="path_handling-plain-text"]').should('have.text', value)
    }

}

export default RouteConfig
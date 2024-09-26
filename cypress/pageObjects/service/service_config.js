class ServiceConfig {
    /**
     * Back to the Service Overview page by clicking the "Back" button.
     */
    backToOverview() {
        cy.get('button[data-testaction="action-back"]').click()
    }

    /**
     * Validates that the displayed service name matches the expected value.
     * @param {string} serviceName - The expected service name.
     */
    validateName(serviceName) {
        cy.get('div[data-testid="name-plain-text"]').should('have.text', serviceName)
    }

    /**
     * Validates that the displayed service status matches the expected value.
     * @param {string} status - The expected status of the service.
     */
    validateStatus(status) {
        cy.get('div[data-testid="enabled-badge-status"]').should('have.text', status)
    }

    /**
     * Validates that the displayed service protocol matches the expected value.
     * @param {string} protocol - The expected protocol of the service (e.g., "http" or "https").
     */
    validateProtocol(protocol) {
        cy.get('div[data-testid="protocol-plain-text"]').should('have.text', protocol)
    }

    /**
     * Validates that the displayed host matches the expected host name.
     * @param {string} hostName - The expected host name of the service.
     */
    validateHost(hostName) {
        cy.get('div[data-testid="host-property-value"]').should('have.text', hostName)
    }

    /**
     * Validates that the displayed service port matches the expected value.
     * @param {string} port - The expected port number.
     */
    validatePort(port) {
        cy.get('div[data-testid="port-property-value"]').should('have.text', port)
    }

    /**
     * Validates that the displayed service tag matches the expected value.
     * @param {string} tagName - The expected tag associated with the service.
     */
    validateTag(tagName) {
        cy.get('div[data-testid="tags-property-value"]').should('have.text', tagName)
    }

    /**
     * Validates that the displayed retry count matches the expected value.
     * @param {string} retries - The expected number of retries.
     */
    validateRetries(retries) {
        cy.get('div[data-testid="retries-plain-text"]').should('have.text', retries)
    }

    /**
     * Validates that the displayed connection timeout matches the expected value.
     * @param {string} timeout - The expected connection timeout value.
     */
    validateConnectTimeout(timeout) {
        cy.get('div[data-testid="connect_timeout-plain-text"]').should('have.text', timeout)
    }

    /**
    * Validates that the displayed write timeout matches the expected value.
    * @param {string} timeout - The expected write timeout value.
    */
    validateWriteTimeout(timeout) {
        cy.get('div[data-testid="write_timeout-plain-text"]').should('have.text', timeout)
    }

    /**
     * Validates that the displayed read timeout matches the expected value.
     * @param {string} timeout - The expected read timeout value.
     */
    validateReadTimeout(timeout) {
        cy.get('div[data-testid="read_timeout-plain-text"]').should('have.text', timeout)
    }

    /**
     * Validates that the displayed TLS verification setting matches the expected value.
     * @param {string} settings - The expected TLS verification setting.
     */
    validateTslVerify(settings) {
        cy.get('div[data-testid="tls_verify-property-value"]').should('have.text', settings)
    }
    
    /**
     * Switches to the "Routes" section by clicking on the Routes tab.
     */
    switchToRoute() {
        cy.get('div[title="Routes"]').click()
    }

}

export default ServiceConfig
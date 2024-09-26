class ServiceOverview {
    /**
     * Verifies if the Service Overview page is displayed.
     */
    isPageDisplayed() {
        cy.get('.title').should('have.text', 'Gateway Services')
    }

    /**
     * Opens the Service Overview page.
     */
    openPage() {
        cy.visit('/default/services')
        this.isPageDisplayed()
    }

    /**
     * Opens the "New Service" panel by clicking the add button.
     */
    openNewServicePanel() {
        cy.get('a[data-testid="toolbar-add-gateway-service"]').click()
        cy.get('.form-section-title').eq(0).should('have.text', 'General Information')
    }

    /**
     * Opens the service configuration page for the specified service.
     * @param {string} serviceName - The name of the service to open.
     */
    openServiceConfigPage(serviceName) {
        cy.get('tr[data-testid="' + serviceName + '"]').click()
    }

    /**
     * Opens the service editor for the specified service.
     * @param {string} serviceName - The name of the service to edit.
     */
    openServiceEditor(serviceName) {
        cy.get('.actions-container[data-testid="' + serviceName + '"]').click()
        cy.get('div.popover-container').should('exist')
        cy.get('.dropdown-item-trigger[data-testid="action-entity-edit"]').filter(':visible').click()
    }

    /**
     * Deletes the specified service by clicking the delete action,
     * entering the service name for confirmation, and confirming the deletion.
     * @param {string} serviceName - The name of the service to delete.
     */
    deleteService(serviceName) {
        cy.get('.actions-container[data-testid="' + serviceName + '"]').click()
        cy.get('div.popover-container').should('exist')
        cy.get('button.dropdown-item-trigger[data-testid="action-entity-delete"]').filter(':visible').click()
        cy.get('.k-modal.kong-ui-entity-delete-modal.k-prompt').should('exist')
        cy.get('input[data-testid="confirmation-input"]').type(serviceName)
        cy.get('button[data-testid="modal-action-button"]').should('have.enabled')
        cy.get('button[data-testid="modal-action-button"]').click()
    }

    //Validation methods

    /**
     * Verifies if the specified service exists in the service list.
     * @param {string} serviceName - The name of the service to validate.
     */
    doesServiceExist(serviceName) {
        cy.get('tr[data-testid="' + serviceName + '"]').should('exist')
    }

    /**
     * Verifies if the specified service does not exist in the service list.
     * @param {string} serviceName - The name of the service to validate.
     */
    doesServiceNotExist(serviceName) {
        cy.get('tr[data-testid="' + serviceName + '"]').should('not.exist')
    }

    /**
     * Validates if the displayed protocol for the service matches the expected protocol.
     * @param {string} serviceName - The name of the service.
     * @param {string} protocol - The expected protocol to validate.
     */
    validateServiceProtocol(serviceName, protocol) {
        cy.get('tr[data-testid="' + serviceName + '"] td[data-testid="protocol"]').should('have.text', protocol)
    }

    /**
     * Validates if the displayed host for the service matches the expected host.
     * @param {string} serviceName - The name of the service.
     * @param {string} host - The expected host to validate.
     */
    validateServiceHost(serviceName, host) {
        cy.get('tr[data-testid="' + serviceName + '"] td[data-testid="host"]').should('have.text', host)
    }

    /**
     * Validates if the displayed port for the service matches the expected port.
     * @param {string} serviceName - The name of the service.
     * @param {string|number} port - The expected port to validate.
     */
    validateServicePort(serviceName, port) {
        cy.get('tr[data-testid="' + serviceName + '"] td[data-testid="port"]').should('have.text', port)
    }

}

export default ServiceOverview
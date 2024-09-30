class ServiceEditor {
   /**
     * Verifies if the Service Editor page is displayed.
     */
    isPageDisplayed() {
        cy.get('span.title').should('have.text','Edit Gateway Service')
    }

    /**
     * Sets the name of the service.
     * @param {string} serviceName - The name to set for the service.
     */
    setName(serviceName) {
        cy.get('input[data-testid="gateway-service-name-input"]').type(serviceName)
        cy.get('input[data-testid="gateway-service-name-input"]').should('have.value', serviceName)
    }

    /**
     * Sets the upstream URL for the service.
     * @param {string} upstreamURL - The upstream URL to set for the service.
     */
    setUpstreamURL(upstreamURL) {
        cy.get('input[data-testid="gateway-service-url-input"]').type(upstreamURL)
        cy.get('input[data-testid="gateway-service-url-input"]').should('have.value', upstreamURL)
    }

    /**
     * Sets a tag for the service.
     * @param {string} tagName - The tag to set for the service.
     */
    setTagName(tagName) {
        cy.get('input[data-testid="gateway-service-tags-input"]').type(tagName)
    }
    
    /**
     * Clicks the "Save" button to submit the form and save the service.
     */
    clickSaveBtn(){
        cy.get('button[data-testid="service-form-submit"]').click()
    }

}

export default ServiceEditor
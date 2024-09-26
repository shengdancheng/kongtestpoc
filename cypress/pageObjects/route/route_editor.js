class RouteEditor {
    /**
     * Verifies if the route editor page is displayed.
     */
    isPageDisplayed(){
        cy.get('span.title').should('have.text', 'Edit Route')
    }

    /**
     * Sets the route name.
     * @param {string} routeName - The name to set for the route.
     */
    setName(routeName){
        cy.get('input[data-testid="route-form-name"]').type(routeName)
        cy.get('input[data-testid="route-form-name"]').should('have.value', routeName)
    }
    /**
     * Sets the path.
     * @param {string} path - The path to set for the route.
     */
    setPaths(path){
        cy.get('input[data-testid="route-form-paths-input-1"]').type(path)
        cy.get('input[data-testid="route-form-paths-input-1"]').should('have.value', path)
    }

    /**
     * Sets a tag.
     * @param {string} tag - The tag to set for the route.
     */
    setTag(tag){
        cy.get('input[data-testid="route-form-tags"]').type(tag)
    }

    /**
     * Clicks the "Save" button to submit the form and save the route.
     */
    clickSaveBtn(){
        cy.get('button[data-testid="route-form-submit"]').click()
    }

}

export default RouteEditor
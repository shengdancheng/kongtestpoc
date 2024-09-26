class RouteOverview {
    /**
     * Verifies if the route overview page is displayed.
     */
    isPageDisplayed() {
        cy.get('section.routes-listing').should('exist')
    }

    /**
     * Clicks the "Add Route" button to open the route creation form.
     */
    clickAddRouteBtn(){
        cy.get('a[data-testid="toolbar-add-route"]').click()
        cy.get('span.title').should('have.text', 'Create Route')
    }

    /**
     * Opens the route editor for the specified route.
     * Clicks the action button for the route and selects the "Edit" option on popover menu.
     * @param {string} routeName - The name of the route to edit.
     */
    openRouteEditor(routeName){
        cy.get('.actions-container[data-testid="'+routeName+'"]').click()
        cy.get('div.popover-container').should('exist')
        cy.get('.dropdown-item-trigger[data-testid="action-entity-edit"]').filter(':visible').click()
    }

    /**
     * Opens the route detail information form for the specified route.
     * Clicks the action button for the route and selects the "View" option on popover menu.
     * @param {string} routeName - The name of the route to view.
     */
    openRouteConfig(routeName){
        cy.get('.actions-container[data-testid="'+routeName+'"]').click()
        cy.get('div.popover-container').should('exist')
        cy.get('.dropdown-item-trigger[data-testid="action-entity-view"]').filter(':visible').click()
    }

    /**
     * Deletes the specified route by clicking the delete action on popover menu, entering the route name for confirmation,
     * and then confirming the deletion.
     * @param {string} routeName - The name of the route to delete.
     */
    deleteRoute(routeName){
        cy.get('.actions-container[data-testid="'+routeName+'"]').click()
        cy.get('div.popover-container').should('exist')
        cy.get('button.dropdown-item-trigger[data-testid="action-entity-delete"]').filter(':visible').click()
        cy.get('.k-modal.kong-ui-entity-delete-modal.k-prompt').should('exist')
        cy.get('input[data-testid="confirmation-input"]').type(routeName)
        cy.get('button[data-testid="modal-action-button"]').should('have.enabled')
        cy.get('button[data-testid="modal-action-button"]').click()
    }

    /**
     * Checks if the specified route exists in the route list.
     * @param {string} routeName - The name of the route to check for existence.
     */
    doesRouteExist(routeName) {
        cy.get('tr[data-testid="'+routeName+'"]').should('exist')
    }

    /**
     * Checks if the specified route does not exist in the route listing.
     * @param {string} routeName - The name of the route to check for non-existence.
     */
    doesRouteNotExist(routeName) {
        cy.get('tr[data-testid="'+routeName+'"]').should('not.exist')
    }

    /**
     * Validates that the displayed route name matches the expected name.
     * @param {string} routeName - The expected route name to validate.
     */
    validateRouteName(routeName) {
        cy.get('tr[data-testid="'+routeName+'"] td[data-testid="name"]').should('have.text', routeName)
    }

    /**
     * Validates that the displayed protocols for the specified route match the expected protocols.
     * @param {string} routeName - The name of the route.
     * @param {string} protocols - The expected protocols to validate.
     */
    validateRouteProtocols(routeName,protocols) {
        cy.get('tr[data-testid="'+routeName+'"] td[data-testid="protocols"]').invoke('text').should('include', protocols)
    }

    /**
     * Validates that the displayed paths for the specified route match the expected paths.
     * @param {string} routeName - The name of the route.
     * @param {string} paths - The expected paths to validate.
     */
    validateRoutePaths(routeName,paths) {
        cy.get('tr[data-testid="'+routeName+'"] td[data-testid="paths"]').should('have.text', paths)
    }

    /**
     * Validates that the displayed tags for the specified route match the expected tags.
     * @param {string} routeName - The name of the route.
     * @param {string} tag - The expected tag to validate.
     */
    validateRouteTags(routeName,tag){
        cy.get('tr[data-testid="'+routeName+'"]  td[data-testid="tags"]').should('have.text', tag)
    }





}

export default RouteOverview

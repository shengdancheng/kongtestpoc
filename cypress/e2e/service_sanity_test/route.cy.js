import ServiceOverview from '../../pageObjects/service/service_overview'
import ServiceConfig from '../../pageObjects/service/service_config'
import RouteOverview from '../../pageObjects/route/route_overview'
import RouteEditor from '../../pageObjects/route/route_editor'
import RouteConfig from '../../pageObjects/route/route_config'

describe('Gateway service routes sanity test', () => {
    const serviceOverview = new ServiceOverview()
    const serviceConfig = new ServiceConfig()
    const routeOverview = new RouteOverview()
    const routeEditor = new RouteEditor()
    const routeConfig = new RouteConfig()

    beforeEach(() => {
        serviceOverview.openPage()
    })
    // Prerequisite: Ensure `example_service` is created before running this test case.
    // Note: This workflow duplicates the route section from `service.cy.js`.
    // The original intent was for this spec to focus on route workflows,
    // while the workflow in `service.cy.js` focuses on service workflows.
    // However, the preconditions do not appear to be preserved in the Docker image,
    // so this case has been merged into `service.cy.js`.
    xit('Create, update, delete a rout for an existed route', () => {
        serviceOverview.doesServiceExist('example_service')
        serviceOverview.openServiceConfigPage('example_service')
        serviceConfig.switchToRoute()

        //Create a route, verify its information
        routeOverview.clickAddRouteBtn()
        routeEditor.setName('mocking')
        routeEditor.setPaths("/mock")
        routeEditor.clickSaveBtn()
        routeOverview.isPageDisplayed()
        routeOverview.doesRouteExist('mocking')
        routeOverview.validateRouteName('mocking')
        routeOverview.validateRouteProtocols('mocking', 'httphttps')
        routeOverview.validateRoutePaths('mocking', "/mock")

        //Update the route, verify the corresponding information.
        routeOverview.openRouteEditor('mocking')
        routeEditor.isPageDisplayed()
        routeEditor.setTag('tag1')
        routeEditor.clickSaveBtn()
        routeOverview.isPageDisplayed()
        routeOverview.validateRouteTags('mocking', 'tag1')

        //Check the information in route config page
        routeOverview.openRouteConfig('mocking')
        routeConfig.isPageDisplayed('mocking')
        routeConfig.validateName('mocking')
        routeConfig.validateServiceName('example_service')
        routeConfig.validateTag('tag1')
        routeConfig.validateProtocols('http', 'https')
        routeConfig.validatePaths("/mock")
        routeConfig.validateHttpsRedirectStatusCode('426')
        routeConfig.validateRegexPriority('0')
        routeConfig.validateStripPath('true')
        routeConfig.validatePreserveHost('false')
        routeConfig.validateRequestBuffering('true')
        routeConfig.validatePathHandling('v0')

        //Delete the route
        routeConfig.backToOverview()
        routeOverview.isPageDisplayed()
        routeOverview.deleteRoute('mocking')
        routeOverview.doesRouteNotExist('mocking')

    })


})
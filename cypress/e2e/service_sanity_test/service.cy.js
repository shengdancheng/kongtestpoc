import ServiceOverview from '../../pageObjects/service/service_overview'
import ServiceConfig from '../../pageObjects/service/service_config'
import ServiceEditor from '../../pageObjects/service/service_editor'
import RouteOverview from '../../pageObjects/route/route_overview'
import RouteEditor from '../../pageObjects/route/route_editor'
import RouteConfig from '../../pageObjects/route/route_config'


describe('Gateway service sanity test', () => {
  const serviceOverview = new ServiceOverview()
  const serviceConfig = new ServiceConfig()
  const serviceEditor = new ServiceEditor()
  const routeOverview = new RouteOverview()
  const routeEditor = new RouteEditor()
  const routeConfig = new RouteConfig()

  beforeEach(() => {
    serviceOverview.openPage()
  })

  it('Create, update, delete a service', () => {
    //Add a service, then verify its information
    serviceOverview.openNewServicePanel()
    serviceEditor.setName('basic_service')
    serviceEditor.setUpstreamURL("http://httpbin.org")
    serviceEditor.clickSaveBtn()
    serviceOverview.isPageDisplayed()
    serviceOverview.doesServiceExist('basic_service')
    serviceOverview.validateServiceProtocol('basic_service', 'http')
    serviceOverview.validateServiceHost('basic_service', 'httpbin.org')
    serviceOverview.validateServicePort('basic_service', '80')

    //Verify the service's information in config page.
    serviceOverview.openServiceConfigPage('basic_service')
    serviceConfig.validateName('basic_service')
    serviceConfig.validateStatus('Enabled')
    serviceConfig.validateHost('httpbin.org')
    serviceConfig.validatePort('80')
    serviceConfig.validateProtocol('http')
    serviceConfig.validateRetries('5')
    serviceConfig.validateConnectTimeout('60000')
    serviceConfig.validateWriteTimeout('60000')
    serviceConfig.validateReadTimeout('60000')
    serviceConfig.validateTslVerify('Use default system setting')
    serviceConfig.backToOverview()

    //Update basic_service information, verify the corresponding information
    serviceOverview.openServiceEditor('basic_service')
    serviceEditor.isPageDisplayed()
    serviceEditor.setTagName('tag1')
    serviceEditor.clickSaveBtn()
    serviceOverview.openServiceConfigPage('basic_service')
    serviceConfig.validateTag('tag1')
    serviceConfig.backToOverview()

    serviceOverview.openServiceConfigPage('basic_service')
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
    routeConfig.validateServiceName('basic_service')
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

    //Delete basic_service and verify it.
    serviceConfig.backToOverview()
    serviceOverview.deleteService('basic_service')
    serviceOverview.doesServiceNotExist('basic_service')
  })


})
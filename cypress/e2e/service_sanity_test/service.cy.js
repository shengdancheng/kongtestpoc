import ServiceOverview from '../../pageObjects/service/service_overview'
import ServiceConfig from '../../pageObjects/service/service_config'
import ServiceEditor from '../../pageObjects/service/service_editor'

describe('Gateway service sanity test', () => {
  const serviceOverview = new ServiceOverview()
  const serviceConfig = new ServiceConfig()
  const serviceEditor = new ServiceEditor()

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
    serviceOverview.validateServiceProtocol('basic_service','http')
    serviceOverview.validateServiceHost('basic_service','httpbin.org')
    serviceOverview.validateServicePort('basic_service','80')

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

    //Delete basic_service and verify it.
    serviceOverview.deleteService('basic_service')
    serviceOverview.doesServiceNotExist('basic_service')
  })


})
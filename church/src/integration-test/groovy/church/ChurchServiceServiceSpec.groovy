package church

import grails.testing.mixin.integration.Integration
import grails.gorm.transactions.Rollback
import spock.lang.Specification
import org.hibernate.SessionFactory

@Integration
@Rollback
class ChurchServiceServiceSpec extends Specification {

    ChurchServiceService churchServiceService
    SessionFactory sessionFactory

    private Long setupData() {
        churchServiceService.findAll().each { it.delete(flush: true) }

        // test saving of services
        churchServiceService.save(new ChurchService(location: "Location 1"))
        churchServiceService.save(new ChurchService(location: "Location 2"))
        churchServiceService.save(new ChurchService(location: "Location 3"))
        churchServiceService.save(new ChurchService(location: "Location 4"))

        ChurchService churchService = new ChurchService(location: "HR Location")
        churchServiceService.save(churchService)
        // log.info("Created ChurchService: ${churchService.location}")

        return churchService.id
    }


    void "test get"() {
        Long churchServiceId = setupData()

        expect:
        churchServiceService.get(churchServiceId) != null
    }


    void "test list"() {
        setupData()

        when:
        List<ChurchService> churchServiceList = churchServiceService.list(max: 10, offset: 0)

        then:
        churchServiceList.size() == 5
        churchServiceList*.location.containsAll(["Location 1", "Location 3"]) // played around with this
    }

    void "test count"() {
        setupData()

        // log.info("Created ChurchService: ${churchServiceService.count}")

        expect:
        churchServiceService.count() == 5
    }

    void "test delete"() {
        String churchServiceId = setupData()

        expect:
        churchServiceService.count() == 5

        when:
        churchServiceService.delete(churchServiceId)
        sessionFactory.currentSession.flush()

        then:
        churchServiceService.count() == 4
    }

    void "test save"() {
        when:
        ChurchService churchService = new ChurchService(location: "New Service")
        churchServiceService.save(churchService)

        then:
        churchService.id != null
    }
}

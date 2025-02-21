package church

import grails.gorm.services.Service

@Service(ChurchService)
interface ChurchServiceService {

    ChurchService get(Serializable id)

    List<ChurchService> list(Map args)

    Long count()

    void delete(Serializable id)

    ChurchService save(ChurchService churchService)

}
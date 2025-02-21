package church

import grails.validation.ValidationException
import static org.springframework.http.HttpStatus.*
import grails.converters.JSON

class ChurchServiceController {

    ChurchServiceService churchServiceService

    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE", options: "OPTIONS"]

    def setCORS() {
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, X-Requested-With, Accept")
        response.setHeader("Access-Control-Allow-Credentials", "true")        
    }

    def options() {
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, X-Requested-With, Accept")
        response.setHeader("Access-Control-Allow-Credentials", "true")
        render status: 200
    }


    static responseFormats = ['json']

    def index(Integer max) {
        setCORS()

        params.max = Math.min(max ?: 10, 100)
        respond churchServiceService.list()
    }

    def show(Long id) {
        setCORS()

        respond churchServiceService.get(id)
    }

    def create() {
        setCORS()

        respond new ChurchService(params)
    }

   def save(ChurchService churchService) {
        setCORS()

        if (churchService == null) {
            notFound()
            return
        }

        try {
            churchServiceService.save(churchService)  
        } catch (ValidationException e) {
            respond churchService.errors, status: UNPROCESSABLE_ENTITY
            return
        }

        respond churchService, [status: CREATED, formats: ['json']]
    }

    def update(Long id) {
        setCORS()

        def churchService = churchServiceService.get(id)
        if (!churchService) {
            render status: NOT_FOUND
            return
        }

        churchService.properties = request.JSON

        try {
            churchServiceService.save(churchService)
        } catch (ValidationException e) {
            respond churchService.errors, status: UNPROCESSABLE_ENTITY
            return
        }

        respond churchService, [status: OK, formats: ['json']]
    }

    def delete(Long id) {
        if (id == null) {
            notFound()
            return
        }

        churchServiceService.delete(id)

        request.withFormat {
            form multipartForm {
                flash.message = "The specified church service could not be deleted"
                redirect action:"index", method:"GET"
            }
            '*'{ render status: NO_CONTENT }
        }
    }

    protected void notFound() {
        request.withFormat {
            form multipartForm {
                flash.message = "The specified church service was not found"
                redirect action: "index", method: "GET"
            }
            '*'{ render status: NOT_FOUND }
        }
    }
}

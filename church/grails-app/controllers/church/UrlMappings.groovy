package church

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            action = [OPTIONS: "options", GET: "index", POST: "save", PUT: "update", DELETE: "delete"]

            constraints {
            }
        }

        "/**"(controller: "*", action: "options", method: "OPTIONS")
        "500"(view:'/error')
        "404"(view:'/notFound')
        "/churchService"(resources: 'churchService')
    }
}

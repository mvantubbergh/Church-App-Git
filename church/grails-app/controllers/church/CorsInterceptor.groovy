// package church

// import grails.web.servlet.mvc.GrailsWebRequest
// import org.grails.web.servlet.mvc.GrailsWebRequestFilter

class CorsInterceptor //extends GrailsWebRequestFilter
 {
    CorsInterceptor() {
        matchAll()
    }

    boolean before() {
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type")
        response.setHeader("Access-Control-Max-Age", "3600")

        if (request.method == "OPTIONS") {
            render(status: 200)
            return false
        }
        return true
    }

    boolean after() {
        return true;
    }
}
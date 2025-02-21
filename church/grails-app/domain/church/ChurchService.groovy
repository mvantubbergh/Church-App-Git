package church

class ChurchService {

    String location
    Integer seats
    Date time
    
    static constraints = {
        location blank: false, size: 1..50
        seats blank: false, min: 1
        time blank: false, defaultValue: "2025-02-19 09:00:00" // could set up default value in SQL but prefer this
    }
}

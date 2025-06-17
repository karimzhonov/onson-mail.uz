import { ReadOnlyService } from "./utils";


class HotelService extends ReadOnlyService {
    constructor() {
        super('/tourism/hotel/')
    }
}

class FoodService extends ReadOnlyService {
    constructor() {
        super('/tourism/food/')
    }
}


class HotelTypeService extends ReadOnlyService {
    constructor() {
        super('/tourism/hotel-type/')
    }
}


class CountryService extends ReadOnlyService {
    constructor() {
        super('/tourism/country/')
    }
}

class RegionService extends ReadOnlyService {
    constructor() {
        super('/tourism/region/')
    }
}

class TypeService extends ReadOnlyService {
    constructor() {
        super('/tourism/type/')
    }
}

class TourService extends ReadOnlyService {
    constructor() {
        super('/tourism/tour/')
    }
}

class ServiceService extends ReadOnlyService {
    constructor() {
        super('/tourism/service/')
    }
}

export default class TourismService {
    readonly country = new CountryService
    readonly region = new RegionService
    readonly type = new TypeService
    readonly tour = new TourService
    readonly hotel = new HotelService
    readonly hotelType = new HotelTypeService
    readonly food = new FoodService()
    readonly service = new ServiceService()
}
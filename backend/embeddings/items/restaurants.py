from pydantic import BaseModel


class Restaurant(BaseModel):
    id: int
    embeddingName: str
    imageName: str
    name: str
    address: str
    latitude: float
    longitude: float
    country: str
    region: str
    province: str
    city: str
    tags: str
    cuisines: str
    specialDiets: str
    priceLevel: str
    meals: str
    avgRating: float
    vegetarianFriendly: bool
    vegetarianFriendly: bool
    glutenFree: bool
    reviewsNumber: int


class RestaurantWithDistance(BaseModel):
    restaurant: Restaurant
    distance: float

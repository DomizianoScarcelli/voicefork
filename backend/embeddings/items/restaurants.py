from pydantic import BaseModel


class RestaurantSearchQuery(BaseModel):
    restaurantName: str
    restaurantId: int
    embeddingName: str
    distance: float

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "embeddingName" TEXT NOT NULL,
    "imageName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "cuisines" TEXT NOT NULL,
    "specialDiets" TEXT NOT NULL,
    "priceLevel" TEXT NOT NULL,
    "meals" TEXT NOT NULL,
    "avgRating" DOUBLE PRECISION NOT NULL,
    "vegetarianFriendly" BOOLEAN NOT NULL,
    "veganFriendly" BOOLEAN NOT NULL,
    "glutenFree" BOOLEAN NOT NULL,
    "reviewsNumber" INTEGER NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

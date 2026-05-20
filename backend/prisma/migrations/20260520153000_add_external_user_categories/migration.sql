-- CreateTable
CREATE TABLE "ExternalUserCategory" (
    "externalUserId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    PRIMARY KEY ("externalUserId", "categoryId"),
    CONSTRAINT "ExternalUserCategory_externalUserId_fkey" FOREIGN KEY ("externalUserId") REFERENCES "ExternalUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ExternalUserCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

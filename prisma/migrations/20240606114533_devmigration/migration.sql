-- CreateTable
CREATE TABLE "Settlement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Settlement_senderId_key" ON "Settlement"("senderId");

-- CreateIndex
CREATE UNIQUE INDEX "Settlement_receiverId_key" ON "Settlement"("receiverId");

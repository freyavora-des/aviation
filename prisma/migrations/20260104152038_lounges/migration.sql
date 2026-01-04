-- CreateTable
CREATE TABLE "Airport" (
    "iata" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "lat" REAL NOT NULL,
    "lon" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Lounge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "airportIata" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "terminal" TEXT NOT NULL,
    "locationHint" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Lounge_airportIata_fkey" FOREIGN KEY ("airportIata") REFERENCES "Airport" ("iata") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AcceptedProgram" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "loungeId" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    CONSTRAINT "AcceptedProgram_loungeId_fkey" FOREIGN KEY ("loungeId") REFERENCES "Lounge" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LoungeRule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "loungeId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    CONSTRAINT "LoungeRule_loungeId_fkey" FOREIGN KEY ("loungeId") REFERENCES "Lounge" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Lounge_airportIata_idx" ON "Lounge"("airportIata");

-- CreateIndex
CREATE INDEX "AcceptedProgram_loungeId_idx" ON "AcceptedProgram"("loungeId");

-- CreateIndex
CREATE UNIQUE INDEX "AcceptedProgram_loungeId_program_key" ON "AcceptedProgram"("loungeId", "program");

-- CreateIndex
CREATE INDEX "LoungeRule_loungeId_idx" ON "LoungeRule"("loungeId");

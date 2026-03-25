-- CreateTable
CREATE TABLE "ScenarioIntroText" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ScenarioIntroText_sortOrder_key" ON "ScenarioIntroText"("sortOrder");

-- Seed default intro texts
INSERT INTO "ScenarioIntroText" ("text", "sortOrder", "createdAt", "updatedAt") VALUES
(char(214) || 'vningarna liknar verkliga situationer och visar vilka beslut och konsekvenser som kan uppst' || char(229) || ' vid sv' || char(229) || 'ra val.', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(char(196) || 'ven om ' || char(246) || 'vningarna inte ' || char(228) || 'r verkliga s' || char(229) || ' liknar de h' || char(228) || 'ndelser och utmaningar ungdomar kan st' || char(228) || 'llas inf' || char(246) || 'r.', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Vi vet att inneh' || char(229) || 'llet kan k' || char(228) || 'nnas jobbigt f' || char(246) || 'r vissa deltagare.', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Du kan stoppa ' || char(246) || 'vningen n' || char(228) || 'r som helst om det k' || char(228) || 'nns obehagligt. Sedan kan du v' || char(228) || 'lja att forts' || char(228) || 'tta eller avsluta.', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Kom ih' || char(229) || 'g att du alltid kan f' || char(229) || ' hj' || char(228) || 'lp och st' || char(246) || 'd och inte ' || char(228) || 'r ensam i att hantera dessa utmaningar.', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Vi vill att du funderar p' || char(229) || ' dina val och vad du kan l' || char(228) || 'ra dig av dem i en trygg milj' || char(246) || '. Lycka till!', 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

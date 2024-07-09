-- CreateTable
CREATE TABLE "jogos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "desenvolvedora" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "dataLancamento" INTEGER NOT NULL,
    "urlImagem" TEXT NOT NULL,
    "votos" INTEGER NOT NULL DEFAULT 0,
    "emails" TEXT[],

    CONSTRAINT "jogos_pkey" PRIMARY KEY ("id")
);

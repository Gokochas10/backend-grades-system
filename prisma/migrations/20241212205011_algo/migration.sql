-- CreateTable
CREATE TABLE "materia_estudiantes" (
    "id" SERIAL NOT NULL,
    "materia_id" INTEGER NOT NULL,
    "estudiante_uid" VARCHAR(255) NOT NULL,

    CONSTRAINT "materia_estudiantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materias" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "profesor_uid" VARCHAR(255) NOT NULL,

    CONSTRAINT "materias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recursos" (
    "id" SERIAL NOT NULL,
    "materia_id" INTEGER NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,

    CONSTRAINT "recursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarea_estudiantes" (
    "id" SERIAL NOT NULL,
    "tarea_id" INTEGER NOT NULL,
    "estudiante_uid" VARCHAR(255) NOT NULL,
    "nota" DECIMAL(5,2),
    "observacion" VARCHAR(255) NOT NULL,
    "estado" BOOLEAN DEFAULT false,

    CONSTRAINT "tarea_estudiantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tareas" (
    "id" SERIAL NOT NULL,
    "materia_id" INTEGER NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,

    CONSTRAINT "tareas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "uid" VARCHAR(255) NOT NULL,
    "correo" VARCHAR(255) NOT NULL,
    "rol" VARCHAR(50) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_materia_estudiante" ON "materia_estudiantes"("materia_id", "estudiante_uid");

-- CreateIndex
CREATE UNIQUE INDEX "unique_tarea_estudiante" ON "tarea_estudiantes"("tarea_id", "estudiante_uid");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_correo_key" ON "usuarios"("correo");

-- AddForeignKey
ALTER TABLE "materia_estudiantes" ADD CONSTRAINT "fk_estudiante" FOREIGN KEY ("estudiante_uid") REFERENCES "usuarios"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "materia_estudiantes" ADD CONSTRAINT "fk_materia" FOREIGN KEY ("materia_id") REFERENCES "materias"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "materias" ADD CONSTRAINT "fk_profesor" FOREIGN KEY ("profesor_uid") REFERENCES "usuarios"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recursos" ADD CONSTRAINT "fk_recurso_materia" FOREIGN KEY ("materia_id") REFERENCES "materias"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tarea_estudiantes" ADD CONSTRAINT "fk_tarea" FOREIGN KEY ("tarea_id") REFERENCES "tareas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tarea_estudiantes" ADD CONSTRAINT "fk_tarea_estudiante" FOREIGN KEY ("estudiante_uid") REFERENCES "usuarios"("uid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tareas" ADD CONSTRAINT "fk_tarea_materia" FOREIGN KEY ("materia_id") REFERENCES "materias"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

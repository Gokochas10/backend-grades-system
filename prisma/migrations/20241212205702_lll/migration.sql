/*
  Warnings:

  - You are about to drop the column `nota` on the `tarea_estudiantes` table. All the data in the column will be lost.
  - You are about to drop the column `observacion` on the `tarea_estudiantes` table. All the data in the column will be lost.
  - Added the required column `descripcion` to the `tareas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tarea_estudiantes" DROP COLUMN "nota",
DROP COLUMN "observacion";

-- AlterTable
ALTER TABLE "tareas" ADD COLUMN     "descripcion" TEXT NOT NULL;

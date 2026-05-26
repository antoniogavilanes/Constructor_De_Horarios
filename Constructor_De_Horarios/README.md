
# Constructor de Horarios


## Introducción

<div align="justify">
  <p>Este proyecto es un sistema de construcción de horarios académicos diseñado para facilitar la organización de asignaturas, profesores y cursos dentro de la Universidad Europea del Atlántico. Su objetivo principal es permitir la creación visual e intuitiva de horarios, con validaciones automáticas para evitar conflictos entre materias obligatorias y optativas.</p>
  <p>El desarrollo del sistema sigue una arquitectura basada en componentes y aplica principios del modelo de dominio. Actualmente está en construcción bajo una metodología iterativa basada en RUP, lo que permite adaptar y mejorar el diseño en cada fase del proyecto.</p>
  <p>En este repositorio se encontrará el código fuente del sistema, los diagramas UML, así como la documentación completa del TFG organizada por capítulos.</p>
</div>

---

## Documentación

| Capítulo | Contenido |
|:---|:---|
| [Capítulo 1 — Introducción](./document/capitulos/capitulo1.md) | Escenario, estado del arte, propuesta de solución, hipótesis, objetivos y metodología |
| [Capítulo 2 — Modelo del Dominio](./document/capitulos/capitulo2.md) | Modelo del dominio, diagrama de objetos y diagramas de estados |
| [Capítulo 3 — Disciplina de Requisitos](./document/capitulos/capitulo3.md) | Actores, casos de uso, priorización, detallado y diagrama de contexto |

---

## Diagramas

| Diagrama | Descripción |
|:---|:---|
| [Modelo del Dominio](./images/imagenes/ModeloDominio.svg) | Estructura conceptual del sistema con sus tres bloques principales |
| [Diagrama de Objetos](./images/imagenes/DiagramaObjetos.svg) | Instancia concreta del dominio en un escenario real |
| [Estados del Horario](./images/imagenes/DiagramaEstadosHorario.svg) | Ciclo de vida del horario académico |
| [Estados de Incidencias](./images/imagenes/DiagramaEstadosIncidencias.svg) | Ciclo de vida de una incidencia |
| [Estados de Reservas](./images/imagenes/DiagramaEstadosReservas.svg) | Ciclo de vida de una reserva de aula |
| [Casos de Uso — Parte I](./images/imagenes/CasoDeUso1.svg) | Gestión de entidades académicas |
| [Casos de Uso — Parte II](./images/imagenes/CasoDeUso2.svg) | Infraestructura y planificación |
| [Diagrama de Contexto](./images/imagenes/DiagramaContexto.svg) | Navegación global del sistema |
| [Diagrama de Diseño](./images/imagenes/DiagramaDiseño.svg) | Arquitectura de clases del sistema |

> Los fuentes PlantUML se encuentran en [`images/modelosUML/`](./images/modelosUML/)

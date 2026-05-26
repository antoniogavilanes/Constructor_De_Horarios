# Capítulo 2 – Modelo del Dominio

## 1. Introducción

El presente capítulo tiene como objetivo definir y acotar el sistema objeto de desarrollo mediante una abstracción del dominio académico. Para ello, se identifican los conceptos principales del sistema de construcción de horarios, así como sus relaciones y comportamientos dinámicos.

Este análisis permite establecer una base sólida para el diseño e implementación del sistema, garantizando la coherencia entre los requisitos funcionales y la realidad del dominio.

---

## 2. Modelo del Dominio

El modelo del dominio representa los conceptos fundamentales del sistema y las relaciones existentes entre ellos. En este caso, el sistema está centrado en la **gestión y construcción de horarios académicos**, incluyendo la asignación de recursos y la detección de conflictos.

<div align="center">

<img src="../../images/imagenes/ModeloDominio.svg"/>

</div>

### Elementos principales

El dominio se estructura en tres grandes bloques:

- **Horarios**
  - Horario
  - Sesión docente
  - Asignatura
  - Grado
  - Semestre

- **Incidencias**
  - Alumno
  - Profesor
  - Incidencia

- **Reservas**
  - Reserva de aula
  - Examen
  - Aula

### Relaciones principales

- Un horario contiene múltiples sesiones docentes.
- Cada sesión docente está asociada a una asignatura, un profesor y un aula.
- Un grado agrupa asignaturas y alumnos.
- Las incidencias pueden ser reportadas por alumnos o profesores.
- Las reservas y exámenes están vinculados a aulas concretas.

Este modelo permite representar la estructura conceptual del sistema antes de su implementación.

---

## 3. Diagrama de Objetos

El diagrama de objetos representa una **instancia concreta del sistema en un momento determinado**, mostrando ejemplos reales de los elementos definidos en el modelo del dominio.

<div align="center">

<img src="../../images/imagenes/DiagramaObjetos.svg"/>

</div>

A diferencia del modelo del dominio, que es abstracto, este diagrama permite visualizar un escenario específico del sistema, como por ejemplo:

- Un horario concreto de un grado en un semestre determinado.
- Sesiones docentes asignadas a una asignatura real.
- Profesores, alumnos y aulas con identificadores específicos.

### Finalidad

El objetivo del diagrama de objetos es:

- Validar la coherencia del modelo del dominio.
- Representar un estado real del sistema.
- Detectar posibles conflictos de planificación en un escenario concreto.

---

## 4. Diagrama de Estados

Los diagramas de estados modelan el **ciclo de vida de las entidades más relevantes del sistema**, representando cómo evolucionan a lo largo del tiempo en función de eventos y decisiones.

En este sistema se han modelado tres entidades principales: horario, incidencias y reservas de aula.

---

### Estado del Horario

<div align="center">

<img src="../../images/imagenes/DiagramaEstadosHorario.svg" width="30%"/>

</div>

El horario representa el núcleo del sistema y pasa por distintas fases:

- **Borrador:** estado inicial de creación.
- **En construcción:** se están añadiendo y modificando sesiones.
- **Validado:** el sistema ha comprobado que no existen conflictos.
- **Publicado:** el horario está disponible para su consulta.
- **Archivado:** el periodo académico ha finalizado.

El flujo incluye decisiones mediante nodos `<<choice>>`, especialmente en la validación de conflictos y en la publicación del horario.

---

### Estado de las Incidencias

<div align="center">

<img src="../../images/imagenes/DiagramaEstadosIncidencias.svg" width="30%"/>

</div>

Las incidencias siguen un ciclo de vida orientado a su gestión y resolución:

- **Creada**
- **En revisión**
- **En proceso**
- **Resuelta**
- **Rechazada**
- **Cerrada**

El sistema evalúa su validez y determina si pueden ser resueltas o deben ser descartadas.

---

### Estado de las Reservas

<div align="center">

<img src="../../images/imagenes/DiagramaEstadosReservas.svg" width="50%"/>

</div>

Las reservas de aula gestionan la disponibilidad de recursos físicos:

- **Solicitada**
- **Pendiente de aprobación**
- **Aprobada**
- **Rechazada**
- **Finalizada**
- **Cancelada**

Este flujo permite controlar la asignación de aulas evitando conflictos de ocupación.

---

## 5. Conclusión del capítulo

El modelo del dominio establece la estructura conceptual del sistema académico, definiendo los elementos clave y sus relaciones. Los diagramas de objetos y estados complementan esta visión aportando instancias concretas y el ciclo de vida de las entidades más relevantes, sentando las bases para la disciplina de requisitos desarrollada en el siguiente capítulo.

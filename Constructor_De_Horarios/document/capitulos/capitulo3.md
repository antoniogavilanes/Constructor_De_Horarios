# Capítulo 3 – Análisis y Diseño del Sistema

## 1. Introducción

El presente capítulo tiene como objetivo profundizar en la especificación del sistema de construcción de horarios académicos, partiendo del análisis realizado en el capítulo anterior.

En esta fase se refinan los requisitos del sistema y se transforman en un modelo más cercano a su implementación, incorporando decisiones de diseño que permiten estructurar la solución de forma modular, mantenible y coherente.

Este proceso permite establecer una arquitectura clara del sistema, separando responsabilidades y definiendo la interacción entre sus componentes principales.

---

## 2. Disciplina de análisis y diseño

El proceso de análisis y diseño se basa en la transformación progresiva de los requisitos del sistema en un modelo técnico que pueda ser implementado.

### Análisis

El análisis se centra en:

- Refinar los requisitos funcionales.
- Comprender con mayor precisión el dominio del problema.
- Identificar responsabilidades del sistema.
- Estructurar los casos de uso en elementos técnicos.

### Diseño

El diseño se centra en:

- Definir la arquitectura del sistema.
- Diseñar las clases y su comportamiento.
- Organizar el sistema en módulos coherentes.
- Preparar la implementación y pruebas.

---

## 3. Arquitectura del sistema

El sistema se ha diseñado siguiendo una arquitectura en capas basada en la separación de responsabilidades, diferenciando claramente entre:

- Capa de presentación (Vista)
- Capa de control (Lógica de negocio)
- Capa de modelo (Dominio)

Esta separación permite mejorar la mantenibilidad del sistema, facilitando su evolución y escalabilidad.

---

## 4. Diseño de la arquitectura

El sistema se ha estructurado en tres subsistemas principales:

- Gestión de horarios
- Gestión de reservas
- Gestión de incidencias

Cada subsistema encapsula su propia lógica, evitando un alto acoplamiento entre componentes y favoreciendo la cohesión interna.

---

## 5. Diagrama de clases de diseño

El siguiente diagrama representa la estructura de diseño del sistema, mostrando la separación en subsistemas y la organización de clases en cada uno de ellos.

<div align="center">

<img src="../../images/imagenes/DiagramaDiseño.svg"/>

</div>

---

### Subsistema de Gestión de Horarios

Este subsistema es el núcleo principal del sistema y se encarga de la creación, validación y publicación de horarios académicos.

Incluye:

- VistaHorario: interfaz de usuario para la gestión de horarios.
- ControladorHorario: coordina las operaciones del sistema.
- ValidadorHorario: verifica la coherencia del horario.
- GestorConflictos: detecta solapamientos y errores.
- Horario y SesionDocente: representan la estructura principal del dominio.

---

### Subsistema de Gestión de Reservas

Este subsistema gestiona la asignación de aulas y la planificación de exámenes.

Incluye:

- VistaReserva: interfaz de usuario para reservas.
- ControladorReserva: gestiona las operaciones de reserva.
- ReservaAula: representa la reserva de un aula.
- Examen: representa evaluaciones programadas.

---

### Subsistema de Gestión de Incidencias

Este subsistema se encarga de la gestión de problemas y conflictos reportados dentro del sistema.

Incluye:

- VistaIncidencia: interfaz de consulta y gestión.
- ControladorIncidencia: gestiona el flujo de incidencias.
- Incidencia: representa una incidencia del sistema.
- Alumno y Profesor: actores que pueden generar incidencias.

---

## 6. Análisis de clases

A partir del modelo del dominio y los casos de uso, se han identificado tres tipos principales de clases:

### Clases de entidad

- Horario
- SesionDocente
- Asignatura
- Profesor
- Alumno
- Aula
- ReservaAula
- Examen
- Incidencia
- Grado
- Semestre

---

### Clases de control

- ControladorHorario
- ControladorReserva
- ControladorIncidencia
- ValidadorHorario
- GestorConflictos

---

### Clases de vista

- VistaHorario
- VistaReserva
- VistaIncidencia

---

## 7. Diseño de clases

El diseño de clases se basa en el patrón arquitectónico Boundary – Control – Entity (BCE), el cual permite separar claramente:

- La interacción con el usuario.
- La lógica de control del sistema.
- La representación del dominio.

Esta separación mejora la cohesión del sistema y reduce el acoplamiento entre componentes.

---

## 8. Requisitos no funcionales

### Mantenibilidad
El sistema se estructura en módulos independientes, facilitando su modificación y evolución.

### Escalabilidad
La arquitectura permite la incorporación de nuevas funcionalidades sin afectar a los módulos existentes.

### Reutilización
Las clases del dominio pueden ser reutilizadas en distintos contextos del sistema.

### Usabilidad
El sistema está diseñado para ser utilizado por un administrador académico de forma intuitiva y eficiente.

---

## 9. Trazabilidad del sistema

Se mantiene la trazabilidad entre:

- Requisitos funcionales
- Casos de uso
- Clases de diseño
- Subsistemas

Esto garantiza la coherencia del sistema desde la fase de análisis hasta la implementación.

---

## 10. Conclusión del capítulo

El análisis y diseño del sistema permiten transformar los requisitos definidos en el capítulo anterior en una estructura técnica clara y organizada.

Mediante la definición de la arquitectura, la separación en subsistemas y el diseño de clases, se establece una base sólida para la implementación del sistema de construcción de horarios académicos, asegurando su mantenibilidad, escalabilidad y coherencia con los requisitos funcionales y no funcionales.
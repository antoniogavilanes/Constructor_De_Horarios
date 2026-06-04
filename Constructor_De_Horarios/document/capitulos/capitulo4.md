# Capítulo 4 – Disciplina de Análisis y Diseño

## 1. Introducción

El presente capítulo aborda las disciplinas de **análisis y diseño** del sistema, que constituyen el puente formal entre los requisitos capturados en el capítulo anterior y la implementación que se desarrollará en fases sucesivas.

| Análisis | Diseño |
|:---|:---|
| Refinar los requisitos de la captura de requisitos para lograr una comprensión más precisa de los mismos, una descripción más fácil de mantener y que ayuda a estructurar el sistema. | Desarrollar modelos enfocados en los requisitos no funcionales y el dominio de la solución, preparando el sistema para su implementación y pruebas. |

Habiendo definido los límites del sistema en el capítulo anterior, el objetivo ahora es dar una especificación más precisa de los requisitos obtenidos, describiéndolos en el lenguaje de los desarrolladores, introduciendo mayor formalismo y tomando decisiones sobre el funcionamiento interno del sistema. De este modo se puede abordar el desarrollo enfocado en los requisitos no funcionales y en el dominio de la solución.

Se trata, en definitiva, de crear una **abstracción sin fisuras de la implementación** del sistema: la aplicación deberá ser un refinamiento sencillo del diseño mediante la cumplimentación de la *carne* —el código—, sin alterar *el esqueleto* —el diseño—. Esto requiere adquirir un conocimiento en profundidad sobre los requisitos no funcionales y las limitaciones relacionadas con las tecnologías elegidas: lenguajes de programación, tecnologías de interfaz de usuario, reutilización de componentes, patrones de diseño y gestión del estado.

---

## 2. Análisis de la Arquitectura

### Patrón arquitectónico

El sistema adopta el patrón **Modelo-Vista-Controlador (MVC)** como arquitectura base. Este patrón separa las responsabilidades del sistema en tres capas bien diferenciadas:

| Capa | Responsabilidad |
|:---|:---|
| **Modelo** | Representa las entidades del dominio y encapsula la lógica de negocio y el acceso a datos. |
| **Vista** | Gestiona la presentación e interacción con el Administrador. |
| **Controlador** | Coordina el flujo entre la Vista y el Modelo, manejando los eventos del usuario. |

La elección del patrón MVC se fundamenta en su capacidad para **aislar los cambios**: una modificación en la interfaz de usuario no afecta al modelo de datos, y viceversa, lo que facilita el mantenimiento y la evolución del sistema a lo largo de las iteraciones de desarrollo.

### Subsistemas

El modelo de dominio definido en el Capítulo 2 identifica tres bloques conceptuales: Horarios, Reservas e Incidencias. No obstante, los casos de uso especificados en el Capítulo 3 acoten el alcance de esta iteración al subsistema de **Gestión de Horarios**, que constituye el núcleo funcional del sistema y el de mayor valor y riesgo arquitectónico. Los subsistemas de Reservas e Incidencias quedan identificados como ámbitos de desarrollo futuro, sin casos de uso definidos en la presente iteración.

| Subsistema | Responsabilidad | Alcance |
|:---|:---|:---:|
| **Gestión de Horarios** | Abarca la autenticación, la gestión de entidades académicas, las asignaciones de recursos y la construcción y consulta del horario. | Iteración actual |
| **Gestión de Reservas** | Gestiona la solicitud, aprobación y seguimiento de reservas de aulas y exámenes. | Iteración futura |
| **Gestión de Incidencias** | Registra y resuelve las incidencias reportadas en el contexto académico. | Iteración futura |

<div align="center">

<img src="../../images/imagenes/analisis/DiagramaDiseño.svg"/>

</div>

---

## 3. Análisis de Casos de Uso

Partiendo de los casos de uso especificados en el Capítulo 3 y del modelo de dominio del Capítulo 2, se presentan a continuación los **diagramas de colaboración MVC** de cada caso de uso. En cada diagrama se distinguen dos tipos de relaciones:

- **Flechas continuas (`-->`)**: flujo de mensajes entre clases dentro de la colaboración.
- **Flechas discontinuas (`..>`)**: transiciones de navegación hacia otras colaboraciones o estados del sistema.

### Navegación Global — completarGestion()

Una vez iniciada la sesión, el sistema entra en el estado `:Sistema Disponible`, representado por la colaboración `completarGestion()`. La `VistaPrincipal` actúa como hub de navegación central, verificando la sesión activa a través del `ControladorNavegacion` y permitiendo al Administrador acceder a cualquiera de los módulos del sistema o cerrar la sesión.

<div align="center">

<img src="../../images/imagenes/analisis/analisisCompletarGestion.svg" width="85%"/>

</div>

---

### Prioridad 1 — Gestión de Sesión

El sistema restringe el acceso mediante autenticación. La `VistaSesion` recoge las credenciales del Administrador y las delega al `ControladorSesion`, que las valida contra el `UsuarioRepository` y crea una sesión activa. Al cerrar sesión, el `ControladorSesion` destruye el token y el sistema retorna al estado `:Sesión Cerrada`.

<div align="center">

<img src="../../images/imagenes/analisis/analisisGestionSesion.svg" width="70%"/>

</div>

---

### Prioridad 2 — Gestión de Entidades Académicas

Cada entidad académica sigue el mismo patrón de colaboración: una vista de lista presenta los registros existentes y navega mediante flechas discontinuas hacia las colaboraciones de creación, edición y eliminación. Los formularios recogen los datos del Administrador y los persisten a través del controlador y el repositorio correspondiente, retornando al listado una vez completada la operación.

#### Asignaturas

<div align="center">

<img src="../../images/imagenes/analisis/analisisAbrirAsignaturas.svg" width="70%"/>
<img src="../../images/imagenes/analisis/analisisAsignaturaFormulario.svg" width="70%"/>

</div>

#### Profesores

<div align="center">

<img src="../../images/imagenes/analisis/analisisAbrirProfesores.svg" width="70%"/>
<img src="../../images/imagenes/analisis/analisisProfesorFormulario.svg" width="70%"/>

</div>

#### Grados

<div align="center">

<img src="../../images/imagenes/analisis/analisisAbrirGrados.svg" width="70%"/>
<img src="../../images/imagenes/analisis/analisisGradoFormulario.svg" width="70%"/>

</div>

#### Aulas

<div align="center">

<img src="../../images/imagenes/analisis/analisisAbrirAulas.svg" width="70%"/>
<img src="../../images/imagenes/analisis/analisisAulaFormulario.svg" width="70%"/>

</div>

---

### Prioridad 3 — Gestión de Asignaciones

La gestión de asignaciones se articula en tres colaboraciones. El panel principal muestra las asignaturas pendientes de emparejamiento y navega hacia dos colaboraciones independientes: una para vincular un profesor a una asignatura y otra para vincular un aula. Cada asignación persiste inmediatamente en el repositorio, actualizando el estado de la asignatura.

<div align="center">

<img src="../../images/imagenes/analisis/analisisGestionarAsignaciones.svg" width="70%"/>

</div>

<div align="center">

<img src="../../images/imagenes/analisis/analisisAsignarProfesorAsignatura.svg" width="70%"/>
<img src="../../images/imagenes/analisis/analisisAsignarAulaAsignatura.svg" width="70%"/>

</div>

---

### Prioridad 4 — Generación del Horario

La generación del horario se articula en dos colaboraciones. La primera inicializa la cuadrícula interactiva y carga las asignaturas planificables desde el repositorio. La segunda gestiona el posicionamiento individual mediante *drag & drop*: el `ControladorHorario` delega en el `ValidadorHorario`, que invoca al `GestorConflictos` para comprobar la integridad del posicionamiento antes de confirmar la sesión docente y persistir el horario actualizado.

<div align="center">

<img src="../../images/imagenes/analisis/analisisGenerarHorario.svg" width="70%"/>

</div>

<div align="center">

<img src="../../images/imagenes/analisis/analisisPosicionarAsignatura.svg" width="70%"/>

</div>

---

### Prioridad 5 — Consulta del Horario

El `ControladorConsultaHorario` recupera el horario publicado del repositorio y lo proporciona a la `VistaHorario`, que lo presenta en forma de matriz estática con opciones de filtrado por Aula o Profesor. Desde esta colaboración es posible navegar de vuelta a la generación del horario o retornar al sistema principal.

<div align="center">

<img src="../../images/imagenes/analisis/analisisConsultarHorario.svg" width="70%"/>

</div>

---

## 4. Análisis y Diseño de Clases

### Identificación de clases

A partir del análisis de los casos de uso y del modelo de dominio existente, se identifican tres tipos de clases siguiendo el estereotipo MVC:

#### Clases Modelo

Se derivan directamente del modelo de dominio definido en el Capítulo 2, estudiando la descripción de los casos de uso y las entidades ya identificadas:

Dado que el alcance de esta iteración se limita al subsistema de Gestión de Horarios, las clases modelo se derivan únicamente de los casos de uso definidos en el Capítulo 3:

| Clase Modelo | Origen |
|:---|:---|
| `Horario` | Entidad central — contiene las sesiones docentes planificadas |
| `SesionDocente` | Representa una franja horaria asignada a una asignatura |
| `Asignatura` | Entidad base con atributos `codigo`, `nombre`, `creditos`, `curso` |
| `Profesor` | Entidad base con atributos `dni`, `nombre`, `apellidos`, `telefono`, `correo` |
| `Aula` | Entidad base con atributos `codigo`, `capacidad` |
| `Grado` | Entidad base con atributos `codigo`, `nombre` |
| `Semestre` | Agrupa el periodo académico del horario |
| `Usuario` | Gestiona las credenciales de acceso del Administrador |
| `Sesion` | Mantiene el estado de la sesión activa (`token`, `activa`) |

#### Clases Vista

Se define una clase de vista principal por cada ventana de interacción del actor humano (Administrador), representante de la ventana principal en la que el actor interactúa, y una clase de vista primitiva por cada entidad del modelo:

| Vista Principal | Vista Primitiva | Propósito |
|:---|:---|:---|
| `VistaSesion` | — | Autenticación del Administrador |
| `VistaAsignatura` | `FormularioAsignatura` | Listado y edición de asignaturas |
| `VistaProfesor` | `FormularioProfesor` | Listado y edición de profesores |
| `VistaGrado` | `FormularioGrado` | Listado y edición de grados |
| `VistaAula` | `FormularioAula` | Listado y edición de aulas |
| `VistaAsignaciones` | — | Panel de emparejamiento de recursos |
| `VistaHorario` | — | Cuadrícula de generación y consulta del horario |
| `VistaPrincipal` | — | Hub de navegación del sistema disponible |

#### Clases Controlador (1 por caso de uso base)

Se establece una clase controladora por cada caso de uso principal, responsable de manejar el control y la coordinación de su realización:

| Controlador | Caso de uso que realiza |
|:---|:---|
| `ControladorSesion` | `iniciarSesion()` / `cerrarSesion()` |
| `ControladorNavegacion` | `completarGestion()` |
| `ControladorAsignatura` | `abrirAsignaturas()` y CRUD asociado |
| `ControladorProfesor` | `abrirProfesores()` y CRUD asociado |
| `ControladorGrado` | `abrirGrados()` y CRUD asociado |
| `ControladorAula` | `abrirAulas()` y CRUD asociado |
| `ControladorAsignaciones` | `gestionarAsignaciones()`, `asignarProfesorAsignatura()`, `asignarAulaAsignatura()` |
| `ControladorHorario` | `generarHorario()` / `posicionarAsignatura()` |
| `ValidadorHorario` | Refinamiento de `ControladorHorario` para la validación del horario |
| `GestorConflictos` | Refinamiento de `ControladorHorario` para la detección de colisiones |
| `ControladorConsultaHorario` | `consultarHorario()` |

### Diagrama de Clases

Identificadas las clases, se trazan sus nombres, responsabilidades y relaciones en el diagrama de clases de diseño, articulado en torno al subsistema de Gestión de Horarios:

<div align="center">

<img src="../../images/imagenes/analisis/DiagramaDiseñov2.svg"/>

</div>

Las relaciones identificadas entre clases son las siguientes:

| Tipo de relación | Ejemplo |
|:---|:---|
| **Asociación** | `VistaHorario --> ControladorHorario`; `ControladorHorario --> Horario` |
| **Composición** | `Horario *-- SesionDocente` (el horario se compone de múltiples sesiones docentes) |
| **Dependencia** | `ControladorHorario --> ValidadorHorario --> GestorConflictos` |
| **Agregación** | `Grado "1" o-- "*" Asignatura` (un grado agrupa varias asignaturas) |

---

## 5. Análisis de Paquetes

El alcance de esta iteración comprende un único paquete de diseño: `gestionHorarios`. Este paquete agrupa todas las clases Vista, Controlador y Modelo derivadas de los casos de uso del Capítulo 3, organizadas en torno a las cinco responsabilidades funcionales del sistema:

| Grupo funcional | Clases principales |
|:---|:---|
| Sesión | `VistaSesion`, `ControladorSesion`, `UsuarioRepository`, `Usuario`, `Sesion` |
| Navegación | `VistaPrincipal`, `ControladorNavegacion` |
| Entidades base | `VistaAsignatura/Profesor/Grado/Aula`, sus Formularios, Controladores y Repositorios |
| Asignaciones | `VistaAsignaciones`, `ControladorAsignaciones` |
| Horario | `VistaHorario`, `ControladorHorario`, `ValidadorHorario`, `GestorConflictos`, `ControladorConsultaHorario`, `HorarioRepository`, `Horario`, `SesionDocente` |

El paquete `gestionHorarios` no tiene dependencias externas en esta iteración, lo que garantiza una arquitectura coherente con los principios de **bajo acoplamiento** y **alta cohesión**. Los subsistemas de Gestión de Reservas y Gestión de Incidencias, identificados en el modelo de dominio, se incorporarán en iteraciones futuras como paquetes independientes que extenderán el núcleo sin modificarlo.

---

## 6. El Sistema desde la Perspectiva del Jefe de Proyecto

### ¿Por qué parte comenzarías, continuarías y terminarías la producción?

El orden de implementación se determina directamente a partir de la **tabla de priorización de casos de uso** establecida en el Capítulo 3. Se inicia con la gestión de sesión como punto de entrada obligatorio, se continúa con el CRUD de entidades base —sin las cuales no puede operar ningún proceso posterior— y se avanza progresivamente hacia la funcionalidad de mayor complejidad y riesgo arquitectónico: la generación del horario con validación de conflictos en tiempo real.

| Orden | Bloque funcional | Justificación |
|:---:|:---|:---|
| 1 | Gestión de sesión | Prerequisito global — sin autenticación no es posible acceder a ningún módulo |
| 2 | CRUD de entidades base (Asignatura, Profesor, Grado, Aula) | Datos fundamentales sin los cuales no puede operar ningún proceso posterior |
| 3 | Gestión de asignaciones | Vincula las entidades base y genera las tarjetas listas para planificar |
| 4 | Generación del horario | Núcleo funcional de mayor valor y mayor riesgo técnico |
| 5 | Consulta del horario | Funcionalidad de lectura que cierra el flujo principal |
| 6 | Eliminación de registros | Operaciones destructivas de menor criticidad funcional |

### ¿Qué medidas aplicarías para obtener la calidad del software adecuada?

Para garantizar la calidad del software y facilitar la depuración de errores y la mantenibilidad correctiva, perfectiva y adaptativa, se aplican las siguientes medidas con **trazabilidad** como hilo conductor:

| Medida | Objetivo |
|:---|:---|
| **Análisis de la arquitectura** | Verificar el bajo acoplamiento entre subsistemas y la alta cohesión interna de cada paquete. |
| **Análisis de casos de uso** | Revisión de los diagramas de colaboración para detectar responsabilidades mal asignadas entre Vista, Controlador y Modelo. |
| **Análisis de clases** | Revisión periódica del diagrama de clases para eliminar duplicidades y detectar violaciones del principio de responsabilidad única. |
| **Análisis de paquetes** | Verificación de ausencia de dependencias circulares entre subsistemas. |
| **Trazabilidad** | Cada clase y método debe poder rastrearse hasta el caso de uso que lo origina, garantizando que ninguna decisión de diseño carece de justificación en los requisitos. |

### ¿Cómo organizarías las tareas de producción?

Siendo un proyecto de desarrollo individual, las actividades se abordan de forma secuencial siguiendo el orden de prioridades establecido. Cada actividad se estima en un rango de 2 a 20 horas, reservando el límite superior para la funcionalidad de mayor complejidad técnica:

| Actividad | Estimación |
|:---|:---:|
| Gestión de sesión (`iniciarSesion` / `cerrarSesion`) | 4 h |
| CRUD Asignaturas | 6 h |
| CRUD Profesores | 6 h |
| CRUD Grados | 4 h |
| CRUD Aulas | 6 h |
| Gestión de asignaciones | 8 h |
| Generación del horario (drag & drop + validación de conflictos) | 20 h |
| Consulta del horario | 4 h |
| Eliminación de registros (todas las entidades) | 6 h |
| **Total estimado** | **64 h** |

---

## 7. Conclusión del capítulo

La disciplina de análisis y diseño establece el puente entre los requisitos formalizados en el capítulo anterior y la implementación del sistema. El alcance de esta iteración se delimita al subsistema de Gestión de Horarios, que concentra todos los casos de uso definidos en el Capítulo 3. La adopción del patrón MVC garantiza una separación clara de responsabilidades y facilita la evolución del sistema hacia las iteraciones futuras, donde los subsistemas de Gestión de Reservas y Gestión de Incidencias se incorporarán como extensiones independientes. Los diagramas de colaboración, derivados sistemáticamente de cada caso de uso priorizado, proporcionan una trazabilidad directa entre requisitos y diseño, asegurando que cada clase y cada mensaje responden a una necesidad funcional identificada. La estimación de tareas orienta el desarrollo individual de forma ordenada hacia la implementación iterativa descrita en el siguiente capítulo.

# Capítulo 1

---

## Introducción, escenario y marco teórico

En el contexto actual de las instituciones universitarias, la gestión eficiente de los recursos académicos constituye un elemento fundamental para garantizar el correcto funcionamiento de la actividad docente. Entre estos recursos destacan la planificación de horarios, la asignación de aulas y la organización de sesiones docentes, procesos que implican una elevada complejidad debido a la gran cantidad de variables y restricciones involucradas.

En particular, la elaboración de horarios académicos en universidades supone un problema organizativo relevante. Este proceso debe tener en cuenta múltiples factores, tales como la disponibilidad del profesorado, la asignación de aulas, la distribución de asignaturas por grado y semestre, así como la evitación de conflictos entre sesiones simultáneas. Tradicionalmente, estas tareas se han realizado de forma manual o mediante herramientas ofimáticas como hojas de cálculo, lo que conlleva una elevada probabilidad de errores, redundancias y dificultades de mantenimiento.

Desde un punto de vista teórico, este tipo de problema se enmarca dentro de los denominados **problemas de planificación y asignación de recursos** <sup>[1](#burke2002)</sup>, ampliamente estudiados en el ámbito de la ingeniería del software y la investigación operativa. Estos problemas se caracterizan por la necesidad de optimizar la asignación de recursos limitados bajo un conjunto de restricciones.

En este contexto, surge la necesidad de desarrollar soluciones informáticas que permitan automatizar y optimizar estos procesos, facilitando la gestión académica y reduciendo la carga operativa del personal encargado de estas tareas.

---

## Estado del arte

Actualmente, existen diversas soluciones orientadas a la gestión académica<sup>[2](#Hassan2011)</sup> y a la generación de horarios universitarios. Estas soluciones abarcan desde herramientas básicas hasta sistemas complejos integrados en plataformas de gestión universitaria.

Por un lado, se encuentran herramientas genéricas como hojas de cálculo, que permiten una gestión manual de horarios. Aunque son ampliamente utilizadas debido a su accesibilidad y flexibilidad, presentan limitaciones significativas en términos de escalabilidad, control de errores y automatización.

Por otro lado, existen sistemas de planificación académica más avanzados, integrados en plataformas ERP educativas, que permiten gestionar horarios, recursos y actividades docentes de forma centralizada. Estos sistemas suelen incorporar funcionalidades como generación automática de horarios, gestión de conflictos y asignación de recursos. Sin embargo, presentan inconvenientes como su elevado coste de implementación, complejidad de uso y escasa adaptabilidad a contextos específicos.

Asimismo, se han desarrollado aplicaciones específicas basadas en algoritmos de optimización, como métodos heurísticos o algoritmos genéticos, orientadas a resolver el problema de generación de horarios. Estas soluciones ofrecen buenos resultados en términos de eficiencia, pero requieren un alto grado de especialización técnica y no siempre se integran fácilmente en entornos reales.

En consecuencia, aunque existen múltiples alternativas, ninguna de ellas se adapta completamente a las necesidades específicas de determinados entornos universitarios, especialmente en contextos donde se requiere una solución personalizada, flexible y de fácil integración.

---

## Justificación de la propuesta

A pesar de la existencia de herramientas y sistemas para la gestión de horarios académicos, muchas instituciones continúan enfrentándose a dificultades en este ámbito. Las soluciones genéricas no siempre se ajustan a los requisitos específicos de cada universidad, mientras que las soluciones comerciales pueden resultar costosas y complejas de implantar.

En el caso concreto del departamento de ordenación académica, la necesidad de gestionar de forma eficiente horarios, sesiones docentes, exámenes y reservas de aulas requiere una herramienta adaptada a su flujo de trabajo específico. La falta de integración entre distintas funcionalidades y la dependencia de procesos manuales incrementan la probabilidad de errores y reducen la eficiencia operativa.

Por tanto, se justifica el desarrollo de un sistema informático específico que permita abordar estas limitaciones, proporcionando una solución adaptada al contexto concreto, que facilite la gestión centralizada de la información y mejore la eficiencia en la planificación académica.

---

## Propuesta de solución

Con el fin de dar respuesta a la problemática descrita, se propone el desarrollo de un **sistema informático para la construcción y gestión de horarios académicos en una universidad**.

Este sistema estará orientado al departamento de ordenación académica y permitirá:

- La construcción y gestión de horarios académicos.
- La planificación de sesiones docentes.
- La organización de exámenes.
- La gestión de reservas de aulas.
- El registro y seguimiento de incidencias.

La solución propuesta busca integrar todas estas funcionalidades en una única plataforma, facilitando la gestión de la información y permitiendo una mayor automatización de los procesos. Asimismo, se contempla la posibilidad de incorporar mecanismos que permitan optimizar la generación de horarios, teniendo en cuenta las restricciones existentes.

---

## Hipótesis

El desarrollo de un sistema informático específico para la construcción y gestión de horarios académicos permitirá mejorar la eficiencia en la planificación docente, reducir errores derivados de la gestión manual y optimizar el uso de los recursos académicos disponibles.

---

## Objetivos

### Objetivo general

Desarrollar un sistema informático para la construcción y gestión de horarios académicos que permita optimizar la planificación docente, teniendo en cuenta las restricciones propias del entorno universitario y las soluciones existentes en el estado del arte.

### Objetivos específicos

1. Ejecutar la disciplina de requisitos para identificar las necesidades del sistema y definir sus funcionalidades principales.
2. Realizar el análisis y diseño del sistema, incluyendo el modelo del dominio, la arquitectura y los componentes necesarios para su implementación.
3. Desarrollar una primera iteración del sistema en forma de producto mínimo viable, que permita validar los requisitos y el diseño propuesto.

---

## Metodología

Para el desarrollo del presente trabajo de fin de grado se seguirá una metodología basada en el **Rational Unified Process (RUP)**<sup>[3](#mmasias)</sup>, la cual permite estructurar el desarrollo del software en distintas fases iterativas e incrementales.

Esta metodología se compone de las siguientes disciplinas principales:

- **Requisitos**, donde se identifican y documentan las necesidades del sistema.
- **Análisis y diseño**, donde se define la arquitectura y el modelo del sistema.
- **Implementación**, donde se desarrolla la solución software.
- **Pruebas**, donde se valida el correcto funcionamiento del sistema.

El enfoque iterativo de RUP permite desarrollar el sistema de forma progresiva, facilitando la validación continua de los resultados y la adaptación a posibles cambios en los requisitos.


## Referencias

- <a id="burke2002"></a> Petrovic, S., & Burke, E. K. (2004). University Timetabling ([ver documento](https://www.researchgate.net/profile/Sanja-Petrovic-2/publication/235439172_University_timetabling/links/54915a9e0cf2d1800d87f2eb/University-timetabling.pdf)).
- <a id="Hassan2011"></a> Hassan, W. (2011). Usability of academic management system. ([ver documento](https://d1wqtxts1xzle7.cloudfront.net/53708966/Usability_of_Academic_Management_System20170629-3068-qnjiwr-libre.pdf?1498799448=&response-content-disposition=inline%3B+filename%3DUsability_of_Academic_Management_System.pdf&Expires=1773870227&Signature=HQ5IT~ThSCOZpiq8moKTbU78qSJszeZ3zFYqemKiZcrci8jdcf8j5UYQEb6rX3jMLIYfnlgeO1y~TI-Bpr90S-004f6~afU-dQSspYzrGTTZsxxEwWR1Yz7A4KTXP66e798lqd3I4vr2A3I2knHyl1oT0muILnTaTlFcqL~dD~Eu0SWLhI~KqHQwqIybf1Mjl5ShBou9F59NdBzfNnmwai1Mm-3w-ikZ12k9caEBau2NV43HNNiJwRyqJo8tmA9SpuUbxULvxvzZCtE8JR4PFUE53keNci6FJnc9Hndsiu4S3BZeImqbV5BrIS9xokyw91z2rp1oiDl4EbkVYrHbPw__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA)).
- <a id="mmasias"></a> M. Masias. (2026). RUP: Proceso Unificado de Desarrollo ([ver documento](https://github.com/mmasias/idsw1/blob/main/temario/00002-rup.md)).

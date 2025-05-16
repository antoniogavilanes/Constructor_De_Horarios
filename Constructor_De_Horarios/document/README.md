# Constructor de Horarios

# Objetivo General del Sistema
<div align=justify>
    El propósito del sistema es ofrecer una herramienta visual e interactiva para la construcción y gestión de horarios académicos. Esta herramienta debe proporcionar dos vistas principales:
    <ol>
        <li><b>Vista por grados:</b> muestra las asignaturas asignadas a cada grado académico.</li>
        <li><b>Vista por profesores:</b> muestra las asignaturas que imparte cada docente.</li>
    </ol>
    El sistema debe permitir la asignación de clases mediante una interfaz de <b>arrastrar y soltar</b> entre las vistas. Si un usuario arrastra una asignatura desde un profesor hacia un horario de grado, esta asignación deberá aplicarse automáticamente a todos los grados que compartan dicha asignatura. En caso de que no haya coincidencias válidas, el sistema deberá emitir una alerta indicando el conflicto.
</div>

# Restricciones y Validaciones
<div align=justify>
    <ul>
        <li>El sistema debe <b>alertar cuando exista un solapamiento</b> entre:</li>
        <ul>
            <li>Dos asignaturas <b>obligatorias</b></li>
            <li>Una asignatura <b>obligatoria y una optativa.</b></li>
        </ul>
        <li>Solo las asignaturas optativas pueden solaparse entre sí sin generar conflicto.</li>
        <li>Solo existirá un usuario con un <b>único rol</b>. Se asume que el sistema será utilizado únicamente por el encargado de gestionar los horarios.</li>
        <li>Aunque los profesores ya tienen asignaturas asignadas inicialmente, debe permitirse <b>reasignar dichas materias a otros profesores</b> desde la interfaz del sistema.</li>
    </ul>
</div>

# Datos de Entrada
<div align=justify>
    Inicialmente, el sistema trabajará a partir de <b>hojas de cálculo preexistentes</b> como fuente de datos (por ejemplo, archivos Excel o Google Sheets). Estos documentos contienen los registros necesarios sobre profesores, grados y asignaturas, y se utilizarán como punto de partida para alimentar el sistema.
    Actualmente se contempla la posibilidad de <b>leer y transformar estos datos en archivos JSON</b>, lo cual permitirá mayor flexibilidad para integrarlos con el sistema sin necesidad inmediata de una base de datos.
    <b>Importante:</b> En esta etapa del proyecto, no se implementará una base de datos. Sin embargo, se mantiene abierta la opción de integrarla más adelante si se identifica que:
    <ul>
        <li>La complejidad del manejo de datos lo requiere.</li>
        <li>La escalabilidad o rendimiento del sistema se ve comprometida.</li>
        <li>Se desea persistencia más robusta o consultas más dinámicas.</li>
    </ul>
    Esta decisión se tomará durante el proceso de desarrollo, según las necesidades reales que surjan durante las pruebas iniciales.
</div>
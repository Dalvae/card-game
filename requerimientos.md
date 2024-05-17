# Desafío de Programación: Juego de Naipes

## Objetivos Generales

1. **Resolución de Problemas**: Aborda el problema de manera estructurada y eficiente. Considera todos los aspectos del problema y busca soluciones óptimas.
2. **Buenas Prácticas de Programación**: Escribe código con énfasis en legibilidad, mantenibilidad, eficiencia y reutilización de componentes.
3. **Pensamiento Lógico**:
   - **Desglose del Problema**: Analiza el problema en partes más pequeñas. Divide tareas complejas en pasos manejables.
   - **Algoritmos y Estructuras de Datos**: Utiliza algoritmos y estructuras de datos adecuados. Considera la eficiencia y escalabilidad.

> **Nota Importante**: Aunque el enunciado del problema puede no solicitar explícitamente ciertos aspectos, esperamos que apliques buenas prácticas en todos los aspectos.

## Requisitos del Proyecto

- Repositorio en Git
- Uso de React, Vite y Tailwind CSS

## Problema

### Descripción

Construir un juego sencillo de naipes con las siguientes características:

- **Figura (palo, pinta)**: Corazón, diamante, pica o trébol (con su color correspondiente: rojo o negro).
- **Valor**: A, 2, 3...10, J, Q, K.

La figura y el valor deben posicionarse en las esquinas del naipe, y la figura debe repetirse en el centro del naipe.

### Interfaz

Presentar tres barajas (torres) distribuidas horizontalmente en la pantalla (izquierda, centro y derecha):

- La baraja de la izquierda tendrá un set inicial de cartas precargadas.
- Las torres del centro y derecha estarán inicialmente vacías.
- Cada baraja mostrará solo su primer naipe.

### Comportamiento

- Al hacer click en un naipe, este debe moverse a la baraja de la derecha.
- Si el naipe se encuentra en la baraja derecha, no debe ocurrir nada.
- Ejemplo de comportamiento:
  - Click en el primer naipe de la baraja izquierda (A de diamante) -> se mueve a la baraja del centro, mostrando el siguiente naipe (A de pica) en la baraja izquierda.
  - Click en el nuevo naipe mostrado (A de pica) -> se mueve a la baraja del centro, ocultando el naipe anterior (A de diamante) y mostrando un nuevo naipe en la baraja izquierda (A de corazón).
  - Click en el naipe actual del centro (A de pica) -> se mueve a la baraja de la derecha, exponiendo el naipe que llegó primero a la baraja del centro (A de diamante).
  - Click en el naipe restante del centro (A de diamante) -> se posiciona en la cima de la baraja derecha, sobreponiéndose al A de pica y dejando la baraja del centro vacía.

### Set Inicial

El set inicial de cartas en la baraja izquierda puede ser cualquier conjunto de cartas predefinido, que no necesariamente debe seguir un orden específico.

## ¡LevelUp! (Opcional)

Si quieres un desafío adicional:

1. **Configura un set inicial específico**: Utiliza los naipes de Pica, Diamante y Corazón con los valores A, 2, 3 y 4 para cada figura.
2. Agrega un botón que reinicie el juego con un orden de naipes aleatorio en la primera baraja (izquierda).
3. Al hacer click en un naipe de la tercera baraja (derecha), envíalo a la baraja inicial (izquierda).
4. El botón de reinicio también debe seleccionar un valor al azar (A, 2, 3 o 4) y mostrarlo en pantalla.
5. Si el usuario logra poner dicho valor en la cima de cada baraja, gana el juego (se muestra un mensaje al usuario).

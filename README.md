# Juego de carta para entrevista tecnica HANU

Este proyecto es un juego de cartas desarrollado con React en Vite como parte de un desafío técnico para Hanu. El objetivo del juego es lograr que las tres pilas de cartas tengan la misma carta.
[Deploy](https://card-game-black.vercel.app/)

## Tecnologías Utilizadas

- React
- Vite
- Tailwind CSS

## Estructura del Proyecto

- `main` que es encargada de mostrar la primera parte de los requerimientos
- `niveldos` que es encargada de mostrar la segunda parte de los requerimientos **actualmente en produccion**
- `test-array` una rama con 2580 cartas y test automatizados de rendimientos de los metodos de array. pnpm run test para ejecutar 20 test seguidos que son escritos a un json. (paciencia)
- `test-stack` lo mismo que test-array pero especializado en los test de stacks,

> **Advertencia:** Las ramas `test-array` y `test-stack` son exclusivamente para realizar pruebas de rendimiento y no deben ser ejecutadas en el navegador. Ejecutar con `pnpm run test` puede tomar algo de tiempo.

## Análisis de Rendimiento

El archivo `Performance_Analisis.ipynb` detalla una comparación de rendimiento entre estructuras de datos de array y stack. Se encontró que, aunque el stack es más adecuado para la lógica del juego, presenta desafíos de rendimiento debido a la inmutabilidad en React.React optimiza las actualizaciones de la interfaz de usuario basándose en la inmutabilidad de los datos, por lo que modificar directamente un objeto mutable como un stack no desencadena un re-renderizado. Se implementó la clonación de stacks como solución, pero se exploraron alternativas como `useMemo` y estados derivados. Otra solucion puede ser usar la libreria de hooks de `rooks` y utilizar `useStackstate` para provocar re rendrización, pero los requerimientos señalan no usar librerias y fin de cuenta lo que hace esta libreria es tambien clonar el objeto.

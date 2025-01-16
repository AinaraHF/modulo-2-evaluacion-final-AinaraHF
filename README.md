![Adalab](https://beta.adalab.es/resources/images/adalab-logo-155x61-bg-white.png)

# Evaluación 2

Este proyecto trata de  desarrollar una aplicación web de búsqueda de series de anime, que nos permite marcar las series como favoritas y guardarlas en local storage, para la evaluación del segundo módulo del bootcamp de Programadora web de Adalab.

Usando lo aprendido en clase tanto en el primer como en el segundo módulo, he seguido las directrices del enunciado proporcionado por la profesora para el desarrollo de esta aplicación web. 

Los pasos seguidos para realizar este ejercicio fueron los siguientes:

1. Crear una estructura básica que contara con un input, un botón de búsqueda y un listado de resultados.

2. Escuchar un evento sobre el botón de búsqueda que permitiera, en base a la información proporcionada en el input y utilizando el API abierto de Jikan, realizar una búsqueda de series de anime. Y que en dicha búsqueda aparezca tanto la imagen como el título de la misma.

3. Escuchar eventos sobre todos los resultados de la búsqueda, de tal forma que al clicar en uno este se seleccione como favorito y se agregue a otro listado a la izquierda bajo la columna de favoritos. 

4. Hacer que el listado de favoritos permanezca ahí incluso al refrescar la página, para ello se ha utilizado el LocalStorage.


## Guía de inicio rápido

> **NOTA:** Necesitas tener instalado [Node JS](https://nodejs.org/) con una versión superior a la 14:

1. **Abre una terminal** en la carpeta raíz de tu repositorio.
2. **Instala las dependencias** locales ejecutando en la terminal el comando:

```bash
npm install
```

### Pasos para arrancar el proyecto:

Una vez hemos instalado las dependencias, vamos a arrancar el proyecto ejecutando uno de los siguientes comandos:

```bash
npm run dev
```
o

```bash
npm start
```

Este comando:

- **Abre una ventana de Chrome y muestra la página web**, al igual que hace el plugin de VS Code Live Server (Go live).





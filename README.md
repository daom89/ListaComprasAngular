# ListaCompra

Este proyecto fue desarrollado por los instructores [Diego Alonso Ojeda Medina](https://github.com/daom89) y [Lili Ana Sandoval Pineda](https://github.com/lilianasandoval) para el Diplomado virtual en desarrollo web Full Stack con la Universidad de Santander.

## Documentacion del Proyecto

### Instalación
1. Descargar e Instalar **Node** con las herramientas de compilacion [Descargar Node](https://nodejs.org/es/)
2. Instalar TypeScript:
  ```node
npm install -g typescript
  ```
3. Instalar Angular:
  ```node
npm install -g @angular/cli
  ```
4. Instalar Visual Studio Code con las extensiones necesarias:
    1. [Terminal](https://marketplace.visualstudio.com/items?itemName=formulahendry.terminal)
    2. [Angular Essentials (Version 12)](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials)
    3. [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
    4. [Angular Schematics](https://marketplace.visualstudio.com/items?itemName=cyrilletuzi.angular-schematics)
5. Creamos el proyecto de angular desde consola:
  ```node
ng new ListaComprasAngular
  ```
    Si se esta clonando el repositorio ejecutar:
  ```node
npm install
  ```
6. Ejecutar proyecto: 
  ```node
ng serve -o
  ```
7. [Crear una cuenta en Firebase](https://accounts.google.com/signup/v2/webcreateaccount?hl=es-419&flowName=GlifWebSi)
8. [Crear un proyecto en firebase](https://clientes.zetly.com/index.php/knowledgebase/23/Como-Crear-un-Nuevo-Proyecto-de-Firebase.html)
9. Instalar en la herramienta [CLI de firebase](https://www.npmjs.com/package/firebase-tools):
  ```node
npm install -g firebase-tools
  ```
10. Iniciar sesion en firebase desde la consola [**Documentacion CLI**](https://firebase.google.com/docs/cli?hl=es-419):
  ```node
firebase login
  ```
11. Vincular el proyecto de angular con firebase instalando paquetes necesarios y enlazando el proyecto local con el creado en firebase:
  ```node
ng add @angular/fire
  ```
12. Desplegar los archivos en el servidor por medio del comando:
  ```node
ng deploy
  ```
13. Agregar paquete de [Angular Material](https://material.angular.io/) para manejar este framework para la interfaz:
  ```node
ng add @angular/material
  ```
14. Generar Clase, Servicio y Componente:
  ```node
ng g class modelos/Producto --type=model --skipTests=true
ng g service servicios/Producto --skipTests=true
ng g c componentes/producto/formProducto --skipTests=true
  ```
15. Desarrollo de los componentes consultar el codigo fuente en este repositorio.

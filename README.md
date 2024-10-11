```markdown
# TODO LIST BACKEND

Bienvenido a la instalación del RestFull Api TODO-LIST

## Primeros Pasos

### 1. Clonar el Repositorio desde Github

```bash
https://github.com/tapiagarrido/todo-list-back.git
```

### 2. Acceder a la Carpeta `todo-list-back`

```bash
cd todo-list-back
```

### 3. Descargar Dependencias

```bash
npm install
```

### 4. Generar las Variables de Entorno

```bash
cp .env.template .env
```
#### 5. cersiorarse de que las variables esten acordes a su base de datos, si no presenta una de manera local, declare las variables db_name, password de ususario, nombre de usuario y el puerto de su db y luego en la raiz del proyecto ejecute (si tiene instalado docker y docker compose)

```bash
sudo docker compose up
```

### 6. el proyecto esta creado con typescript, puede utilizarlo de manera directa aplicando

```bash
npm run dev
```
lo que iniciara el proyecto y poblara la base de datos; 
es recomendable que ejecute el build y utilice el proyecto de manera productiva

```bash
tsc
```
y luego 

```bash
npm run start
```
## Ejecución de la API
si todo sale bien, esta listo para utilizar el proyecto; no olvide configurar de manera adecuada el whitelist si va a autilizar el cliente o no podra conectarse por seguridad

## Contacto

Para cualquier duda o consulta, por favor contacta con el equipo de desarrollo.


```

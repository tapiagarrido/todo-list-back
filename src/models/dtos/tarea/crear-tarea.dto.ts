export class CrearTareaDto {
    private constructor(
        public readonly titulo: string,
        public readonly descripcion: string,
        public readonly completada: boolean,
        public readonly usuarioId?: string
    ) { }

    /*
     * Este metodo nos permite verificar el estado de los datos mas relevantes antes de hacer una peticion a la base de datos y que esta pueda encontrar errores, nos evitamos una carga de recursos innecesarias. 
     */
    static create(object: { [key: string]: any }): [string?, CrearTareaDto?] {
        const { titulo, descripcion, completada, usuarioId } = object;

        if (!titulo) return ['Debe ingresar el título de la tarea'];
        if (typeof titulo !== 'string') return ['El título debe ser una cadena de texto'];

        if (!descripcion) return ['Debes agregar una descripción'];
        if (typeof descripcion !== 'string') return ['La descripción debe ser una cadena de texto'];

        if (typeof completada !== 'boolean') return ['El estado de completada debe ser un valor booleano'];

        if (usuarioId && typeof usuarioId !== 'string') return ['El ID de usuario debe ser una cadena de texto'];

        return [undefined, new CrearTareaDto(titulo, descripcion, completada, usuarioId)];
    }
}

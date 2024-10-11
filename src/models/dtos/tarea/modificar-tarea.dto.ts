export class ModificarTareaDto {
    private constructor(
        public readonly id: number,
        public readonly titulo: string,
        public readonly descripcion: string,
        public readonly completada?: boolean
    ) { }

    static create(object: { [key: string]: any }): [string?, ModificarTareaDto?] {
        const { id, titulo, descripcion, completada } = object;

        if (!titulo) return ['Debe ingresar el título de la tarea'];
        if (typeof titulo !== 'string') return ['El título debe ser una cadena de texto'];

        if (!descripcion) return ['Debe agregar una descripción'];
        if (typeof descripcion !== 'string') return ['La descripción debe ser una cadena de texto'];

        /*
        if (completada !== undefined && typeof completada !== 'boolean') {
            return ['El estado de completada debe ser un valor booleano'];
        }
        */

        return [undefined, new ModificarTareaDto(id, titulo, descripcion, completada)];
    }
}

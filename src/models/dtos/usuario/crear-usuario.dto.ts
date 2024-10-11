export class CrearUsuarioDto {

    private constructor(
        public readonly username:string,
        public readonly nombre: string,
        public readonly correo: number,
        public readonly password: string
    ) { }

    static create(object: { [key: string]: any }): [string?, CrearUsuarioDto?] {
        const {username, nombre, correo, password } = object;

        if(!username) return ['Debe ingresar un nick de usuario'];
        if (!nombre) return ['El nombre es obligatorio'];
        if (!correo) return ['El correo es obligatorio'];
        if (!password) return ['El password es obligatorio'];

        return [undefined, new CrearUsuarioDto(username,nombre, correo, password)];
    }
}
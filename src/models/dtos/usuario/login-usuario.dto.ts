
export class LoginUsuarioDto {

    private constructor(
        public readonly correo: string,
        public readonly password: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, LoginUsuarioDto?] {

        const { correo, password } = object;

        if (!correo) return ["No se encuentra el correo"];
        if (!password) return ["No se encuentra la contraseña"];

        return [undefined, new LoginUsuarioDto(correo, password)]
    }
}
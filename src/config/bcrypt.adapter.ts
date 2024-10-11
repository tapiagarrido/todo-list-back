import { compareSync, genSalt, genSaltSync, hashSync } from "bcryptjs"

/*
 * Adaptador de generador de hash para el pass 
 */
export const bcryptAdapter = {

    hash: (password: string) => {

        const salt = genSaltSync();
        return hashSync(password, salt);
    },

    compare: (password: string, hashed: string) => {

        return compareSync(password, hashed);
    }
}
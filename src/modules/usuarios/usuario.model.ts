import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"


@Entity("usuarios")
export class UsuarioModel {
    
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column()
    email: string
    
    @Column()
    senha: string
    
    @Column()
    ativo: boolean
    
    @CreateDateColumn({name: "dt_cadastro"})
    dataCadastro: Date
}
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Sexo } from "./enums/sexo.enum"
import { EstadoCivil } from "./enums/estado-civil.enum"
import { UsuarioModel } from "../usuarios/usuario.model"


@Entity("candidatos")
export class CandidatoModel {
    
    @PrimaryGeneratedColumn("uuid")
    id: string
    
    @Column()
    cpf: string
    
    @Column({ name: "dt_nascimento"})
    dataNascimento: Date
    
    @Column({ name: "nome" })
    nomeCompleto:string

    @Column({
        type: "enum",
        enum: "Sexo",
        default: Sexo.OUTROS
    })
    sexo: Sexo
    
    @Column({
        name: "est_civil",
        type: "enum",
        enum: EstadoCivil,
        default: EstadoCivil.SOLTEIRO
    })
    estadoCivil: EstadoCivil

    @OneToOne(() => UsuarioModel)
    @JoinColumn({name: "usuario_id"})
    usuario: UsuarioModel
    
}
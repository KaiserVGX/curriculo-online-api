import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CandidatoModel } from '../candidato/candidato.model';

export enum TipoEscolaridade {
  FUNDAMENTAL = 'FUNDAMENTAL',
  MEDIO = 'MEDIO',
  SUPERIOR = 'SUPERIOR',
  POS_GRADUADO = 'POS',
}

@Entity('escolaridade')
export class EscolaridadeModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nm_instituicao' })
  nomeInstituicao: string;

  @Column({ name: 'nm_curso' })
  nomeCurso: string;

  @Column({
    name: 'tipo',
    type: 'enum',
    enum: TipoEscolaridade,
    default: TipoEscolaridade.MEDIO,
  })
  tipoEscolaridade: TipoEscolaridade;

  @Column()
  concluido: boolean;

  @Column({ name: 'ano_inicio', type: 'integer' })
  anoInicio: number;

  @Column({ name: 'ano_fim', type: 'integer' })
  anoFim: number;

  @ManyToOne(() => CandidatoModel)
  @JoinColumn({ name: 'candidato_id' })
  candidato: CandidatoModel;
}
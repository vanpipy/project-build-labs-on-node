import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column('boolean', { default: false })
  isActive: boolean

  @Column()
  phone: string

  @Column()
  email: string
}

import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity('feedback')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  phone: string

  @Column()
  email: string

  @Column()
  phoneCode: string

  @Column({ default: '' })
  availableOn: string

  @Column({ default: '' })
  tellMeAboutYou: string
}

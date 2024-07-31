import { expect, describe, it, beforeEach} from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials'


let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase



describe('Authenticate Use case', ()=> {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async ()=>{
     usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    const {user} = await sut.execute({
      email: 'johndoe@example.com',
      password :'123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong error', async ()=>{

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    await expect (() =>
      sut.execute({
      email: 'johndoe2@example.com',
      password :'123456'
    }),
  ) .rejects.toBeInstanceOf(InvalidCredentialsError)

   
  })

  it('should not be able to authenticate with wrong password', async ()=>{
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    expect (() =>
      sut.execute({
      email: 'johndoe@example.com',
      password :'123457'
    }),
  ) .rejects.toBeInstanceOf(InvalidCredentialsError)

   
  })

  
    
})
import { expect, describe, it, beforeEach} from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut : RegisterUseCase

describe('Register use case', async ()=> {
  beforeEach(()=>{
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async ()=>{
    

    const {user} = await sut.execute({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      password :'123456'
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async ()=>{
    const email = 'johdoe@example.com'

    await sut.execute({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      password :'123456'
    })

    await expect (()=>
      sut.execute({
        name: 'Jonh Doe',
        email: 'johndoe@example.com',
        password :'123456'
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)

    
  })

  it('should be able to register', async ()=>{
    const {user} = await sut.execute({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      password :'123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
import { expect, describe, it, beforeEach} from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials'
import { GetUserProfileUseCase } from './get-user-profile'

let usersRepository: InMemoryUsersRepository
let sut : GetUserProfileUseCase

describe('Authenticate Use case', ()=> {
  beforeEach(()=>{
    const usersRepository = new InMemoryUsersRepository()
    const sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be ble to get user profile', async ()=>{
    const createdUser =  await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      userId: createdUser.id
    })

    expect(user.name).toEqual('john doe')
  })

  it('should not be able to get user profile with wrong id', async ()=>{

    expect (()=>
      sut.execute({
        userId: 'non-existing-id'
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
   
  })


  
    
})
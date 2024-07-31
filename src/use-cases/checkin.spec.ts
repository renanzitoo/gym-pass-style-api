import { expect, describe, it, beforeEach} from 'vitest'
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-checkins-repository'
import { CheckInUseCase } from './checkin'

let checkInsRepository: InMemoryCheckInsRepository
let sut : CheckInUseCase

describe('Register use case', async ()=> {
  beforeEach(()=>{
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })

  it('should be able to check in', async ()=>{
    

    const {checkIn} = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

})
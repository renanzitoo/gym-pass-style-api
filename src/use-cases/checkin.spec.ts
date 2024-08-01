import { expect, describe, it, beforeEach, afterEach,  vi} from 'vitest'
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-checkins-repository'
import { CheckInUseCase } from './checkin'

let checkInsRepository: InMemoryCheckInsRepository
let sut : CheckInUseCase

describe('Register use case', async ()=> {
  beforeEach(()=>{
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(()=>{
    vi.useRealTimers()
  })

  it('should be able to check in', async ()=>{
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    const {checkIn} = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async ()=>{
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await expect(()=> sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async ()=>{
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

    const {checkIn}= await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

})
import {FastifyRequest, FastifyReply} from 'fastify'
import { z } from "zod"
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from 'src/use-cases/authenticate'
import { InvalidCredentialsError } from 'src/use-cases/errors/invalid-credentials'
import { makeAuthenticateUseCase } from 'src/use-cases/factories/make-authenticate-use-case'

export async function authenticate (request: FastifyRequest, reply: FastifyReply){ 
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
  
  const {email, password} = authenticateBodySchema.parse(request.body)

  try{
    const authenticateUseCase = makeAuthenticateUseCase()

    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch(err) { 
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({message: err.message})
    }
    
    throw err
  }

  return reply.status(200).send()
}
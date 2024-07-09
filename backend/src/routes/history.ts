import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from '../lib/prisma.js'
import { create } from "domain";

export async function HistoryConversions(server:FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().post('/history', {
    schema:{
      body: z.object({
        from: z.string(),
        to: z.string(),
        amount: z.string(),
        result: z.string()
      }),
      response: {
        201: z.object({
          status: z.number(),
          message: z.string(),
          data: z.object({
            from: z.string(),
            to: z.string(),
            amount: z.string(),
            convertedAmount: z.string()
          })
        }),
        404: z.object({
          status: z.number(),
          message: z.string()
        })
      }
    }

  }, async (request, reply) => {
    const { from, to, amount, result } = request.body;
    
    const history = await prisma.history.create({
      data: {
        from,
        to,
        amount,
        convertedAmount: result
      }
    })

    return reply.status(201).send({
      status: 201,
      message: 'History created',
      data: history
    })

  });
}

export async function GetHistory(server:FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().get('/history', {
    schema:{
      response: {
        200: z.array(z.object({
          id: z.string().uuid(),
          from: z.string(),
          to: z.string(),
          amount: z.string(),
          convertedAmount: z.string(),
          createdAt: z.date()
        }))
      }
    }
  }, async (request, reply) => {
    const history = await prisma.history.findMany();
    return reply.status(200).send(history);
  });
}
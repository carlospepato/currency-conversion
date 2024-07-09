import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

interface ExchangeRate {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

interface APIResponseSuccess {
  [key: string]: ExchangeRate;
}

interface APIResponseError {
  status: number;
  code: string;
  message: string;
}

interface History{
  status: number;
  message: string;
  data: {
    from: string;
    to: string;
    amount: string;
    convertedAmount: string;
  }
}

type APIResponse = APIResponseSuccess | APIResponseError;

function isAPIResponseSuccess(response: APIResponse): response is APIResponseSuccess {
  return !('status' in response);
}

const BASE_URL = process.env.BASE_URL;
const HISTORY_URL = process.env.HISTORY_URL;

export default async function conversionRoutes(server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().get('/conversion', {
    schema: {
      querystring: z.object({
        from: z.string(),
        to: z.string(),
        amount: z.string().refine((value) => !isNaN(Number(value)), {
          message: "Amount must be a number in string format",
        }),
      }),
      response: {
        200: z.object({
          from: z.string(),
          to: z.string(),
          amount: z.string(),
          result: z.string(),
        }),
        400: z.object({
          message: z.string(),
        }),
        404: z.object({
          status: z.number(),
          code: z.string(),
          message: z.string(),
        }),
      },
    },
  }, async (request, reply) => {
    const { from, to, amount } = request.query;
    let result;
    const returnAPI = await fetch(
      `${BASE_URL}/${from}-${to}`
    ).then((response) => response.json()) as APIResponse;

    if (!isAPIResponseSuccess(returnAPI)) {
      return reply.status(404).send({
        status: returnAPI.status,
        code: returnAPI.code,
        message: returnAPI.message,
      });
    }

    const exchangeRateKey = `${from}${to}`;
    const bid = parseFloat(returnAPI[exchangeRateKey].bid);
    const ask = parseFloat(returnAPI[exchangeRateKey].ask);
    result = ((bid + ask) / 2 * parseFloat(amount)).toFixed(2);

    const sendHistory = await fetch(`${HISTORY_URL}/history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to,
        amount,
        result,
      }),
    }).then(
      (response) => response.json()
    ) as History;

    if(sendHistory.status !== 201) {
      return reply.status(400).send({
        message: sendHistory.message
      });
    }

    return reply.status(200).send({
      from,
      to,
      amount,
      result,
    });
  });
}

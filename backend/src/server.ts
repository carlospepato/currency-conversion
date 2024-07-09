import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import conversionRoutes from "./routes/conversion.js";
import { GetHistory, HistoryConversions } from "./routes/history.js";

// Definir __filename e __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carregar variáveis de ambiente do arquivo .env
dotenv.config({ path: resolve(__dirname, '../../.env') });


const server = fastify({ logger: true });
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

const BASE_URL = process.env.BASE_URL;

server.register(conversionRoutes);
server.register(HistoryConversions)
server.register(GetHistory);

server.listen({port: 3333}).then(() => {
  console.log("Server is running on port 3333");
});
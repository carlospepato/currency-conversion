"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import { SelectFrom } from "@/components/currency-from"
import { SelectTo } from "@/components/currency-to"

const schema = z.object({
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a valid number with up to two decimal places"),
  from: z.string().min(1,'Selecione a moeda de origem'),
  to: z.string().min(1, 'Selecione a moeda de destino'),
})

interface fetchObject{
  from: string,
  to: string,
  amount: string
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: zodResolver(schema),
  })

  const [result, setResult] = useState(null);

  const onSubmit = async (data : fetchObject) => {
    try {
      const { from, to, amount } = data;
      console.log(data)
      const url = `http://localhost:3333/conversion?from=${from}&to=${to}&amount=${amount}`;
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log(result); // Aqui você pode fazer o que precisar com a resposta
      setResult(result);
  
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };
  
  

  return (
    <div className="w-full mx-auto flex flex-col justify-center items-center min-h-[calc(100vh-64px)]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex items-center justify-between gap-2 bg-zinc-800 p-3 rounded-lg shadow-shape"
      >
        <div className="flex justify-between w-full">
          <SelectFrom control={control}/>
          <SelectTo control={control}/>
          <div className="w-full flex-col">
            <Input
              {...register("amount")}
              placeholder="Amount"
              className="bg-transparent border-none focus:outline-none"
            />
            {errors.amount && typeof errors.amount.message === 'string' && (
              <span className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </span>
            )}
          </div>
          
        </div>
        <button
          type="submit"
          className="flex items-center justify-between gap-2 bg-zinc-100 text-zinc-600 font-semibold rounded-lg px-4 py-2 hover:bg-zinc-300 hover:text-zinc-800"
        >
          Converter
          <ArrowRight />
        </button>
      </form>
      {result && (
        <div className="mt-4">
          <pre className="text-zinc-300 bg-zinc-800 p-3 rounded-lg shadow-shape">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

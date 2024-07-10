'use client'

import { useEffect, useState } from "react"
import { fetchHistory } from "@/services/api"

interface HistoryItem {
  from: string;
  to: string;
  amount: string;
  convertedAmount: string;
  createdAt: string;
}

function formatCurrency(value: number, currency: string | null): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: currency == null ? 'BRL' : currency }).format(value);
}

export default function History(){
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchHistory();
        setHistory(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    getData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

 return (
    <div className="max-w-6xl mx-auto py-4">
      <h1 className="text-2xl font-normal mb-4">Histórico</h1>
      {history.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-zinc-800 rounded-tl-lg rounded-tr-lg overflow-hidden">
            <thead className="bg-zinc-900">
              <tr>
                <th className="py-2 px-4 border-b border-zinc-800 font-normal text-lg">De</th>
                <th className="py-2 px-4 border-b border-zinc-800 font-normal text-lg">Para</th>
                <th className="py-2 px-4 border-b border-zinc-800 font-normal text-lg">Valor</th>
                <th className="py-2 px-4 border-b border-zinc-800 font-normal text-lg">Valor convertido</th>
                <th className="py-2 px-4 border-b border-zinc-800 font-normal text-lg">Criado em</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-zinc-800 text-center text-zinc-300">{item.from}</td>
                  <td className="py-2 px-4 border-b border-zinc-800 text-center text-zinc-300">{item.to}</td>
                  <td className="py-2 px-4 border-b border-zinc-800 text-center text-zinc-300">{formatCurrency(parseFloat(item.amount), null)}</td>
                  <td className="py-2 px-4 border-b border-zinc-800 text-center text-zinc-300">{formatCurrency(parseFloat(item.convertedAmount), item.to)}</td>
                  <td className="py-2 px-4 border-b border-zinc-800 text-center text-zinc-300">{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
'use client'

import { useEffect, useState } from "react"
import { fetchHistory } from "@/services/api"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface HistoryItem {
  from: string;
  to: string;
  amount: string;
  convertedAmount: string;
  createdAt: string;
}

export function formatCurrency(value: number, currency: string): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: currency }).format(value);
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(history.length / itemsPerPage);

  const paginatedHistory = history.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
  }, [page]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  function handleNextPage() {
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));
  }

  function handlePrevPage() {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  }

  function handleFirstPage() {
    setPage(1);
  }

  function handleLastPage() {
    setPage(totalPages);
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
              {paginatedHistory.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-zinc-800 text-center text-zinc-300">{item.from}</td>
                  <td className="py-2 px-4 border-b border-zinc-800 text-center text-zinc-300">{item.to}</td>
                  <td className="py-2 px-4 border-b border-zinc-800 text-center text-zinc-300">{formatCurrency(parseFloat(item.amount), item.from)}</td>
                  <td className="py-2 px-4 border-b border-zinc-800 text-center text-zinc-300">{formatCurrency(parseFloat(item.convertedAmount), item.to)}</td>
                  <td className="py-2 px-4 border-b border-zinc-800 text-center text-zinc-300">{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="grid grid-cols-2 justify-between px-4">
            <p className="text-sm text-zinc-500 mt-4">Mostrando {paginatedHistory.length} de {history.length}</p>
            <div className="flex items-center justify-end gap-1">
              <button
                className="p-0.5 bg-zinc-900 border border-zinc-500 rounded-md disabled:opacity-50"
                onClick={handleFirstPage}
                disabled={page === 1}
              >
                <ChevronsLeft size={20} />

              </button>
              <button
                className="p-0.5 bg-zinc-900 border border-zinc-500 rounded-md disabled:opacity-50"
                onClick={handlePrevPage}
                disabled={page === 1}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="p-0.5 bg-zinc-900 border border-zinc-500 rounded-md disabled:opacity-50"
                onClick={handleNextPage}
                disabled={page === totalPages}
              >
                <ChevronRight size={20} />
              </button>
              <button
                className="p-0.5 bg-zinc-900 border border-zinc-500 rounded-md disabled:opacity-50"
                onClick={handleLastPage}
                disabled={page === totalPages}
              >
                <ChevronsRight size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
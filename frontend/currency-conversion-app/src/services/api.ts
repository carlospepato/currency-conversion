export async function fetchHistory() : Promise<[]>{
  const response = await fetch('http://localhost:3333/history');
  return response.json();
}
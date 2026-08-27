const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchNations() {

  const response = await fetch(`${BASE_URL}/api/encyclopedia/en/nations/`);

  if (!response.ok) {
    throw new Error('Не удалось загрузить нации');
  }
  
  return response.json();
}
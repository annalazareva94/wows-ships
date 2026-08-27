export async function fetchNations() {

  const response = await fetch('/api/encyclopedia/en/nations/');

  if (!response.ok) {
    throw new Error('Не удалось загрузить нации');
  }
  
  return response.json();
}
export async function fetchMedia() {

  const response = await fetch('/api/encyclopedia/en/media_path/');

  if (!response.ok) {
    throw new Error('Не удалось загрузить медиа');
  }
  
  return response.json();
}
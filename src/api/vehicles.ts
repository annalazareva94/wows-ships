const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchVehicles() {

  const response = await fetch(`${BASE_URL}/api/encyclopedia/en/vehicles/`);

  if (!response.ok) {
    throw new Error('Не удалось загрузить корабли');
  }
  
  return response.json();
}
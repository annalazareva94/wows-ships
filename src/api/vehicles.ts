export async function fetchVehicles() {

  const response = await fetch('/api/encyclopedia/en/vehicles/');

  if (!response.ok) {
    throw new Error('Не удалось загрузить корабли');
  }
  
  return response.json();
}
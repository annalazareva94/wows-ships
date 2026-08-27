const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchVehicleTypes() {

  const response = await fetch(`${BASE_URL}/api/encyclopedia/en/vehicle_types_common/`);
  
  if (!response.ok) {
    throw new Error('Не удалось загрузить типы');
  }
  
  return response.json();
}
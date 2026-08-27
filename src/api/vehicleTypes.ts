export async function fetchVehicleTypes() {

  const response = await fetch('/api/encyclopedia/en/vehicle_types_common/');

  if (!response.ok) {
    throw new Error('Не удалось загрузить типы');
  }
  
  return response.json();
}
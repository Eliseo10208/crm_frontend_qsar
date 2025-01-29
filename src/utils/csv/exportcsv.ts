/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/prefer-default-export */
/**
 * Convierte un array de objetos a un archivo CSV, manejando objetos anidados, y lo descarga.
 * @param data - Array de objetos que se exportarán como CSV.
 * @param filename - Nombre del archivo a descargar.
 */
export const exportToCSV = (data: object[], filename: string): void => {
	if (!data || data.length === 0) {
		throw new Error('No hay datos para exportar.');
	}

	/**
	 * Aplana un objeto anidado convirtiendo las claves en formato "clave.subclave".
	 * @param obj - Objeto aplanar.
	 * @param parentKey - Clave del nivel superior (usada en llamadas recursivas).
	 * @returns Objeto aplanado.
	 */
	const flattenObject = (
		obj: Record<string, unknown>,
		parentKey = '',
	): Record<string, string | null> => {
		return Object.entries(obj).reduce(
			(acc, [key, value]) => {
				const fullKey = parentKey ? `${parentKey}.${key}` : key;
				if (value && typeof value === 'object' && !Array.isArray(value)) {
					Object.assign(acc, flattenObject(value as Record<string, unknown>, fullKey));
				} else {
					acc[fullKey] = value as string | null;
				}
				return acc;
			},
			{} as Record<string, string | null>,
		);
	};

	// Aplanar todos los objetos en el array
	const flattenedData = data.map((item) => flattenObject(item as Record<string, unknown>));

	// Extraer todas las claves únicas como encabezados
	const headers = Array.from(new Set(flattenedData.flatMap((item) => Object.keys(item))));

	// Crear el contenido CSV
	const csvContent = [
		headers.join(','), // Encabezados
		...flattenedData.map(
			(row) => headers.map((header) => `"${row[header] ?? ''}"`).join(','), // Valores por fila
		),
	].join('\n');

	// Crear un Blob y simular la descarga
	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = `${filename}.csv`;
	link.style.display = 'none';

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

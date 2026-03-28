
import { useState, useCallback, useEffect } from 'react';
import type { Pacient, UseGetListPacients } from './types';

const API_URL = 'http://localhost:3000/api/v1/pacients';

export function useGetListPacients(): UseGetListPacients {
	const [pacients, setPacients] = useState<Pacient[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchPacients = useCallback(async (order: 'ASC' | 'DESC' = 'ASC') => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(`${API_URL}?order=${order}`);
			if (!res.ok) {
				throw new Error('Error al obtener la lista de pacientes');
			}
			const data = await res.json();
			setPacients(data);
		} catch (err: any) {
			setError(err.message || 'Error desconocido');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchPacients();
	}, [fetchPacients]);

	return { pacients, loading, error, fetchPacients };
}

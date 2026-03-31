
import { useState, useCallback, useEffect } from 'react';
import type { Pacient, UseGetListPacients } from './types';

const API_URL = 'http://localhost:3000/api/v1/pacients';

export function useGetListPacients(): UseGetListPacients {
	const [pacients, setPacients] = useState<Pacient[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);


	function getCriticidadColor(criticidad: number | string): string {
		switch (String(criticidad)) {
			case '1':
				return 'manchester-criticidad-1';
			case '2':
				return 'manchester-criticidad-2';
			case '3':
				return 'manchester-criticidad-3';
			case '4':
				return 'manchester-criticidad-4';
			case '5':
				return 'manchester-criticidad-5';
			default:
				return 'manchester-criticidad-5';
		}
	}

	function getCriticidadDenominacion(criticidad: number | string): string {
		switch (String(criticidad)) {
			case '1':
				return 'Inmediato';
			case '2':
				return 'Muy Urgente';
			case '3':
				return 'Urgente';
			case '4':
				return 'Menos Urgente';
			case '5':
				return 'No Urgente';
			default:
				return '';
		}
	}

	const fetchPacients = useCallback(async (order: 'ASC' | 'DESC' = 'ASC') => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch(`${API_URL}?order=${order}`);
			if (!res.ok) {
				throw new Error('Error al obtener la lista de pacientes');
			}
			const data = await res.json();
			// Agregar la propiedad criticidadColor a cada paciente
			setPacients(
				data.map((p: Pacient) => ({
					...p,
					criticidadColor: getCriticidadColor(p.criticidad),
					criticidadDenominacion: getCriticidadDenominacion(p.criticidad),
				}))
			);
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

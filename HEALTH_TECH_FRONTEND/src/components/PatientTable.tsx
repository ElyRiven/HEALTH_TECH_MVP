import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetListPacients } from '../hooks/useGetListPacients/useGetListPacients';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export default function PatientTable() {
  const { pacients, loading, error, fetchPacients } = useGetListPacients();
  const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC');

  const handleSortClick = () => {
    const next = order === 'ASC' ? 'DESC' : 'ASC';
    setOrder(next);
    fetchPacients(next);
  };

  if (loading) return <p className="text-sm text-muted-foreground py-6 text-center">Cargando pacientes...</p>;
  if (error) return <p className="text-sm text-destructive py-6 text-center">{error}</p>;
  if (!pacients.length) return (
    <>
      <p className="text-sm text-muted-foreground py-6 text-center">No hay pacientes en espera.</p>
      <Link
        to="/register"
        className="mt-2 mx-auto block rounded bg-blue-medium-tittle px-4 py-2 text-sm font-medium text-main-white-back transition-opacity hover:opacity-90 text-center w-fit"
      >
        Registra tu primer paciente
      </Link>
    </>
  );

  return (
    <div className="w-full max-w-150 mx-auto rounded-lg border bg-card shadow-sm  mt-4">
      <Table>
        <TableHeader className="bg-light-blue">
          <TableRow>
            <TableHead className="text-main-white-back rounded-tl-lg w-2/5">Nombres</TableHead>
            <TableHead className="text-main-white-back w-2/5">Apellidos</TableHead>
            <TableHead className="text-main-white-back rounded-tr-lg w-px whitespace-nowrap">
              <button
                onClick={handleSortClick}
                className="flex items-center gap-1 cursor-pointer select-none"
              >
                Criticidad
                <img
                  src="/boxicons_arrow-down-filled.svg"
                  alt="ordenar"
                  className={`w-5 h-5 transition-transform duration-200 ${order === 'ASC' ? 'rotate-0' : 'rotate-180'}`}
                />
              </button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pacients.map((p) => (
            <TableRow key={p.identificacion}>
              <TableCell>{p.nombres}</TableCell>
              <TableCell>{p.apellidos}</TableCell>
              <TableCell className="text-center">{p.criticidad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

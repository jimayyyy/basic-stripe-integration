import { useProducts } from '@/hooks/useProduct';
import type { Products } from '@/lib/api/product';
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { FC } from 'react';

export const ProductTable: FC = () => {
	const { data: products } = useProducts();

	const columnHelper = createColumnHelper<Products>();

	const columns: ColumnDef<Products, string>[] = [
		columnHelper.accessor((row) => row.name, {
			id: 'name',
			cell: (info) => <i>{info.getValue()}</i>,
			header: () => <span>Name</span>,
		}),
		columnHelper.accessor((row) => row.description, {
			id: 'description',
			cell: (info) => <i className="line-clamp-1 max-w-[200px]"> {info.getValue()} </i>,
			header: () => <span> Description </span>,
		}),
	];

	const table = useReactTable<Products>({
		data: products ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<table className=" border border-gray-300 rounded-md">
				<thead className="bg-gray-100">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} className="border-b px-4 py-2 text-left font-semibold">
									{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} className="odd:bg-white even:bg-gray-50">
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className="border-b px-4 py-2">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

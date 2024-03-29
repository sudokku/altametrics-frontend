type DataTableProps<T> = {
    data: T[];
    columns: Array<{ key: keyof T; header: string }>;
    onRowClick: (row: T) => void;
};

const DataTable = <T extends Record<string, any>>({ data, columns, onRowClick }: DataTableProps<T>) => {
    return (
        <table className="table-fixed w-full border border-gray-200 rounded-md">
            <thead className="bg-gray-200">
                <tr>
                    {columns.map((column, index) => (
                        <th className="py-1" key={index}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr onClick={() => onRowClick(row)} key={index}>
                        {columns.map((column, index) => (
                            <td className="p-2 border" key={index}>{row[column.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
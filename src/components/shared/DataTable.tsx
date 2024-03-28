type DataTableProps<T> = {
    data: T[];
    columns: Array<{ key: keyof T; header: string }>;
};

const DataTable = <T extends Record<string, any>>({ data, columns }: DataTableProps<T>) => {
    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {columns.map((column, index) => (
                            <td key={index}>{row[column.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
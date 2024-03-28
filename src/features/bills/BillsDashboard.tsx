import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useGetBillsQuery } from "../../app/apiSlice";
import { useEffect, useState } from "react";
import { Bill, getBillsFailure, getBillsStart, getBillsSuccess } from "./billsSlice";
import DataTable from "../../components/shared/DataTable";
import Pagination from "../../components/shared/Pagination";

const BillsDashboard = () => {
    const billingState = useSelector((state: RootState) => state.billing);
    const { data, error, isLoading } = useGetBillsQuery();
    const dispatch = useDispatch();

    const tableColumns: { key: keyof Bill, header: string }[] = [
        { key: 'dueDate', header: 'Due Date' },
        { key: 'details', header: 'Description' },
        { key: 'amount', header: 'Amount' }
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalPages = Math.ceil(billingState.bills.length / pageSize);
    const paginatedBills = billingState.bills.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setCurrentPage(1);
    }

    useEffect(() => {
        if (isLoading) {
            dispatch(getBillsStart());
            return;
        }

        if (!error && data) {
            dispatch(getBillsSuccess(data));
        } else if (error) {
            dispatch(getBillsFailure(error));
        }
    }, [data, error, isLoading]);


    return (
        <div>
            <h1>Bills Dashboard - {totalPages}</h1>
            <DataTable
                data={paginatedBills}
                columns={tableColumns}
            />
            <Pagination
                page={currentPage}
                pageSize={pageSize}
                totalPages={totalPages}
                onPageChange={(newPage) => setCurrentPage(newPage)}
                onPageSizeChange={handlePageSizeChange}
            />
        </div>
    );
};

export default BillsDashboard;
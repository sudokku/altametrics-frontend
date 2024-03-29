import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useGetBillsQuery } from "../../app/apiSlice";
import { useEffect, useState } from "react";
import { Bill, getBillsFailure, getBillsStart, getBillsSuccess } from "./billsSlice";
import DataTable from "../../components/shared/DataTable";
import Pagination from "../../components/shared/Pagination";
import BillInvoiceDetailsPopup from "../../components/shared/BillInvoiceDetailPopup";

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

    const [showModal, setShowModal] = useState(false);
    const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setCurrentPage(1);
    }

    const handleBillClick = (bill: Bill) => {
        setSelectedBill(bill);
        setShowModal(true);
    }

    const handleBillDetailsClose = () => {
        setShowModal(false);
        setSelectedBill(null);
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
            <h1 className="text-lg mb-4 text-center">Bills Dashboard</h1>
            <DataTable
                data={paginatedBills}
                columns={tableColumns}
                onRowClick={handleBillClick}
            />
            <br />
            <Pagination
                page={currentPage}
                pageSize={pageSize}
                totalPages={totalPages}
                onPageChange={(newPage) => setCurrentPage(newPage)}
                onPageSizeChange={handlePageSizeChange}
            />
            {showModal &&
                <BillInvoiceDetailsPopup
                    item={selectedBill}
                    onClose={handleBillDetailsClose}
                />
            }
        </div>
    );
};

export default BillsDashboard;
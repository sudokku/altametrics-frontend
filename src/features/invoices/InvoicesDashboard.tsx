import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useGetInvoicesQuery } from "../../app/apiSlice";
import { useEffect, useState } from "react";
import { Invoice, getInvoicesStart, getInvoicesSuccess, getInvoicesFailure } from "./invoicesSlice";
import DataTable from "../../components/shared/DataTable";
import Pagination from "../../components/shared/Pagination";
import BillInvoiceDetailsPopup from "../../components/shared/BillInvoiceDetailPopup";

const InvoicesDashboard = () => {
    const invoicesState = useSelector((state: RootState) => state.invoices);
    const { data, error, isLoading } = useGetInvoicesQuery();
    const dispatch = useDispatch();

    const tableColumns: { key: keyof Invoice, header: string }[] = [
        { key: 'dueDate', header: 'Due Date' },
        { key: 'details', header: 'Description' },
        { key: 'amount', header: 'Amount' }
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalPages = Math.ceil(invoicesState.invoices.length / pageSize);
    const paginatedInvoices = invoicesState.invoices.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const [showModal, setShowModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setCurrentPage(1);
    }

    const handleInvoiceClick = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setShowModal(true);
    }

    const handleInvoiceDetailsClose = () => {
        setShowModal(false);
        setSelectedInvoice(null);
    }

    useEffect(() => {
        if (isLoading) {
            dispatch(getInvoicesStart());
            return;
        }

        if (!error && data) {
            dispatch(getInvoicesSuccess(data));
        } else if (error) {
            dispatch(getInvoicesFailure(error));
        }
    }, [data, error, isLoading]);


    return (
        <div>
            <h1 className="text-lg mb-4 text-center">Invoices Dashboard</h1>
            <DataTable
                data={paginatedInvoices}
                columns={tableColumns}
                onRowClick={handleInvoiceClick}
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
                    itemType={'invoice'}
                    id={selectedInvoice!.id}
                    onClose={handleInvoiceDetailsClose}
                />
            }
        </div>
    );
};

export default InvoicesDashboard;
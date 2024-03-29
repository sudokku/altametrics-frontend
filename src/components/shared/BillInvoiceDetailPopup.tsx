import React from 'react';
import { useGetBillByIdQuery, useGetInvoiceByIdQuery } from '../../app/apiSlice';

interface BillInvoiceDetailsProps {
    itemType: 'bill' | 'invoice';
    id: number;
    onClose: () => void;
}

const BillInvoiceDetailsPopup: React.FC<BillInvoiceDetailsProps> = ({ itemType, id, onClose }) => {
    const { data: billItem, isLoading: isLoadingBill, error: billError } = useGetBillByIdQuery(`${id}`, { skip: itemType !== 'bill' });
    const { data: invoiceItem, isLoading: isLoadingInvoice, error: invoiceError } = useGetInvoiceByIdQuery(`${id}`, { skip: itemType !== 'invoice' });

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg p-8 max-w-md">
                <button className='absolute top-0 right-2 font-bold text-2xl' onClick={onClose}>&#x2715;</button>
                {isLoadingBill || isLoadingInvoice ? <p>Loading...</p> : null}

                {billError || invoiceError ? <p>Error fetching data</p> : null}

                {billItem && !billError &&
                    <div>
                        <h2 className="text-xl font-bold mb-4">Bill Details</h2>
                        <p>Bill ID: {billItem.id}</p>
                        <p>Name: {billItem.name}</p>
                        <p>Bill due date: {new Date(billItem.dueDate || '').toLocaleDateString()}</p>
                        <p>Amount: {billItem.amount}</p>
                        <p>Description: {billItem.details}</p>
                    </div>
                }

                {invoiceItem && !invoiceError &&
                    <div>
                        <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
                        <p>Invoice ID: {invoiceItem.id}</p>
                        <p>Name: {invoiceItem.name}</p>
                        <p>Invoice due date: {new Date(invoiceItem.dueDate || '').toLocaleDateString()}</p>
                        <p>Amount: {invoiceItem.amount}</p>
                        <p>Description: {invoiceItem.details}</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default BillInvoiceDetailsPopup;
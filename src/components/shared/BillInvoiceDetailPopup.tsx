import React from 'react';
import { Bill } from '../../features/bills/billsSlice';

interface BillInvoiceDetailsProps {
    item: Bill | null;
    onClose: () => void;
}

const BillInvoiceDetailsPopup: React.FC<BillInvoiceDetailsProps> = ({ item, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg p-8 max-w-md">
                <button className='absolute top-0 right-2 font-bold text-2xl' onClick={onClose}>&#x2715;</button>
                <div>
                    <h2 className="text-xl font-bold mb-4">Bill Details</h2>
                    <p>Bill ID: {item?.id}</p>
                    <p>Name: {item?.name}</p>
                    <p>Bill due date: {new Date(item?.dueDate || '').toLocaleDateString()}</p>
                    <p>Amount: {item?.amount}</p>
                    <p>Description: {item?.details}</p>
                </div>
            </div>
        </div>
    );
};

export default BillInvoiceDetailsPopup;
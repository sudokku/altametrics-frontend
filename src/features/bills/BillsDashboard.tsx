import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useGetBillsQuery } from "../../app/apiSlice";
import { useEffect } from "react";
import { getBillsFailure, getBillsStart, getBillsSuccess } from "./billsSlice";

const BillsDashboard = () => {
    const billingState = useSelector((state: RootState) => state.billing);
    const { data, error, isLoading } = useGetBillsQuery();
    const dispatch = useDispatch();

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
            <h1>Bills Dashboard</h1>
            {billingState.bills.length === 0 ? <p>No bills found</p> : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billingState.bills.map((bill) => (
                            <tr key={bill.id}>
                                <td>{bill.name}</td>
                                <td>{bill.amount}</td>
                                <td>{bill.dueDate}</td>
                                <td>{bill.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BillsDashboard;
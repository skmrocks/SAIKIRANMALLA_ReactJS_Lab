import { useEffect, useState } from "react"
import IDataList from "../models/IDataList"
import { getDataFromServer } from "../services/DataService"
import { forEachChild } from "typescript"
import ExpenceTracker from "./ExpenceTracker"

function ShowList(){
    const [items, setItems] = useState<IDataList[]>([])
    const [error, setError] = useState<Error  | null >(null)
    const [sum, setSum] = useState<number | null>(0)
    const [rahulSpent, setRameshSpent] = useState<number>(0)
    const[rameshSpent, setRahulSpent] = useState<number>(0)
    const [ShowForm, setShowForm] = useState<boolean>(false)
    var rahulSpent1 = 0
    var rameshSpent1 = 0

            useEffect(() => {
        const fetchData = async ()=>{
            try{
                const data = await getDataFromServer()
                setItems(data)
                setSum(data.reduce((res, each) => res = res + each.price, 0))
                shares(data)
            }
            catch(error:any){
                   setError(error)
            }
        }
        fetchData()
    }, [])

    const shares =(data:IDataList[]) => {
        data.map(
            each =>
            (
                each.PayeeName === "Rahul" ? (
                    rahulSpent1 = rahulSpent1 + each.price
                ): (
                    rameshSpent1 = rameshSpent1 + each.price
                )
            )
        )
        setRahulSpent(rahulSpent1)
        setRameshSpent(rameshSpent1)

    }
    const success = ()=>{
        setShowForm(false)
    }
    const cancel = ()=>{
        setShowForm(true)
    }

  return (
    <>
    <header id="page-Header">Expence Tracker</header>
    <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
    {ShowForm && (
        <div className="form">
            <ExpenceTracker ontrue={success} onClose={cancel}></ExpenceTracker>
        </div>
    )}
    <div className="use-inline date">Date</div>
    <div className="use-inline">Product Purchaseed</div>
    <div className="use-inline price">Price</div>
    <div className="use-inline">Payee</div>
    {
        items &&
        items.map(
            (user, ind) => (
             <div>
                <div className="use-inline date header-color">{user.setDate}</div>
                <div className="use-inline header-color">{user.product}</div>
                <div className="use-inline price header-color">{user.price}</div>
                <div className="use-inline header-color">{user.PayeeName}</div>
             </div>

            )
        )
    }
    <div className="use-inline">Total Sum</div>
    <div className="use-inline total">{sum}</div><hr/>
    <div className="use-inline total">Ramesh Spent</div>
    <div className="use-inline">{rameshSpent}</div><hr/>
    <div className="use-inline total">Rahul Spent</div>
    <div className="use-inline">{rahulSpent}</div><hr/>
    <div className="use-inline payable">{rahulSpent != null && rameshSpent != null &&  rahulSpent > rameshSpent ? "Pay Rahul" :"Pay Ramesh"}</div>
    <div className="use-inline payable price">{Math.abs((rameshSpent-rahulSpent)/2)}</div>

      {
        error&&(
            <>
            {error?.message}
            </>
        )
      }
    </>
  )
}

export default ShowList
import { FC } from "react"
import axios from "axios"
import { useState,useEffect } from "react"
import { Client } from "../../../../utils/interface/Clients"


interface FormsTableProps { }

const FormsTable: FC<FormsTableProps> = () => {
    const[data, setData] = useState([])

    return (
            <div>
                <h1>Contacts</h1>
            </div>
    )
}

export default FormsTable;
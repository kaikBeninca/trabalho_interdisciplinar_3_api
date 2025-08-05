import { JSX } from "react"
import Option from "../Option"

export default function GaleriaOption(props: any): JSX.Element {
    return (
        <>
            {
                props.vetor.map(
                    (e: any) => { 
                     return <Option value={e.value}>{e.text}</Option>
                })
            }  
        </>         
    )
}
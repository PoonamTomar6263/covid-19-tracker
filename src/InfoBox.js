import { CardContent, Typography ,Card} from '@material-ui/core'
import React from 'react'

function InfoBox({tittle,cases,total}) {
    return (
       <Card className="InfoBox" >
           <CardContent>
               <Typography className="infoBox_tittle" color="textSecondary" >{tittle}  </Typography>
               <h2 className="infoBox_case">{cases}</h2>
               <Typography className="infoBox_total" color="textSecondary" >{total}  </Typography>
           </CardContent>
       </Card>
    )
}

export default InfoBox

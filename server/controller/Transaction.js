var Transaction= require('../utils/Transaction')



const transactionController={

    transactionAdd:(req,res) => {
        Transaction.transactionAdd(req.body).then((response)=>{
            res.json({status:true, data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
    transactionList:(req,res) =>{
        let customer_id = req.body.customer_id ;
        Transaction.transactionList(customer_id).then((response)=>{
            res.json(response)
        })
    },
    

    // Designer Transaction
    designertransactionAdd:(req,res) => {
        Transaction.designertransactionAdd(req.body).then((response)=>{
            res.json({status:true, data:response})
        }).catch((err)=>{
            res.json(err)
        })
    },
    designertransactionList:(req,res) =>{
        let designer_id = req.body.designer_id;
        Transaction.designertransactionList(designer_id).then((response)=>{
            res.json(response)
        })
    }
}


module.exports ={...transactionController}
